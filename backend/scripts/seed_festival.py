from datetime import date

from sqlalchemy import select

from app.database import SessionLocal
from app.models import FestivalSeries, FestivalEdition, FestivalRun, FestivalDay


FESTIVAL_SERIES_SLUG = "lollapalooza-chicago"
FESTIVAL_SLUG = "lollapalooza-2026"


def seed_festival() -> None:
    with SessionLocal() as session:
        existing_festival = session.scalar(
            select(FestivalEdition).where(FestivalEdition.slug == FESTIVAL_SLUG)
        )

        if existing_festival is not None:
            print(f"{FESTIVAL_SLUG} is already seeded.")
            return

        festival_series = session.scalar(
            select(FestivalSeries).where(
                FestivalSeries.slug == FESTIVAL_SERIES_SLUG
            )
        )

        if festival_series is None:
            festival_series = FestivalSeries(
                slug=FESTIVAL_SERIES_SLUG,
                name="Lollapalooza Chicago",
            )

        festival = FestivalEdition(
            festival_series=festival_series,
            slug=FESTIVAL_SLUG,
            name="Lollapalooza 2026",
            year=2026,
            city="Chicago",
            state="Illinois",
            country="United States",
            timezone="America/Chicago",
        )

        festival_run = FestivalRun(
            slug="main",
            name="Main Run",
            display_order=1,
            days=[
                FestivalDay(
                    date=date(2026, 7, 30),
                    display_order=1,
                ),
                FestivalDay(
                    date=date(2026, 7, 31),
                    display_order=2,
                ),
                FestivalDay(
                    date=date(2026, 8, 1),
                    display_order=3,
                ),
                FestivalDay(
                    date=date(2026, 8, 2),
                    display_order=4,
                ),
            ],
        )

        festival.runs.append(festival_run)

        session.add(festival)
        session.commit()

        print(f"Seeded {festival.name} with {len(festival_run.days)} days.")


if __name__ == "__main__":
    seed_festival()
