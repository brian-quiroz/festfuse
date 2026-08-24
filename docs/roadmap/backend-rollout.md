# Backend Rollout Roadmap

This document tracks the path from FestFuse's imported PostgreSQL data to a
deployed frontend that reads from FastAPI. It is an implementation roadmap, not an
architecture decision record: accepted domain decisions remain in
[`artist-data-model.md`](../design/artist-data-model.md), while durable architectural
decisions belong in [`../decisions/`](../decisions/).

## Current boundary

- The festival and artist schemas exist in PostgreSQL through committed Alembic
  migrations.
- The validated TypeScript artist snapshot has been imported into the local database.
- Artist publication-readiness rules exist as pure application logic, with unit and
  PostgreSQL integration coverage.
- The guarded publication workflow has published 126 passing Artists in one
  transaction. The remaining 45 stay intentionally visible as drafts with reported
  readiness issues.
- The production frontend still reads its existing TypeScript data. It does not yet
  depend on FastAPI or a hosted PostgreSQL database.

## Rollout sequence

### 1. Complete artist publication

**Status: completed.**

- Keep one reusable readiness evaluator as the source of publication policy.
- Publish passing artists transactionally; leave failing artists as drafts and report
  their specific readiness issues.
- Verify the expected ready/draft totals and rerun the full backend test suite.

**Checkpoint reached:** publication state is intentional, reproducible, and tested.

### 2. Build the artist read API

**Status: first artist-core slice complete; contextual expansion pending.**

- Add SQLAlchemy queries, Pydantic response schemas, FastAPI routes, and endpoint
  tests for the first stable Artist API boundary.
- Public routes return published artists only. Draft inspection remains an
  administrative concern.
- Preserve deterministic ordering for genres, tracks, videos, and similar artists.

The first slice is `GET /api/v1/artists/{slug}`. It returns published Artist identity,
approved image metadata, location, ordered genres, the selected Quick Picks track,
and semantic Listen First data. It deliberately excludes editorial verification
fields, videos, recommendations, lineup membership, and appearances until their
public and festival-context rules are implemented.

**Checkpoint:** one artist can be read through a stable, documented API response.

### 3. Verify API parity before replacing a frontend source

**Status: artist-core parity complete; full consumer parity pending.**

- Compare the API representation with the current TypeScript representation for
  representative artists and edge cases.
- Resolve intentional differences explicitly; do not silently discard curated data.
- Keep the TypeScript source available as a rollback/reference boundary during the
  transition.

The artist-core parity suite documents approved-image, hidden-image, ordinary Spotify,
and curated Listen First modes. It also verifies that the exact 126 source Artists
derived as publication-ready match the PostgreSQL published set and that every field
currently exposed by `GET /api/v1/artists/{slug}` is semantically equivalent to its
TypeScript source.

**Checkpoint:** the API can satisfy the chosen frontend slice without a behavioral or
content regression.

### 4. Establish hosted backend environments

- Deploy FastAPI and provision hosted PostgreSQL; a deployed frontend cannot access
  the developer machine's `127.0.0.1` database or API.
- Keep local, preview, and production database URLs and secrets separate.
- Apply committed Alembic migrations to each database. Bootstrap/import curated data
  deliberately; do not rerun the importer on every application startup or deploy.
- Prefer server-side or same-domain access where practical. If the browser calls a
  different API origin directly, configure CORS narrowly for the intended origins.

**Checkpoint:** a preview deployment can reach a migrated, populated preview database
without affecting production.

### 5. Move one frontend slice in preview

- Start with one bounded consumer, such as the Artist Detail page for a representative
  artist.
- Use an explicit preview-only configuration or feature flag while production
  continues to use TypeScript data.
- Test loading, not-found, error, ordering, responsive UI, and content parity in the
  deployed preview environment.

**Checkpoint:** the first end-to-end path works from hosted PostgreSQL through FastAPI
to the deployed Next.js UI.

### 6. Expand and cut over deliberately

- Migrate additional consumers only after the first slice is stable.
- Add observability and a rollback path before production becomes API-dependent.
- Remove the legacy runtime data path only after all consumers have parity and the
  imported data has a maintained source/update workflow.

## Guardrails

- Do not point a deployed frontend at a local API or database.
- Do not expose draft artists through public endpoints.
- Do not make production depend on the API before preview parity is verified.
- Do not treat pgAdmin edits as a repeatable data workflow.
- Do not run schema migrations or the artist importer on ordinary user requests.
- Keep migrations, bootstrap/import commands, required environment variables, and
  verification commands documented before calling the backend reproducible.
