"""Rename one track's display name in PostgreSQL, by Spotify track ID.

Requires an explicit mode: ``--preview`` runs the rename in a transaction and rolls it
back (surfacing database errors, persisting nothing); ``--apply`` commits. A track's
name can be shared across multiple artists' track selections, so the plan lists every
artist affected by the rename before it's applied.
"""

from __future__ import annotations

import argparse
import sys

from app.database import SessionLocal
from app.services import TrackAuthoringError, TrackRename, rename_track


def _render_plan(plan: TrackRename) -> None:
    print("Track rename plan")
    print("------------------")
    print(f"spotify track id  {plan.spotify_track_id}")
    print(f"name              {plan.before} -> {plan.after}")
    print()
    if plan.affected_artist_slugs:
        print("Affects the track selection of:")
        for slug in plan.affected_artist_slugs:
            print(f"  - {slug}")
    else:
        print("No artist currently selects this track.")
    if plan.already_matches:
        print("\nAlready has this name — nothing to change.")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--spotify-id", required=True, help="Spotify track ID")
    parser.add_argument("--name", required=True, help="corrected display name")
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument(
        "--preview",
        action="store_true",
        help="run the rename in a transaction and roll it back; persists nothing",
    )
    mode.add_argument(
        "--apply", action="store_true", help="write the rename in one transaction"
    )
    args = parser.parse_args()

    with SessionLocal() as session:
        try:
            plan = rename_track(
                session, spotify_track_id=args.spotify_id, name=args.name
            )
        except TrackAuthoringError as error:
            session.rollback()
            print(f"Aborted: {error}\nNothing was written.", file=sys.stderr)
            return 1

        _render_plan(plan)

        if args.apply:
            session.commit()
            print("\nRename applied." if not plan.already_matches else "\nNo change.")
        else:
            session.rollback()
            print("\nPreview only; the transaction was rolled back, nothing persisted.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
