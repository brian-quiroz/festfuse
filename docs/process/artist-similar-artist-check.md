# Jev similar-artist check: behavior, caveats, and benchmark

Reference for reading `check_similar_artists.py` output and for changing it. The
decision to use Jev, and the rules for how its answers are used, are in
[ADR-0023](../decisions/0023-jev-second-opinion-on-similar-artist-sets.md). This file
holds what has been observed about Jev in this use, which can change with a new model
version.

All observations below are for `jev-1.13.0`.

## What the script asks

- **Fit** (Jev's yes/no question, one request per artist): "Would a fan of Artist A
  likely enjoy Artist B too, judged by sound, mood, genre, and scene?" The state is
  both artists' name, genres, and verified `about`. The answer is a probability from 0
  to 1.
- **Shortlist** (Jev's Choice question): "Which of these other artists on the same
  festival lineup is the closest musical match?" over every published, announced
  artist in the run, asked five times with the option order shuffled. Each artist's
  share is averaged across the five, and artists averaging at least 5% get the fit
  question too.

## How to read the report

- **Fit 0.4 or above:** no flag. Most verified picks land between 0.6 and 0.7.
- **Fit under 0.4, "worth a look":** explain the pick or swap it. A deliberate scale
  or thematic pick is expected to land here sometimes.
- **Fit under 0.25, "likely mismatch":** rare for a real pick (0.5% of verified
  picks). Treat it as a strong prompt to re-check.
- **Shortlisted candidates that fit better than a member:** listed only when the
  candidate's fit beats the member's by at least 0.05. The citation count shows
  whether picking it would also help roster diversity.
- **A fit is not a source.** Characterization claims still trace to stored genres,
  verified `about`, or an opened page.

## Observed behavior

- **Jev knows these artists on its own, and our inputs can override that.** With names
  only, Jev ranked Lorde's set sensibly (The xx got 7% of the Choice share). With our
  genres and `about` added, The xx fell to about zero: Lorde's tags (Alt-Pop,
  Electropop, Art Pop) share no word with The xx's. What Jev knows about any given
  artist is undocumented, so the script sends reviewed data rather than names alone.
- **It reads tags literally.** TypeSafe documents that Jev "can be quite literal."
  Shared genre words weigh heavily, so two artists whose tags name a similar sound
  differently can score lower than they should. Tag quality directly affects the check.
- **The Choice question is winner-take-all.** It concentrates the probability on a
  handful of artists, in whole-percent steps, and gives most of the roster exactly
  zero. It finds strong candidates; it cannot tell a reasonable pick from an unrelated
  one. That is why picks are checked with the fit question instead.
- **Choice results depend on option order below the top few.** TypeSafe documents a
  lean toward options that come first. Reshuffling moved Charli XCX from 30% to 61% of
  Lorde's share and dropped another candidate from 17% to outside the top ten. Averaging
  five shuffled orders steadies it: repeat runs agreed within about one point.
- **Fit answers are stable.** Repeat runs of the same pair vary by about 0.01, so
  differences of a few hundredths are noise. Hence the 0.05 margin.

## Benchmark

Run on 2026-10-20 against the local database, `jev-1.13.0`, fit question only. To
re-run, from `backend/`:

```bash
python -m scripts.benchmark_similar_artist_fit > benchmark.md        # report
python -m scripts.benchmark_similar_artist_fit --raw scores.json > benchmark.md
```

The report includes every verified pick under the flag threshold and every mismatch
at 0.5 or above.

**Method.** Every verified, non-empty similar-artist set across all runs (349 sets, 270
distinct source artists). For each set: the fit of every real pick, plus two seeded
random mismatches from the same run whose genre families share none of the source
artist's. A source and target pair is asked once even when the set repeats across runs:
1,310 real pairs, 690 mismatch pairs, 2,000 requests, about six cents.

**Results.**

| Pairs          | Count | Median fit | Fit < 0.4 | Fit < 0.25 |
| -------------- | ----- | ---------- | --------- | ---------- |
| Verified picks | 1,310 | 0.64       | 5.6%      | 0.5%       |
| Mismatches     | 690   | 0.22       | 91.6%     | 61.7%      |

A verified pick scored above a mismatch for the same source artist in 98.5% of 2,783
comparisons. Two further full runs reproduced every figure within about half a point.

**Choosing the flag threshold.** The share of verified picks flagged, the share of
mismatches caught, and the share of source artists with at least one flagged pick:

| Flag below | Verified picks flagged | Mismatches caught | Sources with a flag |
| ---------- | ---------------------- | ----------------- | ------------------- |
| 0.50       | 15.0%                  | 98.0%             | 44.1%               |
| 0.45       | 9.1%                   | 95.1%             | 30.7%               |
| **0.40**   | **5.6%**               | **91.6%**         | **21.9%**           |
| 0.35       | 3.4%                   | 87.7%             | 13.7%               |
| 0.25       | 0.5%                   | 61.7%             | 2.2%                |

At 0.5, nearly half of all sets would carry a flag, too often for a flag to be read.
0.4 flags about one set in five and still catches over 90% of mismatches.

**Caveats.**

- **The reference answers are our own picks.** The benchmark measures agreement with
  the editorial process, not objective similarity. A verified pick that scores low may
  be a Jev miss or an editorial slip; the benchmark cannot say which.
- **The mismatches are easy cases.** A random artist from another genre family is far
  easier to reject than a subtly wrong pick from a neighboring genre. The 98.5% says the
  check separates clear mismatches, not that it catches subtle ones.
- **The mismatch rule is imperfect.** Genre families blur (Indie, Pop, Americana), and
  some "mismatches" plausibly fit, such as girlsweetvoiced and Ryan Beatty (0.67) or
  Geese and Lorde (0.56). The true false-alarm rate on mismatches is likely lower than
  measured.
- **One model version, one database snapshot.** Re-run the benchmark before bumping
  the pinned model version, and compare against these figures.
