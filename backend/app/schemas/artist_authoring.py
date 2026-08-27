"""Strict input schema for the direct-to-PostgreSQL artist authoring workflow.

Only fields that map to a stored column or relationship are accepted. Legacy
TypeScript-only fields (``tagline``, ``whySee``, ``whatToExpect``, ``bestFor``, track
``album`` / ``duration`` / ``artworkUrl``, appearance ``id`` / ``festivalId``) are
rejected, not ignored — reviving any of them is a new column plus a ``schemaVersion``
bump. See ADR-0011.

Field names mirror the ``npm run export:artists`` shape (camelCase) so an authoring
file can be started by copying one artist from that output. Cross-row checks that need
the database (genre exists, similar target exists, edition/run/stage/day resolve) live
in ``app.services.artist_authoring``, not here.
"""

import re
from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, field_validator, model_validator
from pydantic.alias_generators import to_camel

from app.lib.artist_source import (
    BILLING_TIERS,
    MBID_PATTERN,
    SLUG_PATTERN,
    parse_focal_y,
    parse_spotify_artist_id,
    valid_url,
)

SPOTIFY_TRACK_ID_PATTERN = re.compile(r"^[A-Za-z0-9]{22}$")
_SOURCE_TIME_FORMAT = "%I:%M %p"
# Leap year so "Feb 29" validates; the real year comes from the edition at build time.
_SHAPE_CHECK_YEAR = 2000


class _AuthoringModel(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        extra="forbid",
        str_strip_whitespace=True,
    )


class ImageCreditInput(_AuthoringModel):
    author: str
    source_url: str
    license_url: str

    @field_validator("source_url", "license_url")
    @classmethod
    def _url_shape(cls, value: str) -> str:
        if not valid_url(value):
            raise ValueError("must be an http(s) URL")
        return value


class LocationInput(_AuthoringModel):
    city: str
    state: str | None = None
    country: str


class SocialsInput(_AuthoringModel):
    spotify: str | None = None
    youtube: str | None = None
    tiktok: str | None = None

    @field_validator("youtube", "tiktok")
    @classmethod
    def _url_shape(cls, value: str | None) -> str | None:
        if value is not None and not valid_url(value):
            raise ValueError("must be an http(s) URL")
        return value

    @field_validator("spotify")
    @classmethod
    def _spotify_artist_url(cls, value: str | None) -> str | None:
        if value is not None:
            parse_spotify_artist_id(value)  # raises ValueError on a bad shape
        return value


class TrackInput(_AuthoringModel):
    spotify_id: str
    name: str

    @field_validator("spotify_id")
    @classmethod
    def _track_id_shape(cls, value: str) -> str:
        if not SPOTIFY_TRACK_ID_PATTERN.fullmatch(value):
            raise ValueError("must be a 22-character Spotify track id")
        return value


class ListenFirstInput(_AuthoringModel):
    mode: Literal["tracks"]
    note: str | None = None


class SimilarArtistInput(_AuthoringModel):
    slug: str
    name: str | None = None

    @field_validator("slug")
    @classmethod
    def _slug_shape(cls, value: str) -> str:
        if not SLUG_PATTERN.fullmatch(value):
            raise ValueError("not a valid slug")
        return value


class AppearanceInput(_AuthoringModel):
    stage: str
    day: str
    date: str
    start_time: str
    end_time: str
    billing_tier: str | None = None

    @field_validator("date")
    @classmethod
    def _date_shape(cls, value: str) -> str:
        try:
            datetime.strptime(f"{value} {_SHAPE_CHECK_YEAR}", "%b %d %Y")
        except ValueError as error:
            raise ValueError("expected a 'Mon DD' date, e.g. 'Jul 30'") from error
        return value

    @field_validator("start_time", "end_time")
    @classmethod
    def _time_shape(cls, value: str) -> str:
        try:
            datetime.strptime(value, _SOURCE_TIME_FORMAT)
        except ValueError as error:
            raise ValueError("expected a 'H:MM AM/PM' time, e.g. '8:30 PM'") from error
        return value

    @field_validator("billing_tier")
    @classmethod
    def _billing_tier_known(cls, value: str | None) -> str | None:
        if value is not None and value not in BILLING_TIERS:
            raise ValueError(f"unsupported billing tier {value!r}")
        return value


class ArtistAuthoringArtist(_AuthoringModel):
    name: str
    slug: str
    mbid: str | None = None
    image_url: str | None = None
    image_verified: bool | None = None
    image_credit: ImageCreditInput | None = None
    object_position: str | None = None
    live_video_id: str | None = None
    live_video_label: str | None = None
    genres: list[str] = []
    location: LocationInput | None = None
    socials: SocialsInput = SocialsInput()
    socials_verified: bool | None = None
    about: str | None = None
    about_verified: bool | None = None
    tracks: list[TrackInput] = []
    listen_first: ListenFirstInput | None = None
    similar_artists: list[SimilarArtistInput] = []
    similar_artists_verified: bool | None = None
    appearances: list[AppearanceInput] = []

    @field_validator("slug")
    @classmethod
    def _slug_shape(cls, value: str) -> str:
        if not SLUG_PATTERN.fullmatch(value):
            raise ValueError("not a valid slug")
        return value

    @field_validator("mbid")
    @classmethod
    def _mbid_shape(cls, value: str | None) -> str | None:
        if value is not None and not MBID_PATTERN.fullmatch(value):
            raise ValueError("not a canonical lowercase UUID")
        return value

    @field_validator("object_position")
    @classmethod
    def _focal_shape(cls, value: str | None) -> str | None:
        parse_focal_y(value)  # raises ValueError on a bad shape
        return value

    @field_validator("genres")
    @classmethod
    def _at_most_three_distinct_genres(cls, value: list[str]) -> list[str]:
        if len(value) > 3:
            raise ValueError("at most 3 genres")
        if len(set(value)) != len(value):
            raise ValueError("duplicate genre")
        return value

    @model_validator(mode="after")
    def _cross_field_rules(self) -> "ArtistAuthoringArtist":
        if self.image_credit is not None and not self.image_url:
            raise ValueError("imageCredit requires imageUrl")
        if self.live_video_id and not self.live_video_label:
            raise ValueError("liveVideoId requires liveVideoLabel")
        if self.location is not None:
            if self.location.state is not None and self.location.country != (
                "United States"
            ):
                raise ValueError("location.state is only valid for United States")

        # tracks[0] is the Quick Picks selection; when listenFirst is set the three
        # tracks are also the Listen First set. Extra tracks would never be stored.
        if self.listen_first is not None:
            if len(self.tracks) != 3:
                raise ValueError("listenFirst requires exactly 3 tracks")
        elif len(self.tracks) > 1:
            raise ValueError("without listenFirst, provide only the Quick Picks track")
        seen_track_ids = [track.spotify_id for track in self.tracks]
        if len(set(seen_track_ids)) != len(seen_track_ids):
            raise ValueError("duplicate track spotifyId")

        if self.similar_artists_verified:
            if len(self.similar_artists) not in (0, 4):
                raise ValueError("a verified similar-artist set has 0 or 4 entries")
            if any(entry.slug == self.slug for entry in self.similar_artists):
                raise ValueError("an artist cannot be similar to itself")
            slugs = [entry.slug for entry in self.similar_artists]
            if len(set(slugs)) != len(slugs):
                raise ValueError("duplicate similar-artist target")
        return self


class ArtistAuthoringInput(_AuthoringModel):
    schema_version: Literal[1]
    edition: str
    run: str
    # Run-level billing for this artist. Optional: supply it (with no appearances) for
    # an announced lineup entry whose schedule is not published yet; otherwise it is
    # derived from the appearances, and its absence means a draft lineup entry.
    billing_tier: str | None = None
    artist: ArtistAuthoringArtist

    @field_validator("billing_tier")
    @classmethod
    def _billing_tier_known(cls, value: str | None) -> str | None:
        if value is not None and value not in BILLING_TIERS:
            raise ValueError(f"unsupported billing tier {value!r}")
        return value
