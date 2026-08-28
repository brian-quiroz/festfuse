# Backend Deployment and Data Bootstrap

FestFuse's hosted backend currently runs on Railway with two private-networked
services:

- `festfuse`: the FastAPI application, built from the repository's `backend/`
  directory and exposed at `https://festfuse-production.up.railway.app`.
- `Postgres`: the managed PostgreSQL database. It is not publicly exposed.

The Railway environment is named `production`, and the production frontend depends
on it for every artist-facing read across the app. `app/data/artists` is not part of
the frontend's runtime read path — it remains only as the authoring/import source
(see `docs/roadmap/backend-rollout.md`'s "Current boundary" section and step 8).

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

This section reconstructs the original TypeScript snapshot. To stand up a database
from a PostgreSQL dump instead, with no TypeScript source, see
[`backup-restore.md`](backup-restore.md) (ADR-0014).

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

## Backfilling artist MusicBrainz identifiers

`artists.mbid` was added after the initial import. The schema change reaches production
through the pre-deploy `alembic upgrade head`; the ~14 legacy values are a one-time data
step, like the listening backfill above, through the same tunnel. From `backend/`:

```bash
railway run --service Postgres sh -c 'POSTGRES_USER="$PGUSER" POSTGRES_PASSWORD="$PGPASSWORD" POSTGRES_HOST="127.0.0.1" POSTGRES_PORT="55432" POSTGRES_DB="$PGDATABASE" python -m scripts.backfill_artist_mbid --dry-run'
```

Only after the dry run succeeds, apply it with `--apply` in place of `--dry-run`. Safe
to rerun; it only touches rows where `mbid` is currently `NULL`.

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
payloads and runs `create_artist`. Columns (header row):

```
slug, name, spotify_url, youtube_url, tiktok_url, mbid,
billing_tier, stage, date, start_time, end_time
```

One row per appearance; an artist with several sets repeats its slug, sharing name /
spotify_url / youtube_url / tiktok_url / mbid. `billing_tier` is Headliner /
Sub-headliner / Undercard; `date` is `Jul 30`; times are `8:30 PM`. The weekday is
derived from the date and the edition year, and `socialsVerified` is set because the
editor checked the links building the roster. Genres, location, about, tracks, and
similar artists are left empty for the research pass — every artist is created `draft`.
`--preview` validates every row against the database and rolls back. `--apply` creates
each artist in its own transaction, skips a slug that already exists (a partial run
repeats safely), and reports a row that still fails without blocking the rest.

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
