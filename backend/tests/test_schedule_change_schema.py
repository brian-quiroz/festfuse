import pytest
from pydantic import ValidationError

from app.schemas.schedule_change import (
    MoveAppearanceChange,
    ScheduleChangeInput,
    WithdrawLineupChange,
)


def _move(**overrides: object) -> dict:
    change: dict[str, object] = {
        "op": "move",
        "run": "weekend-1",
        "slug": "charli-xcx",
        "before": {
            "stage": "American Express",
            "date": "Oct 2",
            "startTime": "8:40 PM",
        },
        "after": {
            "stage": "American Express",
            "startTime": "8:35 PM",
            "endTime": "10:00 PM",
        },
    }
    change.update(overrides)
    return change


def _changeset(*changes: dict) -> dict:
    return {"schemaVersion": 1, "edition": "acl-2026", "changes": list(changes)}


def test_parses_moves_and_withdrawals_by_op() -> None:
    payload = ScheduleChangeInput.model_validate(
        _changeset(_move(), {"op": "withdraw", "run": "weekend-1", "slug": "rubio"})
    )

    move, withdrawal = payload.changes
    assert isinstance(move, MoveAppearanceChange)
    assert move.before.start_time == "8:40 PM"
    assert move.after.end_time == "10:00 PM"
    assert isinstance(withdrawal, WithdrawLineupChange)


def test_an_empty_changeset_is_refused() -> None:
    with pytest.raises(ValidationError):
        ScheduleChangeInput.model_validate(_changeset())


def test_an_unknown_op_is_refused() -> None:
    with pytest.raises(ValidationError):
        ScheduleChangeInput.model_validate(
            _changeset({"op": "cancel", "run": "weekend-1", "slug": "rubio"})
        )


@pytest.mark.parametrize(
    "overrides",
    [
        {"before": {"stage": "BMI", "date": "2026-10-02", "startTime": "8:40 PM"}},
        {"before": {"stage": "BMI", "date": "Oct 2", "startTime": "20:40"}},
        {"after": {"stage": "BMI", "startTime": "8:35 PM", "endTime": "late"}},
        {"slug": "Charli XCX"},
    ],
)
def test_malformed_dates_times_and_slugs_are_refused(overrides: dict) -> None:
    with pytest.raises(ValidationError):
        ScheduleChangeInput.model_validate(_changeset(_move(**overrides)))


def test_a_move_without_an_end_time_is_refused() -> None:
    with pytest.raises(ValidationError):
        ScheduleChangeInput.model_validate(
            _changeset(_move(after={"stage": "BMI", "startTime": "8:35 PM"}))
        )


def test_unknown_fields_are_refused() -> None:
    with pytest.raises(ValidationError):
        ScheduleChangeInput.model_validate(_changeset(_move(appearanceId=264)))
