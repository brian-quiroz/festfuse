from datetime import date as DateValue

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
