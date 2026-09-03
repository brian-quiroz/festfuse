"""Add or hard-delete one genre row directly in PostgreSQL.

The `genres` half of the authoring workflow ADR-0011 anticipated ("a dedicated
operation adds a `genres` row to its family"). Pure unit-of-work functions that never
commit — the caller owns the transaction, matching the rest of
`artist_authoring.py`. Thin CLIs wrap these in `backend/scripts/`
(`add_genre.py` / `delete_genre.py`).

The frontend filter vocabulary in `app/data/categories.ts` stays a separate hand edit
(ADR-0011: the two sources "are not required to converge until the filter list itself
is served from the API"). `add_genre` only prints the reminder.
"""

from __future__ import annotations

import re
from dataclasses import dataclass

from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.lib.artist_source import SLUG_PATTERN
from app.models import Genre, GenreFamily


class GenreAuthoringError(RuntimeError):
    """An add or delete request that cannot be satisfied against the database."""


@dataclass
class GenreCreation:
    name: str
    slug: str
    family: str
    already_exists: bool


@dataclass
class GenreDeletion:
    name: str
    slug: str


def derive_genre_slug(name: str) -> str:
    """Kebab-case a genre display name the way the seeded rows are slugged.

    Every run of non-alphanumeric characters collapses to one hyphen, so
    ``"R&B"`` -> ``"r-b"``, ``"Hip-Hop/Rap"`` -> ``"hip-hop-rap"``,
    ``"90s Alternative"`` -> ``"90s-alternative"``.
    """
    return re.sub(r"[^a-z0-9]+", "-", name.strip().lower()).strip("-")


def create_genre(
    session: Session, *, name: str, family: str, slug: str | None = None
) -> GenreCreation:
    """Add one genre to a family. Idempotent: an identical existing row is a no-op."""
    name = name.strip()
    if not name:
        raise GenreAuthoringError("genre name is required")

    family_row = session.scalar(select(GenreFamily).where(GenreFamily.name == family))
    if family_row is None:
        known = ", ".join(
            sorted(row.name for row in session.scalars(select(GenreFamily)))
        )
        raise GenreAuthoringError(
            f"unknown genre family {family!r} — known families: {known}"
        )

    slug = slug.strip() if slug else derive_genre_slug(name)
    if not SLUG_PATTERN.fullmatch(slug):
        raise GenreAuthoringError(
            f"slug {slug!r} is not a valid slug; pass an explicit --slug"
        )

    clash = session.scalar(
        select(Genre)
        .where((Genre.name == name) | (Genre.slug == slug))
        .options(selectinload(Genre.family))
    )
    if clash is not None:
        if (
            clash.name == name
            and clash.slug == slug
            and clash.family_id == family_row.id
        ):
            return GenreCreation(name, slug, family, already_exists=True)
        raise GenreAuthoringError(
            f"a genre already exists with name {clash.name!r} / slug {clash.slug!r} "
            f"in family {clash.family.name!r} — cannot add "
            f"{name!r} / {slug!r} / {family!r}"
        )

    session.add(Genre(name=name, slug=slug, family_id=family_row.id))
    return GenreCreation(name, slug, family, already_exists=False)


def delete_genre(session: Session, slug: str) -> GenreDeletion:
    """Hard-delete one unused genre. Refuses a genre any artist is assigned."""
    genre = session.scalar(
        select(Genre)
        .where(Genre.slug == slug)
        .options(selectinload(Genre.artist_assignments))
    )
    if genre is None:
        raise GenreAuthoringError(f"no genre with slug {slug!r}")

    assignments = len(genre.artist_assignments)
    if assignments:
        raise GenreAuthoringError(
            f"genre {slug!r} is assigned to {assignments} artist(s); "
            "reassign them before deleting it"
        )

    name = genre.name
    session.delete(genre)
    return GenreDeletion(name=name, slug=slug)


__all__ = [
    "GenreAuthoringError",
    "GenreCreation",
    "GenreDeletion",
    "create_genre",
    "delete_genre",
    "derive_genre_slug",
]
