"""Lollapalooza 2026 — the single-run flagship edition.

The series slug carries a city suffix (``lollapalooza-chicago``) because Lollapalooza
runs as a separate series in several cities; the suffix keeps those series distinct.

Rebuild-critical: this mirrors rows that already exist in the local and hosted
databases and that a from-empty rebuild recreates. The slugs, names, dates, and
display orders match those rows exactly so ``seed_festivals`` finds every existing row
and inserts nothing for this edition. If a live row ever disagrees with this file, the
live database wins — reconcile this file to it, do not "correct" the database.
"""

from __future__ import annotations

from datetime import date

from ._types import EditionConfig, RunConfig, StageConfig

LOLLAPALOOZA_2026 = EditionConfig(
    series_slug="lollapalooza-chicago",
    series_name="Lollapalooza Chicago",
    slug="lollapalooza-2026",
    name="Lollapalooza 2026",
    year=2026,
    city="Chicago",
    state="Illinois",
    country="United States",
    timezone="America/Chicago",
    runs=(
        RunConfig(
            slug="main",
            name="Main Run",
            display_order=1,
            day_dates=(
                date(2026, 7, 30),
                date(2026, 7, 31),
                date(2026, 8, 1),
                date(2026, 8, 2),
            ),
        ),
    ),
    stages=(
        StageConfig(slug="t-mobile", name="T-Mobile", display_order=1),
        StageConfig(slug="perry-s", name="Perry's", display_order=2),
        StageConfig(slug="allianz", name="Allianz", display_order=3),
        StageConfig(slug="bmi", name="BMI", display_order=4),
        StageConfig(slug="airbnb", name="Airbnb", display_order=5),
        StageConfig(slug="tito-s", name="Tito's", display_order=6),
        StageConfig(slug="bud-light", name="Bud Light", display_order=7),
    ),
)
