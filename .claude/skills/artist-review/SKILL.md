---
name: artist-review
description: >-
  Use when authoring, reviewing, fact-checking, or correcting FestFuse festival lineup
  artists' stored data — genres, location, about copy, socials, name/slug stylization,
  similarArtists, or the flagship Quick Picks track. Triggers on an artist name (or list,
  or "all of <day>") with words like "review", "audit", "fact-check", "check the about
  copy", "similar artists", "add these artists", "verify genres/socials". Does not trigger
  on general artist trivia that is not about correcting the stored record.
---

# FestFuse artist review

The full editorial process — the pipeline, who owns which field, the source hierarchy,
the research-intensity model, per-field rules, about-copy voice, and the similar-artist
heuristic — is in
**[`docs/process/artist-editorial-process.md`](../../../docs/process/artist-editorial-process.md)**.
Read it and follow it. Incident case studies are in
[`docs/process/artist-editorial-incidents.md`](../../../docs/process/artist-editorial-incidents.md);
read those only when a check is getting shaky.

Essentials:

- Artist data lives in PostgreSQL, not `app/data/artists/*.ts`.
- Identity, schedule, socials, and the flagship track are the editor's; AI proposes
  genres, location, `about` drafts, and similar artists, each with sources, and never
  sets a `*Verified` flag.
- Read a draft with `python -m backend.scripts.show_artist --slug <slug>`; `--roster`
  prints the whole-roster snapshot for similar-artist membership checks and the balance
  sweep.
- Apply approved changes through the service CLIs, `--preview` before `--apply`:
  `build_roster_payloads.py` (bulk skeletons), `edit_artist.py --input patch.json`
  (field-level), `check_artist_links.py` (pre-publish gate).
- For Tier 2 / Tier 3 `about` research use a scoped sub-task on the specific claims,
  never open-ended inline research.
- Deferring `about` for a batch (a roster launch)? Run the deferred-`about` variant:
  genres and location as normal, the `about` line marked "deferred", and plausible
  `about` facts from sources already open for genres or location appended to
  `docs/process/artist-about-leads.md` with their URLs. No extra research for the leads.
- Per artist: fetch the stored Spotify artist URL first — canonical name plus distinctive
  facts (exact tracks, dates, collaborators) to identify every other source by. Cite only
  pages you opened; a search-result summary is a pointer, not a source. Every genre a
  source names is accounted for — used, mapped to a table entry with the mapping stated,
  or flagged as a gap — never invented from adjacent ones.
- Present a per-artist report and wait for explicit approval before building a payload.
  Sources for every factual field. Never sound certain when the research is thin —
  surface the options instead.
