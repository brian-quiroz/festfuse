# Backend Deployment and Data Bootstrap

FestFuse's hosted backend currently runs on Railway with two private-networked
services:

- `festfuse`: the FastAPI application, built from the repository's `backend/`
  directory and exposed at `https://festfuse-production.up.railway.app`.
- `Postgres`: the managed PostgreSQL database. It is not publicly exposed.

The Railway environment is named `production`, and the production frontend depends
on it for every artist-facing read across the app. PostgreSQL is the sole artist data
source, read and write (see `docs/roadmap/artist-authoring.md`).

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
in the start or pre-deploy command: the festival seed is application data, and artist
data restore is a recovery operation, not an ordinary synchronization mechanism.

A new environment is stood up in two steps after `alembic upgrade head`:

1. Every configured festival hierarchy (series, runs, days, stages), from the FastAPI
   service's Railway console. Run `--preview` first and read the diff — it must show
   only the inserts you expect — then `--apply`; the seed is insert-only and never
   modifies an existing row:

   ```bash
   python -m scripts.seed_festivals --preview
   python -m scripts.seed_festivals --apply
   ```

2. The artist dataset, restored from a `pg_dump` of an existing database. The full
   procedure (taking the dump through the encrypted Railway tunnel, `pg_restore` into
   the empty database, then reconciling with `alembic upgrade head` and a clean
   `alembic check`) is in [`backup-restore.md`](backup-restore.md) (ADR-0014).

## Adding, editing, or removing an artist

Direct-to-PostgreSQL artist authoring (ADR-0011 and ADR-0012,
`docs/roadmap/artist-authoring.md`). Each requires an explicit mode: `--preview` runs
the operation in a transaction and rolls it back (surfaces errors, persists nothing);
`--apply` commits. Against the hosted database, run them through the same tunnel. From
`backend/`:

```bash
railway run --service Postgres sh -c 'POSTGRES_USER="$PGUSER" POSTGRES_PASSWORD="$PGPASSWORD" POSTGRES_HOST="127.0.0.1" POSTGRES_PORT="55432" POSTGRES_DB="$PGDATABASE" python -m scripts.add_artist --input <file>.json --preview'
railway run --service Postgres sh -c 'POSTGRES_USER="$PGUSER" POSTGRES_PASSWORD="$PGPASSWORD" POSTGRES_HOST="127.0.0.1" POSTGRES_PORT="55432" POSTGRES_DB="$PGDATABASE" python -m scripts.edit_artist --input <file>.json --preview'
railway run --service Postgres sh -c 'POSTGRES_USER="$PGUSER" POSTGRES_PASSWORD="$PGPASSWORD" POSTGRES_HOST="127.0.0.1" POSTGRES_PORT="55432" POSTGRES_DB="$PGDATABASE" python -m scripts.delete_artist --slug <slug> --preview'
```

`add_artist` reads a strict `{ schemaVersion, edition, run, billingTier?, artist }` file
(see `backend/app/schemas/artist_authoring.py`) and creates the artist as a `draft`;
run the `publish_artists` commands afterward. `edit_artist` reads a strict
`{ schemaVersion, edition, run, slug, artist }` patch — every key in `artist` is a
change, an absent key is left alone, a `null` key is cleared — and applies it to one
existing artist; the `--preview` plan shows each changed field and the recomputed
publication readiness. `delete_artist` needs `--force` to remove an artist that another
artist's Similar Artist set points at. See `backend/tests/README.md` for exact scope.

## Editorial pipeline scripts

The three CLIs the editorial process (`docs/process/artist-editorial-process.md`,
ADR-0013) runs directly. Read-mostly; run them through the same tunnel against the
hosted database. From `backend/`:

```bash
python -m scripts.build_roster_payloads --input roster.csv \
    --edition <edition-slug> --run <run-slug> --preview   # then --apply
python -m scripts.check_artist_links --slug <slug>        # or --edition/--run, or all
python -m scripts.show_artist --slug <slug>               # full record + readiness
python -m scripts.show_artist --roster --sort similar-count   # slug|schedule also
```

**`build_roster_payloads`** fans a hand-authored roster CSV into draft `add_artist`
payloads. Per artist it picks one action from the database state: `create_artist` for
a new slug; `add_existing_artist_to_run` for a slug that exists but is not in the run;
`attach_run_schedule` for a slug already announced in the run without a schedule when
the row supplies one; skipped otherwise. Columns (header row):

```
slug, name, spotify_url, youtube_url, tiktok_url, mbid, billing_tier,
stage, date, start_time, end_time
```

Only `slug` and `name` are hard-required as headers; every other column is optional and
droppable. The four schedule columns travel together. A file is either announced (no
schedule columns) or scheduled, never a mix; an announced festival is brought in with
an announced pass, then a scheduled re-run against the same run. The editor-facing
workflow, the per-mode column requirements, and `billing_tier` inheritance are in
[`../process/artist-editorial-handbook.md`](../process/artist-editorial-handbook.md)
("Bringing a festival in before its schedule").

`--preview` validates every row against the database and rolls back. `--apply` applies
each row in its own transaction, skips a slug already fully in the target run (a
partial run repeats safely), and reports a row that still fails without blocking the
rest. A bad `--run` for the edition is rejected before any row is processed. Every new
artist is created `draft`; `socialsVerified` is set because the editor checked the
links building the roster; genres, location, about, tracks, and similar artists are
left for the research pass.

**`check_artist_links`** resolves every external identifier on an artist (Spotify
artist/track ids, YouTube video id, YouTube/TikTok/image-source/image-license URLs) via
oEmbed and plain HTTP — mechanical resolve checks only, never identity. It reports OK /
BROKEN / UNVERIFIABLE and exits non-zero only on a BROKEN link (a confirmed 404/410 or
failed oEmbed); UNVERIFIABLE (403, 429, timeout, a local `public/` image path) does not
fail the run. Run it as the pre-publish check on the batch you are about to publish; it
is not wired into `publish_artists`. `--jobs N` (default 8) fans requests out in
parallel — a whole-run check finishes in seconds instead of timing out, but Spotify's
oEmbed endpoint throttles a burst of a few hundred lookups, so at roster scale many good
Spotify links report UNVERIFIABLE rather than OK. That never yields a false BROKEN, so
the exit code stays trustworthy; a per-batch run gives a cleaner positive result.

**`show_artist`** is a read-only readout. `--slug` dumps one artist's full stored
record, verification stamps, publication readiness, the full About text, the
similar-artist set, and how many other artists cite this one. `--roster` prints one line
per published artist (`slug, name, billing, day, refs, genres`) for the similar-artist
membership check and the distribution balance sweep; `--sort` is `similar-count`
(default, ascending), `slug`, or `schedule`.

## Verification

Verify infrastructure and public behavior after bootstrap:

- `GET /health` confirms that FastAPI is running.
- `GET /health/database` confirms that FastAPI can reach the configured database.
- `GET /api/v1/festivals/lollapalooza-2026` confirms the festival hierarchy.
- `GET /api/v1/artists/5sos` confirms published global Artist access.
- `GET /api/v1/festivals/lollapalooza-2026/runs/main/artists/5sos` confirms
  run-scoped Artist access.
- A draft or nonexistent Artist slug must return the same public `404` response.

The deployed API is a real production dependency for the frontend, not merely a
preview.
