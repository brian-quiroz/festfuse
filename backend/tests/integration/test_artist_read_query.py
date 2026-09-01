import os
from collections.abc import Iterator
from uuid import uuid4

import pytest
from sqlalchemy import Connection, text
from sqlalchemy.orm import Session

from app.database import engine
from app.repositories import (
    PublishedArtistConsistencyError,
    read_festival_artist_by_slug,
    read_published_artist_by_slug,
)

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
                 about, about_verified_at, youtube_url, tiktok_url,
                 socials_verified, listen_first_note, publication_status)
            VALUES
                (:slug, 'Read Test Artist', 'https://example.com/artist.jpg', 40,
                 'Test Photographer', 'https://example.com/source',
                 'https://example.com/license', 2025, DATE '2026-08-23', 'Chicago',
                 'Illinois', 'United States', 'Verified biography.', NOW(),
                 'https://youtube.com/@readtest', 'https://tiktok.com/@readtest',
                 true, 'Start with these tracks.', 'draft')
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

    connection.execute(
        text(
            """
            INSERT INTO artist_videos
                (artist_id, youtube_video_id, label, is_featured, display_order,
                 is_available)
            VALUES
                (:artist_id, 'secondary-video', 'Secondary performance', false, 2,
                 true),
                (:artist_id, 'featured-video', 'Featured performance', true, 1,
                 true)
            """
        ),
        {"artist_id": artist_id},
    )
    return artist_slug


def create_announced_lineup_entry(
    connection: Connection,
    artist_slug: str,
    *,
    with_appearances: bool,
) -> list[int]:
    context = (
        connection.execute(
            text(
                """
            SELECT
                festival_runs.id AS run_id,
                festival_days.id AS day_id,
                stages.id AS stage_id
            FROM festival_editions
            JOIN festival_runs
              ON festival_runs.festival_edition_id = festival_editions.id
            JOIN festival_days
              ON festival_days.festival_run_id = festival_runs.id
            JOIN stages
              ON stages.festival_edition_id = festival_editions.id
            WHERE festival_editions.slug = 'lollapalooza-2026'
              AND festival_runs.slug = 'main'
              AND festival_days.date = DATE '2026-07-30'
            ORDER BY stages.display_order
            LIMIT 1
            """
            )
        )
        .mappings()
        .one()
    )
    lineup_entry_id = connection.execute(
        text(
            """
            INSERT INTO lineup_entries
                (festival_run_id, artist_id, lineup_status, billing_tier)
            VALUES
                (:run_id, (SELECT id FROM artists WHERE slug = :artist_slug),
                 'announced', 'headliner')
            RETURNING id
            """
        ),
        {"run_id": context["run_id"], "artist_slug": artist_slug},
    ).scalar_one()
    if not with_appearances:
        return []

    return list(
        connection.execute(
            text(
                """
                INSERT INTO appearances
                    (lineup_entry_id, festival_day_id, stage_id, starts_at, ends_at,
                     appearance_status, cancelled_at, cancellation_reason)
                VALUES
                    (:lineup_entry_id, :day_id, :stage_id,
                     TIMESTAMPTZ '2026-07-31 01:00:00+00',
                     TIMESTAMPTZ '2026-07-31 02:00:00+00', 'scheduled', NULL, NULL),
                    (:lineup_entry_id, :day_id, :stage_id,
                     TIMESTAMPTZ '2026-07-30 17:00:00+00',
                     TIMESTAMPTZ '2026-07-30 18:00:00+00', 'cancelled', NOW(),
                     'Weather'),
                    (:lineup_entry_id, :day_id, :stage_id,
                     TIMESTAMPTZ '2026-07-30 20:00:00+00',
                     TIMESTAMPTZ '2026-07-30 21:00:00+00', 'draft', NULL, NULL)
                RETURNING id
                """
            ),
            {
                "lineup_entry_id": lineup_entry_id,
                "day_id": context["day_id"],
                "stage_id": context["stage_id"],
            },
        ).scalars()
    )


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
    assert artist.about == "Verified biography."
    assert artist.socials.model_dump() == {
        "spotify_url": None,
        "youtube_url": "https://youtube.com/@readtest",
        "tiktok_url": "https://tiktok.com/@readtest",
    }
    assert artist.featured_video is not None
    assert artist.featured_video.model_dump() == {
        "youtube_video_id": "featured-video",
        "label": "Featured performance",
    }


def test_artist_read_query_hides_unverified_content_and_unavailable_video(
    connection: Connection,
) -> None:
    artist_slug = create_artist_core_fixture(connection)
    connection.execute(
        text(
            """
            UPDATE artists
            SET publication_status = 'published',
                about_verified_at = NULL,
                socials_verified = false
            WHERE slug = :slug
            """
        ),
        {"slug": artist_slug},
    )
    connection.execute(
        text(
            """
            UPDATE artist_videos
            SET is_available = false
            WHERE artist_id = (SELECT id FROM artists WHERE slug = :slug)
              AND is_featured = true
            """
        ),
        {"slug": artist_slug},
    )

    with Session(bind=connection) as session:
        artist = read_published_artist_by_slug(session, artist_slug)

    assert artist is not None
    assert artist.about is None
    assert artist.socials.youtube_url is None
    assert artist.socials.tiktok_url is None
    assert artist.featured_video is None


def test_festival_artist_query_maps_public_run_schedule_in_local_time(
    connection: Connection,
) -> None:
    artist_slug = create_artist_core_fixture(connection)
    appearance_ids = create_announced_lineup_entry(
        connection,
        artist_slug,
        with_appearances=True,
    )

    with Session(bind=connection) as session:
        assert (
            read_festival_artist_by_slug(
                session,
                edition_slug="lollapalooza-2026",
                run_slug="main",
                artist_slug=artist_slug,
            )
            is None
        )

    connection.execute(
        text("UPDATE artists SET publication_status = 'published' WHERE slug = :slug"),
        {"slug": artist_slug},
    )
    connection.execute(
        text(
            """
            UPDATE lineup_entries
            SET lineup_status = 'withdrawn', withdrawn_at = NOW()
            WHERE artist_id = (SELECT id FROM artists WHERE slug = :slug)
            """
        ),
        {"slug": artist_slug},
    )

    with Session(bind=connection) as session:
        assert (
            read_festival_artist_by_slug(
                session,
                edition_slug="lollapalooza-2026",
                run_slug="main",
                artist_slug=artist_slug,
            )
            is None
        )

    connection.execute(
        text(
            """
            UPDATE lineup_entries
            SET lineup_status = 'announced', withdrawn_at = NULL
            WHERE artist_id = (SELECT id FROM artists WHERE slug = :slug)
            """
        ),
        {"slug": artist_slug},
    )

    with Session(bind=connection) as session:
        result = read_festival_artist_by_slug(
            session,
            edition_slug="lollapalooza-2026",
            run_slug="main",
            artist_slug=artist_slug,
        )

    assert result is not None
    assert result.artist.slug == artist_slug
    assert result.festival_context.edition.slug == "lollapalooza-2026"
    assert result.festival_context.edition.timezone == "America/Chicago"
    assert result.festival_context.run.slug == "main"
    assert result.festival_context.billing_tier == "headliner"
    assert [appearance.id for appearance in result.festival_context.appearances] == [
        appearance_ids[1],
        appearance_ids[0],
    ]
    assert [
        appearance.status for appearance in result.festival_context.appearances
    ] == ["cancelled", "scheduled"]
    assert [
        appearance.starts_at.isoformat()
        for appearance in result.festival_context.appearances
    ] == ["2026-07-30T12:00:00-05:00", "2026-07-30T20:00:00-05:00"]
    assert result.festival_context.appearances[0].cancellation_reason == "Weather"
    assert result.festival_context.similar_artists == []


def test_festival_artist_query_allows_announced_lineup_without_schedule(
    connection: Connection,
) -> None:
    artist_slug = create_artist_core_fixture(connection)
    create_announced_lineup_entry(connection, artist_slug, with_appearances=False)
    connection.execute(
        text("UPDATE artists SET publication_status = 'published' WHERE slug = :slug"),
        {"slug": artist_slug},
    )

    with Session(bind=connection) as session:
        result = read_festival_artist_by_slug(
            session,
            edition_slug="lollapalooza-2026",
            run_slug="main",
            artist_slug=artist_slug,
        )

    assert result is not None
    assert result.festival_context.appearances == []


def test_festival_artist_query_rejects_announced_entry_without_billing(
    connection: Connection,
) -> None:
    artist_slug = create_artist_core_fixture(connection)
    create_announced_lineup_entry(connection, artist_slug, with_appearances=False)
    connection.execute(
        text("UPDATE artists SET publication_status = 'published' WHERE slug = :slug"),
        {"slug": artist_slug},
    )
    connection.execute(
        text(
            """
            UPDATE lineup_entries
            SET billing_tier = NULL
            WHERE artist_id = (SELECT id FROM artists WHERE slug = :slug)
            """
        ),
        {"slug": artist_slug},
    )

    with Session(bind=connection) as session:
        with pytest.raises(
            PublishedArtistConsistencyError,
            match="has no billing tier",
        ):
            read_festival_artist_by_slug(
                session,
                edition_slug="lollapalooza-2026",
                run_slug="main",
                artist_slug=artist_slug,
            )


def test_festival_artist_query_returns_all_four_or_none_without_unverifying(
    connection: Connection,
) -> None:
    with Session(bind=connection) as session:
        result = read_festival_artist_by_slug(
            session,
            edition_slug="lollapalooza-2026",
            run_slug="main",
            artist_slug="5sos",
        )

    assert result is not None
    assert len(result.festival_context.similar_artists) == 4
    assert [
        artist.display_order for artist in result.festival_context.similar_artists
    ] == [1, 2, 3, 4]

    similarity = (
        connection.execute(
            text(
                """
            SELECT similar_artist_sets.id, similar_artist_sets.verified_at,
                   targets.slug AS target_slug
            FROM similar_artist_sets
            JOIN festival_runs
              ON festival_runs.id = similar_artist_sets.festival_run_id
            JOIN festival_editions
              ON festival_editions.id = festival_runs.festival_edition_id
            JOIN artists AS sources
              ON sources.id = similar_artist_sets.source_artist_id
            JOIN similar_artists
              ON similar_artists.similarity_set_id = similar_artist_sets.id
             AND similar_artists.display_order = 1
            JOIN artists AS targets
              ON targets.id = similar_artists.target_artist_id
            WHERE festival_editions.slug = 'lollapalooza-2026'
              AND festival_runs.slug = 'main'
              AND sources.slug = '5sos'
            """
            )
        )
        .mappings()
        .one()
    )
    connection.execute(
        text("UPDATE artists SET publication_status = 'draft' WHERE slug = :slug"),
        {"slug": similarity["target_slug"]},
    )

    with Session(bind=connection) as session:
        hidden_result = read_festival_artist_by_slug(
            session,
            edition_slug="lollapalooza-2026",
            run_slug="main",
            artist_slug="5sos",
        )

    assert hidden_result is not None
    assert hidden_result.festival_context.similar_artists == []
    verified_at = connection.execute(
        text("SELECT verified_at FROM similar_artist_sets WHERE id = :set_id"),
        {"set_id": similarity["id"]},
    ).scalar_one()
    assert verified_at == similarity["verified_at"]


def test_artist_read_query_maps_a_null_quick_picks_track_for_a_video_only_artist(
    connection: Connection,
) -> None:
    artist_slug = unique_slug("video-only-published")
    artist_id = connection.execute(
        text(
            """
            INSERT INTO artists
                (slug, name, location_city, location_country, publication_status)
            VALUES (:slug, 'Video Only Artist', 'Austin', 'United States', 'published')
            RETURNING id
            """
        ),
        {"slug": artist_slug},
    ).scalar_one()
    connection.execute(
        text(
            """
            INSERT INTO artist_videos
                (artist_id, youtube_video_id, label, is_featured, is_available, display_order)
            VALUES (:artist_id, 'live-set', 'Live set', true, true, 1)
            """
        ),
        {"artist_id": artist_id},
    )

    with Session(bind=connection) as session:
        artist = read_published_artist_by_slug(session, artist_slug)

    assert artist is not None
    assert artist.quick_picks_track is None
    assert artist.featured_video is not None
