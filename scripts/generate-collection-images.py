#!/usr/bin/env python3
"""
One-off generator for GalleryHello placeholder collection imagery.

Produces, for every collection in data/collections.json:
    public/collections/<slug>/cover.jpg       3:4 cover
    public/collections/<slug>/preview-N.jpg    3:4 public preview images
    public/collections/<slug>/locked-N.jpg     3:4 locked-section placeholders

The output is committed to the repository — this script is NOT part of the
runtime or the build. Re-running it overwrites the existing images.

Each collection gets a deterministic colour palette derived from its slug,
so the imagery is reproducible and visually distinguishable without
shipping third-party photographs.
"""

import json
import math
import os
import random
import re

from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_FILE = os.path.join(ROOT, "data", "collections.json")
OUT_ROOT = os.path.join(ROOT, "public", "collections")

WIDTH = 900
HEIGHT = 1200


def slug_seed(slug: str) -> int:
    return int(re.sub(r"\D", "", str(sum(ord(c) for c in slug))) or 1)


def clamp(value: float) -> int:
    return max(0, min(255, int(value)))


def palette(slug: str, index: int) -> tuple[tuple[int, int, int], ...]:
    """Build a 4-stop palette from the slug hash, offset per image index."""
    rng = random.Random(slug_seed(slug) * 1000 + index)
    base_hue = rng.random()

    def hsv(h: float, s: float, v: float) -> tuple[int, int, int]:
        i = int(h * 6.0) % 6
        f = h * 6.0 - int(h * 6.0)
        p = v * (1.0 - s)
        q = v * (1.0 - s * f)
        t = v * (1.0 - s * (1.0 - f))
        r, g, b = [
            (v, t, p),
            (q, v, p),
            (p, v, t),
            (p, q, v),
            (t, p, v),
            (v, p, q),
        ][i]
        return (clamp(r * 255), clamp(g * 255), clamp(b * 255))

    stops = []
    for i in range(4):
        hue = (base_hue + i * 0.055 + rng.uniform(-0.03, 0.03)) % 1.0
        sat = rng.uniform(0.18, 0.52)
        val = 0.16 + i * 0.13 + rng.uniform(-0.04, 0.04)
        stops.append(hsv(hue, sat, val))
    return tuple(stops)


def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def gradient_image(stops: tuple[tuple[int, int, int], ...], angle: float) -> Image.Image:
    """Diagonal multi-stop gradient."""
    base = Image.new("RGB", (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(base)
    dx = math.cos(angle)
    dy = math.sin(angle)
    span = abs(dx) * WIDTH + abs(dy) * HEIGHT

    # Render a coarse grid then upscale — fast and visually smooth.
    step = 8
    small = Image.new("RGB", (WIDTH // step + 2, HEIGHT // step + 2))
    sdraw = ImageDraw.Draw(small)
    sw, sh = small.size

    for y in range(sh):
        for x in range(sw):
            px = x * step
            py = y * step
            proj = (px * dx + py * dy) / span
            proj = min(1.0, max(0.0, proj + 0.5))
            pos = proj * (len(stops) - 1)
            i = min(int(pos), len(stops) - 2)
            t = pos - i
            c1, c2 = stops[i], stops[i + 1]
            sdraw.point(
                (x, y),
                (
                    clamp(lerp(c1[0], c2[0], t)),
                    clamp(lerp(c1[1], c2[1], t)),
                    clamp(lerp(c1[2], c2[2], t)),
                ),
            )
    return small.resize((WIDTH, HEIGHT), Image.BICUBIC)


def add_vignette(img: Image.Image, strength: float = 0.55) -> Image.Image:
    """Darken the edges so overlaid text stays legible."""
    mask = Image.new("L", (WIDTH, HEIGHT), 0)
    draw = ImageDraw.Draw(mask)
    cx, cy = WIDTH / 2, HEIGHT * 0.42
    max_dist = math.hypot(cx, cy)
    steps = 90
    for i in range(steps, 0, -1):
        r = max_dist * i / steps
        v = int(255 * (1 - i / steps) ** 1.6)
        draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=v)
    mask = mask.filter(ImageFilter.GaussianBlur(60))
    dark = Image.new("RGB", (WIDTH, HEIGHT), (0, 0, 0))
    return Image.composite(img, Image.blend(img, dark, strength), mask)


def add_grain(img: Image.Image, amount: int = 7) -> Image.Image:
    rng = random.Random(7)
    noise = Image.new("L", (WIDTH, HEIGHT))
    noise.putdata([128 + rng.randint(-amount, amount) for _ in range(WIDTH * HEIGHT)])
    noise = noise.filter(ImageFilter.GaussianBlur(0.4))
    return Image.blend(img, Image.merge("RGB", (noise, noise, noise)), 0.045)


def soft_blob(draw: ImageDraw.ImageDraw, cx: int, cy: int, r: int, color: tuple[int, int, int]):
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=color)


def render_artwork(slug: str, index: int, kind: str) -> Image.Image:
    """Render one image for a collection.

    kind: "cover" | "preview" | "locked"
    """
    rng = random.Random(slug_seed(slug) * 7919 + index * 131)
    stops = palette(slug, index)
    angle = rng.uniform(0.35, 1.2)

    img = gradient_image(stops, angle)

    # Soft out-of-focus light shapes for depth.
    glow = Image.new("RGB", (WIDTH, HEIGHT), (0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    for _ in range(rng.randint(2, 4)):
        bright = (
            clamp(stops[-1][0] * rng.uniform(1.1, 1.7)),
            clamp(stops[-1][1] * rng.uniform(1.1, 1.7)),
            clamp(stops[-1][2] * rng.uniform(1.1, 1.7)),
        )
        soft_blob(
            gdraw,
            rng.randint(0, WIDTH),
            rng.randint(0, HEIGHT),
            rng.randint(160, 420),
            bright,
        )
    glow = glow.filter(ImageFilter.GaussianBlur(110))
    img = Image.blend(img, glow, 0.22)

    if kind == "locked":
        # Locked placeholders are deliberately flatter and darker so they
        # never read as real gallery content.
        img = Image.blend(img, Image.new("RGB", (WIDTH, HEIGHT), (12, 12, 16)), 0.55)
        img = img.filter(ImageFilter.GaussianBlur(9))
        draw = ImageDraw.Draw(img, "RGBA")
        # Diagonal hatch overlay.
        for x in range(-HEIGHT, WIDTH + HEIGHT, 46):
            draw.line((x, 0, x + HEIGHT, HEIGHT), fill=(255, 255, 255, 12), width=2)
    else:
        # A soft vertical light shaft suggests a subject without faking one.
        shaft = Image.new("RGB", (WIDTH, HEIGHT), (0, 0, 0))
        sdraw = ImageDraw.Draw(shaft)
        sx = rng.randint(int(WIDTH * 0.25), int(WIDTH * 0.75))
        sw = rng.randint(140, 300)
        sdraw.polygon(
            [(sx, 0), (sx + sw, 0), (sx + sw + 190, HEIGHT), (sx + 40, HEIGHT)],
            fill=(255, 255, 255),
        )
        shaft = shaft.filter(ImageFilter.GaussianBlur(95))
        img = Image.blend(img, shaft, 0.11)

    img = add_vignette(img, 0.5 if kind == "locked" else 0.42)
    img = add_grain(img, 5 if kind == "locked" else 7)
    return img


def main() -> None:
    with open(DATA_FILE, "r", encoding="utf-8") as handle:
        collections = json.load(handle)

    os.makedirs(OUT_ROOT, exist_ok=True)

    total = 0
    for collection in collections:
        slug = collection["slug"]
        out_dir = os.path.join(OUT_ROOT, slug)
        os.makedirs(out_dir, exist_ok=True)

        jobs = [("cover", 0, "cover.jpg")]
        jobs += [("preview", i + 1, f"preview-{i + 1}.jpg") for i in range(3)]
        jobs += [("locked", i + 1, f"locked-{i + 1}.jpg") for i in range(3)]

        for kind, index, filename in jobs:
            path = os.path.join(out_dir, filename)
            img = render_artwork(slug, index, kind)
            img.save(path, "JPEG", quality=88, optimize=True, progressive=True)
            total += 1

        print(f"  {slug}: {len(jobs)} images")

    print(f"Generated {total} images across {len(collections)} collections.")


if __name__ == "__main__":
    main()
