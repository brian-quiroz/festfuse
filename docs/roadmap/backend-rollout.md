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
- The production frontend depends on FastAPI and the hosted Railway PostgreSQL
  database for every artist-facing read, via the run-scoped appearances endpoint and
  the global artist endpoint.

This document is a historical record of the read-path rollout. The authoring cutover
that followed (replacing `app/data/artists/*.ts` with a direct-to-PostgreSQL write
workflow) is a distinct concern, tracked in
[`artist-authoring.md`](./artist-authoring.md) with its rationale in
[ADR-0011](../decisions/0011-direct-to-postgresql-artist-authoring.md) and
[ADR-0013](../decisions/0013-editorial-authoring-and-review-process.md); that roadmap
is complete, and PostgreSQL is now the sole artist data source for both read and write.

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

**Status: completed.**

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

   **Status: completed.** Planner's per-appearance display type (`AppearanceEntry` in
   `app/lib/schedule.ts`) is now a lean, source-agnostic shape (artist slug/name, day,
   date, start/end time, stage) built either from `runAppearancesStore` (preferred,
   once `hasLoaded`) or from `app/data/artists` (fallback while the store hasn't
   loaded — an operational failure, not a normal state). `getAppearanceKey` now takes
   the scalars it always actually needed rather than full `Artist`/`FestivalAppearance`
   objects, so both sources compute identical keys through one shared function.
   Time-of-day is read directly from the API's already festival-local-converted
   timestamps (no timezone name needed, no hardcoding); day and calendar date are
   derived from `festival_date` the same way `mapFestivalArtist.ts` already does for
   Artist Detail. Cross-surface testing (Explore/Artist Detail/Planner, in every
   direction, for both the single- and multi-appearance case) caught and fixed a real
   schedule-key mismatch for DEVAULT — see ADR-0006 for the DEVAULT fix, and
   `formatApiTime`'s own comment (`app/lib/api/mapRunAppearance.ts`) for the
   timezone reasoning. Reads remain ungated by `FESTFUSE_API_ARTIST_SLUGS` (cache
   policy for this fetch is covered by step 7 item 6 and ADR-0008).

   The same testing also caught a pre-existing, unrelated bug (confirmed present before
   this step's changes via `git stash`): `scheduleStore`'s own `localStorage` hydration
   runs synchronously before `runAppearancesStore` populates, so conflict detection and
   the Sidebar's scheduled count silently zeroed out on every fresh page load. Fixed by
   having `scheduleStore` re-derive its conflict/scheduled-artist state once
   `runAppearancesStore` finishes loading — see the comment above
   `useRunAppearancesStore.subscribe(...)` in `app/store/scheduleStore.ts`.

3. **Migrate Explore onto the existing `/appearances` endpoint.** It already returns
   every artist in the run (slug, name, image, genres, billing tier, schedule) via
   `FestivalRunArtistRead`/`FestivalRunAppearanceRead` — no new endpoint required.
   The one known gap is `artist.location`, which Explore filters on but the schema
   doesn't yet expose; add it there. Keep reads uncached.

   **Status: completed.** `FestivalRunArtistRead` gained `location`, mapped by a new
   shared `_map_location` helper (`backend/app/queries/artists.py`) reused by both the
   global Artist projection and this run-scoped one, closing the one real gap between
   this endpoint and Explore's needs.

   On the frontend, `RunArtist` (`app/lib/api/mapRunAppearance.ts`) is the new lean,
   source-agnostic per-artist type Explore's whole pipeline (`filterArtists`,
   `searchArtists`, `sortByDay`/`sortByBillingTier`/`sortChronologically`/
   `sortFestivalFavoritesForFullView`, `shuffleDayBlocks`/`interleaveByDayShuffled`,
   `ArtistCard`/`ArtistCarousel`/`ArtistResultsGrid`) now operates on instead of the
   full `Artist`, mirroring Planner's `AppearanceEntry` precedent but at artist grain
   rather than appearance grain. Every field is real data with the same type as its
   `Artist` counterpart — never a placeholder for the editorial-only fields (`tagline`,
   `whySee`, `about`, etc.) the bulk endpoint deliberately doesn't return. Two
   constructors produce it, gated on `runAppearancesStore.hasLoaded` exactly like
   Planner's `getAllAppearanceEntries`/`getAppearanceEntriesFromApi`:
   `getAllRunArtists` (TS fallback) and `getRunArtistsFromApi` (preferred).

   The shared appearance/schedule helpers that only ever touched `slug`/`appearances`
   (`getPrimaryAppearance`, `getPrimaryBillingTier`, `getAppearancesForFestival`,
   `getSelectedDayAppearance`, `getSelectedDayBillingTier`, `getAppearanceById` in
   `app/lib/appearances.ts`; `getArtistScheduleState` in `app/lib/schedule.ts`;
   `toggleAllAppearances` in `app/store/scheduleStore.ts`; `getVerifiedImageUrl` in
   `app/lib/artistImage.ts`) were narrowed from `Artist` to `Pick<Artist, "slug" |
"appearances">` (or the equivalent image-field pick) — a genuine structural
   subtype, not a new named interface, so every existing full-`Artist` call site
   (Quick Picks, Artist Detail, Planner) kept compiling and behaving unchanged.
   `BILLING_TIERS`, `mapGenres`, and `mapImage` (`app/lib/api/mapFestivalArtist.ts`)
   were widened from module-private to exported for reuse here, the same way
   `KNOWN_STAGES`/`requireKnownValue` already were for Planner.

   Cross-surface testing (Explore, Planner, and Artist Detail together, both
   directions) confirmed DEVAULT — the one multi-appearance Artist — schedules
   correctly from Explore using real database Appearance ids (not TS-legacy ids) and
   that `scheduleStore`'s persisted state is read identically on Planner. Carousel
   membership (Festival Favorites, International Picks, Chicago's Own, After Dark),
   search ranking (including the UK-constituent-country rollup), and the `!hasLoaded`
   TS-fallback path were all verified against a local backend and match the intended
   behavior with zero regressions.

4. **Migrate Quick Picks onto the same `/appearances` data**, checking for other
   field gaps (e.g. the curated Quick Picks track) the same way before assuming new
   backend work is needed.

   **Status: completed.** The field-gap check found two: the curated Quick Picks
   track and `similarArtists` ("Sounds like"), neither returned by the bulk endpoint.
   Rather than a per-card fetch to the single-artist endpoint (rejected — backend
   load would scale with swipe behavior) or a temporary TS-sourced carryover (the
   step 1 item 1 pattern), `FestivalRunArtistRead` was extended with
   `quick_picks_track` and a batched, run-scoped `similar_artists` query — ~5 total
   indexed queries per bulk request instead of 171 separate ones. See ADR-0007 for
   the full query-shape analysis, the endpoint-shape reasoning behind that choice,
   and why the two new fields live on a new `QuickPicksRunArtist` sibling type
   (`app/lib/api/mapRunAppearance.ts`) rather than growing `RunArtist` itself.

   `app/lib/quick-picks-queue.ts`, `app/quick-picks/page.tsx`,
   `app/components/quick-picks/StartScreen.tsx`, and
   `app/components/quick-picks/DecisionScreen.tsx` now build their queue and render
   from `QuickPicksRunArtist` via the same `hasLoaded`/TS-fallback/API-backed gating
   idiom as Explore and Planner. `createSession` takes the resolved artist array as
   an explicit parameter instead of importing `allArtists` at module scope, keeping
   it source-agnostic and directly callable from verification scripts. Reads stay
   unscoped by `FESTFUSE_API_ARTIST_SLUGS`, matching Explore/Planner (cache policy
   is covered by step 7 item 6 and ADR-0008).

   Verified end to end against a local backend: TypeScript compiles clean, the full
   backend test suite passes (42/42, including new coverage for `quick_picks_track`/
   `similar_artists` field mapping and the four-or-none gate against real seeded
   5sos data), and a full Quick Picks session run in a real browser confirmed the
   Quick Listen embed and Sounds Like section render real API data (verified via the
   Spotify iframe's actual `src`, not just presence) with zero console/page errors.
   Explore, Planner, and Artist Detail (5sos, Chicago Made, WORSHIP) were also
   re-checked for regressions from the shared files this step touched
   (`app/lib/api/mapFestivalArtist.ts`, `app/lib/appearances.ts`) — none found.

5. **Migrate Festival Story.** Same bulk appearances shape as Quick Picks
   (genre/location/tier across the full artist set); can follow or run alongside
   step 4.

   **Status: completed.** No backend work needed — Festival Story's signal engine
   (`app/hooks/useStorySignals.ts`) only ever reads `slug`, `genres`,
   `location.city`/`location.country`, and the resolved appearance's
   `billingTier`/`stage`/`day`, all already on `RunArtist`. Retyped
   `ComputeStorySignalsParams.allArtists`, `getEligibleArtists`,
   `getValidPositivePicks`, and `computeAggregateMetrics` from `Artist[]` to
   `RunArtist[]` — zero lines of the actual scoring/selection/copy logic changed.
   `FestivalStorySequence.tsx` now builds `runArtists` via the same
   `hasLoaded`/TS-fallback/API-backed gating idiom as Explore/Planner/Quick Picks;
   `quick-picks/page.tsx`'s `storyUnlocked` check reuses the `quickPicksArtists` it
   already computes (`QuickPicksRunArtist` already structurally satisfies
   `RunArtist[]`).

   `app/lib/verify-story-signals.ts` (the `npm run verify:story` script, ~87 checks)
   was deliberately left untouched — a full `Artist` structurally satisfies the
   narrower `RunArtist` type, so its real-data and synthetic-fixture calls continue
   compiling and behaving identically. Confirmed with `tsc`, not just assumed:
   `npx tsc --noEmit` is clean, and the full verify:story suite still passes 86 of 87
   checks; the one failure is pre-existing real-data drift unrelated to this
   migration, see `docs/FUTURE_CONSIDERATIONS.md`'s "Stale Chicago-Baseline Fixture"
   entry.
   Manually verified end to end against a local backend: all 4 signal cards plus
   intro/final render with real API-sourced data (genre/billing/stage-footprint
   signals, decision-profile threshold logic), zero console/page errors. Explore,
   Planner, Quick Picks, and Artist Detail re-checked for regressions — none found.

6. **Decide the production cache policy, revisit observability/rollback scope, and
   broaden the Artist Detail allowlist from one artist to roughly five** — together,
   once every consumer above is integrated. Don't assume a bespoke rollback mechanism
   is needed by default; Vercel and Railway both already provide deployment-level
   rollback, so weigh that before building a dedicated kill switch.

   **Status: completed.** Both FastAPI fetch sites (`fetchFestivalArtist`,
   `fetchFestivalRunAppearances`) moved from `cache: "no-store"` to a shared
   `next: { revalidate: 600 }` (10 minutes), defined once in a new
   `app/lib/api/cacheConfig.ts` — see ADR-0008 for why one shared window rather than
   two, and why 10 minutes given FestFuse's product framing as a pre-festival
   decision assistant rather than a live schedule source of truth. No bespoke kill
   switch was built: Vercel/Railway's existing deployment-level rollback and the
   automatic per-request TypeScript fallback already cover both realistic failure
   modes. A minimal email failure alert (`app/lib/alerts/sendFailureAlert.ts`, via
   Resend's REST API, no SDK) was added alongside the existing `console.error` calls
   so an operational failure is no longer only visible by checking Vercel's log
   viewer — see ADR-0009 for the full reasoning, including why a full observability
   service (Sentry or similar) was rejected as disproportionate at current scale.
   `FESTFUSE_API_ARTIST_SLUGS` was broadened from `5sos` alone to
   `5sos,devault,kettama,worship,lorde`, each chosen to exercise a distinct code
   path: `devault` (the one multi-appearance artist), `kettama` and `worship`
   (hidden/unapproved image), `worship` (curated Listen First override), and `lorde`
   (featured video). Verified locally against the hosted Railway API: all five
   artist pages render successfully with no fallback triggered; repeated requests to
   the same artist showed a clear latency drop consistent with the cache collapsing
   requests; hidden-image artists render without a broken image; `devault` renders
   both its Thursday and Sunday appearances with correct times; `lorde` renders its
   featured video. A forced-failure test (pointing `FESTFUSE_API_BASE_URL` at an
   unreachable host) confirmed both fetch sites degrade gracefully to TypeScript
   data without breaking the page, and that the new alert call sites never throw or
   block the response even without alerting credentials configured. `npx tsc
--noEmit` and `eslint` are clean on every changed file. Sending a real alert
   email requires a Resend account and API key, which is a manual step outside this
   session — `RESEND_API_KEY` remains blank in `.env.local` (a no-op) until
   provided.

7. **Remove `app/data/artists` as a runtime dependency** only after all consumers
   have parity, both as a read source (this rollout) and eventually as an authoring
   source (import scripts today, an admin workflow later).

   **Status: completed (runtime read-path scope only — authoring is covered by the
   "Next" section).**

   Every remaining runtime importer of `app/data/artists` was inventoried and closed:
   the four `hasLoaded`-gated TS-fallback consumers (Explore, Planner, Quick Picks,
   Festival Story) had their TS branch deleted outright, not just disabled, along
   with the now-dead `getAllRunArtists`/`getAllQuickPicksRunArtists`
   (`app/lib/api/mapRunAppearance.ts`) and `getAllAppearanceEntries`
   (`app/lib/schedule.ts`) constructors those branches were the sole callers of.
   Artist Detail's `FESTFUSE_API_ARTIST_SLUGS` allowlist is retired entirely —
   `app/artist/[slug]/page.tsx` now calls the API unconditionally for every slug, with
   no TypeScript fallback on error. `FloatingCards.tsx`'s parallel `artistsBySlug`
   fallback for Similar Artist cards is gone the same way, since every similar-artist
   entry the run-scoped API returns already carries its own image/genres.

   Two consumers were never TS-fallback-gated in the first place and needed real
   restructuring rather than a deleted `else` branch. `scheduleStore.ts`'s
   `deriveScheduleState()` enumerated the full artist roster from `allArtists`
   unconditionally for conflict/scheduled-state derivation; `getConflictingArtists`,
   `getScheduledArtistSlugs`, and `getConflictingArtistSlugs` (`app/lib/schedule.ts`)
   now iterate `runAppearancesStore`'s own `appearancesBySlug` map directly, building
   each artist's appearance data via the already-exported `mapFestivalAppearance`
   rather than constructing an intermediate `RunArtist[]` first. `credits/page.tsx`
   read `allArtists` unconditionally for `imageCredit` and was a Server Component;
   it's now a Client Component reading `runAppearancesStore` like every other
   consumer. No backend change was needed for Credits — `imageCredit` was already
   flowing end-to-end through `FestivalRunArtistRead`'s existing `image` field, the
   page just wasn't wired to consume it.

   Removing the TS fallback means an API failure is now a real, visitor-facing
   failure for the first time (previously masked by the silent TypeScript fallback —
   see ADR-0009). Two structurally different failure modes were designed for and
   built, documented in full in **ADR-0010**: Artist Detail's own per-slug fetch
   failure now propagates to a new `app/artist/[slug]/error.tsx` Next.js error
   boundary (using 16.2's `unstable_retry`) instead of being silently caught; the
   shared appearances fetch never loading is now surfaced by a new
   `AppearancesUnavailable` component (named after this codebase's established
   "appearances" domain term, per ADR-0006 — not "catalog"), rendered by Explore,
   Planner, Quick Picks' `StartScreen`, and Credits before their normal empty-state
   logic.

   `app/lib/verify-story-signals.ts` was deliberately left unchanged: it filters the
   real 171-artist dataset across 60+ real-data assertions (city/country/billing-tier/
   day distributions), not a couple of mock fixtures, so removing its `allArtists`
   dependency would mean fetching live API data at verify-time rather than a type
   swap — a real scope addition, deferred alongside the eventual TS-file-deletion
   work. `scripts/export-artist-data.ts` is unaffected by design — it's the backend's
   authoring/import ingestion path, not a frontend runtime consumer (see the "Next"
   section).

   Verified: `npx tsc --noEmit` clean; manual pass across Explore, Planner, Quick
   Picks, Festival Story, Artist Detail, and Credits against a local backend; a
   forced-failure test (`FESTFUSE_API_BASE_URL` pointed at an unreachable host)
   confirmed both new failure-mode UI paths render instead of a crash or blank page —
   a class of behavior that was structurally unreachable before this step.

   `resolveCanonicalAppearanceId`'s (`app/store/runAppearancesStore.ts`) TS-vs-database
   id-space disambiguation branch was deliberately left in place, not simplified, even
   though every remaining `getAppearanceKey` caller now provably passes a real
   database id — see the comment there. Simplifying it touches DEVAULT's
   already-fixed multi-appearance conflict-detection behavior (see ADR-0006) and
   wasn't verifiable against a live backend in this pass; left as a deliberate,
   disclosed follow-up rather than an unverified simplification.

## Guardrails

- Do not point a deployed frontend at a local API or database.
- Do not expose draft artists through public endpoints.
- Do not make production depend on the API before preview parity is verified.
- Do not treat pgAdmin edits as a repeatable data workflow.
- Do not run schema migrations on ordinary user requests.
- Keep migrations, bootstrap commands, required environment variables, and
  verification commands documented before calling the backend reproducible.
- Do not assume `.env.local` points at a local backend. It points at the hosted
  Railway API by default. Testing an endpoint that isn't deployed yet requires an
  explicit local override, not just a running local server, see
  [`local-development.md`](../operations/local-development.md).
