from datetime import date as DateValue
from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base

if TYPE_CHECKING:
    from app.models.festival_run import FestivalRun


class FestivalDay(Base):
    __tablename__ = "festival_days"
    __table_args__ = (
        UniqueConstraint(
            "festival_run_id",
            "date",
            name="uq_festival_days_run_date",
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    festival_run_id: Mapped[int] = mapped_column(
        ForeignKey("festival_runs.id", ondelete="CASCADE"),
        index=True,
    )
    date: Mapped[DateValue]
    label: Mapped[str | None] = mapped_column(String(100), nullable=True)
    display_order: Mapped[int]

    festival_run: Mapped["FestivalRun"] = relationship(back_populates="days")
