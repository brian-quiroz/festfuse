# ADR-0008: Time-based revalidation for the two FastAPI fetch sites

- Status: Accepted
- Recorded: 2026-08-26

## Context

Both of FestFuse's server-side fetches into the FastAPI backend —
`fetchFestivalArtist` (`app/lib/api/festivalArtist.ts`, Artist Detail's allowlisted
branch) and `fetchFestivalRunAppearances` (`app/lib/api/appearances.ts`, which seeds
`runAppearancesStore` per [ADR-0006](0006-shared-run-appearances-store.md)) — shipped
with `cache: "no-store"` as a deliberate proof-of-concept placeholder. The inline
comment in `festivalArtist.ts` said as much: "Choose the production cache/
revalidation policy before expanding the rollout." ADR-0006's Consequences section
separately flagged the resulting freshness tradeoff (no polling or revalidation for
an already-open tab) as incidental rather than examined on its own merits.
`docs/roadmap/backend-rollout.md` step 7 item 6 requires deciding this before
broadening the Artist Detail allowlist beyond one artist.

This app has no `cacheComponents: true` in `next.config.ts`, so it runs on Next.js's
Previous Model (`node_modules/next/dist/docs/01-app/02-guides/caching-without-cache-components.md`),
where `fetch`'s own `next.revalidate` option is the relevant primitive
(`04-functions/fetch.md`), not the newer `"use cache"`/`cacheLife` model the
getting-started docs default to.

## Decision

- Replace `cache: "no-store"` at both fetch sites with
  `next: { revalidate: FESTIVAL_API_REVALIDATE_SECONDS }`, where the constant is
  `600` (10 minutes), defined once in `app/lib/api/cacheConfig.ts` and imported by
  both call sites rather than tuned independently.
- One shared value, not two, because both fetches read the same underlying data
  model (published Artists and Appearances) that changes on the same operational
  cadence — deliberate admin curation/publication, not continuous writes — and
  nothing today gives Artist Detail's own fetch a different freshness requirement
  than the appearances feed every migrated consumer depends on.
- 600 seconds specifically reflects FestFuse's own product framing: `AGENTS.md`'s
  Product Philosophy section describes FestFuse as a pre-festival decision
  assistant, not a live source of truth for in-event schedule changes — real-time
  staleness during a live show is explicitly not a goal this product optimizes for,
  so a generous window is appropriate rather than a tight one.
- No on-demand revalidation (`revalidateTag`/`revalidatePath`) for now. No mutation
  path lives inside Next.js today — publication, curation, and schedule edits happen
  through Python scripts against the Railway-hosted Postgres database directly, so
  wiring on-demand revalidation would require a new authenticated webhook route
  handler that those scripts call after every mutation: real new infrastructure with
  no current need behind it.
- No explicit route segment config (`export const dynamic`/`revalidate`) was set —
  the per-fetch option alone was intended to be sufficient. In practice this had a
  side effect worth naming explicitly (see Consequences): removing `no-store`, which
  had been forcing dynamic rendering, let Next's automatic static/dynamic inference
  promote every route with no other dynamic dependency (`/`, `/explore`, `/planner`,
  `/quick-picks`, `/credits`) to a prerendered static page with its own independent
  10-minute ISR revalidation window. `/artist/[slug]` remains dynamic.

## Consequences

- Bounded staleness of up to 600 seconds instead of always-fresh; an open tab or a
  fresh request can serve data up to 10 minutes old.
- A real reduction in backend request volume, though not through one pooled cache
  entry shared across every consumer — each of the now-static routes above
  (`/`, `/explore`, `/planner`, `/quick-picks`, `/credits`) is its own independently
  prerendered page with its own 10-minute ISR clock. In production, this shows up as
  a handful of near-simultaneous requests to Railway whenever several of those
  routes happen to go stale close together (confirmed via Railway's request logs:
  clusters of 2–5 requests around each ~10-minute boundary, never a second request
  for the same route inside its own window), rather than one single request
  refreshing a value every consumer then shares. It's still a large reduction from
  `no-store`'s every-page-load behavior, and every observed request succeeded in
  under 350ms — just a different caching shape than "one shared entry" implies.
  Most requests still get a faster response, since a page served from its static
  cache skips the network round-trip entirely.
- Extends, rather than resolves, the tradeoff ADR-0006 already flagged: an open tab
  still won't see a schedule/lineup change until both the window elapses and a fresh
  request occurs.
- On-demand revalidation remains a documented future lever, not a rejected one, if a
  concrete need for tighter freshness ever arises (e.g. a real operational reason to
  reflect a publication change within seconds rather than minutes).

## Alternatives considered

- **Adopt Cache Components (`cacheComponents: true`, `"use cache"`/`cacheLife`)**,
  the model the current Next.js getting-started docs present by default. Rejected as
  disproportionate to this decision — it flips on Partial Prerendering app-wide,
  requires wrapping every runtime-data access point in `<Suspense>`, and touches
  every route, not just these two fetches.
- **On-demand revalidation via a webhook route handler** called by the Python
  publication/import scripts after a mutation. Rejected for now: no current mutation
  path lives inside Next.js, so this would mean building and securing a new route
  purely to support a freshness requirement nothing today actually needs.
- **Independently-tuned revalidation windows per fetch site.** Rejected: no current
  evidence either site needs to diverge from the other; a single shared constant is
  simpler to reason about and cheap to split later if real evidence emerges.

## References

- [ADR-0006: Share canonical Appearance identity and display data through one run-appearances store](0006-shared-run-appearances-store.md)
- [Backend rollout roadmap](../roadmap/backend-rollout.md), step 7 item 6
- `app/lib/api/festivalArtist.ts`, `app/lib/api/appearances.ts`,
  `app/lib/api/cacheConfig.ts`
