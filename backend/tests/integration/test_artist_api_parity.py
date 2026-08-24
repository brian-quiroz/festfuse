import os
import re
import unicodedata
from typing import Any

import pytest
from sqlalchemy import select

from app.database import SessionLocal
from app.models import Artist
from app.queries import read_published_artist_by_slug
from scripts.import_artists import export_source

pytestmark = [
    pytest.mark.postgres,
    pytest.mark.skipif(
        os.getenv("RUN_POSTGRES_INTEGRATION") != "1",
        reason="set RUN_POSTGRES_INTEGRATION=1 to use local PostgreSQL",
    ),
]


@pytest.fixture(scope="module")
def source_snapshot() -> dict[str, Any]:
    return export_source()


def expected_slug(value: str) -> str:
    ascii_value = (
        unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode()
    )
    return re.sub(r"[^a-z0-9]+", "-", ascii_value.lower()).strip("-")


def record_mismatch(
    mismatches: list[str],
    *,
    artist_slug: str,
    field: str,
    actual: object,
    expected: object,
) -> None:
    if actual != expected:
        mismatches.append(
            f"{artist_slug}.{field}: expected {expected!r}, got {actual!r}"
        )


def source_artist_is_publication_ready(source_artist: dict[str, Any]) -> bool:
    tracks = source_artist["tracks"]
    has_quick_picks = bool(tracks and tracks[0].get("spotifyId"))
    has_spotify_artist = bool(source_artist["socials"].get("spotify"))
    listen_first = source_artist.get("listenFirst")
    has_curated_override = bool(
        listen_first
        and listen_first.get("mode") == "tracks"
        and len(tracks) == 3
        and all(track.get("spotifyId") for track in tracks)
    )
    location = source_artist["location"]

    return bool(
        source_artist["name"].strip()
        and source_artist["slug"].strip()
        and location.get("city")
        and location.get("country")
        and len(source_artist["genres"]) == 3
        and has_quick_picks
        and (has_spotify_artist or has_curated_override)
    )


def test_lorde_artist_core_matches_typescript_source(
    source_snapshot: dict[str, Any],
) -> None:
    source_artist = next(
        artist for artist in source_snapshot["artists"] if artist["slug"] == "lorde"
    )

    with SessionLocal() as session:
        api_artist = read_published_artist_by_slug(session, "lorde")

    assert api_artist is not None
    assert api_artist.slug == source_artist["slug"]
    assert api_artist.name == source_artist["name"]
    assert (
        api_artist.spotify_artist_id
        == source_artist["socials"]["spotify"].rsplit("/", maxsplit=1)[-1]
    )

    assert source_artist["imageVerified"] is True
    assert api_artist.image is not None
    assert api_artist.image.url == source_artist["imageUrl"]
    assert api_artist.image.focal_y_percent == 5
    assert api_artist.image.credit_author == source_artist["imageCredit"]["author"]
    assert api_artist.image.source_url == source_artist["imageCredit"]["sourceUrl"]
    assert api_artist.image.license_url == source_artist["imageCredit"]["licenseUrl"]
    assert api_artist.image.taken_year is None
    assert api_artist.image.sourced_at is None

    assert api_artist.location.city == source_artist["location"]["city"]
    assert api_artist.location.state is None
    assert api_artist.location.country == source_artist["location"]["country"]

    assert [genre.name for genre in api_artist.genres] == source_artist["genres"]
    assert [genre.display_order for genre in api_artist.genres] == [1, 2, 3]
    assert [genre.is_primary for genre in api_artist.genres] == [True, False, False]
    assert [genre.family.name for genre in api_artist.genres] == ["Pop", "Pop", "Pop"]

    source_quick_picks = source_artist["tracks"][0]
    assert (
        api_artist.quick_picks_track.spotify_track_id == source_quick_picks["spotifyId"]
    )
    assert api_artist.quick_picks_track.name == source_quick_picks["name"]

    assert "listenFirst" not in source_artist
    assert api_artist.listen_first.note is None
    assert api_artist.listen_first.tracks == []


def test_kettama_unapproved_source_image_remains_hidden(
    source_snapshot: dict[str, Any],
) -> None:
    source_artist = next(
        artist for artist in source_snapshot["artists"] if artist["slug"] == "kettama"
    )

    with SessionLocal() as session:
        api_artist = read_published_artist_by_slug(session, "kettama")

    assert api_artist is not None
    assert api_artist.slug == source_artist["slug"]
    assert api_artist.name == source_artist["name"]
    assert "imageUrl" in source_artist
    assert source_artist.get("imageVerified") is not True
    assert api_artist.image is None

    assert api_artist.location.city == source_artist["location"]["city"]
    assert api_artist.location.country == source_artist["location"]["country"]
    assert [genre.name for genre in api_artist.genres] == source_artist["genres"]

    source_quick_picks = source_artist["tracks"][0]
    assert (
        api_artist.quick_picks_track.spotify_track_id == source_quick_picks["spotifyId"]
    )
    assert api_artist.quick_picks_track.name == source_quick_picks["name"]


def test_worship_curated_listen_first_override_matches_typescript_source(
    source_snapshot: dict[str, Any],
) -> None:
    source_artist = next(
        artist for artist in source_snapshot["artists"] if artist["slug"] == "worship"
    )

    with SessionLocal() as session:
        api_artist = read_published_artist_by_slug(session, "worship")

    assert api_artist is not None
    assert api_artist.slug == source_artist["slug"]
    assert api_artist.name == source_artist["name"]
    assert "spotify" not in source_artist["socials"]
    assert api_artist.spotify_artist_id is None

    source_listen_first = source_artist["listenFirst"]
    assert source_listen_first["mode"] == "tracks"
    assert api_artist.listen_first.note == source_listen_first["note"]
    assert [track.display_order for track in api_artist.listen_first.tracks] == [
        1,
        2,
        3,
    ]
    assert [
        (track.spotify_track_id, track.name) for track in api_artist.listen_first.tracks
    ] == [(track["spotifyId"], track["name"]) for track in source_artist["tracks"]]

    source_quick_picks = source_artist["tracks"][0]
    assert (
        api_artist.quick_picks_track.spotify_track_id == source_quick_picks["spotifyId"]
    )
    assert api_artist.quick_picks_track.name == source_quick_picks["name"]


def test_all_published_artist_cores_match_typescript_source(
    source_snapshot: dict[str, Any],
) -> None:
    mismatches: list[str] = []
    source_by_slug = {artist["slug"]: artist for artist in source_snapshot["artists"]}
    family_by_genre = {
        genre: family
        for family, genres in source_snapshot["genreFamilies"].items()
        for genre in genres
    }

    with SessionLocal() as session:
        published_slugs = session.scalars(
            select(Artist.slug)
            .where(Artist.publication_status == "published")
            .order_by(Artist.slug)
        ).all()

        expected_published_slugs = {
            artist["slug"]
            for artist in source_snapshot["artists"]
            if source_artist_is_publication_ready(artist)
        }
        actual_published_slugs = set(published_slugs)

        record_mismatch(
            mismatches,
            artist_slug="<published-set>",
            field="missing_slugs",
            actual=sorted(expected_published_slugs - actual_published_slugs),
            expected=[],
        )
        record_mismatch(
            mismatches,
            artist_slug="<published-set>",
            field="unexpected_slugs",
            actual=sorted(actual_published_slugs - expected_published_slugs),
            expected=[],
        )

        record_mismatch(
            mismatches,
            artist_slug="<published-set>",
            field="count",
            actual=len(published_slugs),
            expected=126,
        )

        for artist_slug in published_slugs:
            source_artist = source_by_slug.get(artist_slug)
            if source_artist is None:
                mismatches.append(
                    f"{artist_slug}.source: published Artist is missing from TypeScript"
                )
                continue

            api_artist = read_published_artist_by_slug(session, artist_slug)
            if api_artist is None:
                mismatches.append(
                    f"{artist_slug}.api: published Artist was hidden by public query"
                )
                continue

            identity_expectations = {
                "slug": source_artist["slug"],
                "name": source_artist["name"],
            }
            for field, expected in identity_expectations.items():
                record_mismatch(
                    mismatches,
                    artist_slug=artist_slug,
                    field=field,
                    actual=getattr(api_artist, field),
                    expected=expected,
                )

            spotify_url = source_artist["socials"].get("spotify")
            expected_spotify_id = (
                spotify_url.split("/artist/", maxsplit=1)[1].split("?", maxsplit=1)[0]
                if spotify_url is not None
                else None
            )
            record_mismatch(
                mismatches,
                artist_slug=artist_slug,
                field="spotify_artist_id",
                actual=api_artist.spotify_artist_id,
                expected=expected_spotify_id,
            )

            image_is_approved = source_artist.get("imageVerified") is True
            if not image_is_approved:
                record_mismatch(
                    mismatches,
                    artist_slug=artist_slug,
                    field="image",
                    actual=api_artist.image,
                    expected=None,
                )
            elif api_artist.image is None:
                mismatches.append(
                    f"{artist_slug}.image: approved source image is missing from API"
                )
            else:
                source_credit = source_artist.get("imageCredit", {})
                object_position = source_artist.get("objectPosition")
                expected_focal_y = (
                    int(object_position.removeprefix("center ").removesuffix("%"))
                    if object_position is not None
                    else None
                )
                image_expectations = {
                    "url": source_artist["imageUrl"],
                    "focal_y_percent": expected_focal_y,
                    "credit_author": source_credit.get("author"),
                    "source_url": source_credit.get("sourceUrl"),
                    "license_url": source_credit.get("licenseUrl"),
                }
                for field, expected in image_expectations.items():
                    record_mismatch(
                        mismatches,
                        artist_slug=artist_slug,
                        field=f"image.{field}",
                        actual=getattr(api_artist.image, field),
                        expected=expected,
                    )

            source_location = source_artist["location"]
            location_expectations = {
                "city": source_location["city"],
                "state": source_location.get("state"),
                "country": source_location["country"],
            }
            for field, expected in location_expectations.items():
                record_mismatch(
                    mismatches,
                    artist_slug=artist_slug,
                    field=f"location.{field}",
                    actual=getattr(api_artist.location, field),
                    expected=expected,
                )

            source_genres = source_artist["genres"]
            genre_expectations = {
                "names": source_genres,
                "slugs": [expected_slug(genre) for genre in source_genres],
                "display_order": list(range(1, len(source_genres) + 1)),
                "is_primary": [index == 0 for index in range(len(source_genres))],
                "family_names": [family_by_genre[genre] for genre in source_genres],
                "family_slugs": [
                    expected_slug(family_by_genre[genre]) for genre in source_genres
                ],
            }
            genre_actuals = {
                "names": [genre.name for genre in api_artist.genres],
                "slugs": [genre.slug for genre in api_artist.genres],
                "display_order": [genre.display_order for genre in api_artist.genres],
                "is_primary": [genre.is_primary for genre in api_artist.genres],
                "family_names": [genre.family.name for genre in api_artist.genres],
                "family_slugs": [genre.family.slug for genre in api_artist.genres],
            }
            for field, expected in genre_expectations.items():
                record_mismatch(
                    mismatches,
                    artist_slug=artist_slug,
                    field=f"genres.{field}",
                    actual=genre_actuals[field],
                    expected=expected,
                )

            source_tracks = source_artist["tracks"]
            if not source_tracks or "spotifyId" not in source_tracks[0]:
                mismatches.append(
                    f"{artist_slug}.quick_picks_track: published source has no "
                    "playable first Track"
                )
                continue

            source_quick_picks = source_tracks[0]
            quick_picks_expectations = {
                "spotify_track_id": source_quick_picks["spotifyId"],
                "name": source_quick_picks["name"],
            }
            for field, expected in quick_picks_expectations.items():
                record_mismatch(
                    mismatches,
                    artist_slug=artist_slug,
                    field=f"quick_picks_track.{field}",
                    actual=getattr(api_artist.quick_picks_track, field),
                    expected=expected,
                )

            source_listen_first = source_artist.get("listenFirst")
            if source_listen_first is None:
                expected_listen_first_note = None
                expected_listen_first_tracks: list[tuple[str, str, int]] = []
            else:
                expected_listen_first_note = source_listen_first.get("note")
                expected_listen_first_tracks = [
                    (track["spotifyId"], track["name"], display_order)
                    for display_order, track in enumerate(source_tracks, start=1)
                ]

            record_mismatch(
                mismatches,
                artist_slug=artist_slug,
                field="listen_first.note",
                actual=api_artist.listen_first.note,
                expected=expected_listen_first_note,
            )
            record_mismatch(
                mismatches,
                artist_slug=artist_slug,
                field="listen_first.tracks",
                actual=[
                    (track.spotify_track_id, track.name, track.display_order)
                    for track in api_artist.listen_first.tracks
                ],
                expected=expected_listen_first_tracks,
            )

    assert not mismatches, "Artist API parity mismatches:\n" + "\n".join(mismatches)
