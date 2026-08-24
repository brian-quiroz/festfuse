import os
from collections.abc import Iterator
from uuid import uuid4

import pytest
from sqlalchemy import Connection, text
from sqlalchemy.orm import Session

from app.database import engine
from app.queries import PublishedArtistConsistencyError, read_published_artist_by_slug

pytestmark = [
    pytest.mark.postgres,
    pytest.mark.skipif(
        os.getenv("RUN_POSTGRES_INTEGRATION") != "1",
        reason="set RUN_POSTGRES_INTEGRATION=1 to use local PostgreSQL",
    ),
]


@pytest.fixture
def connection() -> Iterator[Connection]:
    with engine.connect() as database_connection:
        transaction = database_connection.begin()
        try:
            yield database_connection
        finally:
            transaction.rollback()


def unique_slug(prefix: str) -> str:
    return f"test-{prefix}-{uuid4().hex[:10]}"


def create_artist_core_fixture(connection: Connection) -> str:
    artist_slug = unique_slug("artist-read")
    artist_id = connection.execute(
        text(
            """
            INSERT INTO artists
                (slug, name, image_url, image_focal_y_percent, image_credit_author,
                 image_source_url, image_license_url, image_taken_year,
                 image_sourced_at, location_city, location_state, location_country,
                 listen_first_note, publication_status)
            VALUES
                (:slug, 'Read Test Artist', 'https://example.com/artist.jpg', 40,
                 'Test Photographer', 'https://example.com/source',
                 'https://example.com/license', 2025, DATE '2026-08-23', 'Chicago',
                 'Illinois', 'United States', 'Start with these tracks.', 'draft')
            RETURNING id
            """
        ),
        {"slug": artist_slug},
    ).scalar_one()
    family_id = connection.execute(
        text(
            """
            INSERT INTO genre_families (slug, name, display_order)
            VALUES (:slug, :name, (SELECT COALESCE(MAX(display_order), 0) + 1
                                  FROM genre_families))
            RETURNING id
            """
        ),
        {"slug": unique_slug("family"), "name": unique_slug("Family")},
    ).scalar_one()

    genre_ids: dict[int, int] = {}
    for display_order in (3, 1, 2):
        genre_id = connection.execute(
            text(
                """
                INSERT INTO genres (family_id, slug, name)
                VALUES (:family_id, :slug, :name)
                RETURNING id
                """
            ),
            {
                "family_id": family_id,
                "slug": unique_slug(f"genre-{display_order}"),
                "name": unique_slug(f"Genre {display_order}"),
            },
        ).scalar_one()
        genre_ids[display_order] = genre_id
        connection.execute(
            text(
                """
                INSERT INTO artist_genres
                    (artist_id, genre_id, display_order, is_primary)
                VALUES (:artist_id, :genre_id, :display_order, :is_primary)
                """
            ),
            {
                "artist_id": artist_id,
                "genre_id": genre_id,
                "display_order": display_order,
                "is_primary": display_order == 1,
            },
        )

    for listen_first_order in (3, 1, 2):
        track_id = connection.execute(
            text(
                """
                INSERT INTO tracks (spotify_track_id, name)
                VALUES (:spotify_track_id, :name)
                RETURNING id
                """
            ),
            {
                "spotify_track_id": unique_slug(f"track-{listen_first_order}"),
                "name": f"Track {listen_first_order}",
            },
        ).scalar_one()
        connection.execute(
            text(
                """
                INSERT INTO artist_track_selections
                    (artist_id, track_id, is_quick_picks, listen_first_order)
                VALUES (:artist_id, :track_id, :is_quick_picks, :listen_first_order)
                """
            ),
            {
                "artist_id": artist_id,
                "track_id": track_id,
                "is_quick_picks": listen_first_order == 2,
                "listen_first_order": listen_first_order,
            },
        )
    return artist_slug


def test_artist_read_query_filters_drafts_and_maps_ordered_relationships(
    connection: Connection,
) -> None:
    artist_slug = create_artist_core_fixture(connection)

    with Session(bind=connection) as session:
        assert read_published_artist_by_slug(session, artist_slug) is None

    connection.execute(
        text("UPDATE artists SET publication_status = 'published' WHERE slug = :slug"),
        {"slug": artist_slug},
    )

    with Session(bind=connection) as session:
        artist = read_published_artist_by_slug(session, artist_slug)

    assert artist is not None
    assert artist.slug == artist_slug
    assert artist.spotify_artist_id is None
    assert artist.image is not None
    assert artist.image.model_dump(mode="json") == {
        "url": "https://example.com/artist.jpg",
        "focal_y_percent": 40,
        "credit_author": "Test Photographer",
        "source_url": "https://example.com/source",
        "license_url": "https://example.com/license",
        "taken_year": 2025,
        "sourced_at": "2026-08-23",
    }
    assert [genre.display_order for genre in artist.genres] == [1, 2, 3]
    assert artist.quick_picks_track.name == "Track 2"
    assert artist.listen_first.note == "Start with these tracks."
    assert [track.display_order for track in artist.listen_first.tracks] == [1, 2, 3]
    assert [track.name for track in artist.listen_first.tracks] == [
        "Track 1",
        "Track 2",
        "Track 3",
    ]


def test_artist_read_query_rejects_corrupt_published_quick_picks(
    connection: Connection,
) -> None:
    artist_slug = unique_slug("corrupt-published")
    connection.execute(
        text(
            """
            INSERT INTO artists
                (slug, name, location_city, location_country, publication_status)
            VALUES (:slug, 'Corrupt Artist', 'Chicago', 'United States', 'published')
            """
        ),
        {"slug": artist_slug},
    )

    with Session(bind=connection) as session:
        with pytest.raises(
            PublishedArtistConsistencyError,
            match="expected exactly one",
        ):
            read_published_artist_by_slug(session, artist_slug)
