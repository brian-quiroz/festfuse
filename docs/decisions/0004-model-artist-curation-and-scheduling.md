# ADR-0004: Model artist curation, lineup membership, and scheduled appearances

- Status: Accepted
- Recorded: 2026-08-23

## Context

FestFuse's TypeScript Artist objects combine canonical identity, editorial content,
media, taxonomy assignments, festival membership, and scheduled performances. Moving
that data into PostgreSQL requires separating reusable entities from ordered
relationships without forcing temporary curation states to satisfy publication
completeness.

Festival lineups are commonly announced before schedules. ACL runs can have different
lineups, and schedules can later move, shorten, add, withdraw, or cancel sets. Similar
Artist recommendations are editorial, directional, and valid only within the exact
announced run lineup. Writes may come through FastAPI, import scripts, migrations, raw
SQL, or pgAdmin, so critical invalidation cannot depend on one application code path.

## Decision

- Store Artist as a globally reusable entity with draft/published state, editorial
  content, image metadata, supported social links, and field-specific verification.
- Store GenreFamily and Genre as canonical taxonomy entities. ArtistGenre is an
  ordered association with an explicit primary flag and positions bounded to 1–3.
- Store Track canonically by Spotify track ID. ArtistTrackSelection carries explicit
  Quick Picks and ordered Listen First roles; important meaning is not inferred only
  from array position.
- Store repeatable ArtistVideo rows with featured, display-order, availability, and
  external-publication metadata.
- Store one SimilarArtistSet per source Artist and FestivalRun. SimilarArtist entries
  are directional, ordered 1–4, and reference canonical target Artists.
- Curate Similar Artist sets only from published Artists with announced membership in
  the exact run. Public reads expose a verified set only when all four targets remain
  published and eligible; they never shrink a reviewed set through partial filtering.
- Store FestivalRun membership as LineupEntry independently of scheduling. Store each
  scheduled performance as an Appearance referencing its LineupEntry, FestivalDay,
  and edition-owned Stage.
- Enforce same-row structure, foreign keys, bounded positions, scoped uniqueness, and
  at-most-one roles in PostgreSQL. Enforce publication completeness and cross-table
  context such as same-run eligibility in backend/import validation.
- Use migration-owned PostgreSQL triggers to clear About/social verification after
  source changes, SimilarArtistSet verification after entry changes, and affected
  recommendation verification when announced lineup membership departs.
- Restrict deletion of an Artist referenced as a Similar Artist target. The curated
  entry must be deliberately removed or replaced first.
- Use deferrable, initially deferred `NO ACTION` for Appearance references to
  FestivalDay and Stage. This preserves direct-delete protection while allowing a
  complete FestivalRun or FestivalEdition cascade to converge before commit.
- Use the auto-generated Appearance primary key as its sole persisted and API-visible
  identity for the current product. Do not maintain a parallel public identifier
  without a concrete cross-rebuild or externally addressable identity requirement.
- Keep all new domain timestamps database-owned through the existing shared
  `updated_at` trigger function.

## Consequences

- Lineups can exist before schedules and retain real withdrawals without deleting
  their history.
- Multiple non-overlapping appearances for one Artist remain representable.
- Draft curation can be incomplete, while backend publication/review transitions own
  exact cardinality and contextual readiness.
- Recommendation verification cannot silently survive a changed entry or departed
  lineup member, including writes outside FastAPI.
- A target becoming unpublished hides the complete recommendation set without
  clearing its editorial verification. Republishing may restore the unchanged set.
- Deleting an aggregate and deleting one referenced schedule parent intentionally
  have different outcomes. PostgreSQL integration tests must preserve this behavior.
- The model introduces more relationship tables and explicit administrative states,
  but avoids denormalized Artist copies and schedule-dependent lineup identity.
- Schedule corrections preserve an Appearance primary key. A deliberately destructive
  database rebuild may not; frontend cutover or such a rebuild may require a one-time
  saved-schedule reset or migration.
- The frontend TypeScript dataset remains the runtime source until an isolated,
  transactional importer and API-parity work are complete.

## Alternatives considered

- **Copy the TypeScript Artist shape into one wide table with arrays/JSON.** Rejected
  because genres, tracks, recommendations, lineup membership, and appearances have
  independent identity, constraints, and query behavior.
- **Create Appearance immediately for every announced act.** Rejected because lineup
  announcement commonly precedes schedule publication.
- **Scope recommendations to FestivalEdition.** Rejected because ACL-style runs may
  have different eligible lineups.
- **Cascade deletion of Similar Artist targets.** Rejected because silently shrinking
  an approved set destroys editorial intent.
- **Expose whichever targets remain published.** Rejected because returning one to
  three entries changes a reviewed four-item collection and its UI contract.
- **Clear recommendation verification when a target becomes unpublished.** Rejected
  because publication availability does not make the unchanged editorial judgment
  incorrect; the public read gate is sufficient.
- **Use immediate `RESTRICT` for Appearance-to-Day/Stage.** Rejected after PostgreSQL
  tests showed it blocks valid Run and Edition aggregate deletion through converging
  cascades.
- **Persist the legacy per-Artist Appearance ID beside the primary key.** Deferred
  because it is only locally scoped, duplicates operational identity, and introduces
  drift risk. Reconsider an immutable public ID if appearances need stable identity
  across destructive rebuilds, environments, or external links.
- **Put every rule in PostgreSQL.** Rejected for contextual completeness and lifecycle
  rules that require multi-row product meaning and clearer application errors.

## Follow-up (2026-08-25)

The Appearance primary key now resolves correctly end to end. A new
`GET /festivals/{edition}/runs/{run}/appearances` endpoint and frontend
`runAppearancesStore` give every scheduling call site (Artist Detail, Explore,
Planner) one canonical source for an artist's `Appearance.id`, regardless of which
data source populated the calling component's artist/appearance objects. The
deferred parallel-legacy-ID alternative remains correctly rejected; no second
identifier was introduced.

The anticipated "one-time saved-schedule reset" did not require a persisted-key
rename or migration function. Stale `localStorage` schedule keys are cleared
manually — the product has no real user data yet to migrate.

The new endpoint, query, and store are named "appearances" throughout
(`read_festival_run_appearances`, `FestivalRunAppearanceRead`,
`runAppearancesStore`), not "lineup" — `LineupEntry` already means booking/
membership, independent of schedule — or "catalog", a transient planning term
that was never adopted.

`read_festival_run_appearances` excludes cancelled appearances, unlike
`read_festival_artist_by_slug`. No scheduling surface renders cancellation state
yet; widen this filter together with adding a status field to
`FestivalRunAppearanceRead` once that UI exists.

Planner now reads its per-appearance display data (day, date, start/end time, stage)
from `runAppearancesStore` rather than only its `Appearance.id`. This surfaced the gap
`resolveCanonicalAppearanceId`'s comment already flagged as a "Known Phase 1
limitation": TS-shaped and API-shaped callers now hand it different id spaces for
DEVAULT (the one multi-appearance Artist), so scheduling from one surface didn't show
as scheduled on another. `resolveCanonicalAppearanceId` now disambiguates a
multi-candidate Artist by matching `day`/`startTime` against each candidate, rather
than trusting whichever id space the caller happened to pass — safe, not probabilistic,
since one Artist can't play two overlapping sets. Remains explicitly transitional: it
goes away, alongside the id-space split itself, once every consumer sources
appearances from the API and always passes real database ids (step 7 item 7).

## References

- [Artist and festival data-model design](../design/artist-data-model.md)
- [ADR-0003](0003-separate-festival-series-and-editions.md)
- [Artist-domain migration](../../backend/migrations/versions/7cee3ac4be86_add_artist_domain_schema.py)
- [PostgreSQL integration tests](../../backend/tests/integration/test_artist_schema.py)
