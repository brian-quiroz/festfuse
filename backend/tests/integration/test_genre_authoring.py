"""PostgreSQL integration tests for the genre authoring service (ADR-0011).

Rollback-contained against the seeded local database: every test runs inside an outer
transaction the fixture rolls back, so no genre rows are left behind. Genre names are
randomized per test so the suite is robust to whatever else is in the database.
"""

import os
from collections.abc import Iterator
from uuid import uuid4

import pytest
from sqlalchemy import Connection, select
from sqlalchemy.orm import Session

from app.database import engine
from app.models import Artist, ArtistGenre, Genre
from app.services import (
    GenreAuthoringError,
    create_genre,
    delete_genre,
    derive_genre_slug,
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


@pytest.fixture
def session(connection: Connection) -> Iterator[Session]:
    with Session(
        bind=connection, join_transaction_mode="create_savepoint"
    ) as db_session:
        yield db_session


def _unique_name() -> str:
    return f"Test Genre {uuid4().hex[:10]}"


def test_create_genre_inserts_one_row_into_its_family(session: Session) -> None:
    name = _unique_name()

    plan = create_genre(session, name=name, family="Rock")
    session.flush()

    assert plan.already_exists is False
    assert plan.slug == derive_genre_slug(name)
    row = session.scalar(select(Genre).where(Genre.slug == plan.slug))
    assert row is not None
    assert row.name == name
    assert row.family.name == "Rock"


def test_create_genre_is_idempotent_for_an_identical_row(session: Session) -> None:
    name = _unique_name()
    create_genre(session, name=name, family="Rock")
    session.flush()

    plan = create_genre(session, name=name, family="Rock")

    assert plan.already_exists is True
    assert len(session.scalars(select(Genre).where(Genre.name == name)).all()) == 1


def test_create_genre_rejects_a_name_that_clashes_with_a_different_family(
    session: Session,
) -> None:
    name = _unique_name()
    create_genre(session, name=name, family="Rock")
    session.flush()

    with pytest.raises(GenreAuthoringError, match="a genre already exists"):
        create_genre(session, name=name, family="Pop")


def test_create_genre_rejects_a_slug_already_taken_by_another_name(
    session: Session,
) -> None:
    existing = session.scalar(select(Genre).where(Genre.slug == "post-punk"))
    assert existing is not None

    with pytest.raises(GenreAuthoringError, match="a genre already exists"):
        create_genre(session, name="Post Punk", family="Rock", slug="post-punk")


def test_create_genre_rejects_an_unknown_family(session: Session) -> None:
    with pytest.raises(GenreAuthoringError, match="unknown genre family"):
        create_genre(session, name=_unique_name(), family="Nonexistent Family")


def test_delete_genre_removes_an_unassigned_row(session: Session) -> None:
    name = _unique_name()
    plan = create_genre(session, name=name, family="Rock")
    session.flush()

    summary = delete_genre(session, plan.slug)
    session.flush()

    assert summary.name == name
    assert session.scalar(select(Genre).where(Genre.slug == plan.slug)) is None


def test_delete_genre_refuses_a_genre_an_artist_is_assigned(session: Session) -> None:
    name = _unique_name()
    plan = create_genre(session, name=name, family="Rock")
    session.flush()
    genre = session.scalar(select(Genre).where(Genre.slug == plan.slug))
    artist = Artist(name="Test Genre Holder", slug=f"test-{uuid4().hex[:12]}")
    session.add(artist)
    session.flush()
    session.add(
        ArtistGenre(
            artist_id=artist.id, genre_id=genre.id, display_order=1, is_primary=True
        )
    )
    session.flush()

    with pytest.raises(GenreAuthoringError, match="assigned to 1 artist"):
        delete_genre(session, plan.slug)


def test_delete_genre_reports_a_missing_slug(session: Session) -> None:
    with pytest.raises(GenreAuthoringError, match="no genre with slug"):
        delete_genre(session, "no-such-genre-slug-here")
