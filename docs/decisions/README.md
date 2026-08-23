# Architecture Decision Log

This directory contains Architecture Decision Records (ADRs) for consequential
FestFuse choices. `ARCHITECTURE.md` describes the current accepted system; ADRs
preserve the context, alternatives, and tradeoffs behind that system.

## Decisions

| ADR | Decision | Status |
| --- | --- | --- |
| [0001](0001-introduce-fastapi-postgresql-backend.md) | Introduce a FastAPI and PostgreSQL backend | Accepted |
| [0002](0002-model-festival-runs-and-days.md) | Model festival editions with runs and days | Accepted |

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
replacement. Correcting typos and broken links does not require a replacement ADR.
