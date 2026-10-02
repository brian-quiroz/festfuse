# ADR-0021: A departing act is a run-level lineup withdrawal

- Status: Accepted
- Recorded: 2026-10-02, written alongside the first official schedule change applied
  after launch (Austin City Limits 2026, festival week), following ADR-0016 through
  ADR-0020's precedent of a record written with the work.

## Context

ADR-0004 gave the schedule two retention states: a `LineupEntry` can be `withdrawn`
(the artist left one run's lineup) and an `Appearance` can be `cancelled` (one set
will not happen). The data model describes both lifecycles, but nothing decided which
real-world event maps to which state, or what a user who already saved a pick or a set
experiences when it happens. Until festival week there was no case to decide.

Austin City Limits reposted its official schedule grids twice during festival week.
Besides time and stage moves, several acts left a weekend's lineup: some were replaced
in their slot by a different act, one was dropped from both weekends' grids with no
replacement. FestFuse already had users with saved Pass / Interested / Must See
decisions and Planner schedules for those acts.

Two facts constrained the choice. The frontend cannot render a cancelled appearance:
the per-artist adapter throws on one, and the bulk run feed excludes them server-side
(ADR-0006, ADR-0016). And a saved Planner entry is keyed by run, artist slug, and
`Appearance.id` (`getAppearanceKey` in `app/lib/schedule.ts`).

## Decision

1. **An act that leaves one run's lineup is a withdrawal of that run's
   `LineupEntry`.** Its status becomes `withdrawn` and `withdrawn_at` records when the
   change became known. This applies whether the act was replaced in its slot or
   dropped outright. It is per run: withdrawing an act from weekend 1 leaves its
   weekend 2 entry untouched.

2. **Its appearances are retained, unchanged.** They are neither deleted nor
   cancelled. Public queries read only `announced` entries, so withdrawal alone removes
   the act from every public surface, and the rows remain as the record that the act
   was announced and scheduled.

3. **`cancelled` is reserved for a set that will not happen while the act stays on the
   lineup**: a weather cancellation, or one of an artist's two sets dropped. Using it
   needs a cancellation UI first (FUTURE_CONSIDERATIONS, "Artist Detail Schedule
   States").

4. **A replacement act gets its own `LineupEntry` and `Appearance`.** The departing
   act's `Appearance` row is never reassigned to the new act, even when the slot is
   identical.

## Consequences

- The act disappears from Explore, Artist Detail, Quick Picks, the Planner grid, and
  Festival Story for that run once the frontend's fetch cache revalidates (ADR-0008).
- Saved data is kept, not migrated. A user's decision for the act stays in local
  storage. Lineup-driven surfaces ignore it, but the Sidebar's pick counts still
  include it, the same accepted discrepancy as an artist who plays only the other
  weekend (FUTURE_CONSIDERATIONS, "Pick Counts Not Scoped to a Run's Own Roster"). A
  saved Planner set for the act drops out of the Scheduled and Conflicts counts. No
  notice tells the user (FUTURE_CONSIDERATIONS, "Withdrawn Artists Leave Saved Picks
  Silently").
- A bookmarked Artist Detail URL for that run returns the not-found page. The act's
  page for a run it still plays keeps working.
- The `lineup_entries` invalidation trigger clears `verified_at` on every
  similar-artist set in that run that includes the act, so each source artist loses
  its Similar Artists section until the set is re-curated. Every withdrawal creates
  editorial follow-up work.
- Undoing a withdrawal is not supported. The run-and-artist unique constraint blocks a
  second entry, and no operation moves a withdrawn entry back to `announced`. If an
  organizer reverses a departure, that needs a deliberate reinstate step (and the
  affected similar-artist sets stay unverified until re-curated).

## Alternatives considered

- **Cancel the act's appearances.** Rejected. It records the wrong event (the act left
  the lineup, not one set), and the frontend cannot render a cancelled appearance yet,
  so it would throw on Artist Detail.
- **Hard-delete the lineup entry.** Rejected. It erases the fact that the act was
  publicly announced, which the data model deliberately keeps, and cascades away the
  appearance rows. The user-facing result is the same as a withdrawal.
- **Reassign the departing act's `Appearance` row to the replacement act.** Rejected.
  It misattributes the row's history to an act that was never scheduled there, and it
  does not even preserve saved schedules: the saved key includes the artist slug, so
  the user's entry would orphan anyway.

## References

- [ADR-0004: Model artist curation, lineup membership, and scheduled appearances](0004-model-artist-curation-and-scheduling.md),
  which introduced both states
- [ADR-0006: Share canonical Appearance identity and display data through one run-appearances store](0006-shared-run-appearances-store.md)
- [ADR-0008: Time-based revalidation for the two FastAPI fetch sites](0008-time-based-fetch-revalidation.md)
- [ADR-0016: Describe a run without a public schedule in the API](0016-describe-a-run-without-a-public-schedule.md)
- [ADR-0022: Official schedule changes are natural-key changesets applied in place](0022-schedule-changes-as-natural-key-changesets.md),
  the tooling that applies this rule
- [`docs/design/artist-data-model.md`](../design/artist-data-model.md), LineupEntry and
  Appearance lifecycles
- [`docs/FUTURE_CONSIDERATIONS.md`](../FUTURE_CONSIDERATIONS.md), "Pick Counts Not
  Scoped to a Run's Own Roster", "Withdrawn Artists Leave Saved Picks Silently",
  "Artist Detail Schedule States"
