#!/usr/bin/env python3
"""Fill in `coverImage` and `previewImages` from the `gallery/` folder.

The `gallery/` folder is the source of truth for both the file names and
the extensions — a set's images are `cover.<ext>` plus the numbered
files `001.<ext>`, `002.<ext>`, ...

For each collection in `data/collections.json` the matching set is found
by the trailing number in the collection's slug, and the image URLs are
built from the files that are actually on disk. Every numbered image in
the set is listed in `previewImages` — the count matches the number of
images in the folder. Every other field in the data file is left exactly
as it is.

Run with `--check` to preview without writing.
"""

from __future__ import annotations

import argparse
import json
import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
GALLERY_DIR = ROOT / "gallery"
DATA_FILE = ROOT / "data" / "collections.json"

DEFAULT_ORIGIN = "https://image.galleryhello.com"

# The gallery folder each category's images live in.
CATEGORY_SOURCE_FOLDERS = {
    "ai-portraits": "ai-portraits",
    "jk-fashion": "jk-fashion",
    "office-lady": "office-lady",
    "qipao": "qipao",
    "sweet-sultry": "sweet-allure",
}

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".avif"}


def set_id_of(slug: str) -> str:
    """The trailing number of a slug, e.g. `15335`."""
    match = re.search(r"(\d+)$", slug)

    if not match:
        raise SystemExit(f"Collection slug has no trailing id: {slug}")

    return match.group(1)


def find_set(folder: str, set_id: str) -> Path:
    """The gallery folder holding a set's images."""
    path = GALLERY_DIR / folder / set_id

    if not path.is_dir():
        raise SystemExit(f"Gallery folder not found: {path}")

    return path


def images_in(folder: Path) -> dict[str, list[Path]]:
    """The cover and the numbered images in a set, grouped by extension."""
    cover: list[Path] = []
    numbered: dict[str, list[Path]] = {}

    for path in sorted(folder.iterdir()):
        if not path.is_file() or path.name.startswith("."):
            continue

        suffix = path.suffix.lower()

        if suffix not in IMAGE_EXTENSIONS:
            continue

        if path.stem.lower() == "cover":
            cover.append(path)
            continue

        digits = re.match(r"^(\d+)$", path.stem)

        if digits:
            numbered.setdefault(suffix, []).append((int(digits.group(1)), path))

    ordered = {
        suffix: [path for _, path in sorted(entries, key=lambda e: e[0])]
        for suffix, entries in numbered.items()
    }

    return {"cover": cover, "numbered": ordered}


def build_origin() -> str:
    """The image origin, honouring the environment variable."""
    raw = os.environ.get("NEXT_PUBLIC_IMAGE_CDN_URL", DEFAULT_ORIGIN)

    return raw.rstrip("/")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--check",
        action="store_true",
        help="Print the plan without writing the data file.",
    )
    args = parser.parse_args()

    origin = build_origin()
    collections = json.loads(DATA_FILE.read_text(encoding="utf-8"))

    for collection in collections:
        slug = collection["slug"]
        category = collection["category"]
        folder = CATEGORY_SOURCE_FOLDERS.get(category)

        if not folder:
            raise SystemExit(
                f"No image folder mapped for category {category!r} ({slug})"
            )

        set_dir = find_set(folder, set_id_of(slug))
        found = images_in(set_dir)

        if not found["cover"]:
            raise SystemExit(f"No cover image in {set_dir}")

        # The cover's extension is the set's extension — the numbered
        # images are expected to match it.
        cover_ext = found["cover"][0].suffix.lower()
        numbered = found["numbered"].get(cover_ext, [])

        if not numbered:
            raise SystemExit(
                f"No numbered {cover_ext} images in {set_dir} "
                f"(found: {', '.join(found['numbered']) or 'none'})"
            )

        collection["coverImage"] = f"{origin}/{folder}/{set_id_of(slug)}/cover{cover_ext}"
        collection["previewImages"] = [
            f"{origin}/{folder}/{set_id_of(slug)}/{path.name}" for path in numbered
        ]

        print(f"{slug}  ({set_dir.relative_to(ROOT)})")
        print(f"  cover   {collection['coverImage']}")
        print(f"  {len(collection['previewImages'])} preview images")

    if args.check:
        print("\nDry run — nothing was written.")
        return

    DATA_FILE.write_text(
        json.dumps(collections, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )

    print(f"\nWrote {DATA_FILE}")


if __name__ == "__main__":
    main()
