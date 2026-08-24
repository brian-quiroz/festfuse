from typing import TYPE_CHECKING

from sqlalchemy import CheckConstraint, ForeignKey, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from app.models.timestamp_mixin import TimestampMixin

if TYPE_CHECKING:
    from app.models.festival_day import FestivalDay
    from app.models.festival_edition import FestivalEdition
    from app.models.lineup_entry import LineupEntry
    from app.models.similar_artist_set import SimilarArtistSet


class FestivalRun(TimestampMixin, Base):
    __tablename__ = "festival_runs"
    __table_args__ = (
        UniqueConstraint(
            "festival_edition_id",
            "slug",
            name="uq_festival_runs_edition_slug",
        ),
        UniqueConstraint(
            "festival_edition_id",
            "display_order",
            name="uq_festival_runs_edition_display_order",
        ),
        CheckConstraint(
            "display_order > 0",
            name="ck_festival_runs_display_order_positive",
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    festival_edition_id: Mapped[int] = mapped_column(
        ForeignKey("festival_editions.id", ondelete="CASCADE"),
    )
    slug: Mapped[str] = mapped_column(String(100))
    name: Mapped[str] = mapped_column(String(100))
    display_order: Mapped[int]

    festival_edition: Mapped["FestivalEdition"] = relationship(back_populates="runs")
    days: Mapped[list["FestivalDay"]] = relationship(
        back_populates="festival_run",
        cascade="all, delete-orphan",
        order_by="FestivalDay.display_order",
    )
    similarity_sets: Mapped[list["SimilarArtistSet"]] = relationship(
        back_populates="festival_run",
        cascade="all, delete-orphan",
    )
    lineup_entries: Mapped[list["LineupEntry"]] = relationship(
        back_populates="festival_run",
        cascade="all, delete-orphan",
    )
