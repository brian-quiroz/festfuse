"""Typed, behaviour-free description of one festival edition's hierarchy.

A config is pure data: ``seed_festivals`` turns it into rows. Adding a festival is
adding one ``EditionConfig`` module and one line in ``__init__`` — never editing the
seed script.
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import date


@dataclass(frozen=True)
class StageConfig:
    slug: str
    name: str
    display_order: int


@dataclass(frozen=True)
class RunConfig:
    slug: str
    name: str
    display_order: int
    day_dates: tuple[date, ...]


@dataclass(frozen=True)
class EditionConfig:
    series_slug: str
    series_name: str
    slug: str
    name: str
    year: int
    city: str
    state: str | None
    country: str
    timezone: str
    runs: tuple[RunConfig, ...]
    stages: tuple[StageConfig, ...]
