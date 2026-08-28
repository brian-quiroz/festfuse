"""Print one artist's full stored record, or a whole-roster snapshot, from PostgreSQL.

Read-only. ``--slug <slug>`` dumps every stored field, the verification stamps,
publication readiness, the run-scoped similar-artist set, and how many other artists
cite this one as similar. ``--roster`` prints one line per published artist
(slug, name, genres, billing, day, inbound similar-artist count) for the similar-artist
membership check and the distribution balance sweep. Neither mode writes anything.
"""

from __future__ import annotations

import argparse
from datetime import datetime

from sqlalchemy import func, select
from sqlalchemy.orm import selectinload

from app.database import SessionLocal
from app.models import (
    Appearance,
    Artist,
    ArtistGenre,
    ArtistTrackSelection,
    LineupEntry,
    SimilarArtist,
    SimilarArtistSet,
)
from app.services import evaluate_artist_publication

_BILLING_LABEL = {
    "headliner": "Headliner",
    "sub_headliner": "Sub-headliner",
    "undercard": "Undercard",
}


def _artist_days(artist: Artist) -> str:
    """Distinct weekday labels across the artist's appearances, e.g. ``Thu/Sun``."""
    dates = sorted(
        {
            appearance.festival_day.date
            for entry in artist.lineup_entries
            for appearance in entry.appearances
        }
    )
    return "/".join(day.strftime("%a") for day in dates) or "-"


def _earliest_start(artist: Artist) -> datetime | None:
    starts = [
        appearance.starts_at
        for entry in artist.lineup_entries
        for appearance in entry.appearances
    ]
    return min(starts) if starts else None


def _inbound_counts(session) -> dict[int, int]:
    rows = session.execute(
        select(SimilarArtist.target_artist_id, func.count()).group_by(
            SimilarArtist.target_artist_id
        )
    ).all()
    return {artist_id: count for artist_id, count in rows}


def _render_detail(session, slug: str) -> int:
    artist = session.scalar(
        select(Artist)
        .where(Artist.slug == slug)
        .options(
            selectinload(Artist.genre_assignments).selectinload(ArtistGenre.genre),
            selectinload(Artist.track_selections).selectinload(
                ArtistTrackSelection.track
            ),
            selectinload(Artist.videos),
            selectinload(Artist.lineup_entries)
            .selectinload(LineupEntry.appearances)
            .selectinload(Appearance.festival_day),
            selectinload(Artist.lineup_entries)
            .selectinload(LineupEntry.appearances)
            .selectinload(Appearance.stage),
            selectinload(Artist.similarity_sets)
            .selectinload(SimilarArtistSet.entries)
            .selectinload(SimilarArtist.target_artist),
        )
    )
    if artist is None:
        print(f"No artist with slug {slug!r}.")
        return 1

    inbound = session.scalar(
        select(func.count()).where(SimilarArtist.target_artist_id == artist.id)
    )
    readiness = evaluate_artist_publication(artist)

    def line(label: str, value: object) -> None:
        print(f"  {label:<20} {value if value not in (None, '') else '-'}")

    print(f"{artist.name}  ({artist.slug})")
    print("=" * max(len(artist.name) + len(artist.slug) + 4, 20))
    line("publication", artist.publication_status)
    line("mbid", artist.mbid)
    line("spotify artist id", artist.spotify_artist_id)
    line(
        "location",
        ", ".join(
            p
            for p in (
                artist.location_city,
                artist.location_state,
                artist.location_country,
            )
            if p
        ),
    )
    genres = [
        f"{a.genre.name}{'*' if a.is_primary else ''}" for a in artist.genre_assignments
    ]
    line("genres", ", ".join(genres))
    line("youtube", artist.youtube_url)
    line("tiktok", artist.tiktok_url)
    line("socials verified", artist.socials_verified)
    line("image", artist.image_url)
    if artist.image_url:
        line("image credit", artist.image_credit_author)
        line("image source", artist.image_source_url)
        line("image year", artist.image_taken_year)
        line("image sourced", artist.image_sourced_at)
    line("about verified", artist.about_verified_at)
    print("\n  about:")
    print(f"    {artist.about}\n" if artist.about else "    -\n")

    quick = [s for s in artist.track_selections if s.is_quick_picks]
    line(
        "quick picks track",
        f"{quick[0].track.name} ({quick[0].track.spotify_track_id})" if quick else None,
    )
    listen_first = sorted(
        (s for s in artist.track_selections if s.listen_first_order is not None),
        key=lambda s: s.listen_first_order,
    )
    if listen_first:
        line(
            "listen first",
            "; ".join(f"{s.listen_first_order}. {s.track.name}" for s in listen_first),
        )
        line("listen first note", artist.listen_first_note)
    featured = [v for v in artist.videos if v.is_featured]
    line(
        "featured video",
        f"{featured[0].label} ({featured[0].youtube_video_id})" if featured else None,
    )

    for entry in artist.lineup_entries:
        billing = _BILLING_LABEL.get(entry.billing_tier or "", entry.billing_tier)
        line("lineup entry", f"{entry.lineup_status} / billing {billing or '-'}")
        for appearance in entry.appearances:
            start = appearance.starts_at.strftime("%I:%M %p").lstrip("0")
            end = appearance.ends_at.strftime("%I:%M %p").lstrip("0")
            line(
                "  appearance",
                f"{appearance.festival_day.date.strftime('%a %b %d')} "
                f"{start}-{end} @ {appearance.stage.name} "
                f"[{appearance.appearance_status}]",
            )

    for similarity_set in artist.similarity_sets:
        targets = ", ".join(
            e.target_artist.slug
            for e in sorted(similarity_set.entries, key=lambda e: e.display_order)
        )
        state = (
            f"verified {similarity_set.verified_at}"
            if similarity_set.verified_at
            else "unverified"
        )
        line("similar set", f"[{state}] {targets or '(empty)'}")
    line("cited as similar by", inbound)

    print()
    if readiness.is_ready:
        print("Publication readiness: READY.")
    else:
        print("Publication readiness: NOT READY —")
        for issue in readiness.issues:
            print(f"  - {issue.value}")
    return 0


def _render_roster(session, *, sort: str, include_drafts: bool) -> int:
    query = select(Artist).options(
        selectinload(Artist.genre_assignments).selectinload(ArtistGenre.genre),
        selectinload(Artist.lineup_entries)
        .selectinload(LineupEntry.appearances)
        .selectinload(Appearance.festival_day),
    )
    if not include_drafts:
        query = query.where(Artist.publication_status == "published")
    artists = list(session.scalars(query))
    counts = _inbound_counts(session)

    def billing(artist: Artist) -> str:
        entries = artist.lineup_entries
        tier = entries[0].billing_tier if entries else None
        return _BILLING_LABEL.get(tier or "", tier or "-")

    rows = [
        {
            "slug": a.slug,
            "name": a.name,
            "genres": ", ".join(g.genre.name for g in a.genre_assignments) or "-",
            "billing": billing(a),
            "day": _artist_days(a),
            "refs": counts.get(a.id, 0),
            "_start": _earliest_start(a) or datetime.max.replace(tzinfo=None),
        }
        for a in artists
    ]

    if sort == "slug":
        rows.sort(key=lambda r: r["slug"])
    elif sort == "schedule":
        rows.sort(key=lambda r: (str(r["_start"]), r["slug"]))
    else:  # similar-count
        rows.sort(key=lambda r: (r["refs"], r["slug"]))

    widths = {
        key: max(len(key), *(len(str(row[key])) for row in rows)) if rows else len(key)
        for key in ("slug", "name", "billing", "day")
    }
    header = (
        f"{'slug':<{widths['slug']}}  {'name':<{widths['name']}}  "
        f"{'billing':<{widths['billing']}}  {'day':<{widths['day']}}  refs  genres"
    )
    print(header)
    print("-" * len(header))
    for row in rows:
        print(
            f"{row['slug']:<{widths['slug']}}  {row['name']:<{widths['name']}}  "
            f"{row['billing']:<{widths['billing']}}  {row['day']:<{widths['day']}}  "
            f"{row['refs']:>4}  {row['genres']}"
        )
    print(f"\n{len(rows)} artist(s).")
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument("--slug", help="dump one artist's full record")
    mode.add_argument(
        "--roster",
        action="store_true",
        help="whole-roster snapshot with inbound counts",
    )
    parser.add_argument(
        "--sort",
        choices=("similar-count", "slug", "schedule"),
        default="similar-count",
        help="--roster order (default: inbound similar-artist count, ascending)",
    )
    parser.add_argument(
        "--include-drafts",
        action="store_true",
        help="--roster: include draft artists (published only by default)",
    )
    args = parser.parse_args()

    with SessionLocal() as session:
        if args.roster:
            return _render_roster(
                session, sort=args.sort, include_drafts=args.include_drafts
            )
        return _render_detail(session, args.slug)


if __name__ == "__main__":
    raise SystemExit(main())
