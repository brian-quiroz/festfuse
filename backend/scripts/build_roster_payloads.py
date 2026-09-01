"""Create draft artists in PostgreSQL from a hand-authored roster CSV.

Stage 2 of the editorial pipeline (`docs/process/artist-editorial-process.md`): fan
each CSV row into an `add_artist` payload. A new slug runs `create_artist`; an
existing slug is added to the target run with `add_existing_artist_to_run`. Genres,
location, about, tracks, and similar artists are left for the research pass. The CSV
columns and the `--preview` / `--apply` flags are documented in
`docs/operations/backend-deployment.md` ("Editorial pipeline scripts").

The schedule columns (stage, date, start_time, end_time) are optional and travel
together. A file with none of them is a roster-only import: each row creates an
*announced* lineup entry with no schedule (the run's derived schedule_state stays
"announced", ADR-0016) and needs `billing_tier`. A file with them is a scheduled
import; re-running it later against a run whose roster was already imported attaches
the schedule to each announced entry via `attach_run_schedule`, and `billing_tier` may
be omitted there (it is inherited). One file is all announced or all scheduled, never
a mix.

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
from sqlalchemy.orm import selectinload

from app.database import SessionLocal
from app.lib.artist_source import BILLING_TIERS
from app.models import Artist, FestivalEdition, FestivalRun, LineupEntry
from app.schemas.artist_authoring import ArtistAuthoringInput
from app.services import (
    ArtistAuthoringError,
    add_existing_artist_to_run,
    attach_run_schedule,
    create_artist,
    evaluate_artist_publication,
)

_SHARED_COLUMNS = ("name", "spotify_url", "youtube_url", "tiktok_url", "mbid")
# Present together or not at all. Absent -> a roster-only (announced) file.
_SCHEDULE_COLUMNS = ("stage", "date", "start_time", "end_time")
# billing_tier is required for an announced entry and inherited on a schedule attach,
# so it is enforced per row-group, not as a header.
_REQUIRED_COLUMNS = ("slug", "name")


@dataclass
class RosterError:
    where: str  # a row number or a slug
    message: str


@dataclass
class ArtistOutcome:
    slug: str
    name: str
    # would create | created | would add to run | added to run | would schedule |
    # scheduled | skipped | failed
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
    the rows that did not (a missing required cell, a partial schedule, an inconsistent
    shared field, a duplicated identity, an announced entry with no billing tier, a
    slug with more than one announced row). A payload with an empty ``appearances``
    list and a wrapper ``billingTier`` is a roster-only (announced) artist. If the file
    mixes announced and scheduled slugs it is refused whole (an empty payload map plus
    one error): one file is all announced or all scheduled.
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
        billing = row.get("billing_tier")
        if billing is not None and billing not in BILLING_TIERS:
            errors.append(
                RosterError(
                    f"row {row_num}",
                    f"billing_tier {billing!r} is not one of {', '.join(BILLING_TIERS)}",
                )
            )
            continue
        schedule_cells = [column for column in _SCHEDULE_COLUMNS if row.get(column)]
        if schedule_cells and len(schedule_cells) != len(_SCHEDULE_COLUMNS):
            missing_schedule = [c for c in _SCHEDULE_COLUMNS if not row.get(c)]
            errors.append(
                RosterError(
                    f"row {row_num}",
                    f"partial schedule: missing {', '.join(missing_schedule)}",
                )
            )
            continue
        grouped.setdefault(slug, []).append((row_num, row))

    payloads: dict[str, dict] = {}
    seen_identity: dict[tuple[str, str], str] = {}
    slug_modes: dict[str, bool] = {}  # slug -> is_scheduled, for the one-mode check
    for slug, slug_rows in grouped.items():
        first = slug_rows[0][1]
        inconsistent = [
            column
            for column in _SHARED_COLUMNS
            if any(other.get(column) != first.get(column) for _, other in slug_rows[1:])
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
            ("mbid", first.get("mbid")),
            ("spotify_url", first.get("spotify_url")),
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

        rows_at = ", ".join(str(row_num) for row_num, _ in slug_rows)
        row_scheduled = [
            all(other.get(column) for column in _SCHEDULE_COLUMNS)
            for _, other in slug_rows
        ]
        if any(row_scheduled) and not all(row_scheduled):
            errors.append(
                RosterError(slug, f"rows {rows_at} mix announced and scheduled entries")
            )
            continue
        is_scheduled = row_scheduled[0]
        if not is_scheduled and len(slug_rows) > 1:
            errors.append(
                RosterError(
                    slug,
                    f"rows {rows_at} repeat an announced entry "
                    "(one row per artist, no schedule)",
                )
            )
            continue
        if not is_scheduled and not first.get("billing_tier"):
            errors.append(RosterError(slug, "an announced entry needs billing_tier"))
            continue

        socials = {
            key: first.get(f"{key}_url")
            for key in ("spotify", "youtube", "tiktok")
            if first.get(f"{key}_url")
        }
        artist_fields: dict = {
            "name": first["name"],
            "slug": slug,
            **({"mbid": first["mbid"]} if first.get("mbid") else {}),
            "socials": socials,
            "socialsVerified": True,
        }
        payload: dict = {"schemaVersion": 1, "edition": edition, "run": run}
        if is_scheduled:
            # billing_tier is optional on a schedule row: attaching to an existing
            # announced entry inherits it. A brand-new slug still needs it, and
            # _resolve_billing_tier raises a clear error in that case.
            artist_fields["appearances"] = [
                {
                    **(
                        {"billingTier": row["billing_tier"]}
                        if row.get("billing_tier")
                        else {}
                    ),
                    "stage": row["stage"],
                    "day": weekday_label(row["date"], year),
                    "date": row["date"],
                    "startTime": row["start_time"],
                    "endTime": row["end_time"],
                }
                for _, row in slug_rows
            ]
        else:
            payload["billingTier"] = first["billing_tier"]
            artist_fields["appearances"] = []
        payload["artist"] = artist_fields
        payloads[slug] = payload
        slug_modes[slug] = is_scheduled

    if len(set(slug_modes.values())) > 1:
        return {}, [
            *errors,
            RosterError(
                "file", "mixes announced and scheduled slugs; split into two files"
            ),
        ]
    return payloads, errors


def _apply_one(
    session, slug: str, name: str, apply: bool, fn, payload, *, done: str, preview: str
) -> ArtistOutcome:
    """Run one authoring service call in its own savepoint: commit on ``--apply``,
    roll back on ``--preview``, and turn an ``ArtistAuthoringError`` into a failed
    outcome instead of aborting the batch."""
    savepoint = session.begin_nested()
    try:
        fn(session, payload)
    except ArtistAuthoringError as error:
        savepoint.rollback()
        return ArtistOutcome(slug, name, "failed", str(error))
    if apply:
        savepoint.commit()
        session.commit()
        return ArtistOutcome(slug, name, done)
    savepoint.rollback()
    return ArtistOutcome(slug, name, preview)


def create_from_payloads(
    session, payloads: dict[str, dict], run: FestivalRun, *, apply: bool
) -> list[ArtistOutcome]:
    """Validate and apply each payload against `run`. A new slug is created with
    `create_artist`; a slug that already exists is added to `run` with
    `add_existing_artist_to_run`. A schedule row for a slug already announced in `run`
    without one attaches the schedule (`attach_run_schedule`); any other already-in-run
    slug is reported skipped. `--apply` commits each artist in its own transaction;
    `--preview` rolls every change back after checking it against the real database."""
    outcomes: list[ArtistOutcome] = []
    for slug, payload_dict in payloads.items():
        name = payload_dict["artist"]["name"]
        has_schedule = bool(payload_dict["artist"]["appearances"])
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
            entry = session.scalar(
                select(LineupEntry)
                .where(
                    LineupEntry.artist_id == artist_id,
                    LineupEntry.festival_run_id == run.id,
                )
                .options(selectinload(LineupEntry.appearances))
            )
            if entry is not None:
                if has_schedule and not entry.appearances:
                    outcomes.append(
                        _apply_one(
                            session,
                            slug,
                            name,
                            apply,
                            attach_run_schedule,
                            payload,
                            done="scheduled",
                            preview="would schedule",
                        )
                    )
                else:
                    outcomes.append(
                        ArtistOutcome(slug, name, "skipped", "already in this run")
                    )
                continue

            outcomes.append(
                _apply_one(
                    session,
                    slug,
                    name,
                    apply,
                    add_existing_artist_to_run,
                    payload,
                    done="added to run",
                    preview="would add to run",
                )
            )
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

        detail = "" if has_schedule else "announced entry"
        if apply:
            savepoint.commit()
            session.commit()
            outcomes.append(ArtistOutcome(slug, name, "created", detail, issues))
        else:
            savepoint.rollback()
            outcomes.append(ArtistOutcome(slug, name, "would create", detail, issues))

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

    print("New artists are created draft (an announced entry when the schedule row is")
    print("absent); readiness gaps are expected until the research pass fills genres,")
    print("location, and the Quick Picks track.\n")

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
            "would schedule",
            "scheduled",
            "skipped",
            "failed",
        )
    }
    for outcome in outcomes:
        tally[outcome.status] = tally.get(outcome.status, 0) + 1
    parsed = len(outcomes)
    made = tally["created"] if apply else tally["would create"]
    added = tally["added to run"] if apply else tally["would add to run"]
    scheduled = tally["scheduled"] if apply else tally["would schedule"]
    print(
        f"\n{parsed} parsed · {made} {'created' if apply else 'would create'} · "
        f"{added} {'added to run' if apply else 'would add to run'} · "
        f"{scheduled} {'scheduled' if apply else 'would schedule'} · "
        f"{tally['skipped']} skipped · {tally['failed']} failed · "
        f"{len(errors)} unparsed row group(s)"
    )
    if apply:
        print("Applied. Publish ready artists later with publish_artists.")
    else:
        print("Preview only; nothing was written.")


class RosterCsvError(Exception):
    """The CSV file itself is unusable: unreadable, or missing a required column."""


def read_roster_csv(path: Path) -> list[dict[str, str]]:
    """Read a roster CSV into row dicts.

    Decoded as utf-8-sig so a byte-order mark from a spreadsheet export is stripped
    rather than landing in the first header name (which then fails the
    required-column check, since ``"slug"`` no longer matches). Raises
    ``RosterCsvError`` if the file cannot be read or is missing ``slug`` / ``name``.
    """
    try:
        text = path.read_text(encoding="utf-8-sig")
    except OSError as error:
        raise RosterCsvError(f"Could not read {path}: {error}") from error
    reader = csv.DictReader(text.splitlines())
    fieldnames = set(reader.fieldnames or ())
    if not set(_REQUIRED_COLUMNS) <= fieldnames:
        missing = sorted(set(_REQUIRED_COLUMNS) - fieldnames)
        raise RosterCsvError(f"CSV is missing required column(s): {', '.join(missing)}")
    return list(reader)


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
        rows = read_roster_csv(args.input)
    except RosterCsvError as error:
        print(error)
        return 1

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
