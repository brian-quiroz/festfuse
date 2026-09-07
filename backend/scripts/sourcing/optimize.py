"""Optimize a sourced original into a web-ready JPEG for ``public/artists/global/``.

Applies the EXIF orientation flag (iPhone shots carry one), downscales the long edge
to ``--max-edge`` px with LANCZOS, strips all metadata by copying pixels into a fresh
image, and writes a progressive, optimized JPEG. Never crops. Bump ``--quality`` for
dark or gradient-heavy frames to avoid banding.

  python -m scripts.sourcing.optimize --in ~/orig/nb_loken3.jpg --out public/artists/global/sienna-spiro.jpg
  python -m scripts.sourcing.optimize --in dark.jpg --out out.jpg --quality 92
"""

from __future__ import annotations

import argparse
import os

from PIL import Image, ImageOps


def main() -> None:
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument("--in", dest="src", required=True)
    parser.add_argument("--out", dest="dest", required=True)
    parser.add_argument("--max-edge", type=int, default=3000)
    parser.add_argument(
        "--quality",
        type=int,
        default=82,
        help="JPEG quality (raise to ~92 for dark/gradient frames)",
    )
    args = parser.parse_args()

    with Image.open(args.src) as img:
        img = ImageOps.exif_transpose(img)
        img = img.convert("RGB")
        long_edge = max(img.size)
        if long_edge > args.max_edge:
            scale = args.max_edge / long_edge
            img = img.resize(
                (round(img.width * scale), round(img.height * scale)), Image.LANCZOS
            )
        # Paste pixels into a fresh image so no source metadata survives the save.
        clean = Image.new("RGB", img.size)
        clean.paste(img)

    clean.save(args.dest, "JPEG", quality=args.quality, optimize=True, progressive=True)
    kb = os.path.getsize(args.dest) / 1024
    print(f"{args.dest}  {clean.width}x{clean.height}  {kb:.0f} KB  q{args.quality}")


if __name__ == "__main__":
    main()
