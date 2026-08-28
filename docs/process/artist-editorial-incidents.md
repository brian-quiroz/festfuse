# Artist editorial incidents

Case studies behind specific rules in
[`artist-editorial-process.md`](artist-editorial-process.md). Read this only when a
check is getting shaky (identity will not converge, location sources conflict) and the
context helps. The rules in the process doc are self-sufficient; this is the _why_.

---

## Identity

### Same-name collisions in search results (the "bixby" case)

Researching "bixby" pulled in an unrelated 2000s LA rock band, an unrelated Canadian
country singer ("Jaydee Bixby"), and Samsung's voice assistant, all polluting search
results before the right artist was isolated. Flag a name collision the moment it is
noticed; do not let it quietly bias the rest of the research.

### Fabricated personas sitting on a real Spotify ID

Cases where the _stored record itself_, not just search results, described a persona
that did not match the artist actually behind the stored Spotify ID:

- **Chezile** — `about`, similar artists, and tracks described a fictional persona
  (wrong genre, wrong hometown, wrong catalog). Caught by fetching the stored Spotify
  ID directly and finding it resolved to a different act; confirmed against multiple
  independent sources before correcting.
- **Ink**, **The Creekers**, **Next of Kin** — the same pattern. For these, only the
  always-live fields (genres, location) were fixed immediately; the rest was logged
  because the verified flags were unset, so the wrong content was not rendering.
- **AYYBO**, **Omnom** — fabricated "real name" claims in `about`, caught the same way.
- **MC4D** — the real duo is Matt and Chris Drake, not "DiBari" as the stored record
  implied.

This is distinct from a search collision: the stored record reads internally
consistent, so it is easy to trust it and only spot-check individual facts rather than
question whether the whole persona is real. When identity feels shaky, fetch the stored
Spotify URL and read who it names — cheap and decisive. It confirms _an_ identity, not
that the bio you then find for it is the right one; require multi-source convergence
before asserting a correction.

---

## Location: the effort-cap rationale

**Whitney Whitney** — location took three separate research passes across two turns
before landing anywhere solid, with sources disagreeing the whole way. That spiral is
what the location effort cap exists to prevent: stop chasing conflicting sources past a
small number of attempts, and surface the field as unresolved with the competing
candidates named, rather than going quiet on it or manufacturing false certainty.
