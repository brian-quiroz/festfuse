"""Download a preview thumbnail of a Commons file (or any direct image URL) to a local path.

Inspect candidates by viewing the downloaded file, so full-size originals and raw API
responses never enter the conversation.

  python -m scripts.sourcing.thumb --out /tmp/nt1.jpg --file "File:Night Tapes op het Valkhof Festival 2025 01.jpg"
  python -m scripts.sourcing.thumb --out /tmp/x.jpg --url https://live.staticflickr.com/.../orig.jpg
"""

from __future__ import annotations

import argparse

from scripts.sourcing._http import download, get_json

API = "https://commons.wikimedia.org/w/api.php"


def main() -> None:
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument("--out", required=True, help="local path to write")
    parser.add_argument("--file", help="Commons file title, e.g. 'File:Foo.jpg'")
    parser.add_argument("--url", help="direct image URL (Flickr, etc.)")
    parser.add_argument(
        "--width", type=int, default=1000, help="thumbnail width for --file"
    )
    args = parser.parse_args()

    if args.url:
        download(args.url, args.out)
        print(f"{args.out} <- {args.url}")
        return
    if not args.file:
        raise SystemExit("pass --file or --url")

    data = get_json(
        API,
        {
            "action": "query",
            "format": "json",
            "titles": args.file,
            "prop": "imageinfo",
            "iiprop": "url|size",
            "iiurlwidth": args.width,
        },
    )
    page = next(iter(data["query"]["pages"].values()))
    info = page["imageinfo"][0]
    download(info["thumburl"], args.out)
    print(
        f"{args.out}  {info['width']}x{info['height']} original -> {info['thumburl']}"
    )


if __name__ == "__main__":
    main()
