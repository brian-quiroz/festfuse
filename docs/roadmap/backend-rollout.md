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
- The guarded publication workflow has published all 171 Artists, both locally and
  on the hosted Railway database.
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
  snapshot. All 171 Artists are published under the same readiness policy used
  locally.
- Local and hosted credentials remain separate and uncommitted. Administrative data
  bootstrap uses an encrypted Railway tunnel rather than exposing PostgreSQL publicly.
- Prefer server-side or same-domain access where practical. If the browser calls a
  different API origin directly, configure CORS narrowly for the intended origins.

The exact configuration, bootstrap commands, and verification routes are documented
in [`../operations/backend-deployment.md`](../operations/backend-deployment.md).

**Checkpoint reached:** the hosted API reaches a migrated, populated database without
changing the production frontend's current TypeScript data source.

### 5. Move one Artist Detail page through the API

**Status: completed.**

- Start with one bounded consumer: the Artist Detail page for `5sos`.
- `FESTFUSE_API_ARTIST_SLUGS` is an explicit comma-separated allowlist. Only listed
  slugs use the hosted API; all other Artist pages continue to use TypeScript data.
- Similar Artist membership comes from the API, while the existing card presentation
  temporarily resolves target image and genre metadata from the TypeScript snapshot.
- An API 404 preserves the public publication gate and renders the existing not-found
  experience. During this proof of concept, an operational or malformed-response
  failure is logged server-side and temporarily falls back to the validated
  TypeScript Artist.
- Keep requests uncached with `cache: "no-store"` during the proof of concept.
- The path was verified locally, in a Vercel Preview deployment, and on the production
  Vercel domain. Vercel runtime/network telemetry and Railway's active deployment
  logs confirmed the server-side request reached FastAPI and PostgreSQL successfully.
- Loading, not-found behavior, ordering, responsive presentation, and content parity
  were checked without broadening the allowlist.

**Checkpoint reached:** `5sos` works end to end from hosted PostgreSQL through FastAPI
to the production Next.js UI, while every non-allowlisted Artist remains
TypeScript-backed.

### 6. Complete remaining Artist publication

**Status: completed.**

- Curated one playable Quick Picks track for each of the 45 remaining draft Artists,
  and resolved a Spotify artist identity for the two Artists that previously had
  neither one nor a curated Listen First override.
- Synchronized the curated listening configuration into PostgreSQL with a dedicated,
  idempotent backfill script, then re-ran the guarded publication workflow rather
  than changing publication status manually. Ran both steps locally and, through the
  encrypted Railway tunnel, against the hosted database.
- Verified all 171 Artists are published with zero remaining drafts on both
  databases, that all 170 verified Similar Artist sets are now fully visible without
  partial filtering or recuration, and reran the full backend test suite. Spot-checked
  the live hosted API for previously-draft Artists (e.g. `adela`, `ric-wilson`) to
  confirm the new Quick Picks track and Spotify identity resolve correctly end to end.

**Checkpoint reached:** every intended lineup Artist is publication-ready and public
under the documented readiness policy.

### 7. Expand and cut over deliberately

**Status: in progress.**

Consumers migrate one at a time, deepest-integrated first, deliberately keeping the
Artist Detail allowlist narrow and reads uncached while the read paths themselves are
still being proven out. Broadening exposure (cache policy, allowlist size,
observability) is a late, grouped decision, not an early gate — masking integration
bugs behind a cache or spreading a partial migration across many artists at once
would make them harder to isolate, not easier.

1. **Finish `5sos`'s own integration gaps.** Its Similar Artist cards still resolve
   target image/genre from `app/data/artists` — a temporary carryover from step 5.
   Close that gap so the single allowlisted artist is fully API-backed.

   **Status: completed.** The backend already returned each similar-artist target's
   full `image`/`genres` in the run-scoped response; the frontend mapper was discarding
   them down to `{name, slug}`. `mapFestivalArtistResponse` now populates `imageUrl`
   and `genres` per similar-artist entry via the existing `mapImage`/`mapGenres`
   helpers, and `FloatingCards` prefers that API-sourced data directly when present,
   falling back to the live `artistsBySlug` lookup only for TS-sourced entries (the
   distrusted TS-only `similarArtists[].imageUrl` field is still bypassed there, as
   before). `5sos`'s Similar Artist cards no longer depend on TS data.
2. **Migrate Planner's display data onto the appearances endpoint**, not just the
   `Appearance.id` resolution `runAppearancesStore` already provides. Applies
   globally to Planner, independent of the Artist Detail allowlist. Keep reads
   uncached.
3. **Migrate Explore onto the existing `/appearances` endpoint.** It already returns
   every artist in the run (slug, name, image, genres, billing tier, schedule) via
   `FestivalRunArtistRead`/`FestivalRunAppearanceRead` — no new endpoint required.
   The one known gap is `artist.location`, which Explore filters on but the schema
   doesn't yet expose; add it there. Keep reads uncached.
4. **Migrate Quick Picks onto the same `/appearances` data**, checking for other
   field gaps (e.g. the curated Quick Picks track) the same way before assuming new
   backend work is needed.
5. **Migrate Festival Story.** Same bulk-catalog shape as Quick Picks
   (genre/location/tier across the full artist set); can follow or run alongside
   step 4.
6. **Decide the production cache policy, revisit observability/rollback scope, and
   broaden the Artist Detail allowlist from one artist to roughly five** — together,
   once every consumer above is integrated. Don't assume a bespoke rollback mechanism
   is needed by default; Vercel and Railway both already provide deployment-level
   rollback, so weigh that before building a dedicated kill switch.
7. **Remove `app/data/artists` as a runtime dependency** only after all consumers
   have parity, both as a read source (this rollout) and eventually as an authoring
   source (import scripts today, an admin workflow later).

## Guardrails

- Do not point a deployed frontend at a local API or database.
- Do not expose draft artists through public endpoints.
- Do not make production depend on the API before preview parity is verified.
- Do not treat pgAdmin edits as a repeatable data workflow.
- Do not run schema migrations or the artist importer on ordinary user requests.
- Keep migrations, bootstrap/import commands, required environment variables, and
  verification commands documented before calling the backend reproducible.
- Do not assume `.env.local` points at a local backend — it points at the hosted
  Railway API by default. Testing an endpoint that isn't deployed yet requires an
  explicit local override, not just a running local server — see
  [`local-development.md`](../operations/local-development.md).
- Do not conflate the content allowlist (`FESTFUSE_API_ARTIST_SLUGS`, which Artist
  Detail pages read from the API) with scheduling-identity resolution
  (`runAppearancesStore`, which is unscoped and covers every artist regardless of
  the allowlist). They are independent mechanisms.
