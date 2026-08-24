from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from app.models.timestamp_mixin import TimestampMixin

if TYPE_CHECKING:
    from app.models.artist_genre import ArtistGenre
    from app.models.genre_family import GenreFamily


class Genre(TimestampMixin, Base):
    __tablename__ = "genres"

    id: Mapped[int] = mapped_column(primary_key=True)
    family_id: Mapped[int] = mapped_column(
        ForeignKey("genre_families.id", ondelete="RESTRICT"),
        index=True,
    )
    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(100), unique=True)

    family: Mapped["GenreFamily"] = relationship(back_populates="genres")
    artist_assignments: Mapped[list["ArtistGenre"]] = relationship(
        back_populates="genre",
        passive_deletes=True,
    )
