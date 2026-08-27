"""Create, edit, and hard-delete a single artist directly in PostgreSQL.

The service layer for the artist authoring workflow (ADR-0011 for create/delete,
ADR-0012 for field-level edits). Pure unit-of-work functions that never commit — the
caller owns the transaction, matching ``publish_ready_artists``. Thin CLIs wrap these
in ``backend/scripts/``.
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
    ArtistEditFields,
    ArtistEditInput,
    ListenFirstInput,
    TrackInput,
)
from app.services.artist_publication import evaluate_artist_publication


class ArtistAuthoringError(RuntimeError):
    """A create, edit, or delete request that cannot be satisfied against the
    database."""


@dataclass
class FieldChange:
    """One field group an edit actually changed, for the CLI preview plan."""

    group: str
    before: str
    after: str


@dataclass
class EditSummary:
    slug: str
    changed: list[FieldChange]


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
    slug: str | None,
    mbid: str | None,
    spotify_artist_id: str | None,
    *,
    exclude_artist_id: int | None = None,
) -> None:
    """Pre-check the unique identity columns so a clash is a clear error, not a raw
    IntegrityError at flush time. ``exclude_artist_id`` skips the row being edited;
    without it (the create path) any match is a clash."""

    def _owner(column) -> str | None:
        query = select(Artist.slug).where(column)
        if exclude_artist_id is not None:
            query = query.where(Artist.id != exclude_artist_id)
        return session.scalar(query)

    if slug is not None and _owner(Artist.slug == slug):
        raise ArtistAuthoringError(
            f"artist {slug!r} already exists — this is a create-only operation"
            if exclude_artist_id is None
            else f"slug {slug!r} already belongs to another artist"
        )
    if mbid is not None and _owner(Artist.mbid == mbid):
        raise ArtistAuthoringError(f"mbid {mbid} already belongs to another artist")
    if spotify_artist_id is not None and (
        owner := _owner(Artist.spotify_artist_id == spotify_artist_id)
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
            image_taken_year=(
                artist_input.image_taken_year if image_approved else None
            ),
            image_sourced_at=(
                artist_input.image_sourced_at if image_approved else None
            ),
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


def _fmt(value: object) -> str:
    if value is None or value == "":
        return "-"
    text = str(value)
    return text if len(text) <= 60 else text[:57] + "..."


def _present(fields: ArtistEditFields, name: str) -> bool:
    return name in fields.model_fields_set


def _load_artist_for_edit(session: Session, slug: str) -> Artist:
    artist = session.scalar(
        select(Artist)
        .where(Artist.slug == slug)
        .options(
            selectinload(Artist.genre_assignments).selectinload(ArtistGenre.genre),
            selectinload(Artist.track_selections).selectinload(
                ArtistTrackSelection.track
            ),
            selectinload(Artist.videos),
        )
    )
    if artist is None:
        raise ArtistAuthoringError(f"artist {slug!r} does not exist")
    return artist


def _require_lineup_entry(session: Session, artist: Artist, run: FestivalRun) -> None:
    entry = session.scalar(
        select(LineupEntry.id).where(
            LineupEntry.artist_id == artist.id,
            LineupEntry.festival_run_id == run.id,
        )
    )
    if entry is None:
        raise ArtistAuthoringError(
            f"artist {artist.slug!r} has no lineup entry in run {run.slug!r}"
        )


def _apply_scalars(artist: Artist, fields: ArtistEditFields) -> list[FieldChange]:
    changes: list[FieldChange] = []
    for attr in ("name", "slug", "mbid"):
        if not _present(fields, attr):
            continue
        new = getattr(fields, attr)
        if getattr(artist, attr) == new:
            continue
        changes.append(FieldChange(attr, _fmt(getattr(artist, attr)), _fmt(new)))
        setattr(artist, attr, new)
    return changes


def _apply_spotify_identity(
    artist: Artist, fields: ArtistEditFields
) -> list[FieldChange]:
    if fields.socials is None or "spotify" not in fields.socials.model_fields_set:
        return []
    new_id = parse_spotify_artist_id(fields.socials.spotify)
    if artist.spotify_artist_id == new_id:
        return []
    change = FieldChange(
        "spotifyArtistId", _fmt(artist.spotify_artist_id), _fmt(new_id)
    )
    artist.spotify_artist_id = new_id
    return [change]


_IMAGE_COLUMNS = (
    "image_url",
    "image_focal_y_percent",
    "image_credit_author",
    "image_source_url",
    "image_license_url",
    "image_taken_year",
    "image_sourced_at",
)


def _apply_image(artist: Artist, fields: ArtistEditFields) -> list[FieldChange]:
    if not _present(fields, "image_url"):
        return []
    # The schema guarantees imageVerified when a URL is present; the group is written
    # or cleared as a unit so ck_artists_image_metadata_requires_image always holds.
    credit = fields.image_credit
    approved = bool(fields.image_url)
    desired = (
        fields.image_url if approved else None,
        parse_focal_y(fields.object_position) if approved else None,
        credit.author if (approved and credit) else None,
        credit.source_url if (approved and credit) else None,
        credit.license_url if (approved and credit) else None,
        fields.image_taken_year if approved else None,
        fields.image_sourced_at if approved else None,
    )
    current = tuple(getattr(artist, column) for column in _IMAGE_COLUMNS)
    if current == desired:
        return []
    for column, value in zip(_IMAGE_COLUMNS, desired, strict=True):
        setattr(artist, column, value)

    def summary(row: tuple) -> str:
        if not row[0]:
            return "-"
        parts = [row[0]]
        if row[1] is not None:
            parts.append(f"focal {row[1]}%")
        if row[5] is not None:
            parts.append(f"taken {row[5]}")
        if row[6] is not None:
            parts.append(f"sourced {row[6]}")
        return ", ".join(str(part) for part in parts)

    return [FieldChange("image", _fmt(summary(current)), _fmt(summary(desired)))]


def _apply_location(artist: Artist, fields: ArtistEditFields) -> list[FieldChange]:
    if not _present(fields, "location"):
        return []
    location = fields.location
    desired = (
        (location.city, location.state, location.country)
        if location
        else (None, None, None)
    )
    current = (
        artist.location_city,
        artist.location_state,
        artist.location_country,
    )
    if current == desired:
        return []
    artist.location_city, artist.location_state, artist.location_country = desired

    def show(parts: tuple[str | None, ...]) -> str:
        return ", ".join(part for part in parts if part) or "-"

    return [FieldChange("location", show(current), show(desired))]


def _apply_genres(
    session: Session,
    artist: Artist,
    fields: ArtistEditFields,
    genres: list[Genre],
) -> list[FieldChange]:
    if not _present(fields, "genres"):
        return []
    current = [assignment.genre.name for assignment in artist.genre_assignments]
    desired = fields.genres or []
    if current == desired:
        return []
    artist.genre_assignments.clear()
    session.flush()  # run the DELETEs before re-inserting (immediate uq on order)
    for order, genre in enumerate(genres, start=1):
        artist.genre_assignments.append(
            ArtistGenre(genre=genre, display_order=order, is_primary=order == 1)
        )
    return [FieldChange("genres", ", ".join(current) or "-", ", ".join(desired) or "-")]


def _selection_shape(
    selections: dict[str, dict],
) -> dict[str, tuple[bool, int | None]]:
    return {
        track_id: (entry["is_quick_picks"], entry["listen_first_order"])
        for track_id, entry in selections.items()
    }


def _apply_listening(
    session: Session, artist: Artist, fields: ArtistEditFields
) -> list[FieldChange]:
    if not _present(fields, "tracks"):
        return []
    desired = _build_track_selections(fields.tracks or [], fields.listen_first)
    current = {
        selection.track.spotify_track_id: {
            "name": selection.track.name,
            "is_quick_picks": selection.is_quick_picks,
            "listen_first_order": selection.listen_first_order,
        }
        for selection in artist.track_selections
    }
    new_note = fields.listen_first.note if fields.listen_first else None
    if (
        _selection_shape(current) == _selection_shape(desired)
        and artist.listen_first_note == new_note
    ):
        return []

    def describe(shape: dict[str, tuple[bool, int | None]]) -> str:
        quick = next((tid for tid, (qp, _) in shape.items() if qp), None)
        listen_first = sum(1 for _, order in shape.values() if order is not None)
        return f"quick picks {quick or '-'}, {listen_first} listen-first"

    before = describe(_selection_shape(current))
    artist.track_selections.clear()
    session.flush()  # delete old rows before re-inserting: uq(artist, listen_first_order)
    for spotify_track_id, selection in desired.items():
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
    artist.listen_first_note = new_note
    return [FieldChange("listening", before, describe(_selection_shape(desired)))]


def _apply_video(
    session: Session, artist: Artist, fields: ArtistEditFields, now: datetime
) -> list[FieldChange]:
    if not _present(fields, "live_video_id"):
        return []
    featured = next((video for video in artist.videos if video.is_featured), None)
    current_id = featured.youtube_video_id if featured else None
    if current_id == fields.live_video_id and (
        featured is None or featured.label == fields.live_video_label
    ):
        return []
    if featured is not None:
        artist.videos.remove(featured)
        session.flush()  # delete before re-inserting: uq(artist, display_order) + one-featured
    if fields.live_video_id is not None:
        artist.videos.append(
            ArtistVideo(
                youtube_video_id=fields.live_video_id,
                label=fields.live_video_label,
                is_featured=True,
                display_order=1,
                is_available=True,
                last_checked_at=now,
            )
        )
    return [FieldChange("featuredVideo", _fmt(current_id), _fmt(fields.live_video_id))]


def _apply_about_content(artist: Artist, fields: ArtistEditFields) -> list[FieldChange]:
    if not _present(fields, "about") or artist.about == fields.about:
        return []
    change = FieldChange("about", _fmt(artist.about), _fmt(fields.about))
    artist.about = fields.about
    return [change]


def _apply_socials_content(
    artist: Artist, fields: ArtistEditFields
) -> list[FieldChange]:
    if not _present(fields, "socials"):
        return []
    socials = fields.socials
    changes: list[FieldChange] = []
    for key, column in (("youtube", "youtube_url"), ("tiktok", "tiktok_url")):
        if socials is None:
            new = None  # socials: null clears both link fields
        elif key in socials.model_fields_set:
            new = getattr(socials, key)
        else:
            continue
        if getattr(artist, column) == new:
            continue
        changes.append(FieldChange(key, _fmt(getattr(artist, column)), _fmt(new)))
        setattr(artist, column, new)
    return changes


def _apply_about_verification(
    artist: Artist, fields: ArtistEditFields, now: datetime
) -> None:
    if not _present(fields, "about_verified"):
        return
    if fields.about_verified:
        if artist.about is None:
            raise ArtistAuthoringError("cannot verify About while about is empty")
        artist.about_verified_at = now
    else:
        artist.about_verified_at = None


def _apply_socials_verification(artist: Artist, fields: ArtistEditFields) -> None:
    if _present(fields, "socials_verified"):
        artist.socials_verified = bool(fields.socials_verified)


def _apply_similar(
    session: Session,
    artist: Artist,
    run: FestivalRun,
    fields: ArtistEditFields,
    similar_targets: dict[str, Artist],
    now: datetime,
) -> list[FieldChange]:
    if not _present(fields, "similar_artists"):
        return []
    existing: SimilarArtistSet | None = session.scalar(
        select(SimilarArtistSet)
        .where(
            SimilarArtistSet.festival_run_id == run.id,
            SimilarArtistSet.source_artist_id == artist.id,
        )
        .options(
            selectinload(SimilarArtistSet.entries).selectinload(
                SimilarArtist.target_artist
            )
        )
    )
    desired = fields.similar_artists
    if existing is not None:
        # An AFTER trigger on similar_artists may have nulled verified_at server-side
        # in an earlier write this transaction; re-read the true value.
        session.expire(existing, ["verified_at"])

    if desired is None:
        if existing is None:
            return []
        count = len(existing.entries)
        session.delete(existing)
        session.flush()
        return [FieldChange("similarArtists", f"{count} entries", "-")]

    desired_slugs = [entry.slug for entry in desired]
    current_slugs = (
        [entry.target_artist.slug for entry in existing.entries] if existing else []
    )
    want_verified = bool(fields.similar_artists_verified)

    if existing is not None and current_slugs == desired_slugs:
        was_verified = existing.verified_at is not None
        if want_verified and not was_verified:
            existing.verified_at = now
            session.flush()
            return [FieldChange("similarArtistsVerified", "no", "yes")]
        if (
            not want_verified
            and was_verified
            and _present(fields, "similar_artists_verified")
        ):
            existing.verified_at = None
            session.flush()
            return [FieldChange("similarArtistsVerified", "yes", "no")]
        return []

    similarity_set = existing
    if similarity_set is None:
        similarity_set = SimilarArtistSet(
            festival_run=run, source_artist=artist, verified_at=None
        )
        session.add(similarity_set)
    else:
        similarity_set.entries.clear()
        session.flush()  # delete before re-inserting: uq(set, display_order)
    for order, entry in enumerate(desired, start=1):
        similarity_set.entries.append(
            SimilarArtist(
                target_artist=similar_targets[entry.slug], display_order=order
            )
        )
    session.flush()  # entries exist; the AFTER trigger has now nulled verified_at
    if want_verified:
        similarity_set.verified_at = now
        session.flush()  # separate write; the trigger does not watch verified_at
    before = f"{len(current_slugs)} entries" if existing else "-"
    after = f"{len(desired)} entries" + (" (verified)" if want_verified else "")
    return [FieldChange("similarArtists", before, after)]


def edit_artist(session: Session, payload: ArtistEditInput) -> EditSummary:
    """Apply a field-level patch to one existing artist. Does not commit. See
    ADR-0012. Only the field groups present in ``payload.artist`` are touched."""
    fields = payload.artist
    now = datetime.now(UTC)

    artist = _load_artist_for_edit(session, payload.slug)
    # A published artist that currently meets publication readiness must stay that way:
    # this workflow never changes publication_status, so an edit that drops it below
    # the bar would leave a broken record live. A draft, or a published record that was
    # already below the bar, is not trapped by this.
    was_publishable = (
        artist.publication_status == "published"
        and evaluate_artist_publication(artist).is_ready
    )

    run = _resolve_run(session, payload.edition, payload.run)
    _require_lineup_entry(session, artist, run)

    _reject_taken_identity(
        session,
        fields.slug if _present(fields, "slug") else None,
        fields.mbid if _present(fields, "mbid") else None,
        (
            parse_spotify_artist_id(fields.socials.spotify)
            if fields.socials is not None
            and "spotify" in fields.socials.model_fields_set
            else None
        ),
        exclude_artist_id=artist.id,
    )
    genres = (
        _resolve_genres(session, fields.genres)
        if _present(fields, "genres") and fields.genres
        else []
    )
    similar_targets = (
        _resolve_similar_targets(
            session, [entry.slug for entry in fields.similar_artists]
        )
        if fields.similar_artists
        else {}
    )

    about_verified_before = artist.about_verified_at is not None
    socials_verified_before = artist.socials_verified

    # Autoflush off so the collection helpers control their own DELETE-before-INSERT
    # flushes (immediate unique constraints on display_order) and so the About/socials
    # content writes reach the database only at the explicit flush below, where the
    # BEFORE UPDATE verification trigger is expected to fire. The content helpers run
    # last for that reason.
    changes: list[FieldChange] = []
    with session.no_autoflush:
        changes += _apply_scalars(artist, fields)
        changes += _apply_spotify_identity(artist, fields)
        changes += _apply_image(artist, fields)
        changes += _apply_location(artist, fields)
        changes += _apply_genres(session, artist, fields, genres)
        changes += _apply_listening(session, artist, fields)
        changes += _apply_video(session, artist, fields, now)
        content_changes = _apply_about_content(artist, fields) + _apply_socials_content(
            artist, fields
        )
        changes += content_changes
    session.flush()  # BEFORE UPDATE triggers null about_verified_at / socials_verified

    if content_changes:
        # The trigger cleared about_verified_at / socials_verified server-side; resync
        # the ORM before reading or re-stamping them.
        session.expire(artist, ["about_verified_at", "socials_verified"])

    _apply_about_verification(artist, fields, now)
    _apply_socials_verification(artist, fields)
    session.flush()

    if (artist.about_verified_at is not None) != about_verified_before:
        changes.append(
            FieldChange(
                "aboutVerified",
                "yes" if about_verified_before else "no",
                "yes" if artist.about_verified_at is not None else "no",
            )
        )
    if artist.socials_verified != socials_verified_before:
        changes.append(
            FieldChange(
                "socialsVerified",
                "yes" if socials_verified_before else "no",
                "yes" if artist.socials_verified else "no",
            )
        )

    changes += _apply_similar(session, artist, run, fields, similar_targets, now)

    if was_publishable:
        readiness = evaluate_artist_publication(artist)
        if not readiness.is_ready:
            raise ArtistAuthoringError(
                f"this edit would leave published artist {artist.slug!r} below "
                "publication readiness ("
                + ", ".join(issue.value for issue in readiness.issues)
                + "); a published record must stay publishable"
            )

    return EditSummary(slug=artist.slug, changed=changes)


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
