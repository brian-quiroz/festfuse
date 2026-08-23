from fastapi import APIRouter, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.dependencies import SessionDep
from app.models import Festival, FestivalRun
from app.schemas import FestivalRead

router = APIRouter(
    prefix="/festivals",
    tags=["festivals"],
)


@router.get("/{slug}", response_model=FestivalRead)
def read_festival(slug: str, session: SessionDep) -> Festival:
    statement = (
        select(Festival)
        .options(
            selectinload(Festival.runs).selectinload(FestivalRun.days)
        )
        .where(Festival.slug == slug)
    )

    festival = session.scalar(statement)

    if festival is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Festival not found",
        )

    return festival