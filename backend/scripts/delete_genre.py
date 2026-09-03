"""Hard-delete one unused genre row.

Requires an explicit mode: ``--preview`` runs the delete in a transaction and rolls it
back (surfacing database errors, persisting nothing); ``--apply`` commits. Refuses a
genre that any artist is assigned — reassign those artists first. A test and cleanup
tool, not a product path (ADR-0011, mirroring ``delete_artist``).

Removing the matching ``app/data/categories.ts`` entry is a separate hand edit.
"""

from __future__ import annotations

import argparse
import sys

from app.database import SessionLocal
from app.services import GenreAuthoringError, GenreDeletion, delete_genre


def _render_summary(summary: GenreDeletion) -> None:
    print(f"Genre delete: {summary.slug}")
    print("--------------" + "-" * len(summary.slug))
    print(f"name  {summary.name}")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--slug", required=True, help="genre slug to delete")
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument(
        "--preview",
        action="store_true",
        help="run the delete in a transaction and roll it back; persists nothing",
    )
    mode.add_argument(
        "--apply", action="store_true", help="perform the delete in one transaction"
    )
    args = parser.parse_args()

    with SessionLocal() as session:
        try:
            summary = delete_genre(session, args.slug)
        except GenreAuthoringError as error:
            session.rollback()
            print(f"Aborted: {error}\nNothing was written.", file=sys.stderr)
            return 1

        _render_summary(summary)

        if args.apply:
            session.commit()
            print("\nGenre deleted.")
        else:
            session.rollback()
            print("\nPreview only; the transaction was rolled back, nothing deleted.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
