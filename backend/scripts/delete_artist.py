"""Hard-delete one artist and its owned rows.

Requires an explicit mode: ``--preview`` runs the delete in a transaction and rolls it
back (surfacing database errors, persisting nothing); ``--apply`` commits. Refuses an
artist that another artist's Similar Artist set points at unless ``--force`` also clears
those incoming references.
"""

from __future__ import annotations

import argparse
import sys

from app.database import SessionLocal
from app.services import ArtistAuthoringError, DeletionSummary, delete_artist


def _render_summary(summary: DeletionSummary) -> None:
    print(f"Artist delete: {summary.slug}")
    print("---------------" + "-" * len(summary.slug))
    print(f"genre assignments  {summary.genres}")
    print(f"track selections   {summary.track_selections}")
    print(f"videos             {summary.videos}")
    print(f"similar sets       {summary.similar_artist_sets}")
    print(f"lineup entries      {summary.lineup_entries}")
    print(f"appearances        {summary.appearances}")
    if summary.cleared_incoming_similar_refs:
        print(
            "incoming similar refs cleared: "
            + ", ".join(summary.cleared_incoming_similar_refs)
        )


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--slug", required=True, help="artist slug to delete")
    parser.add_argument(
        "--force",
        action="store_true",
        help="also remove Similar Artist references that point at this artist",
    )
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
            summary = delete_artist(session, args.slug, force=args.force)
        except ArtistAuthoringError as error:
            session.rollback()
            print(f"Aborted: {error}\nNothing was written.", file=sys.stderr)
            return 1

        _render_summary(summary)

        if args.apply:
            session.commit()
            print("\nArtist deleted.")
        else:
            session.rollback()
            print("\nPreview only; the transaction was rolled back, nothing deleted.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
