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
from app.models import (
    Artist,
    FestivalEdition,
    FestivalRun,
    LineupEntry,
    SimilarArtist,
    SimilarArtistSet,
    Track,
)
from app.schemas.artist_authoring import ArtistAuthoringInput, ArtistEditInput
from app.services import (
    ArtistAuthoringError,
    add_existing_artist_to_run,
    attach_run_schedule,
    create_artist,
    delete_artist,
    edit_artist,
    evaluate_artist_publication,
)
from scripts.build_roster_payloads import create_from_payloads, parse_roster
from scripts.show_artist import _render_detail, _render_roster

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
        "imageTakenYear": 2019,
        "imageSourcedAt": "2026-02-14",
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

    assert artist.image_taken_year == 2019
    assert artist.image_sourced_at.isoformat() == "2026-02-14"

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


def _edit(target: str, **changes: object) -> ArtistEditInput:
    return ArtistEditInput.model_validate(
        {
            "schemaVersion": 1,
            "edition": "lollapalooza-2026",
            "run": "main",
            "slug": target,
            "artist": changes,
        }
    )


def _seed_artist(session: Session, **overrides: object) -> Artist:
    artist = create_artist(session, _payload(_full_payload(**overrides)))
    session.flush()
    return artist


def _run(session: Session, edition_slug: str, run_slug: str) -> FestivalRun:
    return session.scalar(
        select(FestivalRun)
        .join(FestivalEdition)
        .where(FestivalEdition.slug == edition_slug, FestivalRun.slug == run_slug)
    )


def test_edit_about_reclears_then_restamps_verification(session: Session) -> None:
    artist = _seed_artist(session)
    assert artist.about_verified_at is not None

    # Change About without re-verifying: the trigger clears the stamp.
    summary = edit_artist(session, _edit(artist.slug, about="Rewritten about."))
    assert artist.about == "Rewritten about."
    assert artist.about_verified_at is None
    assert {c.group for c in summary.changed} == {"about", "aboutVerified"}

    # Change again and re-verify in the same patch.
    edit_artist(session, _edit(artist.slug, about="Final about.", aboutVerified=True))
    assert artist.about == "Final about."
    assert artist.about_verified_at is not None


def test_edit_social_url_reclears_then_restamps(session: Session) -> None:
    artist = _seed_artist(session)
    assert artist.socials_verified is True

    edit_artist(
        session, _edit(artist.slug, socials={"tiktok": "https://tiktok.com/@x"})
    )
    assert artist.tiktok_url == "https://tiktok.com/@x"
    assert artist.socials_verified is False

    edit_artist(
        session,
        _edit(
            artist.slug,
            socials={"youtube": None, "tiktok": None},
            socialsVerified=True,
        ),
    )
    assert artist.youtube_url is None and artist.tiktok_url is None
    assert artist.socials_verified is True  # reviewed-empty is valid


def test_edit_image_set_then_cleared(session: Session) -> None:
    artist = _seed_artist(
        session,
        imageVerified=False,
        imageUrl=None,
        objectPosition=None,
        imageTakenYear=None,
        imageSourcedAt=None,
    )
    assert artist.image_url is None

    edit_artist(
        session,
        _edit(
            artist.slug,
            imageUrl="/artists/global/new.jpg",
            imageVerified=True,
            objectPosition="center 20%",
            imageTakenYear=2021,
            imageSourcedAt="2026-03-01",
        ),
    )
    assert artist.image_url == "/artists/global/new.jpg"
    assert artist.image_focal_y_percent == 20
    assert artist.image_taken_year == 2021
    assert artist.image_sourced_at.isoformat() == "2026-03-01"

    edit_artist(session, _edit(artist.slug, imageUrl=None))
    assert artist.image_url is None
    assert artist.image_focal_y_percent is None
    assert artist.image_credit_author is None
    assert artist.image_taken_year is None
    assert artist.image_sourced_at is None


def test_edit_featured_video_replaced_then_cleared(session: Session) -> None:
    artist = _seed_artist(session)
    assert artist.videos[0].youtube_video_id == "abc12345678"

    edit_artist(
        session,
        _edit(artist.slug, liveVideoId="zzz99999999", liveVideoLabel="New clip"),
    )
    assert [v.youtube_video_id for v in artist.videos] == ["zzz99999999"]

    edit_artist(session, _edit(artist.slug, liveVideoId=None))
    assert artist.videos == []


def test_edit_genres_replaced_and_reapply_is_a_no_op(session: Session) -> None:
    artist = _seed_artist(session)
    new_genres = ["Art Pop", "Electropop", "Alt-Pop"]  # reorder of the seeded set

    summary = edit_artist(session, _edit(artist.slug, genres=new_genres))
    assert [a.genre.name for a in artist.genre_assignments] == new_genres
    assert [a.is_primary for a in artist.genre_assignments] == [True, False, False]
    assert [c.group for c in summary.changed] == ["genres"]

    again = edit_artist(session, _edit(artist.slug, genres=new_genres))
    assert again.changed == []


def test_edit_listening_selections_replaced(session: Session) -> None:
    artist = _seed_artist(session)
    edit_artist(
        session,
        _edit(
            artist.slug,
            tracks=[
                {"spotifyId": "6ie2Bw3xLj2JcGowOlcMhb", "name": "Green Light"},
                {"spotifyId": RIBS, "name": "Ribs"},
                {"spotifyId": "1gvOEwQbIEjkpLdcZwtBoB", "name": "Man Of The Year"},
            ],
            listenFirst={"mode": "tracks", "note": "New order."},
        ),
    )
    quick = [s for s in artist.track_selections if s.is_quick_picks]
    assert len(quick) == 1
    assert quick[0].track.spotify_track_id == "6ie2Bw3xLj2JcGowOlcMhb"
    assert artist.listen_first_note == "New order."

    same = edit_artist(
        session,
        _edit(
            artist.slug,
            tracks=[
                {"spotifyId": "6ie2Bw3xLj2JcGowOlcMhb", "name": "Green Light"},
                {"spotifyId": RIBS, "name": "Ribs"},
                {"spotifyId": "1gvOEwQbIEjkpLdcZwtBoB", "name": "Man Of The Year"},
            ],
            listenFirst={"mode": "tracks", "note": "New order."},
        ),
    )
    assert same.changed == []


def test_edit_similar_set_replaced_restamps_and_unchanged_is_untouched(
    session: Session,
) -> None:
    artist = _seed_artist(session)
    original = artist.similarity_sets[0]
    assert original.verified_at is not None
    stamped_at = original.verified_at

    replacement = ["charli-xcx", "the-xx", "the-smashing-pumpkins", "lorde"]
    edit_artist(
        session,
        _edit(
            artist.slug,
            similarArtists=[{"slug": s} for s in replacement],
            similarArtistsVerified=True,
        ),
    )
    session.expire_all()
    refreshed = artist.similarity_sets[0]
    assert [e.target_artist.slug for e in refreshed.entries] == replacement
    assert refreshed.verified_at is not None and refreshed.verified_at > stamped_at

    unchanged = edit_artist(
        session,
        _edit(
            artist.slug,
            similarArtists=[{"slug": s} for s in replacement],
            similarArtistsVerified=True,
        ),
    )
    assert unchanged.changed == []


def test_edit_slug_clash_with_other_artist_is_refused(session: Session) -> None:
    artist = _seed_artist(session)
    with pytest.raises(ArtistAuthoringError, match="already belongs to another artist"):
        edit_artist(session, _edit(artist.slug, slug="5sos"))

    # Re-submitting the artist's own slug is a clean no-op.
    assert edit_artist(session, _edit(artist.slug, slug=artist.slug)).changed == []


def test_edit_refuses_unknown_references(session: Session) -> None:
    artist = _seed_artist(session)
    with pytest.raises(ArtistAuthoringError, match="unknown genre"):
        edit_artist(session, _edit(artist.slug, genres=["Alt-Pop", "Nope", "Art Pop"]))
    with pytest.raises(ArtistAuthoringError, match="does not exist"):
        edit_artist(
            session,
            ArtistEditInput.model_validate(
                {
                    "schemaVersion": 1,
                    "edition": "lollapalooza-2026",
                    "run": "main",
                    "slug": "no-such-artist",
                    "artist": {"about": "x"},
                }
            ),
        )


def test_edit_refuses_unknown_edition_or_run(session: Session) -> None:
    artist = _seed_artist(session)
    for edition, run, expected in (
        ("no-such-edition", "main", "festival edition"),
        ("lollapalooza-2026", "no-such-run", "festival run"),
    ):
        with pytest.raises(ArtistAuthoringError, match=expected):
            edit_artist(
                session,
                ArtistEditInput.model_validate(
                    {
                        "schemaVersion": 1,
                        "edition": edition,
                        "run": run,
                        "slug": artist.slug,
                        "artist": {"about": "x"},
                    }
                ),
            )


def test_edit_recomputes_publication_readiness_on_a_draft(session: Session) -> None:
    # A draft artist may be edited into a not-ready state; readiness is recomputed.
    artist = _seed_artist(session)
    assert artist.publication_status == "draft"
    assert evaluate_artist_publication(artist).is_ready

    edit_artist(session, _edit(artist.slug, genres=["Alt-Pop"]))
    issues = {i.value for i in evaluate_artist_publication(artist).issues}
    assert "invalid_genre_set" in issues


def test_edit_blocks_making_a_published_artist_unpublishable(session: Session) -> None:
    artist = _seed_artist(session)
    artist.publication_status = "published"
    session.flush()

    # The service raises before returning; the caller (CLI) then rolls back, exactly
    # like the other refusal cases in this file.
    with pytest.raises(ArtistAuthoringError, match="publication readiness"):
        edit_artist(session, _edit(artist.slug, genres=["Alt-Pop"]))


def test_edit_allowed_when_a_published_artist_stays_ready(session: Session) -> None:
    artist = _seed_artist(session)
    artist.publication_status = "published"
    session.flush()

    summary = edit_artist(session, _edit(artist.slug, about="Fresh copy."))
    assert "about" in {c.group for c in summary.changed}
    assert artist.about == "Fresh copy."


def test_edit_does_not_trap_an_already_unpublishable_published_artist(
    session: Session,
) -> None:
    artist = _seed_artist(session)
    artist.genre_assignments.pop()  # drop to 2 genres — below the bar
    artist.publication_status = "published"  # forced past the readiness gate
    session.flush()
    assert not evaluate_artist_publication(artist).is_ready

    # An unrelated edit is still allowed; the invariant only protects a record that
    # currently meets the bar.
    edit_artist(session, _edit(artist.slug, about="Still editable."))
    assert artist.about == "Still editable."


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


# --- add an existing artist to another run ---------------------------


def _acl_payload(slug: str, **overrides: object) -> ArtistAuthoringInput:
    """A weekend-1 ACL 2026 authoring payload for an artist that already exists.
    Only the run target, slug, and appearances matter to `add_existing_artist_to_run`;
    the rest of `_full_payload`'s global fields are ignored on this path."""
    artist_fields: dict[str, object] = {
        "slug": slug,
        "appearances": [
            {
                "billingTier": "Headliner",
                "stage": "T-Mobile",
                "day": "Friday",
                "date": "Oct 2",
                "startTime": "8:30 PM",
                "endTime": "10:00 PM",
            }
        ],
    }
    artist_fields.update(overrides)
    data = _full_payload(**artist_fields)
    data["edition"] = "acl-2026"
    data["run"] = "weekend-1"
    return _payload(data)


def test_add_existing_artist_to_a_second_run(session: Session) -> None:
    artist = _seed_artist(session)  # lollapalooza-2026 / main
    original_id = artist.id

    entry = add_existing_artist_to_run(session, _acl_payload(artist.slug))
    session.flush()

    assert entry.artist_id == original_id
    assert (
        session.scalar(
            select(func.count()).select_from(Artist).where(Artist.slug == artist.slug)
        )
        == 1
    )
    runs = {
        e.festival_run.slug
        for e in session.scalars(
            select(LineupEntry).where(LineupEntry.artist_id == original_id)
        )
    }
    assert runs == {"main", "weekend-1"}
    assert entry.festival_run.festival_edition.slug == "acl-2026"
    assert entry.lineup_status == "announced" and entry.billing_tier == "headliner"
    assert len(entry.appearances) == 1
    assert entry.appearances[0].appearance_status == "scheduled"
    assert entry.appearances[0].festival_day.date.isoformat() == "2026-10-02"


def test_add_existing_artist_refuses_unknown_slug(session: Session) -> None:
    with pytest.raises(ArtistAuthoringError, match="does not exist"):
        add_existing_artist_to_run(session, _acl_payload(f"test-{uuid4().hex[:12]}"))


def test_add_existing_artist_refuses_duplicate_run_membership(
    session: Session,
) -> None:
    artist = _seed_artist(session)
    add_existing_artist_to_run(session, _acl_payload(artist.slug))
    session.flush()

    with pytest.raises(ArtistAuthoringError, match="already in run"):
        add_existing_artist_to_run(session, _acl_payload(artist.slug))


def test_add_existing_artist_rejects_an_appearance_outside_the_target_run(
    session: Session,
) -> None:
    # 'Jul 30' is a real Lollapalooza main day, but not an ACL weekend-1 day:
    # _attach_appearances resolves days from the entry's own run.
    artist = _seed_artist(session)
    payload = _acl_payload(
        artist.slug,
        appearances=[
            {
                "billingTier": "Headliner",
                "stage": "T-Mobile",
                "day": "Thursday",
                "date": "Jul 30",
                "startTime": "8:30 PM",
                "endTime": "10:00 PM",
            }
        ],
    )
    with pytest.raises(
        ArtistAuthoringError,
        match="no festival day for 2026-07-30 in run 'weekend-1'",
    ):
        add_existing_artist_to_run(session, payload)


# --- editorial pipeline tooling ---------------------------------------


def _roster_row(**overrides: str) -> dict[str, str]:
    row = {
        "slug": f"test-{uuid4().hex[:12]}",
        "name": "Roster Skeleton",
        "spotify_url": f"https://open.spotify.com/artist/{_spotify_id()}",
        "youtube_url": "",
        "tiktok_url": "",
        "mbid": "",
        "billing_tier": "Undercard",
        "stage": "T-Mobile",
        "date": "Jul 30",
        "start_time": "2:00 PM",
        "end_time": "3:00 PM",
    }
    row.update(overrides)
    return row


def test_roster_skeleton_persists_as_a_draft_with_schedule(session: Session) -> None:
    row = _roster_row()
    payloads, errors = parse_roster(
        [row], edition="lollapalooza-2026", run="main", year=2026
    )
    assert errors == []

    outcomes = create_from_payloads(
        session, payloads, _run(session, "lollapalooza-2026", "main"), apply=False
    )
    assert [(o.slug, o.status) for o in outcomes] == [(row["slug"], "would create")]
    # readiness gaps are expected for a skeleton
    assert "missing_location" in outcomes[0].readiness_issues

    # prove the built payload actually creates the graph
    artist = create_artist(session, _payload(payloads[row["slug"]]))
    session.flush()
    assert artist.publication_status == "draft"
    assert artist.socials_verified is True
    lineup = artist.lineup_entries[0]
    assert lineup.lineup_status == "announced" and lineup.billing_tier == "undercard"
    assert lineup.appearances[0].festival_day.date.strftime("%A") == "Thursday"


def test_roster_batch_isolates_a_failed_row_and_skips_an_existing_slug(
    session: Session,
) -> None:
    good = _roster_row()
    bad = _roster_row(stage="No Such Stage")
    existing = _roster_row(slug="5sos")  # a seeded artist

    payloads, errors = parse_roster(
        [good, bad, existing], edition="lollapalooza-2026", run="main", year=2026
    )
    assert errors == []

    outcomes = {
        o.slug: o.status
        for o in create_from_payloads(
            session, payloads, _run(session, "lollapalooza-2026", "main"), apply=False
        )
    }
    assert outcomes[good["slug"]] == "would create"
    assert outcomes[bad["slug"]] == "failed"
    assert outcomes["5sos"] == "skipped"  # already in lollapalooza-2026/main


def test_roster_apply_commits_and_a_rerun_skips(session: Session) -> None:
    row = _roster_row()
    payloads, _ = parse_roster(
        [row], edition="lollapalooza-2026", run="main", year=2026
    )

    main_run = _run(session, "lollapalooza-2026", "main")
    first = create_from_payloads(session, payloads, main_run, apply=True)
    assert first[0].status == "created"
    assert session.scalar(select(Artist).where(Artist.slug == row["slug"])) is not None

    payloads_again, _ = parse_roster(
        [row], edition="lollapalooza-2026", run="main", year=2026
    )
    second = create_from_payloads(session, payloads_again, main_run, apply=True)
    assert second[0].status == "skipped"  # now exists and is in this run


def test_roster_adds_an_existing_artist_to_a_different_run(session: Session) -> None:
    artist = _seed_artist(session)  # lollapalooza-2026 / main
    artist_id = artist.id
    session.commit()  # a preview run rolls back, so commit the seeded artist first
    row = _roster_row(slug=artist.slug, date="Oct 2")

    payloads, errors = parse_roster(
        [row], edition="acl-2026", run="weekend-1", year=2026
    )
    assert errors == []
    weekend_1 = _run(session, "acl-2026", "weekend-1")

    preview = create_from_payloads(session, payloads, weekend_1, apply=False)
    assert preview[0].status == "would add to run"

    payloads_apply, _ = parse_roster(
        [row], edition="acl-2026", run="weekend-1", year=2026
    )
    applied = create_from_payloads(session, payloads_apply, weekend_1, apply=True)
    assert applied[0].status == "added to run"
    entries = session.scalars(
        select(LineupEntry).where(LineupEntry.artist_id == artist_id)
    ).all()
    assert {e.festival_run.slug for e in entries} == {"main", "weekend-1"}

    payloads_again, _ = parse_roster(
        [row], edition="acl-2026", run="weekend-1", year=2026
    )
    rerun = create_from_payloads(session, payloads_again, weekend_1, apply=True)
    assert rerun[0].status == "skipped"


# --- staged import: roster-only rows and attach-schedule -------------


def _announced_row(**overrides: str) -> dict[str, str]:
    """A roster CSV row with no schedule columns -> an announced entry."""
    row = {
        "slug": f"test-{uuid4().hex[:12]}",
        "name": "Announced Skeleton",
        "spotify_url": f"https://open.spotify.com/artist/{_spotify_id()}",
        "youtube_url": "",
        "tiktok_url": "",
        "mbid": "",
        "billing_tier": "Sub-headliner",
    }
    row.update(overrides)
    return row


def test_roster_only_row_creates_an_announced_entry(session: Session) -> None:
    row = _announced_row()
    payloads, errors = parse_roster(
        [row], edition="acl-2026", run="weekend-1", year=2026
    )
    assert errors == []
    assert payloads[row["slug"]]["billingTier"] == "Sub-headliner"
    assert payloads[row["slug"]]["artist"]["appearances"] == []

    weekend_1 = _run(session, "acl-2026", "weekend-1")
    outcomes = create_from_payloads(session, payloads, weekend_1, apply=True)
    assert (outcomes[0].status, outcomes[0].detail) == ("created", "announced entry")

    lineup = session.scalar(
        select(LineupEntry).join(Artist).where(Artist.slug == row["slug"])
    )
    assert lineup.lineup_status == "announced"
    assert lineup.billing_tier == "sub_headliner"
    assert lineup.appearances == []


def test_two_stage_import_attaches_a_schedule_to_an_announced_entry(
    session: Session,
) -> None:
    slug = f"test-{uuid4().hex[:12]}"
    spotify = f"https://open.spotify.com/artist/{_spotify_id()}"
    weekend_1 = _run(session, "acl-2026", "weekend-1")

    # Stage 1: roster only.
    roster_payloads, _ = parse_roster(
        [_announced_row(slug=slug, billing_tier="Headliner", spotify_url=spotify)],
        edition="acl-2026",
        run="weekend-1",
        year=2026,
    )
    assert (
        create_from_payloads(session, roster_payloads, weekend_1, apply=True)[0].status
        == "created"
    )

    # Stage 2: the full schedule CSV.
    schedule_row = _roster_row(
        slug=slug,
        name="Announced Skeleton",
        spotify_url=spotify,
        billing_tier="Headliner",
        stage="T-Mobile",
        date="Oct 2",
        start_time="8:30 PM",
        end_time="10:00 PM",
    )
    schedule_payloads, errors = parse_roster(
        [schedule_row], edition="acl-2026", run="weekend-1", year=2026
    )
    assert errors == []

    preview = create_from_payloads(session, schedule_payloads, weekend_1, apply=False)
    assert preview[0].status == "would schedule"

    schedule_payloads, _ = parse_roster(
        [schedule_row], edition="acl-2026", run="weekend-1", year=2026
    )
    applied = create_from_payloads(session, schedule_payloads, weekend_1, apply=True)
    assert applied[0].status == "scheduled"

    lineup = session.scalar(select(LineupEntry).join(Artist).where(Artist.slug == slug))
    assert lineup.lineup_status == "announced"  # unchanged
    assert len(lineup.appearances) == 1
    assert lineup.appearances[0].appearance_status == "scheduled"

    # A third pass is a no-op.
    schedule_payloads, _ = parse_roster(
        [schedule_row], edition="acl-2026", run="weekend-1", year=2026
    )
    rerun = create_from_payloads(session, schedule_payloads, weekend_1, apply=True)
    assert rerun[0].status == "skipped"


def test_attach_run_schedule_rejects_a_billing_mismatch(session: Session) -> None:
    slug = f"test-{uuid4().hex[:12]}"
    data = _full_payload(slug=slug, appearances=[])
    data["billingTier"] = "Headliner"
    data["edition"], data["run"] = "acl-2026", "weekend-1"
    create_artist(session, _payload(data))
    session.flush()

    schedule = _acl_payload(
        slug,
        appearances=[
            {
                "billingTier": "Undercard",
                "stage": "T-Mobile",
                "day": "Friday",
                "date": "Oct 2",
                "startTime": "8:30 PM",
                "endTime": "10:00 PM",
            }
        ],
    )
    with pytest.raises(ArtistAuthoringError, match="billing tier mismatch"):
        attach_run_schedule(session, schedule)


def test_two_stage_import_inherits_billing_when_the_schedule_csv_omits_it(
    session: Session,
) -> None:
    slug = f"test-{uuid4().hex[:12]}"
    spotify = f"https://open.spotify.com/artist/{_spotify_id()}"
    weekend_1 = _run(session, "acl-2026", "weekend-1")

    roster_payloads, _ = parse_roster(
        [_announced_row(slug=slug, billing_tier="Headliner", spotify_url=spotify)],
        edition="acl-2026",
        run="weekend-1",
        year=2026,
    )
    create_from_payloads(session, roster_payloads, weekend_1, apply=True)

    # The schedule CSV carries no billing_tier column at all.
    schedule_row = {
        "slug": slug,
        "name": "Announced Skeleton",
        "spotify_url": spotify,
        "stage": "T-Mobile",
        "date": "Oct 2",
        "start_time": "8:30 PM",
        "end_time": "10:00 PM",
    }
    schedule_payloads, errors = parse_roster(
        [schedule_row], edition="acl-2026", run="weekend-1", year=2026
    )
    assert errors == []
    applied = create_from_payloads(session, schedule_payloads, weekend_1, apply=True)
    assert applied[0].status == "scheduled"

    lineup = session.scalar(select(LineupEntry).join(Artist).where(Artist.slug == slug))
    assert lineup.billing_tier == "headliner"  # inherited from the announced entry
    assert len(lineup.appearances) == 1


def test_attach_run_schedule_refuses_an_artist_not_in_the_run(session: Session) -> None:
    artist = _seed_artist(session)  # lollapalooza-2026 / main only
    with pytest.raises(ArtistAuthoringError, match="is not in run 'weekend-1'"):
        attach_run_schedule(session, _acl_payload(artist.slug))


def test_attach_run_schedule_refuses_a_run_that_already_has_a_schedule(
    session: Session,
) -> None:
    artist = _seed_artist(session)
    add_existing_artist_to_run(session, _acl_payload(artist.slug))
    session.flush()
    with pytest.raises(ArtistAuthoringError, match="already has a schedule"):
        attach_run_schedule(session, _acl_payload(artist.slug))


def test_attach_run_schedule_needs_appearances(session: Session) -> None:
    data = _full_payload(appearances=[])
    data["billingTier"] = "Headliner"
    data["edition"], data["run"] = "acl-2026", "weekend-1"
    with pytest.raises(ArtistAuthoringError, match="needs appearances"):
        attach_run_schedule(session, _payload(data))


def test_show_artist_detail_and_roster_render(
    session: Session, capsys: pytest.CaptureFixture[str]
) -> None:
    artist = _seed_artist(session)
    session.commit()

    assert _render_detail(session, artist.slug) == 0
    detail = capsys.readouterr().out
    assert artist.slug in detail
    assert "Publication readiness: READY." in detail
    assert "cited as similar by" in detail

    assert _render_roster(session, sort="similar-count", include_drafts=True) == 0
    roster = capsys.readouterr().out
    assert artist.slug in roster
