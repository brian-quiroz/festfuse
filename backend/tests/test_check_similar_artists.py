"""Fast, no-network coverage for the Jev request builders, response parsing, and the
set review (check_similar_artists.py). The Jev calls themselves are a
manual/operational step."""

import pytest

from scripts.check_similar_artists import (
    ArtistFacts,
    average_shares,
    build_choice_request,
    build_fit_request,
    fit_probability,
    review_set,
    shortlist,
)


def _facts(slug: str, *, billing: str = "Undercard", refs: int = 0) -> ArtistFacts:
    return ArtistFacts(
        slug=slug,
        name=slug.title(),
        genres=("Indie Pop",),
        about=None,
        billing=billing,
        refs=refs,
    )


def _choice(probabilities: dict[str, float]) -> dict:
    return {"answers": {"closest_match": {"probabilities": probabilities}}}


SOURCE = ArtistFacts("src", "Source", ("Dream Pop",), "Verified bio.", "Headliner", 3)


def test_fit_request_sends_only_similarity_evidence() -> None:
    candidate = ArtistFacts("b", "B", (), None, "Undercard", 9)
    payload = build_fit_request(SOURCE, candidate)

    assert payload["model"] == "jev-1.13.0"
    # Billing and citation counts stay out: Jev judges musical closeness only.
    assert payload["state"] == (
        "Artist A: Source. Genres: Dream Pop. About: Verified bio.\n\n"
        "Artist B: B. Genres: none listed."
    )
    assert payload["questions"]["fan_overlap"]["type"] == "noul"


def test_choice_request_lists_every_candidate_in_a_seeded_shuffle() -> None:
    candidates = [
        ArtistFacts("a", "A", ("Shoegaze",), "A bio.", "Undercard", 9),
        *(_facts(slug) for slug in "bcdefgh"),
    ]
    first = build_choice_request(SOURCE, candidates, seed=1)
    question = first["questions"]["closest_match"]

    assert question["type"] == "choice"
    assert set(question["criteria"]) == set("abcdefgh")
    assert question["criteria"]["a"] == {
        "name": "A",
        "genres": "Shoegaze",
        "about": "A bio.",
    }
    same = build_choice_request(SOURCE, candidates, seed=1)
    other = build_choice_request(SOURCE, candidates, seed=2)
    assert list(question["criteria"]) == list(
        same["questions"]["closest_match"]["criteria"]
    )
    assert list(question["criteria"]) != list(
        other["questions"]["closest_match"]["criteria"]
    )


def test_fit_probability_reads_the_noul_answer() -> None:
    assert fit_probability({"answers": {"fan_overlap": {"noul": 0.42}}}) == 0.42


def test_average_shares_counts_an_omitted_candidate_as_zero() -> None:
    shares = average_shares(
        [_choice({"a": 0.6, "b": 0.4}), _choice({"a": 0.2, "c": 0.8})],
        {"a", "b", "c", "d"},
    )

    assert shares == pytest.approx({"a": 0.4, "b": 0.2, "c": 0.4, "d": 0.0})


def test_average_shares_rejects_an_unknown_option() -> None:
    with pytest.raises(SystemExit, match="zz"):
        average_shares([_choice({"a": 0.5, "zz": 0.5})], {"a"})


def test_shortlist_keeps_shares_at_the_threshold_highest_first() -> None:
    assert shortlist({"a": 0.05, "b": 0.3, "c": 0.049, "d": 0.3}) == ["b", "d", "a"]


def test_review_set_flags_fits_skips_and_citations() -> None:
    facts = {
        "a": _facts("a", refs=5),
        "b": _facts("b", refs=1),
        "c": _facts("c", refs=6),
        "x": _facts("x", refs=2),
        "y": _facts("y", refs=0),
    }
    facts["z"] = _facts("z")
    fits = {"a": 0.7, "b": 0.38, "c": 0.2, "x": 0.6, "y": 0.1, "z": 0.41}

    review = review_set(["a", "b", "c"], fits, ["a", "x", "y", "z"], facts)

    assert review.flagged == {"b": "worth a look", "c": "likely mismatch"}
    # y fits worse than every member; z beats b by under the 0.05 margin and c by
    # more, so z is listed against c only.
    assert [s.slug for s in review.skipped] == ["x", "z"]
    assert review.skipped[1].fits_better_than == ("c",)
    assert review.skipped[0].fits_better_than == ("b", "c")
    assert review.skipped[0].less_cited_than == ("c",)
    assert review.single_billing == "Undercard"


def test_review_set_mixed_billing_and_single_member() -> None:
    facts = {
        "a": _facts("a", billing="Headliner"),
        "b": _facts("b", billing="Undercard"),
    }
    fits = {"a": 0.6, "b": 0.6}

    assert review_set(["a", "b"], fits, [], facts).single_billing is None
    assert review_set(["a"], fits, [], facts).single_billing is None
