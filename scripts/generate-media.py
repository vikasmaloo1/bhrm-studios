"""
Generate the BHMR POC's visual artifacts.

Everything here is drawn from scratch — no stock, no scraping, nothing from any
reference site. The language is bold graphic abstraction in the BHMR palette:
warm paper, warm ink, and the brand orange, built from concentric apertures,
halftone ramps, layered strata and prismatic overlaps.

Drawn at 2x and downsampled, which is what keeps the hard edges clean.

Re-run:  python scripts/generate-media.py
"""

import math
import os
from PIL import Image, ImageDraw, ImageFilter

SS = 2

PAPER = (244, 241, 234)
PAPER_DEEP = (228, 221, 207)
PAPER_WARM = (238, 226, 208)
INK = (20, 18, 15)
INK_SOFT = (44, 39, 35)
ACCENT = (255, 74, 28)
ACCENT_WARM = (255, 138, 76)
ACCENT_DEEP = (188, 46, 10)
EMBER = (255, 178, 112)

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "media")


def lerp(a, b, t):
    t = max(0.0, min(1.0, t))
    return tuple(int(round(a[i] + (b[i] - a[i]) * t)) for i in range(3))


def gradient(size, stops, angle=90):
    """Multi-stop linear gradient. Oversized and centre-cropped when angled."""
    w, h = size
    if angle == 90:
        ow, oh = w, h
    else:
        ow = oh = int(math.hypot(w, h)) + 2
    strip = Image.new("RGB", (1, oh))
    px = strip.load()
    n = len(stops) - 1
    for y in range(oh):
        t = y / max(oh - 1, 1)
        seg = min(int(t * n), n - 1)
        local = (t * n) - seg
        px[0, y] = lerp(stops[seg], stops[seg + 1], local)
    img = strip.resize((ow, oh), Image.BILINEAR)
    if angle != 90:
        img = img.rotate(angle - 90, resample=Image.BICUBIC, expand=False)
        left, upper = (ow - w) // 2, (oh - h) // 2
        img = img.crop((left, upper, left + w, upper + h))
    return img


def layer(size):
    return Image.new("RGBA", size, (0, 0, 0, 0))


def disc(size, cx, cy, r, color, alpha=255):
    lyr = layer(size)
    ImageDraw.Draw(lyr).ellipse([cx - r, cy - r, cx + r, cy + r], fill=color + (alpha,))
    return lyr


def ring(size, cx, cy, r, color, alpha, width):
    lyr = layer(size)
    ImageDraw.Draw(lyr).ellipse(
        [cx - r, cy - r, cx + r, cy + r], outline=color + (alpha,), width=width
    )
    return lyr


def bloom(size, cx, cy, radius, color, strength):
    lyr = layer(size)
    d = ImageDraw.Draw(lyr)
    for i in range(70, 0, -1):
        t = i / 70
        r = radius * t
        d.ellipse(
            [cx - r, cy - r, cx + r, cy + r],
            fill=color + (int(255 * strength * (1 - t) ** 1.9),),
        )
    return lyr.filter(ImageFilter.GaussianBlur(radius * 0.07))


def halftone(size, color, fn, cell, max_r=0.5):
    w, h = size
    lyr = layer(size)
    d = ImageDraw.Draw(lyr)
    for gy in range(0, h + cell, cell):
        for gx in range(0, w + cell, cell):
            v = fn(gx / w, gy / h)
            if v <= 0.01:
                continue
            r = cell * max_r * v
            if r < 0.35:
                continue
            d.ellipse([gx - r, gy - r, gx + r, gy + r], fill=color + (255,))
    return lyr


def lines(size, color, spacing, angle, alpha, width=1, fade=None):
    w, h = size
    lyr = layer(size)
    d = ImageDraw.Draw(lyr)
    rad = math.radians(angle)
    dx, dy = math.cos(rad), math.sin(rad)
    span = int(math.hypot(w, h)) + spacing
    steps = int((2 * span) / spacing)
    for i in range(steps):
        t = i / max(steps - 1, 1)
        a = alpha if fade is None else int(alpha * fade(t))
        if a <= 2:
            continue
        ox = -span + i * spacing
        d.line(
            [(ox - dx * span, -dy * span), (ox + dx * span, dy * span)],
            fill=color + (a,),
            width=width,
        )
    return lyr


def poly(size, pts, color, alpha, rot=0):
    lyr = layer(size)
    ImageDraw.Draw(lyr).polygon(pts, fill=color + (alpha,))
    if rot:
        lyr = lyr.rotate(rot, resample=Image.BICUBIC, center=(size[0] / 2, size[1] / 2))
    return lyr


def arc_band(size, cx, cy, r, color, alpha, width, start, end):
    lyr = layer(size)
    ImageDraw.Draw(lyr).arc(
        [cx - r, cy - r, cx + r, cy + r], start, end, fill=color + (alpha,), width=width
    )
    return lyr


def grain(img, amount=12, mix=0.12):
    noise = Image.effect_noise(img.size, amount).convert("L")
    rgb = Image.merge("RGB", (noise, noise, noise))
    return Image.blend(img, Image.blend(img, rgb, 0.5), mix)


def compose(base, layers):
    out = base.convert("RGBA")
    for l in layers:
        out = Image.alpha_composite(out, l)
    return out.convert("RGB")


# ------------------------------------------------------------------ plates --


def art_aperture(w=1200, h=1500):
    """Hero. A blazing aperture — concentric orange rings closing on a core."""
    W, H = w * SS, h * SS
    base = gradient((W, H), [PAPER, PAPER_WARM, PAPER_DEEP], angle=106)
    cx, cy = W * 0.52, H * 0.44
    L = [
        lines((W, H), INK, 10 * SS, -30, 16, 1 * SS, lambda t: max(0.0, 1 - abs(t - 0.6) * 2.0)),
        bloom((W, H), cx, cy, W * 0.92, ACCENT, 0.32),
    ]
    for i, rr in enumerate([0.62, 0.545, 0.47, 0.395]):
        L.append(ring((W, H), cx, cy, W * rr, ACCENT_DEEP, 70 - i * 9, 3 * SS))
    L += [
        disc((W, H), cx, cy, W * 0.335, ACCENT, 255),
        bloom((W, H), cx - W * 0.09, cy - H * 0.09, W * 0.34, EMBER, 0.75),
        disc((W, H), cx, cy, W * 0.115, PAPER, 235),
        ring((W, H), cx, cy, W * 0.175, PAPER, 150, 3 * SS),
        halftone((W, H), ACCENT_DEEP, lambda x, y: max(0.0, (y - 0.66) / 0.34) ** 1.5 * 0.8, 13 * SS),
        halftone((W, H), INK, lambda x, y: max(0.0, (0.26 - y) / 0.26) ** 1.6 * 0.45, 16 * SS, 0.4),
    ]
    return grain(compose(base, L).resize((w, h), Image.LANCZOS), 12, 0.11)


def art_strata(w=1100, h=1375):
    """Layered bands — brand, product, front end, back end as one stack."""
    W, H = w * SS, h * SS
    base = gradient((W, H), [PAPER, PAPER_DEEP], angle=84)
    L = [lines((W, H), INK, 8 * SS, 64, 22, 1 * SS, lambda t: max(0.0, 1 - abs(t - 0.45) * 1.8))]
    bands = [
        (0.16, INK, 210),
        (0.34, ACCENT, 235),
        (0.52, INK_SOFT, 170),
        (0.70, ACCENT_DEEP, 200),
    ]
    for y, col, a in bands:
        skew = H * 0.055
        L.append(
            poly(
                (W, H),
                [
                    (-W * 0.1, H * y),
                    (W * 1.1, H * y - skew),
                    (W * 1.1, H * y - skew + H * 0.085),
                    (-W * 0.1, H * y + H * 0.085),
                ],
                col,
                a,
            )
        )
    L += [
        bloom((W, H), W * 0.78, H * 0.2, W * 0.5, ACCENT, 0.3),
        disc((W, H), W * 0.2, H * 0.86, W * 0.14, ACCENT, 240),
        halftone((W, H), INK, lambda x, y: max(0.0, (y - 0.78) / 0.22) ** 1.3 * 0.7, 12 * SS),
    ]
    return grain(compose(base, L).resize((w, h), Image.LANCZOS))


def art_prism(w=1100, h=1375):
    """Overlapping translucent planes — warm, layered, optical."""
    W, H = w * SS, h * SS
    base = gradient((W, H), [PAPER_WARM, PAPER, PAPER_DEEP], angle=120)
    L = [
        bloom((W, H), W * 0.3, H * 0.28, W * 0.7, EMBER, 0.42),
        poly((W, H), [(W * 0.5, H * 0.06), (W * 1.05, H * 0.62), (W * 0.02, H * 0.62)], ACCENT, 130),
        poly((W, H), [(W * 0.5, H * 0.34), (W * 1.05, H * 0.9), (W * 0.02, H * 0.9)], INK, 120),
        poly((W, H), [(W * 0.5, H * 0.2), (W * 0.98, H * 0.76), (W * 0.06, H * 0.76)], ACCENT_WARM, 120),
        ring((W, H), W * 0.5, H * 0.55, W * 0.34, PAPER, 170, 3 * SS),
        halftone((W, H), ACCENT_DEEP, lambda x, y: max(0.0, (y - 0.6) / 0.4) ** 1.4 * 0.7, 13 * SS),
        lines((W, H), PAPER, 9 * SS, 22, 34, 1 * SS, lambda t: max(0.0, 1 - abs(t - 0.55) * 1.9)),
    ]
    return grain(compose(base, L).resize((w, h), Image.LANCZOS))


def art_orbit(w=1100, h=1375):
    """Ink field with a rising ember and thin orbital rings."""
    W, H = w * SS, h * SS
    base = gradient((W, H), [INK_SOFT, INK], angle=96)
    cx, cy = W * 0.5, H * 0.62
    L = [
        lines((W, H), PAPER, 12 * SS, 0, 11, 1 * SS, lambda t: max(0.0, 1 - t) ** 1.1),
        bloom((W, H), cx, cy, W * 0.95, ACCENT_DEEP, 0.6),
        disc((W, H), cx, cy, W * 0.3, ACCENT, 245),
        bloom((W, H), cx - W * 0.07, cy - H * 0.07, W * 0.3, EMBER, 0.7),
    ]
    for i, rr in enumerate([0.4, 0.5, 0.62, 0.76]):
        L.append(ring((W, H), cx, cy, W * rr, ACCENT, 110 - i * 20, 2 * SS))
    L.append(
        halftone((W, H), ACCENT, lambda x, y: max(0.0, (0.34 - y) / 0.34) ** 1.7 * 0.6, 15 * SS, 0.42)
    )
    return grain(compose(base, L).resize((w, h), Image.LANCZOS), 11, 0.1)


def art_process(w=1600, h=1080):
    """Dark machine-room field behind the seven stages."""
    W, H = w * SS, h * SS
    base = gradient((W, H), [INK_SOFT, INK], angle=98)
    cx, cy = W * 0.14, H * 1.04
    L = [
        lines((W, H), PAPER, 11 * SS, 0, 12, 1 * SS, lambda t: max(0.0, 1 - t) ** 1.2),
        lines((W, H), PAPER, 26 * SS, 90, 9, 1 * SS),
        bloom((W, H), W * 0.86, H * 0.82, W * 0.6, ACCENT_DEEP, 0.55),
    ]
    for i, rr in enumerate([0.3, 0.44, 0.58, 0.74, 0.92]):
        L.append(ring((W, H), cx, cy, W * rr, ACCENT, 105 - i * 16, 2 * SS))
    L.append(halftone((W, H), ACCENT, lambda x, y: max(0.0, (x - 0.56) / 0.44) ** 1.6 * 0.55, 15 * SS, 0.44))
    return grain(compose(base, L).resize((w, h), Image.LANCZOS), 11, 0.1)


def art_cta(w=1600, h=1000):
    """Deep ink with an orange horizon breaking the lower edge."""
    W, H = w * SS, h * SS
    base = gradient((W, H), [INK, lerp(INK, ACCENT_DEEP, 0.24)], angle=92)
    cx, cy, r = W * 0.5, H * 1.3, W * 0.62
    L = [
        lines((W, H), PAPER, 13 * SS, -18, 10, 1 * SS, lambda t: max(0.0, 1 - abs(t - 0.5) * 1.6)),
        bloom((W, H), cx, cy, r * 1.7, ACCENT, 0.6),
        disc((W, H), cx, cy, r, ACCENT, 238),
        bloom((W, H), cx, cy - r * 0.3, r * 0.9, EMBER, 0.45),
        ring((W, H), cx, cy, r * 1.22, ACCENT, 90, 2 * SS),
        ring((W, H), cx, cy, r * 1.48, ACCENT, 52, 2 * SS),
        halftone((W, H), ACCENT, lambda x, y: max(0.0, (y - 0.3) / 0.7) ** 2.0 * 0.42, 16 * SS, 0.4),
    ]
    return grain(compose(base, L).resize((w, h), Image.LANCZOS), 10, 0.1)


def art_statement(w=1800, h=1150):
    """Wide ink bed for the pinned statement — quiet, with one warm sweep."""
    W, H = w * SS, h * SS
    base = gradient((W, H), [INK, INK_SOFT, INK], angle=88)
    L = [
        lines((W, H), PAPER, 14 * SS, -12, 9, 1 * SS, lambda t: max(0.0, 1 - abs(t - 0.4) * 1.5)),
        bloom((W, H), W * 0.72, H * 0.62, W * 0.62, ACCENT_DEEP, 0.5),
        bloom((W, H), W * 0.2, H * 0.24, W * 0.4, (86, 78, 70), 0.4),
    ]
    for i, rr in enumerate([0.34, 0.46, 0.6]):
        L.append(arc_band((W, H), W * 0.72, H * 0.62, W * rr, ACCENT, 95 - i * 22, 2 * SS, 150, 400))
    L.append(halftone((W, H), ACCENT, lambda x, y: max(0.0, (x - 0.62) / 0.38) ** 1.7 * 0.4, 17 * SS, 0.4))
    return grain(compose(base, L).resize((w, h), Image.LANCZOS), 11, 0.1)


def art_node(w=1100, h=1375):
    """Grid of apertures — the component-system idea, drawn."""
    W, H = w * SS, h * SS
    base = gradient((W, H), [PAPER, PAPER_DEEP], angle=100)
    L = [lines((W, H), INK, 30 * SS, 0, 14, 1 * SS), lines((W, H), INK, 30 * SS, 90, 14, 1 * SS)]
    cols, rows = 3, 4
    for r in range(rows):
        for c in range(cols):
            cx = W * (c + 0.5) / cols
            cy = H * (r + 0.5) / rows
            rad = W * 0.115
            live = (r * cols + c) in (1, 4, 6, 9, 10)
            if live:
                L.append(bloom((W, H), cx, cy, rad * 2.4, ACCENT, 0.34))
                L.append(disc((W, H), cx, cy, rad, ACCENT, 245))
                L.append(disc((W, H), cx, cy, rad * 0.36, PAPER, 235))
            else:
                L.append(ring((W, H), cx, cy, rad, INK, 78, 3 * SS))
                L.append(disc((W, H), cx, cy, rad * 0.18, INK, 120))
    L.append(halftone((W, H), ACCENT_DEEP, lambda x, y: max(0.0, (y - 0.72) / 0.28) ** 1.5 * 0.6, 13 * SS))
    return grain(compose(base, L).resize((w, h), Image.LANCZOS))


PLATES = [
    ("art-aperture", art_aperture),
    ("art-strata", art_strata),
    ("art-prism", art_prism),
    ("art-node", art_node),
    ("art-orbit", art_orbit),
    ("art-process", art_process),
    ("art-cta", art_cta),
    ("art-statement", art_statement),
]

if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for name, fn in PLATES:
        img = fn()
        path = os.path.join(OUT, f"{name}.webp")
        img.save(path, "WEBP", quality=80, method=6)
        print(f"{name:16} {img.size[0]}x{img.size[1]}  {os.path.getsize(path) / 1024:5.0f} KB")
