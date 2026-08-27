"""Fast tests: authoring input schema and the pure source parsers. No database."""

from datetime import datetime

import pytest
from pydantic import ValidationError

from app.lib.artist_source import (
    parse_appearance_time,
    parse_focal_y,
    parse_spotify_artist_id,
)
from app.schemas.artist_authoring import ArtistAuthoringInput

MINIMAL = {
    "schemaVersion": 1,
    "edition": "lollapalooza-2026",
    "run": "main",
    "artist": {"name": "Stub", "slug": "stub"},
}


def _artist(**overrides: object) -> dict:
    return {**MINIMAL, "artist": {"name": "A", "slug": "a", **overrides}}


# --- pure parsers -----------------------------------------------------------


def test_parse_focal_y_extracts_percent() -> None:
    assert parse_focal_y("center 40%") == 40
    assert parse_focal_y(None) is None


def test_parse_focal_y_rejects_other_shapes() -> None:
    with pytest.raises(ValueError):
        parse_focal_y("40% 40%")
    with pytest.raises(ValueError):
        parse_focal_y("center 120%")


def test_parse_spotify_artist_id() -> None:
    assert parse_spotify_artist_id("https://open.spotify.com/artist/abc123") == "abc123"
    assert parse_spotify_artist_id(None) is None
    with pytest.raises(ValueError):
        parse_spotify_artist_id("https://open.spotify.com/track/abc123")


def test_parse_appearance_time_is_festival_local() -> None:
    result = parse_appearance_time(
        "Jul 30", "8:30 PM", year=2026, timezone="America/Chicago"
    )
    assert result == datetime.fromisoformat("2026-07-30T20:30:00-05:00")


# --- schema: rejection of legacy / unknown fields --------------------------


@pytest.mark.parametrize(
    "field",
    ["tagline", "whySee", "whatToExpect", "bestFor", "notAField"],
)
def test_legacy_artist_fields_are_rejected(field: str) -> None:
    with pytest.raises(ValidationError, match="Extra inputs"):
        ArtistAuthoringInput.model_validate(_artist(**{field: "x"}))


def test_legacy_track_fields_are_rejected() -> None:
    with pytest.raises(ValidationError, match="Extra inputs"):
        ArtistAuthoringInput.model_validate(
            _artist(
                tracks=[
                    {"spotifyId": "a" * 22, "name": "T", "album": "X", "duration": "1"}
                ]
            )
        )


def test_legacy_appearance_fields_are_rejected() -> None:
    with pytest.raises(ValidationError, match="Extra inputs"):
        ArtistAuthoringInput.model_validate(
            _artist(
                appearances=[
                    {
                        "id": "1",
                        "festivalId": "lollapalooza-2026",
                        "stage": "T-Mobile",
                        "day": "Thursday",
                        "date": "Jul 30",
                        "startTime": "8:30 PM",
                        "endTime": "10:00 PM",
                        "billingTier": "Headliner",
                    }
                ]
            )
        )


# --- schema: required fields and shapes ------------------------------------


def test_minimal_payload_is_valid() -> None:
    payload = ArtistAuthoringInput.model_validate(MINIMAL)
    assert payload.artist.slug == "stub"
    assert payload.billing_tier is None
    assert payload.artist.genres == []


def test_name_and_slug_are_required() -> None:
    with pytest.raises(ValidationError):
        ArtistAuthoringInput.model_validate(
            {**MINIMAL, "artist": {"name": "Only Name"}}
        )


def test_slug_shape_is_enforced() -> None:
    with pytest.raises(ValidationError, match="valid slug"):
        ArtistAuthoringInput.model_validate(_artist(slug="Not A Slug"))


def test_mbid_shape_is_enforced() -> None:
    with pytest.raises(ValidationError, match="canonical lowercase UUID"):
        ArtistAuthoringInput.model_validate(_artist(mbid="not-a-uuid"))


def test_more_than_three_genres_is_rejected() -> None:
    with pytest.raises(ValidationError, match="at most 3 genres"):
        ArtistAuthoringInput.model_validate(_artist(genres=["a", "b", "c", "d"]))


def test_listen_first_requires_three_identified_tracks() -> None:
    with pytest.raises(ValidationError, match="exactly 3 tracks"):
        ArtistAuthoringInput.model_validate(
            _artist(
                listenFirst={"mode": "tracks"},
                tracks=[{"spotifyId": "a" * 22, "name": "One"}],
            )
        )


def test_verified_similar_set_must_be_zero_or_four() -> None:
    with pytest.raises(ValidationError, match="0 or 4"):
        ArtistAuthoringInput.model_validate(
            _artist(
                similarArtistsVerified=True,
                similarArtists=[{"slug": "x"}, {"slug": "y"}],
            )
        )


def test_verified_similar_set_rejects_self_reference() -> None:
    with pytest.raises(ValidationError, match="similar to itself"):
        ArtistAuthoringInput.model_validate(
            _artist(
                slug="a",
                similarArtistsVerified=True,
                similarArtists=[
                    {"slug": "a"},
                    {"slug": "b"},
                    {"slug": "c"},
                    {"slug": "d"},
                ],
            )
        )


def test_state_only_valid_for_united_states() -> None:
    with pytest.raises(ValidationError, match="United States"):
        ArtistAuthoringInput.model_validate(
            _artist(location={"city": "Toronto", "state": "ON", "country": "Canada"})
        )


def test_image_credit_requires_image_url() -> None:
    with pytest.raises(ValidationError, match="imageCredit requires imageUrl"):
        ArtistAuthoringInput.model_validate(
            _artist(
                imageCredit={
                    "author": "x",
                    "sourceUrl": "https://e.com",
                    "licenseUrl": "https://e.com",
                }
            )
        )


def test_unsupported_billing_tier_is_rejected() -> None:
    with pytest.raises(ValidationError, match="billing tier"):
        ArtistAuthoringInput.model_validate({**MINIMAL, "billingTier": "Superstar"})
