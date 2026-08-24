from datetime import date as DateValue
from typing import TYPE_CHECKING

from sqlalchemy import CheckConstraint, ForeignKey, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from app.models.timestamp_mixin import TimestampMixin

if TYPE_CHECKING:
    from app.models.appearance import Appearance
    from app.models.festival_run import FestivalRun


class FestivalDay(TimestampMixin, Base):
    __tablename__ = "festival_days"
    __table_args__ = (
        UniqueConstraint(
            "festival_run_id",
            "date",
            name="uq_festival_days_run_date",
        ),
        UniqueConstraint(
            "festival_run_id",
            "display_order",
            name="uq_festival_days_run_display_order",
        ),
        CheckConstraint(
            "display_order > 0",
            name="ck_festival_days_display_order_positive",
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    festival_run_id: Mapped[int] = mapped_column(
        ForeignKey("festival_runs.id", ondelete="CASCADE"),
    )
    date: Mapped[DateValue]
    label: Mapped[str | None] = mapped_column(String(100), nullable=True)
    display_order: Mapped[int]

    festival_run: Mapped["FestivalRun"] = relationship(back_populates="days")
    appearances: Mapped[list["Appearance"]] = relationship(
        back_populates="festival_day",
        passive_deletes=True,
        order_by="Appearance.starts_at",
    )
