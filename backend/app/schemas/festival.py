from datetime import date as DateValue
from typing import Literal

from pydantic import BaseModel, ConfigDict


class FestivalSeriesRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    name: str


class FestivalDayRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    date: DateValue
    label: str | None
    display_order: int


class FestivalRunRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    name: str
    display_order: int
    # "scheduled" once the run has at least one scheduled Appearance on an announced,
    # published lineup entry (the same gate the /appearances feed applies); "announced"
    # while only the lineup exists. Derived at read time, never stored. See ADR-0016.
    schedule_state: Literal["announced", "scheduled"]
    days: list[FestivalDayRead]


class FestivalEditionRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    festival_series: FestivalSeriesRead
    slug: str
    name: str
    year: int
    city: str
    state: str | None
    country: str
    timezone: str
    runs: list[FestivalRunRead]
