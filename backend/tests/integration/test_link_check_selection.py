"""PostgreSQL integration tests for check_artist_links' artist selection.

Rollback-contained against the seeded local database, like test_artist_authoring.py.
No network: these exercise only which artists a scope selects and the exit path for an
unknown slug, never the link checks themselves.
"""

import os
from collections.abc import Iterator
from contextlib import nullcontext
from types import SimpleNamespace
from uuid import uuid4

import pytest
from sqlalchemy import Connection
from sqlalchemy.orm import Session

from app.database import engine
from app.schemas.artist_authoring import ArtistAuthoringInput
from app.services import create_artist
from scripts import check_artist_links

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


def _draft(session: Session) -> str:
    """A draft weekend-1 ACL 2026 artist with one late-night set."""
    slug = f"test-{uuid4().hex[:12]}"
    create_artist(
        session,
        ArtistAuthoringInput.model_validate(
            {
                "schemaVersion": 1,
                "edition": "acl-2026",
                "run": "weekend-1",
                "artist": {
                    "name": "Test Link Check Draft",
                    "slug": slug,
                    "appearances": [
                        {
                            "billingTier": "Undercard",
                            "stage": "Snapchat",
                            "day": "Friday",
                            "date": "Oct 2",
                            "startTime": "11:00 PM",
                            "endTime": "11:30 PM",
                        }
                    ],
                },
            }
        ),
    )
    session.flush()
    return slug


def _args(**overrides: object) -> SimpleNamespace:
    args = {"slug": None, "edition": None, "run": None, "include_drafts": False}
    args.update(overrides)
    return SimpleNamespace(**args)


def test_a_named_draft_is_checked_without_the_flag(session: Session) -> None:
    slug = _draft(session)

    artists, skipped = check_artist_links._select_artists(session, _args(slug=slug))

    assert [artist.slug for artist in artists] == [slug]
    assert skipped == 0


def test_a_run_check_skips_drafts_and_counts_them(session: Session) -> None:
    slug = _draft(session)
    run_scope = _args(edition="acl-2026", run="weekend-1")

    artists, skipped = check_artist_links._select_artists(session, run_scope)
    assert slug not in {artist.slug for artist in artists}
    assert skipped >= 1

    run_scope.include_drafts = True
    artists, skipped = check_artist_links._select_artists(session, run_scope)
    assert slug in {artist.slug for artist in artists}
    assert skipped == 0


def test_an_unknown_slug_fails(
    session: Session,
    monkeypatch: pytest.MonkeyPatch,
    capsys: pytest.CaptureFixture[str],
) -> None:
    monkeypatch.setattr(
        check_artist_links, "SessionLocal", lambda: nullcontext(session)
    )
    monkeypatch.setattr(
        "sys.argv", ["check_artist_links", "--slug", f"test-{uuid4().hex[:12]}"]
    )

    assert check_artist_links.main() == 1
    assert "No artist with slug" in capsys.readouterr().out
