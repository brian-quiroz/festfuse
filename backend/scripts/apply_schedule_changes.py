"""Apply an official festival schedule change (set moves and lineup withdrawals) from
a JSON changeset.

Requires an explicit mode: ``--preview`` runs every change in one transaction and rolls
it back (surfacing every refusal, persisting nothing); ``--apply`` commits. The input
is ``{ schemaVersion, edition, changes: [...] }``; see
``app/schemas/schedule_change.py``. A whole changeset applies or nothing does. An
arriving artist goes through ``add_artist`` or ``build_roster_payloads`` instead.
See ADR-0022.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from pydantic import ValidationError

from app.database import SessionLocal
from app.schemas.schedule_change import ScheduleChangeInput
from app.services import (
    ScheduleChangeError,
    ScheduleChangeSummary,
    apply_schedule_changes,
)


def _render_plan(summary: ScheduleChangeSummary) -> None:
    print("Schedule change plan")
    print("--------------------")
    if summary.moves:
        print(f"Moves ({len(summary.moves)})")
        for move in summary.moves:
            print(f"  {move.run_slug}  {move.artist_slug}")
            print(f"    {move.before}")
            print(f"    -> {move.after}")
    if summary.withdrawals:
        print(f"\nWithdrawals ({len(summary.withdrawals)})")
        for withdrawal in summary.withdrawals:
            print(f"  {withdrawal.run_slug}  {withdrawal.artist_slug}")
            for appearance in withdrawal.retained_appearances:
                print(f"    retained, no longer public: {appearance}")
            if withdrawal.similar_sources:
                print(
                    "    unverifies the similar-artist set of: "
                    + ", ".join(withdrawal.similar_sources)
                )


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", required=True, type=Path, help="changeset JSON file")
    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument(
        "--preview",
        action="store_true",
        help="run the changeset in a transaction and roll it back; persists nothing",
    )
    mode.add_argument(
        "--apply", action="store_true", help="write the changeset in one transaction"
    )
    args = parser.parse_args()

    try:
        raw = json.loads(args.input.read_text())
    except (OSError, json.JSONDecodeError) as error:
        print(f"Could not read {args.input}: {error}", file=sys.stderr)
        return 1

    try:
        payload = ScheduleChangeInput.model_validate(raw)
    except ValidationError as error:
        print("Input failed validation:", file=sys.stderr)
        print(error, file=sys.stderr)
        return 1

    with SessionLocal() as session:
        try:
            summary = apply_schedule_changes(session, payload)
        except ScheduleChangeError as error:
            session.rollback()
            print(f"Aborted: {error}\nNothing was written.", file=sys.stderr)
            return 1

        _render_plan(summary)

        if args.apply:
            session.commit()
            print("\nSchedule changes applied.")
        else:
            session.rollback()
            print("\nPreview only; the transaction was rolled back, nothing persisted.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
