# ADR-0015: Multi-festival and multi-run support

- Status: Accepted
- Recorded: 2026-08-28

## Context

FestFuse ships one festival: Lollapalooza 2026, single run `main`. The PostgreSQL
festival hierarchy was deliberately built for more —
[ADR-0002](0002-model-festival-runs-and-days.md) /
[ADR-0003](0003-separate-festival-series-and-editions.md) /
[ADR-0004](0004-model-artist-curation-and-scheduling.md) model
`FestivalSeries → FestivalEdition → FestivalRun → FestivalDay / LineupEntry →
Appearance` with `Stage` owned by the edition, and the run-scoped read API already
resolves a run by edition-slug + run-slug with no single-run assumption. `LineupEntry`
and `SimilarArtistSet` are per-run; artist identity, genres, tracks, `about`, image,
and videos are global and reusable across editions and runs.

What is not built:

- The frontend is wired to hard-coded `ACTIVE_FESTIVAL_ID` / `ACTIVE_FESTIVAL_RUN_SLUG`
  constants. No festival or run appears in any URL. `runAppearancesStore` holds one
  unkeyed run feed fetched in the root layout.
- `decisionsByArtist` (Must See / Interested / Pass) is keyed by artist slug alone.
  `ARCHITECTURE.md` flags this as a MUST-fix before a second festival: a decision for
  an artist at one festival would silently apply to that artist at every festival.
- `seed_festival.py` is hard-coded to Lollapalooza and seeds no stages (stages arrive
  only through `pg_restore` today).
- No authoring path adds an _existing_ artist to a _new_ run — `create_artist` refuses
  a taken slug, `build_roster_payloads.py` skips it, `edit_artist` requires a
  pre-existing lineup entry. Lollapalooza and ACL share many artists.
- The bulk appearances feed is appearance-driven, so an announced lineup entry with no
  scheduled appearance is invisible to Explore / Quick Picks / Festival Story.

The target is **Austin City Limits 2026** as a second live festival — two weekends as
two `FestivalRun`s of one edition — with Lollapalooza staying live. FestFuse becomes a
multi-festival browser. Coachella 2027 follows on the same machinery and, because its
lineup drops long before its schedule, is the real first consumer of the
announced-lineup-without-schedule path (built and verified here; Coachella itself is
not imported in this roadmap).

## Decision

### Active context

The app has one active context: a `{ festival edition, festival run }` pair. The most
recent selection persists in a new `activeContextStore` and is used throughout the
app. Scoped workflow pages read the context from the URL; the store is the entry
point (homepage) and the sidebar selector's backing state. Visiting a scoped URL also
updates the store.

For an edition with only one run, that run is selected automatically and no run choice
is presented — but the URL still contains the run.

### URLs

Scoped workflow pages use fully explicit canonical URLs containing both the edition
slug and the run slug, always, including for single-run editions:

```text
/festivals/{edition}/{run}/{explore|quick-picks|planner|credits}
/festivals/{edition}/{run}/artist/{slug}
```

The full `/festivals` namespace is used, not an abbreviation. The homepage `/` may use
the persisted active context. Unscoped convenience routes and last-context redirect
behavior are out of scope for this work.

### User-state scoping

State is scoped to what the user's choice means:

| State                                  | Scope                |
| -------------------------------------- | -------------------- |
| Must See / Interested / Pass decisions | Festival **edition** |
| Schedules                              | Festival **run**     |
| Attendance-day selections              | Festival **run**     |

Switching between an edition's weekends keeps picks for shared artists; Quick Picks in
the second weekend surfaces that run's undecided artists rather than re-asking
edition-decided ones; each weekend has an independent schedule; switching editions
does not carry picks. An edition-level pick may remain stored for an artist absent
from the current run, but must not render as an actionable current-run artist.

### localStorage migration

The persisted store format changes, so returning users' state is migrated, not
discarded. `decisionStore`, `scheduleStore`, and `attendanceStore` each gain a
zustand `persist` `version` + `migrate` (the first use of that mechanism in this
repo). The migration re-scopes every existing key to `lollapalooza-2026` (decisions)
or `lollapalooza-2026:main` (schedules, attendance). The `scheduleStore` bare-slug
format change in `feature/multi-appearance-support` was acceptable without a migration
only because the app had never been deployed; it has now, so a silent reset is not
acceptable this time.

### Config-driven seeding

`seed_festival.py` becomes config-driven — a per-edition config rather than inline
Lollapalooza literals — and seeds series → edition → every run → days **and stages**,
idempotently per entity. Adding a festival is adding a config entry plus a roster, not
editing the seed script's body.

### Adding an existing artist to a run

No new top-level authoring workflow or vocabulary. `build_roster_payloads.py`'s
existing-slug branch flips from _skip_ to _add that run's `LineupEntry`_ (plus its
appearances, plus optionally an empty run `SimilarArtistSet`), reusing the service
layer's `_resolve_run` / `_attach_appearances`. A genuinely new slug still runs
through `create_artist`. Whether a standalone single-artist CLI is also warranted, and
its name, is decided when section 3 of the roadmap is built.

### Announced lineup without schedule

The bulk appearances feed is extended to surface announced, published artists that
have no scheduled appearance, and per-run schedule state is exposed on the festival
endpoint. Each frontend surface adapts to a scheduleless run by **hiding** unavailable
controls rather than rendering them disabled: Explore drops all schedule filters and
day grouping; Quick Picks runs in full-lineup mode with no attendance-day step; Artist
Detail hides the schedule card; Planner is unavailable (disabled Home card, removed
from the sidebar, an unavailable route state — no redirect or 404); Festival Story
omits day- and schedule-dependent sections. Whether this earns its own ADR-0016 (with
Coachella as the motivating example) or stays recorded here is settled when that work
is concrete.

### Frontend festival registry

`app/data/festivals.ts` becomes a hand-maintained registry of editions → runs → days
→ stages — the same frontend-owned mirror pattern as the genre allowlist
(`ARCHITECTURE.md`, "Genre/Stage: Database Source of Truth vs. Frontend Allowlist").
The `Stage` union type and `KNOWN_STAGES` widen to every edition's stages. Serving the
registry from `GET /api/v1/festivals/{slug}` is a later consolidation, not required
here.

## Consequences

- FestFuse hosts multiple festivals simultaneously; Lollapalooza and ACL are both
  live, each scoped by URL and active context.
- A shared artist exists once — one global `Artist` row — with a `LineupEntry` per
  run. Editorial content (genres, `about`, image, tracks, videos) is authored once and
  shared; only lineup membership, appearances, and similar-artist sets are per-run, so
  a shared artist needs a new similar-artist set curated per ACL run (editorial track,
  not this roadmap).
- Returning users keep their picks, schedules, and attendance days through the
  cutover. The migration is one-time and idempotent; a user who never had local state
  is unaffected.
- The `persist` `version` + `migrate` pattern is now established for future store
  format changes.
- Adding a future festival (Coachella 2027) is a seed config entry, a roster CSV, and
  the editorial track — no further generalization of routing, state, or the API is
  expected.
- More routing surface (`/festivals/[edition]/[run]/…`) and a new persisted store, but
  no schema changes to the festival hierarchy itself beyond the announced-lineup feed
  shape and the appearance day/stage cross-row validation.
- A run whose schedule is not yet public is a first-class state across the app, not an
  error; Planner is the one workflow gated off until a schedule exists.
- ACL ships to a publishable baseline without full editorial review; "Sounds like" is
  absent for ACL artists until the parallel editorial track curates per-run sets.

## Alternatives considered

- **One festival per deployment, weekend picker only.** Rejected: the product intent
  is a multi-festival browser where Lollapalooza and ACL coexist, not a
  per-deployment build flag.
- **Namespace scoped routes under `/f/`.** Rejected: `/festivals` is self-explanatory
  and the abbreviation buys no routing advantage.
- **Hide the run from single-run URLs.** Rejected: a consistent URL shape
  (`/festivals/{edition}/{run}/…` always) is simpler to reason about and route than
  conditionally omitting a segment; the UI still hides the run _choice_.
- **Scope decisions to the run, not the edition.** Rejected: ACL's two weekends have
  near-identical lineups, and a Must See for an artist is about that artist at that
  festival — re-deciding the same artist for weekend two is friction with no meaning.
  Schedules and attendance days genuinely differ per weekend, so those are run-scoped.
- **Add a `book_artist` / dedicated "add existing artist to run" workflow.** Rejected:
  the only distinction from `create_artist` is that the artist already exists, which
  is a branch, not a new concept. New top-level vocabulary needs a stronger reason.
  The roster fan-out already branches on slug existence; it flips from skip to add.
- **Migrate persisted state by discarding it (as the earlier bare-slug change did).**
  Rejected: the app is deployed now; silently emptying a returning user's picks and
  schedule is a real regression.
- **Serve the festival/run/stage registry from the API instead of a frontend mirror.**
  Deferred: the frontend needs compile-time `Stage` union types and gradient lookups
  that a runtime response cannot provide, exactly as with genres; a later
  consolidation can revisit this.
- **A separate one-off ADR for announced-lineup-without-schedule now.** Deferred: the
  schedule-state design is not concrete until the feed and frontend work is built;
  ADR-0016 is created then if it earns its own record.

## References

- [Multi-festival and multi-run roadmap](../roadmap/multi-festival.md)
- [ADR-0002](0002-model-festival-runs-and-days.md),
  [ADR-0003](0003-separate-festival-series-and-editions.md),
  [ADR-0004](0004-model-artist-curation-and-scheduling.md) — the festival hierarchy
- [ADR-0011](0011-direct-to-postgresql-artist-authoring.md),
  [ADR-0013](0013-editorial-authoring-and-review-process.md) — artist authoring and
  the editorial process this roadmap runs a baseline import ahead of
- [Artist and festival data-model design](../design/artist-data-model.md)
- `ARCHITECTURE.md` — "Festival Configuration", "Interest State → Festival Scoping"
