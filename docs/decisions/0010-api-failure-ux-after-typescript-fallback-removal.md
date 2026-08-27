# ADR-0010: Two-mode failure UX after retiring the TypeScript fallback

- Status: Accepted
- Recorded: 2026-08-26

## Context

`docs/roadmap/backend-rollout.md` step 7 item 7 retires `app/data/artists` as a
frontend runtime dependency: Artist Detail's `FESTFUSE_API_ARTIST_SLUGS` allowlist
and its TypeScript fallback on error are removed, and every `hasLoaded`-gated
consumer (Explore, Planner, Quick Picks, Festival Story, Credits) has its TypeScript
branch deleted rather than merely disabled.

[ADR-0009](0009-rollback-and-observability-scope.md) already named this exact moment:
"Neither failure mode is currently visible to a site visitor... This was decided now,
not deferred to backend-rollout step 7.7 (removing `app/data/artists`, and with it the
automatic fallback that currently keeps every failure silent to visitors)." That
premise stops holding once the fallback is gone. Deleting the fallback branch alone,
with no further design, would leave two failure modes with no considered behavior: an
uncaught thrown error at Artist Detail's per-slug fetch would render Next's default
error page (no product framing, no recovery affordance); a permanently-false
`hasLoaded` (the shared appearances fetch in `app/layout.tsx` failing) would render
every gated consumer as if the festival roster were legitimately empty — visually
indistinguishable from a real "no artists match" state.

## Decision

Two structurally different failure modes get two different, deliberately distinct
treatments.

**Mode 1 — Artist Detail's own per-slug fetch fails** (`fetchFestivalArtist` throws
in `app/artist/[slug]/page.tsx`). The catch no longer swallows the error and falls
back; `sendFailureAlert`/`console.error` fire from the catch (this alert code is
`server-only` and cannot run inside a Client Component boundary), then the error is
re-thrown. `app/artist/[slug]/error.tsx`, a new Next.js route-segment error boundary
(Client Component, using Next 16.2's `unstable_retry` prop — verified against the
vendored docs, not assumed from training data), catches it and shows recoverable
fallback UI with a "Try again" button. `notFound()` stays unchanged for the real
`null` (true 404) case — that distinction (does this artist exist vs. did the request
fail) is preserved exactly as before.

**Mode 2 — the shared appearances fetch never loads** (`fetchFestivalRunAppearances`
fails in `app/layout.tsx`, so `runAppearancesStore.hasLoaded` stays `false` for that
whole page load; there is no retry). A new shared component,
`app/components/AppearancesUnavailable.tsx`, is rendered early — before each
surface's own normal empty-state logic — by Explore, Planner, Quick Picks'
`StartScreen`, and Credits, with a "Reload" button (`window.location.reload()`, since
there is no cheaper way to re-run the layout's server fetch). It is **not** gated at
the root layout/`HydrationGate` level: Home never reads this store, and blocking the
entire app for one store's failure contradicts Home's designed role as a light entry
point, not a dashboard. `FestivalStorySequence` needs no explicit handling — it is
only reachable once `quick-picks/page.tsx`'s `storyUnlocked` gate passes, which
requires a non-empty artist list sourced from this same store, so it is structurally
unreachable in this failure mode.

The new component is named `AppearancesUnavailable`, matching this codebase's
established domain vocabulary (`runAppearancesStore`, `hasLoadedRunAppearances`,
`RunAppearancesHydrator`) — not "catalog," which
[ADR-0006](0006-shared-run-appearances-store.md) already explicitly considered and
rejected for this exact kind of thing.

## Consequences

- An operational API failure is now visible to real visitors for the first time —
  the tradeoff ADR-0009 anticipated. Both new UI states are deliberately distinct
  from each other (Mode 1: full-page error boundary, route-scoped, "Try again" via
  `unstable_retry`; Mode 2: inline component within existing page chrome, "Reload"
  via a full page reload) and from each surface's own legitimate empty-result state.
- `sendFailureAlert`'s two existing call sites are preserved unchanged in count and
  purpose (Artist Detail's catch, `app/layout.tsx`'s); ADR-0009's actual decisions —
  no bespoke kill switch, minimal email alerting, no full observability service —
  are unaffected. Only the premise that a failure is invisible to visitors no longer
  holds.
- `resolveCanonicalAppearanceId` (`app/store/runAppearancesStore.ts`) now provably
  only ever receives real database ids, since no TypeScript-shaped caller remains
  anywhere. Simplifying its multi-candidate disambiguation branch was considered
  in-scope but deliberately deferred — see `backend-rollout.md` step 7 item 7's
  status writeup for why.

## Alternatives considered

- **Reuse `app/not-found.tsx` directly for Mode 1** instead of a new `error.tsx`.
  Rejected — `not-found.tsx` means "this artist doesn't exist," a distinct and
  non-recoverable case; conflating it with an operational fetch failure would
  misrepresent both and forgo the "Try again" retry `error.tsx`'s `unstable_retry`
  provides for free.
- **Gate `AppearancesUnavailable` at the root layout/`HydrationGate` level** instead
  of per-consumer. Rejected — Home doesn't touch `runAppearancesStore`, and a
  store-wide failure blocking the entire app contradicts Home's designed role (see
  `AGENTS.md`'s Screen Design Intent).
- **Render nothing / a silent empty result** instead of a distinct failure state.
  Rejected — indistinguishable from a real "no artists match" or empty-lineup state,
  misrepresenting an operational failure as a legitimate answer.
- **Simplify or remove `resolveCanonicalAppearanceId`'s TS/API disambiguation branch**
  now that every caller passes real database ids. Deferred, not adopted here — real
  regression risk against DEVAULT's already-fixed multi-appearance conflict-detection
  behavior, and not verifiable without a live backend in this pass.

## References

- [Backend rollout roadmap](../roadmap/backend-rollout.md), step 7 item 7
- [ADR-0009: Minimal email alerting; rely on platform deployment rollback; no full observability service](0009-rollback-and-observability-scope.md)
- [ADR-0006: Share canonical Appearance identity and display data through one run-appearances store](0006-shared-run-appearances-store.md)
- `app/artist/[slug]/error.tsx`, `app/components/AppearancesUnavailable.tsx`,
  `app/lib/alerts/sendFailureAlert.ts`
