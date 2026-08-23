from datetime import date as DateValue

from pydantic import BaseModel, ConfigDict


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
    days: list[FestivalDayRead]


class FestivalRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    name: str
    city: str
    state: str | None
    country: str
    timezone: str
    runs: list[FestivalRunRead]