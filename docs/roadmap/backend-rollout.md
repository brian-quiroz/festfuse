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

**Status: global and run-scoped Artist Detail read boundary complete.**

- Add SQLAlchemy queries, Pydantic response schemas, FastAPI routes, and endpoint
  tests for the first stable Artist API boundary.
- Public routes return published artists only. Draft inspection remains an
  administrative concern.
- Preserve deterministic ordering for genres, tracks, videos, and similar artists.

The first slice is `GET /api/v1/artists/{slug}`. It returns published Artist identity,
approved image metadata, location, ordered genres, the selected Quick Picks track,
and semantic Listen First data. Its next incremental slice adds verified About,
independently derived Spotify linking, verified YouTube/TikTok links, and the featured
available video. It deliberately excludes recommendations, lineup membership, and
appearances because those meanings require an explicit festival context.

The contextual slice is
`GET /api/v1/festivals/{edition_slug}/runs/{run_slug}/artists/{artist_slug}`. It
reuses the global Artist projection and adds explicit edition/run identity, announced
billing, and chronological public Appearances. An empty Appearance list validly
represents an announced lineup whose schedule has not yet been published. Similar
Artists are returned through the same run-scoped context.

The recommendation slice preserves the four-or-none editorial contract. New
recommendation curation runs only after eligible same-run Artists are published. For
transitional legacy sets, the API exposes all four targets only when every target is
still published and announced; otherwise it hides the complete set without clearing
its editorial verification. Completing the remaining 45 draft Artists restores
eligible stored sets without partial filtering or recuration of unchanged
recommendations.

The implemented response uses canonical target Artist data and preserves editorial
display order. Current legacy visibility is intentionally incomplete until the
remaining draft targets are publication-ready; the API does not manufacture partial
sets to increase coverage.

**Checkpoint:** one artist can be read through a stable, documented API response.

### 3. Verify API parity before replacing a frontend source

**Status: global and run-scoped Artist Detail parity complete.**

- Compare the API representation with the current TypeScript representation for
  representative artists and edge cases.
- Resolve intentional differences explicitly; do not silently discard curated data.
- Keep the TypeScript source available as a rollback/reference boundary during the
  transition.

The parity suite documents approved-image, hidden-image, ordinary Spotify, curated
Listen First, verified editorial/social content, and featured-video behavior. It also
verifies that the exact 126 source Artists derived as publication-ready match the
PostgreSQL published set and that every field currently exposed by
`GET /api/v1/artists/{slug}` is semantically equivalent to its TypeScript source.
The same suite verifies every published Artist's Lollapalooza run billing and schedule,
including the existing multi-appearance Artist. Recommendation parity derives the
published-target gate from the source snapshot and verifies canonical target identity,
approved image visibility, genre order, and all-or-none set behavior for every
published source Artist.

**Checkpoint:** the API can satisfy the chosen frontend slice without a behavioral or
content regression.

### 4. Establish hosted backend environments

**Status: initial hosted backend preview complete.**

- FastAPI and managed PostgreSQL are deployed as separate, private-networked Railway
  services. The API has a public Railway domain; PostgreSQL does not.
- Railway applies committed Alembic migrations as the API's pre-deploy step. Festival
  seeding, Artist import, and publication remain deliberate operations and never run
  during ordinary application startup or deploy.
- The hosted database contains the Lollapalooza hierarchy and validated Artist
  snapshot: 126 Artists are published and 45 remain drafts under the same readiness
  policy used locally.
- Local and hosted credentials remain separate and uncommitted. Administrative data
  bootstrap uses an encrypted Railway tunnel rather than exposing PostgreSQL publicly.
- Prefer server-side or same-domain access where practical. If the browser calls a
  different API origin directly, configure CORS narrowly for the intended origins.

The exact configuration, bootstrap commands, and verification routes are documented
in [`../operations/backend-deployment.md`](../operations/backend-deployment.md).

**Checkpoint reached:** the hosted API reaches a migrated, populated database without
changing the production frontend's current TypeScript data source.

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
