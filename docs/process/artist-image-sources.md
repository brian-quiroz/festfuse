# Source access and reuse

Use whichever HTTP, image-preview and filesystem tools the host agent provides.
No named vendor, browser plugin or model is required. An agent without image vision
can collect metadata but must label visual selection as uninspected.

## Wikimedia Commons

- Use the public MediaWiki Action API at `https://commons.wikimedia.org/w/api.php`.
  No API key is required for these public reads.
- Search file namespace 6 (`list=search`, `srnamespace=6`), or follow a known category
  (`list=categorymembers`). Do not assume category spellings; discover actual names.
- Batch final metadata with `prop=imageinfo`, `iiprop=url|size|extmetadata`, and a
  modest `iiurlwidth` for previews. Request only a small result page and handle API
  continuation when needed; an incomplete response is not evidence of no more photos.
- Keep `url`, `descriptionurl`, width/height and relevant `extmetadata` values:
  Artist, Credit, ObjectName, DateTimeOriginal, LicenseShortName and LicenseUrl.
  Strip HTML safely; preserve author attribution rather than the uploader's name.
- Check file-page warnings or license-review status when provenance is uncertain.
  A Commons copy of a Flickr image is not a separate Flickr search.

## Flickr

- Prefer the official API over automated page scraping. `flickr.photos.search`
  requires an application API key even for public searches; user authentication is
  not required for public-only results. Never expose the key in output or logs.
- The key lives in the repo-root `.env.local` as `FLICKR_API_KEY` (gitignored via
  `.env*`). Not `backend/.env` — the backend's `Settings` forbids unknown env vars and
  will not start with one present. Read it at run time via a shell call; do not accept
  it pasted into chat and do not echo it. Obtaining a key currently requires a Flickr
  Pro account.
- If no key is available, use available public search/browser capabilities for a
  bounded search. Report access limits; do not repeatedly attempt blocked pages.
- Search by artist and concert context, filter to suitable licenses, and use
  date-taken sorting or `min_taken_date` when helpful. Get current license ID mappings
  from `flickr.photos.licenses.getInfo`; do not rely on remembered numeric IDs.
- Request metadata extras such as license, owner_name, date_taken, o_dims and url_o.
  Use `flickr.photos.getInfo` / `flickr.photos.getSizes` as needed to verify the chosen
  photo. Never construct an original URL by guessing a thumbnail suffix or secret.
- Preserve the photo-page URL for attribution. API terms and photo copyright licenses
  are separate; follow both when using the API, including applicable caching/display
  requirements. Do not treat a CC license as permission to ignore service terms.

## Request discipline

Use sequential requests, a truthful descriptive User-Agent with a real contact
reference, and compact metadata batches. Default to at most one request every seven
seconds per service during this small manual workflow; this is a conservative local
budget, not a statement of the provider's limit. Reuse results within a run and honor
provider caching terms. Do not use permission prompts as a rate limiter.

Honor `Retry-After` on 429/503. Otherwise back off at least five seconds, increasing
the delay on retry. After two retries of a transient failure, report the limitation
and continue independent work. Do not retry authorization failures without resolving
their cause. Use `maxlag` for unattended Wikimedia jobs. Check current official limits
when implementing/changing a helper rather than baking numerical quotas into it.

## License checks

Prefer CC0/public-domain material and CC BY; accept CC BY-SA with its obligations
explicitly recorded. Exclude all-rights-reserved, noncommercial-only and no-derivatives
material from ordinary recommendations unless the user requests a separate rights
investigation. Unknown permission is not a reusable fallback.

CC BY 2.0/4.0 and CC BY-SA 4.0 permit adaptations. Preserve the supplied attribution,
source title where applicable, license link and required notices. Identify edits as
required by the exact license version. Distributing an adaptation under BY-SA carries
share-alike requirements for that adapted image; do not imply the whole website must
adopt its license. Do not guarantee absence of complaints or classify every display
crop as legally equivalent to an edited derivative. Keep originals and prefer ordinary
app positioning; check exact license and service terms before an edited crop trial.

Official references (checked 2026-09-05):

- https://www.mediawiki.org/wiki/API:Imageinfo
- https://www.mediawiki.org/wiki/API:Etiquette
- https://www.mediawiki.org/wiki/Wikimedia_APIs/Rate_limits
- https://www.flickr.com/services/api/flickr.photos.search.html
- https://www.flickr.com/services/developer/api/
- https://creativecommons.org/licenses/by/2.0/
- https://creativecommons.org/licenses/by/4.0/
- https://creativecommons.org/licenses/by-sa/4.0/
