"""Resolve an artist's Wikipedia article to its infobox image and that file's Commons categories.

The reliable way to find the real Commons category (never guess ``Category:<Name>``):
the English Wikipedia article's infobox image almost always lives in the canonical
artist category and its per-show subcategories. Feed the printed categories into
``commons.py --category``.

  python -m scripts.sourcing.wikipedia --title "Palace (band)"
  python -m scripts.sourcing.wikipedia --title "Skye Newman"
"""

from __future__ import annotations

import argparse

from scripts.sourcing._http import get_json

EN_WIKI = "https://en.wikipedia.org/w/api.php"
COMMONS = "https://commons.wikimedia.org/w/api.php"


def main() -> None:
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument(
        "--title",
        required=True,
        help="Wikipedia article title (try a search first if unsure)",
    )
    args = parser.parse_args()

    data = get_json(
        EN_WIKI,
        {
            "action": "query",
            "format": "json",
            "titles": args.title,
            "prop": "pageimages",
            "piprop": "name",
            "redirects": 1,
        },
    )
    for page in data.get("query", {}).get("pages", {}).values():
        if "missing" in page:
            print(f"NO ARTICLE for {args.title!r}")
            continue
        print(f"ARTICLE: {page['title']}")
        image = page.get("pageimage")
        if not image:
            print("  (no infobox image)")
            continue
        print(f"  infobox file: File:{image}")
        cats = get_json(
            COMMONS,
            {
                "action": "query",
                "format": "json",
                "titles": f"File:{image}",
                "prop": "categories",
                "cllimit": 50,
            },
        )
        for cat_page in cats.get("query", {}).get("pages", {}).values():
            for cat in cat_page.get("categories", []):
                print(f"    {cat['title']}")


if __name__ == "__main__":
    main()
