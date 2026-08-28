import os
from collections.abc import Iterator
from datetime import date, datetime, timezone
from uuid import uuid4

import pytest
from sqlalchemy import Connection, text
from sqlalchemy.orm import Session

from app.database import engine
from app.repositories import PublishedArtistConsistencyError, read_festival_run_appearances

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


def create_artist(
    connection: Connection,
    *,
    publication_status: str = "published",
    with_genres: bool = False,
) -> str:
    artist_slug = unique_slug("run-appearances-artist")
    artist_id = connection.execute(
        text(
            """
            INSERT INTO artists (slug, name, location_city, location_country, publication_status)
            VALUES (:slug, 'Run Appearances Test Artist', 'Chicago', 'United States', :status)
            RETURNING id
            """
        ),
        {"slug": artist_slug, "status": publication_status},
    ).scalar_one()

    track_id = connection.execute(
        text(
            """
            INSERT INTO tracks (spotify_track_id, name)
            VALUES (:spotify_track_id, :name)
            RETURNING id
            """
        ),
        {
            "spotify_track_id": f"{artist_slug}-track",
            "name": "Run Appearances Test Track",
        },
    ).scalar_one()
    connection.execute(
        text(
            """
            INSERT INTO artist_track_selections (artist_id, track_id, is_quick_picks)
            VALUES (:artist_id, :track_id, true)
            """
        ),
        {"artist_id": artist_id, "track_id": track_id},
    )

    if with_genres:
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
        for display_order in (2, 1):
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
            connection.execute(
                text(
                    """
                    INSERT INTO artist_genres (artist_id, genre_id, display_order, is_primary)
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

    return artist_slug


def create_lineup_entry(
    connection: Connection,
    artist_slug: str,
    *,
    lineup_status: str = "announced",
    billing_tier: str | None = "headliner",
) -> int:
    run_id = connection.execute(
        text(
            """
            SELECT festival_runs.id
            FROM festival_runs
            JOIN festival_editions ON festival_editions.id = festival_runs.festival_edition_id
            WHERE festival_editions.slug = 'lollapalooza-2026' AND festival_runs.slug = 'main'
            """
        )
    ).scalar_one()
    return connection.execute(
        text(
            """
            INSERT INTO lineup_entries (festival_run_id, artist_id, lineup_status, billing_tier)
            VALUES (:run_id, (SELECT id FROM artists WHERE slug = :artist_slug),
                    :lineup_status, :billing_tier)
            RETURNING id
            """
        ),
        {
            "run_id": run_id,
            "artist_slug": artist_slug,
            "lineup_status": lineup_status,
            "billing_tier": billing_tier,
        },
    ).scalar_one()


def create_appearance(
    connection: Connection,
    lineup_entry_id: int,
    *,
    day_date: str = "2026-07-30",
    starts_at: str,
    ends_at: str,
    appearance_status: str = "scheduled",
) -> int:
    context = (
        connection.execute(
            text(
                """
                SELECT festival_days.id AS day_id, stages.id AS stage_id
                FROM festival_days
                JOIN festival_runs ON festival_runs.id = festival_days.festival_run_id
                JOIN festival_editions ON festival_editions.id = festival_runs.festival_edition_id
                JOIN stages ON stages.festival_edition_id = festival_editions.id
                WHERE festival_editions.slug = 'lollapalooza-2026'
                  AND festival_runs.slug = 'main'
                  AND festival_days.date = CAST(:day_date AS date)
                ORDER BY stages.display_order
                LIMIT 1
                """
            ),
            {"day_date": day_date},
        )
        .mappings()
        .one()
    )
    return connection.execute(
        text(
            """
            INSERT INTO appearances
                (lineup_entry_id, festival_day_id, stage_id, starts_at, ends_at, appearance_status)
            VALUES (:lineup_entry_id, :day_id, :stage_id, :starts_at, :ends_at, :status)
            RETURNING id
            """
        ),
        {
            "lineup_entry_id": lineup_entry_id,
            "day_id": context["day_id"],
            "stage_id": context["stage_id"],
            "starts_at": starts_at,
            "ends_at": ends_at,
            "status": appearance_status,
        },
    ).scalar_one()


def test_read_festival_run_appearances_returns_none_for_unknown_run(
    connection: Connection,
) -> None:
    with Session(bind=connection) as session:
        assert (
            read_festival_run_appearances(
                session, edition_slug="lollapalooza-2026", run_slug="not-a-real-run"
            )
            is None
        )


def test_read_festival_run_appearances_filters_draft_unannounced_and_unscheduled(
    connection: Connection,
) -> None:
    draft_artist = create_artist(connection, publication_status="draft")
    draft_lineup_entry = create_lineup_entry(connection, draft_artist)
    create_appearance(
        connection,
        draft_lineup_entry,
        starts_at="2026-07-30 20:00:00+00",
        ends_at="2026-07-30 21:00:00+00",
    )

    unannounced_artist = create_artist(connection)
    unannounced_lineup_entry = create_lineup_entry(
        connection, unannounced_artist, lineup_status="withdrawn"
    )
    create_appearance(
        connection,
        unannounced_lineup_entry,
        starts_at="2026-07-30 20:00:00+00",
        ends_at="2026-07-30 21:00:00+00",
    )

    draft_appearance_artist = create_artist(connection)
    draft_appearance_lineup_entry = create_lineup_entry(
        connection, draft_appearance_artist
    )
    create_appearance(
        connection,
        draft_appearance_lineup_entry,
        starts_at="2026-07-30 20:00:00+00",
        ends_at="2026-07-30 21:00:00+00",
        appearance_status="draft",
    )

    cancelled_artist = create_artist(connection)
    cancelled_lineup_entry = create_lineup_entry(connection, cancelled_artist)
    create_appearance(
        connection,
        cancelled_lineup_entry,
        starts_at="2026-07-30 20:00:00+00",
        ends_at="2026-07-30 21:00:00+00",
        appearance_status="cancelled",
    )

    with Session(bind=connection) as session:
        appearances = read_festival_run_appearances(
            session, edition_slug="lollapalooza-2026", run_slug="main"
        )

    assert appearances is not None
    returned_slugs = {appearance.artist.slug for appearance in appearances}
    assert draft_artist not in returned_slugs
    assert unannounced_artist not in returned_slugs
    assert draft_appearance_artist not in returned_slugs
    assert cancelled_artist not in returned_slugs


def test_read_festival_run_appearances_orders_by_start_time_and_maps_fields(
    connection: Connection,
) -> None:
    later_artist = create_artist(connection, with_genres=True)
    later_lineup_entry = create_lineup_entry(
        connection, later_artist, billing_tier="undercard"
    )
    later_appearance_id = create_appearance(
        connection,
        later_lineup_entry,
        starts_at="2026-07-30 22:00:00+00",
        ends_at="2026-07-30 23:00:00+00",
    )

    earlier_artist = create_artist(connection, with_genres=True)
    earlier_lineup_entry = create_lineup_entry(
        connection, earlier_artist, billing_tier="sub_headliner"
    )
    earlier_appearance_id = create_appearance(
        connection,
        earlier_lineup_entry,
        starts_at="2026-07-30 18:00:00+00",
        ends_at="2026-07-30 19:00:00+00",
    )

    with Session(bind=connection) as session:
        appearances = read_festival_run_appearances(
            session, edition_slug="lollapalooza-2026", run_slug="main"
        )

    assert appearances is not None
    by_id = {appearance.id: appearance for appearance in appearances}
    assert earlier_appearance_id in by_id
    assert later_appearance_id in by_id

    ordered_relevant_ids = [
        appearance.id
        for appearance in appearances
        if appearance.id in (earlier_appearance_id, later_appearance_id)
    ]
    assert ordered_relevant_ids == [earlier_appearance_id, later_appearance_id]

    earlier = by_id[earlier_appearance_id]
    assert earlier.artist.slug == earlier_artist
    assert earlier.billing_tier == "sub_headliner"
    assert earlier.festival_date == date(2026, 7, 30)
    assert earlier.starts_at == datetime(2026, 7, 30, 18, 0, tzinfo=timezone.utc)
    assert [genre.display_order for genre in earlier.artist.genres] == [1, 2]
    assert [genre.is_primary for genre in earlier.artist.genres] == [True, False]
    assert earlier.artist.location.city == "Chicago"
    assert earlier.artist.location.state is None
    assert earlier.artist.location.country == "United States"
    assert (
        earlier.artist.quick_picks_track.spotify_track_id == f"{earlier_artist}-track"
    )
    assert earlier.artist.quick_picks_track.name == "Run Appearances Test Track"
    assert earlier.artist.similar_artists == []


def test_read_festival_run_appearances_includes_similar_artists_for_verified_set(
    connection: Connection,
) -> None:
    """Mirrors read_festival_artist_by_slug's four-or-none coverage
    (test_festival_artist_query_returns_all_four_or_none_without_unverifying),
    against the bulk endpoint's batched query instead of the single-artist one, using
    the same seeded 5sos similar-artist set.
    """
    with Session(bind=connection) as session:
        appearances = read_festival_run_appearances(
            session, edition_slug="lollapalooza-2026", run_slug="main"
        )

    assert appearances is not None
    by_slug = {appearance.artist.slug: appearance.artist for appearance in appearances}
    assert "5sos" in by_slug
    assert len(by_slug["5sos"].similar_artists) == 4
    assert [artist.display_order for artist in by_slug["5sos"].similar_artists] == [
        1,
        2,
        3,
        4,
    ]

    first_target_slug = next(
        artist.slug
        for artist in by_slug["5sos"].similar_artists
        if artist.display_order == 1
    )
    connection.execute(
        text("UPDATE artists SET publication_status = 'draft' WHERE slug = :slug"),
        {"slug": first_target_slug},
    )

    with Session(bind=connection) as session:
        hidden_appearances = read_festival_run_appearances(
            session, edition_slug="lollapalooza-2026", run_slug="main"
        )

    assert hidden_appearances is not None
    hidden_by_slug = {
        appearance.artist.slug: appearance.artist for appearance in hidden_appearances
    }
    assert hidden_by_slug["5sos"].similar_artists == []


def test_read_festival_run_appearances_rejects_missing_billing_tier(
    connection: Connection,
) -> None:
    artist_slug = create_artist(connection)
    lineup_entry_id = create_lineup_entry(connection, artist_slug, billing_tier=None)
    create_appearance(
        connection,
        lineup_entry_id,
        starts_at="2026-07-30 20:00:00+00",
        ends_at="2026-07-30 21:00:00+00",
    )

    with Session(bind=connection) as session:
        with pytest.raises(
            PublishedArtistConsistencyError, match="has no billing tier"
        ):
            read_festival_run_appearances(
                session, edition_slug="lollapalooza-2026", run_slug="main"
            )
