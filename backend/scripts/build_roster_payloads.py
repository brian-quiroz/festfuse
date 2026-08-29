"""Create draft artists in PostgreSQL from a hand-authored roster CSV.

Stage 2 of the editorial pipeline (`docs/process/artist-editorial-process.md`): fan
each CSV row into an `add_artist` payload. A new slug runs `create_artist`; an
existing slug is added to the target run with `add_existing_artist_to_run`. Genres,
location, about, tracks, and similar artists are left for the research pass. The CSV
columns and the `--preview` / `--apply` flags are documented in
`docs/operations/backend-deployment.md` ("Editorial pipeline scripts").

  python -m scripts.build_roster_payloads --input roster.csv \
      --edition lollapalooza-2026 --run main --preview
"""

from __future__ import annotations

import argparse
import csv
from dataclasses import dataclass, field
from datetime import datetime
from pathlib import Path

from pydantic import ValidationError
from sqlalchemy import select

from app.database import SessionLocal
from app.lib.artist_source import BILLING_TIERS
from app.models import Artist, FestivalEdition, FestivalRun, LineupEntry
from app.schemas.artist_authoring import ArtistAuthoringInput
from app.services import (
    ArtistAuthoringError,
    add_existing_artist_to_run,
    create_artist,
    evaluate_artist_publication,
)

_SHARED_COLUMNS = ("name", "spotify_url", "youtube_url", "tiktok_url", "mbid")
_APPEARANCE_COLUMNS = ("billing_tier", "stage", "date", "start_time", "end_time")
_REQUIRED_COLUMNS = ("slug", "name", *_APPEARANCE_COLUMNS)


@dataclass
class RosterError:
    where: str  # a row number or a slug
    message: str


@dataclass
class ArtistOutcome:
    slug: str
    name: str
    # would create | created | would add to run | added to run | skipped | failed
    status: str
    detail: str = ""
    readiness_issues: list[str] = field(default_factory=list)


def weekday_label(date_str: str, year: int) -> str:
    """``("Jul 30", 2026)`` -> ``"Thursday"``."""
    return datetime.strptime(f"{date_str} {year}", "%b %d %Y").strftime("%A")


def _clean(value: str | None) -> str | None:
    if value is None:
        return None
    value = value.strip()
    return value or None


def parse_roster(
    rows: list[dict[str, str]], *, edition: str, run: str, year: int
) -> tuple[dict[str, dict], list[RosterError]]:
    """Group rows by slug and build one authoring payload dict per artist.

    Returns ``{slug: payload_dict}`` for the rows that parsed and a list of errors for
    the rows that did not (a missing required cell, an inconsistent shared field, a
    duplicated identity across artists).
    """
    errors: list[RosterError] = []
    grouped: dict[str, list[tuple[int, dict[str, str | None]]]] = {}

    for offset, raw in enumerate(rows):
        row_num = offset + 2  # +1 header, +1 to 1-index
        row = {key: _clean(value) for key, value in raw.items()}
        slug = row.get("slug")
        if not slug:
            errors.append(RosterError(f"row {row_num}", "missing slug"))
            continue
        missing = [column for column in _REQUIRED_COLUMNS if not row.get(column)]
        if missing:
            errors.append(
                RosterError(f"row {row_num}", f"missing {', '.join(missing)}")
            )
            continue
        if row["billing_tier"] not in BILLING_TIERS:
            errors.append(
                RosterError(
                    f"row {row_num}",
                    f"billing_tier {row['billing_tier']!r} is not one of "
                    f"{', '.join(BILLING_TIERS)}",
                )
            )
            continue
        grouped.setdefault(slug, []).append((row_num, row))

    payloads: dict[str, dict] = {}
    seen_identity: dict[tuple[str, str], str] = {}
    for slug, slug_rows in grouped.items():
        first = slug_rows[0][1]
        inconsistent = [
            column
            for column in _SHARED_COLUMNS
            if any(other[column] != first[column] for _, other in slug_rows[1:])
        ]
        if inconsistent:
            rows_at = ", ".join(str(row_num) for row_num, _ in slug_rows)
            errors.append(
                RosterError(
                    slug, f"rows {rows_at} disagree on {', '.join(inconsistent)}"
                )
            )
            continue

        clash = False
        for kind, value in (
            ("mbid", first["mbid"]),
            ("spotify_url", first["spotify_url"]),
        ):
            if value is None:
                continue
            owner = seen_identity.get((kind, value))
            if owner is not None:
                errors.append(
                    RosterError(slug, f"{kind} {value!r} is also used by {owner!r}")
                )
                clash = True
            seen_identity[(kind, value)] = slug
        if clash:
            continue

        socials = {
            key: first[f"{key}_url"]
            for key in ("spotify", "youtube", "tiktok")
            if first[f"{key}_url"]
        }
        appearances = [
            {
                "billingTier": row["billing_tier"],
                "stage": row["stage"],
                "day": weekday_label(row["date"], year),
                "date": row["date"],
                "startTime": row["start_time"],
                "endTime": row["end_time"],
            }
            for _, row in slug_rows
        ]
        payloads[slug] = {
            "schemaVersion": 1,
            "edition": edition,
            "run": run,
            "artist": {
                "name": first["name"],
                "slug": slug,
                **({"mbid": first["mbid"]} if first["mbid"] else {}),
                "socials": socials,
                "socialsVerified": True,
                "appearances": appearances,
            },
        }
    return payloads, errors


def create_from_payloads(
    session, payloads: dict[str, dict], run: FestivalRun, *, apply: bool
) -> list[ArtistOutcome]:
    """Validate and apply each payload against `run`. A new slug is created with
    `create_artist`; a slug that already exists is added to `run` with
    `add_existing_artist_to_run`, or reported skipped when it is already in that run.
    `--apply` commits each artist in its own transaction; `--preview` rolls every
    change back after checking it against the real database."""
    outcomes: list[ArtistOutcome] = []
    for slug, payload_dict in payloads.items():
        name = payload_dict["artist"]["name"]
        try:
            payload = ArtistAuthoringInput.model_validate(payload_dict)
        except ValidationError as error:
            summary = "; ".join(
                f"{'.'.join(str(part) for part in item['loc'])}: {item['msg']}"
                for item in error.errors()
            )
            outcomes.append(ArtistOutcome(slug, name, "failed", summary))
            continue

        artist_id = session.scalar(select(Artist.id).where(Artist.slug == slug))
        if artist_id is not None:
            already_in_run = session.scalar(
                select(LineupEntry.id).where(
                    LineupEntry.artist_id == artist_id,
                    LineupEntry.festival_run_id == run.id,
                )
            )
            if already_in_run is not None:
                outcomes.append(
                    ArtistOutcome(slug, name, "skipped", "already in this run")
                )
                continue

            savepoint = session.begin_nested()
            try:
                add_existing_artist_to_run(session, payload)
            except ArtistAuthoringError as error:
                savepoint.rollback()
                outcomes.append(ArtistOutcome(slug, name, "failed", str(error)))
                continue

            if apply:
                savepoint.commit()
                session.commit()
                outcomes.append(ArtistOutcome(slug, name, "added to run"))
            else:
                savepoint.rollback()
                outcomes.append(ArtistOutcome(slug, name, "would add to run"))
            continue

        savepoint = session.begin_nested()
        try:
            artist = create_artist(session, payload)
            issues = [
                issue.value for issue in evaluate_artist_publication(artist).issues
            ]
        except ArtistAuthoringError as error:
            savepoint.rollback()
            outcomes.append(ArtistOutcome(slug, name, "failed", str(error)))
            continue

        if apply:
            savepoint.commit()
            session.commit()
            outcomes.append(ArtistOutcome(slug, name, "created", "", issues))
        else:
            savepoint.rollback()
            outcomes.append(ArtistOutcome(slug, name, "would create", "", issues))

    if not apply:
        session.rollback()
    return outcomes


def _render_report(
    outcomes: list[ArtistOutcome], errors: list[RosterError], *, apply: bool
) -> None:
    if errors:
        print("Rows that did not parse:")
        for error in errors:
            print(f"  {error.where}: {error.message}")
        print()

    print("Every artist is created draft; readiness gaps are expected until the")
    print("research pass fills genres, location, and the Quick Picks track.\n")

    for outcome in outcomes:
        gaps = (
            f" (needs {', '.join(outcome.readiness_issues)})"
            if outcome.readiness_issues
            else ""
        )
        detail = f": {outcome.detail}" if outcome.detail else ""
        print(f"  {outcome.slug:<28} {outcome.status.upper()}{detail}{gaps}")

    tally = {
        status: 0
        for status in (
            "would create",
            "created",
            "would add to run",
            "added to run",
            "skipped",
            "failed",
        )
    }
    for outcome in outcomes:
        tally[outcome.status] = tally.get(outcome.status, 0) + 1
    parsed = len(outcomes)
    made = tally["created"] if apply else tally["would create"]
    added = tally["added to run"] if apply else tally["would add to run"]
    print(
        f"\n{parsed} parsed · {made} {'created' if apply else 'would create'} · "
        f"{added} {'added to run' if apply else 'would add to run'} · "
        f"{tally['skipped']} skipped · {tally['failed']} failed · "
        f"{len(errors)} unparsed row group(s)"
    )
    if apply:
        print("Applied. Publish ready artists later with publish_artists.")
    else:
        print("Preview only; nothing was written.")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", required=True, type=Path, help="roster CSV file")
    parser.add_argument("--edition", required=True, help="festival edition slug")
    parser.add_argument("--run", required=True, help="festival run slug")
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument(
        "--preview",
        action="store_true",
        help="validate every row against the database and roll back",
    )
    mode.add_argument(
        "--apply", action="store_true", help="create each artist in its own transaction"
    )
    args = parser.parse_args()

    try:
        text = args.input.read_text()
    except OSError as error:
        print(f"Could not read {args.input}: {error}")
        return 1
    reader = csv.DictReader(text.splitlines())
    if reader.fieldnames is None or not set(_REQUIRED_COLUMNS) <= set(
        reader.fieldnames
    ):
        missing = sorted(set(_REQUIRED_COLUMNS) - set(reader.fieldnames or []))
        print(f"CSV is missing required column(s): {', '.join(missing)}")
        return 1
    rows = list(reader)

    with SessionLocal() as session:
        edition = session.scalar(
            select(FestivalEdition).where(FestivalEdition.slug == args.edition)
        )
        if edition is None:
            print(f"Festival edition {args.edition!r} does not exist.")
            return 1

        run = session.scalar(
            select(FestivalRun).where(
                FestivalRun.festival_edition_id == edition.id,
                FestivalRun.slug == args.run,
            )
        )
        if run is None:
            print(
                f"Festival run {args.run!r} does not exist for edition "
                f"{args.edition!r}."
            )
            return 1

        payloads, errors = parse_roster(
            rows, edition=args.edition, run=args.run, year=edition.year
        )
        outcomes = create_from_payloads(session, payloads, run, apply=args.apply)

    _render_report(outcomes, errors, apply=args.apply)
    any_failed = any(outcome.status == "failed" for outcome in outcomes)
    return 1 if (any_failed or errors) else 0


if __name__ == "__main__":
    raise SystemExit(main())
