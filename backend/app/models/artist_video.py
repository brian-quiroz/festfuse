from datetime import date, datetime
from typing import TYPE_CHECKING

from sqlalchemy import (
    Boolean,
    CheckConstraint,
    Date,
    DateTime,
    ForeignKey,
    Index,
    String,
    UniqueConstraint,
    false,
    text,
    true,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from app.models.timestamp_mixin import TimestampMixin

if TYPE_CHECKING:
    from app.models.artist import Artist


class ArtistVideo(TimestampMixin, Base):
    __tablename__ = "artist_videos"
    __table_args__ = (
        CheckConstraint(
            "display_order > 0",
            name="ck_artist_videos_display_order_positive",
        ),
        UniqueConstraint(
            "artist_id",
            "youtube_video_id",
            name="uq_artist_videos_artist_youtube_video",
        ),
        UniqueConstraint(
            "artist_id",
            "display_order",
            name="uq_artist_videos_artist_display_order",
        ),
        Index(
            "uq_artist_videos_one_featured_per_artist",
            "artist_id",
            unique=True,
            postgresql_where=text("is_featured"),
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    artist_id: Mapped[int] = mapped_column(
        ForeignKey("artists.id", ondelete="CASCADE"),
    )
    youtube_video_id: Mapped[str] = mapped_column(String(100))
    label: Mapped[str] = mapped_column(String(200))
    is_featured: Mapped[bool] = mapped_column(Boolean, server_default=false())
    display_order: Mapped[int]
    published_at: Mapped[date | None] = mapped_column(Date, nullable=True)
    is_available: Mapped[bool] = mapped_column(Boolean, server_default=true())
    last_checked_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True),
        nullable=True,
    )

    artist: Mapped["Artist"] = relationship(back_populates="videos")
