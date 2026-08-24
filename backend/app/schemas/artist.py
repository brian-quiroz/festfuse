from datetime import date

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


class ArtistCoreRead(BaseModel):
    slug: str
    name: str
    spotify_artist_id: str | None
    image: ArtistImageRead | None
    location: ArtistLocationRead
    genres: list[ArtistGenreRead]
    quick_picks_track: ArtistTrackRead
    listen_first: ArtistListenFirstRead
