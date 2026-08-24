from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import CheckConstraint, DateTime, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from app.models.timestamp_mixin import TimestampMixin

if TYPE_CHECKING:
    from app.models.festival_day import FestivalDay
    from app.models.lineup_entry import LineupEntry
    from app.models.stage import Stage


class Appearance(TimestampMixin, Base):
    __tablename__ = "appearances"
    __table_args__ = (
        CheckConstraint(
            "ends_at > starts_at",
            name="ck_appearances_positive_duration",
        ),
        CheckConstraint(
            "appearance_status IN ('draft', 'scheduled', 'cancelled')",
            name="ck_appearances_status",
        ),
        CheckConstraint(
            "appearance_status = 'cancelled' OR "
            "(cancelled_at IS NULL AND cancellation_reason IS NULL)",
            name="ck_appearances_cancellation_matches_status",
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    lineup_entry_id: Mapped[int] = mapped_column(
        ForeignKey("lineup_entries.id", ondelete="CASCADE"),
        index=True,
    )
    festival_day_id: Mapped[int] = mapped_column(
        ForeignKey("festival_days.id", ondelete="RESTRICT"),
        index=True,
    )
    stage_id: Mapped[int] = mapped_column(
        ForeignKey("stages.id", ondelete="RESTRICT"),
        index=True,
    )
    starts_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    ends_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    appearance_status: Mapped[str] = mapped_column(
        String(20),
        server_default="draft",
    )
    cancelled_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )
    cancellation_reason: Mapped[str | None] = mapped_column(Text, nullable=True)

    lineup_entry: Mapped["LineupEntry"] = relationship(back_populates="appearances")
    festival_day: Mapped["FestivalDay"] = relationship(back_populates="appearances")
    stage: Mapped["Stage"] = relationship(back_populates="appearances")
