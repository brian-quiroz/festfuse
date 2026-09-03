"""Fast tests: the pure genre-slug derivation and the pre-query guards. No database.

The database-touching paths of ``create_genre`` / ``delete_genre`` (family resolution
against real rows, name/slug clash detection, idempotent re-add, the assigned-genre
delete guard) are covered in ``integration/test_genre_authoring.py``.
"""

from unittest.mock import Mock

import pytest
from sqlalchemy.orm import Session

from app.models import GenreFamily
from app.services import GenreAuthoringError, create_genre, derive_genre_slug


@pytest.mark.parametrize(
    ("name", "expected"),
    [
        ("New Wave", "new-wave"),
        ("Regional Mexican", "regional-mexican"),
        ("R&B", "r-b"),
        ("Hip-Hop/Rap", "hip-hop-rap"),
        ("90s Alternative", "90s-alternative"),
        ("Lo-Fi Indie", "lo-fi-indie"),
        ("  Trailing Space  ", "trailing-space"),
        ("Drum & Bass", "drum-bass"),
    ],
)
def test_derive_genre_slug_matches_the_seeded_convention(
    name: str, expected: str
) -> None:
    assert derive_genre_slug(name) == expected


def test_create_genre_rejects_a_blank_name_before_touching_the_database() -> None:
    session = Mock(spec=Session)
    with pytest.raises(GenreAuthoringError, match="name is required"):
        create_genre(session, name="   ", family="Rock")
    session.scalar.assert_not_called()


def test_create_genre_rejects_an_unknown_family_and_lists_the_known_ones() -> None:
    session = Mock(spec=Session)
    session.scalar.return_value = None
    session.scalars.return_value = [
        GenreFamily(name="Pop", slug="pop", display_order=2),
        GenreFamily(name="Rock", slug="rock", display_order=1),
    ]
    with pytest.raises(
        GenreAuthoringError, match="unknown genre family 'Nope'.*Pop, Rock"
    ):
        create_genre(session, name="Whatever", family="Nope")


def test_create_genre_rejects_a_name_that_derives_an_invalid_slug() -> None:
    session = Mock(spec=Session)
    session.scalar.return_value = GenreFamily(
        id=1, name="Rock", slug="rock", display_order=1
    )
    with pytest.raises(GenreAuthoringError, match="not a valid slug"):
        create_genre(session, name="!!!", family="Rock")
