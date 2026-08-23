# ADR-0003: Separate recurring festival series from dated editions

- Status: Accepted
- Recorded: 2026-08-23
- Supersedes: [ADR-0002](0002-model-festival-runs-and-days.md)

## Context

The initial backend modeled `Festival` as one dated occurrence such as Lollapalooza
2026. Its unique slug, location, timezone, runs, and days all described that single
edition correctly, but the model had no stable parent for Lollapalooza Chicago across
2026, 2027, and later years.

Adding Artist, lineup, stage, appearance, and recommendation dependencies would make
introducing that distinction later more expensive. Multi-run behavior from ADR-0002
remains necessary: ACL weekends may have different lineups and schedules, and
FestivalDays must continue representing real, potentially non-contiguous dates.

## Decision

Use the following ownership hierarchy:

```text
FestivalSeries
└── FestivalEdition
    ├── FestivalRun
    │   ├── FestivalDay
    │   └── LineupEntry (planned)
    └── Stage (planned)
```

- `FestivalSeries` represents a recurring event in one market, such as Lollapalooza
  Chicago. Other markets such as Lollapalooza Chile remain separate series. A global
  festival-brand layer is not introduced without a concrete cross-market feature.
- `FestivalEdition` represents one dated occurrence. It owns the globally unique
  public slug, edition name, year, historical location, and IANA timezone.
- `FestivalRun` represents one lineup/schedule variant within an edition. Its foreign
  key is explicitly named `festival_edition_id`; run slugs remain unique within an
  edition.
- `FestivalDay` stores one real calendar date within a run. Dates remain unique within
  that run, weekday names remain derived, and optional labels remain reserved for
  non-derivable editorial language.
- Stage identity belongs to FestivalEdition rather than FestivalRun so all runs may
  share the edition's stage catalog without forcing every stage to appear in every
  run.
- Edition start/end dates remain derived from FestivalDays rather than redundantly
  persisted.
- Internal tables and foreign keys use explicit `festival_series_id` and
  `festival_edition_id` names. Public routes may continue using
  `/api/v1/festivals/{edition_slug}`.
- FestivalSeries, FestivalEdition, FestivalRun, and FestivalDay receive
  database-owned `created_at` and `updated_at` timestamps. PostgreSQL supplies initial
  values and refreshes `updated_at` through the shared trigger policy recorded in the
  accepted data-model design.

Apply this as a forward Alembic migration. Do not rewrite the already-committed
initial festival migration: schema history must show both the original model and its
intentional evolution.

## Consequences

- Multiple annual editions share a stable recurring-series identity.
- Historical edition location and timezone remain unchanged if a later edition
  moves or changes configuration.
- ACL-style runs retain distinct lineup and schedule ownership within one edition.
- Existing SQLAlchemy relationships, seeds, tests, and Pydantic schemas must rename
  the current `Festival` concept to `FestivalEdition` and add FestivalSeries.
- Existing festival API routes can remain stable, but their response model may expose
  series information when a consumer needs it.
- Explicit foreign-key names are longer but remove ambiguity about whether a record
  references the recurring series or a dated edition.
- Cross-market grouping under a single worldwide brand remains deliberately
  deferred.

## Alternatives considered

- **Keep `Festival` as the dated edition and add no recurring parent.** Rejected
  because annual editions are an intended near-term feature and this is the cheapest
  point to establish their stable parent.
- **Call every edition foreign key `festival_id`.** Mechanically valid but rejected
  because the new hierarchy gives “festival” two plausible meanings and makes joins,
  migrations, and reviews easier to misread.
- **Treat all worldwide Lollapalooza events as one FestivalSeries.** Deferred because
  Chicago, Chile, and Brazil are distinct recurring markets. A separate FestivalBrand
  layer can be introduced if cross-market product behavior eventually requires it.
- **Remove FestivalRun and attach days directly to editions.** Rejected for the same
  reason as ADR-0002: it cannot cleanly represent ACL-style weekends with different
  lineups and schedules.
- **Rewrite the initial migration.** Rejected because committed Alembic history should
  remain reproducible and explain how the schema evolved.

## References

- [Superseded ADR-0002](0002-model-festival-runs-and-days.md)
- [Artist and festival data-model design](../design/artist-data-model.md)
- [`Festival`](../../backend/app/models/festival.py)
- [`FestivalRun`](../../backend/app/models/festival_run.py)
- [`FestivalDay`](../../backend/app/models/festival_day.py)
- [Initial festival migration](../../backend/migrations/versions/555c13b3f93a_create_festival_tables.py)
