# ADR-0023: Jev as an independent second opinion on similar-artist sets

- Status: Accepted
- Recorded: 2026-10-20, written alongside `scripts/check_similar_artists.py`.

## Context

Similar-artist sets are drafted by a language model under the editorial process and
approved by the editor (ADR-0013). The draft follows rules a single similarity score
cannot capture: four picks that mix matching dimensions, a bigger and a smaller act
where a genuine fit exists, roster-wide diversity over repeated anchors, and a
deliberate order. Several of the process doc's similar-artist rules exist because of
how a language-model drafter fails: picks that are not on the run's lineup ("the
single most common failure of ad hoc similar-artist lists"), and characterizations
written from memory instead of a stored or opened source.

The editor's review was the only check on a draft. It compared the drafter's judgment
against the editor's own, with nothing independent to compare against. A useful check
has to fail in different ways from the drafter. A second language-model pass does not:
it writes the same kind of persuasive prose, can invent the same kind of detail, and,
run in the same session, carries the context of every set drafted before it.

TypeSafe AI's Jev is a decision model, not a text generator. Its documented properties
are the ones such a check needs:

- **No generated text.** A question returns a probability (yes/no) or a probability
  for each option the caller supplies (Choice), and nothing else. It cannot name an
  artist outside the roster it was given, invent a fact, or cite a source, so its
  output needs no fact-checking of its own, only interpretation.
- **Self-contained requests.** Each request is evaluated against the state it carries.
  Memory across requests is something a caller adds deliberately, so one set's check
  is not shaped by the sets checked before it.
- **Calibrated probabilities.** Across many answers, a probability means what it says.
  TypeSafe's own docs are explicit that calibration describes groups of predictions,
  not a guarantee about any single answer.
- **Whole roster in one request.** A Choice question accepts up to 255 options and
  returns the full distribution (the largest run today has 171 published artists).

Speed is not a factor. This is operator tooling run a few times per review wave.

Trial runs against Lorde's verified Lollapalooza 2026 set (Charli XCX, MUNA, The xx,
Ethel Cain) shaped how the questions are asked:

- **A single Choice ranking is the wrong check.** Asked "which artist is the closest
  match?", Jev concentrates the probability on a handful of artists and gives about
  150 of 170 exactly zero, in whole-percent steps. The xx and Ethel Cain both got zero,
  indistinguishable from an unrelated act, and any rank among the zeros is arbitrary.
- **Below the top few, a single ranking is unstable.** Reshuffling the option order
  (TypeSafe documents a lean toward options that come first) moved Charli XCX from 30%
  to 61% and dropped one candidate from 17% to outside the top ten, while the top two
  stayed on top.
- **A yes/no question per artist discriminates.** "Would a fan of Lorde likely enjoy
  X?" gave MUNA 0.71, Charli XCX 0.63, The xx 0.60, Ethel Cain 0.42, and a deliberate
  mismatch (Freddie Gibbs) 0.17.
- **Jev knows these artists on its own, and our tags can override it.** With names
  only, The xx got 7% of the Choice probability. With our genres and `about` added, it
  fell to about zero: Lorde's tags (Alt-Pop, Electropop, Art Pop) share no word with
  The xx's, and TypeSafe documents that Jev "can be quite literal."

A benchmark of the fit question over every verified set (349 sets, 2,000 requests)
then set the thresholds. Verified picks had a median fit of 0.64 and random
cross-genre-family mismatches 0.22, and a verified pick outscored a mismatch for the
same source in 98.5% of comparisons. A 0.5 flag would have marked 15% of verified
picks and nearly half of all sets; 0.4 marks 5.6% of picks and about one set in five
while still catching 91.6% of mismatches. Method, full results, and caveats (the
reference answers are our own picks, and the mismatches are easy cases) are in
[`docs/process/artist-similar-artist-check.md`](../process/artist-similar-artist-check.md).

## Decision

1. **Jev is a second opinion, never the source and never the decider.** The set is
   drafted exactly as before, without Jev. `check_similar_artists.py` runs afterward
   on the draft (`--proposed`) or the stored set, and its report goes to the editor
   alongside the draft. The editor still signs `similarArtistsVerified`.

2. **Each pick is checked with its own yes/no question.** One request per artist asks
   whether a fan of the source artist would likely enjoy it, with both artists' name,
   genres, and verified `about` as the state. A member under 0.4 is flagged "worth a
   look" and under 0.25 "likely mismatch", per the benchmark above. Before the pinned
   model version is bumped, the benchmark (`scripts/benchmark_similar_artist_fit.py`)
   is re-run and the thresholds re-checked.

3. **Candidates come from a Choice question averaged over shuffled orders.** The
   whole published roster is the option list, asked five times in seeded shuffled
   orders, and each candidate's share is averaged. Candidates averaging at least 5% are
   shortlisted, get the same yes/no question, and are reported when their fit beats a
   member's by at least 0.05 (noting when they are cited by fewer other sets). Ranks
   are never shown.

4. **Only verified similarity evidence is sent.** Unverified `about` drafts, billing,
   and citation counts are left out, so Jev judges musical closeness and the scale and
   diversity rules stay with the drafter. The report adds billing and citation counts
   back, and flags a set whose members all share one billing tier.

5. **The report flags; it does not reject.** A low fit on a pick made for scale or a
   thematic parallel is expected; the drafter explains it and the editor decides.

6. **A Jev answer is not evidence.** The process rule that every characterization
   claim traces to a stored genre tag, verified `about` text, or a source opened that
   session still holds. The one sanctioned use as input is finding a genuine fourth
   pick when genre and `about` fall short, and the drafter says so when it happens.

7. **Operator tooling only.** The script reads PostgreSQL and sends about ten requests
   per set in parallel. The API key is an optional backend setting
   (`TYPESAFE_API_KEY` in `backend/.env`) that only this script reads. Nothing in the
   API, the frontend, or the deployed backend calls Jev, and no new package is added
   (requests use the standard library). The model version is pinned so a model update
   cannot silently shift results between review waves.

## Consequences

- The editor gets a check on each draft that fails differently from the drafter, at a
  cost of well under a cent and about a second per set.
- Jev can be wrong about any single set. A fit is a signal to weigh, and differences
  of a few hundredths are noise (repeat runs vary by about 0.01), hence the 0.05
  margin in decision 3; a pattern across many sets means more than one outlier.
- Jev's answers are only as good as the data they are given, and literal genre-tag
  overlap can outweigh what Jev knows about an artist. Thin `about` coverage or tags
  that name a sound differently from a neighbor's weaken the check, the same weakness
  the process doc names for broad umbrella tags.
- Using Jev to draft sets as well would make the check grade its own suggestions, so
  the two roles stay separate by rule (decision 1).
- The balance sweep's per-swap question ("is this under-referenced artist a comparable
  fit in that set?") fits the same yes/no question but is not built.
- A pinned model version must be bumped deliberately, and results from different
  versions are not comparable.

## Alternatives considered

- **A second language-model review of the draft** (another model, or a fresh
  sub-task). Rejected. It shares the drafter's failure modes and returns prose that
  itself has to be checked.
- **Jev drafts the set.** Rejected. A similarity ranking yields genre twins and favors
  no scale mix or roster diversity, and it would replace the editorial reasoning the
  process requires.
- **Jev as a shortlist before drafting.** Rejected as the default. It would anchor the
  draft on Jev's output and leave no independent check. Kept only as the fourth-pick
  fallback in decision 6.
- **A single Choice ranking as the check.** Built first and replaced after the trial
  runs above: winner-take-all zeros, arbitrary ranks among ties, and instability below
  the top few.
- **A yes/no question for every artist in the run.** Not needed. Averaged Choice
  shares find the candidates worth comparing in five requests, where per-artist
  questions would take up to 170 per set.
- **Sending names only**, to lean on Jev's own knowledge of the artists. Rejected.
  What Jev knows about a given artist is undocumented and unverifiable, while genres
  and verified `about` are reviewed data the editor can inspect.
- **The `typesafe-sdk` package.** Not added. The script makes plain POST requests, and
  adding a dependency to `requirements.txt` would ship it with the deployed backend,
  which never uses it.

## References

- [ADR-0013: Editorial authoring and review process](0013-editorial-authoring-and-review-process.md)
- [`docs/process/artist-editorial-process.md`](../process/artist-editorial-process.md),
  "Similar artists"
- [`docs/process/artist-similar-artist-check.md`](../process/artist-similar-artist-check.md),
  observed behavior and the benchmark
- TypeSafe AI documentation: [Choice](https://docs.typesafe.ai/primitives/choice),
  [State](https://docs.typesafe.ai/concepts/state),
  [machine-learning primer](https://docs.typesafe.ai/introduction/machine-learning-primer),
  [Jev 1.13 limitations](https://docs.typesafe.ai/model-jaggedness/jev-1.13)
