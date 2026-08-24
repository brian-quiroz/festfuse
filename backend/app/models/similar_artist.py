from typing import TYPE_CHECKING

from sqlalchemy import CheckConstraint, ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from app.models.timestamp_mixin import TimestampMixin

if TYPE_CHECKING:
    from app.models.artist import Artist
    from app.models.similar_artist_set import SimilarArtistSet


class SimilarArtist(TimestampMixin, Base):
    __tablename__ = "similar_artists"
    __table_args__ = (
        CheckConstraint(
            "display_order BETWEEN 1 AND 4",
            name="ck_similar_artists_display_order_range",
        ),
        UniqueConstraint(
            "similarity_set_id",
            "display_order",
            name="uq_similar_artists_set_display_order",
        ),
    )

    similarity_set_id: Mapped[int] = mapped_column(
        ForeignKey("similar_artist_sets.id", ondelete="CASCADE"),
        primary_key=True,
    )
    target_artist_id: Mapped[int] = mapped_column(
        ForeignKey("artists.id", ondelete="RESTRICT"),
        primary_key=True,
        index=True,
    )
    display_order: Mapped[int]

    similarity_set: Mapped["SimilarArtistSet"] = relationship(back_populates="entries")
    target_artist: Mapped["Artist"] = relationship(
        back_populates="similarity_recommendations"
    )
