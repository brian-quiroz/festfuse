"""Fast, no-network coverage for the pure parts of benchmark_similar_artist_fit.py.
The benchmark run itself is a manual/operational step."""

import pytest

from scripts.benchmark_similar_artist_fit import (
    Case,
    pick_mismatches,
    threshold_rows,
    win_rate,
)


def test_pick_mismatches_needs_disjoint_families_and_is_seeded() -> None:
    roster = {
        "src": {"Pop", "Indie"},
        "same": {"Pop"},
        "overlap": {"Indie", "Rock"},
        "far1": {"Hip-Hop/Rap"},
        "far2": {"Country"},
        "far3": {"Dance/Electronic"},
        "picked": {"Heavy"},
        "untagged": set(),
    }

    chosen = pick_mismatches("src", "1", roster, {"picked"})

    assert len(chosen) == 2
    assert set(chosen) <= {"far1", "far2", "far3"}
    assert chosen == pick_mismatches("src", "1", roster, {"picked"})


def test_pick_mismatches_returns_what_exists_when_the_pool_is_small() -> None:
    roster = {"src": {"Pop"}, "same": {"Pop"}, "far": {"Country"}}

    assert pick_mismatches("src", "1", roster, set()) == ("far",)


def test_win_rate_counts_each_triple_once() -> None:
    cases = [
        Case("s", ("a", "b"), ("x",)),
        Case("s", ("a", "b"), ("x",)),  # the same set in a second run
    ]
    fit = {("s", "a"): 0.7, ("s", "b"): 0.2, ("s", "x"): 0.3}

    assert win_rate(cases, fit) == (1, 2)


def test_threshold_rows_reports_each_share() -> None:
    real = {("s1", "a"): 0.6, ("s1", "b"): 0.3, ("s2", "c"): 0.45}
    fake = {("s1", "x"): 0.2, ("s2", "y"): 0.55}

    rows = {row[0]: row[1:] for row in threshold_rows(real, fake)}

    assert rows[0.5] == pytest.approx((2 / 3, 1 / 2, 1.0))
    assert rows[0.4] == pytest.approx((1 / 3, 1 / 2, 1 / 2))
    assert rows[0.25] == pytest.approx((0.0, 1 / 2, 0.0))
