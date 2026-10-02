"""PostgreSQL integration tests for the schedule change service.

Rollback-contained against the seeded local database, like test_artist_authoring.py:
every test builds inside an outer transaction the fixture rolls back. Test artists get
random slugs and late-night ACL 2026 weekend-1 slots (after the real schedule ends), so
the overlap check never sees a real set.
"""

import os
from collections.abc import Iterator
from uuid import uuid4

import pytest
from sqlalchemy import Connection, select
from sqlalchemy.orm import Session

from app.database import engine
from app.models import LineupEntry, SimilarArtistSet
from app.schemas.artist_authoring import ArtistAuthoringInput
from app.schemas.schedule_change import ScheduleChangeInput
from app.services import ScheduleChangeError, apply_schedule_changes, create_artist

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


def _seed(
    session: Session,
    *,
    stage: str = "Snapchat",
    start: str = "11:00 PM",
    end: str = "11:30 PM",
    similar: list[str] | None = None,
) -> LineupEntry:
    """An announced weekend-1 artist with one Friday set."""
    slug = f"test-{uuid4().hex[:12]}"
    artist: dict[str, object] = {
        "name": "Test Schedule Artist",
        "slug": slug,
        "appearances": [
            {
                "billingTier": "Undercard",
                "stage": stage,
                "day": "Friday",
                "date": "Oct 2",
                "startTime": start,
                "endTime": end,
            }
        ],
    }
    if similar is not None:
        artist["similarArtists"] = [{"slug": target} for target in similar]
        artist["similarArtistsVerified"] = True
    created = create_artist(
        session,
        ArtistAuthoringInput.model_validate(
            {
                "schemaVersion": 1,
                "edition": "acl-2026",
                "run": "weekend-1",
                "artist": artist,
            }
        ),
    )
    session.flush()
    return created.lineup_entries[0]


def _move(
    slug: str,
    *,
    before_stage: str = "Snapchat",
    before_start: str = "11:00 PM",
    stage: str = "Snapchat",
    start: str = "11:15 PM",
    end: str = "11:45 PM",
) -> dict:
    return {
        "op": "move",
        "run": "weekend-1",
        "slug": slug,
        "before": {"stage": before_stage, "date": "Oct 2", "startTime": before_start},
        "after": {"stage": stage, "startTime": start, "endTime": end},
    }


def _withdraw(slug: str) -> dict:
    return {"op": "withdraw", "run": "weekend-1", "slug": slug}


def _apply(session: Session, *changes: dict):
    return apply_schedule_changes(
        session,
        ScheduleChangeInput.model_validate(
            {"schemaVersion": 1, "edition": "acl-2026", "changes": list(changes)}
        ),
    )


def test_move_edits_the_appearance_row_in_place(session: Session) -> None:
    entry = _seed(session)
    appearance = entry.appearances[0]
    original_id = appearance.id

    summary = _apply(session, _move(entry.artist.slug, stage="BMI"))
    session.flush()

    assert appearance.id == original_id
    assert len(entry.appearances) == 1
    assert appearance.stage.name == "BMI"
    assert summary.moves[0].before == "Snapchat Fri Oct 02 11:00 PM-11:30 PM"
    assert summary.moves[0].after == "BMI Fri Oct 02 11:15 PM-11:45 PM"


def test_an_end_time_only_move_is_accepted(session: Session) -> None:
    entry = _seed(session)

    summary = _apply(
        session, _move(entry.artist.slug, start="11:00 PM", end="11:20 PM")
    )

    assert summary.moves[0].after == "Snapchat Fri Oct 02 11:00 PM-11:20 PM"


def test_a_stale_before_slot_is_refused_and_lists_the_current_one(
    session: Session,
) -> None:
    entry = _seed(session)

    with pytest.raises(ScheduleChangeError, match="current: Snapchat Fri Oct 02 11:00"):
        _apply(session, _move(entry.artist.slug, before_start="10:30 PM"))


def test_an_already_applied_move_is_refused(session: Session) -> None:
    entry = _seed(session)
    _apply(session, _move(entry.artist.slug))

    with pytest.raises(ScheduleChangeError, match="current: Snapchat Fri Oct 02 11:15"):
        _apply(session, _move(entry.artist.slug))
    with pytest.raises(ScheduleChangeError, match="already at the new slot"):
        _apply(session, _move(entry.artist.slug, before_start="11:15 PM"))


def test_unknown_stage_run_and_artist_are_refused(session: Session) -> None:
    entry = _seed(session)

    with pytest.raises(ScheduleChangeError, match="unknown stage"):
        _apply(session, _move(entry.artist.slug, stage="Main Stage"))
    with pytest.raises(ScheduleChangeError, match="does not exist for edition"):
        _apply(session, {**_withdraw(entry.artist.slug), "run": "weekend-3"})
    with pytest.raises(ScheduleChangeError, match="is not in run"):
        _apply(session, _withdraw(f"test-{uuid4().hex[:12]}"))


def test_withdrawal_retains_appearances_and_reports_similar_sources(
    session: Session,
) -> None:
    departing = _seed(session)
    source = _seed(
        session,
        start="11:30 PM",
        end="11:45 PM",
        similar=[departing.artist.slug, "charli-xcx", "the-xx", "geese"],
    )

    summary = _apply(session, _withdraw(departing.artist.slug))
    session.flush()
    session.expire_all()

    assert departing.lineup_status == "withdrawn"
    assert departing.withdrawn_at is not None
    assert departing.appearances[0].appearance_status == "scheduled"
    withdrawal = summary.withdrawals[0]
    assert withdrawal.retained_appearances == ["Snapchat Fri Oct 02 11:00 PM-11:30 PM"]
    assert withdrawal.similar_sources == [source.artist.slug]
    similarity_set = session.scalar(
        select(SimilarArtistSet).where(
            SimilarArtistSet.source_artist_id == source.artist_id
        )
    )
    assert similarity_set.verified_at is None


def test_a_withdrawn_artist_cannot_change_again(session: Session) -> None:
    entry = _seed(session)
    _apply(session, _withdraw(entry.artist.slug))

    with pytest.raises(ScheduleChangeError, match="only an announced lineup entry"):
        _apply(session, _withdraw(entry.artist.slug))
    with pytest.raises(ScheduleChangeError, match="only an announced lineup entry"):
        _apply(session, _move(entry.artist.slug))


def test_a_move_onto_an_occupied_slot_is_refused(session: Session) -> None:
    occupant = _seed(session, stage="BMI")
    mover = _seed(session)

    # The refused move is already flushed when the check raises; the savepoint stands
    # in for the CLI's rollback.
    with pytest.raises(ScheduleChangeError, match="overlaps"), session.begin_nested():
        _apply(session, _move(mover.artist.slug, stage="BMI"))
    # Withdrawing the occupant in the same changeset frees the slot, in either order.
    _apply(
        session,
        _move(mover.artist.slug, stage="BMI"),
        _withdraw(occupant.artist.slug),
    )
