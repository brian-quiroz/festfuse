"""Assess artist publication readiness and optionally publish passing records."""

from __future__ import annotations

import argparse
from collections import Counter

from app.database import SessionLocal
from app.services import (
    assess_artist_publications,
    publish_ready_artists,
    qualifies_by_video_only,
)


def print_report(*, apply: bool) -> None:
    with SessionLocal() as session:
        batch = (
            publish_ready_artists(session)
            if apply
            else assess_artist_publications(session)
        )

        issue_counts = Counter(
            issue.value
            for candidate in batch.candidates
            for issue in candidate.readiness.issues
        )

        print("Artist publication report")
        print("-------------------------")
        print(f"artists evaluated  {len(batch.candidates)}")
        print(f"ready              {batch.ready_count}")
        print(f"blocked            {batch.blocked_count}")
        for issue, count in sorted(issue_counts.items()):
            print(f"{issue:<18} {count}")

        video_only = sorted(
            candidate.artist.slug
            for candidate in batch.candidates
            if candidate.readiness.is_ready
            and qualifies_by_video_only(candidate.artist)
        )
        if video_only:
            print("\nvideo only, no audio preview (ADR-0017)")
            for slug in video_only:
                print(f"  {slug}")

        if apply:
            session.commit()
            print("\nReady artists published successfully.")
        else:
            session.rollback()
            print("\nDry run only; no publication statuses changed.")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--apply",
        action="store_true",
        help="publish every Artist that passes the current readiness policy",
    )
    args = parser.parse_args()
    print_report(apply=args.apply)


if __name__ == "__main__":
    main()
