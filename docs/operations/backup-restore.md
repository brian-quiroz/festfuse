# Rebuild the Database From PostgreSQL Alone

This procedure backs up the hosted database and restores it into a fresh instance
using PostgreSQL's own tools. It is the disaster-recovery and new-environment path for
the artist dataset.

Schema comes from the Alembic migrations and the foundational festival hierarchy from
`scripts/seed_festivals.py` (see [`backend-deployment.md`](backend-deployment.md)); this
procedure restores everything else.

## What this touches

- **Backup** is a read-only `pg_dump` of the hosted database through the same
  encrypted Railway tunnel the other data operations use. It never writes to or
  interrupts production.
- **Restore** targets a _new, empty_ database. Never restore over a database that
  holds data you still need.

## Prerequisites

- The PostgreSQL client tools `pg_dump`, `pg_restore`, and `createdb`. They are not
  part of the backend's Python environment. A full PostgreSQL install already ships
  them (its `bin/` directory); otherwise, on macOS:

  ```bash
  brew install libpq
  # then add its bin to PATH, e.g. for zsh:
  echo 'export PATH="/opt/homebrew/opt/libpq/bin:$PATH"' >> ~/.zshrc
  ```

  Use a client version greater than or equal to the server's (`pg_dump --version`);
  a newer client against an older server is fine.

- The Railway CLI, linked to the project, `production` environment, and `festfuse`
  service (`railway link` if it is not already).

## 1. Back up the hosted database

In terminal 1, open the tunnel and leave it running:

```bash
railway connect Postgres --tunnel-only --port 55432
```

In terminal 2, write a timestamped custom-format dump. It contains the schema, the
data, and the recorded Alembic revision:

```bash
railway run --service Postgres sh -c 'PGPASSWORD="$PGPASSWORD" pg_dump \
  --host 127.0.0.1 --port 55432 --username "$PGUSER" --dbname "$PGDATABASE" \
  --format=custom --no-owner --no-privileges \
  --file "festfuse-$(date -u +%Y%m%dT%H%M%SZ).dump"'
```

Keep the `.dump` file somewhere durable and private (it holds the full artist
dataset). It is a point-in-time snapshot: take a fresh one on a schedule and before
and after any large data change, such as adding a festival.

Stop the tunnel with `Ctrl+C` when the dump finishes.

## 2. Restore into a fresh database

This example restores into a local database. Restoring into a new hosted Postgres
service is the same `pg_restore` invocation pointed at that service's tunnel.

```bash
createdb festfuse_restore
pg_restore --no-owner --no-privileges --dbname festfuse_restore \
  festfuse-<timestamp>.dump
```

`pg_restore` should complete with no errors. Investigate any error rather than
ignoring it.

## 3. Reconcile with the migrations and verify

Point the backend at the restored database and confirm its schema matches the
migration history exactly:

```bash
cd backend
POSTGRES_DB=festfuse_restore alembic upgrade head   # no-op for a current dump
POSTGRES_DB=festfuse_restore alembic check           # must report no changes
```

`alembic check` reporting no differences is the proof that the restored structure
equals migration head. If it reports pending operations, the dump was taken from a
database behind the current code; apply the missing migrations and re-check.

Then run the backend against it and confirm public behavior, reusing the checks in
[`backend-deployment.md`](backend-deployment.md#verification):

```bash
cd backend
POSTGRES_DB=festfuse_restore uvicorn app.main:app --port 8000
```

- `GET /health` and `GET /health/database`
- `GET /api/v1/festivals/lollapalooza-2026`
- `GET /api/v1/artists/5sos`
- `GET /api/v1/festivals/lollapalooza-2026/runs/main/artists/5sos`

## Automated coverage

`backend/tests/integration/test_clean_bootstrap.py` proves the from-empty half of
this independently: it creates a disposable database, runs `alembic upgrade head`,
asserts `alembic check` is clean, and runs `scripts/seed_festivals.py --apply` twice
(and `--preview` once) to prove the seed is insert-only and idempotent. The
`pg_dump`/`pg_restore` round trip itself is verified by running this procedure.
