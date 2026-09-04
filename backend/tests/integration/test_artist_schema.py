import os
from collections.abc import Iterator
from uuid import uuid4

import pytest
from sqlalchemy import Connection, func, select, text
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session, selectinload

from app.database import engine
from app.models import Artist
from app.services import evaluate_artist_publication, publish_ready_artists

pytestmark = [
    pytest.mark.postgres,
    pytest.mark.skipif(
        os.getenv("RUN_POSTGRES_INTEGRATION") != "1",
        reason="set RUN_POSTGRES_INTEGRATION=1 to use local PostgreSQL",
    ),
]

TIMESTAMPED_TABLES = {
    "artists",
    "genre_families",
    "genres",
    "artist_genres",
    "tracks",
    "artist_track_selections",
    "artist_videos",
    "similar_artist_sets",
    "similar_artists",
    "lineup_entries",
    "stages",
    "appearances",
}


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


def create_artist(connection: Connection, label: str) -> int:
    return connection.execute(
        text(
            """
            INSERT INTO artists (slug, name)
            VALUES (:slug, :name)
            RETURNING id
            """
        ),
        {"slug": unique_slug(label), "name": f"Test {label}"},
    ).scalar_one()


def create_festival_aggregate(connection: Connection, label: str) -> dict[str, int]:
    series_id = connection.execute(
        text(
            """
            INSERT INTO festival_series (slug, name)
            VALUES (:slug, :name)
            RETURNING id
            """
        ),
        {"slug": unique_slug(f"series-{label}"), "name": f"Test {label}"},
    ).scalar_one()
    edition_id = connection.execute(
        text(
            """
            INSERT INTO festival_editions
                (festival_series_id, year, slug, name, city, country, timezone)
            VALUES
                (:series_id, 2099, :slug, :name, 'Test', 'United States',
                 'America/Chicago')
            RETURNING id
            """
        ),
        {
            "series_id": series_id,
            "slug": unique_slug(f"edition-{label}"),
            "name": f"Test {label} 2099",
        },
    ).scalar_one()
    run_id = connection.execute(
        text(
            """
            INSERT INTO festival_runs
                (festival_edition_id, slug, name, display_order)
            VALUES (:edition_id, 'main', 'Main Run', 1)
            RETURNING id
            """
        ),
        {"edition_id": edition_id},
    ).scalar_one()
    day_id = connection.execute(
        text(
            """
            INSERT INTO festival_days (festival_run_id, date, display_order)
            VALUES (:run_id, DATE '2099-01-01', 1)
            RETURNING id
            """
        ),
        {"run_id": run_id},
    ).scalar_one()
    stage_id = connection.execute(
        text(
            """
            INSERT INTO stages (festival_edition_id, slug, name, display_order)
            VALUES (:edition_id, 'main', 'Main Stage', 1)
            RETURNING id
            """
        ),
        {"edition_id": edition_id},
    ).scalar_one()
    artist_id = create_artist(connection, f"aggregate-{label}")
    lineup_entry_id = connection.execute(
        text(
            """
            INSERT INTO lineup_entries
                (festival_run_id, artist_id, lineup_status)
            VALUES (:run_id, :artist_id, 'announced')
            RETURNING id
            """
        ),
        {"run_id": run_id, "artist_id": artist_id},
    ).scalar_one()
    connection.execute(
        text(
            """
            INSERT INTO appearances
                (lineup_entry_id, festival_day_id, stage_id, starts_at, ends_at,
                 appearance_status)
            VALUES
                (:lineup_entry_id, :day_id, :stage_id,
                 TIMESTAMPTZ '2099-01-01 18:00:00-06',
                 TIMESTAMPTZ '2099-01-01 19:00:00-06', 'scheduled')
            """
        ),
        {
            "lineup_entry_id": lineup_entry_id,
            "day_id": day_id,
            "stage_id": stage_id,
        },
    )
    return {
        "edition_id": edition_id,
        "run_id": run_id,
        "day_id": day_id,
        "stage_id": stage_id,
    }


def test_seeded_roster_publication_readiness_is_complete(
    connection: Connection,
) -> None:
    with Session(bind=connection) as session:
        artists = session.scalars(
            select(Artist).options(
                selectinload(Artist.genre_assignments),
                selectinload(Artist.track_selections),
            )
        ).all()

        readiness = [evaluate_artist_publication(artist) for artist in artists]

    # The seeded roster grows as festivals are imported, so the invariant is
    # "every seeded artist is publication-ready", not a fixed count.
    assert len(artists) > 0
    assert sum(result.is_ready for result in readiness) > 0
    assert sum(not result.is_ready for result in readiness) == 0


def test_publish_ready_artists_updates_only_passing_records(
    connection: Connection,
) -> None:
    with Session(bind=connection) as session:
        batch = publish_ready_artists(session)

        published_count = session.scalar(
            select(func.count())
            .select_from(Artist)
            .where(Artist.publication_status == "published")
        )
        draft_count = session.scalar(
            select(func.count())
            .select_from(Artist)
            .where(Artist.publication_status == "draft")
        )

    assert batch.ready_count > 0
    assert batch.blocked_count == 0
    assert published_count > 0
    assert draft_count == 0


def test_all_new_timestamped_tables_have_update_triggers(
    connection: Connection,
) -> None:
    rows = connection.execute(
        text(
            """
            SELECT table_class.relname AS table_name, trigger.tgname AS trigger_name
            FROM pg_trigger AS trigger
            JOIN pg_class AS table_class ON table_class.oid = trigger.tgrelid
            WHERE NOT trigger.tgisinternal
              AND trigger.tgname LIKE 'trg_%_updated_at'
            """
        )
    ).mappings()
    triggers = {row["table_name"]: row["trigger_name"] for row in rows}

    assert TIMESTAMPED_TABLES <= triggers.keys()
    for table_name in TIMESTAMPED_TABLES:
        assert triggers[table_name] == f"trg_{table_name}_updated_at"


def test_artist_content_changes_invalidate_verification(
    connection: Connection,
) -> None:
    artist_id = create_artist(connection, "editorial-trigger")
    connection.execute(
        text(
            """
            UPDATE artists
            SET about = 'Original About', youtube_url = 'https://youtu.be/original'
            WHERE id = :artist_id
            """
        ),
        {"artist_id": artist_id},
    )
    connection.execute(
        text(
            """
            UPDATE artists
            SET about_verified_at = now(), socials_verified = true
            WHERE id = :artist_id
            """
        ),
        {"artist_id": artist_id},
    )
    connection.execute(
        text(
            """
            UPDATE artists
            SET about = 'Changed About',
                youtube_url = 'https://youtu.be/changed',
                updated_at = TIMESTAMPTZ '2000-01-01 00:00:00+00'
            WHERE id = :artist_id
            """
        ),
        {"artist_id": artist_id},
    )

    artist = connection.execute(
        text(
            """
            SELECT about_verified_at, socials_verified, updated_at
            FROM artists
            WHERE id = :artist_id
            """
        ),
        {"artist_id": artist_id},
    ).one()
    assert artist.about_verified_at is None
    assert artist.socials_verified is False
    assert artist.updated_at.year != 2000

    connection.execute(
        text(
            """
            UPDATE artists
            SET youtube_url = NULL
            WHERE id = :artist_id
            """
        ),
        {"artist_id": artist_id},
    )
    connection.execute(
        text(
            """
            UPDATE artists
            SET socials_verified = true
            WHERE id = :artist_id
            """
        ),
        {"artist_id": artist_id},
    )
    assert connection.execute(
        text("SELECT socials_verified FROM artists WHERE id = :artist_id"),
        {"artist_id": artist_id},
    ).scalar_one()


def test_image_metadata_requires_an_image(connection: Connection) -> None:
    with pytest.raises(IntegrityError):
        with connection.begin_nested():
            connection.execute(
                text(
                    """
                    INSERT INTO artists (slug, name, image_credit_author)
                    VALUES (:slug, 'Invalid Image Metadata', 'Photographer')
                    """
                ),
                {"slug": unique_slug("invalid-image")},
            )


def test_similarity_and_lineup_changes_invalidate_verification(
    connection: Connection,
) -> None:
    aggregate = create_festival_aggregate(connection, "similarity-trigger")
    source_artist_id = create_artist(connection, "similarity-source")
    target_artist_id = create_artist(connection, "similarity-target")
    lineup_ids = {}
    for role, artist_id in (
        ("source", source_artist_id),
        ("target", target_artist_id),
    ):
        lineup_ids[role] = connection.execute(
            text(
                """
                INSERT INTO lineup_entries
                    (festival_run_id, artist_id, lineup_status)
                VALUES (:run_id, :artist_id, 'announced')
                RETURNING id
                """
            ),
            {"run_id": aggregate["run_id"], "artist_id": artist_id},
        ).scalar_one()

    similarity_set_id = connection.execute(
        text(
            """
            INSERT INTO similar_artist_sets
                (festival_run_id, source_artist_id, verified_at)
            VALUES (:run_id, :source_artist_id, now())
            RETURNING id
            """
        ),
        {"run_id": aggregate["run_id"], "source_artist_id": source_artist_id},
    ).scalar_one()
    connection.execute(
        text(
            """
            INSERT INTO similar_artists
                (similarity_set_id, target_artist_id, display_order)
            VALUES (:similarity_set_id, :target_artist_id, 1)
            """
        ),
        {
            "similarity_set_id": similarity_set_id,
            "target_artist_id": target_artist_id,
        },
    )
    assert_verified_at(connection, similarity_set_id, expected_none=True)

    verify_similarity_set(connection, similarity_set_id)
    connection.execute(
        text(
            """
            UPDATE similar_artists
            SET display_order = 2
            WHERE similarity_set_id = :similarity_set_id
              AND target_artist_id = :target_artist_id
            """
        ),
        {
            "similarity_set_id": similarity_set_id,
            "target_artist_id": target_artist_id,
        },
    )
    assert_verified_at(connection, similarity_set_id, expected_none=True)

    verify_similarity_set(connection, similarity_set_id)
    connection.execute(
        text(
            """
            UPDATE lineup_entries
            SET lineup_status = 'withdrawn'
            WHERE id = :lineup_entry_id
            """
        ),
        {"lineup_entry_id": lineup_ids["target"]},
    )
    assert_verified_at(connection, similarity_set_id, expected_none=True)

    connection.execute(
        text(
            """
            UPDATE lineup_entries
            SET lineup_status = 'announced'
            WHERE id = :lineup_entry_id
            """
        ),
        {"lineup_entry_id": lineup_ids["target"]},
    )
    assert_verified_at(connection, similarity_set_id, expected_none=True)

    verify_similarity_set(connection, similarity_set_id)
    connection.execute(
        text(
            """
            UPDATE lineup_entries
            SET lineup_status = 'draft'
            WHERE id = :lineup_entry_id
            """
        ),
        {"lineup_entry_id": lineup_ids["source"]},
    )
    assert_verified_at(connection, similarity_set_id, expected_none=True)

    with pytest.raises(IntegrityError):
        with connection.begin_nested():
            connection.execute(
                text("DELETE FROM artists WHERE id = :artist_id"),
                {"artist_id": target_artist_id},
            )


def verify_similarity_set(connection: Connection, similarity_set_id: int) -> None:
    connection.execute(
        text(
            """
            UPDATE similar_artist_sets
            SET verified_at = now()
            WHERE id = :similarity_set_id
            """
        ),
        {"similarity_set_id": similarity_set_id},
    )


def assert_verified_at(
    connection: Connection,
    similarity_set_id: int,
    *,
    expected_none: bool,
) -> None:
    verified_at = connection.execute(
        text(
            """
            SELECT verified_at
            FROM similar_artist_sets
            WHERE id = :similarity_set_id
            """
        ),
        {"similarity_set_id": similarity_set_id},
    ).scalar_one()
    assert (verified_at is None) is expected_none


@pytest.mark.parametrize(
    ("table_name", "id_key"),
    (("festival_runs", "run_id"), ("festival_editions", "edition_id")),
)
def test_aggregate_deletion_succeeds(
    connection: Connection,
    table_name: str,
    id_key: str,
) -> None:
    aggregate = create_festival_aggregate(connection, f"delete-{table_name}")
    connection.execute(
        text(f"DELETE FROM {table_name} WHERE id = :record_id"),
        {"record_id": aggregate[id_key]},
    )
    connection.execute(text("SET CONSTRAINTS ALL IMMEDIATE"))


@pytest.mark.parametrize(
    ("table_name", "id_key", "constraint_name"),
    (
        ("festival_days", "day_id", "appearances_festival_day_id_fkey"),
        ("stages", "stage_id", "appearances_stage_id_fkey"),
    ),
)
def test_direct_deletion_of_scheduled_parent_is_protected(
    connection: Connection,
    table_name: str,
    id_key: str,
    constraint_name: str,
) -> None:
    aggregate = create_festival_aggregate(connection, f"protect-{table_name}")

    with pytest.raises(IntegrityError) as error:
        connection.execute(
            text(f"DELETE FROM {table_name} WHERE id = :record_id"),
            {"record_id": aggregate[id_key]},
        )
        connection.execute(text("SET CONSTRAINTS ALL IMMEDIATE"))

    assert error.value.orig.diag.constraint_name == constraint_name
