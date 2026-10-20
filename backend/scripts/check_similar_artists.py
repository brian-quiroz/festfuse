"""Check a similar-artist set against Jev, TypeSafe AI's decision model.

Read-only against PostgreSQL; makes outbound requests to Jev. Jev is a second opinion
on a set drafted under the editorial process, never its source (ADR-0023). It sees
names, genres, and verified ``about`` only (no billing, no citation counts) and
answers two kinds of question:

- **Fit**, one yes/no request per artist: would a fan of the source artist likely
  enjoy this one? Asked for every set member and every shortlisted candidate, so their
  probabilities compare directly. A member under 0.4 is flagged for an explanation,
  under 0.25 as a likely mismatch (thresholds from the benchmark in
  ``docs/process/artist-similar-artist-check.md``).
- **Shortlist**, one Choice question over the run's whole published roster, asked
  several times with the options shuffled and the shares averaged, because a single
  ordering's ranking below the top few is unstable. Candidates averaging at least 5%
  are listed; any not in the set that beat a member's fit by at least 0.05 are called
  out, with how many other sets cite them.

Flags are prompts to explain a pick, not rejections. Checks the run's stored set, or
a draft set passed with ``--proposed``. Needs ``TYPESAFE_API_KEY``, in
``backend/.env`` or the environment.

  python -m scripts.check_similar_artists --slug lorde --edition lollapalooza-2026 --run main
  python -m scripts.check_similar_artists --slug lorde --edition lollapalooza-2026 \
      --run main --proposed slug-a,slug-b,slug-c,slug-d
"""

from __future__ import annotations

import argparse
import json
import random
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from dataclasses import dataclass

from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.config import settings
from app.database import SessionLocal
from app.lib.lineup_membership import PUBLIC_LINEUP_STATUS
from app.models import Artist, SimilarArtist, SimilarArtistSet
from scripts.show_artist import (
    _BILLING_LABEL,
    _inbound_counts,
    _resolve_run_id,
    _roster_artists,
)

_JEV_ENDPOINT = "https://api.typesafe.ai/v1/systemone"
# Pinned so a model update cannot silently shift results between review waves.
_JEV_MODEL = "jev-1.13.0"
_FIT_QUESTION = "fan_overlap"
_FIT_INSTRUCTIONS = (
    "Would a fan of Artist A likely enjoy Artist B too, judged by sound, mood, genre, "
    "and scene?"
)
_CHOICE_QUESTION = "closest_match"
_CHOICE_INSTRUCTIONS = (
    "Which of these other artists on the same festival lineup is the closest musical "
    "match to the artist described: the one a fan of that artist is most likely to "
    "enjoy too, judged by sound, genre, and scene?"
)
_CHOICE_SAMPLES = 5
_SHORTLIST_MIN_SHARE = 0.05
_FIT_FLAG = 0.4
_FIT_MISMATCH = 0.25
# Fits a few hundredths apart are noise, so a candidate must clear a member by this.
_FIT_MARGIN = 0.05
_TIMEOUT_SECONDS = 30
_RETRY_STATUSES = {429, 500, 502, 503, 504}


@dataclass(frozen=True)
class ArtistFacts:
    slug: str
    name: str
    genres: tuple[str, ...]
    about: str | None  # verified about only; an unverified draft is not evidence
    billing: str
    refs: int  # cited by other artists' sets in the run, not counting the source's


@dataclass(frozen=True)
class SkippedCandidate:
    slug: str
    fits_better_than: tuple[str, ...]  # members with a lower fit
    less_cited_than: tuple[str, ...]  # of those, members cited by more other sets


@dataclass(frozen=True)
class SetReview:
    flagged: dict[str, str]  # member slug -> "worth a look" | "likely mismatch"
    skipped: tuple[SkippedCandidate, ...]  # shortlisted, not in the set, best fit first
    single_billing: str | None  # set when every member shares one billing tier


def _describe(facts: ArtistFacts) -> str:
    text = f"{facts.name}. Genres: {', '.join(facts.genres) or 'none listed'}."
    return f"{text} About: {facts.about}" if facts.about else text


def build_fit_request(source: ArtistFacts, candidate: ArtistFacts) -> dict:
    return {
        "model": _JEV_MODEL,
        "state": f"Artist A: {_describe(source)}\n\nArtist B: {_describe(candidate)}",
        "questions": {
            _FIT_QUESTION: {"type": "noul", "instructions": _FIT_INSTRUCTIONS}
        },
    }


def build_choice_request(
    source: ArtistFacts, candidates: list[ArtistFacts], *, seed: int
) -> dict:
    """One Choice question over every candidate, options in a seeded shuffled order
    (Jev leans toward options that come first)."""
    ordered = list(candidates)
    random.Random(seed).shuffle(ordered)
    criteria: dict[str, dict[str, str]] = {}
    for candidate in ordered:
        option = {
            "name": candidate.name,
            "genres": ", ".join(candidate.genres) or "none listed",
        }
        if candidate.about:
            option["about"] = candidate.about
        criteria[candidate.slug] = option
    return {
        "model": _JEV_MODEL,
        "state": f"Festival lineup artist: {_describe(source)}",
        "questions": {
            _CHOICE_QUESTION: {
                "type": "choice",
                "instructions": _CHOICE_INSTRUCTIONS,
                "criteria": criteria,
            }
        },
    }


def fit_probability(response: dict) -> float:
    return float(response["answers"][_FIT_QUESTION]["noul"])


def average_shares(
    responses: list[dict], candidate_slugs: set[str]
) -> dict[str, float]:
    """Mean Choice probability per candidate across shuffled samples (an omitted
    candidate counts as zero)."""
    totals = dict.fromkeys(candidate_slugs, 0.0)
    for response in responses:
        probabilities = response["answers"][_CHOICE_QUESTION]["probabilities"]
        unknown = set(probabilities) - candidate_slugs
        if unknown:
            raise SystemExit(
                f"Jev returned unknown options: {', '.join(sorted(unknown))}"
            )
        for slug, probability in probabilities.items():
            totals[slug] += probability
    return {slug: total / len(responses) for slug, total in totals.items()}


def shortlist(shares: dict[str, float]) -> list[str]:
    """Candidates averaging at least the minimum share, highest first."""
    chosen = [slug for slug, share in shares.items() if share >= _SHORTLIST_MIN_SHARE]
    return sorted(chosen, key=lambda slug: (-shares[slug], slug))


def review_set(
    set_slugs: list[str],
    fits: dict[str, float],
    short: list[str],
    facts: dict[str, ArtistFacts],
) -> SetReview:
    flagged = {
        slug: "likely mismatch" if fits[slug] < _FIT_MISMATCH else "worth a look"
        for slug in set_slugs
        if fits[slug] < _FIT_FLAG
    }
    skipped = []
    for slug in sorted(
        (s for s in short if s not in set_slugs), key=lambda s: (-fits[s], s)
    ):
        fits_better_than = tuple(
            m for m in set_slugs if fits[slug] - fits[m] >= _FIT_MARGIN
        )
        if not fits_better_than:
            continue
        less_cited_than = tuple(
            m for m in fits_better_than if facts[slug].refs < facts[m].refs
        )
        skipped.append(SkippedCandidate(slug, fits_better_than, less_cited_than))
    billings = {facts[slug].billing for slug in set_slugs}
    return SetReview(
        flagged=flagged,
        skipped=tuple(skipped),
        single_billing=billings.pop()
        if len(set_slugs) > 1 and len(billings) == 1
        else None,
    )


def ask_jev(payload: dict, api_key: str) -> dict:
    body = json.dumps(payload).encode()
    for attempt in (1, 2):
        request = urllib.request.Request(
            _JEV_ENDPOINT,
            data=body,
            method="POST",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
        )
        try:
            with urllib.request.urlopen(request, timeout=_TIMEOUT_SECONDS) as response:
                return json.load(response)
        except urllib.error.HTTPError as error:
            if attempt == 1 and error.code in _RETRY_STATUSES:
                time.sleep(2)
                continue
            detail = error.read().decode(errors="replace")[:500]
            raise SystemExit(f"Jev request failed: HTTP {error.code}: {detail}")
        except (urllib.error.URLError, TimeoutError) as error:
            if attempt == 1:
                time.sleep(2)
                continue
            raise SystemExit(f"Jev request failed: {error}")
    raise AssertionError("unreachable")


def _facts(artist: Artist, *, run_id: int, refs: int) -> ArtistFacts:
    entry = next(e for e in artist.lineup_entries if e.festival_run_id == run_id)
    return ArtistFacts(
        slug=artist.slug,
        name=artist.name,
        genres=tuple(a.genre.name for a in artist.genre_assignments),
        about=artist.about if artist.about_verified_at else None,
        billing=_BILLING_LABEL.get(entry.billing_tier or "", entry.billing_tier or "-"),
        refs=refs,
    )


def _names(slugs: tuple[str, ...], facts: dict[str, ArtistFacts], total: int) -> str:
    if len(slugs) == total > 1:
        return "every member"
    return ", ".join(facts[slug].name for slug in slugs)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--slug", required=True, help="the source artist")
    parser.add_argument("--edition", required=True, help="festival edition slug")
    parser.add_argument("--run", required=True, help="festival run slug")
    parser.add_argument(
        "--proposed",
        help="comma-separated draft set to check instead of the stored one",
    )
    args = parser.parse_args()

    api_key = settings.typesafe_api_key
    if not api_key:
        parser.error("TYPESAFE_API_KEY is not set (backend/.env or the environment)")
    proposed = (
        [slug.strip() for slug in args.proposed.split(",") if slug.strip()]
        if args.proposed
        else None
    )

    with SessionLocal() as session:
        run_id = _resolve_run_id(session, edition=args.edition, run=args.run)
        artists, _withdrawn = _roster_artists(
            session, include_drafts=True, run_id=run_id
        )
        source = next((a for a in artists if a.slug == args.slug), None)
        if source is None:
            print(f"{args.slug!r} is not an announced or draft artist in this run.")
            return 1
        stored = session.scalar(
            select(SimilarArtistSet)
            .where(
                SimilarArtistSet.source_artist_id == source.id,
                SimilarArtistSet.festival_run_id == run_id,
            )
            .options(
                selectinload(SimilarArtistSet.entries).selectinload(
                    SimilarArtist.target_artist
                )
            )
        )
        stored_slugs = [e.target_artist.slug for e in stored.entries] if stored else []
        counts = _inbound_counts(session, run_id=run_id)

        def refs(artist: Artist) -> int:
            return counts.get(artist.id, 0) - (artist.slug in stored_slugs)

        candidates = [
            _facts(a, run_id=run_id, refs=refs(a))
            for a in artists
            if a.id != source.id
            and a.publication_status == "published"
            and next(
                e.lineup_status for e in a.lineup_entries if e.festival_run_id == run_id
            )
            == PUBLIC_LINEUP_STATUS
        ]
        source_facts = _facts(source, run_id=run_id, refs=refs(source))

    facts = {candidate.slug: candidate for candidate in candidates}
    set_slugs = proposed if proposed is not None else stored_slugs
    if len(set(set_slugs)) != len(set_slugs):
        print("The set lists the same artist more than once.")
        return 1
    not_candidates = [slug for slug in set_slugs if slug not in facts]
    if not_candidates:
        print(
            "Not a published, announced artist in this run (or the source itself): "
            + ", ".join(not_candidates)
        )
        return 1
    if not candidates:
        print("No candidates: the run has no other published, announced artists.")
        return 1

    with ThreadPoolExecutor(max_workers=8) as pool:
        choice_responses = list(
            pool.map(
                lambda seed: ask_jev(
                    build_choice_request(source_facts, candidates, seed=seed), api_key
                ),
                range(_CHOICE_SAMPLES),
            )
        )
        shares = average_shares(choice_responses, set(facts))
        short = shortlist(shares)
        to_fit = list(dict.fromkeys(set_slugs + short))
        fits = dict(
            zip(
                to_fit,
                pool.map(
                    lambda slug: fit_probability(
                        ask_jev(build_fit_request(source_facts, facts[slug]), api_key)
                    ),
                    to_fit,
                ),
            )
        )

    print(
        f"{source_facts.name} ({source_facts.slug})  ·  {args.edition}/{args.run}  ·  "
        f"{_JEV_MODEL}, {len(candidates)} candidates"
    )
    if proposed is not None:
        print("Checking: proposed set")
    elif stored is None:
        print("No stored similar-artist set for this run.")
    else:
        state = (
            f"verified {stored.verified_at:%Y-%m-%d}"
            if stored.verified_at
            else "unverified"
        )
        print(f"Checking: stored set ({state}{', empty' if not stored_slugs else ''})")

    def row(slug: str) -> str:
        info = facts[slug]
        return (
            f"{info.name:<28} fit {fits[slug]:.2f}  {info.billing:<13}  "
            f"cited by {info.refs} other(s)"
        )

    if set_slugs:
        review = review_set(set_slugs, fits, short, facts)
        print(f"\nThe set: would a fan of {source_facts.name} likely enjoy each pick?")
        for position, slug in enumerate(set_slugs, start=1):
            flag = review.flagged.get(slug)
            print(f"  {position}. {row(slug)}{f'   ← {flag}' if flag else ''}")
        if review.single_billing:
            print(f"\nEvery member is {review.single_billing}: no bigger/smaller mix.")
        if review.skipped:
            print("\nShortlisted candidates that fit better than a member")
            for skipped in review.skipped:
                total = len(set_slugs)
                note = (
                    f"; cited less than {_names(skipped.less_cited_than, facts, total)}"
                    if skipped.less_cited_than
                    else ""
                )
                print(
                    f"  - {row(skipped.slug)}; fits better than "
                    f"{_names(skipped.fits_better_than, facts, total)}{note}"
                )

    print(
        f"\nJev's shortlist: average share over {_CHOICE_SAMPLES} shuffled runs "
        f"(at least {_SHORTLIST_MIN_SHARE:.0%}; ★ = in the set)"
    )
    if not short:
        print("  (no candidate reached the threshold)")
    for slug in short:
        star = "★" if slug in set_slugs else " "
        genres = ", ".join(facts[slug].genres) or "-"
        print(f"  {star} {shares[slug]:>5.1%}  {row(slug)}  {genres}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
