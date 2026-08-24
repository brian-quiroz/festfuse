from typing import TYPE_CHECKING

from sqlalchemy import (
    Boolean,
    CheckConstraint,
    ForeignKey,
    Index,
    SmallInteger,
    UniqueConstraint,
    false,
    text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from app.models.timestamp_mixin import TimestampMixin

if TYPE_CHECKING:
    from app.models.artist import Artist
    from app.models.track import Track


class ArtistTrackSelection(TimestampMixin, Base):
    __tablename__ = "artist_track_selections"
    __table_args__ = (
        CheckConstraint(
            "is_quick_picks OR listen_first_order IS NOT NULL",
            name="ck_artist_track_selections_has_role",
        ),
        CheckConstraint(
            "listen_first_order BETWEEN 1 AND 3",
            name="ck_artist_track_selections_listen_first_order_range",
        ),
        UniqueConstraint(
            "artist_id",
            "listen_first_order",
            name="uq_artist_track_selections_artist_listen_first_order",
        ),
        Index(
            "uq_artist_track_selections_one_quick_picks_per_artist",
            "artist_id",
            unique=True,
            postgresql_where=text("is_quick_picks"),
        ),
    )

    artist_id: Mapped[int] = mapped_column(
        ForeignKey("artists.id", ondelete="CASCADE"),
        primary_key=True,
    )
    track_id: Mapped[int] = mapped_column(
        ForeignKey("tracks.id", ondelete="RESTRICT"),
        index=True,
        primary_key=True,
    )
    is_quick_picks: Mapped[bool] = mapped_column(Boolean, server_default=false())
    listen_first_order: Mapped[int | None] = mapped_column(
        SmallInteger,
        nullable=True,
    )

    artist: Mapped["Artist"] = relationship(back_populates="track_selections")
    track: Mapped["Track"] = relationship(back_populates="artist_selections")
