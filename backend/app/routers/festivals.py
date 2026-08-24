from fastapi import APIRouter, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.dependencies import SessionDep
from app.models import FestivalEdition, FestivalRun
from app.schemas import FestivalEditionRead

router = APIRouter(
    prefix="/festivals",
    tags=["festivals"],
)


@router.get("/{slug}", response_model=FestivalEditionRead)
def read_festival(slug: str, session: SessionDep) -> FestivalEdition:
    statement = (
        select(FestivalEdition)
        .options(
            selectinload(FestivalEdition.festival_series),
            selectinload(FestivalEdition.runs).selectinload(FestivalRun.days),
        )
        .where(FestivalEdition.slug == slug)
    )

    festival = session.scalar(statement)

    if festival is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Festival not found",
        )

    return festival
