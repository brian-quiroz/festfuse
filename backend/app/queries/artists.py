from sqlalchemy import select
from sqlalchemy.orm import Session, raiseload, selectinload

from app.models import Artist, ArtistGenre, ArtistTrackSelection, Genre
from app.schemas.artist import (
    ArtistCoreRead,
    ArtistGenreFamilyRead,
    ArtistGenreRead,
    ArtistImageRead,
    ArtistListenFirstRead,
    ArtistLocationRead,
    ArtistTrackRead,
    ArtistTrackSelectionRead,
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

    image = None
    if artist.image_url is not None:
        image = ArtistImageRead(
            url=artist.image_url,
            focal_y_percent=artist.image_focal_y_percent,
            credit_author=artist.image_credit_author,
            source_url=artist.image_source_url,
            license_url=artist.image_license_url,
            taken_year=artist.image_taken_year,
            sourced_at=artist.image_sourced_at,
        )

    quick_picks_selection = quick_picks[0]
    return ArtistCoreRead(
        slug=artist.slug,
        name=artist.name,
        spotify_artist_id=artist.spotify_artist_id,
        image=image,
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
