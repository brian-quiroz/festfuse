# Backend Deployment and Data Bootstrap

FestFuse's hosted backend currently runs on Railway with two private-networked
services:

- `festfuse`: the FastAPI application, built from the repository's `backend/`
  directory and exposed at `https://festfuse-production.up.railway.app`.
- `Postgres`: the managed PostgreSQL database. It is not publicly exposed.

The Railway environment is currently named `production`, but this deployment is the
backend preview environment while the production frontend continues to read its
TypeScript data. Do not interpret the Railway label as a completed frontend cutover.

## Service configuration

The FastAPI service uses these Railway settings:

- Root directory: `/backend`
- Pre-deploy command: `alembic upgrade head`
- Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

Its `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_HOST`, `POSTGRES_PORT`, and
`POSTGRES_DB` variables reference the corresponding private-network values from the
`Postgres` service. Never commit their resolved values.

Alembic migrations run before every application deployment. They are safe to rerun:
Alembic applies only revisions that the target database has not recorded. A failed
migration prevents the new application deployment from proceeding.

## Initial data bootstrap

Data bootstrap is deliberate and separate from deployment. Never place these scripts
in the start or pre-deploy command: the festival seed is application data, and the
artist importer is a guarded initial-snapshot operation rather than an ordinary
synchronization mechanism.

Run the festival seed from the FastAPI service's Railway console after migrations:

```bash
python -m scripts.seed_festival
```

The artist exporter reads frontend source files from the local repository, so run the
artist import from a local checkout through an encrypted Railway tunnel. From the
repository root, link the CLI to the `joyful-mercy` project, `production` environment,
and `festfuse` service if it is not already linked:

```bash
railway link
```

In terminal 1, keep the database tunnel open:

```bash
railway connect Postgres --tunnel-only --port 55432
```

In terminal 2, change to `backend/` and validate the import first:

```bash
railway run --service Postgres sh -c 'POSTGRES_USER="$PGUSER" POSTGRES_PASSWORD="$PGPASSWORD" POSTGRES_HOST="127.0.0.1" POSTGRES_PORT="55432" POSTGRES_DB="$PGDATABASE" python -m scripts.import_artists --dry-run'
```

Only after the dry run succeeds, apply it:

```bash
railway run --service Postgres sh -c 'POSTGRES_USER="$PGUSER" POSTGRES_PASSWORD="$PGPASSWORD" POSTGRES_HOST="127.0.0.1" POSTGRES_PORT="55432" POSTGRES_DB="$PGDATABASE" python -m scripts.import_artists --apply'
```

Then inspect publication readiness and publish passing Artists:

```bash
railway run --service Postgres sh -c 'POSTGRES_USER="$PGUSER" POSTGRES_PASSWORD="$PGPASSWORD" POSTGRES_HOST="127.0.0.1" POSTGRES_PORT="55432" POSTGRES_DB="$PGDATABASE" python -m scripts.publish_artists'
railway run --service Postgres sh -c 'POSTGRES_USER="$PGUSER" POSTGRES_PASSWORD="$PGPASSWORD" POSTGRES_HOST="127.0.0.1" POSTGRES_PORT="55432" POSTGRES_DB="$PGDATABASE" python -m scripts.publish_artists --apply'
```

Stop the tunnel with `Ctrl+C` when finished. The SSH private key used by Railway stays
only in the developer's `~/.ssh/` directory and must never be copied into this
repository or shared.

The initial hosted snapshot produced 171 Artists: 126 publication-ready and 45 drafts.
Those totals are a verification aid for this snapshot, not permanent business rules.

## Backfilling listening configuration after a source correction

`import_artists.py --apply` refuses to run against tables that already hold Artist
data, so it cannot repair an environment that was already bootstrapped before the
TypeScript source had a complete Quick Picks track for every Artist. A brand-new
environment does not need this section: today's TypeScript source already has every
Artist's listening configuration, so `import_artists.py --apply` alone produces a
complete import.

For an environment bootstrapped before that curation was finished, use the dedicated
backfill script instead, through the same tunnel as above. From `backend/`:

```bash
railway run --service Postgres sh -c 'POSTGRES_USER="$PGUSER" POSTGRES_PASSWORD="$PGPASSWORD" POSTGRES_HOST="127.0.0.1" POSTGRES_PORT="55432" POSTGRES_DB="$PGDATABASE" python -m scripts.sync_artist_listening'
```

Only after the dry run succeeds, apply it:

```bash
railway run --service Postgres sh -c 'POSTGRES_USER="$PGUSER" POSTGRES_PASSWORD="$PGPASSWORD" POSTGRES_HOST="127.0.0.1" POSTGRES_PORT="55432" POSTGRES_DB="$PGDATABASE" python -m scripts.sync_artist_listening --apply'
```

Then re-run the `publish_artists` commands above. The backfill is safe to rerun; a
completed run reports no further changes. See `backend/tests/README.md` for its exact
scope and `docs/design/artist-data-model.md` for the listening-configuration model.

## Verification

Verify infrastructure and public behavior after bootstrap:

- `GET /health` confirms that FastAPI is running.
- `GET /health/database` confirms that FastAPI can reach the configured database.
- `GET /api/v1/festivals/lollapalooza-2026` confirms the festival hierarchy.
- `GET /api/v1/artists/5sos` confirms published global Artist access.
- `GET /api/v1/festivals/lollapalooza-2026/runs/main/artists/5sos` confirms
  run-scoped Artist access.
- A draft or nonexistent Artist slug must return the same public `404` response.

The deployed API is a preview dependency. The frontend remains on TypeScript data
until a bounded frontend slice is explicitly switched and verified.
