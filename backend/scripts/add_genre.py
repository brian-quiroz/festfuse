"""Add one genre row to its family in PostgreSQL.

Requires an explicit mode: ``--preview`` runs the insert in a transaction and rolls it
back (surfacing database errors, persisting nothing); ``--apply`` commits. The slug is
derived from the name unless ``--slug`` overrides it. Idempotent — re-adding an
identical row is a no-op.

The frontend filter vocabulary in ``app/data/categories.ts`` is a separate hand edit
(ADR-0011); this command only prints the reminder. See
``docs/roadmap/artist-authoring.md``.
"""

from __future__ import annotations

import argparse
import sys

from app.database import SessionLocal
from app.services import GenreAuthoringError, GenreCreation, create_genre


def _render_plan(plan: GenreCreation) -> None:
    print("Genre add plan")
    print("--------------")
    print(f"name    {plan.name}")
    print(f"slug    {plan.slug}")
    print(f"family  {plan.family}")
    if plan.already_exists:
        print("\nAlready present with this name, slug, and family — nothing to insert.")
        return
    print()
    print("Mirror this in app/data/categories.ts (hand edit, ADR-0011):")
    print(f'  - add "{plan.name}" to the GENRES array')
    print(f'  - add "{plan.name}" to GENRE_FAMILIES["{plan.family}"]')


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--name", required=True, help="genre display name")
    parser.add_argument(
        "--family", required=True, help="parent family name, e.g. 'Rock'"
    )
    parser.add_argument("--slug", help="override the derived slug")
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument(
        "--preview",
        action="store_true",
        help="run the insert in a transaction and roll it back; persists nothing",
    )
    mode.add_argument(
        "--apply", action="store_true", help="write the insert in one transaction"
    )
    args = parser.parse_args()

    with SessionLocal() as session:
        try:
            plan = create_genre(
                session, name=args.name, family=args.family, slug=args.slug
            )
        except GenreAuthoringError as error:
            session.rollback()
            print(f"Aborted: {error}\nNothing was written.", file=sys.stderr)
            return 1

        _render_plan(plan)

        if args.apply:
            session.commit()
            print("\nGenre added." if not plan.already_exists else "\nNo change.")
        else:
            session.rollback()
            print("\nPreview only; the transaction was rolled back, nothing persisted.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
