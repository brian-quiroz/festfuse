# Backend testing

FestFuse currently has two automated backend test layers. They serve different
purposes and intentionally have different database boundaries.

## Isolated API tests

`test_festivals.py` and `test_artists.py` send real HTTP requests through FastAPI's
`TestClient`, but `conftest.py` replaces the SQLAlchemy session dependency with a
mock. Artist router tests additionally mock the dedicated query boundary. These
tests exercise routing, endpoint behavior, status codes, nested response
serialization, not-found handling, and explicit inconsistent-data handling without
requiring PostgreSQL.

They are fast and run by default, but they do not prove that generated SQL, foreign
keys, migrations, or PostgreSQL behavior works.

`test_artist_authoring_schema.py` is fast and needs no database either: it exercises
the strict `ArtistAuthoringInput` Pydantic schema (rejection of legacy TypeScript-only
fields, required-field enforcement, slug/mbid/track-id/date/time shape checks,
four-or-none and self-reference rules) and the pure parsers in `app/lib/artist_source.py`.

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
Quick Picks role selection, deterministic genre and Listen First ordering, and clear
failure for an inconsistent published record. It also proves that About and supported
social links obey their verification gates and that only an available featured video
is exposed. Festival-context cases prove published/announced filtering, required
billing, timezone conversion, scheduled/cancelled visibility, draft omission, and the
valid announced-without-schedule state. Similar Artist cases prove verified
four-or-none exposure, deterministic order, canonical target summaries, complete-set
hiding after target unpublication, and preservation of editorial verification.

`integration/test_run_appearances_query.py` uses the same rollback-contained
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

`integration/test_artist_api_parity.py` compares the current TypeScript export with
the real published PostgreSQL Artist projections. Named cases document approved-image,
hidden-image, curated Listen First, and verified direct-content behavior; the complete
comparison verifies the exact 126-Artist published set and every field in the current
public Artist response boundary. It also compares every published Artist's run-level
billing and schedule projection with the retained TypeScript source, including the
multi-appearance case. The complete comparison also derives recommendation visibility
from target publication readiness and verifies every exposed target's canonical
identity, image, genre order, and editorial display order.

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
genre/similar-target/stage. For delete it proves owned rows are removed while shared
`Track` rows are kept, and that deleting a Similar Artist *target* is refused unless
forced, in which case the incoming references are cleared and the referencing set loses
its verification.

Each test creates temporary records inside an outer transaction and rolls that
transaction back during cleanup. PostgreSQL genuinely executes the writes and
constraints, but successful tests do not leave fixture data behind.

The integration suite currently verifies:

- installation of `updated_at` triggers on all new timestamped tables;
- About and supported-social verification invalidation;
- valid reviewed-empty social state;
- the image-metadata constraint;
- Similar Artist entry and lineup-membership invalidation;
- restriction of referenced Similar Artist target deletion;
- successful FestivalRun and FestivalEdition aggregate deletion;
- protection against direct deletion of referenced FestivalDay and Stage rows;
- complete 171-Artist snapshot insertion through the production import mapper inside
  a rollback-contained transaction;
- the 126-ready/45-blocked publication assessment;
- transactional publication of only the 126 passing Artists;
- published Artist query filtering, mapping, and consistency behavior;
- semantic public-response parity for the exact 126 published source Artists;
- semantic festival-context parity for run-level billing and all imported Appearances;
- verified four-or-none Similar Artist visibility and canonical target parity;
- the run-scoped appearances feed's publication/lineup/schedule filtering, ordering,
  and field mapping; and
- single-artist create and hard-delete through the authoring service, including
  verification-trigger ordering, partial (draft) creates, and Similar Artist
  target-deletion protection.

## Commands

Run commands from `backend/` with its virtual environment active.

```bash
# Fast tests; PostgreSQL tests are collected but skipped
python -m pytest

# All backend tests, including local PostgreSQL integration
RUN_POSTGRES_INTEGRATION=1 python -m pytest

# Only the PostgreSQL integration category
RUN_POSTGRES_INTEGRATION=1 python -m pytest -m postgres

# TypeScript-to-PostgreSQL public Artist response parity only
RUN_POSTGRES_INTEGRATION=1 python -m pytest tests/integration/test_artist_api_parity.py

# Compare the migrated live schema with SQLAlchemy metadata
alembic check
```

The `postgres` marker categorizes database-dependent tests. The
`RUN_POSTGRES_INTEGRATION=1` guard is the explicit opt-in that permits them to connect.
The local database must already exist and be upgraded to Alembic head.

## Artist import dry run

The standard suite also exercises the artist-import serialization boundary against
the current TypeScript source. From `backend/` with its virtual environment active,
run the same validation as a human-readable, read-only report:

```bash
python -m scripts.import_artists --dry-run
```

The command invokes `scripts/export-artist-data.ts`, validates the complete exported
envelope, and never connects to PostgreSQL.

The guarded initial write mode uses one transaction:

```bash
python -m scripts.import_artists --apply
```

It requires the FestivalEdition, FestivalRun, and FestivalDays to be seeded, refuses
to mix the snapshot with existing artist/taxonomy/track or festival-stage rows, and
rolls the entire import back on any error. It imports every Artist as `draft`; later
publication remains an explicit application operation.

## Artist publication

Assess the imported Artists against the application-owned publication policy without
changing the database:

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

## Artist listening sync

Like `import_artists.py`, this is a one-time, per-environment bootstrap step, not a
recurring editorial workflow — it backfills the listening configuration (Quick Picks
track, and Spotify artist identity where the source has since supplied one) for the
45 Artists left as drafts by the initial import, targeting Artists that already exist
rather than requiring empty tables. Review the pending changes without writing
anything:

```bash
python -m scripts.sync_artist_listening
```

Apply them in one transaction:

```bash
python -m scripts.sync_artist_listening --apply
```

The command is scoped to draft Artists only, and within an Artist to Track rows,
ArtistTrackSelection rows, Quick Picks role, Listen First ordering, and
`spotify_artist_id`. It never touches name, genres, images, schedule, or
recommendation data. It does not sync `listen_first_note`: no draft Artist in the
current source data uses a curated Listen First override, so that path is
unimplemented rather than silently incomplete — extend the script first if a future
draft Artist needs one. An Artist that already has any track selections is left
unchanged, so the operation is safe to rerun; a completed sync reports no further
changes on a second pass.

## Adding, removing, and backfilling an artist

The direct-to-PostgreSQL authoring workflow (ADR-0011,
`docs/roadmap/artist-authoring.md`). Each requires an explicit mode — a bare invocation
errors out. Against the hosted database, run them through the encrypted Railway tunnel
like `import_artists` (see `docs/operations/backend-deployment.md`).

`add_artist` and `delete_artist` execute the operation in a transaction, so their
non-committing mode is `--preview` (it runs the real INSERT/DELETE statements and rolls
back — surfacing database errors, persisting nothing):

```bash
python -m scripts.add_artist --input <file>.json --preview
python -m scripts.add_artist --input <file>.json --apply
```

`add_artist` reads a strict `{ schemaVersion, edition, run, billingTier?, artist }`
file (see `app/schemas/artist_authoring.py`), creates one complete or partial artist as
a `draft` for an existing run, and prints its publication readiness. It refuses a slug,
mbid, or Spotify identity already in use, and an unknown genre / similar-artist target
/ stage. Publication stays a separate `publish_artists` step.

```bash
python -m scripts.delete_artist --slug <slug> --preview
python -m scripts.delete_artist --slug <slug> [--force] --apply
```

`delete_artist` hard-deletes one artist and its owned rows (genres, track selections,
videos, its Similar Artist sets, lineup entries, appearances); shared `Track` rows are
kept. It refuses an artist that another artist's Similar Artist set points at unless
`--force` also clears those references.

`backfill_artist_mbid` attempts no write in its non-committing mode, so it keeps
`--dry-run` (matching `publish_artists`):

```bash
python -m scripts.backfill_artist_mbid --dry-run
python -m scripts.backfill_artist_mbid --apply
```

`backfill_artist_mbid` is a one-time, per-environment step (like `sync_artist_listening`):
it sets `artists.mbid` from the TypeScript source for the ~14 rows that have one and are
currently `NULL`. Safe to rerun. Folded into the importer in the roadmap's section 6.

## Current boundaries

There is not yet an API integration suite that sends FastAPI HTTP requests through a
real PostgreSQL session; the Artist query itself now has PostgreSQL integration
coverage. There are also no automated Next.js component, browser end-to-end,
committed-import smoke, load, or clean-database migration tests. Add those layers
when their corresponding application paths are implemented; do not treat the mocked
route tests as proof of live database behavior.
