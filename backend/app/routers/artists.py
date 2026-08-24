from fastapi import APIRouter, HTTPException, status

from app.dependencies import SessionDep
from app.queries import artists as artist_queries
from app.schemas import ArtistCoreRead

router = APIRouter(
    prefix="/artists",
    tags=["artists"],
)


@router.get("/{slug}", response_model=ArtistCoreRead)
def read_artist(slug: str, session: SessionDep) -> ArtistCoreRead:
    try:
        artist = artist_queries.read_published_artist_by_slug(session, slug)
    except artist_queries.PublishedArtistConsistencyError as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Published artist data is inconsistent",
        ) from error

    if artist is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Artist not found",
        )

    return artist
