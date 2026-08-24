from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from app.models.timestamp_mixin import TimestampMixin

if TYPE_CHECKING:
    from app.models.artist import Artist
    from app.models.festival_run import FestivalRun
    from app.models.similar_artist import SimilarArtist


class SimilarArtistSet(TimestampMixin, Base):
    __tablename__ = "similar_artist_sets"
    __table_args__ = (
        UniqueConstraint(
            "festival_run_id",
            "source_artist_id",
            name="uq_similar_artist_sets_run_source_artist",
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    festival_run_id: Mapped[int] = mapped_column(
        ForeignKey("festival_runs.id", ondelete="CASCADE"),
    )
    source_artist_id: Mapped[int] = mapped_column(
        ForeignKey("artists.id", ondelete="CASCADE"),
        index=True,
    )
    verified_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    festival_run: Mapped["FestivalRun"] = relationship(back_populates="similarity_sets")
    source_artist: Mapped["Artist"] = relationship(back_populates="similarity_sets")
    entries: Mapped[list["SimilarArtist"]] = relationship(
        back_populates="similarity_set",
        cascade="all, delete-orphan",
        order_by="SimilarArtist.display_order",
    )
