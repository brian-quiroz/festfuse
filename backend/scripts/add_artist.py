"""Create one artist directly in PostgreSQL from a JSON authoring file.

Requires an explicit mode: ``--preview`` runs the create in a transaction and rolls it
back (surfacing database errors, persisting nothing); ``--apply`` commits. See
``app/schemas/artist_authoring.py`` for the accepted input shape.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from pydantic import ValidationError

from app.database import SessionLocal
from app.models import Artist
from app.schemas.artist_authoring import ArtistAuthoringInput
from app.services import (
    ArtistAuthoringError,
    create_artist,
    evaluate_artist_publication,
)
from app.services.artist_publication import ArtistPublicationReadiness


def _render_plan(artist: Artist, readiness: ArtistPublicationReadiness) -> None:
    print("Artist create plan")
    print("------------------")
    print(f"slug              {artist.slug}")
    print(f"name              {artist.name}")
    print(f"mbid              {artist.mbid or '-'}")
    print(f"spotify_artist_id {artist.spotify_artist_id or '-'}")
    print(f"genres            {len(artist.genre_assignments)}")
    print(f"track selections  {len(artist.track_selections)}")
    print(f"videos            {len(artist.videos)}")
    lineup = artist.lineup_entries[0] if artist.lineup_entries else None
    if lineup is not None:
        print(
            f"lineup entry      {lineup.lineup_status}"
            f" / billing {lineup.billing_tier or '-'}"
            f" / {len(lineup.appearances)} appearance(s)"
        )
    print(f"similar sets      {len(artist.similarity_sets)}")
    print()
    if readiness.is_ready:
        print("Publication readiness: READY (still created as a draft).")
    else:
        print("Publication readiness: NOT READY — blocking issues:")
        for issue in readiness.issues:
            print(f"  - {issue.value}")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", required=True, type=Path, help="authoring JSON file")
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument(
        "--preview",
        action="store_true",
        help="run the create in a transaction and roll it back; persists nothing",
    )
    mode.add_argument(
        "--apply", action="store_true", help="write the artist in one transaction"
    )
    args = parser.parse_args()

    try:
        raw = json.loads(args.input.read_text())
    except (OSError, json.JSONDecodeError) as error:
        print(f"Could not read {args.input}: {error}", file=sys.stderr)
        return 1

    try:
        payload = ArtistAuthoringInput.model_validate(raw)
    except ValidationError as error:
        print("Input failed validation:", file=sys.stderr)
        print(error, file=sys.stderr)
        return 1

    with SessionLocal() as session:
        try:
            artist = create_artist(session, payload)
            readiness = evaluate_artist_publication(artist)
        except ArtistAuthoringError as error:
            session.rollback()
            print(f"Aborted: {error}\nNothing was written.", file=sys.stderr)
            return 1

        _render_plan(artist, readiness)

        if args.apply:
            session.commit()
            print("\nArtist created as a draft. Publish it with publish_artists.")
        else:
            session.rollback()
            print("\nPreview only; the transaction was rolled back, nothing persisted.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
