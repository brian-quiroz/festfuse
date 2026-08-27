from datetime import date, datetime
from typing import TYPE_CHECKING

from sqlalchemy import (
    Boolean,
    CheckConstraint,
    Date,
    DateTime,
    SmallInteger,
    String,
    Text,
    false,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base
from app.models.timestamp_mixin import TimestampMixin

if TYPE_CHECKING:
    from app.models.artist_genre import ArtistGenre
    from app.models.artist_track_selection import ArtistTrackSelection
    from app.models.artist_video import ArtistVideo
    from app.models.lineup_entry import LineupEntry
    from app.models.similar_artist import SimilarArtist
    from app.models.similar_artist_set import SimilarArtistSet


class Artist(TimestampMixin, Base):
    __tablename__ = "artists"

    __table_args__ = (
        CheckConstraint(
            "image_focal_y_percent BETWEEN 0 AND 100",
            name="ck_artists_image_focal_y_percent_range",
        ),
        CheckConstraint(
            "image_url IS NOT NULL OR "
            "(image_focal_y_percent IS NULL "
            "AND image_credit_author IS NULL "
            "AND image_source_url IS NULL "
            "AND image_license_url IS NULL "
            "AND image_taken_year IS NULL "
            "AND image_sourced_at IS NULL)",
            name="ck_artists_image_metadata_requires_image",
        ),
        CheckConstraint(
            "publication_status IN ('draft', 'published')",
            name="ck_artists_publication_status",
        ),
        CheckConstraint(
            "about_verified_at IS NULL OR about IS NOT NULL",
            name="ck_artists_about_verification_requires_about",
        ),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(200))
    mbid: Mapped[str | None] = mapped_column(String(36), unique=True, nullable=True)
    spotify_artist_id: Mapped[str | None] = mapped_column(
        String(100), unique=True, nullable=True
    )
    image_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    image_focal_y_percent: Mapped[int | None] = mapped_column(
        SmallInteger, nullable=True
    )
    image_credit_author: Mapped[str | None] = mapped_column(String(200), nullable=True)
    image_source_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    image_license_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    image_taken_year: Mapped[int | None] = mapped_column(SmallInteger, nullable=True)
    image_sourced_at: Mapped[date | None] = mapped_column(Date, nullable=True)
    location_city: Mapped[str | None] = mapped_column(String(100), nullable=True)
    location_state: Mapped[str | None] = mapped_column(String(100), nullable=True)
    location_country: Mapped[str | None] = mapped_column(String(100), nullable=True)
    about: Mapped[str | None] = mapped_column(Text, nullable=True)
    about_verified_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )
    youtube_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    tiktok_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    socials_verified: Mapped[bool] = mapped_column(Boolean, server_default=false())
    listen_first_note: Mapped[str | None] = mapped_column(Text, nullable=True)
    publication_status: Mapped[str] = mapped_column(String(20), server_default="draft")

    genre_assignments: Mapped[list["ArtistGenre"]] = relationship(
        back_populates="artist",
        cascade="all, delete-orphan",
        order_by="ArtistGenre.display_order",
    )
    track_selections: Mapped[list["ArtistTrackSelection"]] = relationship(
        back_populates="artist",
        cascade="all, delete-orphan",
    )
    videos: Mapped[list["ArtistVideo"]] = relationship(
        back_populates="artist",
        cascade="all, delete-orphan",
        order_by="ArtistVideo.display_order",
    )
    similarity_sets: Mapped[list["SimilarArtistSet"]] = relationship(
        back_populates="source_artist",
        cascade="all, delete-orphan",
    )
    similarity_recommendations: Mapped[list["SimilarArtist"]] = relationship(
        back_populates="target_artist",
        passive_deletes=True,
    )
    lineup_entries: Mapped[list["LineupEntry"]] = relationship(
        back_populates="artist",
        cascade="all, delete-orphan",
    )
