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

`integration/test_artist_read_query.py` uses that same rollback-contained boundary
to prove the public Artist query's publication predicate, relationship eager loading,
Quick Picks role selection, deterministic genre and Listen First ordering, and clear
failure for an inconsistent published record.

`integration/test_artist_api_parity.py` compares the current TypeScript export with
the real published PostgreSQL Artist projections. Named cases document approved-image,
hidden-image, and curated Listen First behavior; the complete comparison verifies the
exact 126-Artist published set and every field in the artist-core response boundary.

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
- the 126-ready/45-blocked publication assessment; and
- transactional publication of only the 126 passing Artists;
- published Artist query filtering, mapping, and consistency behavior; and
- semantic artist-core parity for the exact 126 published source Artists.

## Commands

Run commands from `backend/` with its virtual environment active.

```bash
# Fast tests; PostgreSQL tests are collected but skipped
python -m pytest

# All backend tests, including local PostgreSQL integration
RUN_POSTGRES_INTEGRATION=1 python -m pytest

# Only the PostgreSQL integration category
RUN_POSTGRES_INTEGRATION=1 python -m pytest -m postgres

# TypeScript-to-PostgreSQL artist-core parity only
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

## Current boundaries

There is not yet an API integration suite that sends FastAPI HTTP requests through a
real PostgreSQL session; the Artist query itself now has PostgreSQL integration
coverage. There are also no automated Next.js component, browser end-to-end,
committed-import smoke, load, or clean-database migration tests. Add those layers
when their corresponding application paths are implemented; do not treat the mocked
route tests as proof of live database behavior.
