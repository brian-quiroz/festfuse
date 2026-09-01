from dataclasses import dataclass
from enum import StrEnum

from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.models import Artist


class ArtistPublicationIssue(StrEnum):
    MISSING_IDENTITY = "missing_identity"
    MISSING_LOCATION = "missing_location"
    INVALID_GENRE_SET = "invalid_genre_set"
    INVALID_PRIMARY_GENRE = "invalid_primary_genre"
    MISSING_QUICK_PICKS = "missing_quick_picks"
    INVALID_QUICK_PICKS = "invalid_quick_picks"
    MISSING_LISTEN_FIRST = "missing_listen_first"
    INCOMPLETE_LISTEN_FIRST = "incomplete_listen_first"
    ORPHANED_LISTEN_FIRST_NOTE = "orphaned_listen_first_note"


@dataclass(frozen=True)
class ArtistPublicationReadiness:
    issues: tuple[ArtistPublicationIssue, ...]

    @property
    def is_ready(self) -> bool:
        return not self.issues


@dataclass(frozen=True)
class ArtistPublicationCandidate:
    artist: Artist
    readiness: ArtistPublicationReadiness


@dataclass(frozen=True)
class ArtistPublicationBatch:
    candidates: tuple[ArtistPublicationCandidate, ...]

    @property
    def ready_count(self) -> int:
        return sum(candidate.readiness.is_ready for candidate in self.candidates)

    @property
    def blocked_count(self) -> int:
        return len(self.candidates) - self.ready_count


def has_featured_video(artist: Artist) -> bool:
    """Whether the artist has a usable featured live-performance video (ADR-0017)."""
    return any(video.is_featured and video.is_available for video in artist.videos)


def qualifies_by_video_only(artist: Artist) -> bool:
    """A ready artist carrying its preview solely on a featured video, no audio.

    True when the featured video is the reason MISSING_QUICK_PICKS did not fire: no
    Quick Picks track selection, but a usable featured video. Used by the publish
    report to surface these artists (they publish without an audio preview anywhere).
    """
    has_quick_picks = any(
        selection.is_quick_picks for selection in artist.track_selections
    )
    return not has_quick_picks and has_featured_video(artist)


def evaluate_artist_publication(artist: Artist) -> ArtistPublicationReadiness:
    """Evaluate the current cross-row policy for publishing one Artist.

    Callers must load ``genre_assignments``, ``track_selections``, and ``videos``
    before passing a detached Artist. This function is pure: it reports policy and
    never changes state.

    A publishable artist needs identity, location, a valid genre set, and at least one
    preview: a Spotify artist id, a complete Listen First set, or a featured
    live-performance video (ADR-0017).

    ``about`` and the run-scoped similar-artist set are deliberately *not* readiness
    gates: they are additive editorial layers (ADR-0013) that an artist publishes
    without, and the frontend simply omits the section until each is verified.
    """
    issues: list[ArtistPublicationIssue] = []
    featured_video = has_featured_video(artist)

    if not artist.name.strip() or not artist.slug.strip():
        issues.append(ArtistPublicationIssue.MISSING_IDENTITY)
    if not artist.location_city or not artist.location_country:
        issues.append(ArtistPublicationIssue.MISSING_LOCATION)

    genre_assignments = artist.genre_assignments
    if len(genre_assignments) != 3:
        issues.append(ArtistPublicationIssue.INVALID_GENRE_SET)
    if sum(assignment.is_primary for assignment in genre_assignments) != 1:
        issues.append(ArtistPublicationIssue.INVALID_PRIMARY_GENRE)

    quick_picks = [
        selection for selection in artist.track_selections if selection.is_quick_picks
    ]
    if not quick_picks:
        if not featured_video:
            issues.append(ArtistPublicationIssue.MISSING_QUICK_PICKS)
    elif len(quick_picks) != 1:
        issues.append(ArtistPublicationIssue.INVALID_QUICK_PICKS)

    listen_first = [
        selection
        for selection in artist.track_selections
        if selection.listen_first_order is not None
    ]
    if listen_first:
        listen_first_orders = sorted(
            selection.listen_first_order for selection in listen_first
        )
        if len(listen_first) != 3 or listen_first_orders != [1, 2, 3]:
            issues.append(ArtistPublicationIssue.INCOMPLETE_LISTEN_FIRST)
    else:
        if not artist.spotify_artist_id and not featured_video:
            issues.append(ArtistPublicationIssue.MISSING_LISTEN_FIRST)
        if artist.listen_first_note:
            issues.append(ArtistPublicationIssue.ORPHANED_LISTEN_FIRST_NOTE)

    return ArtistPublicationReadiness(issues=tuple(issues))


def assess_artist_publications(session: Session) -> ArtistPublicationBatch:
    """Load every Artist with the relationships required by publication policy."""
    artists = session.scalars(
        select(Artist)
        .options(
            selectinload(Artist.genre_assignments),
            selectinload(Artist.track_selections),
            selectinload(Artist.videos),
        )
        .order_by(Artist.slug)
    ).all()
    return ArtistPublicationBatch(
        candidates=tuple(
            ArtistPublicationCandidate(
                artist=artist,
                readiness=evaluate_artist_publication(artist),
            )
            for artist in artists
        )
    )


def publish_ready_artists(session: Session) -> ArtistPublicationBatch:
    """Publish every ready Artist without committing the caller's transaction."""
    batch = assess_artist_publications(session)
    for candidate in batch.candidates:
        if candidate.readiness.is_ready:
            candidate.artist.publication_status = "published"
    session.flush()
    return batch
