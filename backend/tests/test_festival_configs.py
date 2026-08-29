"""Fast, no-database coverage for the seed configs and the config -> ORM mapping.

Persistence and idempotency of seed_festivals are covered against real PostgreSQL in
integration/test_clean_bootstrap.py. These tests guard the hand-authored data in
scripts/festival_configs/ and the pure build_edition() seam.
"""

from datetime import date

import pytest

from scripts.festival_configs import FESTIVAL_CONFIGS
from scripts.festival_configs._types import EditionConfig
from scripts.festival_configs.lollapalooza_2026 import LOLLAPALOOZA_2026
from scripts.seed_festivals import build_edition

CONFIG_IDS = [config.slug for config in FESTIVAL_CONFIGS]


@pytest.fixture(params=FESTIVAL_CONFIGS, ids=CONFIG_IDS)
def config(request: pytest.FixtureRequest) -> EditionConfig:
    return request.param


def test_edition_slugs_are_unique_across_the_registry() -> None:
    slugs = [config.slug for config in FESTIVAL_CONFIGS]
    assert len(slugs) == len(set(slugs))


def test_runs_are_well_formed(config: EditionConfig) -> None:
    slugs = [run.slug for run in config.runs]
    assert slugs == sorted(set(slugs), key=slugs.index), "run slugs must be unique"
    orders = sorted(run.display_order for run in config.runs)
    assert orders == list(range(1, len(config.runs) + 1)), "run order must be 1..N"


def test_days_are_ascending_and_unique(config: EditionConfig) -> None:
    for run in config.runs:
        dates = list(run.day_dates)
        assert dates == sorted(dates), f"{config.slug}/{run.slug} days out of order"
        assert len(dates) == len(set(dates)), f"{config.slug}/{run.slug} duplicate day"
        assert all(isinstance(day, date) for day in dates)


def test_stages_are_well_formed(config: EditionConfig) -> None:
    slugs = [stage.slug for stage in config.stages]
    names = [stage.name for stage in config.stages]
    assert len(slugs) == len(set(slugs)), "stage slugs must be unique per edition"
    assert len(names) == len(set(names)), "stage names must be unique per edition"
    orders = sorted(stage.display_order for stage in config.stages)
    assert orders == list(range(1, len(config.stages) + 1)), "stage order must be 1..N"


def test_build_edition_maps_every_field(config: EditionConfig) -> None:
    edition = build_edition(config)

    assert edition.slug == config.slug
    assert edition.name == config.name
    assert edition.year == config.year
    assert edition.timezone == config.timezone
    assert edition.festival_series.slug == config.series_slug

    assert len(edition.runs) == len(config.runs)
    for run, run_config in zip(edition.runs, config.runs, strict=True):
        assert run.slug == run_config.slug
        assert run.display_order == run_config.display_order
        assert [day.date for day in run.days] == list(run_config.day_dates)
        assert [day.display_order for day in run.days] == list(
            range(1, len(run_config.day_dates) + 1)
        )

    assert [(s.slug, s.display_order) for s in edition.stages] == [
        (s.slug, s.display_order) for s in config.stages
    ]


def test_lollapalooza_config_matches_the_shipped_hierarchy() -> None:
    """Pin Lollapalooza 2026 to its shipped hierarchy — a guard on lollapalooza_2026.py."""
    edition = build_edition(LOLLAPALOOZA_2026)

    assert edition.festival_series.slug == "lollapalooza-chicago"
    assert edition.festival_series.name == "Lollapalooza Chicago"
    assert (edition.slug, edition.name, edition.year) == (
        "lollapalooza-2026",
        "Lollapalooza 2026",
        2026,
    )
    assert (edition.city, edition.state, edition.country, edition.timezone) == (
        "Chicago",
        "Illinois",
        "United States",
        "America/Chicago",
    )
    assert len(edition.runs) == 1
    run = edition.runs[0]
    assert (run.slug, run.name, run.display_order) == ("main", "Main Run", 1)
    assert [day.date for day in run.days] == [
        date(2026, 7, 30),
        date(2026, 7, 31),
        date(2026, 8, 1),
        date(2026, 8, 2),
    ]
