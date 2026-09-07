"""Search Flickr for reuse-licensed artist photos and print a digest.

Requires ``FLICKR_API_KEY`` in the repo-root ``.env.local`` (not ``backend/.env``,
which forbids extra keys). Searches CC BY / CC BY-SA / CC0 / public-domain / no-known-
copyright licenses only, relevance-sorted, and prints one line per photo largest first:
``WxH <license> <owner> <date> <title> <photo page> <original url>``.

  python -m scripts.sourcing.flickr --text "Rodrigo y Gabriela red rocks"
  python -m scripts.sourcing.flickr --text "The War on Drugs" --min-year 2022
"""

from __future__ import annotations

import argparse
import os
from pathlib import Path

from scripts.sourcing._http import get_json

REST = "https://www.flickr.com/services/rest/"
# Flickr license ids: reuse-permitted only (BY, BY-SA, no-known-copyright, CC0, PDM).
LICENSES = "4,5,7,9,10"
LICENSE_NAMES = {
    "4": "CC BY 2.0",
    "5": "CC BY-SA 2.0",
    "7": "No known copyright",
    "9": "CC0",
    "10": "Public Domain Mark",
}


def _api_key() -> str:
    env = Path(__file__).resolve().parents[3] / ".env.local"
    if env.exists():
        for line in env.read_text().splitlines():
            if line.startswith("FLICKR_API_KEY="):
                return line.split("=", 1)[1].strip()
    key = os.environ.get("FLICKR_API_KEY")
    if key:
        return key
    raise SystemExit("FLICKR_API_KEY not found in repo-root .env.local or environment")


def main() -> None:
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument(
        "--text", required=True, help="free-text search (plain name works best)"
    )
    parser.add_argument(
        "--min-year", type=int, help="only photos taken in or after this year"
    )
    parser.add_argument("--limit", type=int, default=15)
    args = parser.parse_args()

    params = {
        "method": "flickr.photos.search",
        "api_key": _api_key(),
        "format": "json",
        "nojsoncallback": 1,
        "text": args.text,
        "license": LICENSES,
        "sort": "relevance",
        "per_page": 40,
        "extras": "license,o_dims,date_taken,owner_name,url_o,url_l",
    }
    if args.min_year:
        params["min_taken_date"] = f"{args.min_year}-01-01 00:00:00"

    photos = get_json(REST, params).get("photos", {}).get("photo", [])
    rows = []
    for photo in photos:
        w = int(photo.get("width_o") or photo.get("width_l") or 0)
        h = int(photo.get("height_o") or photo.get("height_l") or 0)
        rows.append((max(w, h), w, h, photo))
    rows.sort(reverse=True, key=lambda r: r[0])
    for _, w, h, photo in rows[: args.limit]:
        page = f"https://www.flickr.com/photos/{photo['owner']}/{photo['id']}"
        license_name = LICENSE_NAMES.get(photo["license"], photo["license"])
        print(
            f"{w}x{h}\t{license_name}\t{photo.get('ownername', '')}\t"
            f"{photo.get('datetaken', '')[:10]}\t{photo['title'][:50]}\t{page}\t{photo.get('url_o', '')}"
        )


if __name__ == "__main__":
    main()
