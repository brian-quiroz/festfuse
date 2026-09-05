# ADR-0019: Artist photo sourcing and reuse-license policy

- Status: Accepted
- Recorded: 2026-09-05, written with the work: the image-sourcing process
  (`docs/process/artist-image-sourcing.md`, `docs/process/artist-image-sources.md`)
  and its per-tool skill pointers were added following a ten-artist trial run, and this
  record captures the reuse-license policy behind them. Follows ADR-0013's precedent of
  a versioned process document with thin skill entry points, and ADR-0011's precedent
  of a decision written retroactively alongside the work it governs.

## Context

Artists carry an optional hero/card photo (`image_url`) plus attribution columns
(`image_credit_author`, `image_source_url`, `image_license_url`, `image_taken_year`,
`image_sourced_at`), surfaced on `/credits`. ADR-0013's editorial process names every
`*Verified` sign-off as editor-owned, `imageVerified` included, but does not say where
photos come from or which licenses are acceptable. Pre-launch, 21 photos were sourced
by hand with no written policy.

FestFuse is a public portfolio project. A photo shown on it is a public reuse of
someone else's work, so the licensing has to be defensible per-image, not assumed from
a site footer or a search snippet. Two things needed deciding: what counts as a
reusable license, and how the sourcing work is structured so any tool (Claude, Codex,
Cursor) runs it the same way.

## Decision

1. **Accepted reuse licenses.** Prefer CC0 / public domain and CC BY. Accept CC BY-SA
   only with its share-alike obligation recorded explicitly in the handoff. Exclude
   all-rights-reserved, noncommercial-only, and no-derivatives material from ordinary
   recommendations. Unknown or unclear permission is not a usable fallback: a row is
   left without a candidate rather than filled with unverified rights.

2. **Per-file verification.** The selected file's creator, source page, exact license
   version, original dimensions, and date taken are verified from structured source
   metadata (the MediaWiki `extmetadata` fields, or the Flickr API), not from page
   footers or search results. Date taken is distinguished from upload date.

3. **Sources.** Wikimedia Commons and Flickr, via their public APIs. Commons needs no
   key. Flickr needs an application API key, kept in `backend/.env` as
   `FLICKR_API_KEY`; without one, Flickr is a best-effort browser fallback.

4. **The process is a versioned document with thin skill pointers**, matching ADR-0013.
   `docs/process/artist-image-sourcing.md` holds the selection priorities, bounded
   search, CSV contract, and optimize step; `docs/process/artist-image-sources.md`
   holds source access and license rules. The `.claude` / `.agents` / `.cursor`
   entry points only route there.

5. **Editing a photo.** Ordinary in-app positioning (`image_focal_y_percent`, CSS
   `object-position`) is not a derivative edit. An actual crop or adaptation is a last
   resort, done only when positioning is insufficient, with the license's modification
   notice retained. Mirroring and AI background fill are not used.

6. **Sourcing output stays local for now.** The per-batch research CSV and downloaded
   originals are written to a local output root outside the repo. Whether any of that
   becomes a committed provenance record is deferred to the existing
   `docs/FUTURE_CONSIDERATIONS.md` item and will get its own ADR. The database and
   `/credits` remain the source of truth for attribution.

## Consequences

- Every displayed photo has a recorded creator, license URL, and license version, and
  `/credits` renders them. A licensing question can be answered per-image.
- CC BY-SA images carry a share-alike obligation on that adapted image if it is ever
  edited; the process records the obligation so it is not overlooked. This does not
  put any license on the site as a whole.
- The accepted-license set is narrow enough that some artists, especially smaller or
  newer acts, will have no verified candidate and stay on the genre-gradient fallback.
  That is preferred to showing a photo with unclear rights.
- A second editorial sub-process to maintain, parallel to genres/location/about, with
  its own tool-agnostic document.
- Attribution lives only in Postgres and on `/credits`; a laptop loss between sourcing
  and publish loses the research CSV but not any published record. Accepted until the
  deferred provenance question is decided.

## Alternatives considered

- **Accept any Creative Commons license, including NC and ND.** Rejected. A public
  portfolio is a public, arguably promotional reuse; NC and ND are the wrong footing
  and add per-image caveats that are easy to get wrong.
- **Only CC0 / public domain.** Rejected as too narrow: it would drop most usable live
  performance photography and leave far more artists without a photo.
- **Stock libraries (as used for Festival Story backgrounds).** Rejected for artist
  photos: a specific named performer needs a specific verified photo of that person,
  not a licensed generic image, and the per-artist attribution is the point.
- **Store sourcing provenance in the repo now.** Deferred, not rejected: the operator
  already has overlapping local material and `FUTURE_CONSIDERATIONS.md` frames the
  broader "what becomes version-controlled" question, which should be settled once.
- **Fold this into ADR-0013.** Not allowed; accepted ADRs are not amended. This is a
  distinct decision that builds on it.

## References

- [ADR-0013: Editorial authoring and review process](0013-editorial-authoring-and-review-process.md),
  the process this extends
- [ADR-0011: Direct-to-PostgreSQL artist authoring workflow](0011-direct-to-postgresql-artist-authoring.md)
- [`docs/process/artist-image-sourcing.md`](../process/artist-image-sourcing.md)
- [`docs/process/artist-image-sources.md`](../process/artist-image-sources.md)
- [`docs/design/artist-data-model.md`](../design/artist-data-model.md), the image columns
- [`docs/FUTURE_CONSIDERATIONS.md`](../FUTURE_CONSIDERATIONS.md), "Committed Provenance
  Record for the ACL 2026 Roster"
