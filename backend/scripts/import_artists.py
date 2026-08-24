"""Validate and normalize the legacy TypeScript artist data.

The first importer checkpoint is intentionally read-only. It invokes the TypeScript
export boundary, validates the complete dataset, and prints the rows a later database
transaction will create without connecting to PostgreSQL.
"""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
import unicodedata
from collections import Counter
from datetime import UTC, datetime
from pathlib import Path
from typing import Any
from urllib.parse import urlparse
from zoneinfo import ZoneInfo

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import (
    Appearance,
    Artist,
    ArtistGenre,
    ArtistTrackSelection,
    ArtistVideo,
    FestivalDay,
    FestivalEdition,
    FestivalRun,
    Genre,
    GenreFamily,
    LineupEntry,
    SimilarArtist,
    SimilarArtistSet,
    Stage,
    Track,
)

PROJECT_ROOT = Path(__file__).resolve().parents[2]
EXPORT_SCRIPT = PROJECT_ROOT / "scripts" / "export-artist-data.ts"
TSX = PROJECT_ROOT / "node_modules" / ".bin" / "tsx"

FESTIVAL_CONFIG = {
    "lollapalooza-2026": {
        "run_slug": "main",
        "year": 2026,
        "timezone": "America/Chicago",
    }
}
BILLING_TIERS = {
    "Headliner": "headliner",
    "Sub-headliner": "sub_headliner",
    "Undercard": "undercard",
}
SLUG_PATTERN = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
FOCAL_Y_PATTERN = re.compile(r"^center\s+(\d{1,3})%$")
SPOTIFY_ARTIST_PATTERN = re.compile(r"^https://open\.spotify\.com/artist/([^/?#]+)")


def export_source() -> dict[str, Any]:
    """Run the checked-in TypeScript serializer and decode its JSON envelope."""
    if not TSX.is_file():
        raise RuntimeError("tsx is missing; run the frontend package install first")

    result = subprocess.run(
        [str(TSX), str(EXPORT_SCRIPT)],
        cwd=PROJECT_ROOT,
        capture_output=True,
        text=True,
        check=False,
    )
    if result.returncode != 0:
        raise RuntimeError(f"TypeScript export failed:\n{result.stderr.strip()}")
    try:
        return json.loads(result.stdout)
    except json.JSONDecodeError as error:
        raise RuntimeError("TypeScript export did not return valid JSON") from error


def generate_lookup_slug(value: str) -> str:
    """Generate slugs only for records without a curated source slug.

    Never call this for an Artist: Artist names and slugs are copied verbatim.
    """
    ascii_value = (
        unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode()
    )
    return re.sub(r"[^a-z0-9]+", "-", ascii_value.lower()).strip("-")


def valid_url(value: str) -> bool:
    parsed = urlparse(value)
    return parsed.scheme in {"http", "https"} and bool(parsed.netloc)


def parse_focal_y(value: str | None) -> int | None:
    if value is None:
        return None
    match = FOCAL_Y_PATTERN.fullmatch(value)
    if not match:
        raise ValueError(f"unsupported objectPosition {value!r}")
    percent = int(match.group(1))
    if percent > 100:
        raise ValueError(f"objectPosition percentage exceeds 100: {value!r}")
    return percent


def parse_spotify_artist_id(value: str | None) -> str | None:
    if value is None:
        return None
    match = SPOTIFY_ARTIST_PATTERN.match(value)
    if not match:
        raise ValueError(f"unsupported Spotify artist URL {value!r}")
    return match.group(1)


def parse_appearance_time(
    date_value: str, time_value: str, *, year: int, timezone: str
) -> datetime:
    naive = datetime.strptime(f"{date_value} {year} {time_value}", "%b %d %Y %I:%M %p")
    return naive.replace(tzinfo=ZoneInfo(timezone))


def validate_and_summarize(source: dict[str, Any]) -> tuple[dict[str, int], list[str]]:
    """Validate source invariants and count the normalized records to be created."""
    errors: list[str] = []
    counts: Counter[str] = Counter()

    if source.get("schemaVersion") != 1:
        errors.append(
            f"unsupported export schemaVersion: {source.get('schemaVersion')!r}"
        )

    artists = source.get("artists")
    genre_families = source.get("genreFamilies")
    festivals = source.get("festivals")
    vocabularies = source.get("vocabularies")
    if not isinstance(artists, list):
        return {}, errors + ["artists must be an array"]
    if not isinstance(genre_families, dict):
        return {}, errors + ["genreFamilies must be an object"]
    if not isinstance(festivals, dict):
        return {}, errors + ["festivals must be an object"]
    if not isinstance(vocabularies, dict):
        return {}, errors + ["vocabularies must be an object"]

    vocabulary_sets: dict[str, set[str]] = {}
    for name in (
        "bestFor",
        "billingTiers",
        "countries",
        "genres",
        "usStates",
        "whatToExpect",
    ):
        values = vocabularies.get(name)
        if not isinstance(values, list) or len(values) != len(set(values)):
            errors.append(f"vocabulary {name!r} must be a duplicate-free array")
            vocabulary_sets[name] = set()
        else:
            vocabulary_sets[name] = set(values)

    genre_to_family: dict[str, str] = {}
    for family_order, (family, genres) in enumerate(genre_families.items(), start=1):
        counts["genre_families"] += 1
        if not isinstance(genres, list) or not genres:
            errors.append(f"genre family {family!r} must contain genres")
            continue
        if not generate_lookup_slug(family) or family_order < 1:
            errors.append(f"invalid genre family {family!r}")
        for genre in genres:
            if genre in genre_to_family:
                errors.append(
                    f"genre {genre!r} belongs to both {genre_to_family[genre]!r} and {family!r}"
                )
            genre_to_family[genre] = family
            counts["genres"] += 1

    declared_genres = vocabulary_sets["genres"]
    mapped_genres = set(genre_to_family)
    if declared_genres != mapped_genres:
        missing = sorted(declared_genres - mapped_genres)
        extra = sorted(mapped_genres - declared_genres)
        errors.append(
            f"genre-family mapping mismatch; unmapped={missing!r}, undeclared={extra!r}"
        )

    slugs = [artist.get("slug") for artist in artists]
    known_slugs = {slug for slug in slugs if isinstance(slug, str)}
    duplicate_slugs = sorted(
        slug for slug, total in Counter(slugs).items() if total > 1
    )
    if duplicate_slugs:
        errors.append(f"duplicate artist slugs: {', '.join(map(str, duplicate_slugs))}")

    seen_track_ids: dict[str, str] = {}
    seen_video_ids: dict[str, str] = {}
    ready_artists = 0

    for artist in artists:
        slug = artist.get("slug")
        label = slug if isinstance(slug, str) else "<missing slug>"
        counts["artists"] += 1
        if not isinstance(slug, str) or not SLUG_PATTERN.fullmatch(slug):
            errors.append(f"{label}: invalid slug")
        if not isinstance(artist.get("name"), str) or not artist["name"].strip():
            errors.append(f"{label}: name is required")
        elif artist["name"] != unicodedata.normalize("NFC", artist["name"]):
            errors.append(f"{label}: artist name must already be Unicode NFC")

        genres = artist.get("genres", [])
        if not isinstance(genres, list) or len(genres) != 3:
            errors.append(f"{label}: expected exactly 3 genres, found {len(genres)}")
        elif len(set(genres)) != len(genres):
            errors.append(f"{label}: duplicate genre assignment")
        for order, genre in enumerate(genres, start=1):
            if genre not in declared_genres:
                errors.append(
                    f"{label}: genre {genre!r} is not in the Genre vocabulary"
                )
            elif genre not in genre_to_family:
                errors.append(f"{label}: unmapped genre {genre!r}")
            counts["artist_genres"] += 1
            if order > 3:
                errors.append(f"{label}: genre display order exceeds 3")

        location = artist.get("location")
        if not isinstance(location, dict):
            errors.append(f"{label}: location must be an object")
        else:
            city = location.get("city")
            country = location.get("country")
            state = location.get("state")
            if not isinstance(city, str) or not city.strip():
                errors.append(f"{label}: location city is required")
            if country not in vocabulary_sets["countries"]:
                errors.append(f"{label}: unsupported country {country!r}")
            if state is not None and state not in vocabulary_sets["usStates"]:
                errors.append(f"{label}: unsupported US state {state!r}")
            if state is not None and country != "United States":
                errors.append(
                    f"{label}: state is only valid for United States locations"
                )

        for field, vocabulary_name in (
            ("whatToExpect", "whatToExpect"),
            ("bestFor", "bestFor"),
        ):
            values = artist.get(field)
            if not isinstance(values, list):
                errors.append(f"{label}: {field} must be an array")
                continue
            invalid_values = sorted(set(values) - vocabulary_sets[vocabulary_name])
            if invalid_values:
                errors.append(f"{label}: unsupported {field} values {invalid_values!r}")

        socials = artist.get("socials", {})
        if not isinstance(socials, dict):
            errors.append(f"{label}: socials must be an object")
            socials = {}
        for platform in ("spotify", "youtube", "tiktok"):
            url = socials.get(platform)
            if url is not None and (not isinstance(url, str) or not valid_url(url)):
                errors.append(f"{label}: invalid {platform} URL")
        try:
            spotify_artist_id = parse_spotify_artist_id(socials.get("spotify"))
            parse_focal_y(artist.get("objectPosition"))
        except ValueError as error:
            errors.append(f"{label}: {error}")
            spotify_artist_id = None

        if artist.get("about"):
            counts["about_content_preserved"] += 1
            if artist.get("aboutVerified"):
                counts["about_verified"] += 1
            else:
                counts["about_unverified_preserved"] += 1

        source_image_url = artist.get("imageUrl")
        if source_image_url:
            counts["source_image_urls"] += 1
        image_url = source_image_url if artist.get("imageVerified") else None
        if image_url is not None:
            counts["approved_images_imported"] += 1
            credit = artist.get("imageCredit")
            if credit:
                for field in ("sourceUrl", "licenseUrl"):
                    if not valid_url(credit.get(field, "")):
                        errors.append(f"{label}: invalid image credit {field}")
        elif source_image_url:
            counts["unapproved_images_omitted"] += 1

        if artist.get("socialsVerified"):
            counts["socials_verified"] += 1
        else:
            counts["socials_unverified"] += 1
        if socials.get("youtube"):
            counts["youtube_urls_preserved"] += 1
        if socials.get("tiktok"):
            counts["tiktok_urls_preserved"] += 1

        tracks = artist.get("tracks", [])
        quick_pick = tracks[0] if tracks else None
        quick_pick_id = quick_pick.get("spotifyId") if quick_pick else None
        selections: dict[str, dict[str, Any]] = {}
        if quick_pick_id:
            selections[quick_pick_id] = {"quick": True, "listen_order": None}
        override = artist.get("listenFirst")
        if override is not None:
            identified_tracks = [track for track in tracks if track.get("spotifyId")]
            if override.get("mode") != "tracks" or len(identified_tracks) != 3:
                errors.append(
                    f"{label}: curated Listen First must contain 3 identified tracks"
                )
            for order, track in enumerate(identified_tracks, start=1):
                track_id = track["spotifyId"]
                selection = selections.setdefault(
                    track_id, {"quick": False, "listen_order": None}
                )
                selection["listen_order"] = order
        for track_id, selection in selections.items():
            track = next(
                track for track in tracks if track.get("spotifyId") == track_id
            )
            prior_name = seen_track_ids.setdefault(track_id, track.get("name", ""))
            if prior_name != track.get("name", ""):
                errors.append(
                    f"{label}: Spotify track {track_id} has conflicting names"
                )
            counts["track_selections"] += 1
        counts["tracks"] = len(seen_track_ids)

        video_id = artist.get("liveVideoId")
        if video_id:
            if not artist.get("liveVideoLabel"):
                errors.append(f"{label}: live video requires a label")
            prior_artist = seen_video_ids.setdefault(video_id, label)
            if prior_artist != label:
                errors.append(f"YouTube video {video_id} belongs to multiple artists")
            counts["artist_videos"] += 1

        similar = artist.get("similarArtists", [])
        if artist.get("similarArtistsVerified"):
            if len(similar) not in {0, 4}:
                errors.append(
                    f"{label}: verified similarity set must contain 0 or 4 artists"
                )
            counts["similar_artist_sets"] += 1
            for target in similar:
                target_slug = target.get("slug")
                if target_slug not in known_slugs:
                    errors.append(f"{label}: unresolved similar artist {target_slug!r}")
                if target_slug == slug:
                    errors.append(f"{label}: cannot recommend itself")
                counts["similar_artists"] += 1
        else:
            counts["similar_sets_unverified_omitted"] += 1

        counts["deferred_taglines"] += int(bool(artist.get("tagline")))
        counts["deferred_why_see_items"] += len(artist.get("whySee", []))
        counts["deferred_what_to_expect_items"] += len(artist.get("whatToExpect", []))
        counts["deferred_best_for_items"] += len(artist.get("bestFor", []))

        appearances = artist.get("appearances", [])
        if not appearances:
            errors.append(f"{label}: requires at least one legacy appearance")
        festival_ids: set[str] = set()
        artist_appearance_ids: set[str] = set()
        for appearance in appearances:
            appearance_id = appearance.get("id")
            if appearance_id in artist_appearance_ids:
                errors.append(f"{label}: duplicate appearance ID {appearance_id!r}")
            artist_appearance_ids.add(appearance_id)
            festival_id = appearance.get("festivalId")
            festival_ids.add(festival_id)
            festival = festivals.get(festival_id)
            config = FESTIVAL_CONFIG.get(festival_id)
            if not festival or not config:
                errors.append(f"{label}: unsupported festival {festival_id!r}")
                continue
            if appearance.get("day") not in festival.get("days", []):
                errors.append(
                    f"{label}: unsupported festival day {appearance.get('day')!r}"
                )
            if appearance.get("stage") not in festival.get("stages", []):
                errors.append(f"{label}: unsupported stage {appearance.get('stage')!r}")
            billing_tier = appearance.get("billingTier")
            if (
                billing_tier not in vocabulary_sets["billingTiers"]
                or billing_tier not in BILLING_TIERS
            ):
                errors.append(f"{label}: unsupported billing tier")
            try:
                starts_at = parse_appearance_time(
                    appearance["date"],
                    appearance["startTime"],
                    year=config["year"],
                    timezone=config["timezone"],
                )
                ends_at = parse_appearance_time(
                    appearance["date"],
                    appearance["endTime"],
                    year=config["year"],
                    timezone=config["timezone"],
                )
                if ends_at <= starts_at:
                    errors.append(
                        f"{label}: appearance {appearance_id} has non-positive duration"
                    )
            except (KeyError, ValueError) as error:
                errors.append(f"{label}: invalid appearance {appearance_id}: {error}")
            counts["appearances"] += 1
        counts["lineup_entries"] += len(festival_ids)

        publish_ready = bool(
            quick_pick_id and len(genres) == 3 and (spotify_artist_id or override)
        )
        ready_artists += int(publish_ready)

    counts["publication_ready"] = ready_artists
    counts["remaining_draft"] = len(artists) - ready_artists
    counts.setdefault("similar_sets_unverified_omitted", 0)
    return dict(counts), errors


def require_empty_import_target(session: Session) -> None:
    """Refuse to merge an initial snapshot into partially populated domain tables."""
    guarded_models = (Artist, GenreFamily, Genre, Track)
    populated = [
        model.__tablename__
        for model in guarded_models
        if session.scalar(select(func.count()).select_from(model))
    ]
    if populated:
        raise RuntimeError(
            "initial artist import requires empty domain tables; populated: "
            + ", ".join(populated)
        )


def import_source(
    session: Session, source: dict[str, Any], *, imported_at: datetime
) -> dict[str, int]:
    """Create the validated snapshot in the current transaction without committing."""
    require_empty_import_target(session)
    counts: Counter[str] = Counter()

    family_by_name: dict[str, GenreFamily] = {}
    genre_by_name: dict[str, Genre] = {}
    for family_order, (family_name, genre_names) in enumerate(
        source["genreFamilies"].items(), start=1
    ):
        family = GenreFamily(
            slug=generate_lookup_slug(family_name),
            name=family_name,
            display_order=family_order,
        )
        family_by_name[family_name] = family
        counts["genre_families"] += 1
        for genre_name in genre_names:
            genre = Genre(
                family=family,
                slug=generate_lookup_slug(genre_name),
                name=genre_name,
            )
            genre_by_name[genre_name] = genre
            counts["genres"] += 1
    session.add_all(family_by_name.values())

    run_by_festival_slug: dict[str, FestivalRun] = {}
    day_by_festival_and_date: dict[tuple[str, object], FestivalDay] = {}
    stage_by_festival_and_name: dict[tuple[str, str], Stage] = {}
    for festival_slug, festival_config in FESTIVAL_CONFIG.items():
        edition = session.scalar(
            select(FestivalEdition).where(FestivalEdition.slug == festival_slug)
        )
        if edition is None:
            raise RuntimeError(
                f"festival edition {festival_slug!r} is not seeded; run seed_festival first"
            )
        run = session.scalar(
            select(FestivalRun).where(
                FestivalRun.festival_edition_id == edition.id,
                FestivalRun.slug == festival_config["run_slug"],
            )
        )
        if run is None:
            raise RuntimeError(
                f"festival run {festival_config['run_slug']!r} is not seeded for "
                f"{festival_slug!r}"
            )
        run_by_festival_slug[festival_slug] = run
        for day in session.scalars(
            select(FestivalDay).where(FestivalDay.festival_run_id == run.id)
        ):
            day_by_festival_and_date[(festival_slug, day.date)] = day

        existing_stages = list(
            session.scalars(
                select(Stage).where(Stage.festival_edition_id == edition.id)
            )
        )
        if existing_stages:
            raise RuntimeError(
                f"initial artist import requires no existing stages for {festival_slug!r}"
            )
        for display_order, stage_name in enumerate(
            source["festivals"][festival_slug]["stages"], start=1
        ):
            stage = Stage(
                festival_edition=edition,
                slug=generate_lookup_slug(stage_name),
                name=stage_name,
                display_order=display_order,
            )
            stage_by_festival_and_name[(festival_slug, stage_name)] = stage
            counts["stages"] += 1
        session.add_all(stage_by_festival_and_name.values())

    artist_by_slug: dict[str, Artist] = {}
    source_artist_by_slug = {artist["slug"]: artist for artist in source["artists"]}
    for source_artist in source["artists"]:
        socials = source_artist["socials"]
        credit = source_artist.get("imageCredit") or {}
        image_is_approved = bool(source_artist.get("imageVerified"))
        artist = Artist(
            slug=source_artist["slug"],
            name=source_artist["name"],
            spotify_artist_id=parse_spotify_artist_id(socials.get("spotify")),
            image_url=source_artist.get("imageUrl") if image_is_approved else None,
            image_focal_y_percent=(
                parse_focal_y(source_artist.get("objectPosition"))
                if image_is_approved
                else None
            ),
            image_credit_author=credit.get("author") if image_is_approved else None,
            image_source_url=credit.get("sourceUrl") if image_is_approved else None,
            image_license_url=credit.get("licenseUrl") if image_is_approved else None,
            location_city=source_artist["location"]["city"],
            location_state=source_artist["location"].get("state"),
            location_country=source_artist["location"]["country"],
            about=source_artist.get("about"),
            about_verified_at=(
                imported_at if source_artist.get("aboutVerified") else None
            ),
            youtube_url=socials.get("youtube"),
            tiktok_url=socials.get("tiktok"),
            socials_verified=bool(source_artist.get("socialsVerified")),
            listen_first_note=(source_artist.get("listenFirst") or {}).get("note"),
            publication_status="draft",
        )
        for display_order, genre_name in enumerate(source_artist["genres"], start=1):
            artist.genre_assignments.append(
                ArtistGenre(
                    genre=genre_by_name[genre_name],
                    display_order=display_order,
                    is_primary=display_order == 1,
                )
            )
            counts["artist_genres"] += 1
        artist_by_slug[source_artist["slug"]] = artist
        counts["artists"] += 1
    session.add_all(artist_by_slug.values())
    session.flush()

    track_by_spotify_id: dict[str, Track] = {}
    similarity_sets_to_verify: list[SimilarArtistSet] = []

    for artist_slug, source_artist in source_artist_by_slug.items():
        artist = artist_by_slug[artist_slug]
        tracks = source_artist["tracks"]
        quick_pick_id = tracks[0].get("spotifyId") if tracks else None
        selected_tracks: dict[str, dict[str, Any]] = {}
        if quick_pick_id:
            selected_tracks[quick_pick_id] = {
                "track": tracks[0],
                "is_quick_picks": True,
                "listen_first_order": None,
            }
        if source_artist.get("listenFirst"):
            identified_tracks = [track for track in tracks if track.get("spotifyId")]
            for listen_order, source_track in enumerate(identified_tracks, start=1):
                spotify_track_id = source_track["spotifyId"]
                selection = selected_tracks.setdefault(
                    spotify_track_id,
                    {
                        "track": source_track,
                        "is_quick_picks": False,
                        "listen_first_order": None,
                    },
                )
                selection["listen_first_order"] = listen_order

        for spotify_track_id, selection in selected_tracks.items():
            track = track_by_spotify_id.get(spotify_track_id)
            if track is None:
                track = Track(
                    spotify_track_id=spotify_track_id,
                    name=selection["track"]["name"],
                )
                track_by_spotify_id[spotify_track_id] = track
            artist.track_selections.append(
                ArtistTrackSelection(
                    track=track,
                    is_quick_picks=selection["is_quick_picks"],
                    listen_first_order=selection["listen_first_order"],
                )
            )
            counts["track_selections"] += 1

        video_id = source_artist.get("liveVideoId")
        if video_id:
            artist.videos.append(
                ArtistVideo(
                    youtube_video_id=video_id,
                    label=source_artist["liveVideoLabel"],
                    is_featured=True,
                    display_order=1,
                    is_available=True,
                    last_checked_at=imported_at,
                )
            )
            counts["artist_videos"] += 1

        appearances_by_festival: dict[str, list[dict[str, Any]]] = {}
        for appearance in source_artist["appearances"]:
            appearances_by_festival.setdefault(appearance["festivalId"], []).append(
                appearance
            )
        for festival_slug, appearances in appearances_by_festival.items():
            billing_tiers = {appearance["billingTier"] for appearance in appearances}
            if len(billing_tiers) != 1:
                raise RuntimeError(
                    f"{artist_slug}: appearances disagree on lineup billing tier"
                )
            lineup_entry = LineupEntry(
                festival_run=run_by_festival_slug[festival_slug],
                artist=artist,
                lineup_status="announced",
                billing_tier=BILLING_TIERS[billing_tiers.pop()],
                announced_at=None,
            )
            counts["lineup_entries"] += 1
            for appearance in appearances:
                config = FESTIVAL_CONFIG[festival_slug]
                starts_at = parse_appearance_time(
                    appearance["date"],
                    appearance["startTime"],
                    year=config["year"],
                    timezone=config["timezone"],
                )
                ends_at = parse_appearance_time(
                    appearance["date"],
                    appearance["endTime"],
                    year=config["year"],
                    timezone=config["timezone"],
                )
                festival_day = day_by_festival_and_date.get(
                    (festival_slug, starts_at.date())
                )
                if festival_day is None:
                    raise RuntimeError(
                        f"{artist_slug}: no seeded FestivalDay for {starts_at.date()}"
                    )
                lineup_entry.appearances.append(
                    Appearance(
                        festival_day=festival_day,
                        stage=stage_by_festival_and_name[
                            (festival_slug, appearance["stage"])
                        ],
                        starts_at=starts_at,
                        ends_at=ends_at,
                        appearance_status="scheduled",
                    )
                )
                counts["appearances"] += 1
            session.add(lineup_entry)
    counts["tracks"] = len(track_by_spotify_id)
    session.flush()

    for artist_slug, source_artist in source_artist_by_slug.items():
        if not source_artist.get("similarArtistsVerified"):
            continue
        appearances = source_artist["appearances"]
        festival_slugs = {appearance["festivalId"] for appearance in appearances}
        for festival_slug in festival_slugs:
            similarity_set = SimilarArtistSet(
                festival_run=run_by_festival_slug[festival_slug],
                source_artist=artist_by_slug[artist_slug],
                verified_at=None,
            )
            for display_order, target in enumerate(
                source_artist["similarArtists"], start=1
            ):
                similarity_set.entries.append(
                    SimilarArtist(
                        target_artist=artist_by_slug[target["slug"]],
                        display_order=display_order,
                    )
                )
                counts["similar_artists"] += 1
            session.add(similarity_set)
            similarity_sets_to_verify.append(similarity_set)
            counts["similar_artist_sets"] += 1
    session.flush()

    # Entry triggers clear verification, so verification is intentionally the last
    # similarity-set write after all entries and announced lineups exist.
    for similarity_set in similarity_sets_to_verify:
        similarity_set.verified_at = imported_at
    session.flush()

    return dict(counts)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument(
        "--dry-run", action="store_true", help="validate and report without writing"
    )
    mode.add_argument(
        "--apply",
        action="store_true",
        help="write the validated initial snapshot in one PostgreSQL transaction",
    )
    args = parser.parse_args()

    try:
        source = export_source()
        counts, errors = validate_and_summarize(source)
    except RuntimeError as error:
        print(f"Export failed: {error}", file=sys.stderr)
        return 1

    print("Artist import dry run")
    print("---------------------")
    label_width = max(len(name.replace("_", " ")) for name in counts)
    for name in sorted(counts):
        print(f"{name.replace('_', ' '):<{label_width}} {counts[name]:>4}")
    if errors:
        print(f"\nValidation failed with {len(errors)} error(s):", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    if args.dry_run:
        print("\nValidation passed. No database changes were made.")
        return 0

    try:
        with SessionLocal() as session, session.begin():
            imported_counts = import_source(
                session,
                source,
                imported_at=datetime.now(UTC),
            )
        print("\nImport committed successfully:")
        label_width = max(len(name.replace("_", " ")) for name in imported_counts)
        for name in sorted(imported_counts):
            print(f"{name.replace('_', ' '):<{label_width}} {imported_counts[name]:>4}")
    except Exception as error:
        print(f"\nImport rolled back: {error}", file=sys.stderr)
        return 1

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
