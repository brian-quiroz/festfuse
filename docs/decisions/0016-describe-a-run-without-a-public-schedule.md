# ADR-0016: Describe a run without a public schedule in the API

- Status: Accepted
- Recorded: 2026-08-29, alongside the implementing work (multi-festival roadmap
  section 4), following ADR-0006 and ADR-0007's precedent of a record written with the
  code rather than ahead of it.

## Context

[ADR-0015](0015-multi-festival-and-multi-run-support.md) committed to two API changes
for a run whose lineup is announced before its schedule exists ("the bulk appearances
feed is extended to surface announced, published artists that have no scheduled
appearance, and per-run schedule state is exposed on the festival endpoint") and left
open whether that work earns its own record once concrete. It is now concrete.

The run-scoped read paths today:

- `read_festival_run_appearances` (`GET /festivals/{edition}/runs/{run}/appearances`,
  the bulk feed from [ADR-0006](0006-shared-run-appearances-store.md)) is
  Appearance-driven. A run with an announced lineup but no `scheduled` Appearance
  returns `[]`, which the frontend cannot tell apart from "no published artists" or an
  upstream failure. Explore, Quick Picks, and Festival Story all read this feed and so
  cannot render such a run.
- `read_festival_artist_by_slug` (the per-artist endpoint) is LineupEntry-driven and
  already returns an announced entry with `appearances: []`.

Nothing on the festival endpoint's run representation says whether a run has a public
schedule, so the frontend would have to infer it from an empty feed to gate Planner
and the sidebar (multi-festival roadmap, "Announced lineup, no schedule yet").

Austin City Limits 2026's weekend runs will be announced before their set times exist,
and Coachella 2027 more so. This is read-side only; section 4 ships as its own backend
PR ahead of the frontend sections, the way sections 2 and 3 did.

## Decision

1. **A sibling bulk endpoint, not an extension of `/appearances`.**
   `GET /festivals/{edition}/runs/{run}/artists` (`read_festival_run_artists`,
   response `list[FestivalRunArtistRead]`) returns every announced, published artist in
   the run, whether or not they are scheduled. It reuses the appearances feed's artist
   projection (`_map_run_artist`), its batched four-or-none similar-artist query
   (`_read_run_similar_artists`), and its missing-`billing_tier` consistency check.
   `read_festival_run_appearances` is unchanged; for a scheduleless run it already
   returns `[]` rather than 404.

2. **A derived `schedule_state` on the run representation.** `FestivalRunRead` on
   `GET /festivals/{slug}` gains `schedule_state: "announced" | "scheduled"`, computed
   per request by `read_run_ids_with_public_schedule` and never stored. A run is
   `"scheduled"` exactly when it has at least one `scheduled` Appearance on an
   announced, published lineup entry, the same gate `read_festival_run_appearances`
   applies. The invariant: `schedule_state == "scheduled"` for a run if and only if
   the appearances feed would return at least one row for it.

3. **Cancelled Appearances stay excluded from the bulk appearances feed**, unchanged.
   This reaffirms ADR-0006. The conditions for revisiting it (a cancellation UI design
   for the bulk-consuming surfaces, plus a status field on `FestivalRunAppearanceRead`)
   are recorded in `docs/FUTURE_CONSIDERATIONS.md` "Artist Detail Schedule States".

### Why a sibling endpoint rather than extending the feed

The `/appearances` response is a flat, homogeneous list: one row per Appearance, each
carrying `id`, `festival_date`, `starts_at`, `ends_at`, and `stage`. An
announced-without-schedule artist has none of those. Emitting such rows turns the list
into a discriminated union and breaks two things the frontend relies on:
`runAppearancesStore`'s grouping by appearance rows, and `RunArtist`'s non-empty
`appearances` tuple. Adapting those is roadmap sections 5 and 8, not this backend PR.
A sibling endpoint keeps section 4 purely additive: nothing the current frontend reads
changes.

### Why the full announced set, not only the unscheduled artists

Returning only the artists `/appearances` misses would need a `NOT EXISTS` filter and
force the frontend to merge two feeds for a partially-scheduled run. A schedule-agnostic
feed is one primitive with an honest name; the frontend reads it or `/appearances`
based on `schedule_state`.

### Terminology

The feed is named for **artists**. Not "lineup" (ADR-0006 reserved that term:
`LineupEntry` is booking and membership, independent of schedule) and not "catalog"
(considered and rejected in ADR-0006).

## Consequences

- `schedule_state` is one indexed aggregate query on an endpoint that is already
  time-revalidated ([ADR-0008](0008-time-based-fetch-revalidation.md)). No column, no
  write-path bookkeeping, no way for the flag to drift from the Appearance rows it
  describes.
- **The `schedule_state` threshold has a known limitation.** Flipping to `"scheduled"`
  on the first Appearance is sound only while scheduling arrives as a whole-run batch.
  Today it does: `build_roster_payloads.py` creates a run's lineup entries and their
  Appearances together from one CSV, and there is no per-artist scheduling workflow
  ([ADR-0004](0004-model-artist-curation-and-scheduling.md) separates booking from
  scheduling, but no tool schedules a single already-booked artist). An incremental
  "schedule these few now" workflow would show a run as `"scheduled"` with a near-empty
  grid. A stricter threshold ("every announced entry is scheduled") is worse: one
  perpetually-TBA artist would pin a run in `"announced"` indefinitely. If incremental
  scheduling ever ships, the fix is an explicit schedule-published flag or timestamp on
  `FestivalRun`, decoupled from Appearance counts. Recorded in
  `docs/FUTURE_CONSIDERATIONS.md`, not built now.
- `read_festival_run_artists` runs `_map_quick_picks_track` and
  `_read_run_similar_artists` across the whole announced, published set, the same cost
  profile as the appearances feed ([ADR-0007](0007-quick-picks-track-and-similar-artists-on-bulk-appearances.md)),
  and inherits its fail-loud-for-the-whole-batch behavior on a missing `billing_tier`
  or `quick_picks_track`.
- For a fully-scheduled run, the run-artists feed's artist data overlaps the
  appearances feed's. The frontend reads one or the other by `schedule_state`, never
  both, so the overlap is never fetched twice.
- `_resolve_run` and `_map_run_artist` become shared helpers between the two bulk
  feeds.

## Alternatives considered

- **Extend `read_festival_run_appearances` and its response to carry
  announced-without-schedule entries.** Rejected: it is a breaking shape change to a
  flat, homogeneous list, and it pulls frontend store and projection work into a
  backend-only PR. ADR-0015's "the feed is extended" wording predates this concrete
  shape constraint; this record resolves it.
- **Return only the unscheduled announced artists from the new feed.** Rejected: needs
  a `NOT EXISTS` filter and a frontend merge for partially-scheduled runs. The full
  announced set is the simpler primitive.
- **Store `schedule_state` or a `schedule_published_at` column now.** Rejected: no
  workflow would set it (scheduling is batch and all-or-nothing), so it would duplicate
  a derivable fact and invite drift. Revisit when incremental scheduling exists.
- **Fold this into ADR-0015's consequences.** Rejected: an accepted ADR's body is not
  amended, and this adds a public endpoint plus a response field and settles a question
  ADR-0015 deferred. The house rule is a new, cross-linked record. It is also larger
  than ADR-0007, which got its own record for adding two fields to one endpoint.
- **Name the feed `/lineup`.** Rejected: ADR-0006 reserved "lineup" for `LineupEntry`.

## References

- [ADR-0004: Model artist curation, lineup membership, and scheduled appearances](0004-model-artist-curation-and-scheduling.md)
- [ADR-0006: Share canonical Appearance identity and display data through one run-appearances store](0006-shared-run-appearances-store.md)
- [ADR-0007: Extend the bulk appearances endpoint with Quick Picks' editorial fields](0007-quick-picks-track-and-similar-artists-on-bulk-appearances.md)
- [ADR-0008: Time-based revalidation for the two FastAPI fetch sites](0008-time-based-fetch-revalidation.md)
- [ADR-0015: Multi-festival and multi-run support](0015-multi-festival-and-multi-run-support.md), which deferred this decision
- [Multi-festival and multi-run roadmap](../roadmap/multi-festival.md), section 4
- `docs/FUTURE_CONSIDERATIONS.md` "Artist Detail Schedule States" and "Run Schedule-State Threshold"
