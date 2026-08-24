from typing import TYPE_CHECKING

from sqlalchemy import CheckConstraint, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from app.models.timestamp_mixin import TimestampMixin

if TYPE_CHECKING:
    from app.models.genre import Genre


class GenreFamily(TimestampMixin, Base):
    __tablename__ = "genre_families"
    __table_args__ = (
        CheckConstraint(
            "display_order > 0",
            name="ck_genre_families_display_order_positive",
        ),
        UniqueConstraint(
            "display_order",
            name="uq_genre_families_display_order",
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(100), unique=True)
    display_order: Mapped[int]

    genres: Mapped[list["Genre"]] = relationship(
        back_populates="family",
        passive_deletes=True,
    )
