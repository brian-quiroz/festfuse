from datetime import timedelta

import pytest

from scripts.import_artists import (
    export_source,
    generate_lookup_slug,
    parse_appearance_time,
    parse_focal_y,
    parse_spotify_artist_id,
    validate_and_summarize,
)


def test_import_normalizers() -> None:
    assert generate_lookup_slug("Hip-Hop/Rap") == "hip-hop-rap"
    assert generate_lookup_slug("Tito's") == "tito-s"
    assert parse_focal_y("center 10%") == 10
    assert parse_focal_y(None) is None
    assert (
        parse_spotify_artist_id(
            "https://open.spotify.com/artist/163tK9Wjr9P9DmM0AVK7lm"
        )
        == "163tK9Wjr9P9DmM0AVK7lm"
    )


def test_invalid_focal_position_is_rejected() -> None:
    with pytest.raises(ValueError, match="unsupported objectPosition"):
        parse_focal_y("top")


def test_appearance_times_use_festival_timezone() -> None:
    starts_at = parse_appearance_time(
        "Jul 30", "8:30 PM", year=2026, timezone="America/Chicago"
    )
    ends_at = parse_appearance_time(
        "Jul 30", "10:00 PM", year=2026, timezone="America/Chicago"
    )

    assert starts_at.utcoffset() == timedelta(hours=-5)
    assert ends_at - starts_at == timedelta(minutes=90)


def test_current_typescript_source_passes_import_validation() -> None:
    source = export_source()
    counts, errors = validate_and_summarize(source)

    top_level_artists = {artist["slug"]: artist for artist in source["artists"]}
    assert top_level_artists["5sos"]["name"] == "5 Seconds of Summer"
    assert top_level_artists["cyso"]["name"] == "Chicago Youth Symphony Orchestra"
    assert top_level_artists["adela"]["name"] == "ADÉLA"

    assert errors == []
    assert counts["artists"] == 171
    assert counts["appearances"] == 172
    assert counts["about_content_preserved"] == 171
    assert counts["about_verified"] == 50
    assert counts["about_unverified_preserved"] == 121
    assert counts["approved_images_imported"] == 21
    assert counts["publication_ready"] == 126
    assert counts["remaining_draft"] == 45
