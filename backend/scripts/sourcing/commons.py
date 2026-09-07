"""Search Wikimedia Commons for reuse-licensed artist photos and print a digest.

Runs a quoted-phrase file-namespace search of the exact name, optionally traverses
a Commons category, then screens every hit through ``imageinfo`` and prints one line
per bitmap: ``WxH <license> <author> <title> <file page>``, largest first.

Only the name is quoted as a phrase. Extra ``--extra`` terms are appended unquoted
(a quoted ``"Name band"`` phrase matches almost nothing). Pass ``--category`` with
the real category from ``wikipedia.py``; do not let it default to a guessed name.

  python -m scripts.sourcing.commons --name "Night Tapes"
  python -m scripts.sourcing.commons --name "Palace" --category "Category:Palace - WBW16"
  python -m scripts.sourcing.commons --name "Kings of Leon" --extra festival live
"""

from __future__ import annotations

import argparse
import re

from scripts.sourcing._http import get_json

API = "https://commons.wikimedia.org/w/api.php"
_IMG_EXT = (".jpg", ".jpeg", ".png")


def search(term: str, limit: int = 40) -> list[str]:
    data = get_json(
        API,
        {
            "action": "query",
            "format": "json",
            "list": "search",
            "srsearch": term,
            "srnamespace": 6,
            "srlimit": limit,
        },
    )
    return [hit["title"] for hit in data.get("query", {}).get("search", [])]


def category_members(
    category: str, depth: int = 2, _seen: set[str] | None = None
) -> list[str]:
    if _seen is None:
        _seen = set()
    if category in _seen:
        return []
    _seen.add(category)
    data = get_json(
        API,
        {
            "action": "query",
            "format": "json",
            "list": "categorymembers",
            "cmtitle": category,
            "cmlimit": 500,
            "cmtype": "file|subcat",
        },
    )
    files, subcats = [], []
    for member in data.get("query", {}).get("categorymembers", []):
        (subcats if member["title"].startswith("Category:") else files).append(
            member["title"]
        )
    if depth > 0:
        for subcat in subcats:
            files += category_members(subcat, depth - 1, _seen)
    return files


def image_info(titles: list[str]) -> dict[str, dict]:
    out: dict[str, dict] = {}
    for i in range(0, len(titles), 40):
        chunk = titles[i : i + 40]
        data = get_json(
            API,
            {
                "action": "query",
                "format": "json",
                "titles": "|".join(chunk),
                "prop": "imageinfo",
                "iiprop": "url|size|extmetadata|mediatype",
                "iiurlwidth": 400,
            },
        )
        for page in data.get("query", {}).get("pages", {}).values():
            info_list = page.get("imageinfo")
            if not info_list:
                continue
            info = info_list[0]
            meta = info.get("extmetadata", {})
            out[page["title"]] = {
                "w": info.get("width") or 0,
                "h": info.get("height") or 0,
                "mediatype": info.get("mediatype"),
                "license": meta.get("LicenseShortName", {}).get("value", ""),
                "author": re.sub(
                    "<[^>]+>", "", meta.get("Artist", {}).get("value", "")
                )[:60],
                "date": meta.get("DateTimeOriginal", {}).get("value", "")[:10],
                "page": info.get("descriptionurl", ""),
            }
    return out


def main() -> None:
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument(
        "--name", required=True, help="exact artist name, quoted as a phrase"
    )
    parser.add_argument(
        "--extra",
        nargs="*",
        default=[],
        help="extra relevance terms, appended unquoted",
    )
    parser.add_argument(
        "--category", help="real Commons category (from wikipedia.py); not guessed"
    )
    parser.add_argument("--limit", type=int, default=40)
    args = parser.parse_args()

    query = f'"{args.name}"'
    if args.extra:
        query += " " + " ".join(args.extra)
    titles = set(search(query, args.limit)) | set(search(f'"{args.name}"', args.limit))

    if args.category:
        try:
            titles |= set(category_members(args.category))
        except Exception as err:  # noqa: BLE001 - category traversal is best-effort
            print(f"category error: {err}")

    titles = [t for t in titles if t.lower().endswith(_IMG_EXT)]
    rows = [
        (data["w"], data["h"], title, data)
        for title, data in image_info(titles).items()
        if data["mediatype"] == "BITMAP"
    ]
    rows.sort(key=lambda r: max(r[0], r[1]), reverse=True)
    for w, h, title, data in rows:
        print(
            f"{w}x{h}\t{data['license']}\t{data['author']}\t{data['date']}\t{title}\t{data['page']}"
        )


if __name__ == "__main__":
    main()
