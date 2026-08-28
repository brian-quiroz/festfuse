# ADR-0007: Extend the bulk appearances endpoint with Quick Picks' editorial fields, in its own frontend type

- Status: Accepted
- Recorded: 2026-08-26 — written alongside its implementing work (backend-rollout.md
  step 7 item 4), following ADR-0006's own precedent of a retrospective record rather
  than a speculative one written before the code existed.

## Context

FestFuse's run-scoped API has two shapes serving two different addressing patterns,
not one "artist" shape and one "appearance" shape at odds with each other:

- `GET /festivals/{edition}/runs/{run}/appearances` (the bulk endpoint, ADR-0006)
  enumerates every scheduled Appearance row in a run, with the owning Artist embedded
  in each row. This matches how a lineup is naturally consumed — "who's playing" is a
  list of scheduled slots — and lets Explore, Planner, and (as of this record) Quick
  Picks fetch every artist they need in one request instead of N.
- `GET /festivals/{edition}/runs/{run}/artists/{artist_slug}` (the single-artist
  endpoint) is addressed by one artist's slug and nests that artist's own Appearances
  underneath it, because a page like Artist Detail needs everything about one specific
  artist — including every Appearance it has in the run (DEVAULT has two) — in one
  request.

Both endpoints are "artist plus its appearances," just traversed from opposite ends.
The bulk endpoint's `FestivalRunArtistRead` is deliberately lean (`slug`, `name`,
`image`, `location`, `genres`) — ADR-0006 already established that each migrating
consumer gets its own lean frontend projection type specifically so one consumer's
unused editorial fields don't leak into another's, and rejected reusing/extending the
full `Artist` shape for exactly that reason.

Migrating Quick Picks (step 7 item 4) surfaced a real gap in that lean shape: Quick
Picks needs the curated Quick Picks track and `similarArtists` ("Sounds like"),
neither of which the bulk endpoint returns — they exist only via `_map_published_artist`,
used by the single-artist endpoints. Two ways to close that gap were considered.

## Decision

- Extend `FestivalRunArtistRead` with `quick_picks_track: ArtistTrackRead` and
  `similar_artists: list[FestivalSimilarArtistRead]`, computed in
  `read_festival_run_appearances` (`backend/app/queries/artists.py`) via batched
  `selectinload` chains across the whole run, not per-artist queries.
- Give Quick Picks its own sibling frontend type, `QuickPicksRunArtist`
  (`app/lib/api/mapRunAppearance.ts`), extending `RunArtist` with the two extra
  fields, rather than adding them to `RunArtist` itself. Both types are built from
  the same single API response already in the browser — the split costs nothing over
  the network; it exists purely so Explore's and Planner's objects don't carry fields
  they never read, continuing ADR-0006's per-consumer-type principle.
- Rejected: a per-card fetch to the existing single-artist endpoint, fetching one
  artist's full detail each time `DecisionScreen` shows a new card. This would scale
  backend load directly with how much a user swipes (up to ~171 requests in a full
  session, each paying its own connection/request overhead) and require new frontend
  machinery — prefetching, a session cache, cache-aware undo — that Explore and
  Planner never needed. The bulk-endpoint extension keeps this to one request per
  session regardless of usage, at a bounded, one-time query cost instead.

## Consequences

- `quick_picks_track` is a bounded, indexed `selectinload` lookup (`ArtistTrackSelection`
  is a per-artist list capped by a partial unique index on `is_quick_picks`) — adding
  it costs 2 extra batched queries for the whole 171-artist response, not one per
  artist.
- `similar_artists` is a real junction-table fan-out (`SimilarArtistSet` → up to 4
  `SimilarArtist` rows → target `Artist`, each needing its own genre-family join and
  an "is this target still announced" lineup check). Rewriting the existing
  single-artist query to filter by `festival_run_id` instead of one
  `source_artist_id` turns it into ~5 total batched, indexed queries for the whole
  run — not 171 separate round trips, not a self-join blowup. Every foreign key
  involved (`similar_artist_sets.source_artist_id`, `similar_artists.similarity_set_id`
  via its PK, `similar_artists.target_artist_id`) already has index support.
- Fixed while rewriting this query: `Artist.lineup_entries` is now scoped to the
  current `festival_run_id` at the SQL level (via `.and_(...)` on the loader), instead
  of loading every lineup entry a target artist has across every run/festival and
  filtering in Python. Harmless at today's single-run scale (most artists have exactly
  one lineup entry), but this query now runs across ~171 sources × 4 targets instead
  of 1 × 4, so the unscoped load would have started mattering once multi-run/
  multi-festival support ships.
- `_map_quick_picks_track` (extracted from `_map_published_artist` and reused by both
  endpoints) still raises `PublishedArtistConsistencyError` if a published artist
  lacks exactly one `is_quick_picks` selection — and now does so for the _entire_
  bulk response if any single artist violates it, not just that artist's own page.
  This wasn't relaxed into a per-artist skip: `read_festival_run_appearances` already
  has the identical "fail loud for the whole batch" pattern for a missing
  `billing_tier`, and the publication-readiness gate (step 1 of the rollout) is
  already supposed to guarantee `quick_picks_track` exists before an artist can be
  published — this is a should-never-happen invariant meant to surface immediately as
  a bug, not degrade silently. Verified directly against both known artists whose
  Quick Picks track selection is least obvious — Chicago Made and WORSHIP, ensemble/
  collective acts with three individually curated tracks each for Artist Detail's
  Listen First module — and both have a valid, single `is_quick_picks` row (matching
  their pre-existing TS `tracks[0]` convention), so the invariant holds today. Note
  that this selection is independent of Artist Detail's separate `listenFirst.mode`
  ("artist" vs. "tracks") logic (`app/lib/listenFirst.ts`) — the two are different
  curation dimensions in the backend (`is_quick_picks` vs. `listen_first_order`) that
  happen to usually agree, not the same mechanism.
- `QuickPicksRunArtist.quickPicksTrack` is a dedicated field (mapped straight from
  `quick_picks_track`), not folded into a `tracks` array the way the legacy `Artist`
  type's `tracks[0]` convention does — a small correctness improvement over that
  convention, not just gap-parity, since `tracks[0]`/`quick_picks_track` are two
  different mechanisms that happen to usually agree rather than the same value by
  construction.

## Alternatives considered

- **Per-card fetch to the single-artist endpoint** — rejected above; backend load
  scales with swipe behavior, and needs new frontend prefetch/cache machinery
  Explore/Planner never required.
- **Add the two fields directly to `RunArtist`** instead of a new sibling type —
  rejected as a re-run of the exact tradeoff ADR-0006 already resolved: it would
  reintroduce fields on a shared type that most of its consumers (Explore, Planner)
  never read, the same anti-pattern ADR-0006 rejected for reusing the full `Artist`
  shape.
- **Add per-artist error isolation** (skip/log a malformed artist rather than failing
  the whole batch) instead of extending the existing fail-loud `billing_tier`
  pattern to these two new fields — rejected as speculative resilience for a
  scenario the publication-readiness gate is already supposed to rule out, and
  inconsistent with this same function's existing convention for the same class of
  problem.

## References

- [ADR-0006: Share canonical Appearance identity and display data through one run-appearances store](0006-shared-run-appearances-store.md)
- [Backend rollout roadmap](../roadmap/backend-rollout.md), step 7 item 4
