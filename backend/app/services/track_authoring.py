"""Rename one track's display name directly in PostgreSQL.

Covers a gap in `edit_artist`: its track-selection patching only sets a `Track` row's
name when creating a new row, and reuses an existing row by `spotify_track_id` as-is —
so a name-only correction to an already-selected track never applies. `Track.name` is
a plain display string (identity is `spotify_track_id`) and can be shared across
multiple artists' `track_selections`, so a rename's effect isn't scoped to one artist.

Pure unit-of-work function that never commits — the caller owns the transaction,
matching the rest of `artist_authoring.py` / `genre_authoring.py`. Thin CLI wraps this
in `backend/scripts/edit_track.py`.
"""

from __future__ import annotations

from dataclasses import dataclass

from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.models import ArtistTrackSelection, Track


class TrackAuthoringError(RuntimeError):
    """A rename request that cannot be satisfied against the database."""


@dataclass
class TrackRename:
    spotify_track_id: str
    before: str
    after: str
    affected_artist_slugs: list[str]
    already_matches: bool


def rename_track(session: Session, *, spotify_track_id: str, name: str) -> TrackRename:
    """Rename a track by Spotify track ID. No-op if the name already matches."""
    name = name.strip()
    if not name:
        raise TrackAuthoringError("name is required")

    track = session.scalar(
        select(Track)
        .where(Track.spotify_track_id == spotify_track_id)
        .options(
            selectinload(Track.artist_selections).selectinload(
                ArtistTrackSelection.artist
            )
        )
    )
    if track is None:
        raise TrackAuthoringError(
            f"no track with spotify_track_id {spotify_track_id!r} — a track that "
            "isn't selected by any artist yet doesn't need renaming here; set its "
            "name via edit_artist when adding the selection"
        )

    affected_slugs = sorted(
        selection.artist.slug for selection in track.artist_selections
    )

    if track.name == name:
        return TrackRename(spotify_track_id, track.name, name, affected_slugs, True)

    before = track.name
    track.name = name
    return TrackRename(spotify_track_id, before, name, affected_slugs, False)


__all__ = ["TrackAuthoringError", "TrackRename", "rename_track"]
