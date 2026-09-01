# Architecture Decision Log

This directory contains Architecture Decision Records (ADRs) for consequential
FestFuse choices. `ARCHITECTURE.md` describes the current accepted system; ADRs
preserve the context, alternatives, and tradeoffs behind that system.

## Decisions

| ADR                                                                       | Decision                                                                                          | Status             |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ------------------ |
| [0001](0001-introduce-fastapi-postgresql-backend.md)                      | Introduce a FastAPI and PostgreSQL backend                                                        | Accepted           |
| [0002](0002-model-festival-runs-and-days.md)                              | Model festival editions with runs and days                                                        | Superseded by 0003 |
| [0003](0003-separate-festival-series-and-editions.md)                     | Separate recurring festival series from dated editions                                            | Accepted           |
| [0004](0004-model-artist-curation-and-scheduling.md)                      | Model artist curation, lineup membership, and scheduled appearances                               | Accepted           |
| [0005](0005-deploy-initial-backend-on-railway.md)                         | Deploy the initial hosted backend on Railway                                                      | Accepted           |
| [0006](0006-shared-run-appearances-store.md)                              | Share canonical Appearance identity and display data through one run-appearances store            | Accepted           |
| [0007](0007-quick-picks-track-and-similar-artists-on-bulk-appearances.md) | Extend the bulk appearances endpoint with Quick Picks' editorial fields, in its own frontend type | Accepted           |
| [0008](0008-time-based-fetch-revalidation.md)                             | Time-based revalidation for the two FastAPI fetch sites                                           | Accepted           |
| [0009](0009-rollback-and-observability-scope.md)                          | Minimal email alerting; rely on platform deployment rollback; no full observability service       | Accepted           |
| [0010](0010-api-failure-ux-after-typescript-fallback-removal.md)          | Two-mode failure UX after retiring the TypeScript fallback                                        | Accepted           |
| [0011](0011-direct-to-postgresql-artist-authoring.md)                     | Direct-to-PostgreSQL artist authoring workflow                                                    | Accepted           |
| [0012](0012-field-level-artist-edits.md)                                  | Field-level artist edit workflow                                                                  | Accepted           |
| [0013](0013-editorial-authoring-and-review-process.md)                    | Editorial authoring and review process                                                            | Accepted           |
| [0014](0014-postgresql-backup-and-clean-rebuild.md)                       | PostgreSQL-level backup and clean-rebuild strategy                                                | Accepted           |
| [0015](0015-multi-festival-and-multi-run-support.md)                      | Multi-festival and multi-run support                                                              | Accepted           |
| [0016](0016-describe-a-run-without-a-public-schedule.md)                  | Describe a run without a public schedule in the API                                               | Accepted           |
| [0017](0017-video-only-publication-readiness-tier.md)                     | A featured live-performance video is a third publication-readiness tier                            | Accepted           |
| [0018](0018-about-copy-leads-during-deferred-about-passes.md)             | Capture about-copy leads during deferred-`about` research passes                                   | Accepted           |

## Lightweight convention

Create an ADR only for a choice that materially affects system structure,
interfaces, data integrity, operational behavior, or an expensive-to-reverse
dependency. Minor naming, formatting, and local implementation choices do not need
one.

Each record should contain:

- **Status** — Proposed, Accepted, Rejected, or Superseded.
- **Recorded** — when the record was written. Retrospective records should say so
  rather than inventing an original decision date.
- **Context** — the problem and constraints that made a decision necessary.
- **Decision** — the accepted direction, stated plainly.
- **Consequences** — benefits, costs, and constraints introduced.
- **Alternatives considered** — credible options that were not selected.

Accepted records preserve history. If an accepted decision materially changes,
create a new ADR and mark the earlier one `Superseded` with a link to its
replacement. Correcting typos and broken links does not require a replacement ADR,
and a stale reference — a renamed or moved file, a changed path or symbol name — is a
broken link: fix it in place. The bar for a new ADR is adding or changing meaning, not
keeping pointers accurate.
An accepted record's Context/Decision/Alternatives/Consequences do not get amended
afterward, including for a related but distinct decision that builds on it — that
gets its own new ADR, cross-referenced from this one's References section, not an
appended note in this one's body.
