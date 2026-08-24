from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import CheckConstraint, DateTime, ForeignKey, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from app.models.timestamp_mixin import TimestampMixin

if TYPE_CHECKING:
    from app.models.appearance import Appearance
    from app.models.artist import Artist
    from app.models.festival_run import FestivalRun


class LineupEntry(TimestampMixin, Base):
    __tablename__ = "lineup_entries"
    __table_args__ = (
        CheckConstraint(
            "lineup_status IN ('draft', 'announced', 'withdrawn')",
            name="ck_lineup_entries_status",
        ),
        CheckConstraint(
            "billing_tier IS NULL OR "
            "billing_tier IN ('headliner', 'sub_headliner', 'undercard')",
            name="ck_lineup_entries_billing_tier",
        ),
        CheckConstraint(
            "lineup_status <> 'draft' OR "
            "(announced_at IS NULL AND withdrawn_at IS NULL)",
            name="ck_lineup_entries_draft_has_no_event_timestamps",
        ),
        CheckConstraint(
            "withdrawn_at IS NULL OR lineup_status = 'withdrawn'",
            name="ck_lineup_entries_withdrawn_at_matches_status",
        ),
        UniqueConstraint(
            "festival_run_id",
            "artist_id",
            name="uq_lineup_entries_run_artist",
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    festival_run_id: Mapped[int] = mapped_column(
        ForeignKey("festival_runs.id", ondelete="CASCADE"),
    )
    artist_id: Mapped[int] = mapped_column(
        ForeignKey("artists.id", ondelete="CASCADE"),
        index=True,
    )
    lineup_status: Mapped[str] = mapped_column(
        String(20),
        server_default="draft",
    )
    billing_tier: Mapped[str | None] = mapped_column(String(20), nullable=True)
    announced_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )
    withdrawn_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    festival_run: Mapped["FestivalRun"] = relationship(back_populates="lineup_entries")
    artist: Mapped["Artist"] = relationship(back_populates="lineup_entries")
    appearances: Mapped[list["Appearance"]] = relationship(
        back_populates="lineup_entry",
        cascade="all, delete-orphan",
        order_by="Appearance.starts_at",
    )
