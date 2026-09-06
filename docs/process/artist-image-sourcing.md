# Artist image sourcing

A ten-artist trial run exercised the Commons metadata workflow and hero placement.
Its findings are folded in here: band/group coverage, source size targets, subject
position, and an explicit optimize step. Direct Flickr API sourcing still needs its
first full run.

## Assignment and boundaries

- Work on the user's named artists or slugs. Do not choose replacements or scan the
  whole roster unless asked. Read only their identity and existing image fields.
- Use supplied canonical identity links to disambiguate names. If identity remains
  ambiguous, flag that artist rather than guess or research an unrelated performer.
- Process up to five artists per batch by default. For a longer list, preserve its
  order and continue in batches unless the user requested only the first batch.
- Require a user-specified output root for the current task before starting research.
  If omitted, ask for it; never assume a previous batch location, festival folder, or
  Documents directory. Accept an absolute path, a home-relative path, or an explicitly
  repo-relative path. Use the supplied root as-is and create `images/` beneath it.
- Default output: a new batch CSV with one proposed photo per artist. No image files
  are saved unless downloads are explicitly authorized. No database writes,
  publication, file replacement, or image edits are implied by photo research.
- Download selected originals only when the user has authorized downloads. Existing
  authorization for the batch is sufficient; do not ask again for each file.
- Thumbnail inspection is part of research. If the user says no downloads, inspect
  remote previews without saving image files and describe that distinction accurately.

## How to choose

First establish the correct artist and a supported reuse license. Then use this
priority order as judgment guidance, not a points system or rigid rejection filter:

1. **Clear artist and plausible Artist Detail fit.** Favor recognizable faces and
   useful subject size. The desktop hero carries the identity text and a strong fade
   on the left, so the subject should sit from center to right. The sweet spot is the
   subject centered within the right-hand third (roughly 65-85% across); it does not
   need to be jammed into the corner, and anywhere from the middle rightward is
   acceptable. A hard-left subject is a defect to fix by re-sourcing, not by mirroring.
   Assess the composition, not merely pixel dimensions. A large distant-stage image can
   still be a weak fit.
2. **Appropriate for a portfolio project.** Consider the artist's normal presentation
   and performance context. Flag materially questionable content without imposing an
   unrelated dress code or silently changing which artist is being researched.
3. **Right-sized source.** Target a landscape shot around 3000x2000 (long edge
   ~3000px, short edge ~2000px). Bigger is fine and not a reason to reject; it just
   gets downscaled in the optimize step. Below ~2400px on the long edge is a weak
   fallback to flag and usually re-source. Never upscale a small one and call that
   original resolution. A portrait source is fine when it is the best available: the
   Artist Detail letterbox plus `image_focal_y_percent` positions it without a crop.
4. **Whole act in frame, especially for groups.** For a band or duo, prefer a frame
   showing multiple or all members; a somewhat wider or further-back shot is
   acceptable and often better, because the subject is the act, not just the lead. A
   single-member shot can still work when no fuller frame exists, but `fit_notes` must
   say who is pictured, that a fuller shot was looked for, and why this pick still won.
5. **Live performance, when available.** A strong portrait can beat an unusable live
   shot.
6. **Newer photographs, other qualities considered.** Search recent work first, but
   a strong 2014/2015 photo can beat a weak recent one. Do not impose an age cutoff.
   If appearance seems materially different, compare with one recent reliable image;
   do not launch a biography investigation or assume appearance is unchanged.
7. **Brightness and color as tie-breakers.** Prefer visible detail and separation
   from FestFuse's dark background. Very dark or heavily purple photos are less ideal,
   but are acceptable when stronger in the more important respects above.

Preserve the original composition by default. Y% is a later, experimental placement
setting, not something to infer from source metadata. Leave it blank during sourcing.
An edited crop is a last resort; describe it as an untested option, not a requirement
or a guarantee that the photo will work. Do not mirror or generate missing background.

## Search with a bounded effort

1. Read [source access and reuse](artist-image-sources.md) for source access and license rules. Use structured
   metadata to screen dates, sizes and licenses before loading many previews. Run the
   Commons/Flickr queries and metadata screen from a scratchpad script (e.g. curl/jq
   against the APIs), not inline tool calls, so raw API responses never enter the
   conversation. Inspect a preview by downloading its thumbnail to a local file and
   viewing that.
2. On Commons, lead with a quoted phrase search of the exact name in the file
   namespace (`srsearch="Artist Name"`, `srnamespace=6`). Loose multi-word queries
   ("artist band live concert") tend to return nothing. On Flickr, a plain name search
   sorted by relevance works better than a narrow one; date-taken sort or
   `min_taken_date` helps for recent work. Watch for two kinds of false positive:
   same-name objects (geese, bleachers, cannons) and **festival photo sets** - a
   `Boardmasters 2022 (143 of 246)` style file indexes under every artist who played
   that festival, so results can be a different act entirely. Verify the actual
   subject in the preview; never trust the filename or album title.
3. Find the real Commons category, do not guess its name. `Category:<Artist>` alone
   often does not exist or is not what a guess would produce. If the artist has a
   Wikipedia article, take its lead/infobox image, open that file on Commons, and read
   the categories listed at the bottom: they give the canonical artist category and
   any per-show subcategories (e.g. "Kings of Leon - Silverstone 2024",
   "Palace - WBW16"), which are the best source of whole-band and recent frames.
   Traverse those actual categories rather than a constructed name.
4. Do not rank or filter candidates by pixel dimensions alone. A smaller file whose
   name carries a festival, tour, venue, "live", "concert" or year token, or one from
   a photographer who shoots live music (their other uploads are gig photos), is
   frequently the better lead and should be inspected ahead of a larger red-carpet,
   promo, or portrait-session frame. Screen dates, sizes and licenses from structured
   metadata, but let subject relevance, not size, decide what to preview first.
5. Start with a recent window, roughly the past three years. Broaden the dates when
   the initial results are poor; this is a search tactic, not an eligibility rule.
6. Inspect about three promising previews per artist first. If none works, try one
   expanded search and up to three more previews. Stop earlier for a convincing pick.
   These are effort defaults; a specific promising lead can justify a small extension.
7. Verify the selected file's source metadata: creator, source page, exact license,
   original image URL, dimensions and photograph date. Distinguish date taken from
   upload date. Do not treat search snippets or a site's footer license as proof.
   When the page's stated author and the file's embedded EXIF copyright name different
   people, treat rights as unresolved and do not use the file unless the two are
   confirmed to be the same person.
8. Return the best reusable candidate actually found, even if visually weak. Explain
   the specific weakness and let the user decide. Say "best found in this search,"
   not "only photo available" or "best on the internet." In the chat handoff lead with
   the source page URL (the Flickr photo page or Commons file page) and the original
   dimensions, not the direct image URL: the editor uses the source page to confirm
   the photo and pick the download size themselves.

Keep one row for every requested artist. When no candidate with supported reuse
permission was found, leave image fields blank and explain the source/access gap.
Do not present unclear rights as cleared merely to fill a row. When visual inspection
is unavailable, mark the candidate uninspected and avoid claims about its composition.

When an artist has no well-framed reusable photo (e.g. a catalogue that is all a
decade old, or only distant-stage shots), a strong atmospheric frame - a backlit
silhouette, a mood shot where the face is not readable - can be the right pick over a
literal but poorly composed one. Present it as a deliberate choice in `fit_notes`,
noting the face is not visible, and let the editor decide.

Reduce context use: retain raw API responses outside the conversation, expose only
shortlisted fields, reuse metadata within the run, and avoid dumping galleries or
full rosters. A thumbnail contact sheet can help when supported and allowed. Do not
load unrelated editorial, spreadsheet-layout, or browser instructions unless needed
by the task or required by the host agent. Use ordinary CSV tooling when permitted.

## CSV contract

Use UTF-8, a header, correctly quoted fields, and one row per artist. This is a
research handoff, not a database patch. Validate row count, unique slugs, URL fields,
and CSV round-trip. Preserve actual unknowns as empty cells.

Core columns:

`artist_slug, artist_name, candidate_image_url, image_source_url,
image_credit_author, image_license_url, license_name, image_title,
image_taken_year, original_width_px, original_height_px, researched_at,
image_focal_y_percent, review_status, fit_notes, reuse_requirements`

- `candidate_image_url`: original remote image, not an invented local asset path.
- `image_title`: source title preserved for attribution; not an existing artist-table
  field. Other research columns also must not be forwarded blindly to an edit CLI.
- `researched_at`: date checked, not an approval date or publication date. Set the
  application's image sourcing date later according to its authoring workflow.
- `review_status`: proposed, weak fallback, uninspected, or no verified candidate.
- `fit_notes`: one or two concrete sentences about subject placement and compromises.
  For a group, state whether the whole act is pictured and, if not, that a fuller
  frame was looked for.
- `reuse_requirements`: exact license obligations, including share-alike where relevant.
- Add `original_source_url` when a Commons file has a separate Flickr source.
- Add `local_original_path` only when downloading was authorized and succeeded.
- Omit festival edition, billing tier and repeated explanations of blank Y% unless
  specifically requested. Use the requested output directory; do not infer it from
  an unrelated festival or prior batch.

## Batch files and resuming work

Create a new CSV for each batch by default, named
`artist-images-YYYY-MM-DD-NN.csv` under `<output-root>/images/`. Choose an unused
sequence number; never overwrite an existing batch. Keep earlier CSVs, including
legacy proof-of-concept files, unchanged unless migration is explicitly requested.
The output root is chosen per task, not stored as a fixed convention in this skill.
Use this layout (create staging only when downloads are authorized):

```text
<output-root>/
  images/
    artist-images-YYYY-MM-DD-NN.csv
    staging/
      YYYY-MM-DD-NN/
        artist-slug.jpg
```

Keep roster-wide coverage tallies outside this sourcing workflow. On request, report
a fresh database snapshot in chat, counting distinct artists with and without stored
images. CSV candidates are pending proposals, not installed images; do not count them
as completed coverage. Do not maintain a separate tally file by default.

When explicitly resuming a batch, read its CSV first, preserve completed rows and
manual edits, and add only missing slugs. Do not add duplicate artist rows. Replace a
candidate only when requested. If its header differs from this contract, create a
new batch file and explain the mismatch rather than silently migrating it. Validate
the full result before replacing a resumed file, retaining a backup of its old content.
Appending to a shared master CSV is opt-in, not the default workflow.

Select one primary candidate per artist. If an unusually useful alternate is already
encountered in the bounded search, mention at most one per artist in the handoff with
its source page, verified license, and concrete tradeoff. Do not search further for
alternates, add alternate CSV rows, or download them unless requested.

## Optional download and later preparation

With download authorization, save just the selected original for each artist in an
`staging/YYYY-MM-DD-NN/` subdirectory beside the batch CSV, using unique slug-based
filenames with the correct extension. This staging folder holds source originals
pending review; it is not an app asset or publication directory. Never overwrite an
existing original. Check HTTP success,
image content type and decodability. Preserve the original and its attribution record.
Do not overwrite app assets or silently resize, recompress, crop or publish it.

After the user approves selections, asset preparation is a separate authorized step.
There is no build pipeline for this; do it explicitly and never test a raw multi-MB
camera original in the app. If a candidate replaces a file that already exists at the
same `public/` path, the Next dev image optimizer serves the stale bytes until `.next`
is fully removed (stop the dev server, `rm -rf .next`, restart) - a browser refresh,
incognito, or dev restart alone will not clear it. Prefer a new filename for a
replacement to avoid this entirely. Target: downscale so the long edge is ~3000px (leave a
smaller source alone), keep the aspect ratio, JPEG quality ~82-85 (expect roughly
400-900 KB), strip camera EXIF. Never crop. `next/image` generates the responsive
size ladder at request time, so a ~3000px stored asset serves smaller devices
correctly at no extra cost. Keep the untouched original alongside the optimized file.

**Review harness.** `ArtistHero` reads candidate files from `public/<dir>/<slug>.jpg`
instead of the database image when `NEXT_PUBLIC_ARTIST_IMAGE_TEST_DIR` is set (no
effect in production). Put the batch's optimized files in an untracked
`public/artist-review-<something>/` and point the env var at it. Use a **fresh
directory name each batch** so the dev image optimizer cannot serve a stale earlier
file. The editor tunes Y% by hand-editing the `objectPosition` line in `ArtistHero`
while looking at the page (0-100; the database rejects out-of-range values), records
the final number per artist, and reverts the edit. Delete the review dir and unset
the env var when done. Compare the optimized result visually, test Artist Detail
first, then check Explore and Quick Picks. Propose an edited crop only when ordinary
positioning is insufficient; retain license and modification notices.

End with the CSV location, selected artists, significant compromises, any inaccessible
source, and whether originals were saved. Do not call proposed photos approved.

## Invoking this workflow

Supply artist slugs (preferred) or unambiguous names and an output root. Five
artists is a useful default batch. New batch CSVs and no saved image files are the
defaults; the user does not need to repeat those instructions. For example:

> Use artist-image-sourcing for these five slugs: [slugs]. Output root: [folder path].

An absolute path means a full folder location, such as `/path/to/my-data`, not a CSV
filename. A user may instead provide `~/my-data` or an explicitly repo-relative path.
For downloads, add: "Download the selected originals." Any agent can follow this
document directly; agent-specific skill or rule entry points only route here.
