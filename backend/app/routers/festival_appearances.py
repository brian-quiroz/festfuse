from fastapi import APIRouter, HTTPException, status

from app.dependencies import SessionDep
from app.repositories import artists as artist_queries
from app.schemas.artist import FestivalRunAppearanceRead

router = APIRouter(
    prefix="/festivals/{edition_slug}/runs/{run_slug}",
    tags=["festival appearances"],
)


@router.get("/appearances", response_model=list[FestivalRunAppearanceRead])
def read_festival_run_appearances(
    edition_slug: str,
    run_slug: str,
    session: SessionDep,
) -> list[FestivalRunAppearanceRead]:
    try:
        appearances = artist_queries.read_festival_run_appearances(
            session,
            edition_slug=edition_slug,
            run_slug=run_slug,
        )
    except artist_queries.PublishedArtistConsistencyError as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Published artist data is inconsistent",
        ) from error

    if appearances is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Festival run not found",
        )

    return appearances
