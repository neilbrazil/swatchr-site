#!/usr/bin/env python3
"""Deterministic landscape feature art for Swatchr guide pages.

Colour-field artwork, one distinct composition per guide, drawn straight to
raster with Pillow. Seeded on the slug so re-running reproduces the same image.
"""
import math, os, random, subprocess, sys
from PIL import Image, ImageDraw, ImageFilter

W, H = 1536, 1024
OUT = sys.argv[1]


def hsl(h, s, l):
    h %= 360
    c = (1 - abs(2 * l - 1)) * s
    x = c * (1 - abs((h / 60) % 2 - 1))
    m = l - c / 2
    r, g, b = [(c, x, 0), (x, c, 0), (0, c, x),
               (0, x, c), (x, 0, c), (c, 0, x)][int(h // 60) % 6]
    return tuple(round((v + m) * 255) for v in (r, g, b))


def canvas(hue):
    return Image.new("RGB", (W, H), hsl(hue, .55, .11))


def stacked_bands(rng, hue):
    """Horizontal bands of uneven weight on a deep ground."""
    im = canvas(hue)
    d = ImageDraw.Draw(im)
    y = 80
    while y < H - 90:
        h = rng.randint(52, 150)
        x = 110 + rng.randint(0, 130)
        d.rounded_rectangle([x, y, x + rng.randint(640, 1300), y + h - 18], 16,
                            fill=hsl(hue + rng.randint(-45, 45),
                                     rng.uniform(.45, .85), rng.uniform(.42, .66)))
        y += h
    return im


def swatch_grid(rng, hue):
    """A grid of swatch chips with a few cells deliberately left empty."""
    im = canvas(hue)
    d = ImageDraw.Draw(im)
    cols, rows = 7, 5
    cw, ch = W / cols, H / rows
    for r in range(rows):
        for c in range(cols):
            if rng.random() < .13:
                continue
            p = 22
            d.rounded_rectangle([c * cw + p, r * ch + p, (c + 1) * cw - p, (r + 1) * ch - p],
                                20, fill=hsl(hue + c * 14 - r * 9,
                                             rng.uniform(.4, .8), .3 + r * .11))
    return im


def radial_wheel(rng, hue):
    """Colour-wheel segments radiating from an off-centre origin."""
    im = canvas(hue)
    d = ImageDraw.Draw(im)
    cx, cy = W * .62, H * .5
    for i in range(36):
        r1 = 130 + rng.randint(190, 430)
        d.pieslice([cx - r1, cy - r1, cx + r1, cy + r1], i * 10, i * 10 + 9.2,
                   fill=hsl(hue + i * 10, .72, .55))
    d.ellipse([cx - 130, cy - 130, cx + 130, cy + 130], fill=hsl(hue, .55, .11))
    return im


def gradient_field(rng, hue):
    """Soft blurred discs, breathing room kept on the left."""
    im = canvas(hue)
    d = ImageDraw.Draw(im)
    for _ in range(9):
        x, y = rng.randint(520, 1500), rng.randint(60, 980)
        r = rng.randint(160, 340)
        d.ellipse([x - r, y - r, x + r, y + r],
                  fill=hsl(hue + rng.randint(-70, 70),
                           rng.uniform(.55, .9), rng.uniform(.42, .62)))
    return im.filter(ImageFilter.GaussianBlur(64))


def split_pair(rng, hue):
    """Two opposing fields facing each other across a gutter."""
    im = canvas(hue)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([70, 120, 730, 904], 28, fill=hsl(hue, .7, .5))
    d.rounded_rectangle([806, 120, 1466, 904], 28, fill=hsl(hue + 180, .7, .5))
    for i in range(4):
        d.rounded_rectangle([110 + i * 160, 760, 230 + i * 160, 864], 16,
                            fill=hsl(hue + (i - 1.5) * 30, .68, .62))
    return im


def stepped_ramp(rng, hue):
    """One hue walked from dark to light in discrete steps."""
    im = canvas(hue)
    d = ImageDraw.Draw(im)
    n = 11
    cw = (W - 200) / n
    for i in range(n):
        h = 180 + i * 60
        d.rounded_rectangle([100 + i * cw, H - 90 - h, 100 + (i + 1) * cw - 14, H - 90],
                            16, fill=hsl(hue + i * 4, .68, .22 + i * .055))
    return im


def diagonal_ribbons(rng, hue):
    """Broad diagonal ribbons crossing the frame."""
    im = canvas(hue)
    d = ImageDraw.Draw(im)
    for i in range(8):
        x = -400 + i * 260
        d.polygon([(x, H), (x + 180, H), (x + 700, 0), (x + 520, 0)],
                  fill=hsl(hue + i * 22, rng.uniform(.5, .85), rng.uniform(.4, .64)))
    return im


def corner_stack(rng, hue):
    """Concentric rounded rectangles anchored to the lower right."""
    im = canvas(hue)
    d = ImageDraw.Draw(im)
    for i in range(9):
        s = 1180 - i * 118
        d.rounded_rectangle([W - 120 - s, H - 80 - s * .62, W - 120, H - 80], 26,
                            fill=hsl(hue + i * 16, .7, .26 + i * .045))
    return im


COMPOSERS = [stacked_bands, swatch_grid, radial_wheel, gradient_field,
             split_pair, stepped_ramp, diagonal_ribbons, corner_stack]

GUIDES = [
    ("how-to-find-hex-code-from-photo-iphone", 218, 0),
    ("pick-a-color-with-your-iphone-camera", 206, 3),
    ("hex-rgb-hsl-cmyk-color-codes-explained", 262, 1),
    ("get-cmyk-values-from-a-photo", 192, 5),
    ("find-complementary-colors-for-any-color", 340, 4),
    ("save-a-color-palette-on-iphone", 205, 7),
    ("identify-a-color-you-cant-name", 168, 2),
    ("iphone-color-picker-widget", 286, 6),
]

os.makedirs(OUT, exist_ok=True)
tmp = "/tmp/swatchr-feat"
os.makedirs(tmp, exist_ok=True)
for slug, hue, ci in GUIDES:
    rng = random.Random(slug)
    im = COMPOSERS[ci](rng, hue)
    png = f"{tmp}/{slug}.png"
    im.save(png)
    subprocess.run(["cwebp", "-q", "82", png, "-o", f"{OUT}/{slug}-feature.webp"],
                   check=True, capture_output=True)
    print("ok", slug)
