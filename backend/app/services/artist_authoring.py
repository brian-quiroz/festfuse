"""Create and hard-delete a single artist directly in PostgreSQL.

The service layer for the artist authoring workflow (ADR-0011). Pure unit-of-work
functions that never commit — the caller owns the transaction, matching
``publish_ready_artists``. Thin CLIs wrap these in ``backend/scripts/``.
"""

from dataclasses import dataclass, field
from datetime import UTC, datetime

from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.lib.artist_source import (
    BILLING_TIERS,
    parse_appearance_time,
    parse_focal_y,
    parse_spotify_artist_id,
)
from app.models import (
    Appearance,
    Artist,
    ArtistGenre,
    ArtistTrackSelection,
    ArtistVideo,
    FestivalDay,
    FestivalEdition,
    FestivalRun,
    Genre,
    LineupEntry,
    SimilarArtist,
    SimilarArtistSet,
    Stage,
    Track,
)
from app.schemas.artist_authoring import (
    AppearanceInput,
    ArtistAuthoringInput,
    ListenFirstInput,
    TrackInput,
)


class ArtistAuthoringError(RuntimeError):
    """A create or delete request that cannot be satisfied against the database."""


@dataclass
class DeletionSummary:
    slug: str
    genres: int = 0
    track_selections: int = 0
    videos: int = 0
    similar_artist_sets: int = 0
    lineup_entries: int = 0
    appearances: int = 0
    cleared_incoming_similar_refs: list[str] = field(default_factory=list)


def _resolve_run(session: Session, edition_slug: str, run_slug: str) -> FestivalRun:
    edition = session.scalar(
        select(FestivalEdition).where(FestivalEdition.slug == edition_slug)
    )
    if edition is None:
        raise ArtistAuthoringError(f"festival edition {edition_slug!r} does not exist")
    run = session.scalar(
        select(FestivalRun).where(
            FestivalRun.festival_edition_id == edition.id,
            FestivalRun.slug == run_slug,
        )
    )
    if run is None:
        raise ArtistAuthoringError(
            f"festival run {run_slug!r} does not exist for edition {edition_slug!r}"
        )
    return run


def _reject_taken_identity(
    session: Session,
    slug: str,
    mbid: str | None,
    spotify_artist_id: str | None,
) -> None:
    """Pre-check the unique identity columns so a clash is a clear error, not a raw
    IntegrityError at flush time. ``create_artist`` is create-only."""
    if session.scalar(select(Artist.id).where(Artist.slug == slug)):
        raise ArtistAuthoringError(
            f"artist {slug!r} already exists — this is a create-only operation"
        )
    if mbid is not None and session.scalar(
        select(Artist.slug).where(Artist.mbid == mbid)
    ):
        raise ArtistAuthoringError(f"mbid {mbid} already belongs to another artist")
    if spotify_artist_id is not None and (
        owner := session.scalar(
            select(Artist.slug).where(Artist.spotify_artist_id == spotify_artist_id)
        )
    ):
        raise ArtistAuthoringError(
            f"Spotify artist id {spotify_artist_id} already belongs to {owner!r}"
        )


def _resolve_genres(session: Session, names: list[str]) -> list[Genre]:
    by_name = {
        genre.name: genre
        for genre in session.scalars(select(Genre).where(Genre.name.in_(names)))
    }
    missing = [name for name in names if name not in by_name]
    if missing:
        raise ArtistAuthoringError(
            "unknown genre(s): "
            + ", ".join(repr(name) for name in missing)
            + " — add them to the genres table first"
        )
    return [by_name[name] for name in names]


def _resolve_similar_targets(session: Session, slugs: list[str]) -> dict[str, Artist]:
    by_slug = {
        artist.slug: artist
        for artist in session.scalars(select(Artist).where(Artist.slug.in_(slugs)))
    }
    missing = [slug for slug in slugs if slug not in by_slug]
    if missing:
        raise ArtistAuthoringError(
            "unknown similar-artist target(s): "
            + ", ".join(repr(slug) for slug in missing)
        )
    return by_slug


def _resolve_billing_tier(payload: ArtistAuthoringInput) -> str | None:
    """The single stored LineupEntry.billing_tier, or None for a draft entry."""
    labels = {
        appearance.billing_tier
        for appearance in payload.artist.appearances
        if appearance.billing_tier
    }
    if payload.billing_tier:
        labels.add(payload.billing_tier)
    if len(labels) > 1:
        raise ArtistAuthoringError(
            "conflicting billing tiers: " + ", ".join(sorted(labels))
        )
    if not labels:
        if payload.artist.appearances:
            raise ArtistAuthoringError(
                "appearances present but no billing tier — set billingTier on the "
                "wrapper or on every appearance"
            )
        return None
    return BILLING_TIERS[labels.pop()]


def _build_track_selections(
    payload_tracks: list[TrackInput], listen_first: ListenFirstInput | None
) -> dict[str, dict]:
    """spotify_track_id -> {name, is_quick_picks, listen_first_order}."""
    selections: dict[str, dict] = {}
    if payload_tracks:
        first = payload_tracks[0]
        selections[first.spotify_id] = {
            "name": first.name,
            "is_quick_picks": True,
            "listen_first_order": None,
        }
    if listen_first is not None:
        for order, track in enumerate(payload_tracks, start=1):
            entry = selections.setdefault(
                track.spotify_id,
                {
                    "name": track.name,
                    "is_quick_picks": False,
                    "listen_first_order": None,
                },
            )
            entry["listen_first_order"] = order
    return selections


def create_artist(session: Session, payload: ArtistAuthoringInput) -> Artist:
    """Create one artist and its owned rows for an existing run. Does not commit."""
    artist_input = payload.artist
    now = datetime.now(UTC)

    run = _resolve_run(session, payload.edition, payload.run)
    edition = run.festival_edition

    spotify_artist_id = parse_spotify_artist_id(artist_input.socials.spotify)
    _reject_taken_identity(
        session, artist_input.slug, artist_input.mbid, spotify_artist_id
    )

    genres = _resolve_genres(session, artist_input.genres)
    similar_targets = (
        _resolve_similar_targets(
            session, [entry.slug for entry in artist_input.similar_artists]
        )
        if artist_input.similar_artists_verified and artist_input.similar_artists
        else {}
    )
    billing_tier = _resolve_billing_tier(payload)

    image_approved = bool(artist_input.image_verified)
    credit = artist_input.image_credit if image_approved else None
    socials = artist_input.socials

    # Build the object graph with autoflush off: the Track/Stage/FestivalDay lookups
    # below read existing rows and must not flush the half-built artist first.
    with session.no_autoflush:
        artist = Artist(
            slug=artist_input.slug,
            name=artist_input.name,
            mbid=artist_input.mbid,
            spotify_artist_id=spotify_artist_id,
            image_url=artist_input.image_url if image_approved else None,
            image_focal_y_percent=(
                parse_focal_y(artist_input.object_position) if image_approved else None
            ),
            image_credit_author=credit.author if credit else None,
            image_source_url=credit.source_url if credit else None,
            image_license_url=credit.license_url if credit else None,
            location_city=artist_input.location.city if artist_input.location else None,
            location_state=(
                artist_input.location.state if artist_input.location else None
            ),
            location_country=(
                artist_input.location.country if artist_input.location else None
            ),
            about=artist_input.about,
            about_verified_at=now if artist_input.about_verified else None,
            youtube_url=socials.youtube,
            tiktok_url=socials.tiktok,
            socials_verified=bool(artist_input.socials_verified),
            listen_first_note=(
                artist_input.listen_first.note if artist_input.listen_first else None
            ),
            publication_status="draft",
        )
        session.add(artist)

        for order, genre in enumerate(genres, start=1):
            artist.genre_assignments.append(
                ArtistGenre(genre=genre, display_order=order, is_primary=order == 1)
            )

        for spotify_track_id, selection in _build_track_selections(
            artist_input.tracks, artist_input.listen_first
        ).items():
            track = session.scalar(
                select(Track).where(Track.spotify_track_id == spotify_track_id)
            ) or Track(spotify_track_id=spotify_track_id, name=selection["name"])
            artist.track_selections.append(
                ArtistTrackSelection(
                    track=track,
                    is_quick_picks=selection["is_quick_picks"],
                    listen_first_order=selection["listen_first_order"],
                )
            )

        if artist_input.live_video_id:
            artist.videos.append(
                ArtistVideo(
                    youtube_video_id=artist_input.live_video_id,
                    label=artist_input.live_video_label,
                    is_featured=True,
                    display_order=1,
                    is_available=True,
                    last_checked_at=now,
                )
            )

        lineup_entry = LineupEntry(
            festival_run=run,
            artist=artist,
            lineup_status="announced" if billing_tier else "draft",
            billing_tier=billing_tier,
        )
        _attach_appearances(
            session, lineup_entry, run, edition, artist_input.appearances
        )
        session.add(lineup_entry)
    session.flush()

    if similar_targets:
        similarity_set = SimilarArtistSet(
            festival_run=run, source_artist=artist, verified_at=None
        )
        for order, entry in enumerate(artist_input.similar_artists, start=1):
            similarity_set.entries.append(
                SimilarArtist(
                    target_artist=similar_targets[entry.slug], display_order=order
                )
            )
        session.add(similarity_set)
        session.flush()
        # The AFTER INSERT trigger on similar_artists clears verified_at, so stamp it
        # only after every entry exists (mirrors import_source).
        similarity_set.verified_at = now
        session.flush()

    return artist


def _attach_appearances(
    session: Session,
    lineup_entry: LineupEntry,
    run: FestivalRun,
    edition: FestivalEdition,
    appearances: list[AppearanceInput],
) -> None:
    if not appearances:
        return

    stage_names = {appearance.stage for appearance in appearances}
    stages = {
        stage.name: stage
        for stage in session.scalars(
            select(Stage).where(
                Stage.festival_edition_id == edition.id,
                Stage.name.in_(stage_names),
            )
        )
    }
    missing_stages = [name for name in stage_names if name not in stages]
    if missing_stages:
        raise ArtistAuthoringError(
            f"unknown stage(s) for edition {edition.slug!r}: "
            + ", ".join(repr(name) for name in missing_stages)
        )

    days_by_date = {
        day.date: day
        for day in session.scalars(
            select(FestivalDay).where(FestivalDay.festival_run_id == run.id)
        )
    }

    for appearance in appearances:
        starts_at = parse_appearance_time(
            appearance.date,
            appearance.start_time,
            year=edition.year,
            timezone=edition.timezone,
        )
        ends_at = parse_appearance_time(
            appearance.date,
            appearance.end_time,
            year=edition.year,
            timezone=edition.timezone,
        )
        if ends_at <= starts_at:
            raise ArtistAuthoringError(
                f"appearance on {appearance.date} has a non-positive duration"
            )
        day = days_by_date.get(starts_at.date())
        if day is None:
            raise ArtistAuthoringError(
                f"no festival day for {starts_at.date()} in run {run.slug!r}"
            )
        lineup_entry.appearances.append(
            Appearance(
                festival_day=day,
                stage=stages[appearance.stage],
                starts_at=starts_at,
                ends_at=ends_at,
                appearance_status="scheduled",
            )
        )


def delete_artist(session: Session, slug: str, *, force: bool) -> DeletionSummary:
    """Hard-delete one artist and its owned rows. Does not commit.

    Refuses if the artist is a Similar Artist *target* of another artist's set unless
    ``force`` is set, in which case those incoming references are removed first.
    """
    artist = session.scalar(
        select(Artist)
        .where(Artist.slug == slug)
        .options(
            selectinload(Artist.genre_assignments),
            selectinload(Artist.track_selections),
            selectinload(Artist.videos),
            selectinload(Artist.similarity_sets).selectinload(SimilarArtistSet.entries),
            selectinload(Artist.lineup_entries).selectinload(LineupEntry.appearances),
        )
    )
    if artist is None:
        raise ArtistAuthoringError(f"artist {slug!r} does not exist")

    incoming = list(
        session.scalars(
            select(SimilarArtist)
            .where(SimilarArtist.target_artist_id == artist.id)
            .options(
                selectinload(SimilarArtist.similarity_set).selectinload(
                    SimilarArtistSet.source_artist
                )
            )
        )
    )
    referencing_slugs = sorted(
        {ref.similarity_set.source_artist.slug for ref in incoming}
    )
    if incoming and not force:
        raise ArtistAuthoringError(
            f"{slug!r} is a similar-artist target of: {', '.join(referencing_slugs)}. "
            "Re-run with force to clear those references."
        )

    summary = DeletionSummary(
        slug=slug,
        genres=len(artist.genre_assignments),
        track_selections=len(artist.track_selections),
        videos=len(artist.videos),
        similar_artist_sets=len(artist.similarity_sets),
        lineup_entries=len(artist.lineup_entries),
        appearances=sum(len(entry.appearances) for entry in artist.lineup_entries),
        cleared_incoming_similar_refs=referencing_slugs,
    )

    for ref in incoming:
        session.delete(ref)
    session.flush()

    session.delete(artist)
    session.flush()
    return summary
