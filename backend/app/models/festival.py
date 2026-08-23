from typing import TYPE_CHECKING

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base

if TYPE_CHECKING:
    from app.models.festival_run import FestivalRun


class Festival(Base):
    __tablename__ = "festivals"

    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(200))

    city: Mapped[str] = mapped_column(String(100))
    state: Mapped[str | None] = mapped_column(String(100), nullable=True)
    country: Mapped[str] = mapped_column(String(100))
    timezone: Mapped[str] = mapped_column(String(100))

    runs: Mapped[list["FestivalRun"]] = relationship(
        back_populates="festival",
        cascade="all, delete-orphan",
    )
