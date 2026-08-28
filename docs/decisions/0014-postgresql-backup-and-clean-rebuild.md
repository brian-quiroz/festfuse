# ADR-0014: PostgreSQL-level backup and clean-rebuild strategy

- Status: Accepted
- Recorded: 2026-08-28

## Context

[The artist authoring roadmap](../roadmap/artist-authoring.md) section 5 is the last
gate before `app/data/artists/*.ts` can be deleted (section 6). Until now,
`scripts/import_artists.py` (which reads the frozen TypeScript source) has been the
only way to reconstruct the database from nothing. Deleting the TypeScript files
without another rebuild path would leave the artist dataset recoverable only from a
running database.

The roadmap calls for "a `pg_dump` / `pg_restore` procedure that stands up a new
database instance from PostgreSQL alone" and "an isolated clean-database smoke test."
The shape of that backup artifact, and how it relates to the Alembic-owned schema, was
not yet decided.

Alembic already owns the schema: migrations run before every Railway deploy, and
`alembic check` compares the live schema against the SQLAlchemy metadata.

## Decision

### The canonical backup artifact is a full custom-format `pg_dump`

A whole-database `pg_dump --format=custom` (schema, data, and the recorded
`alembic_version`) is the backup. Restore is a single `pg_restore` into an empty
database. The procedure then runs `alembic upgrade head` (a no-op for a current dump)
and `alembic check`, and a clean `alembic check` is the required proof that the
restored structure equals migration head.

The dump is taken through the existing encrypted Railway tunnel, read-only against
production, exactly like the other data operations
([`backup-restore.md`](../operations/backup-restore.md)).

### The dump is an operational artifact, not committed to the repo

It holds the full artist dataset, changes every time the data changes, and is large
and binary. It lives in the operator's own durable, private storage. This is distinct
from the roadmap's section 6 provenance JSON snapshot, which is committed once for a
different reason: a record of what the TypeScript files contained at deletion.

### The from-empty schema path is guarded by its own smoke test

`backend/tests/integration/test_clean_bootstrap.py` creates a disposable database,
runs `alembic upgrade head`, asserts `alembic check` is clean, and runs
`scripts/seed_festival.py`, then drops the database. It is opt-in under
`RUN_POSTGRES_INTEGRATION=1` like the other integration tests, and refuses to operate
on any database name it did not generate or that matches the configured database.

This exists because the full dump is only the data-recovery path. New environments
(staging, CI, a fresh clone) build the schema from the migration files, not from a
production dump, and Railway runs `alembic upgrade head` before every deploy. The
smoke test turns a broken migration into a failed test run instead of a failed deploy
or a failed recovery.

### A credential-free `backend/.env.example` and a documented bootstrap

`backend/.env.example` documents the five required `POSTGRES_*` variables with
placeholder values (root `.gitignore` excludes it from the blanket `.env*` rule). The
from-scratch backend bootstrap sequence lives in
[`local-development.md`](../operations/local-development.md), linked from the root
README's Getting Started section rather than inlined there.

## Consequences

- The database can be rebuilt from PostgreSQL alone, unblocking the deletion of
  `app/data/artists/*.ts`.
- Recovery is one restore command plus one verification command.
- Backups must be taken deliberately and stored by the operator; there is no
  automated backup schedule (out of scope here).
- The client tools `pg_dump` / `pg_restore` become a documented operator prerequisite;
  they are not in the backend's Python environment.
- A future automated backup cron, or an automated restore test against a committed
  fixture dump, can be added later without revisiting this decision.

## Alternatives considered

- **Data-only dump plus `alembic upgrade head` for the schema.** Rejected. A
  two-step restore is more to get right during a recovery, and the "migrations build a
  correct schema from empty" property is already covered independently by the smoke
  test, so the full dump loses nothing.
- **Commit dumps to the repository.** Rejected: size and churn, and the section 6
  provenance snapshot already covers the archival "what did it contain" need.
- **Extend the smoke test to `pg_restore` a committed fixture dump.** Deferred. It
  would require the client tools on every machine that runs the suite and a fixture
  kept current in the repo. The manual procedure plus `alembic check` is sufficient
  now; revisit if the restore path ever breaks in a way a manual check would miss.
- **Smoke-test the bootstrap through `scripts/import_artists.py`.** Rejected: it is
  TypeScript-coupled and retired in section 6; that path is already covered by
  `test_import_artists.py` and `test_artist_schema.py`.

## References

- [Artist authoring roadmap](../roadmap/artist-authoring.md), section 5
- [ADR-0011: Direct-to-PostgreSQL artist authoring workflow](0011-direct-to-postgresql-artist-authoring.md)
- [Backend deployment and data bootstrap](../operations/backend-deployment.md)
- [Rebuild the database from PostgreSQL alone](../operations/backup-restore.md)
- `backend/tests/integration/test_clean_bootstrap.py`
