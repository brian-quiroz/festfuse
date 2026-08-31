from fastapi import APIRouter, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.dependencies import SessionDep
from app.models import FestivalEdition, FestivalRun
from app.repositories import (
    read_run_ids_with_public_schedule,
    read_run_ids_with_published_artists,
)
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

    # `schedule_state` and `has_published_artists` are both derived per request, never
    # stored (ADR-0016).
    run_ids = [run.id for run in festival.runs]
    scheduled_run_ids = read_run_ids_with_public_schedule(session, run_ids)
    run_ids_with_artists = read_run_ids_with_published_artists(session, run_ids)
    for run in festival.runs:
        run.schedule_state = "scheduled" if run.id in scheduled_run_ids else "announced"
        run.has_published_artists = run.id in run_ids_with_artists

    return festival
