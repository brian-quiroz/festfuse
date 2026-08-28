"""Fast, no-database coverage for the roster CSV parser (build_roster_payloads.py).

The batch-apply behaviour (per-artist transactions, skip-if-exists, partial failure)
is covered against real PostgreSQL in integration/test_artist_authoring.py.
"""

from app.schemas.artist_authoring import ArtistAuthoringInput
from scripts.build_roster_payloads import parse_roster, weekday_label

EDITION = "lollapalooza-2026"
RUN = "main"
YEAR = 2026


def _row(**overrides: str) -> dict[str, str]:
    row = {
        "slug": "test-artist",
        "name": "Test Artist",
        "spotify_url": "https://open.spotify.com/artist/1abcabcabcabcabcabcabc",
        "youtube_url": "https://youtube.com/@test",
        "tiktok_url": "",
        "mbid": "",
        "billing_tier": "Headliner",
        "stage": "T-Mobile",
        "date": "Jul 30",
        "start_time": "8:30 PM",
        "end_time": "10:00 PM",
    }
    row.update(overrides)
    return row


def _parse(rows: list[dict[str, str]]):
    return parse_roster(rows, edition=EDITION, run=RUN, year=YEAR)


def test_weekday_label_uses_the_edition_year() -> None:
    assert weekday_label("Jul 30", 2026) == "Thursday"
    assert weekday_label("Aug 2", 2026) == "Sunday"


def test_single_row_builds_a_valid_skeleton_payload() -> None:
    payloads, errors = _parse([_row()])

    assert errors == []
    payload_dict = payloads["test-artist"]
    model = ArtistAuthoringInput.model_validate(payload_dict)

    assert model.edition == EDITION and model.run == RUN
    assert model.artist.name == "Test Artist"
    assert model.artist.socials.spotify.endswith("1abcabcabcabcabcabcabc")
    assert model.artist.socials.youtube == "https://youtube.com/@test"
    assert model.artist.socials.tiktok is None
    assert model.artist.socials_verified is True
    assert model.artist.genres == [] and model.artist.about is None
    assert len(model.artist.appearances) == 1
    appearance = model.artist.appearances[0]
    assert appearance.day == "Thursday"
    assert appearance.date == "Jul 30"
    assert appearance.billing_tier == "Headliner"


def test_socials_verified_true_even_with_no_social_links() -> None:
    payloads, errors = _parse([_row(spotify_url="", youtube_url="", tiktok_url="")])

    assert errors == []
    model = ArtistAuthoringInput.model_validate(payloads["test-artist"])
    assert model.artist.socials.spotify is None
    assert model.artist.socials.youtube is None
    assert model.artist.socials_verified is True


def test_mbid_is_included_only_when_present() -> None:
    without, _ = _parse([_row()])
    assert "mbid" not in without["test-artist"]["artist"]

    with_mbid, _ = _parse([_row(mbid="a1a2a3a4-b1b2-c1c2-d1d2-e1e2e3e4e5e6")])
    assert (
        with_mbid["test-artist"]["artist"]["mbid"]
        == "a1a2a3a4-b1b2-c1c2-d1d2-e1e2e3e4e5e6"
    )


def test_multiple_rows_for_one_slug_become_one_multi_appearance_payload() -> None:
    payloads, errors = _parse(
        [
            _row(
                date="Jul 30",
                stage="T-Mobile",
                start_time="2:00 PM",
                end_time="3:00 PM",
            ),
            _row(
                date="Aug 2", stage="Tito's", start_time="4:00 PM", end_time="5:00 PM"
            ),
        ]
    )

    assert errors == []
    model = ArtistAuthoringInput.model_validate(payloads["test-artist"])
    days = sorted(a.day for a in model.artist.appearances)
    assert days == ["Sunday", "Thursday"]


def test_missing_required_cell_is_reported_and_the_row_is_skipped() -> None:
    payloads, errors = _parse([_row(stage=""), _row(slug="ok-artist")])

    assert "test-artist" not in payloads
    assert "ok-artist" in payloads
    assert len(errors) == 1 and "stage" in errors[0].message


def test_unknown_billing_tier_is_reported() -> None:
    _, errors = _parse([_row(billing_tier="Legend")])
    assert len(errors) == 1 and "Legend" in errors[0].message


def test_rows_for_one_slug_that_disagree_on_a_shared_field_are_reported() -> None:
    payloads, errors = _parse(
        [_row(name="Test Artist"), _row(name="Test Artist Renamed", date="Aug 2")]
    )

    assert "test-artist" not in payloads
    assert len(errors) == 1 and "name" in errors[0].message


def test_two_artists_sharing_a_spotify_url_are_reported() -> None:
    payloads, errors = _parse(
        [
            _row(slug="artist-one"),
            _row(slug="artist-two"),
        ]
    )

    assert "artist-one" in payloads
    assert "artist-two" not in payloads
    assert len(errors) == 1 and "artist-one" in errors[0].message
