from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from app.models.timestamp_mixin import TimestampMixin

if TYPE_CHECKING:
    from app.models.festival_edition import FestivalEdition


class FestivalSeries(TimestampMixin, Base):
    __tablename__ = "festival_series"

    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(200))

    editions: Mapped[list["FestivalEdition"]] = relationship(
        back_populates="festival_series",
        cascade="all, delete-orphan",
        order_by="FestivalEdition.year",
    )
