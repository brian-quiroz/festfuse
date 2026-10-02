# ADR-0022: Official schedule changes are natural-key changesets applied in place

- Status: Accepted
- Recorded: 2026-10-02, written alongside `scripts/apply_schedule_changes.py` and its
  first use (Austin City Limits 2026, festival week), following ADR-0016 through
  ADR-0021's precedent of a record written with the work.

## Context

An organizer's schedule change during festival week arrives as a batch: set times
shift, sets swap stages, acts leave a run's lineup. The authoring CLIs did not cover
it. `edit_artist` (ADR-0012) patches one artist's facts and never touches appearances,
and nothing could withdraw a lineup entry. The only route was hand-written SQL against
the hosted database while users were actively planning.

Three constraints shaped the tooling:

- A saved Planner entry is keyed by run, artist slug, and `Appearance.id` (ADR-0006).
  Any approach that deletes and re-creates an appearance silently drops it from every
  user's saved schedule.
- The local and hosted databases do not share `Appearance.id` values. The ids come
  from a sequence, and the local one has advanced far past the hosted one (rolled-back
  integration tests and rebuilds still consume sequence values). A change described by
  id applies to one database only.
- Changes arrive in waves. The same changeset may be previewed, applied locally,
  verified, then replayed against the hosted database, and a later wave may build on
  an earlier one. Re-running a file by mistake must not double-apply it.

## Decision

1. **A schedule change is one JSON changeset per edition**, validated by a strict
   schema (`app/schemas/schedule_change.py`) and applied by
   `scripts/apply_schedule_changes.py` with the same `--preview` / `--apply` modes as
   the other authoring CLIs. All operations run in one transaction: the whole
   changeset applies or nothing does.

2. **Two operations.** `move` changes an appearance's stage and times on the same date.
   `withdraw` withdraws a run's lineup entry, per ADR-0021. Arriving acts are not an
   operation: `add_artist` and `add_existing_artist_to_run` already create a lineup
   entry with its appearances.

3. **A move edits the existing `Appearance` row in place**, so its id, and every saved
   Planner entry keyed by it, survives.

4. **Appearances are addressed by natural key, never by id**: run, artist slug, and
   the appearance's current stage, date, and start time. A `before` slot that matches
   no scheduled appearance is refused with the artist's current slots listed. A move
   whose `after` slot is already current is refused as already applied. The same file
   therefore replays against any database holding the same schedule, and a stale or
   repeated file fails loudly instead of re-applying.

5. **Overlaps are refused at apply time.** After every operation runs, a moved
   appearance that overlaps another active set on its stage, or another set by the same
   artist, refuses the whole changeset. Overlaps that no moved appearance takes part in
   are left alone. Because withdrawn entries are not active, a move into a slot freed
   by a withdrawal in the same changeset is accepted regardless of operation order.

## Consequences

- Moves preserve users' saved schedules. On the first use, spot-checked moved
  appearances kept their ids on both databases.
- One reviewed changeset file is the artifact for both databases, and its preview
  output is the review surface. Changeset files are operational data kept outside the
  repository, like database dumps.
- A withdrawal's preview lists the similar-artist sets it unverifies, which turns
  ADR-0021's re-curation cost into a concrete worklist.
- Not supported yet: moving a set to a different date, reinstating a withdrawn entry,
  and cancelling an appearance (ADR-0021 decision 3). Each is a new operation when a
  real case needs it.
- The overlap check covers only this path. `add_artist` and the roster import still
  accept an overlapping set (FUTURE_CONSIDERATIONS, "Overlap Validation on Authoring
  Imports").

## Alternatives considered

- **Hand-written SQL per change.** Rejected. No preview, no validation, and nothing
  that replays identically against the second database.
- **Id-addressed changes** (the shape of the external schedule-diff data that first
  reported the change). Rejected: correct for the hosted database only, and a typo in
  an id silently edits the wrong set.
- **Delete and re-import the affected acts** through `build_roster_payloads`. Rejected.
  It creates new appearance ids and drops every saved Planner entry for those sets.
- **Extend `edit_artist` with appearance fields.** Rejected. It patches one artist's
  facts; a schedule change is a cross-artist batch whose validity (overlaps, freed
  slots) depends on the whole set of changes together.

## References

- [ADR-0006: Share canonical Appearance identity and display data through one run-appearances store](0006-shared-run-appearances-store.md)
- [ADR-0011: Direct-to-PostgreSQL artist authoring workflow](0011-direct-to-postgresql-artist-authoring.md)
- [ADR-0012: Field-level artist edit workflow](0012-field-level-artist-edits.md)
- [ADR-0021: A departing act is a run-level lineup withdrawal](0021-departing-act-is-a-run-level-lineup-withdrawal.md),
  the rule the `withdraw` operation applies
- [`docs/roadmap/artist-authoring.md`](../roadmap/artist-authoring.md), section 8
- [`docs/FUTURE_CONSIDERATIONS.md`](../FUTURE_CONSIDERATIONS.md), "Overlap Validation
  on Authoring Imports"
