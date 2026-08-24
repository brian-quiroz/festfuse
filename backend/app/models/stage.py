from typing import TYPE_CHECKING

from sqlalchemy import CheckConstraint, ForeignKey, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from app.models.timestamp_mixin import TimestampMixin

if TYPE_CHECKING:
    from app.models.appearance import Appearance
    from app.models.festival_edition import FestivalEdition


class Stage(TimestampMixin, Base):
    __tablename__ = "stages"
    __table_args__ = (
        CheckConstraint(
            "display_order > 0",
            name="ck_stages_display_order_positive",
        ),
        UniqueConstraint(
            "festival_edition_id",
            "slug",
            name="uq_stages_edition_slug",
        ),
        UniqueConstraint(
            "festival_edition_id",
            "name",
            name="uq_stages_edition_name",
        ),
        UniqueConstraint(
            "festival_edition_id",
            "display_order",
            name="uq_stages_edition_display_order",
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    festival_edition_id: Mapped[int] = mapped_column(
        ForeignKey("festival_editions.id", ondelete="CASCADE"),
    )
    slug: Mapped[str] = mapped_column(String(100))
    name: Mapped[str] = mapped_column(String(200))
    display_order: Mapped[int]

    festival_edition: Mapped["FestivalEdition"] = relationship(back_populates="stages")
    appearances: Mapped[list["Appearance"]] = relationship(
        back_populates="stage",
        passive_deletes=True,
        order_by="Appearance.starts_at",
    )
