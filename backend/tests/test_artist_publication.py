from app.models import Artist, ArtistGenre, ArtistTrackSelection, ArtistVideo
from app.services import (
    ArtistPublicationIssue,
    evaluate_artist_publication,
    qualifies_by_video_only,
)


def build_artist(*, spotify_artist_id: str | None = "spotify-artist") -> Artist:
    artist = Artist(
        name="Test Artist",
        slug="test-artist",
        location_city="Chicago",
        location_country="United States",
        spotify_artist_id=spotify_artist_id,
    )
    artist.genre_assignments = [
        ArtistGenre(genre_id=index, display_order=index, is_primary=index == 1)
        for index in range(1, 4)
    ]
    artist.track_selections = [ArtistTrackSelection(track_id=1, is_quick_picks=True)]
    return artist


def test_ordinary_artist_is_ready() -> None:
    readiness = evaluate_artist_publication(build_artist())

    assert readiness.is_ready
    assert readiness.issues == ()


def test_complete_curated_override_is_ready_without_spotify_artist() -> None:
    artist = build_artist(spotify_artist_id=None)
    artist.track_selections = [
        ArtistTrackSelection(
            track_id=index,
            is_quick_picks=index == 1,
            listen_first_order=index,
        )
        for index in range(1, 4)
    ]
    artist.listen_first_note = "Curated for this ensemble."

    readiness = evaluate_artist_publication(artist)

    assert readiness.is_ready


def test_incomplete_artist_reports_every_relevant_issue() -> None:
    artist = Artist(name="", slug="", listen_first_note="No selections exist.")

    readiness = evaluate_artist_publication(artist)

    assert not readiness.is_ready
    assert readiness.issues == (
        ArtistPublicationIssue.MISSING_IDENTITY,
        ArtistPublicationIssue.MISSING_LOCATION,
        ArtistPublicationIssue.INVALID_GENRE_SET,
        ArtistPublicationIssue.INVALID_PRIMARY_GENRE,
        ArtistPublicationIssue.MISSING_QUICK_PICKS,
        ArtistPublicationIssue.MISSING_LISTEN_FIRST,
        ArtistPublicationIssue.ORPHANED_LISTEN_FIRST_NOTE,
    )


def test_partial_curated_override_is_not_ready() -> None:
    artist = build_artist(spotify_artist_id=None)
    artist.track_selections[0].listen_first_order = 1

    readiness = evaluate_artist_publication(artist)

    assert readiness.issues == (ArtistPublicationIssue.INCOMPLETE_LISTEN_FIRST,)


def test_featured_video_is_a_third_readiness_tier() -> None:
    artist = build_artist(spotify_artist_id=None)
    artist.track_selections = []
    artist.videos = [
        ArtistVideo(
            youtube_video_id="live-set",
            label="Live at the park",
            is_featured=True,
            is_available=True,
            display_order=1,
        )
    ]

    readiness = evaluate_artist_publication(artist)

    assert readiness.is_ready
    assert qualifies_by_video_only(artist)


def test_unavailable_featured_video_does_not_qualify() -> None:
    artist = build_artist(spotify_artist_id=None)
    artist.track_selections = []
    artist.videos = [
        ArtistVideo(
            youtube_video_id="dead-link",
            label="Live at the park",
            is_featured=True,
            is_available=False,
            display_order=1,
        )
    ]

    readiness = evaluate_artist_publication(artist)

    assert not readiness.is_ready
    assert readiness.issues == (
        ArtistPublicationIssue.MISSING_QUICK_PICKS,
        ArtistPublicationIssue.MISSING_LISTEN_FIRST,
    )
    assert not qualifies_by_video_only(artist)


def test_artist_with_no_preview_of_any_kind_is_blocked() -> None:
    artist = build_artist(spotify_artist_id=None)
    artist.track_selections = []

    readiness = evaluate_artist_publication(artist)

    assert readiness.issues == (
        ArtistPublicationIssue.MISSING_QUICK_PICKS,
        ArtistPublicationIssue.MISSING_LISTEN_FIRST,
    )
    assert not qualifies_by_video_only(artist)


def test_video_only_check_is_false_when_a_quick_picks_track_exists() -> None:
    artist = build_artist()
    artist.videos = [
        ArtistVideo(
            youtube_video_id="live-set",
            label="Live at the park",
            is_featured=True,
            is_available=True,
            display_order=1,
        )
    ]

    assert evaluate_artist_publication(artist).is_ready
    assert not qualifies_by_video_only(artist)
