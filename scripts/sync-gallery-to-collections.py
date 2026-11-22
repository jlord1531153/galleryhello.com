#!/usr/bin/env python3
"""Map the `gallery/` folder structure onto `data/collections.json`.

Each leaf folder under `gallery/<category>/<set>/` becomes one collection:
the first image becomes the cover, the next three become the public
preview images, and the remainder are counted for the locked section.

The script writes two things:

* `public/collections/<slug>/` — the images, copied into the layout the
  site expects (`cover.jpg`, `preview-1..3.jpg`, `locked-1..3.jpg`).
* `data/collections.json` — one entry per leaf folder, with the title and
  description filled in from a metadata map.

Run it with `--check` to preview the plan without touching any file.
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
GALLERY_DIR = ROOT / "gallery"
PUBLIC_DIR = ROOT / "public" / "collections"
DATA_FILE = ROOT / "data" / "collections.json"
CATEGORY_FILE = ROOT / "data" / "category.json"
CATEGORY_FILE = ROOT / "data" / "category.json"

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".avif"}

PREVIEW_COUNT = 3
LOCKED_COUNT = 3

# The published images are centre-cropped to 3:4 and scaled to this width.
MAX_WIDTH = 900

# Which sets are surfaced in the homepage Featured section.
FEATURED = {
    "ai-portraits-0137",
    "ai-portraits-084",
    "office-lady-15334",
    "qipao-13813",
    "sweet-allure-16302",
    "jk-fashion-13629",
}

# The category slug used in `data/collections.json` for each gallery
# folder. `sweet-allure` maps onto the `sweet-sultry` category.
CATEGORY_BY_FOLDER = {
    "ai-portraits": "ai-portraits",
    "jk-fashion": "jk-fashion",
    "office-lady": "office-lady",
    "qipao": "qipao",
    "sweet-allure": "sweet-sultry",
}

# Human-readable title for each gallery set, keyed by "<folder>/<set>".
TITLES = {
    "ai-portraits/0137": "Portrait Study 0137",
    "ai-portraits/0175": "Portrait Study 0175",
    "ai-portraits/0181": "Portrait Study 0181",
    "ai-portraits/084": "Portrait Study 084",
    "jk-fashion/13629": "JK Fashion 13629",
    "jk-fashion/15929": "JK Fashion 15929",
    "office-lady/15334": "Office Lady 15334",
    "office-lady/15335": "Office Lady 15335",
    "office-lady/15356": "Office Lady 15356",
    "qipao/13813": "Qipao Beauty 13813",
    "qipao/8155": "Qipao Beauty 8155",
    "sweet-allure/16264": "Sweet & Sultry 16264",
    "sweet-allure/16302": "Sweet & Sultry 16302",
}

DESCRIPTIONS = {
    "ai-portraits": (
        "A curated set of AI-generated portraits celebrating beauty, "
        "personality and realistic photography."
    ),
    "jk-fashion": (
        "Japanese school-uniform-inspired fashion portraits featuring adult "
        "models, classic pleated skirts and youthful street-style aesthetics."
    ),
    "office-lady": (
        "Sophisticated office-inspired portraits in elegant workwear and "
        "tailored suits, with confident professional styling."
    ),
    "qipao": (
        "Elegant AI portraits featuring traditional Chinese qipao dresses, "
        "refined silhouettes and timeless Eastern-inspired aesthetics."
    ),
    "sweet-allure": (
        "Soft, sweet and subtly seductive portraiture, blending innocent "
        "charm with captivating elegance."
    ),
}


def numeric_sort_key(path: Path) -> tuple:
    """Sort `002.jpg` before `010.jpg` rather than lexicographically."""
    stem = path.stem
    digits = re.match(r"^(\d+)", stem)

    if digits:
        return (0, int(digits.group(1)), stem)

    return (1, 0, stem)


def find_leaves() -> list[tuple[str, str, list[Path]]]:
    """Return every folder under `gallery/` that directly holds images."""
    leaves = []

    for category_dir in sorted(GALLERY_DIR.iterdir()):
        if not category_dir.is_dir():
            continue

        for set_dir in sorted(category_dir.iterdir()):
            if not set_dir.is_dir():
                continue

            images = sorted(
                (
                    path
                    for path in set_dir.iterdir()
                    if path.is_file()
                    and path.suffix.lower() in IMAGE_EXTENSIONS
                    and not path.name.startswith(".")
                ),
                key=numeric_sort_key,
            )

            if images:
                leaves.append((category_dir.name, set_dir.name, images))

    return leaves


def slugify(folder: str, set_name: str) -> str:
    """`gallery/office-lady/15334` becomes `office-lady-15334`."""
    parts = [folder, set_name]

    return "-".join(
        re.sub(r"[^a-z0-9]+", "-", part.lower()).strip("-") for part in parts
    )


def build_plan() -> list[dict]:
    """Describe the collections without touching the filesystem."""
    plan = []

    for folder, set_name, images in find_leaves():
        key = f"{folder}/{set_name}"
        slug = slugify(folder, set_name)
        plan.append(
            {
                "key": key,
                "slug": slug,
                "title": TITLES.get(key, set_name),
                "description": DESCRIPTIONS.get(folder, ""),
                "category": CATEGORY_BY_FOLDER.get(folder, folder),
                "totalPhotos": len(images),
                "images": images,
            }
        )

    return plan


def create_placeholder(target: Path) -> None:
    """Write a neutral 3:4 placeholder for a missing source image."""
    from PIL import Image

    image = Image.new("RGB", (MAX_WIDTH, round(MAX_WIDTH * 4 / 3)), "#1b1b22")
    image.save(target, "JPEG", quality=82, optimize=True)


def publish(entry: dict) -> None:
    """Copy the images into `public/collections/<slug>/`.

    Images are resized to exactly 3:4 and re-encoded, because the source
    photographs vary slightly in aspect ratio and are far larger than the
    site needs.
    """
    target = PUBLIC_DIR / entry["slug"]

    if target.exists():
        shutil.rmtree(target)

    target.mkdir(parents=True)

    images = entry["images"]

    write_image(images[0], target / "cover.jpg")

    for index in range(PREVIEW_COUNT):
        source = images[min(index + 1, len(images) - 1)]
        write_image(source, target / f"preview-{index + 1}.jpg")

    # The locked section shows three placeholders. Reuse later images when
    # the set is large enough; otherwise reuse the last image so the file
    # always exists.
    locked_sources = images[PREVIEW_COUNT + 1 : PREVIEW_COUNT + 1 + LOCKED_COUNT]

    if not locked_sources:
        locked_sources = images[-1:]

    for index in range(LOCKED_COUNT):
        source = locked_sources[index % len(locked_sources)]
        write_image(source, target / f"locked-{index + 1}.jpg")


def write_image(source: Path, target: Path) -> None:
    """Write the source as a 3:4 JPEG of at most `MAX_WIDTH` pixels wide.

    A source that has disappeared since the plan was built — for example
    while images are still being uploaded — is skipped rather than
    aborting the whole run.
    """
    from PIL import Image

    try:
        with Image.open(source) as image:
            image = image.convert("RGB")

            # Centre-crop to exactly 3:4, then scale down.
            width, height = image.size
            target_ratio = 3 / 4
            source_ratio = width / height

            if source_ratio > target_ratio:
                # Too wide — trim the sides.
                new_width = int(height * target_ratio)
                left = (width - new_width) // 2
                image = image.crop((left, 0, left + new_width, height))
            elif source_ratio < target_ratio:
                # Too tall — trim the top and bottom.
                new_height = int(width / target_ratio)
                top = (height - new_height) // 2
                image = image.crop((0, top, width, top + new_height))

            if image.width > MAX_WIDTH:
                new_height = round(image.height * MAX_WIDTH / image.width)
                image = image.resize((MAX_WIDTH, new_height), Image.LANCZOS)

            image.save(target, "JPEG", quality=86, optimize=True, progressive=True)
    except FileNotFoundError:
        # The source vanished mid-run. Fall back to a placeholder so the
        # published set stays complete.
        create_placeholder(target)


def remove_stale(plan: list[dict]) -> list[str]:
    """Delete published folders that no longer have a source set."""
    keep = {entry["slug"] for entry in plan}
    removed = []

    if not PUBLIC_DIR.is_dir():
        return removed

    for folder in sorted(PUBLIC_DIR.iterdir()):
        if folder.is_dir() and folder.name not in keep:
            shutil.rmtree(folder)
            removed.append(folder.name)

    return removed


def validate(plan: list[dict]) -> None:
    """Check that every collection points at a known category.

    The two data files stay separate, so a typo in a category slug would
    otherwise only show up as a silently empty filter.
    """
    known = {
        category["slug"] for category in json.loads(CATEGORY_FILE.read_text())
    }

    unknown = {
        entry["category"] for entry in plan if entry["category"] not in known
    }

    if unknown:
        raise SystemExit(
            "Unknown category slug(s): "
            + ", ".join(sorted(unknown))
            + f"\nKnown categories: {', '.join(sorted(known))}"
        )

    slugs = [entry["slug"] for entry in plan]
    duplicates = {slug for slug in slugs if slugs.count(slug) > 1}

    if duplicates:
        raise SystemExit(
            "Duplicate collection slug(s): " + ", ".join(sorted(duplicates))
        )


def write_collections(plan: list[dict]) -> None:
    """Write `data/collections.json` from the plan."""
    today = date.today().isoformat()
    existing = {
        entry["slug"]: entry for entry in json.loads(DATA_FILE.read_text())
    }

    collections = []

    for entry in plan:
        previous = existing.get(entry["slug"], {})

        collections.append(
            {
                "slug": entry["slug"],
                "title": entry["title"],
                "description": entry["description"],
                "category": entry["category"],
                "coverImage": f"/collections/{entry['slug']}/cover.jpg",
                "previewImages": [
                    f"/collections/{entry['slug']}/preview-{index + 1}.jpg"
                    for index in range(PREVIEW_COUNT)
                ],
                "totalPhotos": entry["totalPhotos"],
                "publishedAt": previous.get("publishedAt", today),
                **(
                    {"featured": True, "tag": "Featured"}
                    if entry["slug"] in FEATURED
                    else {"tag": previous.get("tag", "Preview")}
                ),
            }
        )

    DATA_FILE.write_text(
        json.dumps(collections, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--check",
        action="store_true",
        help="Print the plan without copying images or writing data files.",
    )
    parser.add_argument(
        "--min-images",
        type=int,
        default=4,
        help=(
            "Skip folders holding fewer images than this. A set needs at "
            "least one cover plus three previews, so the default of 4 "
            "skips folders that are still being uploaded."
        ),
    )
    args = parser.parse_args()

    if not GALLERY_DIR.is_dir():
        raise SystemExit(f"Gallery directory not found: {GALLERY_DIR}")

    all_sets = build_plan()
    plan = [
        entry for entry in all_sets if entry["totalPhotos"] >= args.min_images
    ]

    skipped = [
        entry for entry in all_sets if entry["totalPhotos"] < args.min_images
    ]

    print(f"{'slug':32} {'category':14} {'photos':>6}  title")
    for entry in plan:
        print(
            f"{entry['slug']:32} {entry['category']:14} "
            f"{entry['totalPhotos']:>6}  {entry['title']}"
        )

    print(f"\n{len(plan)} collections, {sum(e['totalPhotos'] for e in plan)} images.")

    for entry in skipped:
        print(
            f"  skipping {entry['key']}: only {entry['totalPhotos']} images "
            f"(needs {args.min_images})"
        )

    validate(plan)

    if args.check:
        print("\nDry run — nothing was written.")
        return

    for entry in plan:
        publish(entry)

    removed = remove_stale(plan)
    write_collections(plan)

    if removed:
        print(f"\nRemoved {len(removed)} stale folders: {', '.join(removed)}")

    print(f"\nPublished images to {PUBLIC_DIR}")
    print(f"Wrote {DATA_FILE}")


if __name__ == "__main__":
    main()
