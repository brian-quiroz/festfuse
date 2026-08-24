from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from app.models.timestamp_mixin import TimestampMixin

if TYPE_CHECKING:
    from app.models.artist_track_selection import ArtistTrackSelection


class Track(TimestampMixin, Base):
    __tablename__ = "tracks"

    id: Mapped[int] = mapped_column(primary_key=True)
    spotify_track_id: Mapped[str] = mapped_column(String(100), unique=True)
    name: Mapped[str] = mapped_column(String(200))

    artist_selections: Mapped[list["ArtistTrackSelection"]] = relationship(
        back_populates="track",
        passive_deletes=True,
    )
