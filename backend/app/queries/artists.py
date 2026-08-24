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
    FestivalSimilarArtistRead,
)


class PublishedArtistConsistencyError(RuntimeError):
    """Raised when a published Artist violates the public read contract."""


def _map_published_artist(artist: Artist) -> ArtistCoreRead:
    quick_picks = [
        selection for selection in artist.track_selections if selection.is_quick_picks
    ]
    if len(quick_picks) != 1:
        raise PublishedArtistConsistencyError(
            f"Published artist {artist.slug!r} has {len(quick_picks)} Quick Picks "
            "selections; expected exactly one"
        )

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

    quick_picks_selection = quick_picks[0]
    return ArtistCoreRead(
        slug=artist.slug,
        name=artist.name,
        spotify_artist_id=artist.spotify_artist_id,
        image=_map_artist_image(artist),
        location=ArtistLocationRead(
            city=artist.location_city,
            state=artist.location_state,
            country=artist.location_country,
        ),
        genres=[_map_genre(assignment) for assignment in genre_assignments],
        quick_picks_track=ArtistTrackRead(
            spotify_track_id=quick_picks_selection.track.spotify_track_id,
            name=quick_picks_selection.track.name,
        ),
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
