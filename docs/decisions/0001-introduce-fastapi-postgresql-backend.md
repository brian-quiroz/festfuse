# ADR-0001: Introduce a FastAPI and PostgreSQL backend

- Status: Accepted
- Recorded: 2026-08-23

## Context

FestFuse began as a frontend MVP. Festival and artist data live in typed TypeScript
source files, while user decisions and schedule state persist in the browser. That
architecture is effective for one curated festival, but it makes multi-festival
expansion, repeatable data imports, server-side validation, and eventual
cross-device user state difficult.

The backend is being introduced incrementally. Existing frontend flows must remain
functional while individual data paths move to an API; creating the backend does
not immediately make PostgreSQL the UI's source of truth.

## Decision

Add a Python backend under `backend/` with:

- FastAPI for HTTP APIs and generated OpenAPI documentation.
- PostgreSQL for relational persistence.
- SQLAlchemy 2 for typed database models, relationships, and sessions.
- Psycopg 3 as the PostgreSQL driver.
- Alembic for committed, ordered schema migrations.
- Pydantic Settings for validated environment configuration loaded from an ignored
  local `.env` file.

Use synchronous SQLAlchemy sessions initially. The current scale does not justify
adding asynchronous database/session complexity before a measured need exists.

Database structure is created and evolved through Alembic migrations, not manual
pgAdmin table edits. Initial/reference application records are added through
committed, rerunnable seed or import scripts rather than mixed into ordinary schema
migrations.

## Consequences

- The repository now contains Node/TypeScript and Python application environments.
- Local setup requires PostgreSQL, a Python virtual environment, migrations, and
  explicit seed/import steps in addition to the existing frontend setup.
- Migration files make schema history reproducible across local, test, staging, and
  production databases.
- PostgreSQL constraints can protect relational integrity independently of API
  validation.
- Frontend and database representations will temporarily coexist during migration,
  so each migrated data path needs an explicit source-of-truth boundary.
- Authentication, user synchronization, deployment, and production administration
  remain separate future decisions.

## Alternatives considered

- **Keep typed frontend source files indefinitely.** Rejected as the long-term
  persistence model because adding and updating multiple festival editions would
  remain manual and tied to frontend deployments.
- **Create tables manually in pgAdmin.** Useful for inspection and experimentation,
  but rejected as the schema source of truth because manual state is not
  reproducible from Git.
- **Use Flask for the API.** Familiar from prior experience, but FastAPI was chosen
  for this project direction and provides typed request/response validation and
  generated API documentation out of the box.
- **Adopt asynchronous database access immediately.** Deferred until concurrency or
  performance evidence justifies the additional lifecycle and debugging complexity.

## References

- [`backend/app/config.py`](../../backend/app/config.py)
- [`backend/app/database.py`](../../backend/app/database.py)
- [`backend/migrations/`](../../backend/migrations/)
- [`backend/scripts/`](../../backend/scripts/)
