# Provenance snapshots

Frozen archival records of data that once lived in the repository and has since been
removed. Nothing here is maintained. These files are never read at runtime.

## `artists-lollapalooza-2026.json`

The final serialized output of `scripts/export-artist-data.ts`, captured on
2026-08-28 immediately before `app/data/artists/*.ts` and the TypeScript import
tooling were deleted (artist authoring roadmap section 6, ADR-0011).

It is the envelope that `scripts/import_artists.py` used to consume:
`schemaVersion`, the full `artists` array, the controlled `vocabularies`, the
`genreFamilies` map, and the `festivals` config. 171 artists.

### Why it is kept

- **The record of what the TypeScript files contained at deletion.** The dormant
  editorial fields that were dropped from the working model (`tagline`, `whySee`,
  `whatToExpect`, `bestFor`, and track `album` / `duration` / `artworkUrl`, per
  ADR-0011) survive only here. Reintroducing any of them is a deliberate new
  editorial effort, not a revival of these values.
- **`app/lib/verify-story-signals.ts`'s data source.** That script verifies Festival
  Story's signal algorithm against a fixed roster. It reads this file instead of a
  live database so the check stays offline and deterministic. The data is a frozen
  baseline, not current truth.

### What it is not

Not a database rebuild input. PostgreSQL is rebuilt with `pg_restore` from a
`pg_dump` (ADR-0014, `docs/operations/backup-restore.md`); that path does not touch
this file.
