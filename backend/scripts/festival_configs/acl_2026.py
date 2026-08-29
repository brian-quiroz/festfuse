"""Austin City Limits 2026 — one edition, two weekend runs.

The stage set is identical across both weekends and all days.
"""

from __future__ import annotations

from datetime import date

from ._types import EditionConfig, RunConfig, StageConfig

_STAGES = (
    StageConfig(slug="t-mobile", name="T-Mobile", display_order=1),
    StageConfig(slug="miller-lite", name="Miller Lite", display_order=2),
    StageConfig(slug="bmi", name="BMI", display_order=3),
    StageConfig(slug="beatbox", name="Beatbox", display_order=4),
    StageConfig(slug="tito-s", name="Tito's", display_order=5),
    StageConfig(slug="snapchat", name="Snapchat", display_order=6),
    StageConfig(slug="american-express", name="American Express", display_order=7),
)

ACL_2026 = EditionConfig(
    series_slug="austin-city-limits",
    series_name="Austin City Limits",
    slug="acl-2026",
    name="Austin City Limits 2026",
    year=2026,
    city="Austin",
    state="Texas",
    country="United States",
    timezone="America/Chicago",
    runs=(
        RunConfig(
            slug="weekend-1",
            name="Weekend 1",
            display_order=1,
            day_dates=(
                date(2026, 10, 2),
                date(2026, 10, 3),
                date(2026, 10, 4),
            ),
        ),
        RunConfig(
            slug="weekend-2",
            name="Weekend 2",
            display_order=2,
            day_dates=(
                date(2026, 10, 9),
                date(2026, 10, 10),
                date(2026, 10, 11),
            ),
        ),
    ),
    stages=_STAGES,
)
