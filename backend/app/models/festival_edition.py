from typing import TYPE_CHECKING

from sqlalchemy import ForeignKey, SmallInteger, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from app.models.timestamp_mixin import TimestampMixin

if TYPE_CHECKING:
    from app.models.festival_run import FestivalRun
    from app.models.festival_series import FestivalSeries


class FestivalEdition(TimestampMixin, Base):
    __tablename__ = "festival_editions"

    id: Mapped[int] = mapped_column(primary_key=True)
    festival_series_id: Mapped[int] = mapped_column(
        ForeignKey("festival_series.id", ondelete="CASCADE"),
        index=True,
    )
    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(200))
    year: Mapped[int] = mapped_column(SmallInteger)

    city: Mapped[str] = mapped_column(String(100))
    state: Mapped[str | None] = mapped_column(String(100), nullable=True)
    country: Mapped[str] = mapped_column(String(100))
    timezone: Mapped[str] = mapped_column(String(100))

    festival_series: Mapped["FestivalSeries"] = relationship(back_populates="editions")
    runs: Mapped[list["FestivalRun"]] = relationship(
        back_populates="festival_edition",
        cascade="all, delete-orphan",
        order_by="FestivalRun.display_order",
    )
