# Artist editorial handbook

The editor's side of the artist editorial process — how to actually run a session,
what you decide, and how to pace the work. This file is **for the human**; it is not
loaded by any skill.

- The standards the AI follows are in
  [`artist-editorial-process.md`](artist-editorial-process.md).
- The exact CLI flags, the roster CSV format, and the hosted-database tunnel commands
  are in [`../operations/backend-deployment.md`](../operations/backend-deployment.md).
- The reasoning is in
  [ADR-0013](../decisions/0013-editorial-authoring-and-review-process.md).

---

## What only you do

| Stage              | Your job                                                                                                                                                                                                                                                                                                                                                             |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Roster**         | Transcribe the official schedule into `roster.csv` — stylized name, slug, the Spotify **artist** URL you verified, YouTube/TikTok, billing tier, day/stage/time (or none, for an announced-only roster; see below). Resolve identity on Spotify yourself: a name can point at several acts, and a wrong id is silent corruption.                                     |
| **Skeletons**      | Run `build_roster_payloads.py --preview`, read the report, fix any flagged rows, then `--apply`.                                                                                                                                                                                                                                                                     |
| **Research pass**  | Read the AI's per-artist report. Approve per field or per artist. Where it surfaced two or three options, pick one. Nothing is written until you say so.                                                                                                                                                                                                             |
| **Flagship track** | Pick it in Spotify — you can see play counts, song age, and the "Popular" order. This is a judgment call (a defining track vs. a current-moment one). The AI gives you nothing here; use `show_artist --slug` for the rest of the record as context. Skip it for an artist with no Spotify presence that publishes on a featured live-performance video (see below). |
| **Publish**        | `check_artist_links` passes, then `publish_artists`. Needs identity + 3 genres + location + one preview (a Spotify artist ID, a full Listen First set, or a featured video) + a flagship track unless the preview is a video alone. Not `about`, not similar artists.                                                                                                |
| **Sign-off**       | You set every `*Verified` flag, always, after reading the evidence. The AI never does.                                                                                                                                                                                                                                                                               |

Similar-artist sets come later, after enough of the roster is published to draw from.

---

## Publishing an artist with no Spotify presence

A few acts (a local collective, an international DJ) have no Spotify artist page and no
catalog to build a Listen First set from, but do have live footage on YouTube. A
**featured live-performance video** is a third way to clear the preview requirement
(ADR-0017): add the video with `edit_artist`, mark it featured, and the artist
publishes with no flagship track and no audio preview anywhere.

- On Artist Detail the video carries the page; the Listen First block is absent.
- In Quick Picks the card is photo, genres, name, and the three decision buttons, no
  audio slot.
- `publish_artists` lists these under "video only, no audio preview" so you can see
  which artists shipped this way.

Use it only when there is genuinely no Spotify presence. An artist that has a Spotify
page still gets the ordinary flagship + Listen First treatment.

---

## Bringing a festival in before its schedule

A festival usually announces its lineup weeks before set times. Import it in two passes
against the same run: an **announced roster** first, then a **scheduled roster** once
times drop. If the schedule is already public when you build the roster, do a single
scheduled pass instead.

| Pass                                    | Rows           | Schedule columns | What `build_roster_payloads` does                                                             |
| --------------------------------------- | -------------- | ---------------- | --------------------------------------------------------------------------------------------- |
| **Announced roster**                    | one per artist | omitted          | creates an _announced_ entry with no appearances; the run stays "announced"                   |
| **Scheduled roster** (re-run, same run) | one per set    | filled           | attaches each artist's appearances to the existing announced entry; the run flips "scheduled" |
| **One pass** (schedule already public)  | one per set    | filled           | creates the artist and its appearances together                                               |

A single file is entirely one shape; a file mixing announced and scheduled artists is
rejected. Skeletons, research pass, flagship, and publish all run normally on an
announced entry (the app just shows no schedule UI until the times land), and anything
authored between the two passes (genres, `about`, flagship) survives the schedule
re-run.

### Columns

`slug` and `name` are the only columns required in every file; drop any column a file
does not use.

| Column                   | Required                                          | Notes                                                                                                                                                       |
| ------------------------ | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `slug`                   | always                                            | Lowercase, hyphen-separated. Spell out a leading number ("five-seconds-of-summer") unless the numeral is inseparable from the identity ("54-ultra").        |
| `name`                   | always                                            | Stylized as the artist writes it in prose, not a logo treatment. On a schedule re-run it appears only in the report, never re-saved.                        |
| `billing_tier`           | announced roster; a new artist's first appearance | `Headliner`, `Sub-headliner`, or `Undercard`, taken from the poster. Inherited (may be omitted) on a schedule re-run for an already-announced artist.       |
| `stage`                  | scheduled roster                                  | Must match a seeded stage name for the edition.                                                                                                             |
| `date`                   | scheduled roster                                  | `Jul 30` format; must match a seeded festival day.                                                                                                          |
| `start_time`, `end_time` | scheduled roster                                  | `8:30 PM` format.                                                                                                                                           |
| `spotify_url`            | optional                                          | Canonical `https://open.spotify.com/artist/{id}`. Resolve identity on Spotify first; a name can point at several acts. Fine to leave for the research pass. |
| `youtube_url`            | optional                                          | Official/verified > artist-managed > label-supported. A `- Topic` auto-channel counts as absent.                                                            |
| `tiktok_url`             | optional                                          | Canonical `@handle` profile URL.                                                                                                                            |

Identity and socials are read only by the pass that _creates_ the artist. A schedule
re-run looks each artist up by slug and touches only appearances, so identity/social
columns on those rows are ignored; put that work in the announced pass or leave it for
the research pass.

`build_roster_payloads` stamps `socialsVerified` from whatever social columns you
filled, including none ("verified there are none"). Socials added later in the research
pass re-stamp it. Full flag and tunnel-command reference is in
[`../operations/backend-deployment.md`](../operations/backend-deployment.md).

---

## Running a research-pass session

1. Pick 5–8 artists. More than that and the review turns into rubber-stamping.
2. Invoke the skill: `/artist-review <slug>` (or a list, or "all of Friday"), or just
   describe it ("do the research pass on the artists I just added").
3. The skill runs `show_artist --slug` first and works out whether each artist is a
   fresh research pass (bare draft) or a re-review (already populated). If it is
   ambiguous it will ask.
4. It comes back with a report per artist, walking fields in a fixed order
   (name → slug → genres → location → socials → about), a one-line rationale and
   sources for anything it is proposing, and options wherever the research did not
   land on one answer.
5. You approve. Approved changes go in as an `edit_artist` patch — always `--preview`
   first (it shows the field-by-field plan and re-runs publication readiness), then
   `--apply`.

**The `about` decision, per artist.** Three paths, your call by how well you already
know the artist and whether this is a launch:

- **Let the AI draft it.** Full research from scratch. Accurate, but it is the
  expensive path.
- **Write a rough skeleton first** — two or three factual sentences — and the AI only
  verifies and tightens the voice. Roughly half the cost. Worth doing for artists you
  know.
- **Defer it** (the deferred-`about` variant). The round does genres and location
  normally and skips the `about`, but instead of discarding the research it drops
  plausible `about` facts, with source URLs, into `docs/process/artist-about-leads.md`
  from pages it already had open. The later `about` then runs at skeleton cost, not
  from-scratch cost. The default for a roster launch: defer everyone but the headliners.

For the first two you read the copy against the cited sources before signing
`aboutVerified`; the third writes no copy yet.

---

## Pacing and cost

`about` is the only expensive field. Everything else — genres, location, the skeletons,
link checks, `show_artist`, similar-artist membership — is cheap.

- **A from-scratch `about` runs ~20–35 research tool calls.** A skeleton-first one runs
  ~7–10. A freshness re-review is ~7–10.
- **Do not batch a whole roster of from-scratch abouts into one week.** The process is
  built so you do not have to: `about` never blocks publishing. Get genres + location
  done for everyone, publish the roster, and then write abouts as a standing backlog —
  a handful per session, spread over weeks, headliners and high-traffic artists first.
  Run the non-headliner rounds as the deferred-`about` variant so each backlogged
  `about` starts from captured leads rather than nothing.
- The genres + location pass for a full roster is cheap. That plus flagship (your work
  in Spotify) plus publish is most of the launch, at a fraction of the cost of the
  about backlog.
- If a session feels heavy, it is almost always the abouts. Cut the batch size or push
  more of them to a skeleton-first draft.

---

## Re-reviews

A verified `about` drifts over about a year; a similar-artist set can be invalidated by
a lineup change. There is no automated "these are due" list yet — you decide when a
pass is worth it (a year on from the last stamp, a major career development, a lineup
change).

Invoke it the same way: `/artist-review <slug>`. The skill sees a populated, verified
record and runs in re-review mode — Tier 2, the current content as the baseline.

- If it confirms everything, the re-stamp is an `edit_artist` patch carrying only
  `aboutVerified: true`. `--apply` refreshes the timestamp; `--preview` will say "no
  field changes" (expected — the flag did not flip).
- If it found corrections, they go in the same patch alongside the flag.
- An unchanged, already-verified **similar set** cannot have its timestamp refreshed
  through `edit_artist` today — a no-change similar-set re-review is simply a no-op.

---

## Adding or dropping an artist after launch

- **Added, new artist:** roster row → `build_roster_payloads` → research pass →
  flagship → publish. Then their similar-artist set, and a balance sweep to work them
  into existing sets where they fit (see the process doc's "Similar-artist
  distribution").
- **Added, artist already in FestFuse** (shared with another festival, or the second
  ACL weekend): `build_roster_payloads` only adds the new run's lineup entry against
  the existing global record, which is already authored and published. No research
  pass, flagship, or publish. New work is just that run's similar-artist set, plus a
  balance sweep.
- **Dropped:** the database clears verification on every similar set that named them;
  re-review just those sets for a replacement pick, then a balance sweep. The other
  sets are untouched.

---

## When something is off

- A fact the AI cannot pin down: it should say so and give you the options, not guess.
  If it sounds certain about something thin, push back.
- A finding outside the current pass's scope: it goes in
  `docs/process/artist-flagged-issues.md`, not applied silently.
- A genre the artist needs that is not in the table: the AI flags it with sources; you
  add it with `add_genre` (writes the `genres` row) and mirror the entry into
  `app/data/categories.ts` by hand in the same change.
