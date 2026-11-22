#!/usr/bin/env python3
"""Rename every image under `gallery/` to a zero-padded sequence.

Each leaf folder (the ones that actually contain the images) is numbered
independently, starting at `001` and keeping the original file extension.

The script renames in two passes so that names never collide: images are
first moved to a temporary prefix, then to their final name.
"""

from __future__ import annotations

import os
from pathlib import Path

GALLERY_DIR = Path(__file__).resolve().parent.parent / "gallery"
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"}
TEMP_PREFIX = ".__renaming_tmp__"


def collect_leaves(root: Path) -> list[Path]:
    """Return the folders that directly contain images."""
    leaves: list[Path] = []

    for dirpath, dirnames, filenames in os.walk(root):
        current = Path(dirpath)
        has_image = any(
            Path(filename).suffix.lower() in IMAGE_EXTENSIONS
            for filename in filenames
        )

        if has_image:
            leaves.append(current)
            # Do not descend into a folder that already holds images.
            dirnames[:] = []

    return sorted(leaves)


def images_in(folder: Path) -> list[Path]:
    """Images in the folder, sorted naturally by their current name."""
    return sorted(
        (
            path
            for path in folder.iterdir()
            if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS
        ),
        key=lambda path: path.name,
    )


def rename_folder(folder: Path) -> int:
    """Rename the images in one folder. Returns the number of images."""
    images = images_in(folder)

    if not images:
        return 0

    # Pass one — move to temporary names so the final names never clash
    # with images that have not been renamed yet.
    staged: list[tuple[Path, Path]] = []

    for index, image in enumerate(images):
        temp_name = f"{TEMP_PREFIX}{index:04d}{image.suffix.lower()}"
        temp_path = folder / temp_name
        image.rename(temp_path)
        staged.append((temp_path, folder / f"{index + 1:03d}{image.suffix.lower()}"))

    # Pass two — move to the final names.
    for temp_path, final_path in staged:
        temp_path.rename(final_path)

    return len(images)


def main() -> None:
    if not GALLERY_DIR.is_dir():
        raise SystemExit(f"Gallery directory not found: {GALLERY_DIR}")

    leaves = collect_leaves(GALLERY_DIR)
    total = 0

    for folder in leaves:
        count = rename_folder(folder)
        total += count
        print(f"{folder.relative_to(GALLERY_DIR)}: {count} images")

    print(f"\nRenamed {total} images across {len(leaves)} folders.")


if __name__ == "__main__":
    main()
