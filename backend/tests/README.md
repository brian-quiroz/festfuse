# Backend testing

FestFuse currently has two automated backend test layers. They serve different
purposes and intentionally have different database boundaries.

## Isolated API tests

`test_festivals.py` and `test_artists.py` send real HTTP requests through FastAPI's
`TestClient`, but `conftest.py` replaces the SQLAlchemy session dependency with a
mock. Artist router tests additionally mock the dedicated query boundary. These
tests exercise routing, endpoint behavior, status codes, nested response
serialization, not-found handling, and explicit inconsistent-data handling without
requiring PostgreSQL. This includes the two derived per-run fields on the festival
endpoint (ADR-0016) passing through: `schedule_state` for the announced and scheduled
cases, and `has_published_artists` across all three states an announced run can be in
(no schedule and no lineup, no schedule but a lineup, and scheduled). It also covers
the run-scoped `GET /festivals/{edition}/runs/{run}/artists` collection route
returning its announced artists and a 404 for an unknown run.

They are fast and run by default, but they do not prove that generated SQL, foreign
keys, migrations, or PostgreSQL behavior works.

`test_artist_authoring_schema.py` is fast and needs no database either: it exercises
the strict `ArtistAuthoringInput` Pydantic schema (rejection of legacy TypeScript-only
fields, required-field enforcement, slug/mbid/track-id/date/time shape checks,
four-or-none and self-reference rules) and the pure parsers in `app/lib/artist_source.py`.
It also covers the `ArtistEditInput` patch schema (ADR-0012): the empty patch, the
absent-vs-`null` distinction via `model_fields_set`, that `name`/`slug` cannot be
cleared, that clearing About forbids `aboutVerified`, that `listenFirst` needs `tracks`
in the same patch, and the rules now shared by both the create and edit schemas —
`imageUrl` ⟹ `imageVerified`, any image metadata requires `imageUrl`, and plausible
`imageTakenYear` / `imageSourcedAt` values.

`test_build_roster_payloads.py` (fast, no database) covers `parse_roster` from the
editorial pipeline (roadmap 4b, `docs/process/artist-editorial-process.md`): a single
row builds a valid draft-skeleton `ArtistAuthoringInput`, the weekday is derived from
the date and the edition year, `socialsVerified` is always `true` (even with no social
links), `mbid` is included only when present, multiple rows sharing a slug collapse into
one multi-appearance payload, and every unparseable case is reported without dropping
the rest of the file — a missing required cell, an unknown billing tier, rows for one
slug that disagree on a shared field, and two artists sharing a Spotify URL. It also
covers the roster-only path (multi-festival roadmap): a row with the four schedule
columns absent builds an announced payload (wrapper `billingTier`, no appearances);
a partial schedule row, a repeated announced row for one slug, and an announced row
with no billing tier are each reported; a schedule row may omit `billing_tier`
(inherited on the attach); and a file mixing announced and scheduled slugs is refused
whole.

`test_artist_publication.py` (fast, no database) covers `evaluate_artist_publication`,
the pure readiness policy: an ordinary artist and a complete curated Listen First
override are both ready, an incomplete record reports every relevant issue in order, and
a partial Listen First set is rejected. It also covers the video tier (ADR-0017): a
featured live-performance video makes an artist with no Spotify presence and no Quick
Picks track ready, an unavailable featured video does not, an artist with no preview of
any kind stays blocked, and `qualifies_by_video_only` is true only for the
video-and-no-audio case.

`test_festival_configs.py` (fast, no database) guards the hand-authored seed configs in
`scripts/festival_configs/` and the pure `build_edition()` config-to-ORM mapping in
`seed_festivals.py`: edition slugs are unique across the registry, each edition's runs
and stages carry `1..N` display orders with unique slugs, days are strictly ascending
and unique per run, `build_edition()` maps every field of every config onto the ORM
graph, and a dedicated snapshot pins the Lollapalooza 2026 config to the hierarchy that
shipped before seeding became config-driven. Persistence and idempotency are covered
against real PostgreSQL in `integration/test_clean_bootstrap.py`.

`test_check_artist_links.py` (fast, no network) covers the link classifier: `classify`
maps each HTTP status (and a network failure) to OK / BROKEN / UNVERIFIABLE, with
oEmbed 400/401 treated as BROKEN but a plain 401/403 as UNVERIFIABLE; `link_targets`
extracts every stored identifier (Spotify artist and track ids, YouTube video id,
social and image-source URLs) and gives a local `public/` image path no check URL; and
`_check_artist` maps a mixed set of mocked statuses, marking a local asset UNVERIFIABLE
and an oEmbed 401 BROKEN.

## PostgreSQL integration tests

`integration/test_artist_schema.py` connects through the real SQLAlchemy engine to a
local PostgreSQL database at the current Alembic revision. These tests exercise real
tables, SQL, constraints, indexes, trigger functions, cascades, and deferred foreign
keys. This is the integration boundary: Python, SQLAlchemy, Psycopg, the migration,
and PostgreSQL must work together.

When adding coverage for a new query, cross-reference the Enforcement Ownership
matrix in [artist-data-model.md](../../docs/design/artist-data-model.md) for the
entity being queried — it names specific rules (ordering, primary-flag placement,
status filtering) that are easy to under-test by accident. Relationship-loaded
collections (via `selectinload`/`joinedload`) are never trusted for order; the
mapping layer always applies an explicit `sorted(..., key=...)` instead.

`integration/test_artist_read_query.py` uses that same rollback-contained boundary
to prove the public Artist query's publication predicate, relationship eager loading,
Quick Picks role selection, deterministic genre and Listen First ordering, and a null
`quick_picks_track` for a video-only published artist (ADR-0017). It also proves that
About and supported social links obey their verification gates and that only an
available featured video is exposed. Festival-context cases prove published/announced filtering, required
billing, timezone conversion, scheduled/cancelled visibility, draft omission, and the
valid announced-without-schedule state. Similar Artist cases prove verified
four-or-none exposure, deterministic order, canonical target summaries, complete-set
hiding after target unpublication, and preservation of editorial verification.

`integration/test_run_read_query.py` uses the same rollback-contained
boundary to prove the run-scoped appearances feed behind the scheduling-identity
fix: draft Artist, non-announced lineup, draft-status, and cancelled-status
Appearances are all excluded (cancelled is deliberately excluded here, unlike the
per-Artist query — see ADR-0004); returned Appearances are ordered by start time and
mapped with the real database Appearance ID, correct timezone conversion,
primary-genre-first ordering, and correct artist location mapping; an announced
entry missing its billing tier raises the same consistency error as the per-Artist
query; and an unknown edition/run slug returns nothing to resolve, matching the
API's not-found behavior. It also proves the bulk endpoint's own curated Quick
Picks track mapping, and — using the same seeded 5sos similar-artist set as
`test_artist_read_query.py`'s equivalent single-artist case — that the batched,
run-scoped `similar_artists` query returns the same verified four-or-none result
and correctly re-hides the set once a target artist is unpublished (see ADR-0007
for why this became a batched query instead of a per-artist one).

The same file also proves the schedule-agnostic sibling `read_festival_run_artists`
(ADR-0016): an announced published artist with no appearances is returned, a scheduled
run's whole announced, published artist set is returned regardless of appearances,
draft artists and withdrawn entries are excluded, the artist projection (including the
poster-derived `billing_tier`) and the seeded 5sos four-or-none set map identically to
the appearances feed, a missing billing tier raises the same consistency error, and an
unknown edition/run slug returns nothing. Both feeds map a null `quick_picks_track` for
a video-only artist (ADR-0017).
Alongside it, `read_run_ids_with_public_schedule` (the query behind the derived per-run
`schedule_state`) reports the seeded Lollapalooza run as scheduled and, once every
appearance in that run is moved out of `scheduled` inside the rollback boundary,
reports it as announced.

`integration/test_artist_authoring.py` exercises the artist authoring service
(`create_artist` / `delete_artist`, ADR-0011) against the seeded database. It proves a
full create round-trip (genre order and primary flag, Quick Picks and Listen First
track roles, featured video, announced lineup entry with billing derived from the
appearances, one scheduled Appearance); that `about_verified_at` survives a create
because the invalidation trigger is `BEFORE UPDATE` only; that `SimilarArtistSet.verified_at`
is re-stamped after the `AFTER INSERT` entry trigger has fired; a partial create
(name/slug only) landing as a draft with a draft lineup entry and a readiness report
listing the gaps; the announced-without-schedule case using wrapper-level billing; and
clear refusals for a duplicate slug, a taken Spotify identity, an unknown
genre/similar-target/stage. For `add_existing_artist_to_run` it proves a seeded
Lollapalooza artist gains a second `LineupEntry` (ACL weekend 1) against the same
global `Artist` row with its own scheduled appearance, and refusals for an unknown
slug, a duplicate run membership, and an appearance whose day falls outside the target
run (the cross-row rule now anchored to the lineup entry in `_attach_appearances`).
For delete it proves owned rows are removed while shared
`Track` rows are kept, and that deleting a Similar Artist _target_ is refused unless
forced, in which case the incoming references are cleared and the referencing set loses
its verification. For `edit_artist` (ADR-0012) it proves the write-then-restamp
sequence for About and social verification (including the reviewed-empty socials
state), image set-then-clear, featured-video replace-then-clear, wholesale genre and
listening replacement with an idempotent re-apply, similar-set replacement re-stamping
`verified_at` while an unchanged set is left untouched, a slug clash with a different
artist refused (and the artist's own slug re-submitted as a no-op), refusals for an
unknown genre / artist / edition / run, that publication readiness is recomputed after
editing a draft, and that an edit which would drop a currently-publishable published
artist below the readiness bar is refused while a published artist that stays ready (or
was already below the bar) is still editable.

The same file also covers the editorial pipeline tooling (roadmap 4b): a roster
skeleton built by `parse_roster` and `create_from_payloads` persists as a `draft` with
its announced lineup entry and schedule and readiness gaps for the research pass; a
batch isolates a failed row (unknown stage) in its own savepoint without blocking the
good rows and skips a slug already in the target run; `--apply` commits each artist and
a rerun of the same roster reports every artist as skipped; a roster imported against a
different run adds an already-existing artist to that run (`would add to run` /
`added to run`, then `skipped` on a rerun); and `show_artist.py`'s detail and roster
renderers run against a seeded artist without error, showing readiness and the inbound
similar-artist reference count.

The staged import (multi-festival roadmap) is covered in the same file: a roster-only
row persists as an announced entry with no appearances; re-running with the full
schedule CSV routes each already-announced slug through `attach_run_schedule`
(`would schedule` / `scheduled`, then `skipped` on a third pass), leaving
`lineup_status` as `announced` while the appearances now exist; a schedule CSV with no
`billing_tier` column still attaches, inheriting the announced entry's tier; and
`attach_run_schedule` itself refuses a payload with no appearances, a slug with no
entry in the run, a run that already has a schedule, and a billing tier that is
supplied and disagrees with the announced entry.

`integration/test_clean_bootstrap.py` is the exception to the rollback-contained
pattern: it proves the from-empty half of "rebuild the database from PostgreSQL alone"
(roadmap section 5, ADR-0014). It creates a disposable `festfuse_cleanboot_*` database,
runs `alembic upgrade head` against it, asserts `alembic check` reports no drift
between the migrated schema and the SQLAlchemy metadata, runs `scripts.seed_festivals
--apply` (and again, and `--preview`, to prove the seed is insert-only and idempotent),
checks the per-edition festival hierarchy counts, and drops the database on teardown. It
refuses any database name it did not generate or that matches the configured database.
The `pg_dump` / `pg_restore` round trip itself is verified by running
`docs/operations/backup-restore.md` by hand.

Every other integration test creates temporary records inside an outer transaction and
rolls that transaction back during cleanup. PostgreSQL genuinely executes the writes
and constraints, but successful tests do not leave fixture data behind.

The integration suite currently verifies:

- installation of `updated_at` triggers on all new timestamped tables;
- About and supported-social verification invalidation;
- valid reviewed-empty social state;
- the image-metadata constraint;
- Similar Artist entry and lineup-membership invalidation;
- restriction of referenced Similar Artist target deletion;
- successful FestivalRun and FestivalEdition aggregate deletion;
- protection against direct deletion of referenced FestivalDay and Stage rows;
- that the seeded roster (currently 171 Artists) is entirely publication-ready under
  the application-owned policy, and that `publish_ready_artists` publishes all of them
  and leaves no drafts;
- published Artist query filtering, mapping, and consistency behavior, including a null
  `quick_picks_track` for a video-only artist (ADR-0017);
- verified four-or-none Similar Artist visibility and canonical target summaries;
- the run-scoped appearances feed's publication/lineup/schedule filtering, ordering,
  and field mapping, its schedule-agnostic `read_festival_run_artists` sibling, and the
  two derived per-run queries behind `schedule_state` and `has_published_artists`
  (ADR-0016); and
- single-artist create and hard-delete through the authoring service, including
  verification-trigger ordering, partial (draft) creates, and Similar Artist
  target-deletion protection; and
- adding an artist who already exists to another run through
  `add_existing_artist_to_run` (a second `LineupEntry` on the same global `Artist`,
  its own appearances, refusal of an unknown slug / duplicate membership / an
  appearance outside the target run); and
- single-artist field-level edits through the authoring service (ADR-0012):
  verification re-stamping after a triggered content change, wholesale collection
  replacement with idempotent re-apply, image/video set-and-clear, identity
  self-exclusion, reference refusals, readiness recomputation, and the
  published-stays-publishable guard; and
- the editorial pipeline tooling (roadmap 4b): roster-skeleton creation through
  `parse_roster` / `create_from_payloads` (draft lineup and schedule, per-savepoint
  isolation of a failed row, skip-if-already-in-run, rerun safety, and adding an
  existing artist to a different run) and the `show_artist.py` detail and roster
  renderers; and
- the staged import (multi-festival roadmap): a roster-only row creating an announced
  entry, a second pass with the full schedule CSV attaching it through
  `attach_run_schedule`, and that function's refusals (no appearances, no entry in the
  run, a run already scheduled, a billing mismatch); and
- the clean-bootstrap path (roadmap section 5): every migration applying to a
  brand-new database, `alembic check` finding no schema drift afterward, and the
  config-driven festival seed producing every configured edition's hierarchy
  (series, runs, days, stages) idempotently.

## Commands

Run commands from `backend/` with its virtual environment active.

```bash
# Fast tests; PostgreSQL tests are collected but skipped
python -m pytest

# All backend tests, including local PostgreSQL integration
RUN_POSTGRES_INTEGRATION=1 python -m pytest

# Only the PostgreSQL integration category
RUN_POSTGRES_INTEGRATION=1 python -m pytest -m postgres

# Compare the migrated live schema with SQLAlchemy metadata
alembic check
```

The `postgres` marker categorizes database-dependent tests. The
`RUN_POSTGRES_INTEGRATION=1` guard is the explicit opt-in that permits them to connect.
The local database must already exist and be upgraded to Alembic head.

## Artist publication

`publish_artists` assesses draft Artists against the application-owned publication
policy without changing the database:

```bash
python -m scripts.publish_artists
```

After reviewing the report, publish every passing Artist in one transaction:

```bash
python -m scripts.publish_artists --apply
```

The command leaves blocked Artists unchanged and reports their readiness issues. It
does not silently unpublish an existing Artist. The operation is safe to rerun;
already-published passing Artists remain published.

## Adding, editing, and removing an artist

The direct-to-PostgreSQL authoring workflow (ADR-0011 and ADR-0012,
`docs/roadmap/artist-authoring.md`). Each requires an explicit mode — a bare invocation
errors out. Against the hosted database, run them through the encrypted Railway tunnel
like the other data operations (see `docs/operations/backend-deployment.md`).

`add_artist`, `edit_artist`, and `delete_artist` execute the operation in a
transaction, so their non-committing mode is `--preview` (it runs the real
INSERT/UPDATE/DELETE statements and rolls back — surfacing database errors, persisting
nothing):

```bash
python -m scripts.add_artist --input <file>.json --preview
python -m scripts.add_artist --input <file>.json --apply
python -m scripts.edit_artist --input <file>.json --preview
python -m scripts.edit_artist --input <file>.json --apply
```

`add_artist` reads a strict `{ schemaVersion, edition, run, billingTier?, artist }`
file (see `app/schemas/artist_authoring.py`), creates one complete or partial artist as
a `draft` for an existing run, and prints its publication readiness. It refuses a slug,
mbid, or Spotify identity already in use, and an unknown genre / similar-artist target
/ stage. Publication stays a separate `publish_artists` step.

Adding an artist who _already exists_ to another run's lineup (a festival shared
between editions or an ACL second weekend) is the `add_existing_artist_to_run` service
function, reached through `build_roster_payloads` rather than its own CLI: a new slug
runs `create_artist`, an existing slug gains that run's `LineupEntry` and appearances
against the one global `Artist`. A standalone single-artist CLI is deferred until a
one-off need appears.

`edit_artist` reads a strict `{ schemaVersion, edition, run, slug, artist }` patch
(`ArtistEditFields`): every key present in `artist` is a change, an absent key is left
alone, a `null` key is cleared, and set-valued fields are replaced wholesale. It
touches every artist-owned field `add_artist` can set (identity, image, featured video,
About, socials, location, genres, listening, the run-scoped similar-artist set) but not
lineup/schedule/publication state. The `--preview` plan lists each changed field group
and the recomputed publication readiness. It refuses the same reference errors as
`add_artist` plus a slug/mbid/Spotify clash with a _different_ artist.

```bash
python -m scripts.delete_artist --slug <slug> --preview
python -m scripts.delete_artist --slug <slug> [--force] --apply
```

`delete_artist` hard-deletes one artist and its owned rows (genres, track selections,
videos, its Similar Artist sets, lineup entries, appearances); shared `Track` rows are
kept. It refuses an artist that another artist's Similar Artist set points at unless
`--force` also clears those references.

The editorial-pipeline scripts (`build_roster_payloads`, `check_artist_links`,
`show_artist`) are operator tooling, documented in
`docs/operations/backend-deployment.md`; their test coverage is described above.

## Current boundaries

There is not yet an API integration suite that sends FastAPI HTTP requests through a
real PostgreSQL session; the Artist query itself now has PostgreSQL integration
coverage. The clean-bootstrap smoke test covers migrations-from-empty and the
festival seed, but not an automated `pg_dump` / `pg_restore` round trip. There are
also no automated Next.js component, browser end-to-end, or load tests. Add those
layers when their corresponding application paths are implemented; do not treat the
mocked route tests as proof of live database behavior.
