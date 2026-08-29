from fastapi import APIRouter, HTTPException, status

from app.dependencies import SessionDep
from app.repositories import artists as artist_queries
from app.schemas.artist import FestivalArtistRead, FestivalRunArtistRead

router = APIRouter(
    prefix="/festivals/{edition_slug}/runs/{run_slug}/artists",
    tags=["festival artists"],
)


@router.get("", response_model=list[FestivalRunArtistRead])
def read_festival_run_artists(
    edition_slug: str,
    run_slug: str,
    session: SessionDep,
) -> list[FestivalRunArtistRead]:
    try:
        run_artists = artist_queries.read_festival_run_artists(
            session,
            edition_slug=edition_slug,
            run_slug=run_slug,
        )
    except artist_queries.PublishedArtistConsistencyError as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Published artist data is inconsistent",
        ) from error

    if run_artists is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Festival run not found",
        )

    return run_artists


@router.get("/{artist_slug}", response_model=FestivalArtistRead)
def read_festival_artist(
    edition_slug: str,
    run_slug: str,
    artist_slug: str,
    session: SessionDep,
) -> FestivalArtistRead:
    try:
        artist = artist_queries.read_festival_artist_by_slug(
            session,
            edition_slug=edition_slug,
            run_slug=run_slug,
            artist_slug=artist_slug,
        )
    except artist_queries.PublishedArtistConsistencyError as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Published artist data is inconsistent",
        ) from error

    if artist is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Festival artist not found",
        )

    return artist
