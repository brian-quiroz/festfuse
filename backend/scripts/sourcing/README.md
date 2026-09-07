# Artist photo sourcing scripts

Working API wrappers for the reuse-licensed photo search in
[`docs/process/artist-image-sourcing.md`](../../../docs/process/artist-image-sourcing.md)
(policy: ADR-0019). They exist so the Commons/Flickr query and metadata screen runs as
a script, keeping raw API JSON out of the conversation. Extend them as the process
needs; none of this is a canonical interface, and inventing a different tool for a
given search is fine.

Run from `backend/` with the venv active:

```
python -m scripts.sourcing.wikipedia --title "Palace (band)"
python -m scripts.sourcing.commons  --name "Palace" --category "Category:Palace - WBW16"
python -m scripts.sourcing.flickr   --text "Rodrigo y Gabriela red rocks"
python -m scripts.sourcing.thumb    --out /tmp/p.jpg --file "File:WBW16 - Palace - 4.jpg"
python -m scripts.sourcing.optimize --in /tmp/orig.jpg --out ../public/artists/global/palace.jpg
```

## The digest pattern

Each search script prints one tab-separated line per candidate
(`WxH  license  author  date  title  page  [url]`), largest first. Screen those lines
for license and relevance, pull a thumbnail for the few that look right with `thumb.py`,
view the thumbnail, then optimize the chosen original with `optimize.py`.

## Files

| script | purpose |
| --- | --- |
| `wikipedia.py` | article -> infobox image -> that file's real Commons categories (never guess `Category:<Name>`) |
| `commons.py` | quoted-name file-namespace search + optional category traversal, screened through `imageinfo` |
| `flickr.py` | reuse-licensed Flickr search; needs `FLICKR_API_KEY` in the repo-root `.env.local` |
| `thumb.py` | download one preview thumbnail (Commons file or direct URL) |
| `optimize.py` | EXIF-rotate, downscale long edge, strip metadata, progressive JPEG; never crops |
| `_http.py` | shared GET: User-Agent, JSON parse, 429/503 backoff |

## Notes

- `commons.py` quotes only the name. Extra terms go in `--extra` unquoted; a quoted
  `"Name band"` phrase matches almost nothing.
- Both APIs rate-limit bulk runs; `_http.py` retries 429/503 with backoff.
- `optimize.py` needs Pillow (in `requirements-dev.txt`).
