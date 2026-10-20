"""Benchmark check_similar_artists' fit question against every verified similar-artist set.

Read-only against PostgreSQL; sends about 2,000 requests to Jev (a few cents). For each
verified, non-empty set in every run: the fit of each real pick, plus two seeded random
mismatches from the same run whose genre families share none of the source artist's.
A (source, target) pair is asked once even when the set repeats across runs. Prints a
markdown report: medians, the flag-threshold table, the pairwise win rate, every
verified pick under the flag threshold, and every mismatch at 0.5 or above.

Re-run before bumping the pinned Jev model version and compare against the recorded
results in ``docs/process/artist-similar-artist-check.md`` (ADR-0023).

  python -m scripts.benchmark_similar_artist_fit > benchmark.md
  python -m scripts.benchmark_similar_artist_fit --raw scores.json > benchmark.md
"""

from __future__ import annotations

import argparse
import json
import random
import statistics
import sys
from concurrent.futures import ThreadPoolExecutor
from dataclasses import dataclass
from pathlib import Path

from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.config import settings
from app.database import SessionLocal
from app.lib.lineup_membership import PUBLIC_LINEUP_STATUS
from app.models import Artist, ArtistGenre, Genre, SimilarArtistSet
from scripts.check_similar_artists import (
    _FIT_FLAG,
    _FIT_MISMATCH,
    _JEV_MODEL,
    ArtistFacts,
    ask_jev,
    build_fit_request,
    fit_probability,
)

_MISMATCHES_PER_SET = 2
_THRESHOLDS = (0.5, 0.45, 0.4, 0.35, 0.3, 0.25)
_WORKERS = 6


@dataclass(frozen=True)
class Case:
    source: str
    real: tuple[str, ...]
    mismatches: tuple[str, ...]


def pick_mismatches(
    source: str,
    run_key: str,
    roster: dict[str, set[str]],
    exclude: set[str],
    *,
    count: int = _MISMATCHES_PER_SET,
) -> tuple[str, ...]:
    """Seeded random roster artists whose genre families share none of the source's.

    ``roster`` maps each slug in the run to its genre families; an artist with no
    genres is never a mismatch, since nothing shows it is unrelated.
    """
    families = roster[source]
    pool = sorted(
        slug
        for slug, other in roster.items()
        if slug != source and slug not in exclude and other and not other & families
    )
    rng = random.Random(f"{source}:{run_key}")
    return tuple(rng.sample(pool, min(count, len(pool))))


def win_rate(cases: list[Case], fit: dict[tuple[str, str], float]) -> tuple[int, int]:
    """(wins, comparisons): how often a real pick outscores a mismatch for the same
    source, each (source, pick, mismatch) triple counted once."""
    triples = {
        (case.source, real, fake)
        for case in cases
        for real in case.real
        for fake in case.mismatches
    }
    wins = sum(1 for s, r, f in triples if fit[(s, r)] > fit[(s, f)])
    return wins, len(triples)


def threshold_rows(
    real: dict[tuple[str, str], float], fake: dict[tuple[str, str], float]
) -> list[tuple[float, float, float, float]]:
    """Per threshold: share of real picks flagged, share of mismatches caught, and
    share of source artists with at least one flagged real pick."""
    by_source: dict[str, list[float]] = {}
    for (source, _target), value in real.items():
        by_source.setdefault(source, []).append(value)
    rows = []
    for threshold in _THRESHOLDS:
        rows.append(
            (
                threshold,
                sum(v < threshold for v in real.values()) / len(real),
                sum(v < threshold for v in fake.values()) / len(fake),
                sum(any(v < threshold for v in vs) for vs in by_source.values())
                / len(by_source),
            )
        )
    return rows


def _load() -> tuple[list[Case], dict[str, ArtistFacts], dict[str, set[str]]]:
    with SessionLocal() as session:
        artists = {
            a.id: a
            for a in session.scalars(
                select(Artist).options(
                    selectinload(Artist.genre_assignments)
                    .selectinload(ArtistGenre.genre)
                    .selectinload(Genre.family),
                    selectinload(Artist.lineup_entries),
                )
            )
        }
        sets = session.scalars(
            select(SimilarArtistSet)
            .where(SimilarArtistSet.verified_at.isnot(None))
            .options(selectinload(SimilarArtistSet.entries))
        ).all()

        families = {
            a.slug: {g.genre.family.name for g in a.genre_assignments}
            for a in artists.values()
        }
        facts = {
            a.slug: ArtistFacts(
                slug=a.slug,
                name=a.name,
                genres=tuple(g.genre.name for g in a.genre_assignments),
                about=a.about if a.about_verified_at else None,
                billing="-",
                refs=0,
            )
            for a in artists.values()
        }
        rosters: dict[int, dict[str, set[str]]] = {}
        cases = []
        for similarity_set in sets:
            real = tuple(
                artists[e.target_artist_id].slug for e in similarity_set.entries
            )
            if not real:
                continue
            run_id = similarity_set.festival_run_id
            if run_id not in rosters:
                rosters[run_id] = {
                    a.slug: families[a.slug]
                    for a in artists.values()
                    if a.publication_status == "published"
                    and any(
                        e.festival_run_id == run_id
                        and e.lineup_status == PUBLIC_LINEUP_STATUS
                        for e in a.lineup_entries
                    )
                }
            source = artists[similarity_set.source_artist_id].slug
            roster = {**rosters[run_id], source: families[source]}
            cases.append(
                Case(
                    source,
                    real,
                    pick_mismatches(source, str(run_id), roster, set(real)),
                )
            )
    return cases, facts, families


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--raw", type=Path, help="also write every score as JSON here")
    args = parser.parse_args()
    if not settings.typesafe_api_key:
        parser.error("TYPESAFE_API_KEY is not set (backend/.env or the environment)")

    cases, facts, families = _load()
    real_pairs = {(c.source, t) for c in cases for t in c.real}
    fake_pairs = {(c.source, t) for c in cases for t in c.mismatches} - real_pairs
    pairs = sorted(real_pairs | fake_pairs)
    print(f"{len(cases)} sets, {len(pairs)} requests", file=sys.stderr)

    def ask(pair: tuple[str, str]) -> float:
        source, target = pair
        response = ask_jev(
            build_fit_request(facts[source], facts[target]), settings.typesafe_api_key
        )
        return fit_probability(response)

    with ThreadPoolExecutor(max_workers=_WORKERS) as pool:
        fit = dict(zip(pairs, pool.map(ask, pairs)))

    if args.raw:
        args.raw.write_text(
            json.dumps(
                [
                    {
                        "source": s,
                        "target": t,
                        "fit": fit[(s, t)],
                        "kind": "real" if (s, t) in real_pairs else "mismatch",
                    }
                    for s, t in pairs
                ],
                indent=1,
            )
        )

    real = {p: fit[p] for p in real_pairs}
    fake = {p: fit[p] for p in fake_pairs}
    wins, comparisons = win_rate(cases, fit)
    name = {slug: f.name for slug, f in facts.items()}

    lines = [
        f"# Jev fit benchmark ({_JEV_MODEL})",
        "",
        f"- Sets: {len(cases)} verified, non-empty; source artists: "
        f"{len({c.source for c in cases})}",
        f"- Real pairs: {len(real)}; mismatch pairs: {len(fake)}; requests: {len(pairs)}",
        f"- Median fit: real {statistics.median(real.values()):.2f}, "
        f"mismatch {statistics.median(fake.values()):.2f}",
        f"- A real pick outscored a mismatch for the same source in "
        f"{wins / comparisons:.1%} of {comparisons} comparisons",
        "",
        "| Flag below | Real picks flagged | Mismatches caught | Sources with a flag |",
        "| --- | --- | --- | --- |",
    ]
    for threshold, real_share, fake_share, source_share in threshold_rows(real, fake):
        mark = " (current)" if threshold in (_FIT_FLAG, _FIT_MISMATCH) else ""
        lines.append(
            f"| {threshold:.2f}{mark} | {real_share:.1%} | {fake_share:.1%} "
            f"| {source_share:.1%} |"
        )
    lines += [
        "",
        f"## Real picks under {_FIT_FLAG}, lowest first",
        "",
        "| Fit | Source | Pick | Source genres | Pick genres |",
        "| --- | --- | --- | --- | --- |",
    ]
    for (s, t), value in sorted(real.items(), key=lambda kv: (kv[1], kv[0])):
        if value >= _FIT_FLAG:
            break
        lines.append(
            f"| {value:.2f} | {name[s]} | {name[t]} | {', '.join(facts[s].genres)} "
            f"| {', '.join(facts[t].genres)} |"
        )
    lines += [
        "",
        "## Mismatches at 0.5 or above (where the mismatch rule may be wrong)",
        "",
        "| Fit | Source | Mismatch | Source families | Mismatch families |",
        "| --- | --- | --- | --- | --- |",
    ]
    for (s, t), value in sorted(fake.items(), key=lambda kv: (-kv[1], kv[0])):
        if value < 0.5:
            break
        lines.append(
            f"| {value:.2f} | {name[s]} | {name[t]} | {', '.join(sorted(families[s]))} "
            f"| {', '.join(sorted(families[t]))} |"
        )
    print("\n".join(lines))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
