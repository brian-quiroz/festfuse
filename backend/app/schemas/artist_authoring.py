"""Strict input schema for the direct-to-PostgreSQL artist authoring workflow.

Only fields that map to a stored column or relationship are accepted. Legacy
TypeScript-only fields (``tagline``, ``whySee``, ``whatToExpect``, ``bestFor``, track
``album`` / ``duration`` / ``artworkUrl``, appearance ``id`` / ``festivalId``) are
rejected, not ignored — reviving any of them is a new column plus a ``schemaVersion``
bump. See ADR-0011.

Field names are camelCase, matching the frontend ``Artist`` type shape
(``app/types/artist.ts``) and the archived provenance snapshot
(``provenance/artists-lollapalooza-2026.json``), so an authoring file can be started by
copying one artist from either. Cross-row checks that need the database (genre exists,
similar target exists, edition/run/stage/day resolve) live in
``app.services.artist_authoring``, not here.
"""

import re
from datetime import UTC, date, datetime
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
_OLDEST_PLAUSIBLE_PHOTO_YEAR = 1900


def _validate_image_taken_year(value: int | None) -> int | None:
    """A plausible photograph year: not before photography, not in the future. A
    dynamic check rather than a database constraint tied to the calendar (see
    docs/design/artist-data-model.md)."""
    if value is not None:
        current_year = datetime.now(UTC).year
        if not _OLDEST_PLAUSIBLE_PHOTO_YEAR <= value <= current_year:
            raise ValueError(
                f"imageTakenYear must be between {_OLDEST_PLAUSIBLE_PHOTO_YEAR} "
                f"and {current_year}"
            )
    return value


def _validate_image_sourced_at(value: date | None) -> date | None:
    if value is not None and value > datetime.now(UTC).date():
        raise ValueError("imageSourcedAt cannot be in the future")
    return value


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
    image_taken_year: int | None = None
    image_sourced_at: date | None = None
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

    @field_validator("image_taken_year")
    @classmethod
    def _taken_year(cls, value: int | None) -> int | None:
        return _validate_image_taken_year(value)

    @field_validator("image_sourced_at")
    @classmethod
    def _sourced_at(cls, value: date | None) -> date | None:
        return _validate_image_sourced_at(value)

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
        if self.image_url and not self.image_verified:
            raise ValueError("imageUrl requires imageVerified: true")
        if (
            self.object_position
            or self.image_taken_year is not None
            or self.image_sourced_at is not None
        ) and not self.image_url:
            raise ValueError("image metadata requires imageUrl")
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


class ArtistEditFields(_AuthoringModel):
    """A patch over one existing artist. Every field is optional; ``model_fields_set``
    tells "not provided" (leave the column alone) from an explicit ``null`` (clear it).
    Set-valued fields (``genres``, ``tracks`` + ``listenFirst``, ``similarArtists``) are
    replaced wholesale, not merged. See ADR-0012.
    """

    name: str | None = None
    slug: str | None = None
    mbid: str | None = None
    image_url: str | None = None
    image_verified: bool | None = None
    image_credit: ImageCreditInput | None = None
    object_position: str | None = None
    image_taken_year: int | None = None
    image_sourced_at: date | None = None
    live_video_id: str | None = None
    live_video_label: str | None = None
    socials: SocialsInput | None = None
    socials_verified: bool | None = None
    about: str | None = None
    about_verified: bool | None = None
    location: LocationInput | None = None
    genres: list[str] | None = None
    tracks: list[TrackInput] | None = None
    listen_first: ListenFirstInput | None = None
    similar_artists: list[SimilarArtistInput] | None = None
    similar_artists_verified: bool | None = None

    @field_validator("slug")
    @classmethod
    def _slug_shape(cls, value: str | None) -> str | None:
        if value is not None and not SLUG_PATTERN.fullmatch(value):
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

    @field_validator("image_taken_year")
    @classmethod
    def _taken_year(cls, value: int | None) -> int | None:
        return _validate_image_taken_year(value)

    @field_validator("image_sourced_at")
    @classmethod
    def _sourced_at(cls, value: date | None) -> date | None:
        return _validate_image_sourced_at(value)

    @field_validator("genres")
    @classmethod
    def _genre_set_shape(cls, value: list[str] | None) -> list[str] | None:
        if value is None:
            return value
        if len(value) > 3:
            raise ValueError("at most 3 genres")
        if len(set(value)) != len(value):
            raise ValueError("duplicate genre")
        return value

    @model_validator(mode="after")
    def _cross_field_rules(self) -> "ArtistEditFields":
        provided = self.model_fields_set
        if "name" in provided and self.name is None:
            raise ValueError("name cannot be cleared")
        if "slug" in provided and self.slug is None:
            raise ValueError("slug cannot be cleared")

        if "about" in provided and self.about is None and self.about_verified:
            raise ValueError("cannot set aboutVerified when about is cleared")

        if self.image_url and not self.image_verified:
            raise ValueError("imageUrl requires imageVerified: true")
        if (
            self.image_credit is not None
            or self.object_position is not None
            or self.image_taken_year is not None
            or self.image_sourced_at is not None
        ) and not self.image_url:
            raise ValueError("image metadata requires imageUrl")

        if "live_video_label" in provided and "live_video_id" not in provided:
            raise ValueError("liveVideoLabel requires liveVideoId in the same patch")
        if self.live_video_id and not self.live_video_label:
            raise ValueError("liveVideoId requires liveVideoLabel")

        if "listen_first" in provided and "tracks" not in provided:
            raise ValueError("listenFirst can only be set together with tracks")
        if "listen_first" in provided and self.listen_first is not None:
            if self.tracks is None or len(self.tracks) != 3:
                raise ValueError("listenFirst requires exactly 3 tracks")
        elif self.tracks is not None and len(self.tracks) > 1:
            raise ValueError("without listenFirst, provide only the Quick Picks track")
        if self.tracks:
            track_ids = [track.spotify_id for track in self.tracks]
            if len(set(track_ids)) != len(track_ids):
                raise ValueError("duplicate track spotifyId")

        if self.similar_artists is not None and len(self.similar_artists) > 4:
            raise ValueError("at most 4 similar artists")
        if self.similar_artists_verified:
            if self.similar_artists is None or len(self.similar_artists) not in (0, 4):
                raise ValueError("a verified similar-artist set has 0 or 4 entries")
        if self.similar_artists:
            slugs = [entry.slug for entry in self.similar_artists]
            if len(set(slugs)) != len(slugs):
                raise ValueError("duplicate similar-artist target")
        return self


class ArtistEditInput(_AuthoringModel):
    schema_version: Literal[1]
    edition: str
    run: str
    slug: str  # identifies the target artist; a slug inside `artist` is a rename
    artist: ArtistEditFields

    @field_validator("slug")
    @classmethod
    def _slug_shape(cls, value: str) -> str:
        if not SLUG_PATTERN.fullmatch(value):
            raise ValueError("not a valid slug")
        return value

    @model_validator(mode="after")
    def _no_self_reference(self) -> "ArtistEditInput":
        if not self.artist.similar_artists:
            return self
        identities = {self.slug}
        if self.artist.slug:
            identities.add(self.artist.slug)
        if any(entry.slug in identities for entry in self.artist.similar_artists):
            raise ValueError("an artist cannot be similar to itself")
        return self
