"""Seed the festival hierarchy (series, edition, runs, days, stages) from config.

Config-driven: each edition is an ``EditionConfig`` in ``scripts.festival_configs``.
Seeding is **insert-only and idempotent** — an entity that already exists is left
exactly as it is (never updated, never deleted), and only missing children are added,
so this is safe to run against an already-populated database.

Requires an explicit mode: ``--preview`` runs every get-or-create in a transaction and
rolls it back (persists nothing, surfaces database errors); ``--apply`` commits.
``--edition <slug>`` limits the run to one edition; the default seeds every configured
edition.
"""

from __future__ import annotations

import argparse
import sys

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import (
    FestivalDay,
    FestivalEdition,
    FestivalRun,
    FestivalSeries,
    Stage,
)
from scripts.festival_configs import FESTIVAL_CONFIGS
from scripts.festival_configs._types import EditionConfig


def build_edition(config: EditionConfig) -> FestivalEdition:
    """Turn a config into a detached ORM graph. No session, no persistence."""
    series = FestivalSeries(slug=config.series_slug, name=config.series_name)
    edition = FestivalEdition(
        festival_series=series,
        slug=config.slug,
        name=config.name,
        year=config.year,
        city=config.city,
        state=config.state,
        country=config.country,
        timezone=config.timezone,
    )
    for run_config in config.runs:
        run = FestivalRun(
            slug=run_config.slug,
            name=run_config.name,
            display_order=run_config.display_order,
            days=[
                FestivalDay(date=day_date, display_order=order)
                for order, day_date in enumerate(run_config.day_dates, start=1)
            ],
        )
        edition.runs.append(run)
    for stage_config in config.stages:
        edition.stages.append(
            Stage(
                slug=stage_config.slug,
                name=stage_config.name,
                display_order=stage_config.display_order,
            )
        )
    return edition


def seed_edition(session: Session, config: EditionConfig) -> list[str]:
    """Insert-only get-or-create for one edition. Returns a line per created row."""
    created: list[str] = []

    series = session.scalar(
        select(FestivalSeries).where(FestivalSeries.slug == config.series_slug)
    )
    if series is None:
        series = FestivalSeries(slug=config.series_slug, name=config.series_name)
        session.add(series)
        session.flush()
        created.append(f"series  {config.series_slug}")

    edition = session.scalar(
        select(FestivalEdition).where(FestivalEdition.slug == config.slug)
    )
    if edition is None:
        edition = FestivalEdition(
            festival_series_id=series.id,
            slug=config.slug,
            name=config.name,
            year=config.year,
            city=config.city,
            state=config.state,
            country=config.country,
            timezone=config.timezone,
        )
        session.add(edition)
        session.flush()
        created.append(f"edition {config.slug}")

    for run_config in config.runs:
        run = session.scalar(
            select(FestivalRun).where(
                FestivalRun.festival_edition_id == edition.id,
                FestivalRun.slug == run_config.slug,
            )
        )
        if run is None:
            run = FestivalRun(
                festival_edition_id=edition.id,
                slug=run_config.slug,
                name=run_config.name,
                display_order=run_config.display_order,
            )
            session.add(run)
            session.flush()
            created.append(f"run     {config.slug}/{run_config.slug}")

        for order, day_date in enumerate(run_config.day_dates, start=1):
            day = session.scalar(
                select(FestivalDay).where(
                    FestivalDay.festival_run_id == run.id,
                    FestivalDay.date == day_date,
                )
            )
            if day is None:
                session.add(
                    FestivalDay(
                        festival_run_id=run.id,
                        date=day_date,
                        display_order=order,
                    )
                )
                created.append(
                    f"day     {config.slug}/{run_config.slug} {day_date.isoformat()}"
                )

    for stage_config in config.stages:
        stage = session.scalar(
            select(Stage).where(
                Stage.festival_edition_id == edition.id,
                Stage.slug == stage_config.slug,
            )
        )
        if stage is None:
            session.add(
                Stage(
                    festival_edition_id=edition.id,
                    slug=stage_config.slug,
                    name=stage_config.name,
                    display_order=stage_config.display_order,
                )
            )
            created.append(f"stage   {config.slug}/{stage_config.slug}")

    session.flush()
    return created


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--edition",
        help="seed only the edition with this slug (default: every configured edition)",
    )
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument(
        "--preview",
        action="store_true",
        help="run every get-or-create in a transaction and roll it back",
    )
    mode.add_argument(
        "--apply", action="store_true", help="commit the seed in one transaction"
    )
    args = parser.parse_args()

    configs = FESTIVAL_CONFIGS
    if args.edition is not None:
        configs = tuple(c for c in configs if c.slug == args.edition)
        if not configs:
            print(f"No configured edition with slug {args.edition!r}.", file=sys.stderr)
            return 1

    with SessionLocal() as session:
        created: list[str] = []
        for config in configs:
            created.extend(seed_edition(session, config))

        if created:
            print("Would create:" if args.preview else "Created:")
            for line in created:
                print(f"  {line}")
        else:
            print("Nothing to create; every configured entity already exists.")

        if args.apply:
            session.commit()
            print(f"\nApplied. {len(created)} row(s) created.")
        else:
            session.rollback()
            print("\nPreview only; the transaction was rolled back, nothing persisted.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
