"""Apply a field-level patch to one existing artist in PostgreSQL from a JSON file.

Requires an explicit mode: ``--preview`` runs the edit in a transaction and rolls it
back (surfacing database errors, persisting nothing); ``--apply`` commits. The input is
``{ schemaVersion, edition, run, slug, artist: { ...only the fields to change } }`` —
see ``app/schemas/artist_authoring.py`` (``ArtistEditFields``). A key present as
``null`` clears that field; an absent key leaves it untouched. See ADR-0012.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from pydantic import ValidationError
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.database import SessionLocal
from app.models import Artist
from app.schemas.artist_authoring import ArtistEditInput
from app.services import (
    ArtistAuthoringError,
    EditSummary,
    edit_artist,
    evaluate_artist_publication,
)
from app.services.artist_publication import ArtistPublicationReadiness


def _render_plan(summary: EditSummary, readiness: ArtistPublicationReadiness) -> None:
    print("Artist edit plan")
    print("----------------")
    print(f"slug  {summary.slug}")
    print()
    if not summary.changed:
        print("No changes: the patch matches the current record.")
    else:
        for change in summary.changed:
            print(f"  {change.group}: {change.before} -> {change.after}")
    print()
    if readiness.is_ready:
        print("Publication readiness: READY.")
    else:
        print("Publication readiness: NOT READY — blocking issues:")
        for issue in readiness.issues:
            print(f"  - {issue.value}")
    if any(change.group == "slug" for change in summary.changed):
        print(
            "\nWARNING: the slug changed. The public URL (/api/v1/artists/<slug>) "
            "moves; links to the old slug will 404."
        )


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", required=True, type=Path, help="edit JSON file")
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument(
        "--preview",
        action="store_true",
        help="run the edit in a transaction and roll it back; persists nothing",
    )
    mode.add_argument(
        "--apply", action="store_true", help="write the edit in one transaction"
    )
    args = parser.parse_args()

    try:
        raw = json.loads(args.input.read_text())
    except (OSError, json.JSONDecodeError) as error:
        print(f"Could not read {args.input}: {error}", file=sys.stderr)
        return 1

    try:
        payload = ArtistEditInput.model_validate(raw)
    except ValidationError as error:
        print("Input failed validation:", file=sys.stderr)
        print(error, file=sys.stderr)
        return 1

    with SessionLocal() as session:
        try:
            summary = edit_artist(session, payload)
            artist = session.scalar(
                select(Artist)
                .where(Artist.slug == summary.slug)
                .options(
                    selectinload(Artist.genre_assignments),
                    selectinload(Artist.track_selections),
                )
            )
            readiness = evaluate_artist_publication(artist)
        except ArtistAuthoringError as error:
            session.rollback()
            print(f"Aborted: {error}\nNothing was written.", file=sys.stderr)
            return 1

        _render_plan(summary, readiness)

        if args.apply:
            session.commit()
            print("\nEdit applied.")
        else:
            session.rollback()
            print("\nPreview only; the transaction was rolled back, nothing persisted.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
