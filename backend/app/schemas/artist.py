from datetime import date, datetime
from typing import Literal

from pydantic import BaseModel


class ArtistImageRead(BaseModel):
    url: str
    focal_y_percent: int | None
    credit_author: str | None
    source_url: str | None
    license_url: str | None
    taken_year: int | None
    sourced_at: date | None


class ArtistLocationRead(BaseModel):
    city: str
    state: str | None
    country: str


class ArtistGenreFamilyRead(BaseModel):
    slug: str
    name: str


class ArtistGenreRead(BaseModel):
    slug: str
    name: str
    is_primary: bool
    display_order: int
    family: ArtistGenreFamilyRead


class ArtistTrackRead(BaseModel):
    spotify_track_id: str
    name: str


class ArtistTrackSelectionRead(ArtistTrackRead):
    display_order: int


class ArtistListenFirstRead(BaseModel):
    note: str | None
    tracks: list[ArtistTrackSelectionRead]


class ArtistSocialsRead(BaseModel):
    spotify_url: str | None
    youtube_url: str | None
    tiktok_url: str | None


class ArtistVideoRead(BaseModel):
    youtube_video_id: str
    label: str


class ArtistCoreRead(BaseModel):
    slug: str
    name: str
    spotify_artist_id: str | None
    image: ArtistImageRead | None
    location: ArtistLocationRead
    genres: list[ArtistGenreRead]
    quick_picks_track: ArtistTrackRead
    listen_first: ArtistListenFirstRead
    about: str | None
    socials: ArtistSocialsRead
    featured_video: ArtistVideoRead | None


class FestivalArtistEditionRead(BaseModel):
    slug: str
    name: str
    timezone: str


class FestivalArtistRunRead(BaseModel):
    slug: str
    name: str


class FestivalArtistStageRead(BaseModel):
    slug: str
    name: str


class FestivalArtistAppearanceRead(BaseModel):
    id: int
    status: Literal["scheduled", "cancelled"]
    festival_date: date
    starts_at: datetime
    ends_at: datetime
    stage: FestivalArtistStageRead
    cancellation_reason: str | None


class FestivalSimilarArtistRead(BaseModel):
    slug: str
    name: str
    display_order: int
    image: ArtistImageRead | None
    genres: list[ArtistGenreRead]


class FestivalArtistContextRead(BaseModel):
    edition: FestivalArtistEditionRead
    run: FestivalArtistRunRead
    billing_tier: Literal["headliner", "sub_headliner", "undercard"]
    appearances: list[FestivalArtistAppearanceRead]
    similar_artists: list[FestivalSimilarArtistRead]


class FestivalArtistRead(BaseModel):
    artist: ArtistCoreRead
    festival_context: FestivalArtistContextRead


class FestivalRunArtistRead(BaseModel):
    slug: str
    name: str
    image: ArtistImageRead | None
    genres: list[ArtistGenreRead]


class FestivalRunAppearanceRead(BaseModel):
    id: int
    festival_date: date
    starts_at: datetime
    ends_at: datetime
    stage: FestivalArtistStageRead
    billing_tier: Literal["headliner", "sub_headliner", "undercard"]
    artist: FestivalRunArtistRead
