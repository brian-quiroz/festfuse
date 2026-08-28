# Artist editorial process

How artist records are authored, researched, reviewed, and published in FestFuse. This
document is the source of truth; the per-tool skills and rules
(`.claude/skills/artist-review/`, `.agents/skills/artist-review/`,
`.cursor/rules/artist-editorial.mdc`) are thin pointers to it.

The reasoning behind this process is in
[ADR-0013](../decisions/0013-editorial-authoring-and-review-process.md). The write path
it sits on is [ADR-0011](../decisions/0011-direct-to-postgresql-artist-authoring.md) and
[ADR-0012](../decisions/0012-field-level-artist-edits.md); the schema is
[`artist-data-model.md`](../design/artist-data-model.md). Past incidents that motivate
specific rules here are in
[`artist-editorial-incidents.md`](artist-editorial-incidents.md) — read that only when a
check is getting shaky, not as routine background. The editor's own guide to running
this — session rhythm, pacing, cost — is
[`artist-editorial-handbook.md`](artist-editorial-handbook.md) (for the human, not
loaded here).

Everything below is framed around the **bulk case**: authoring a whole festival's
roster. Adding or fixing a single artist later is the same pipeline with a one-row
roster.

---

## Non-negotiables

If you read nothing else:

- **The editor (human) owns** identity, schedule, socials, the flagship track, and every
  `*Verified` sign-off. The AI proposes genres, location, `about` drafts, and
  similar-artist sets — and never sets a verification flag, resolves identity, or
  transcribes a schedule.
- **Sources for every factual field** the AI proposes — genres, location, `about`. Not
  best-effort. A claim without a supporting source does not go in.
- **Same-day web search, not model memory**, for every AI stage.
- **Surface uncertainty, never fake confidence.** Two or three defensible answers →
  present them and let the editor choose. "I'm not sure, here are the options" is a
  complete deliverable.
- **Similar-artist membership is always a local check** against the published roster,
  never a web search. Exactly four picks or a verified-empty set — never a forced four.
- **Nothing is written without the editor approving that artist's report**, and every
  change goes through the service CLIs with `--preview` before `--apply`.

---

## The pipeline

| # | Stage | Owner | Output |
|---|---|---|---|
| 1 | Roster file | Editor | `roster.csv` |
| 2 | Skeletons | `build_roster_payloads.py` | draft artists in Postgres |
| 3 | Combined research pass | AI proposes, editor approves | genres, location, `about` |
| 4 | Flagship track | Editor | one `isQuickPicks` track selection |
| 5 | Link check + publish | Editor | published artists |
| 6 | Similar artists | AI proposes, editor approves | verified similar-artist sets |

Publishing (stage 5) requires only identity, three genres with one primary, location,
one flagship track, and either a Spotify artist ID or a complete Listen First override
(`evaluate_artist_publication`). It does **not** require `about` or similar artists —
those are additive layers filled in over time. An artist page omits the About section
and the "Sounds like" section until each is verified. The goal is an `about` for every
artist, but because it does not gate publishing, a roster under time pressure can ship
without it and backfill later.

### 1. Roster file (editor)

A CSV transcribed from the official festival schedule. One row per appearance; an artist
with multiple sets (e.g. DEVAULT) has one row per set, sharing `slug`.

Columns:

| Column | Notes |
|---|---|
| `name` | Stylized as the artist writes it in running prose, not a logo treatment. |
| `slug` | Lowercase, hyphen-separated. Spell out a leading number ("five-seconds-of-summer") unless the numeral is inseparable from the identity ("54-ultra"). See ARCHITECTURE.md "Slug Naming Convention". |
| `spotify_url` | The canonical `https://open.spotify.com/artist/{id}` URL. Resolve identity on Spotify before entering it — a name can refer to several acts. |
| `youtube_url` | Optional. Official/verified > artist-managed > label-supported. A `- Topic` auto-channel counts as absent. |
| `tiktok_url` | Optional. Canonical `@handle` profile URL. |
| `billing_tier` | `Headliner`, `Sub-headliner`, or `Undercard`. |
| `stage` | Must match a seeded stage name for the edition. |
| `date` | `Jul 30` format; must match a seeded festival day. |
| `start_time`, `end_time` | `8:30 PM` format. |

Identity and schedule never go through AI. The editor verifies the Spotify artist,
YouTube, and TikTok links while building this file; `build_roster_payloads.py` then sets
`socialsVerified` on the strength of that.

### 2. Skeletons (`build_roster_payloads.py`)

Reads `roster.csv`, validates each row into the `add_artist` payload schema, and runs
`create_artist` per artist. `--preview` runs everything against the target database in a
transaction and rolls back, printing a create plan and publication-readiness assessment
per artist; `--apply` commits. A malformed row is reported and skipped without blocking
the rest.

Every artist is created `draft`. Nothing else is populated yet.

### 3. Combined research pass (AI proposes, editor approves)

**First, determine the mode.** Run `show_artist.py --slug <slug>`:

| What it shows | Mode |
|---|---|
| Not found | The artist is not in the database. If it is a new lineup artist, it goes on the roster and through `build_roster_payloads.py` first (stages 1–2). Stop here. |
| `draft`, empty genres / location / about | **Research pass** — draft all three fresh. `about` is Tier 3 unless the editor supplies a skeleton. |
| Populated and `*Verified`-stamped | **Freshness re-review** — the current content is the Tier 2 baseline; verify it still holds and re-stamp. See [Freshness re-review](#freshness-re-review). |
| Partly filled / mixed | State what is present and what is not, and ask the editor which mode. |

Genres, location, and `about` draw on the same sources, so they are one research effort
per artist. Keep the research sub-task scoped to those three — not flagship-track or
similar-artist work. Rounds of about five to eight artists.

Per artist, the AI:

1. **Re-confirms identity** — fetches the roster's `spotify_url` and checks the name,
   genres, and sound roughly match the artist about to be researched. This catches a
   paste error, not a subtle wrong-artist. If it does not match, stop and flag it; do
   not research further.
2. **Genres** — see [Genres](#genres) below.
3. **Location** — see [Location](#location) below.
4. **`about`** — drafts it per [About copy](#about-copy), *or* the editor supplies a
   skeleton and the AI only verifies and tightens it (Tier 2 instead of Tier 3), *or*
   it is skipped for this artist and left for a later pass (it does not gate publishing).

The AI presents a **per-artist report**, walking the fields in a fixed order:

> name → slug → genres → location → socials → about

Every field gets a line even when unchanged ("Confirmed" / "No change"). Every changed
or proposed field carries a one-line rationale **and its sources**. Where the research
did not settle on one answer, the report says so and lists the candidates — see
[Surfacing uncertainty](#surfacing-uncertainty). Raw research output (a sub-task's
findings dump) may be shown alongside, but label it clearly as the raw material — the
report is the thing the editor reviews.

The editor approves per field or per artist, then the flow in
[Review and approval mechanics](#review-and-approval-mechanics) applies. Stage 3 and
stage 4 (the flagship track) can land in one `edit_artist` patch once the editor has
approved both.

### 4. Flagship track (editor)

The editor picks the flagship (Quick Picks) track entirely in Spotify — Spotify shows
play counts, song age, and its own "Popular" ordering; the choice is a representation
judgment (a defining track versus a current-moment one). The AI contributes nothing
here.

`show_artist.py --slug <slug>` prints the artist's full current draft (genres, location,
`about`, readiness) as context while picking.

The pick is applied through `edit_artist` as `tracks[0]` (which the service maps to the
single `isQuickPicks` selection). `check_artist_links.py` confirms the track ID resolves
on Spotify and fills the canonical track name.

### 5. Link check and publish (editor)

Run `check_artist_links.py` (per artist, per run, or all) — it resolves every external
identifier (Spotify artist and track IDs, YouTube video ID, social URLs, image
source/license URLs) via oEmbed and HTTP, mechanical resolve checks only. It exits
non-zero on any failure.

Then `publish_artists` (its own guarded workflow). Publishing is per artist or per
batch, as soon as stages 3 (genres and location) and 4 are done. `about` can still be
unwritten.

### 6. Similar artists (AI proposes, editor approves)

Every pick in a set must be a published, announced lineup artist — the backend requires
it to verify the set and to serve it — so this stage can only start once there is a
published candidate pool. It is per-set, not global: once a first wave of the roster is
published you can curate sets among those artists, drawing only from them.

Work through the sets a handful at a time; each is approved and stamped
(`similarArtistsVerified`) on its own, and the artist's "Sounds like" section goes live
as soon as its set is done — not all at the end. See [Similar artists](#similar-artists)
for the per-set rules and [Similar-artist distribution](#similar-artist-distribution) for
the balance sweep.

---

## Sources

### Source hierarchy

1. Official artist / label / management / festival / Spotify pages
2. Reputable music publications and interviews
3. AllMusic
4. Wikipedia — after checking its citations, not taking its prose at face value
5. Other established festival tools and apps — cross-checks only, never a sole source
6. MusicBrainz, Everynoise, community tags — supporting evidence only

An AI-generated search summary (a "Google AI overview" and the like) is **not a source**
and never satisfies a check on its own.

Sources for every proposed fact go **in the report**, next to the claim they support
(see Non-negotiables).

### Integrity

- Never fabricate a fact, URL, Spotify ID, or citation.
- Say "not verified" rather than filling a gap with plausible prose.
- A citation must support the specific claim attached to it.

---

## Surfacing uncertainty

The Non-negotiable, applied: present two or three defensible answers with what each is
based on, rather than picking one and sounding sure.

Do not burn time or tokens chasing a single "perfect" answer past the point of
diminishing returns. If identity or location will not resolve cleanly within a small
number of lookups, stop, state the competing candidates, and hand it to the editor —
surfacing it as unresolved, not dropping it.

---

## Research-intensity model

Use the cheapest level that answers the question; escalate only when it genuinely
cannot.

| Tier | What | Typical use |
|---|---|---|
| 0 | Local files / database only, no web | genre exists in the `genres` table; similar-artist lineup membership; URL shape |
| 1 | One web lookup against a real source | a release year; which act a Spotify URL names; an artist's current scale |
| 2 | Focused verification of existing text | checking each claim in an editor-supplied `about` skeleton (~7–10 calls) |
| 3 | Research from scratch | an AI-written `about` for an artist with no baseline (~20–35 calls) |

- **Genres** — Tier 0 (validate against the `genres` table) plus Tier 1.
- **Location** — Tier 1; a bounded Tier 2 only when sources conflict, then stop and
  surface the conflict rather than spiral.
- **`about`, AI-written** — Tier 3. An editor skeleton drops it to Tier 2; this is the
  biggest single lever on per-artist cost.
- **Similar artists** — Tier 0 membership plus a bounded Tier 1 on the chosen set.
  Never Tier 2: if four good picks are not there, flag it, do not research toward a
  weak fourth.
- **Freshness re-review** — Tier 2, with the existing verified content as the baseline.

---

## Per-field guidance

### Identity

Owned by the editor, resolved on Spotify before the roster is built. The AI's only
involvement is the cross-check in stage 3.

Two failure modes worth knowing (see the incidents doc): search results for a name can
pull in unrelated same-named acts; and a stored record can describe a fabricated persona
while its Spotify ID points to a real, different act. When identity feels shaky, fetch
the stored Spotify URL directly and read who it names. That confirms *an* identity, not
that the bio found for it is the right one — require multi-source convergence before
asserting a correction.

### Genres

Exactly three, ordered, with one marked primary. `genres[0]` drives the card label and
the gradient-fallback color, so it must be the most defining, self-identified genre —
not a broad catch-all when a specific one is more representative, unless the broad one
genuinely is the identity.

**Order of operations.** Let the web research (and the artist's own framing) establish
what the sound *is* first — do not start from a genre you assume from memory. Then
Tier 0 is *validation*: check the researched descriptors against the `genres` table
(exact spelling), and check how a comparable artist already in the roster is recorded
(`show_artist.py --roster`, or `--slug` on a peer) for house style.

If an existing genre genuinely communicates the sound, use it — do not add a
near-duplicate. Adding a genre has a real cost: with `add-genre` deferred (ADR-0011) it
is a manual two-file change (a `genres` row plus the matching `app/data/categories.ts`
entry, which currently mirror each other by hand — see "Genre Vocabulary Lives in Two
Places" in `FUTURE_CONSIDERATIONS.md`), and every added genre is one more thing to keep
aligned.

The reverse extreme is worse, though: never force an artist into a "close enough" genre
that is not actually accurate just because it is already in the table. If the artist's
real genre is not represented, adding it is the right call — flag it in the report with
sources for why none of the existing entries fit, and the editor adds the row.

**Disclose a substitution.** If you settle on an existing genre that is *close to* but
not exactly what the sources point to — the nearest available rather than a true match —
say so in the report: name the genre the research pointed at and the one you used, so
the editor can decide whether to add the precise one. This does not apply to trivial
normalization (a hyphen, casing, an obvious spelling variant of the same genre).

If it is a genuine toss-up between an existing genre and a new one, surface both to the
editor rather than deciding.

Every genre string used must match an existing table entry exactly (spelling, casing,
hyphenation) — never invent a variant spelling of something already there. State why the
first genre is first, every time.

### Location

One structured value: `{ city, state?, country }` (`state` only for the United States).
There is no room for nuance in the data, so the question is: based on all the research,
which single place is this artist most meaningfully identified with, and why.

This is case by case. A useful default starting point — formation place for a band,
current artistic base for a solo artist, over birthplace — but it is a default, not a
rule, and the evidence overrides it. If a band formed in one city but is universally
tied to another city's scene, or a solo artist lives somewhere now but their whole
identity is rooted elsewhere, take the place they are actually associated with. Whatever
you pick, the report says which place, which kind of place it is (formed / based /
scene / raised), and the reasoning. Do not silently conflate birthplace, upbringing,
formation, and current residence.

Location often needs more than one source. When sources genuinely conflict, a bounded
Tier 2 is allowed, but stop after a small number of attempts and surface the competing
candidates rather than spiralling (see the "Whitney Whitney" incident).

### Socials

Owned by the editor, entered in the roster. The AI does not research socials — in
practice it produces confidently wrong links or false "no socials" results. `*Verified`
is the editor's.

Canonical forms: Spotify `open.spotify.com/artist/{id}`; YouTube official/verified >
artist-managed > label-supported, with a `- Topic` channel treated as absent; TikTok
`@handle`.

### About copy

`about` is the only AI-authored prose rendered in the app (the Artist Detail About
section). The goal is one for every artist; it never blocks publishing (see the pipeline
note). There is no "verified empty" `about` the way there is for socials — either there
is verified text or the section does not render.

**Verify every fact before writing it** — album titles, years, awards, chart positions,
stream counts, members, hometowns, tour details. Never reuse a claim from memory. If a
fact cannot be verified, cut it rather than soften it into something vaguer that is
still unverified.

Voice rules:

- **Excitement from specifics, not adjectives.** No "legendary," "masterclass,"
  "premier," "one of the most exciting figures in X." A real album, award, or stream
  count carries its own charge. Test: would the sentence still be true if written by a
  stranger who had never heard the music?
- **A notch of warmth, not flat recitation.** Let a real accolade register as
  impressive. Calibrate to what the research actually turned up — a smaller artist with
  sparse public information does not need padding.
- **No dashes.** No em dashes or standalone hyphens as punctuation. Use a period or
  colon.
- **Titles in single quotes.** `'BRAT'`, `'Halcyon'`, not double quotes.
- **Describe the show, do not instruct the reader.** "His sets run on relentless low
  end," not "Expect relentless low end."
- **Nothing tied to one appearance.** No specific stage, date, "this weekend," or
  "hometown set." The record is reused across festivals and years. Biographical origin
  facts ("emerged from Chicago") are fine; tying that origin to "this show" is not.
- **Live-performance details are fair game when documented** by multiple independent
  sources as an established part of the act — not one reviewer's account of one show,
  and never described as if the copy witnessed it.

Two paths, the editor's call per artist by how well they already know the artist:

- **AI drafts** — Tier 3 research, sources inline, editor verifies against them.
- **Editor writes a skeleton** — AI verifies each claim and tightens the voice (Tier 2).

Either way the editor signs `aboutVerified`. Editing `about` after verification clears
the flag (database trigger), so a re-verified edit must carry `aboutVerified: true` in
the same patch.

### Similar artists

Exactly four, ordered, or a verified-empty set (the CYSO case) — never a forced or
padded four. Evaluated on `name` + `slug` only.

- **Membership** is always a Tier 0 check against the published lineup — validated
  against the `show_artist.py --roster` snapshot, which is also where candidates are
  drawn from. Every pick must be a published, announced artist in this run. This is the
  single most common failure of ad hoc similar-artist lists and is never a web search.
- **Characterization** — a bounded Tier 1 check on the chosen four plus the source
  artist: does the stated similarity actually hold, is each one's current scale right.
  Not a research project; if a stated relationship will not confirm quickly, drop that
  claim or that pick and flag it.
- The four deliberately **mix matching dimensions** (sound/genre, scene/scale, thematic
  parallel) rather than four genre-nearest-neighbors, and **mix at least one
  bigger-name act with one smaller or rising one** — based on *current* scale, checked,
  not remembered.
- **Soft preference:** when two candidates fit comparably, prefer the less-referenced
  lineup artist (see below).
- **Order is a deliberate editorial choice** — not popularity rank (do not lead with the
  biggest name and trail the smallest), not shuffled. Order by strength and kind of
  match: the clearest, most representative comparison first, then the rest so the set
  reads as a considered progression.

State the reasoning behind the set *and* its ordering, with sources for the
characterization claims. The editor signs `similarArtistsVerified`.

---

## Similar-artist distribution

The lineup is a closed system, so repeatedly picking the same artist for a niche means
an equally valid one never surfaces.

- **Soft preference** during drafting (above).
- **Reference count** — `show_artist.py --roster` prints the whole published roster
  (`slug | name | genres | billing | day`) with, for each artist, how many others cite
  it as similar. It reads existing `similar_artists` rows; it is not a workflow step. It
  does not target a flat distribution — some artists are legitimate genre anchors, some
  legitimate outliers.
- **Balance sweep** — run after each wave of similar-artist work and after every lineup
  change:
  1. Read the reference counts.
  2. Flag imbalances (one artist cited many times, a comparable one cited zero).
  3. For each, check whether the under-referenced artist is a genuinely comparable fit
     in a few of the sets that use the over-referenced one — Tier 0 (the genre/scale
     data already exists) or a quick Tier 1. No research re-run.
  4. Present the candidate swaps; the editor approves or rejects each.

### Lineup change

Two steps, in order. Re-curation is scoped to what broke; the sweep then looks across
the whole roster but only moves the outliers.

**Artist added:**

1. **Draft their own set** — the AI proposes four, membership-checked against the
   `show_artist.py --roster` snapshot, editor approves. Nothing else is touched yet.
2. **Balance sweep** — the newcomer is at inbound reference count zero, so the sweep
   flags them as under-referenced and proposes working them into a handful of existing
   sets where they fit as well as the current pick. Editor approves each swap.

**Artist dropped** (today, a `delete_artist --force` of a mistaken draft; the withdrawal
tool for a published artist is deferred — ADR-0011 — but the mechanism below is the
same):

1. The departure invalidates similar-artist sets. The database trigger clears
   `verified_at` on the departed artist's own set **and** on every set that listed them
   as one of its four; a hard delete also removes those rows, leaving those sets with
   three entries.
2. **Re-curate only the sets the trigger flagged** — for each, the AI proposes a
   replacement fourth pick so it is a valid, verified four again, editor approves. A set
   that never listed the departed artist has no hole, keeps its verification, and is
   **not** re-curated.
3. **Balance sweep** — the counts have now shifted: the departed artist's four outbound
   picks are gone (each of their targets lost an inbound reference) and the step-2
   replacements added inbound references elsewhere. The sweep reads the full count table
   and, where an artist is now notably over- or under-referenced, proposes a swap in a
   few sets. It *considers* every set but *changes* only the outliers; if nothing is an
   outlier it is a no-op. It never re-researches a set.

A relationship-graph model with globally optimal balancing is the deferred fuller
answer (`FUTURE_CONSIDERATIONS.md`).

---

## Review and approval mechanics

The loop: **(1)** AI research → report. **(2)** editor reviews, spot-checks the cited
sources, says what to fix. **(3)** AI folds in the fixes → revised report. **(4)**
editor approves — this *is* the `*Verified` sign-off. **(5)** AI builds the `edit_artist`
JSON from the approved report, runs `--preview`, shows the plan. **(6)** editor confirms
the plan matches what they approved. **(7)** AI runs `--apply`.

Steps 1, 3, 5, 7 are mechanical and the AI does them. The editor owns 2, 4, 6. The AI
never decides a fact is correct, never sets a `*Verified` flag on its own judgment
(it transcribes `aboutVerified: true` *because* the editor approved), and never skips
the `--preview`.

The service CLIs (approval and `--preview`-before-`--apply` are Non-negotiables):

- `build_roster_payloads.py` — bulk skeleton creation.
- `edit_artist.py --input patch.json --preview | --apply` — field-level changes. The
  preview prints a per-field change plan, a slug-change warning, and the re-run
  publication readiness.
- `check_artist_links.py` — the pre-publish gate, run on the batch being published.
- `publish_artists` — draft to published.

Full flags, the roster CSV format, and the hosted-database tunnel commands are in
[`backend-deployment.md`](../operations/backend-deployment.md) ("Adding, editing, or
removing an artist" and "Editorial pipeline scripts"). The database is chosen by
environment (`backend/.env` / `POSTGRES_*`), exactly like the existing scripts.

---

## Freshness re-review

A verified `about` goes stale over a year; a similar-artist set can be invalidated by
lineup changes. The editor invokes a **freshness re-review** for an artist: re-verify
`about` and the similar set against current sources (Tier 2, existing content as
baseline), then re-stamp. This is a manual mode, not automated — auto-detecting stale
`verified_at` is a `FUTURE_CONSIDERATIONS.md` item.

**Applying the result.** Whatever the review found, it lands as one `edit_artist` patch:

- **Corrections found** — put the corrected fields plus `aboutVerified: true` in the
  patch. Editing `about` clears its flag (trigger), so the flag must ride in the same
  patch — see [About copy](#about-copy).
- **Nothing changed** — the patch carries only `aboutVerified: true`. `--apply`
  refreshes `about_verified_at` to now (recording the re-confirmation); `--preview`
  reports "no field changes" because the boolean state did not flip, which is expected.
- **Similar set** — pass the (possibly re-ordered or re-picked) four slugs plus
  `similarArtistsVerified: true`. An *unchanged* verified set cannot have its
  `verified_at` refreshed through `edit_artist` today (it only re-stamps on a
  membership or verification-state change) — a known limitation, see
  `FUTURE_CONSIDERATIONS.md`. So a no-change similar-set re-review is a no-op; only
  re-stamp when something actually moved.

---

## Out-of-scope findings

`docs/process/artist-flagged-issues.md` logs a real, sourced correction found during a
pass that lives outside that pass's scope — not a general TODO list. Add to it rather
than losing a finding. Several existing entries predate this workflow and are likely
stale; that file's header explains that working them is a pending dedicated pass.

Fields the process does not touch unless explicitly asked: `tagline`, `whySee`,
`whatToExpect`, `bestFor` (dormant, unrendered), `mbid` (no runtime consumer),
`similarArtists[].imageUrl` (dead field, preserved), and `tracks` beyond the flagship
selection.
