# ADR-0009: Minimal email alerting; rely on platform deployment rollback; no full observability service

- Status: Accepted
- Recorded: 2026-08-26

## Context

`docs/roadmap/backend-rollout.md` step 7 item 6 requires revisiting observability and
rollback scope before broadening the Artist Detail allowlist beyond one artist,
explicitly steering away from a default assumption that a bespoke rollback mechanism
is needed: "Vercel and Railway both already provide deployment-level rollback, so
weigh that before building a dedicated kill switch."

No logging or error-tracking service exists anywhere in the codebase, frontend or
backend. The only existing error signal is plain `console.error` at the two fetch
call sites' catch blocks (`app/artist/[slug]/page.tsx`, `app/layout.tsx`), visible
only through Vercel's own runtime log viewer if someone happens to check it.
[ADR-0005](0005-deploy-initial-backend-on-railway.md) already deferred observability
setup as out of scope for the initial hosted-backend milestone, treating ad hoc
platform log-viewing as sufficient at that stage.

Both fetch sites already fail safe on any operational error: `festivalArtist.ts`'s
caller falls back to the validated TypeScript Artist record (the in-code comment
already calls this a "dual-source rollback path"), and `appearances.ts`'s caller
passes `appearances = null` through, which every migrated consumer's `hasLoaded`-
gated fallback treats identically to the store never having loaded. Neither failure
mode is currently visible to a site visitor.

## Decision

- **No bespoke kill switch.** Vercel (instant promote of a previous deployment) and
  Railway (redeploy a previous build) already provide deployment-level rollback for
  a bad deploy, and the per-request automatic fallback described above already
  covers the API/database misbehaving for some requests without requiring any
  deploy-level action at all. Both realistic failure modes are already handled by
  mechanisms that predate this decision.
- **No full error-tracking/observability service** (Sentry or similar). At current
  scale — 171 published Artists, 5 allowlisted for API-backed Artist Detail — there
  is no dashboard, error-grouping, or alert-threshold need that plain visibility
  doesn't already satisfy, and no other part of the codebase runs a logging
  pipeline this would need to fit into.
- **Add minimal email alerting now**, rather than leaving error visibility as
  "check Vercel's log viewer if you happen to." `app/lib/alerts/sendFailureAlert.ts`
  sends a plain-text notification via Resend's REST API (a single `fetch` call, no
  SDK dependency, free tier, no custom domain verification needed at this volume) to
  `FESTFUSE_ALERT_EMAIL_TO`, called alongside `console.error` at both existing catch
  blocks. It is deliberately minimal: no dashboards, no error grouping or dedup, no
  throttling — a notification, not an observability platform. This was decided now,
  not deferred to backend-rollout step 7.7 (removing `app/data/artists`, and with it
  the automatic fallback that currently keeps every failure silent to visitors) —
  the cost of adding it is trivial, and it closes the actual blind spot (nobody
  currently finds out about a failure unless they go looking) immediately rather
  than waiting for the step that makes that blind spot user-facing.

## Consequences

- An operational failure at either fetch site now reaches a real inbox instead of
  requiring someone to check Vercel's log viewer.
- No throttling or deduplication exists — a sustained outage would send one email
  per failing request. Acceptable at current scale (171 Artists, low concurrent
  traffic); worth revisiting if volume ever makes this noisy.
- Rollback for "the deploy itself is bad" remains a platform action (Vercel promote
  / Railway redeploy), not application code — no rollback logic was added to the
  app.
- This ADR does not change what happens on failure (the existing fallback behavior
  is unchanged) — it only adds visibility into the fact that a failure occurred.

## Alternatives considered

- **A dedicated kill-switch env var** (e.g. force every Artist Detail page back to
  TypeScript data regardless of the allowlist). Rejected as redundant: the automatic
  per-request fallback already achieves the same outcome without an operator needing
  to notice and act first.
- **A full error-tracking service** (Sentry or similar). Rejected for now as
  disproportionate to current scale and inconsistent with the rest of the codebase,
  which has no logging infrastructure anywhere; revisit if traffic or failure volume
  grows enough that a plain email becomes noisy or insufficient.
- **A Slack webhook** instead of email. Rejected — no Slack usage elsewhere in this
  project; email requires no new account beyond the alerting address itself.
- **Deferring any alerting decision to step 7.7**, since that step removes the
  fallback and makes failures user-facing for the first time. Rejected: the cost of
  adding minimal alerting now is trivial, and doing so removes the current blind
  spot immediately rather than leaving it unaddressed until a later step.

## References

- [ADR-0005: Deploy the initial hosted backend on Railway](0005-deploy-initial-backend-on-railway.md)
- [Backend rollout roadmap](../roadmap/backend-rollout.md), step 7 item 6 and item 7
- `app/lib/alerts/sendFailureAlert.ts`, `app/artist/[slug]/page.tsx`, `app/layout.tsx`
