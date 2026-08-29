from zoneinfo import ZoneInfo

from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload, raiseload, selectinload

from app.models import (
    Appearance,
    Artist,
    ArtistGenre,
    ArtistTrackSelection,
    FestivalEdition,
    FestivalRun,
    Genre,
    LineupEntry,
    SimilarArtist,
    SimilarArtistSet,
)
from app.schemas.artist import (
    ArtistCoreRead,
    ArtistGenreFamilyRead,
    ArtistGenreRead,
    ArtistImageRead,
    ArtistListenFirstRead,
    ArtistLocationRead,
    ArtistSocialsRead,
    ArtistTrackRead,
    ArtistTrackSelectionRead,
    ArtistVideoRead,
    FestivalArtistAppearanceRead,
    FestivalArtistContextRead,
    FestivalArtistEditionRead,
    FestivalArtistRead,
    FestivalArtistRunRead,
    FestivalArtistStageRead,
    FestivalRunAppearanceRead,
    FestivalRunArtistRead,
    FestivalSimilarArtistRead,
)


class PublishedArtistConsistencyError(RuntimeError):
    """Raised when a published Artist violates the public read contract."""


def _map_quick_picks_track(artist: Artist) -> ArtistTrackRead:
    quick_picks = [
        selection for selection in artist.track_selections if selection.is_quick_picks
    ]
    if len(quick_picks) != 1:
        raise PublishedArtistConsistencyError(
            f"Published artist {artist.slug!r} has {len(quick_picks)} Quick Picks "
            "selections; expected exactly one"
        )
    selection = quick_picks[0]
    return ArtistTrackRead(
        spotify_track_id=selection.track.spotify_track_id,
        name=selection.track.name,
    )


def _map_published_artist(artist: Artist) -> ArtistCoreRead:
    genre_assignments = sorted(
        artist.genre_assignments,
        key=lambda assignment: assignment.display_order,
    )
    listen_first_selections = sorted(
        (
            selection
            for selection in artist.track_selections
            if selection.listen_first_order is not None
        ),
        key=lambda selection: selection.listen_first_order or 0,
    )
    featured_video = next(
        (video for video in artist.videos if video.is_featured and video.is_available),
        None,
    )

    return ArtistCoreRead(
        slug=artist.slug,
        name=artist.name,
        spotify_artist_id=artist.spotify_artist_id,
        image=_map_artist_image(artist),
        location=_map_location(artist),
        genres=[_map_genre(assignment) for assignment in genre_assignments],
        quick_picks_track=_map_quick_picks_track(artist),
        listen_first=ArtistListenFirstRead(
            note=artist.listen_first_note,
            tracks=[
                ArtistTrackSelectionRead(
                    spotify_track_id=selection.track.spotify_track_id,
                    name=selection.track.name,
                    display_order=selection.listen_first_order,
                )
                for selection in listen_first_selections
            ],
        ),
        about=artist.about if artist.about_verified_at is not None else None,
        socials=ArtistSocialsRead(
            spotify_url=(
                f"https://open.spotify.com/artist/{artist.spotify_artist_id}"
                if artist.spotify_artist_id is not None
                else None
            ),
            youtube_url=artist.youtube_url if artist.socials_verified else None,
            tiktok_url=artist.tiktok_url if artist.socials_verified else None,
        ),
        featured_video=(
            ArtistVideoRead(
                youtube_video_id=featured_video.youtube_video_id,
                label=featured_video.label,
            )
            if featured_video is not None
            else None
        ),
    )


def _map_location(artist: Artist) -> ArtistLocationRead:
    return ArtistLocationRead(
        city=artist.location_city,
        state=artist.location_state,
        country=artist.location_country,
    )


def _map_genre(assignment: ArtistGenre) -> ArtistGenreRead:
    return ArtistGenreRead(
        slug=assignment.genre.slug,
        name=assignment.genre.name,
        is_primary=assignment.is_primary,
        display_order=assignment.display_order,
        family=ArtistGenreFamilyRead(
            slug=assignment.genre.family.slug,
            name=assignment.genre.family.name,
        ),
    )


def _map_artist_image(artist: Artist) -> ArtistImageRead | None:
    if artist.image_url is None:
        return None
    return ArtistImageRead(
        url=artist.image_url,
        focal_y_percent=artist.image_focal_y_percent,
        credit_author=artist.image_credit_author,
        source_url=artist.image_source_url,
        license_url=artist.image_license_url,
        taken_year=artist.image_taken_year,
        sourced_at=artist.image_sourced_at,
    )


def read_published_artist_by_slug(
    session: Session,
    slug: str,
) -> ArtistCoreRead | None:
    statement = (
        select(Artist)
        .options(
            raiseload("*"),
            selectinload(Artist.genre_assignments)
            .selectinload(ArtistGenre.genre)
            .selectinload(Genre.family),
            selectinload(Artist.track_selections).selectinload(
                ArtistTrackSelection.track
            ),
            selectinload(Artist.videos),
        )
        .where(
            Artist.slug == slug,
            Artist.publication_status == "published",
        )
    )
    artist = session.scalar(statement)
    if artist is None:
        return None
    return _map_published_artist(artist)


def read_festival_artist_by_slug(
    session: Session,
    *,
    edition_slug: str,
    run_slug: str,
    artist_slug: str,
) -> FestivalArtistRead | None:
    statement = (
        select(LineupEntry)
        .join(LineupEntry.artist)
        .join(LineupEntry.festival_run)
        .join(FestivalRun.festival_edition)
        .options(
            raiseload("*"),
            joinedload(LineupEntry.artist)
            .selectinload(Artist.genre_assignments)
            .selectinload(ArtistGenre.genre)
            .selectinload(Genre.family),
            joinedload(LineupEntry.artist)
            .selectinload(Artist.track_selections)
            .selectinload(ArtistTrackSelection.track),
            joinedload(LineupEntry.artist).selectinload(Artist.videos),
            joinedload(LineupEntry.festival_run).joinedload(
                FestivalRun.festival_edition
            ),
            selectinload(LineupEntry.appearances).joinedload(Appearance.festival_day),
            selectinload(LineupEntry.appearances).joinedload(Appearance.stage),
        )
        .where(
            Artist.slug == artist_slug,
            Artist.publication_status == "published",
            FestivalRun.slug == run_slug,
            FestivalEdition.slug == edition_slug,
            LineupEntry.lineup_status == "announced",
        )
    )
    lineup_entry = session.scalar(statement)
    if lineup_entry is None:
        return None
    if lineup_entry.billing_tier is None:
        raise PublishedArtistConsistencyError(
            f"Announced festival artist {artist_slug!r} has no billing tier"
        )

    festival_run = lineup_entry.festival_run
    edition = festival_run.festival_edition
    timezone = ZoneInfo(edition.timezone)
    public_appearances = sorted(
        (
            appearance
            for appearance in lineup_entry.appearances
            if appearance.appearance_status in {"scheduled", "cancelled"}
        ),
        key=lambda appearance: appearance.starts_at,
    )
    similarity_set = session.scalar(
        select(SimilarArtistSet)
        .options(
            raiseload("*"),
            selectinload(SimilarArtistSet.entries)
            .joinedload(SimilarArtist.target_artist)
            .selectinload(Artist.genre_assignments)
            .selectinload(ArtistGenre.genre)
            .selectinload(Genre.family),
            selectinload(SimilarArtistSet.entries)
            .joinedload(SimilarArtist.target_artist)
            .selectinload(Artist.lineup_entries),
        )
        .where(
            SimilarArtistSet.festival_run_id == festival_run.id,
            SimilarArtistSet.source_artist_id == lineup_entry.artist_id,
            SimilarArtistSet.verified_at.is_not(None),
        )
    )
    similar_artists: list[FestivalSimilarArtistRead] = []
    if similarity_set is not None and len(similarity_set.entries) == 4:
        ordered_entries = sorted(
            similarity_set.entries,
            key=lambda entry: entry.display_order,
        )
        all_targets_are_public = all(
            entry.target_artist.publication_status == "published"
            and any(
                target_lineup.festival_run_id == festival_run.id
                and target_lineup.lineup_status == "announced"
                for target_lineup in entry.target_artist.lineup_entries
            )
            for entry in ordered_entries
        )
        if all_targets_are_public:
            similar_artists = [
                FestivalSimilarArtistRead(
                    slug=entry.target_artist.slug,
                    name=entry.target_artist.name,
                    display_order=entry.display_order,
                    image=_map_artist_image(entry.target_artist),
                    genres=[
                        _map_genre(assignment)
                        for assignment in sorted(
                            entry.target_artist.genre_assignments,
                            key=lambda assignment: assignment.display_order,
                        )
                    ],
                )
                for entry in ordered_entries
            ]

    return FestivalArtistRead(
        artist=_map_published_artist(lineup_entry.artist),
        festival_context=FestivalArtistContextRead(
            edition=FestivalArtistEditionRead(
                slug=edition.slug,
                name=edition.name,
                timezone=edition.timezone,
            ),
            run=FestivalArtistRunRead(
                slug=festival_run.slug,
                name=festival_run.name,
            ),
            billing_tier=lineup_entry.billing_tier,
            appearances=[
                FestivalArtistAppearanceRead(
                    id=appearance.id,
                    status=appearance.appearance_status,
                    festival_date=appearance.festival_day.date,
                    starts_at=appearance.starts_at.astimezone(timezone),
                    ends_at=appearance.ends_at.astimezone(timezone),
                    stage=FestivalArtistStageRead(
                        slug=appearance.stage.slug,
                        name=appearance.stage.name,
                    ),
                    cancellation_reason=appearance.cancellation_reason,
                )
                for appearance in public_appearances
            ],
            similar_artists=similar_artists,
        ),
    )


def _read_run_similar_artists(
    session: Session,
    festival_run_id: int,
) -> dict[int, list[FestivalSimilarArtistRead]]:
    """Batches every source Artist's four-or-none similar-artist recommendations for
    one run, keyed by source_artist_id — the run-scoped analog of
    read_festival_artist_by_slug's single-artist similarity_set query, one WHERE
    clause across all sources instead of N per-artist queries. The lineup_entries
    load is scoped to this run via `.and_(...)` so the "still announced" check never
    loads a target artist's history from other runs/festivals.
    """
    similarity_sets = session.scalars(
        select(SimilarArtistSet)
        .options(
            raiseload("*"),
            selectinload(SimilarArtistSet.entries)
            .joinedload(SimilarArtist.target_artist)
            .selectinload(Artist.genre_assignments)
            .selectinload(ArtistGenre.genre)
            .selectinload(Genre.family),
            selectinload(SimilarArtistSet.entries)
            .joinedload(SimilarArtist.target_artist)
            .selectinload(
                Artist.lineup_entries.and_(
                    LineupEntry.festival_run_id == festival_run_id
                )
            ),
        )
        .where(
            SimilarArtistSet.festival_run_id == festival_run_id,
            SimilarArtistSet.verified_at.is_not(None),
        )
    ).all()

    similar_artists_by_source_id: dict[int, list[FestivalSimilarArtistRead]] = {}
    for similarity_set in similarity_sets:
        if len(similarity_set.entries) != 4:
            continue
        ordered_entries = sorted(
            similarity_set.entries, key=lambda entry: entry.display_order
        )
        all_targets_are_public = all(
            entry.target_artist.publication_status == "published"
            and any(
                target_lineup.lineup_status == "announced"
                for target_lineup in entry.target_artist.lineup_entries
            )
            for entry in ordered_entries
        )
        if not all_targets_are_public:
            continue
        similar_artists_by_source_id[similarity_set.source_artist_id] = [
            FestivalSimilarArtistRead(
                slug=entry.target_artist.slug,
                name=entry.target_artist.name,
                display_order=entry.display_order,
                image=_map_artist_image(entry.target_artist),
                genres=[
                    _map_genre(assignment)
                    for assignment in sorted(
                        entry.target_artist.genre_assignments,
                        key=lambda assignment: assignment.display_order,
                    )
                ],
            )
            for entry in ordered_entries
        ]
    return similar_artists_by_source_id


def _resolve_run(
    session: Session, edition_slug: str, run_slug: str
) -> FestivalRun | None:
    """Resolve one run by edition-slug plus run-slug, with its edition eager-loaded."""
    return session.scalar(
        select(FestivalRun)
        .join(FestivalRun.festival_edition)
        .options(raiseload("*"), joinedload(FestivalRun.festival_edition))
        .where(
            FestivalRun.slug == run_slug,
            FestivalEdition.slug == edition_slug,
        )
    )


def _map_run_artist(
    artist: Artist,
    similar_artists_by_source_id: dict[int, list[FestivalSimilarArtistRead]],
) -> FestivalRunArtistRead:
    """The artist projection shared by the run-appearances and run-artists feeds."""
    return FestivalRunArtistRead(
        slug=artist.slug,
        name=artist.name,
        image=_map_artist_image(artist),
        location=_map_location(artist),
        genres=[
            _map_genre(assignment)
            for assignment in sorted(
                artist.genre_assignments,
                key=lambda assignment: assignment.display_order,
            )
        ],
        quick_picks_track=_map_quick_picks_track(artist),
        similar_artists=similar_artists_by_source_id.get(artist.id, []),
    )


def read_festival_run_appearances(
    session: Session,
    *,
    edition_slug: str,
    run_slug: str,
) -> list[FestivalRunAppearanceRead] | None:
    """Every published, announced Artist's scheduled Appearances for one run."""
    festival_run = _resolve_run(session, edition_slug, run_slug)
    if festival_run is None:
        return None

    edition = festival_run.festival_edition
    timezone = ZoneInfo(edition.timezone)

    statement = (
        select(Appearance)
        .join(Appearance.lineup_entry)
        .join(LineupEntry.artist)
        .options(
            raiseload("*"),
            joinedload(Appearance.stage),
            joinedload(Appearance.festival_day),
            joinedload(Appearance.lineup_entry).joinedload(LineupEntry.artist),
            joinedload(Appearance.lineup_entry)
            .joinedload(LineupEntry.artist)
            .selectinload(Artist.genre_assignments)
            .selectinload(ArtistGenre.genre)
            .selectinload(Genre.family),
            joinedload(Appearance.lineup_entry)
            .joinedload(LineupEntry.artist)
            .selectinload(Artist.track_selections)
            .selectinload(ArtistTrackSelection.track),
        )
        .where(
            LineupEntry.festival_run_id == festival_run.id,
            LineupEntry.lineup_status == "announced",
            Artist.publication_status == "published",
            # Cancelled excluded too, unlike read_festival_artist_by_slug — see ADR-0004.
            Appearance.appearance_status == "scheduled",
        )
        .order_by(Appearance.starts_at)
    )
    appearances = session.scalars(statement).all()

    for appearance in appearances:
        if appearance.lineup_entry.billing_tier is None:
            raise PublishedArtistConsistencyError(
                f"Announced festival artist {appearance.lineup_entry.artist.slug!r} "
                "has no billing tier"
            )

    similar_artists_by_source_id = _read_run_similar_artists(session, festival_run.id)

    return [
        FestivalRunAppearanceRead(
            id=appearance.id,
            festival_date=appearance.festival_day.date,
            starts_at=appearance.starts_at.astimezone(timezone),
            ends_at=appearance.ends_at.astimezone(timezone),
            stage=FestivalArtistStageRead(
                slug=appearance.stage.slug,
                name=appearance.stage.name,
            ),
            billing_tier=appearance.lineup_entry.billing_tier,
            artist=_map_run_artist(
                appearance.lineup_entry.artist, similar_artists_by_source_id
            ),
        )
        for appearance in appearances
    ]


def read_festival_run_artists(
    session: Session,
    *,
    edition_slug: str,
    run_slug: str,
) -> list[FestivalRunArtistRead] | None:
    """Every published, announced Artist in one run, whether or not they are scheduled.

    The schedule-agnostic sibling of read_festival_run_appearances: the same artist
    projection, keyed by LineupEntry instead of Appearance, so a run whose lineup is
    announced before its schedule exists is still fully described by the bulk API.
    See ADR-0016.
    """
    festival_run = _resolve_run(session, edition_slug, run_slug)
    if festival_run is None:
        return None

    lineup_entries = session.scalars(
        select(LineupEntry)
        .join(LineupEntry.artist)
        .options(
            raiseload("*"),
            joinedload(LineupEntry.artist)
            .selectinload(Artist.genre_assignments)
            .selectinload(ArtistGenre.genre)
            .selectinload(Genre.family),
            joinedload(LineupEntry.artist)
            .selectinload(Artist.track_selections)
            .selectinload(ArtistTrackSelection.track),
        )
        .where(
            LineupEntry.festival_run_id == festival_run.id,
            LineupEntry.lineup_status == "announced",
            Artist.publication_status == "published",
        )
        # No set times to order by; billing tier (headliner < sub_headliner <
        # undercard, alphabetically) then name is a stable order. Consumers regroup.
        .order_by(LineupEntry.billing_tier, Artist.name)
    ).all()

    for lineup_entry in lineup_entries:
        if lineup_entry.billing_tier is None:
            raise PublishedArtistConsistencyError(
                f"Announced festival artist {lineup_entry.artist.slug!r} "
                "has no billing tier"
            )

    similar_artists_by_source_id = _read_run_similar_artists(session, festival_run.id)

    return [
        _map_run_artist(lineup_entry.artist, similar_artists_by_source_id)
        for lineup_entry in lineup_entries
    ]


def read_run_ids_with_public_schedule(session: Session, run_ids: list[int]) -> set[int]:
    """The subset of `run_ids` that have at least one scheduled Appearance on an
    announced, published lineup entry: the same gate read_festival_run_appearances
    applies. This is the run's derived `schedule_state == "scheduled"`; the state is
    never stored. See ADR-0016.
    """
    if not run_ids:
        return set()
    return set(
        session.scalars(
            select(LineupEntry.festival_run_id)
            .join(Appearance, Appearance.lineup_entry_id == LineupEntry.id)
            .join(Artist, Artist.id == LineupEntry.artist_id)
            .where(
                LineupEntry.festival_run_id.in_(run_ids),
                LineupEntry.lineup_status == "announced",
                Artist.publication_status == "published",
                Appearance.appearance_status == "scheduled",
            )
            .distinct()
        )
    )
