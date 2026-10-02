"""Strict input schema for applying an official schedule change to a run's lineup.

A changeset is a list of operations against one edition, applied in order in one
transaction by ``app.services.schedule_change``. Appearances are identified by their
current natural key (run, artist slug, stage, date, start time) rather than a database
id, so the same file applies to any database holding the same schedule, and a stale or
already-applied file fails instead of silently re-applying. Times use the authoring
file vocabulary (``app/schemas/artist_authoring.py``) and the edition's own timezone.

An arriving artist is not an operation here: ``add_artist`` (new slug) or
``build_roster_payloads`` (existing slug) already creates the lineup entry with its
appearances. See ADR-0022.
"""

from typing import Annotated, Literal

from pydantic import Field, field_validator

from app.lib.artist_source import SLUG_PATTERN
from app.schemas.artist_authoring import (
    _AuthoringModel,
    validate_source_date,
    validate_source_time,
)


def _slug_shape(value: str) -> str:
    if not SLUG_PATTERN.fullmatch(value):
        raise ValueError("not a valid slug")
    return value


class CurrentSlotInput(_AuthoringModel):
    """Where the appearance is now; must match exactly one scheduled appearance."""

    stage: str
    date: str
    start_time: str

    @field_validator("date")
    @classmethod
    def _date_shape(cls, value: str) -> str:
        return validate_source_date(value)

    @field_validator("start_time")
    @classmethod
    def _time_shape(cls, value: str) -> str:
        return validate_source_time(value)


class NewSlotInput(_AuthoringModel):
    """Where the appearance moves to, on the same date. Every field is explicit, so a
    preview always shows the complete resulting slot."""

    stage: str
    start_time: str
    end_time: str

    @field_validator("start_time", "end_time")
    @classmethod
    def _time_shape(cls, value: str) -> str:
        return validate_source_time(value)


class MoveAppearanceChange(_AuthoringModel):
    op: Literal["move"]
    run: str
    slug: str
    before: CurrentSlotInput
    after: NewSlotInput

    @field_validator("slug")
    @classmethod
    def _slug(cls, value: str) -> str:
        return _slug_shape(value)


class WithdrawLineupChange(_AuthoringModel):
    """The artist leaves this run's lineup; their appearances are retained."""

    op: Literal["withdraw"]
    run: str
    slug: str

    @field_validator("slug")
    @classmethod
    def _slug(cls, value: str) -> str:
        return _slug_shape(value)


ScheduleChange = Annotated[
    MoveAppearanceChange | WithdrawLineupChange,
    Field(discriminator="op"),
]


class ScheduleChangeInput(_AuthoringModel):
    schema_version: Literal[1]
    edition: str
    changes: list[ScheduleChange] = Field(min_length=1)
