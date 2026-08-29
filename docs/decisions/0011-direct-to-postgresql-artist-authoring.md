# ADR-0011: Direct-to-PostgreSQL artist authoring workflow

- Status: Accepted
- Recorded: 2026-08-26

## Context

[Backend rollout](../roadmap/backend-rollout.md) step 7 retired `app/data/artists/*.ts`
as a frontend _runtime_ dependency. Every artist-facing screen now reads from
FastAPI/PostgreSQL. The TypeScript files remain the _authoring_ source: the
(out-of-repo) `artist-review` skill edits the per-day files directly, and
`scripts/export-artist-data.ts` → `backend/scripts/import_artists.py` serialize them
into Postgres. `import_artists.py` is also the only path that reconstructs the database
from scratch, so Postgres cannot currently be rebuilt without the TypeScript source.

MVP 2.0 calls for a better artist-adding/updating workflow, and multi-festival /
multi-appearance support is the arc that follows it. Both need a way to write artist
facts to Postgres that does not route through TypeScript files. The shape of that
workflow — its inputs, its transactional model, what an "artist record" even contains
once the TypeScript shape is no longer the definition — has never been decided; the
existing process grew ad hoc under time pressure and is inconsistent.

This ADR fixes the model and scope before the workflow is built.

## Decision

### A script-based workflow over a reusable service layer

The workflow is a set of Python scripts, not an admin UI. An admin dashboard remains
the long-term target but is out of scope until FestFuse has accounts. All logic lives
in a service layer (`backend/app/services/`, following `artist_publication.py`); each
script is a thin CLI wrapper (following `publish_artists.py`). A future dashboard or
API route calls the same service functions, so the CLI is the first caller of that
layer rather than throwaway scaffolding.

The existing bulk scripts — `import_artists.py`, `sync_artist_listening.py`,
`publish_artists.py` — are not modified. They are tested, single-purpose workflows.
The new workflow reuses their pure helpers (validation, slug generation, Spotify URL
parsing, appearance-time parsing) and their transactional and verification-timestamp
patterns.

### Canonical authoring model

The stored PostgreSQL schema, not the TypeScript type, defines an artist record. The
fields the current schema does not store are resolved as follows:

- **`mbid`** is added to `artists` as a nullable unique column, and the ~14 existing
  values are imported. It is a stable external identifier with no drift risk and is
  the natural key for later real-data work (discography, related artists, tour
  history).
- **`tagline`, `whySee`, `whatToExpect`, `bestFor`**, and **track `album` / `duration`
  / `artworkUrl`** are dropped from the working model. Nothing renders them, and the
  current per-record values carry the AI drift the `artist-review` process exists to
  correct. The track fields are also derivable live from Spotify given the stored
  `spotify_track_id`. If a future feature wants any of this, it returns through a fresh
  editorial pass, not by reviving current values.
- When `app/data/artists/*.ts` is deleted (see the roadmap's final section), the full
  final export is committed once as a provenance JSON snapshot: the record of what the
  files held and a secondary rebuild input.

### Workflow hierarchy

Creation follows festival edition/run/day → genre → artist:

- Festival edition, run, and day creation stay `seed_festivals.py`'s responsibility.
  Generalizing that for arbitrary festivals is the next roadmap, not this one.
- A dedicated operation adds a `genres` row to its family. Introducing a genre is no
  longer editing a TypeScript array.
- Adding an artist takes an existing run **by slug as a parameter** rather than
  hard-coding `lollapalooza-2026` as `import_artists.py` does. This makes the operation
  multi-festival-ready without doing multi-festival work.

Genre validation has two independent sources by design: the PostgreSQL `genres` table
is the source of truth for what the database supports, and `app/data/categories.ts`
remains the frontend filter UI's vocabulary. These are not required to converge until
the filter list itself is served from the API.

### Scope of the first workflow

The first slice is **create and hard-delete** one artist. Hard-delete exists so that
`add-artist` can be exercised without accumulating test rows; it is a test and cleanup
tool, not a product removal path. Field-level edits (about, socials, location, genres,
similar artists, tracks, name/slug) are a distinct, later slice. Withdrawal, appearance
cancellation, and the `LineupEntry` / `Appearance` status lifecycle are out of scope
and deferred to a later milestone.

### Hazards a single-artist writer must respect

- **Verification-invalidation triggers** (migration `7cee3ac4be86`): writing `about`,
  `youtube_url`, or `tiktok_url` nulls `about_verified_at` and `socials_verified`; any
  `similar_artists` row change nulls the parent set's `verified_at`. A writer that
  needs verification to persist must write content first, flush, then stamp the
  verification timestamps in a final pass, as `import_source()` already does.
- **`Appearance` integer primary key** is the sole persisted schedule identity and is
  exposed to the frontend and persisted in browser `localStorage` ([ADR-0004](0004-model-artist-curation-and-scheduling.md)).
  Creating appearances is safe; editing an existing appearance's time is not, and is
  outside the scope above.
- **`similar_artist_sets` is keyed `(festival_run_id, source_artist_id)`** —
  recommendations are run-scoped. The add-artist input names its run.
- **Billing tier lives once on `LineupEntry`**, not per `Appearance`.

### The editorial process is deliberately left open

Where artist data originates, how a draft is produced, how it is reviewed and approved,
and whether the `artist-review` skill is retargeted, replaced, or retired are **not**
decided here. That decision waits until the write path is concrete, and gets its own
record. In-repo documentation of the editorial process is not rewritten speculatively
before then.

### Documentation split

This work leaves `backend-rollout.md`, which is scoped to the frontend read path and
is complete at step 7. It gets its own roadmap, `docs/roadmap/artist-authoring.md`,
which ends by pointing forward to the multi-festival / multi-appearance roadmap that
builds on it. `backend-rollout.md`'s closing "Next" section points here.

`app/data/artists/*.ts` deletion is gated on a real PostgreSQL-level backup/restore and
clean-bootstrap path, so the database can be stood up without the TypeScript source.

## Consequences

- A complete artist can be created directly in Postgres in one transaction, and
  corrected in place once the edit slice lands, with no TypeScript round-trip.
- The service layer is reusable by a later admin API or dashboard without rework.
- The dormant editorial fields are removed from the active model; the provenance
  snapshot is the only record of their last values after deletion. Reintroducing any
  of them is a deliberate new editorial effort.
- `mbid` moves from legacy-only preservation to a first-class column.
- Adding a genre and adding an artist are separate operations, matching the eventual
  dashboard's separate workflows and the next roadmap's festival/run/genre/artist
  hierarchy.
- The `artist-review` skill keeps editing TypeScript files until the editorial-process
  decision is made; this is an accepted interim state, not the end state.
- Deleting `app/data/artists/*.ts` is blocked until the backup/restore path exists.

## Alternatives considered

- **Keep TypeScript as the authoring source and the import script indefinitely.**
  Rejected — it is a two-step authoring path prone to drift, and it leaves Postgres
  unable to rebuild itself without the frontend repo's data files.
- **Build the admin dashboard now** instead of a CLI. Rejected — FestFuse has no
  accounts, and the surrounding auth and review UX are their own scope. The service
  layer this ADR mandates means the CLI is not wasted effort when the dashboard comes.
- **Add PostgreSQL columns for `tagline` / `whySee` / `whatToExpect` / `bestFor` now**
  and migrate the current values. Rejected — the current values carry the drift the
  review process exists to fix, nothing consumes them, and a fresh pass is the right
  way to bring any of them back. The provenance snapshot preserves the last values.
- **Scrap the dormant fields with no snapshot.** Rejected — loses the `mbid`
  identifiers and the record of what the files contained at deletion.
- **One combined step, or keeping this under `backend-rollout.md`.** Rejected — the
  write path is a different concern from the read-path rollout, is roughly as large as
  the rest of that rollout, and feeds directly into the next roadmap.
- **Generalize festival creation now.** Deferred to the multi-festival roadmap;
  parameterizing add-artist by run slug is enough to stay ready for it.

## References

- [Artist authoring roadmap](../roadmap/artist-authoring.md)
- [ADR-0012: Field-level artist edit workflow](0012-field-level-artist-edits.md) —
  the deferred edit slice
- [Backend rollout roadmap](../roadmap/backend-rollout.md), "Next" section
- [ADR-0004: Model artist curation, lineup membership, and scheduled appearances](0004-model-artist-curation-and-scheduling.md)
- [Artist data model](../design/artist-data-model.md), "Initial import boundary"
- `backend/scripts/import_artists.py`, `backend/scripts/publish_artists.py`,
  `backend/app/services/artist_publication.py`
