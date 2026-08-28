"""Resolve every external identifier on an artist and report OK / BROKEN / UNVERIFIABLE.

Read-only against PostgreSQL; makes outbound oEmbed / HTTP requests to resolve the
Spotify, YouTube, TikTok, and image URLs. Mechanical resolve checks only, never "is this
the right artist". Exits non-zero only on a BROKEN link. Scope flags, `--jobs`, and the
Spotify burst-throttling caveat are in `docs/operations/backend-deployment.md`
("Editorial pipeline scripts").

  python -m scripts.check_artist_links --slug lorde
  python -m scripts.check_artist_links --edition lollapalooza-2026 --run main
  python -m scripts.check_artist_links            # every published artist
"""

from __future__ import annotations

import argparse
import random
import time
import urllib.error
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from dataclasses import dataclass
from typing import Literal

from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.database import SessionLocal
from app.models import (
    Artist,
    ArtistTrackSelection,
    FestivalEdition,
    FestivalRun,
    LineupEntry,
)

LinkState = Literal["ok", "broken", "unverifiable"]

_USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/122.0 Safari/537.36"
)
_SPOTIFY_OEMBED = "https://open.spotify.com/oembed?url="
_YOUTUBE_OEMBED = "https://www.youtube.com/oembed?format=json&url="


@dataclass(frozen=True)
class LinkTarget:
    label: str
    value: str  # the identifier or URL as stored, for display
    check_url: str | None  # None => nothing to fetch (a local asset)
    oembed: bool


def classify(status: int | None, *, oembed: bool) -> LinkState:
    """Map an HTTP status (or None for a network failure) to a link state."""
    if status is None:
        return "unverifiable"
    if 200 <= status < 300:
        return "ok"
    if status in (404, 410):
        return "broken"
    if oembed and status in (400, 401):
        # Spotify/YouTube oEmbed answer 400/401 for an id that does not resolve.
        return "broken"
    return "unverifiable"


def link_targets(artist: Artist) -> list[LinkTarget]:
    targets: list[LinkTarget] = []
    if artist.spotify_artist_id:
        url = f"https://open.spotify.com/artist/{artist.spotify_artist_id}"
        targets.append(
            LinkTarget(
                "spotify artist",
                artist.spotify_artist_id,
                _SPOTIFY_OEMBED + urllib.parse.quote(url, safe=""),
                oembed=True,
            )
        )
    for selection in artist.track_selections:
        track_id = selection.track.spotify_track_id
        url = f"https://open.spotify.com/track/{track_id}"
        role = "quick picks" if selection.is_quick_picks else "listen first"
        targets.append(
            LinkTarget(
                f"spotify track ({role})",
                track_id,
                _SPOTIFY_OEMBED + urllib.parse.quote(url, safe=""),
                oembed=True,
            )
        )
    for video in artist.videos:
        url = f"https://www.youtube.com/watch?v={video.youtube_video_id}"
        targets.append(
            LinkTarget(
                "youtube video",
                video.youtube_video_id,
                _YOUTUBE_OEMBED + urllib.parse.quote(url, safe=""),
                oembed=True,
            )
        )
    for label, value in (
        ("youtube url", artist.youtube_url),
        ("tiktok url", artist.tiktok_url),
        ("image source", artist.image_source_url),
        ("image license", artist.image_license_url),
    ):
        if value:
            targets.append(LinkTarget(label, value, value, oembed=False))
    if artist.image_url:
        is_remote = artist.image_url.startswith("http")
        targets.append(
            LinkTarget(
                "image url",
                artist.image_url,
                artist.image_url if is_remote else None,
                oembed=False,
            )
        )
    return targets


def _http_status(url: str, timeout: float) -> int | None:
    try:
        request = urllib.request.Request(url, headers={"User-Agent": _USER_AGENT})
        with urllib.request.urlopen(request, timeout=timeout) as response:
            return response.status
    except urllib.error.HTTPError as error:
        return error.code
    except Exception:
        # Any other failure — a network error, a timeout, or a malformed stored URL
        # (e.g. two URLs comma-joined in one field) — means "could not verify".
        return None


def _resolve_target(target: LinkTarget, timeout: float) -> LinkState:
    if target.check_url is None:
        return "unverifiable"  # local asset, not checkable from here
    state = classify(_http_status(target.check_url, timeout), oembed=target.oembed)
    if state == "unverifiable":
        # One retry after a jittered pause: an "unverifiable" is often a transient
        # rate-limit (Spotify's oEmbed throttles a burst), not a real failure. A
        # confirmed 404/410 is already "broken" and is not retried.
        time.sleep(1.0 + random.random())
        state = classify(_http_status(target.check_url, timeout), oembed=target.oembed)
    return state


def check_artists(
    artists: list[Artist], *, timeout: float, jobs: int
) -> dict[str, list[tuple[LinkTarget, LinkState]]]:
    """Resolve every link for every artist, up to ``jobs`` requests in parallel.

    Results are grouped by slug and kept in `link_targets` order per artist.
    """
    work = [
        (artist.slug, target) for artist in artists for target in link_targets(artist)
    ]
    grouped: dict[str, list[tuple[LinkTarget, LinkState]]] = {
        artist.slug: [] for artist in artists
    }
    if not work:
        return grouped
    with ThreadPoolExecutor(max_workers=max(1, jobs)) as pool:
        states = pool.map(lambda item: _resolve_target(item[1], timeout), work)
    for (slug, target), state in zip(work, states):
        grouped[slug].append((target, state))
    return grouped


def _select_artists(session, args) -> list[Artist]:
    query = select(Artist).options(
        selectinload(Artist.track_selections).selectinload(ArtistTrackSelection.track),
        selectinload(Artist.videos),
    )
    if args.slug:
        query = query.where(Artist.slug == args.slug)
    elif args.edition and args.run:
        query = (
            query.join(Artist.lineup_entries)
            .join(LineupEntry.festival_run)
            .join(FestivalRun.festival_edition)
            .where(
                FestivalEdition.slug == args.edition,
                FestivalRun.slug == args.run,
            )
        )
    if not args.include_drafts:
        query = query.where(Artist.publication_status == "published")
    return list(session.scalars(query.order_by(Artist.slug)))


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    scope = parser.add_mutually_exclusive_group()
    scope.add_argument("--slug", help="check one artist")
    parser.add_argument("--edition", help="with --run, check every artist in that run")
    parser.add_argument("--run", help="with --edition, check every artist in that run")
    parser.add_argument(
        "--include-drafts",
        action="store_true",
        help="include draft artists (published only by default)",
    )
    parser.add_argument("--timeout", type=float, default=10.0)
    parser.add_argument(
        "--jobs",
        type=int,
        default=8,
        help="parallel HTTP requests (default 8; a whole-run check is otherwise slow)",
    )
    args = parser.parse_args()
    if bool(args.edition) != bool(args.run):
        parser.error("--edition and --run must be given together")

    with SessionLocal() as session:
        artists = _select_artists(session, args)

    if not artists:
        print("No matching artists.")
        return 0

    by_slug = check_artists(artists, timeout=args.timeout, jobs=args.jobs)

    totals = {"ok": 0, "broken": 0, "unverifiable": 0}
    broken_artists: list[str] = []
    for artist in artists:
        results = by_slug[artist.slug]
        if any(state == "broken" for _, state in results):
            broken_artists.append(artist.slug)
        print(f"\n{artist.slug}")
        for target, state in results:
            totals[state] += 1
            note = "" if target.check_url else "  (local asset, not checkable here)"
            print(f"  {state.upper():<13} {target.label:<24} {target.value}{note}")

    print(
        f"\n{len(artists)} artist(s) · {totals['ok']} ok · "
        f"{totals['broken']} broken · {totals['unverifiable']} unverifiable"
    )
    if broken_artists:
        print("BROKEN links on: " + ", ".join(broken_artists))
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
