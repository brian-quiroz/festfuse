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
API's not-found behavior.

`integration/test_artist_api_parity.py` compares the current TypeScript export with
the real published PostgreSQL Artist projections. Named cases document approved-image,
hidden-image, curated Listen First, and verified direct-content behavior; the complete
comparison verifies the exact 126-Artist published set and every field in the current
public Artist response boundary. It also compares every published Artist's run-level
billing and schedule projection with the retained TypeScript source, including the
multi-appearance case. The complete comparison also derives recommendation visibility
from target publication readiness and verifies every exposed target's canonical
identity, image, genre order, and editorial display order.

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
- verified four-or-none Similar Artist visibility and canonical target parity; and
- the run-scoped appearances feed's publication/lineup/schedule filtering, ordering,
  and field mapping.

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

## Current boundaries

There is not yet an API integration suite that sends FastAPI HTTP requests through a
real PostgreSQL session; the Artist query itself now has PostgreSQL integration
coverage. There are also no automated Next.js component, browser end-to-end,
committed-import smoke, load, or clean-database migration tests. Add those layers
when their corresponding application paths are implemented; do not treat the mocked
route tests as proof of live database behavior.
