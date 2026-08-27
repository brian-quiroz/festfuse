# Artist Authoring Roadmap

This roadmap picks up where [`backend-rollout.md`](./backend-rollout.md) leaves off. That
roadmap moved every frontend *read* onto FastAPI/PostgreSQL; this one replaces
`app/data/artists/*.ts` as the *authoring* source with a workflow that writes directly to
PostgreSQL.

It is the implementation sequence — deliverables and checkpoints. The reasoning behind
the model and scope (what an artist record contains, what is scrapped, why a script and
not a dashboard) is in
[ADR-0011](../decisions/0011-direct-to-postgresql-artist-authoring.md). The domain schema
is in [`artist-data-model.md`](../design/artist-data-model.md).

## Current boundary

- Every artist-facing frontend read is served by FastAPI/PostgreSQL.
- `app/data/artists/*.ts` remains the authoring source. The (out-of-repo)
  `artist-review` skill edits the per-day files directly; `scripts/export-artist-data.ts`
  → `backend/scripts/import_artists.py` serialize them into Postgres.
- `import_artists.py` is the only path that reconstructs the database from scratch, so
  Postgres cannot yet be rebuilt without the TypeScript source.
- There is no way to add, edit, or remove a single artist's facts in Postgres directly.

## Rollout sequence

### 1. Fix the authoring model and scope

**Status: completed.**

- Model and scope decisions recorded in
  [ADR-0011](../decisions/0011-direct-to-postgresql-artist-authoring.md).
- This roadmap stood up; `backend-rollout.md` points here.

**Checkpoint reached:** the model, scope, and open questions are settled before any code.

### 2. Service layer and the create / delete / add-genre workflow

**Status: not started.**

- A new service layer (`backend/app/services/`) holds all authoring logic; thin CLIs
  wrap it, following `publish_artists.py`.
- `add-genre` inserts one `genres` row into its family.
- `add-artist` creates one complete artist for a named existing run in one
  transaction — identity, genres, socials, location, About, image, tracks and listening
  selections, featured video, lineup entry, appearances, and the verified similar-artist
  set. Input is a schema-versioned single-artist JSON file. Genres validate against the
  `genres` table; similar targets validate against existing artist slugs. The artist is
  created as a draft; publication stays a separate explicit operation.
- `delete-artist` hard-deletes one artist and its cascade-owned rows, refusing an
  artist that is a similar-artist target of another set unless forced. It is a test and
  cleanup tool, not a product removal path.
- Add `artists.mbid` (nullable, unique) and backfill the ~14 legacy values.
- Reuse `import_artists.py`'s pure validators and verification-timestamp ordering
  without modifying it.

**Checkpoint:** a complete artist can be created, then removed, directly in Postgres.

### 3. Field-level edits

**Status: not started.**

- Targeted, idempotent, transactional updates for About, socials, location, genres, the
  similar-artist set, listening selections, and name/slug stylization, over the same
  service layer. Each edit re-runs publication assessment for that artist.
- Out of scope: appearance time/stage edits, lineup billing edits, and publication
  status changes.

**Checkpoint:** an existing artist's facts can be corrected in place.

### 4. Decide the editorial authoring and review process

**Status: not started.**

Settle where artist data originates, how a draft is produced, how it is reviewed and
approved, and whether the `artist-review` skill is retargeted onto the edit workflow,
replaced, or retired. Deferred until sections 2 and 3 make the write path concrete. Gets
its own decision record plus the in-repo documentation of the editorial process.

**Checkpoint:** the editorial process is defined rather than ad hoc.

### 5. Backup, restore, and clean bootstrap

**Status: not started.**

- A `pg_dump` / `pg_restore` procedure that stands up a new database instance from
  PostgreSQL alone, through the existing encrypted Railway tunnel pattern.
- A credential-free `backend/.env.example`, a backend bootstrap section in the root
  README, and an isolated clean-database smoke test.

**Checkpoint:** the database can be rebuilt without the TypeScript source. This gates
section 6.

### 6. Delete `app/data/artists/*.ts` and retire the TypeScript-coupled tooling

**Status: not started.**

- Freeze the final export as a committed provenance JSON snapshot.
- Delete the per-day record files and `index.ts`. Keep `app/types/artist.ts`,
  `app/data/categories.ts`, and `app/data/festivals.ts` — the frontend still uses their
  types, vocabularies, and config.
- Delete `scripts/export-artist-data.ts`. Re-point or retire `import_artists.py` and
  `sync_artist_listening.py`. Resolve `app/lib/verify-story-signals.ts`'s dependency on
  the TypeScript dataset.
- Fold in the `resolveCanonicalAppearanceId` simplification
  (`app/store/runAppearancesStore.ts`) now that every caller passes a real database id,
  verifying DEVAULT's multi-appearance conflict detection against a live backend first.
- In `backend-rollout.md`, mark the sequence complete through 7 and update the "Current
  boundary" and guardrails that still name `app/data/artists`. Update
  `artist-data-model.md`'s implementation checklist and resolve the related
  `FUTURE_CONSIDERATIONS.md` entries.

**Checkpoint:** PostgreSQL is the sole artist data source, read and write.

## Guardrails

- Do not modify `import_artists.py`, `sync_artist_listening.py`, or `publish_artists.py`
  while building the new workflow. Reuse their pure helpers; decide their fate in
  section 6.
- Festival, run, and day creation stay `seed_festival.py`'s responsibility.
- Do not delete `app/data/artists/*.ts` before the backup/restore path (section 5)
  exists.
- Scope limits (no admin dashboard, no publication queue, no general editorial-review
  framework) are set by ADR-0011.
- The new scripts run against a database chosen by environment, exactly like the
  existing ones; do not point them at a database implicitly.

## Next: multi-festival and multi-appearance support

The roadmap after this one adds support for festivals beyond Lollapalooza and for
editions that run more than one weekend. It builds directly on this work: adding a
festival, then a run, then that run's artists is the same festival → run → genre → artist
hierarchy (ADR-0011), generalized past the single hard-coded `lollapalooza-2026`.
`add-artist` taking a run by slug is the first step toward it.
