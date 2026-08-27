"""One-time backfill of `artists.mbid` from the TypeScript source.

The `mbid` column was added after the initial import, and `import_artists.py` (guarded,
empty-tables-only) will not re-touch existing rows. Like `sync_artist_listening.py`, this
targets artists that already exist: it sets `mbid` only where it is currently NULL, so it
is safe to rerun. Run once per environment. Folded into the importer in the artist
authoring roadmap's section 6.

Requires an explicit mode: ``--dry-run`` reads and reports without attempting any write;
``--apply`` commits.
"""

from __future__ import annotations

import argparse
import sys

from sqlalchemy import select

from app.database import SessionLocal
from app.lib.artist_source import MBID_PATTERN
from app.models import Artist
from scripts.import_artists import export_source


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument(
        "--dry-run", action="store_true", help="read and report; write nothing"
    )
    mode.add_argument(
        "--apply", action="store_true", help="write the backfill in one transaction"
    )
    args = parser.parse_args()

    source = export_source()
    source_mbid_by_slug = {
        artist["slug"]: artist["mbid"]
        for artist in source["artists"]
        if artist.get("mbid")
    }
    for slug, mbid in sorted(source_mbid_by_slug.items()):
        if not MBID_PATTERN.fullmatch(mbid):
            print(
                f"Aborted: {slug} has a malformed mbid {mbid!r}\nNothing was written.",
                file=sys.stderr,
            )
            return 1

    with SessionLocal() as session:
        candidates = session.scalars(
            select(Artist).where(Artist.mbid.is_(None)).order_by(Artist.slug)
        ).all()

        planned: list[tuple[str, str]] = []
        for artist in candidates:
            mbid = source_mbid_by_slug.get(artist.slug)
            if mbid is not None:
                artist.mbid = mbid
                planned.append((artist.slug, mbid))

        print("Artist mbid backfill")
        print("-------------------")
        for slug, mbid in planned:
            print(f"  {slug:<28} {mbid}")
        print(f"\nartists missing mbid   {len(candidates)}")
        print(f"backfilled             {len(planned)}")

        if args.apply:
            session.commit()
            print("\nBackfill committed.")
        else:
            session.rollback()
            print("\nDry run only; no rows were updated.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
