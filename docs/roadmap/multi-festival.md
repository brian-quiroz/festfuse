# Multi-Festival and Multi-Run Roadmap

This roadmap picks up where [`artist-authoring.md`](./artist-authoring.md) leaves off.
That roadmap made PostgreSQL the sole artist data source for one festival
(Lollapalooza 2026, run `main`); this one generalizes FestFuse past that single
hard-coded edition and run so it can host **multiple festivals** — including editions
that run **more than one weekend** — and can present a festival whose **lineup is
announced before its schedule exists**.

It is the implementation sequence — deliverables and checkpoints. This is FestFuse's
first feature that is full-stack from the start: schema, backend, API, frontend,
routing, persisted user state, and new festival data all move together for one
user-visible outcome. The reasoning behind the model and scope is in
[ADR-0015](../decisions/0015-multi-festival-and-multi-run-support.md). The festival
hierarchy it builds on (`FestivalSeries → FestivalEdition → FestivalRun →
FestivalDay / LineupEntry → Appearance`, with `Stage` owned by the edition) is in
[ADR-0002](../decisions/0002-model-festival-runs-and-days.md) /
[ADR-0003](../decisions/0003-separate-festival-series-and-editions.md) /
[ADR-0004](../decisions/0004-model-artist-curation-and-scheduling.md) and
[`artist-data-model.md`](../design/artist-data-model.md).

## Target

Add **Austin City Limits 2026** as a second live festival — two weekends modeled as
two `FestivalRun`s of one edition — with Lollapalooza 2026 staying live alongside it.
FestFuse becomes a multi-festival browser: the user picks an active festival edition +
run, and every workflow is scoped to it.

Coachella 2027 follows ACL on the same generalized machinery. Coachella's lineup
typically drops months before its set times, so it is the real first consumer of the
announced-lineup-without-schedule path — that capability is built and verified here
even though Coachella itself is not imported in this roadmap.

## Completion bar

**Required:**

- The app is generalized: no hard-coded `ACTIVE_FESTIVAL_ID` / `ACTIVE_FESTIVAL_RUN_SLUG`;
  festival + run identity lives in the URL and in a persisted active-context selection.
- Returning users keep their local state through the change: a one-time localStorage
  migration re-scopes existing picks, schedules, and attendance-day selections.
- ACL 2026 is seeded (edition, both weekend runs, days, and stages) on the local and
  hosted database.
- The full ACL 2026 roster is imported and published to a **baseline** — three genres
  and one Quick Picks track per artist, image optional. Shared Lollapalooza/ACL
  artists reuse their existing global `Artist` record and gain an ACL `LineupEntry`.
- The announced-lineup-without-schedule capability is built and verified end to end.

**Not required here:**

- Coachella import — its lineup-drop date is not reliably known.
- Full editorial review of the ACL roster (about copy, per-run similar-artist
  curation, genre/location fact-check). That runs as a parallel track per
  [`../process/artist-editorial-process.md`](../process/artist-editorial-process.md);
  publication gates on neither `about` nor the similar-artist set (ADR-0013), so ACL
  ships usable without it and "Sounds like" is simply absent for ACL until curated.

## Product behavior (decided; see ADR-0015)

### Active context and navigation

- The app has one active context: a `{ festival edition, festival run }` pair. The
  most recent selection persists and is used throughout the app.
- The context selector lives in the sidebar (its current placement is fine for this
  milestone; a later top-navigation design is a separate question). It is not shown in
  immersive flows where the sidebar is already hidden — the Quick Picks decision
  sequence and Festival Story.
- For an edition with only one run, that run is selected automatically and no run
  choice is presented. The URL still contains the run.
- Homepage `/`: if an active context exists, show the existing Explore / Quick Picks /
  Planner cards scoped to it; if none exists, ask the user to pick a festival and run
  before entering those workflows. This is based on whether a context exists, not on
  detecting a first visit.

### URLs

Scoped workflow pages use fully explicit canonical URLs containing both the edition
and the run:

```text
/festivals/acl-2026/weekend-1/explore
/festivals/acl-2026/weekend-1/quick-picks
/festivals/acl-2026/weekend-1/planner
/festivals/acl-2026/weekend-1/artist/{slug}
```

The run is always included, including for single-run editions. The full `/festivals`
namespace is used, not an abbreviation. Unscoped convenience routes and
last-context redirect behavior (e.g. `/explore` → last active context) are **out of
scope** — see `docs/FUTURE_CONSIDERATIONS.md`. The homepage `/` may use the persisted
active context because it is the app's entry point.

### User-state scoping

State is scoped to what the user's choice means:

| State                                  | Scope                |
| -------------------------------------- | -------------------- |
| Must See / Interested / Pass decisions | Festival **edition** |
| Schedules                              | Festival **run**     |
| Attendance-day selections              | Festival **run**     |

Consequences: switching between an edition's weekends keeps picks for artists shared
by both runs; Quick Picks in the second weekend surfaces that run's _undecided_
artists rather than re-asking overlapping ones already decided for the edition; each
weekend has an independent schedule; switching to a different edition does not carry
the previous edition's picks; an edition-level pick may remain stored for an artist
not present in the current run, but it must not appear as an actionable current-run
artist.

A future global Save/Favorite scoped to the canonical artist — lasting affinity,
distinct from an edition-scoped pick — is noted in `docs/FUTURE_CONSIDERATIONS.md` and
is not built here.

### Announced lineup, no schedule yet

When a run's lineup is announced but no day assignments or set times exist. General
rule: **hide** unavailable controls, never render them disabled in place; each screen
adapts to the run's data.

- **Explore** — available. Hide the day, time, stage, and schedule-status filters and
  all scheduling controls; no day-based sorting or carousel grouping; present artists
  as one run-level lineup.
- **Quick Picks** — available in full-lineup mode. Hide (not disable) the Full Lineup /
  By Day control, festival attendance-day selection, and all day-specific progress,
  grouping, and explanatory copy. Briefly explain that it will review the announced
  lineup, then let the user begin.
- **Artist Detail** — hide the schedule/appearance card and Add to Schedule; no empty
  placeholders for unknown day/time/stage. Announced membership in the run may still
  be communicated.
- **Planner** — unavailable until the full schedule exists. The Home card stays
  visible but disabled ("Available when the festival schedule is announced"); Planner
  is removed from the sidebar while unavailable; reaching the Planner URL directly
  shows an unavailable state with links to Explore and Quick Picks, not a redirect or 404.
- **Festival Story** — available; omit day-, attendance-, and schedule-dependent
  sections and calculations, telling the story from the information that exists.

Everything not fixed above — the visual design of the context selector, the
no-context homepage prompt, and the Planner-unavailable state; whether the
Chicago-specific carousel is renamed and to what; copy wording — is decided at the
step that builds it, not here.

## Current boundary

Sections 2 and 3 have shipped: seeding is config-driven, ACL 2026's hierarchy (two
runs, days, stages) is seeded on both databases, and `build_roster_payloads.py` can
add an artist who already exists to another run through `add_existing_artist_to_run`.
The backend hierarchy already supported the rest: the run-scoped read API
(`/festivals/{edition}/runs/{run}/…`) resolves a run by edition-slug plus run-slug with
no single-run assumption; `LineupEntry` and `SimilarArtistSet` are per-run; artist
identity, genres, tracks, about, image, and videos are global and reusable across
editions and runs. The remaining gaps: the bulk appearances feed cannot surface an
announced entry with no scheduled appearance; and the entire frontend is wired to one
hard-coded festival and run with no festival/run in any URL and picks keyed by artist
slug alone.

## Rollout sequence

One branch and PR per section, matching how `artist-authoring.md`'s sections shipped.
Each section's checkpoint is its merge gate.

### 1. Roadmap and ADR

**Status: completed.**

- This document.
- [ADR-0015](../decisions/0015-multi-festival-and-multi-run-support.md): the
  active-context model, the `/festivals/{edition}/{run}` URL contract, per-concept
  user-state scoping and the localStorage migration, config-driven seeding, and the
  decision to add an existing artist to a run through the roster fan-out rather than a
  new top-level workflow.
- Whether announced-lineup-without-schedule earns its own ADR-0016 (with Coachella as
  the motivating example) or folds into ADR-0015's consequences is settled when
  section 4 / 8 is built, once the schedule-state design is concrete.
- `docs/FUTURE_CONSIDERATIONS.md`: record the two options declined up front — a global
  Save/Favorite scoped to the canonical artist (as an update to the existing
  "Festival-Agnostic Bookmarking" entry), and unscoped convenience routes / a
  last-active-context redirect (a new entry).
- Cross-links: `docs/decisions/README.md` table, `artist-authoring.md`'s "Next"
  section, `README.md` "Current Scope and Roadmap", AGENTS.md "Current Milestone".

**Checkpoint reached:** the model, scope, product behavior, and open decisions are
recorded before any code.

### 2. Config-driven seeding and the ACL 2026 hierarchy

**Status: completed.**

- `backend/scripts/seed_festivals.py` is config-driven: one module per edition in
  `backend/scripts/festival_configs/` (`_types.py`, `lollapalooza_2026.py`,
  `acl_2026.py`, `__init__.py` registry), no inline literals. `build_edition()` is a
  pure config → ORM seam; `seed_edition()` does insert-only per-entity get-or-create
  (series, edition, run, day, stage) keyed on the existing unique constraints, so an
  existing row is never updated or deleted. The script takes `--preview` / `--apply`
  (the same safety convention as the authoring CLIs) and an optional `--edition`.
- The ACL 2026 config: series `austin-city-limits`, edition `acl-2026` (Austin, Texas,
  `America/Chicago`), runs `weekend-1` (Oct 2–4 2026) / `weekend-2` (Oct 9–11 2026),
  and the seven-stage set (T-Mobile, Miller Lite, BMI, Beatbox, Tito's, Snapchat,
  American Express), identical across both weekends.
- Genre-vocabulary additions are deferred to section 10: which genres ACL needs is
  known only once the roster CSV exists. The two-file mechanism (`genres` row plus
  `app/data/categories.ts`) is the existing "Genre Vocabulary Lives in Two Places"
  future consideration.
- `backend/tests/integration/test_clean_bootstrap.py` asserts per-edition hierarchy
  counts and re-runs the seed to prove idempotency; `backend/tests/test_festival_configs.py`
  is the new no-database unit test for the configs and `build_edition()`.
- Operational docs (`local-development.md`, `backend-deployment.md`,
  `backup-restore.md`) updated for the `--apply` seed command and stage seeding.

**Checkpoint reached:** ACL 2026's hierarchy (two runs, days, stages) seeds
idempotently on the local and the hosted Railway database, with Lollapalooza's rows
untouched.

### 3. Add an existing artist to a new run's lineup

**Status: completed.**

- `build_roster_payloads.py` fans an existing slug into `add_existing_artist_to_run`
  in `backend/app/services/artist_authoring.py`: that run's `LineupEntry` plus its
  `Appearance`s from the CSV, against the one global `Artist`. A genuinely new slug
  still runs through `create_artist`; a slug already in the target run is reported
  skipped so a partial import repeats safely. The script resolves the `--run` before
  the fan-out.
- No standalone single-artist CLI. The roster fan-out is the only consumer this
  milestone needs (section 10 imports per run). A thin hand-operated CLI is deferred
  in `docs/FUTURE_CONSIDERATIONS.md` until a real late-addition need appears.
- The cross-row rule (an `Appearance`'s `festival_day` belongs to its lineup entry's
  run, its `stage` to that run's edition) is anchored in `_attach_appearances`, which
  derives the run and edition from the lineup entry itself rather than from
  caller-supplied values. It stays backend/import validation, not a database
  constraint (ADR-0004, `artist-data-model.md` "Appearances and stages"); no schema
  change.
- No placeholder `SimilarArtistSet` is created for the added run. "No set row" is the
  correct "curation has not started" state (`artist-data-model.md` "Similar artists");
  the editorial `edit_artist` path creates the set when a per-run set is curated.
- Coverage lives in `backend/tests/integration/test_artist_authoring.py` (the service
  function and the roster fan-out); the paragraph and coverage bullets in
  `backend/tests/README.md` are updated.

**Checkpoint reached:** the authoring path can add an artist who already exists to
another run's lineup: a second `LineupEntry` against the same global `Artist`, carrying
its own appearances. An appearance whose day or stage falls outside that run is
rejected. Proven end to end in the backend test suite. No ACL roster data is imported
here; that is section 10.

### 4. Serve an announced lineup that has no schedule yet

**Status: not started.**

- The per-artist endpoint already returns an announced entry with an empty appearance
  list (tested). The bulk `read_festival_run_appearances` is an appearance-driven feed
  — a zero-appearance announced artist never appears, so Explore / Quick Picks /
  Festival Story cannot render the run. Extend it (or add a sibling query) to return
  announced, published artists with no scheduled appearance.
- Extend the run-appearances response shape to represent "announced, not yet
  scheduled" per artist.
- Expose per-run **schedule state** (scheduled once the run has at least one scheduled
  `Appearance`) on the festival endpoint's run representation, so the frontend gates
  Planner and the sidebar without inferring it from an empty feed.
- Decide bulk cancelled-appearance handling (the bulk feed excludes cancelled
  entirely today — see `docs/FUTURE_CONSIDERATIONS.md` "Artist Detail Schedule
  States").
- Coverage in `backend/tests/integration/test_run_appearances_query.py`.

**Checkpoint:** a run with an announced lineup and no schedule is fully described by
the API, both bulk and per-artist.

### 5. `/festivals/{edition}/{run}` routing and data scoping

**Status: not started.**

- Move `/explore`, `/quick-picks`, `/planner`, `/credits`, `/artist/[slug]` under
  `app/festivals/[edition]/[run]/…`. A segment layout does the run-scoped appearances
  fetch (moved out of the root layout) and hydrates `runAppearancesStore`.
- `runAppearancesStore` keys its data by edition + run rather than holding one unkeyed
  run feed.
- `app/data/festivals.ts` becomes a registry: editions → runs → days → stages, a
  hand-maintained frontend mirror (same rationale as the genre allowlist in
  `ARCHITECTURE.md`; serving it from the festival endpoint is a later consolidation).
  The `Stage` union type and `KNOWN_STAGES` widen to every edition's stages.
- The module-load `const DAY_ORDER = getDaysForActiveFestival()` in `carousel.ts`,
  `sort.ts`, and `schedule.ts` becomes per-run resolution.
- Every `ACTIVE_FESTIVAL_ID` / `ACTIVE_FESTIVAL_RUN_SLUG` / `getDaysForActiveFestival`
  / `getStagesForActiveFestival` call site (~30 files) takes context from route
  params or the active context. `getDaysForFestival` generalizes to `(edition, run)`.

**Checkpoint:** `/festivals/lollapalooza-2026/main/explore` and its siblings render
identically to today's routes — zero regression — and a second edition/run renders.

### 6. Active-context store, homepage, and sidebar selector

**Status: not started.**

- New persisted `app/store/activeContextStore.ts` holding `{ editionSlug, runSlug } |
null`, using the same hydration pattern as the other persisted stores and added to
  `HydrationGate`. Visiting a scoped URL also updates it.
- Sidebar: the edition + run selector; auto-select the sole run for a single-run
  edition.
- Homepage: the context-exists / no-context gating logic above. When the active run
  has no schedule (section 4's flag), the Planner card renders disabled, and Planner
  is dropped from the sidebar nav.
- The selector stays out of Quick Picks decisioning and Festival Story.

**Checkpoint:** with a persisted context the homepage deep-links into scoped URLs;
with none, entry is gated behind selection.

### 7. Persisted-state scoping and the localStorage migration

**Status: not started.**

First use of zustand `persist` `version` + `migrate` in this repo — this section
establishes the pattern. Closest existing precedents: `scheduleStore`'s custom
`storage` object and `sanitizeAttendanceDays`'s read-time repair.

- `decisionStore`: rekey `decisionsByArtist` to `{editionSlug}:{slug}`; `version: 1`
  `migrate` maps every legacy bare-slug key to `lollapalooza-2026:{slug}`. Readers
  that iterate the whole map filter to the active edition.
- `scheduleStore`: keys become run-scoped (`{edition}:{run}::{slug}::{appearanceId}`);
  `migrate` rewrites legacy `lollapalooza-2026::…` to `lollapalooza-2026:main::…`.
  `deriveScheduleState` is de-hardcoded to the active run.
- `attendanceStore`: rekey from `{editionId}` to `{editionSlug}:{runSlug}`; `migrate`
  maps `lollapalooza-2026` to `lollapalooza-2026:main`.
- Verify each migration against a real pre-existing localStorage blob from the current
  production build.

**Checkpoint:** a returning Lollapalooza user keeps every pick, scheduled set, and
attendance-day selection; cross-festival contamination is structurally impossible.

### 8. Announced-lineup-without-schedule behavior (frontend)

**Status: not started.**

The contract is the "Announced lineup, no schedule yet" spec above.

- `mapFestivalArtistResponse` currently throws on zero appearances or any cancelled
  appearance; it represents a no-schedule / cancelled state instead.
- Explore, Quick Picks, Artist Detail, and Festival Story adapt per the spec (hide,
  don't disable in place).
- Planner renders an unavailable route state; its card and sidebar gating are in
  section 6.
- Only the visual styling of each adapted screen and the exact copy are step
  decisions.

**Checkpoint:** a run with an announced lineup and no schedule is navigable across
Explore, Quick Picks, Artist Detail, and Festival Story with no schedule controls
rendered; Planner is cleanly unavailable.

### 9. Festival- and city-generic content

**Status: not started.**

- The Chicago-specific Explore carousel and the Festival Story hometown signal key off
  the active edition's city, not a hardcoded "Chicago".
- Festival name in copy (Story intro headline, Artist Detail "Playing At" title,
  Footer disclaimer) comes from the registry, not literals.
- `verify-story-signals.ts` stays calibrated to the frozen Lollapalooza provenance
  snapshot; a separate ACL fixture pass is out of scope (note it in
  `docs/FUTURE_CONSIDERATIONS.md`).

**Checkpoint:** no hardcoded "Chicago" or "Lollapalooza" reaches the UI; ACL renders
its own city and name.

### 10. Import the ACL 2026 roster

**Status: not started.**

- Hand-author the ACL roster CSV(s), one per run, per
  [`../process/artist-editorial-process.md`](../process/artist-editorial-process.md).
- Run `build_roster_payloads.py` for each run: new artists created draft; shared
  Lollapalooza artists gain an ACL `LineupEntry` (section 3).
- Curate three genres, a primary, and one Quick Picks track for each genuinely new
  artist, then run the guarded `publish_artists.py` — never a manual status flip.
- Apply to both the local and the hosted Railway database.
- Editorial review (per-run similar-artist sets, ACL-specific `about`) is deferred to
  the parallel editorial track. Note the growing per-run re-curation cost in
  `docs/FUTURE_CONSIDERATIONS.md` "Similar-Artist Relationship Graph".

**Checkpoint:** ACL 2026 is fully imported and published to the baseline, both
weekends, on the local and hosted database.

### 11. Documentation closeout

**Status: not started.**

- `ARCHITECTURE.md`: rewrite "Festival Configuration" for the registry +
  active-context + routing model; document the no-schedule states; resolve the
  "Festival Scoping" MUST-fix note.
- `docs/design/artist-data-model.md`: only if the schema actually changed.
- `README.md` "Current Scope and Roadmap", AGENTS.md "Current Milestone" and Stack.
- `docs/FUTURE_CONSIDERATIONS.md`: top-navigation and context-selector migration;
  per-run similar-artist re-curation cost; ACL verify-story fixture. (Global favorites
  and unscoped convenience routes were recorded up front, in section 1.)

**Checkpoint:** the always-loaded docs describe multi-festival as built.

## Guardrails

- Do not reintroduce a single hard-coded festival or run as a shortcut; the URL and
  the active context are the only sources of scope.
- Do not migrate persisted user state by silently discarding it — a returning user's
  picks, schedules, and attendance days must survive (the `scheduleStore` bare-slug
  format change in `feature/multi-appearance-support` was acceptable only because the
  app had never been deployed; it has now).
- Every schema change and data write applies to **both** the local and the hosted
  Railway database — schema via the deploy pipeline, data via the encrypted tunnel. A
  change applied only locally is not done.
- Publication stays the guarded `publish_artists.py` workflow; never flip
  `publication_status` by hand.
- Festival, run, day, and stage creation stay `seed_festivals.py`'s responsibility.
- Do not treat the ACL editorial review as a blocker for this roadmap; it is a
  parallel track.

## Next

Broader automated test coverage — standing up a frontend test framework (none exists
today) and expanding the backend suite — is the remaining MVP 2.0 item and gets its
own roadmap.

Not scheduled here: Coachella 2027 as a third edition, using this roadmap's seed
config, roster fan-out, and announced-lineup path unchanged — gated on Coachella's
lineup announcement, so it can't be sequenced. The ACL 2026 editorial pass continues
on the parallel track in section 10.
