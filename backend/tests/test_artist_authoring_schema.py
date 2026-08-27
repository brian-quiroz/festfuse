"""Fast tests: authoring input schema and the pure source parsers. No database."""

from datetime import UTC, datetime

import pytest
from pydantic import ValidationError

from app.lib.artist_source import (
    parse_appearance_time,
    parse_focal_y,
    parse_spotify_artist_id,
)
from app.schemas.artist_authoring import ArtistAuthoringInput, ArtistEditInput

MINIMAL = {
    "schemaVersion": 1,
    "edition": "lollapalooza-2026",
    "run": "main",
    "artist": {"name": "Stub", "slug": "stub"},
}

EDIT_MINIMAL = {
    "schemaVersion": 1,
    "edition": "lollapalooza-2026",
    "run": "main",
    "slug": "stub",
    "artist": {},
}


def _edit(**changes: object) -> dict:
    return {**EDIT_MINIMAL, "artist": changes}


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


def test_authoring_image_url_requires_image_verified() -> None:
    with pytest.raises(ValidationError, match="imageVerified"):
        ArtistAuthoringInput.model_validate(_artist(imageUrl="/artists/x.jpg"))
    ArtistAuthoringInput.model_validate(
        _artist(imageUrl="/artists/x.jpg", imageVerified=True)
    )


def test_authoring_image_year_and_sourced_at_are_validated() -> None:
    next_year = datetime.now(UTC).year + 1
    with pytest.raises(ValidationError, match="imageTakenYear"):
        ArtistAuthoringInput.model_validate(
            _artist(imageUrl="/x.jpg", imageVerified=True, imageTakenYear=next_year)
        )
    with pytest.raises(ValidationError, match="imageSourcedAt cannot be in the future"):
        ArtistAuthoringInput.model_validate(
            _artist(imageUrl="/x.jpg", imageVerified=True, imageSourcedAt="2999-01-01")
        )
    with pytest.raises(ValidationError, match="image metadata requires imageUrl"):
        ArtistAuthoringInput.model_validate(_artist(imageTakenYear=2020))
    ArtistAuthoringInput.model_validate(
        _artist(
            imageUrl="/x.jpg",
            imageVerified=True,
            imageTakenYear=2018,
            imageSourcedAt="2026-01-15",
        )
    )


# --- edit schema ----------------------------------------------------------


def test_edit_empty_patch_is_valid() -> None:
    payload = ArtistEditInput.model_validate(EDIT_MINIMAL)
    assert payload.slug == "stub"
    assert payload.artist.model_fields_set == set()


def test_edit_absent_vs_null_is_distinguishable() -> None:
    absent = ArtistEditInput.model_validate(_edit()).artist
    cleared = ArtistEditInput.model_validate(_edit(about=None)).artist
    assert "about" not in absent.model_fields_set
    assert "about" in cleared.model_fields_set and cleared.about is None


def test_edit_rejects_legacy_and_unknown_fields() -> None:
    with pytest.raises(ValidationError, match="Extra inputs"):
        ArtistEditInput.model_validate(_edit(tagline="x"))


def test_edit_name_and_slug_cannot_be_cleared() -> None:
    with pytest.raises(ValidationError, match="name cannot be cleared"):
        ArtistEditInput.model_validate(_edit(name=None))
    with pytest.raises(ValidationError, match="slug cannot be cleared"):
        ArtistEditInput.model_validate(_edit(slug=None))


def test_edit_slug_shape_is_enforced() -> None:
    with pytest.raises(ValidationError, match="valid slug"):
        ArtistEditInput.model_validate(_edit(slug="Not A Slug"))


def test_edit_clearing_about_forbids_verified() -> None:
    with pytest.raises(ValidationError, match="aboutVerified"):
        ArtistEditInput.model_validate(_edit(about=None, aboutVerified=True))


def test_edit_image_url_requires_image_verified() -> None:
    with pytest.raises(ValidationError, match="imageVerified"):
        ArtistEditInput.model_validate(_edit(imageUrl="/artists/x.jpg"))


def test_edit_image_year_sourced_at_validated() -> None:
    with pytest.raises(ValidationError, match="image metadata requires imageUrl"):
        ArtistEditInput.model_validate(_edit(imageSourcedAt="2026-01-01"))
    with pytest.raises(ValidationError, match="imageSourcedAt cannot be in the future"):
        ArtistEditInput.model_validate(
            _edit(imageUrl="/x.jpg", imageVerified=True, imageSourcedAt="2999-01-01")
        )
    ArtistEditInput.model_validate(
        _edit(
            imageUrl="/x.jpg",
            imageVerified=True,
            imageTakenYear=2017,
            imageSourcedAt="2026-01-01",
        )
    )


def test_edit_live_video_id_requires_label() -> None:
    with pytest.raises(ValidationError, match="liveVideoLabel"):
        ArtistEditInput.model_validate(_edit(liveVideoId="abc12345678"))


def test_edit_listen_first_requires_three_tracks() -> None:
    with pytest.raises(ValidationError, match="exactly 3 tracks"):
        ArtistEditInput.model_validate(
            _edit(
                listenFirst={"mode": "tracks"},
                tracks=[{"spotifyId": "a" * 22, "name": "One"}],
            )
        )


def test_edit_listen_first_needs_tracks_in_the_same_patch() -> None:
    with pytest.raises(ValidationError, match="together with tracks"):
        ArtistEditInput.model_validate(_edit(listenFirst=None))


def test_edit_verified_similar_set_must_be_zero_or_four() -> None:
    with pytest.raises(ValidationError, match="0 or 4"):
        ArtistEditInput.model_validate(
            _edit(similarArtistsVerified=True, similarArtists=[{"slug": "x"}])
        )


def test_edit_rejects_similar_self_reference() -> None:
    with pytest.raises(ValidationError, match="similar to itself"):
        ArtistEditInput.model_validate(
            {
                **EDIT_MINIMAL,
                "artist": {
                    "similarArtists": [
                        {"slug": "stub"},
                        {"slug": "b"},
                        {"slug": "c"},
                        {"slug": "d"},
                    ],
                    "similarArtistsVerified": True,
                },
            }
        )
