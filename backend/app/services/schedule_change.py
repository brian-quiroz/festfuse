"""Apply an official schedule change to an edition's runs directly in PostgreSQL.

The service behind ``scripts/apply_schedule_changes.py``. Like the other authoring
services it never commits; the caller owns the transaction.

A move edits the stable Appearance row in place: its id is what users' saved Planner
schedules are keyed by (``getAppearanceKey`` in ``app/lib/schedule.ts``), so a deleted
and re-created row would silently drop it from every saved schedule. A withdrawal moves
the LineupEntry to ``withdrawn`` and keeps its appearances, which drops the artist from
every public run feed (they read announced entries only). It never cancels an
Appearance: the frontend does not yet render a cancelled one. See ADR-0021 and
ADR-0022.
"""

from collections import defaultdict
from collections.abc import Iterable
from dataclasses import dataclass, field
from datetime import UTC, datetime
from zoneinfo import ZoneInfo

from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload, selectinload

from app.lib.artist_source import parse_appearance_time
from app.models import (
    Appearance,
    Artist,
    FestivalEdition,
    FestivalRun,
    LineupEntry,
    SimilarArtist,
    SimilarArtistSet,
    Stage,
)
from app.schemas.schedule_change import MoveAppearanceChange, ScheduleChangeInput


class ScheduleChangeError(RuntimeError):
    """A changeset that cannot be applied as written; nothing should be committed."""


@dataclass(frozen=True)
class AppearanceMove:
    run_slug: str
    artist_slug: str
    before: str
    after: str


@dataclass(frozen=True)
class LineupWithdrawal:
    run_slug: str
    artist_slug: str
    retained_appearances: list[str]
    # Artists whose verified similar-artist set on this run includes the withdrawn
    # artist. The withdrawal unverifies each of those sets (a database trigger), so
    # every one loses its Similar Artists section until the set is re-curated.
    similar_sources: list[str]


@dataclass
class ScheduleChangeSummary:
    moves: list[AppearanceMove] = field(default_factory=list)
    withdrawals: list[LineupWithdrawal] = field(default_factory=list)


def _clock(moment: datetime) -> str:
    return moment.strftime("%I:%M %p").lstrip("0")


def describe_appearance(appearance: Appearance, timezone: ZoneInfo) -> str:
    starts_at = appearance.starts_at.astimezone(timezone)
    ends_at = appearance.ends_at.astimezone(timezone)
    return (
        f"{appearance.stage.name} {starts_at:%a %b %d} "
        f"{_clock(starts_at)}-{_clock(ends_at)}"
    )


def _load_announced_entry(
    session: Session, run: FestivalRun, artist_slug: str
) -> LineupEntry:
    entry = session.scalar(
        select(LineupEntry)
        .join(LineupEntry.artist)
        .options(
            selectinload(LineupEntry.appearances).joinedload(Appearance.stage),
        )
        .where(LineupEntry.festival_run_id == run.id, Artist.slug == artist_slug)
    )
    if entry is None:
        raise ScheduleChangeError(f"artist {artist_slug!r} is not in run {run.slug!r}")
    if entry.lineup_status != "announced":
        raise ScheduleChangeError(
            f"artist {artist_slug!r} is {entry.lineup_status} in run {run.slug!r}; "
            "only an announced lineup entry can change"
        )
    return entry


def _apply_move(
    change: MoveAppearanceChange,
    entry: LineupEntry,
    edition: FestivalEdition,
    stages: dict[str, Stage],
) -> tuple[Appearance, AppearanceMove]:
    timezone = ZoneInfo(edition.timezone)

    def at(time_value: str) -> datetime:
        return parse_appearance_time(
            change.before.date,
            time_value,
            year=edition.year,
            timezone=edition.timezone,
        )

    current_start = at(change.before.start_time)
    scheduled = [a for a in entry.appearances if a.appearance_status == "scheduled"]
    matches = [
        a
        for a in scheduled
        if a.stage.name == change.before.stage and a.starts_at == current_start
    ]
    if len(matches) != 1:
        current = "; ".join(describe_appearance(a, timezone) for a in scheduled)
        raise ScheduleChangeError(
            f"{change.slug!r} in run {change.run!r} has no scheduled appearance at "
            f"{change.before.stage} {change.before.date} {change.before.start_time} "
            f"(current: {current or 'none'})"
        )
    appearance = matches[0]

    stage = stages.get(change.after.stage)
    if stage is None:
        raise ScheduleChangeError(
            f"unknown stage {change.after.stage!r} for edition {edition.slug!r}"
        )
    starts_at = at(change.after.start_time)
    ends_at = at(change.after.end_time)
    if ends_at <= starts_at:
        raise ScheduleChangeError(
            f"{change.slug!r} in run {change.run!r}: the new slot has a non-positive "
            "duration"
        )
    if (
        appearance.stage_id == stage.id
        and appearance.starts_at == starts_at
        and appearance.ends_at == ends_at
    ):
        raise ScheduleChangeError(
            f"{change.slug!r} in run {change.run!r} is already at the new slot; "
            "was this changeset applied before?"
        )

    before = describe_appearance(appearance, timezone)
    appearance.stage = stage
    appearance.starts_at = starts_at
    appearance.ends_at = ends_at
    after = describe_appearance(appearance, timezone)
    return appearance, AppearanceMove(change.run, change.slug, before, after)


def _apply_withdrawal(
    session: Session,
    run: FestivalRun,
    entry: LineupEntry,
    artist_slug: str,
    timezone: ZoneInfo,
) -> LineupWithdrawal:
    # Read before the status change flushes: the lineup_entries trigger then clears
    # verified_at on exactly these sets.
    similar_sources = session.scalars(
        select(Artist.slug)
        .join(SimilarArtistSet, SimilarArtistSet.source_artist_id == Artist.id)
        .join(SimilarArtist, SimilarArtist.similarity_set_id == SimilarArtistSet.id)
        .where(
            SimilarArtistSet.festival_run_id == run.id,
            SimilarArtistSet.verified_at.is_not(None),
            SimilarArtist.target_artist_id == entry.artist_id,
        )
        .order_by(Artist.slug)
    ).all()
    entry.lineup_status = "withdrawn"
    entry.withdrawn_at = datetime.now(UTC)
    return LineupWithdrawal(
        run_slug=run.slug,
        artist_slug=artist_slug,
        retained_appearances=[
            describe_appearance(a, timezone)
            for a in entry.appearances
            if a.appearance_status == "scheduled"
        ],
        similar_sources=list(similar_sources),
    )


def _overlaps(appearances: Iterable[Appearance]) -> list[tuple[Appearance, Appearance]]:
    ordered = sorted(appearances, key=lambda a: a.starts_at)
    return [
        (first, second)
        for index, first in enumerate(ordered)
        for second in ordered[index + 1 :]
        if second.starts_at < first.ends_at
    ]


def _refuse_new_overlaps(
    session: Session,
    run_ids: set[int],
    moved_ids: set[int],
    timezone: ZoneInfo,
) -> None:
    """Refuse a move that leaves its appearance overlapping another active set on the
    same stage, or another set by the same artist. Overlaps not involving a moved
    appearance are left alone; this changeset did not cause them."""
    if not moved_ids:
        return
    active = session.scalars(
        select(Appearance)
        .join(Appearance.lineup_entry)
        .options(
            joinedload(Appearance.stage),
            joinedload(Appearance.lineup_entry).joinedload(LineupEntry.artist),
        )
        .where(
            LineupEntry.festival_run_id.in_(run_ids),
            LineupEntry.lineup_status == "announced",
            Appearance.appearance_status == "scheduled",
        )
    ).all()

    by_stage: dict[tuple[int, int], list[Appearance]] = defaultdict(list)
    by_artist: dict[int, list[Appearance]] = defaultdict(list)
    for appearance in active:
        run_id = appearance.lineup_entry.festival_run_id
        by_stage[(run_id, appearance.stage_id)].append(appearance)
        by_artist[appearance.lineup_entry_id].append(appearance)

    problems = []
    for group in [*by_stage.values(), *by_artist.values()]:
        for first, second in _overlaps(group):
            if first.id in moved_ids or second.id in moved_ids:
                problems.append(
                    f"{first.lineup_entry.artist.slug} "
                    f"({describe_appearance(first, timezone)}) overlaps "
                    f"{second.lineup_entry.artist.slug} "
                    f"({describe_appearance(second, timezone)})"
                )
    if problems:
        raise ScheduleChangeError(
            "the changeset leaves overlapping sets:\n  " + "\n  ".join(problems)
        )


def apply_schedule_changes(
    session: Session, payload: ScheduleChangeInput
) -> ScheduleChangeSummary:
    """Apply every change in order, then refuse the whole changeset if a moved
    appearance now overlaps another active set. Does not commit."""
    edition = session.scalar(
        select(FestivalEdition).where(FestivalEdition.slug == payload.edition)
    )
    if edition is None:
        raise ScheduleChangeError(
            f"festival edition {payload.edition!r} does not exist"
        )
    timezone = ZoneInfo(edition.timezone)
    runs = {
        run.slug: run
        for run in session.scalars(
            select(FestivalRun).where(FestivalRun.festival_edition_id == edition.id)
        )
    }
    stages = {
        stage.name: stage
        for stage in session.scalars(
            select(Stage).where(Stage.festival_edition_id == edition.id)
        )
    }

    summary = ScheduleChangeSummary()
    touched_run_ids: set[int] = set()
    moved_ids: set[int] = set()
    for change in payload.changes:
        run = runs.get(change.run)
        if run is None:
            raise ScheduleChangeError(
                f"festival run {change.run!r} does not exist for edition "
                f"{edition.slug!r}"
            )
        touched_run_ids.add(run.id)
        entry = _load_announced_entry(session, run, change.slug)
        if isinstance(change, MoveAppearanceChange):
            appearance, move = _apply_move(change, entry, edition, stages)
            moved_ids.add(appearance.id)
            summary.moves.append(move)
        else:
            summary.withdrawals.append(
                _apply_withdrawal(session, run, entry, change.slug, timezone)
            )
        session.flush()

    _refuse_new_overlaps(session, touched_run_ids, moved_ids, timezone)
    return summary
