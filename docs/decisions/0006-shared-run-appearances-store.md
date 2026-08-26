# ADR-0006: Share canonical Appearance identity and display data through one run-appearances store

- Status: Accepted
- Recorded: 2026-08-26 — retrospective. The original decision was made 2026-08-25
  (branch `feature/canonical-appearance-identity`, PR #36, commit `e7761a9`); this
  record consolidates that decision with its 2026-08-26 extension rather than
  inventing an earlier authorship date. It replaces content that previously lived as
  an informal "Follow-up" addendum on
  [ADR-0004](0004-model-artist-curation-and-scheduling.md) — see that ADR's
  References section and `docs/decisions/README.md` for why accepted records no
  longer get amended that way.

## Context

Scheduling identity split across two id spaces once Artist Detail began reading from
the API: a request to schedule an artist built its composite key from whichever
`Appearance.id` the calling surface's own data happened to carry — the real database
primary key for an API-backed page, a TypeScript-legacy per-artist id (`"1"`, `"2"`,
...) for every other page. Scheduling 5sos from its API-backed Artist Detail page
stored a key the TypeScript-sourced Explore and Planner surfaces could never
recognize as the same appearance, so a user's schedule state silently failed to
propagate between pages for that artist.

The fix needed to work for every current and future migrating consumer at once,
regardless of which surfaces had already moved to the API and which still read
`app/data/artists` — the roadmap (`docs/roadmap/backend-rollout.md` step 7) migrates
consumers one at a time, so any page can be mid-transition at any point.

## Decision

- Add a lightweight, run-scoped `GET /festivals/{edition}/runs/{run}/appearances`
  endpoint (`read_festival_run_appearances`, `FestivalRunAppearanceRead`) returning
  every published, announced Artist's scheduled Appearances in one flat,
  unpaginated list.
- Feed it into one shared frontend store, `runAppearancesStore`, populated once per
  request via `RunAppearancesHydrator` in the root layout — uncached
  (`cache: "no-store"`) and unscoped by `FESTFUSE_API_ARTIST_SLUGS` (that allowlist
  only gates which Artist Detail pages read their own content from the API; every
  page's scheduling identity resolves through this store regardless).
- Every scheduling call site resolves an artist's canonical `Appearance.id` against
  this one store via `resolveCanonicalAppearanceId`/`getAppearanceKey`
  (`app/lib/schedule.ts`), instead of trusting whichever id space its own calling
  surface happened to carry.
- Extend the same store into the canonical source for display data too, not just
  identity: each migrating consumer derives its own lean, purpose-built projection
  type from it — `AppearanceEntry` (Planner, per-appearance grain: day/date/time/
  stage) and `RunArtist` (Explore, per-artist grain: adds genres/location/image for
  filtering and cards) — rather than reusing or extending the full `Artist` type.
  Both projection types are built via a matching pair of constructor functions, one
  reading the store (preferred, once `hasLoaded`) and one reading `app/data/artists`
  (fallback, while the store hasn't loaded yet — an operational-failure case, not a
  normal steady state, since the store is seeded synchronously before first render
  whenever the server's own fetch succeeds).
- Name the endpoint, query, and store "appearances" throughout — not "lineup"
  (`LineupEntry` already means booking/membership, independent of schedule) or
  "catalog" (considered and never adopted, both in the original 2026-08-25 naming
  and again independently on 2026-08-26 when `RunArtist` was named for Explore).

## Consequences

- Every scheduling surface agrees on an artist's real `Appearance.id` regardless of
  which of its own data (identity or display) came from the API versus the
  TypeScript fallback at that moment.
- A second gap surfaced by this work: DEVAULT (the one multi-appearance Artist) gave
  TypeScript-shaped and API-shaped callers different id spaces for the same
  Appearance, so `resolveCanonicalAppearanceId` now disambiguates a multi-candidate
  Artist by matching `day`/`startTime` against each candidate rather than trusting
  the caller's id space — safe, not probabilistic, since one Artist can't play two
  overlapping sets. This remains explicitly transitional: it goes away, alongside
  the id-space split itself, once every consumer sources appearances from the API
  and always passes real database ids (`backend-rollout.md` step 7 item 7).
- `read_festival_run_appearances` excludes cancelled appearances, unlike the
  per-Artist query (`read_festival_artist_by_slug`) — no scheduling surface renders
  cancellation state yet. See `docs/FUTURE_CONSIDERATIONS.md`'s "Artist Detail
  Schedule States" entry.
- Each migrating consumer needs its own lean projection type rather than sharing
  one — a small amount of duplication (each type re-declares the scalar fields it
  needs) in exchange for never fabricating placeholder values for fields the bulk
  endpoint doesn't return (the anti-pattern `mapFestivalArtistResponse` already
  accepts as a called-out stopgap for the single-artist page, not one to extend
  further).
- The store fetches once per hard page load, in the root layout, with no polling or
  time-based revalidation. An open tab won't see a schedule/lineup change made
  elsewhere until the user reloads. This wasn't a tradeoff examined and accepted on
  its own merits — it fell out of `cache: "no-store"`'s freshness model, which only
  governs what a fresh server render receives, not whether one ever happens again
  for an already-open tab.

## Alternatives considered

- **Persist the legacy per-Artist Appearance ID beside the real primary key**, so
  every caller could keep using its own native id space. Already rejected in
  [ADR-0004](0004-model-artist-curation-and-scheduling.md) for introducing a second,
  drift-prone identifier; this work confirms that rejection held rather than
  reopening it.
- **Allowlist DEVAULT onto the API** (`FESTFUSE_API_ARTIST_SLUGS`) instead of fixing
  `resolveCanonicalAppearanceId`. Rejected: that allowlist only gates Artist
  Detail's own content; Explore has no per-artist allowlist mechanism at all, so the
  id-space mismatch would have persisted there regardless.
- **Reuse or extend the full `Artist` type for API-sourced display data**, the way
  `mapFestivalArtistResponse` already does for the single-artist page. Rejected for
  each new consumer as it migrated — Planner's appearance grid and Explore's card
  grid each need only a handful of scalar fields, and neither has anywhere to put
  the ~15 unused editorial fields (`tagline`, `whySee`, `about`, `socials`, ...) a
  full `Artist` requires; fabricating them would mean rendering code trusting values
  that were never real.

## References

- [ADR-0004: Model artist curation, lineup membership, and scheduled appearances](0004-model-artist-curation-and-scheduling.md)
- [Backend rollout roadmap](../roadmap/backend-rollout.md), step 7
- [ARCHITECTURE.md § Run-Appearances Store](../../ARCHITECTURE.md)
