# ADR-0002: Model festival editions with runs and days

- Status: Superseded by [ADR-0003](0003-separate-festival-series-and-editions.md)
- Recorded: 2026-08-23

## Context

A single `starts_on`/`ends_on` range assumes that a festival operates on every date
inside the interval. That does not represent editions with non-contiguous dates.
It also cannot distinguish multi-run festivals where each weekend may have a
different lineup or schedule, such as Austin City Limits.

The existing frontend appearance model already treats performances as
festival-scoped events. The database model must preserve that distinction while
providing an unambiguous calendar date for every eventual appearance.

## Decision

Use the following ownership hierarchy:

```text
Festival
└── FestivalRun
    └── FestivalDay
        └── Appearance (planned)
```

- `Festival` represents a dated edition, identified publicly by a unique slug such
  as `lollapalooza-2026`.
- `FestivalRun` represents a distinct lineup/schedule variant within the edition.
  Run slugs are unique within their festival, not globally.
- `FestivalDay` stores one actual calendar date within a run. A date cannot appear
  twice in the same run.
- Weekday names are derived from the calendar date. The nullable day `label` is
  reserved for non-derivable editorial language, not values such as "Thursday."
- Edition start/end dates are derived from its festival days rather than persisted
  redundantly.
- Future artist appearances will reference `FestivalDay`; the day connects them to
  the correct run and festival edition.

Use database foreign keys with cascading deletes and matching SQLAlchemy ownership
cascades. Deleting an edition therefore removes its owned runs and days, while the
database prevents child records from referencing missing parents.

## Consequences

- Non-contiguous dates and multi-weekend editions are represented without false
  intermediate festival days.
- ACL-style weekends can hold different appearances while remaining part of one
  edition.
- Single-run festivals require a run record (for example, `main`) even when users do
  not need to see that grouping in the UI.
- Accessing an appearance's edition requires following relationships through its
  day and run, adding joins compared with a flat festival ID on every record.
- Python relationship collections such as `festival.runs` and `run.days` are ORM
  views over foreign-key rows, not array columns in PostgreSQL.

## Alternatives considered

- **Store `starts_on` and `ends_on` on Festival.** Rejected as the authoritative
  schedule representation because the range implies contiguous active dates.
- **Store an array of dates on Festival.** Rejected because individual days need
  identity, constraints, relationships to appearances, and potentially metadata of
  their own.
- **Model FestivalDay without FestivalRun.** Rejected because grouping days alone
  cannot represent weekend-specific lineup and schedule variants cleanly.
- **Store weekday and date together.** Rejected because weekday is derivable and can
  contradict the stored date.

## References

- [`Festival`](../../backend/app/models/festival.py)
- [`FestivalRun`](../../backend/app/models/festival_run.py)
- [`FestivalDay`](../../backend/app/models/festival_day.py)
- [Initial festival migration](../../backend/migrations/versions/555c13b3f93a_create_festival_tables.py)
