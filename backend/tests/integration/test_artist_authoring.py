"""PostgreSQL integration tests for the artist authoring service (ADR-0011).

Rollback-contained against the seeded local database: every test builds inside an outer
transaction that the fixture rolls back, so no fixture data is left behind. Identity
values (slug, mbid, Spotify id) are randomized per test so the suite is robust to
whatever else is in the local database. Uses real seeded genres, stages, festival days,
and similar-artist targets.
"""

import os
import secrets
from collections.abc import Iterator
from uuid import uuid4

import pytest
from sqlalchemy import Connection, func, select
from sqlalchemy.orm import Session

from app.database import engine
from app.models import Artist, SimilarArtist, SimilarArtistSet, Track
from app.schemas.artist_authoring import ArtistAuthoringInput
from app.services import (
    ArtistAuthoringError,
    create_artist,
    delete_artist,
    evaluate_artist_publication,
)

pytestmark = [
    pytest.mark.postgres,
    pytest.mark.skipif(
        os.getenv("RUN_POSTGRES_INTEGRATION") != "1",
        reason="set RUN_POSTGRES_INTEGRATION=1 to use local PostgreSQL",
    ),
]

REAL_GENRES = ["Alt-Pop", "Electropop", "Art Pop"]
REAL_SIMILAR = ["charli-xcx", "the-xx", "the-smashing-pumpkins", "tate-mcrae"]
RIBS = "2MvvoeRt8NcOXWESkxWn3g"  # a track already in the seeded database
_ALPHANUM = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"


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


def _spotify_id() -> str:
    return "".join(secrets.choice(_ALPHANUM) for _ in range(22))


def _full_payload(**artist_overrides: object) -> dict:
    artist = {
        "name": "Test Authoring Artist",
        "slug": f"test-{uuid4().hex[:12]}",
        "mbid": str(uuid4()),
        "imageVerified": True,
        "imageUrl": "/artists/global/test.jpg",
        "objectPosition": "center 5%",
        "aboutVerified": True,
        "about": "A verified about paragraph.",
        "socialsVerified": True,
        "genres": REAL_GENRES,
        "location": {"city": "Auckland", "country": "New Zealand"},
        "socials": {
            "spotify": f"https://open.spotify.com/artist/{_spotify_id()}",
            "youtube": "https://youtube.com/@test",
        },
        "liveVideoId": "abc12345678",
        "liveVideoLabel": "Live somewhere",
        "tracks": [
            {"spotifyId": RIBS, "name": "Ribs"},
            {"spotifyId": "6ie2Bw3xLj2JcGowOlcMhb", "name": "Green Light"},
            {"spotifyId": "1gvOEwQbIEjkpLdcZwtBoB", "name": "Man Of The Year"},
        ],
        "listenFirst": {"mode": "tracks", "note": "Start here."},
        "similarArtistsVerified": True,
        "similarArtists": [{"slug": target} for target in REAL_SIMILAR],
        "appearances": [
            {
                "billingTier": "Headliner",
                "stage": "T-Mobile",
                "day": "Thursday",
                "date": "Jul 30",
                "startTime": "8:30 PM",
                "endTime": "10:00 PM",
            }
        ],
    }
    artist.update(artist_overrides)
    return {
        "schemaVersion": 1,
        "edition": "lollapalooza-2026",
        "run": "main",
        "artist": artist,
    }


def _payload(data: dict) -> ArtistAuthoringInput:
    return ArtistAuthoringInput.model_validate(data)


def test_full_create_round_trip(session: Session) -> None:
    data = _full_payload()
    artist = create_artist(session, _payload(data))

    assert artist.publication_status == "draft"
    assert artist.mbid == data["artist"]["mbid"]
    assert (
        artist.spotify_artist_id
        == data["artist"]["socials"]["spotify"].rsplit("/", 1)[1]
    )
    assert [
        (a.display_order, a.is_primary, a.genre.name) for a in artist.genre_assignments
    ] == [(1, True, "Alt-Pop"), (2, False, "Electropop"), (3, False, "Art Pop")]

    quick = [s for s in artist.track_selections if s.is_quick_picks]
    assert len(quick) == 1 and quick[0].track.spotify_track_id == RIBS
    assert sorted(
        s.listen_first_order for s in artist.track_selections if s.listen_first_order
    ) == [1, 2, 3]

    assert len(artist.videos) == 1 and artist.videos[0].is_featured

    lineup = artist.lineup_entries[0]
    assert lineup.lineup_status == "announced"
    assert lineup.billing_tier == "headliner"
    assert len(lineup.appearances) == 1
    assert lineup.appearances[0].appearance_status == "scheduled"

    assert evaluate_artist_publication(artist).is_ready


def test_about_verification_survives_create(session: Session) -> None:
    # The invalidation trigger is BEFORE UPDATE only, so an insert keeps the stamp.
    artist = create_artist(session, _payload(_full_payload()))
    assert artist.about_verified_at is not None
    assert artist.socials_verified is True


def test_similar_set_verified_after_entry_insert(session: Session) -> None:
    artist = create_artist(session, _payload(_full_payload()))
    session.flush()
    similarity_set = artist.similarity_sets[0]
    # AFTER INSERT trigger nulls verified_at; the service re-stamps it in a final pass.
    assert similarity_set.verified_at is not None
    assert [e.target_artist.slug for e in similarity_set.entries] == REAL_SIMILAR


def test_partial_create_is_a_draft_lineup_with_readiness_gaps(session: Session) -> None:
    payload = _payload(
        {
            "schemaVersion": 1,
            "edition": "lollapalooza-2026",
            "run": "main",
            "artist": {"name": "Just Announced", "slug": f"test-{uuid4().hex[:12]}"},
        }
    )
    artist = create_artist(session, payload)

    assert artist.publication_status == "draft"
    assert artist.lineup_entries[0].lineup_status == "draft"
    assert artist.lineup_entries[0].billing_tier is None
    assert artist.lineup_entries[0].appearances == []

    readiness = evaluate_artist_publication(artist)
    assert not readiness.is_ready
    issues = {issue.value for issue in readiness.issues}
    assert {"missing_location", "invalid_genre_set", "missing_quick_picks"} <= issues


def test_announced_without_schedule_uses_wrapper_billing(session: Session) -> None:
    data = _full_payload(appearances=[])
    data["billingTier"] = "Sub-headliner"
    artist = create_artist(session, _payload(data))

    lineup = artist.lineup_entries[0]
    assert lineup.lineup_status == "announced"
    assert lineup.billing_tier == "sub_headliner"
    assert lineup.appearances == []


def test_duplicate_slug_is_refused(session: Session) -> None:
    # "5sos" is a seeded artist, always present.
    with pytest.raises(ArtistAuthoringError, match="already exists"):
        create_artist(session, _payload(_full_payload(slug="5sos")))


def test_taken_spotify_identity_is_refused(session: Session) -> None:
    data = _full_payload()
    data["artist"]["socials"]["spotify"] = (
        "https://open.spotify.com/artist/163tK9Wjr9P9DmM0AVK7lm"  # Lorde's
    )
    with pytest.raises(ArtistAuthoringError, match="already belongs to 'lorde'"):
        create_artist(session, _payload(data))


def test_unknown_genre_is_refused(session: Session) -> None:
    data = _full_payload(genres=["Alt-Pop", "Electropop", "Nonexistent Genre"])
    with pytest.raises(ArtistAuthoringError, match="unknown genre"):
        create_artist(session, _payload(data))


def test_unknown_similar_target_is_refused(session: Session) -> None:
    data = _full_payload(
        similarArtists=[
            {"slug": "charli-xcx"},
            {"slug": "the-xx"},
            {"slug": "tate-mcrae"},
            {"slug": "does-not-exist"},
        ]
    )
    with pytest.raises(ArtistAuthoringError, match="unknown similar-artist target"):
        create_artist(session, _payload(data))


def test_unknown_stage_is_refused(session: Session) -> None:
    data = _full_payload()
    data["artist"]["appearances"][0]["stage"] = "Nonexistent Stage"
    with pytest.raises(ArtistAuthoringError, match="unknown stage"):
        create_artist(session, _payload(data))


def test_delete_removes_owned_rows_and_keeps_shared_tracks(session: Session) -> None:
    artist = create_artist(session, _payload(_full_payload()))
    slug = artist.slug
    session.flush()
    track_count_before = session.scalar(select(func.count()).select_from(Track))

    summary = delete_artist(session, slug, force=False)

    assert summary.appearances == 1
    assert summary.similar_artist_sets == 1
    assert session.scalar(select(Artist).where(Artist.slug == slug)) is None
    assert session.scalar(select(func.count()).select_from(Track)) == track_count_before


def test_delete_refused_for_similar_target_then_forced(session: Session) -> None:
    target = create_artist(session, _payload(_full_payload()))
    target_slug = target.slug

    referrer = create_artist(
        session,
        _payload(
            _full_payload(
                similarArtists=[
                    {"slug": target_slug},
                    {"slug": "charli-xcx"},
                    {"slug": "the-xx"},
                    {"slug": "tate-mcrae"},
                ]
            )
        ),
    )
    referrer_slug = referrer.slug
    session.flush()

    with pytest.raises(ArtistAuthoringError, match=referrer_slug):
        delete_artist(session, target_slug, force=False)

    summary = delete_artist(session, target_slug, force=True)
    assert summary.cleared_incoming_similar_refs == [referrer_slug]

    # The AFTER DELETE trigger nulls verified_at DB-side; expire so the ORM re-reads it.
    session.expire_all()
    remaining = session.scalar(
        select(SimilarArtistSet)
        .join(SimilarArtistSet.source_artist)
        .where(Artist.slug == referrer_slug)
    )
    assert remaining.verified_at is None
    assert (
        session.scalar(
            select(func.count())
            .select_from(SimilarArtist)
            .where(SimilarArtist.similarity_set_id == remaining.id)
        )
        == 3
    )
