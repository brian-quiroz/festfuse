from typing import TYPE_CHECKING

from sqlalchemy import (
    Boolean,
    CheckConstraint,
    ForeignKey,
    Index,
    UniqueConstraint,
    false,
    text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from app.models.timestamp_mixin import TimestampMixin

if TYPE_CHECKING:
    from app.models.artist import Artist
    from app.models.genre import Genre


class ArtistGenre(TimestampMixin, Base):
    __tablename__ = "artist_genres"
    __table_args__ = (
        CheckConstraint(
            "display_order BETWEEN 1 AND 3",
            name="ck_artist_genres_display_order_range",
        ),
        UniqueConstraint(
            "artist_id",
            "display_order",
            name="uq_artist_genres_artist_display_order",
        ),
        Index(
            "uq_artist_genres_one_primary_per_artist",
            "artist_id",
            unique=True,
            postgresql_where=text("is_primary"),
        ),
    )

    artist_id: Mapped[int] = mapped_column(
        ForeignKey("artists.id", ondelete="CASCADE"),
        primary_key=True,
    )
    genre_id: Mapped[int] = mapped_column(
        ForeignKey("genres.id", ondelete="RESTRICT"),
        index=True,
        primary_key=True,
    )
    display_order: Mapped[int]
    is_primary: Mapped[bool] = mapped_column(Boolean, server_default=false())

    artist: Mapped["Artist"] = relationship(back_populates="genre_assignments")
    genre: Mapped["Genre"] = relationship(back_populates="artist_assignments")
