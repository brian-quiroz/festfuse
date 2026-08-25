"""Synchronize curated listening configuration from the TypeScript source into existing draft Artists."""

from __future__ import annotations

import argparse
import re
from typing import Any

from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.database import SessionLocal
from app.models import Artist, ArtistTrackSelection, Track
from scripts.import_artists import export_source, parse_spotify_artist_id

SPOTIFY_TRACK_ID_PATTERN = re.compile(r"^[A-Za-z0-9]{22}$")


class ListeningSyncError(Exception):
    pass


def build_track_selections(source_artist: dict[str, Any]) -> list[dict[str, Any]]:
    label = source_artist["slug"]
    tracks = source_artist.get("tracks") or []
    quick_pick_id = tracks[0].get("spotifyId") if tracks else None

    selected: dict[str, dict[str, Any]] = {}
    if quick_pick_id:
        if not SPOTIFY_TRACK_ID_PATTERN.match(quick_pick_id):
            raise ListeningSyncError(
                f"{label}: malformed Quick Picks spotifyId {quick_pick_id!r}"
            )
        selected[quick_pick_id] = {
            "name": tracks[0]["name"],
            "is_quick_picks": True,
            "listen_first_order": None,
        }

    listen_first = source_artist.get("listenFirst")
    if listen_first:
        if listen_first.get("mode") != "tracks":
            raise ListeningSyncError(f"{label}: listenFirst.mode must be 'tracks'")
        identified = [track for track in tracks if track.get("spotifyId")]
        if len(identified) != 3:
            raise ListeningSyncError(
                f"{label}: curated Listen First must contain exactly 3 identified tracks"
            )
        for order, track in enumerate(identified, start=1):
            spotify_track_id = track["spotifyId"]
            if not SPOTIFY_TRACK_ID_PATTERN.match(spotify_track_id):
                raise ListeningSyncError(
                    f"{label}: malformed Listen First spotifyId {spotify_track_id!r}"
                )
            entry = selected.setdefault(
                spotify_track_id,
                {
                    "name": track["name"],
                    "is_quick_picks": False,
                    "listen_first_order": None,
                },
            )
            entry["listen_first_order"] = order

    return [
        {"spotify_track_id": spotify_track_id, **fields}
        for spotify_track_id, fields in selected.items()
    ]


class ArtistListeningPlan:
    def __init__(self, artist: Artist) -> None:
        self.artist = artist
        self.track_selections: list[dict[str, Any]] = []
        self.spotify_artist_id: str | None = None
        self.skip_reason: str | None = None

    @property
    def has_changes(self) -> bool:
        return bool(self.track_selections) or self.spotify_artist_id is not None


def build_listening_plans(
    session: Session, source_by_slug: dict[str, dict[str, Any]]
) -> list[ArtistListeningPlan]:
    draft_artists = (
        session.execute(
            select(Artist)
            .where(Artist.publication_status == "draft")
            .options(selectinload(Artist.track_selections))
            .order_by(Artist.slug)
        )
        .scalars()
        .all()
    )

    plans: list[ArtistListeningPlan] = []
    for artist in draft_artists:
        source_artist = source_by_slug.get(artist.slug)
        if source_artist is None:
            raise ListeningSyncError(
                f"{artist.slug}: draft Artist has no matching entry in the TypeScript source"
            )

        plan = ArtistListeningPlan(artist)

        source_spotify_id = parse_spotify_artist_id(
            source_artist.get("socials", {}).get("spotify")
        )
        if (
            source_spotify_id is not None
            and source_spotify_id != artist.spotify_artist_id
        ):
            plan.spotify_artist_id = source_spotify_id

        if artist.track_selections:
            plan.skip_reason = (
                f"already has {len(artist.track_selections)} track selection(s)"
            )
        else:
            plan.track_selections = build_track_selections(source_artist)

        plans.append(plan)

    return plans


def print_listening_report(plans: list[ArtistListeningPlan], *, applied: bool) -> None:
    print("Artist listening sync report")
    print("-----------------------------")

    changed = [plan for plan in plans if plan.has_changes]
    skipped = [plan for plan in plans if plan.skip_reason]
    unchanged = [
        plan for plan in plans if not plan.has_changes and not plan.skip_reason
    ]

    for plan in changed:
        print(f"{plan.artist.slug}:")
        if plan.spotify_artist_id is not None:
            print(f"  set spotify_artist_id: {plan.spotify_artist_id}")
        names = [selection["name"] for selection in plan.track_selections]
        if len(names) == 1:
            print(f"  add track: {names[0]}")
        elif names:
            print(f"  add tracks: {', '.join(names)}")
        quick_pick = next(
            (s for s in plan.track_selections if s["is_quick_picks"]), None
        )
        if quick_pick is not None:
            print(
                "  assign Quick Picks"
                if len(names) == 1
                else f"  assign Quick Picks: {quick_pick['name']}"
            )
        listen_first_orders = sorted(
            s["listen_first_order"]
            for s in plan.track_selections
            if s["listen_first_order"] is not None
        )
        if listen_first_orders:
            print(
                f"  assign Listen First positions: {', '.join(str(order) for order in listen_first_orders)}"
            )

    counts = [
        ("draft artists evaluated", len(plans)),
        ("artists with changes", len(changed)),
        ("artists unchanged", len(unchanged)),
        ("artists skipped", len(skipped)),
    ]
    label_width = max(len(label) for label, _ in counts)
    print()
    for label, count in counts:
        print(f"{label:<{label_width}} {count:>4}")
    for plan in skipped:
        print(f"  {plan.artist.slug}: {plan.skip_reason}")

    if applied:
        print(f"\n{len(changed)} artist(s) synchronized.")
    else:
        print("\nDry run only; no changes written.")


def apply_listening_plans(session: Session, plans: list[ArtistListeningPlan]) -> None:
    track_cache: dict[str, Track] = {}

    for plan in plans:
        if not plan.has_changes:
            continue

        if plan.spotify_artist_id is not None:
            plan.artist.spotify_artist_id = plan.spotify_artist_id

        for selection in plan.track_selections:
            spotify_track_id = selection["spotify_track_id"]
            track = track_cache.get(spotify_track_id)
            if track is None:
                track = session.execute(
                    select(Track).where(Track.spotify_track_id == spotify_track_id)
                ).scalar_one_or_none()
            if track is None:
                track = Track(spotify_track_id=spotify_track_id, name=selection["name"])
                session.add(track)
                session.flush()
            track_cache[spotify_track_id] = track

            plan.artist.track_selections.append(
                ArtistTrackSelection(
                    track=track,
                    is_quick_picks=selection["is_quick_picks"],
                    listen_first_order=selection["listen_first_order"],
                )
            )


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--apply",
        action="store_true",
        help="write the synchronized listening configuration in one PostgreSQL transaction",
    )
    args = parser.parse_args()

    source = export_source()
    source_by_slug = {artist["slug"]: artist for artist in source["artists"]}

    try:
        if args.apply:
            with SessionLocal() as session, session.begin():
                plans = build_listening_plans(session, source_by_slug)
                apply_listening_plans(session, plans)
                print_listening_report(plans, applied=True)
        else:
            with SessionLocal() as session:
                plans = build_listening_plans(session, source_by_slug)
                print_listening_report(plans, applied=False)
    except ListeningSyncError as error:
        print(f"\nSync aborted: {error}")
        raise SystemExit(1) from error


if __name__ == "__main__":
    main()
