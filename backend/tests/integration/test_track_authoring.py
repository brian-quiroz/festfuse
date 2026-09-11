"""PostgreSQL integration tests for the track authoring service.

Rollback-contained against the seeded local database: every test runs inside an outer
transaction the fixture rolls back, so no track or artist rows are left behind. Track
Spotify IDs and artist slugs are randomized per test so the suite is robust to whatever
else is in the database.
"""

import os
from collections.abc import Iterator
from uuid import uuid4

import pytest
from sqlalchemy import Connection, select
from sqlalchemy.orm import Session

from app.database import engine
from app.models import Artist, ArtistTrackSelection, Track
from app.services import TrackAuthoringError, rename_track

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


def _make_artist_with_track(session: Session, *, track_name: str) -> tuple[Artist, Track]:
    artist = Artist(name="Test Track Holder", slug=f"test-{uuid4().hex[:12]}")
    track = Track(spotify_track_id=uuid4().hex[:22], name=track_name)
    session.add_all([artist, track])
    session.flush()
    session.add(
        ArtistTrackSelection(artist_id=artist.id, track_id=track.id, is_quick_picks=True)
    )
    session.flush()
    return artist, track


def test_rename_track_updates_the_name(session: Session) -> None:
    artist, track = _make_artist_with_track(session, track_name="Old Name")

    plan = rename_track(session, spotify_track_id=track.spotify_track_id, name="New Name")
    session.flush()

    assert plan.already_matches is False
    assert plan.before == "Old Name"
    assert plan.after == "New Name"
    assert plan.affected_artist_slugs == [artist.slug]
    row = session.scalar(select(Track).where(Track.id == track.id))
    assert row is not None
    assert row.name == "New Name"


def test_rename_track_lists_every_artist_that_selects_it(session: Session) -> None:
    artist_one, track = _make_artist_with_track(session, track_name="Shared Track")
    artist_two = Artist(name="Second Holder", slug=f"test-{uuid4().hex[:12]}")
    session.add(artist_two)
    session.flush()
    session.add(
        ArtistTrackSelection(
            artist_id=artist_two.id, track_id=track.id, is_quick_picks=True
        )
    )
    session.flush()

    plan = rename_track(session, spotify_track_id=track.spotify_track_id, name="Renamed")

    assert plan.affected_artist_slugs == sorted([artist_one.slug, artist_two.slug])


def test_rename_track_is_a_no_op_for_an_identical_name(session: Session) -> None:
    _, track = _make_artist_with_track(session, track_name="Same Name")

    plan = rename_track(session, spotify_track_id=track.spotify_track_id, name="Same Name")

    assert plan.already_matches is True
    assert plan.before == "Same Name"
    assert plan.after == "Same Name"


def test_rename_track_rejects_an_unknown_spotify_id(session: Session) -> None:
    with pytest.raises(TrackAuthoringError, match="no track with spotify_track_id"):
        rename_track(session, spotify_track_id="not-a-real-id", name="Anything")


def test_rename_track_rejects_a_blank_name(session: Session) -> None:
    _, track = _make_artist_with_track(session, track_name="Has A Name")

    with pytest.raises(TrackAuthoringError, match="name is required"):
        rename_track(session, spotify_track_id=track.spotify_track_id, name="   ")
