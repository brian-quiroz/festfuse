"""The one definition of public lineup membership for a festival run.

An artist is a public member of a run when the artist is published and its lineup
entry in that run is announced. The public read queries use it to decide whether a
similar-artist set can be shown, and the authoring service uses it to refuse an
ineligible pick at write time, so the two cannot drift apart. Appearance status
(``cancelled``) plays no part: a cancelled set leaves the artist on the lineup. Pure:
reads already-loaded attributes, no queries (callers load ``lineup_entries``).
"""

from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models import Artist

PUBLIC_LINEUP_STATUS = "announced"


def similar_target_problem(artist: Artist, festival_run_id: int) -> str | None:
    """Why ``artist`` cannot be a similar-artist pick in the run, or None if it can."""
    if artist.publication_status != "published":
        return "not published"
    statuses = {
        entry.lineup_status
        for entry in artist.lineup_entries
        if entry.festival_run_id == festival_run_id
    }
    if PUBLIC_LINEUP_STATUS in statuses:
        return None
    if "withdrawn" in statuses:
        return "withdrawn from this run"
    if "draft" in statuses:
        return "draft lineup entry in this run"
    return "not in this run's lineup"


def is_public_run_member(artist: Artist, festival_run_id: int) -> bool:
    return similar_target_problem(artist, festival_run_id) is None
