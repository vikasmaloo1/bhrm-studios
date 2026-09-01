"""
Generate original abstract editorial media for the BHMR POC.

Produced from scratch — no stock, no scraping, nothing copied from either
reference site. The language is Swiss-editorial: crisp geometry, halftone
gradients and raking line fields in the BHMR palette, cropped off-centre so
each plate reads as a fragment of something larger rather than a centred blob.

Everything is drawn at 2x and downsampled, which is what keeps the hard edges
clean instead of stair-stepped.
"""

import math
import os
from PIL import Image, ImageDraw, ImageFilter

SS = 2  # supersample factor

PAPER = (244, 241, 234)
PAPER_DEEP = (226, 219, 205)
INK = (20, 18, 15)
INK_SOFT = (42, 37, 33)
ACCENT = (255, 74, 28)
ACCENT_DEEP = (196, 50, 11)

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "media")


def lerp(a, b, t):
    t = max(0.0, min(1.0, t))
    return tuple(int(round(a[i] + (b[i] - a[i]) * t)) for i in range(3))


def linear_gradient(size, top, bottom, angle=90):
    """
    Linear gradient built from a 1px strip.

    For angled gradients the strip is rendered oversized and centre-cropped —
    rotating at final size leaves empty triangles in the corners.
    """
    w, h = size
    if angle == 90:
        ow, oh = w, h
    else:
        diag = int(math.hypot(w, h)) + 2
        ow = oh = diag
    strip = Image.new("RGB", (1, oh))
    px = strip.load()
    for y in range(oh):
        px[0, y] = lerp(top, bottom, y / max(oh - 1, 1))
    img = strip.resize((ow, oh), Image.BILINEAR)
    if angle != 90:
        img = img.rotate(angle - 90, resample=Image.BICUBIC, expand=False)
        left, upper = (ow - w) // 2, (oh - h) // 2
        img = img.crop((left, upper, left + w, upper + h))
    return img


def halftone(size, color, bg_alpha_fn, cell=18, max_r=0.52):
    """
    Halftone dot field. `bg_alpha_fn(nx, ny) -> 0..1` drives dot radius, so a
    gradient of density reads as a tonal ramp without any blur.
    Returns an RGBA layer.
    """
    w, h = size
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for gy in range(0, h + cell, cell):
        for gx in range(0, w + cell, cell):
            nx, ny = gx / w, gy / h
            v = bg_alpha_fn(nx, ny)
            if v <= 0.01:
                continue
            r = cell * max_r * v
            if r < 0.35:
                continue
            d.ellipse([gx - r, gy - r, gx + r, gy + r], fill=color + (255,))
    return layer


def line_field(size, color, spacing, angle, alpha, width=1, density_fn=None):
    """Raking parallel lines. `density_fn(t)->0..1` fades them across the frame."""
    w, h = size
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    rad = math.radians(angle)
    dx, dy = math.cos(rad), math.sin(rad)
    span = int(math.hypot(w, h)) + spacing
    steps = int((2 * span) / spacing)
    for i in range(steps):
        t = i / max(steps - 1, 1)
        a = alpha if density_fn is None else int(alpha * density_fn(t))
        if a <= 2:
            continue
        ox = -span + i * spacing
        d.line(
            [(ox - dx * span, -dy * span), (ox + dx * span, dy * span)],
            fill=color + (a,),
            width=width,
        )
    return layer


def soft_bloom(size, cx, cy, radius, color, strength):
    """Blurred radial bloom as an RGBA layer — used sparingly, for light only."""
    w, h = size
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    steps = 70
    for i in range(steps, 0, -1):
        t = i / steps
        r = radius * t
        a = int(255 * strength * (1 - t) ** 1.9)
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color + (a,))
    return layer.filter(ImageFilter.GaussianBlur(radius * 0.07))


def disc(size, cx, cy, r, color, alpha=255):
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    ImageDraw.Draw(layer).ellipse([cx - r, cy - r, cx + r, cy + r], fill=color + (alpha,))
    return layer


def ring(size, cx, cy, r, color, alpha, width):
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    ImageDraw.Draw(layer).ellipse(
        [cx - r, cy - r, cx + r, cy + r], outline=color + (alpha,), width=width
    )
    return layer


def grain(img, amount=14, mix=0.15):
    w, h = img.size
    noise = Image.effect_noise((w, h), amount).convert("L")
    rgb = Image.merge("RGB", (noise, noise, noise))
    return Image.blend(img, Image.blend(img, rgb, 0.5), mix)


def compose(base, layers):
    out = base.convert("RGBA")
    for lyr in layers:
        out = Image.alpha_composite(out, lyr)
    return out.convert("RGB")


# ---------------------------------------------------------------- plates ----


def plate_hero(w=1280, h=1620):
    """
    Hero. A hard-edged accent disc rising off-centre and cropped by the right
    edge, a concentric ring echoing it, and a halftone ramp climbing from the
    base. Reads as an object in a frame, not a wash.
    """
    W, H = w * SS, h * SS
    base = linear_gradient((W, H), PAPER, PAPER_DEEP, angle=104)

    cx, cy, r = W * 0.74, H * 0.40, W * 0.40
    layers = [
        line_field((W, H), INK, 9 * SS, -32, 20, width=1 * SS,
                   density_fn=lambda t: max(0.0, 1.0 - abs(t - 0.62) * 2.1)),
        soft_bloom((W, H), cx, cy, r * 2.0, ACCENT, 0.30),
        disc((W, H), cx, cy, r, ACCENT, 255),
        # inner tonal shift inside the disc, so it is not a flat circle
        soft_bloom((W, H), cx - r * 0.34, cy - r * 0.40, r * 1.05, (255, 168, 120), 0.55),
        ring((W, H), cx, cy, r * 1.34, INK, 46, 1 * SS),
        ring((W, H), cx, cy, r * 1.74, INK, 26, 1 * SS),
        halftone((W, H), INK, lambda nx, ny: max(0.0, (ny - 0.52) / 0.48) ** 1.5 * 0.85,
                 cell=13 * SS, max_r=0.5),
        halftone((W, H), ACCENT_DEEP, lambda nx, ny: max(0.0, (0.34 - ny) / 0.34) ** 1.7 * 0.5,
                 cell=17 * SS, max_r=0.42),
    ]
    img = compose(base, layers).resize((w, h), Image.LANCZOS)
    return grain(img, 13, 0.13)


def plate_editorial(w=1120, h=1420):
    """
    Editorial. Two rotated ink planes overlapping, one accent sliver, dense
    hatching. Structural and quiet — it sits beside long text.
    """
    W, H = w * SS, h * SS
    base = linear_gradient((W, H), lerp(PAPER, INK, 0.04), lerp(PAPER, INK, 0.16), angle=76)

    def plane(pts, color, alpha, rot):
        lyr = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        ImageDraw.Draw(lyr).polygon(pts, fill=color + (alpha,))
        return lyr.rotate(rot, resample=Image.BICUBIC, center=(W * 0.5, H * 0.5))

    layers = [
        line_field((W, H), INK, 7 * SS, 62, 30, width=1 * SS,
                   density_fn=lambda t: max(0.0, 1.0 - abs(t - 0.40) * 1.7)),
        plane([(W * 0.06, H * 0.20), (W * 0.86, H * 0.06), (W * 0.94, H * 0.56), (W * 0.14, H * 0.70)],
              INK, 30, -7),
        plane([(W * 0.18, H * 0.42), (W * 1.02, H * 0.32), (W * 1.06, H * 0.86), (W * 0.24, H * 0.98)],
              INK, 52, 5),
        plane([(W * 0.00, H * 0.62), (W * 0.52, H * 0.55), (W * 0.54, H * 0.63), (W * 0.02, H * 0.71)],
              ACCENT, 210, -3),
        soft_bloom((W, H), W * 0.16, H * 0.14, W * 0.52, ACCENT, 0.22),
        halftone((W, H), INK, lambda nx, ny: max(0.0, (ny - 0.60) / 0.40) ** 1.4 * 0.7,
                 cell=12 * SS, max_r=0.48),
        ring((W, H), W * 0.80, H * 0.22, W * 0.20, ACCENT_DEEP, 120, 2 * SS),
    ]
    img = compose(base, layers).resize((w, h), Image.LANCZOS)
    return grain(img, 12, 0.13)


def plate_process(w=1600, h=1080):
    """
    Process. Dark machine-room field: concentric arcs off the lower-left,
    an accent horizon, and a fine grid. Sits behind the seven stages.
    """
    W, H = w * SS, h * SS
    base = linear_gradient((W, H), INK_SOFT, INK, angle=98)

    cx, cy = W * 0.16, H * 1.02
    layers = [
        line_field((W, H), PAPER, 11 * SS, 0, 12, width=1 * SS,
                   density_fn=lambda t: max(0.0, 1.0 - t) ** 1.2),
        line_field((W, H), PAPER, 26 * SS, 90, 9, width=1 * SS),
        soft_bloom((W, H), W * 0.86, H * 0.82, W * 0.62, ACCENT_DEEP, 0.55),
        soft_bloom((W, H), W * 0.30, H * 0.10, W * 0.45, (90, 82, 76), 0.40),
    ]
    for i, rr in enumerate([0.30, 0.44, 0.58, 0.74, 0.92]):
        layers.append(ring((W, H), cx, cy, W * rr, ACCENT, 105 - i * 16, 2 * SS))
    layers.append(
        halftone((W, H), ACCENT, lambda nx, ny: max(0.0, (nx - 0.55) / 0.45) ** 1.6 * 0.55,
                 cell=15 * SS, max_r=0.44)
    )
    img = compose(base, layers).resize((w, h), Image.LANCZOS)
    return grain(img, 11, 0.12)


def plate_cta(w=1600, h=1000):
    """CTA. Deep ink with an orange horizon breaking the lower edge."""
    W, H = w * SS, h * SS
    base = linear_gradient((W, H), INK, lerp(INK, ACCENT_DEEP, 0.22), angle=92)

    cx, cy, r = W * 0.50, H * 1.30, W * 0.62
    layers = [
        line_field((W, H), PAPER, 13 * SS, -18, 10, width=1 * SS,
                   density_fn=lambda t: max(0.0, 1.0 - abs(t - 0.5) * 1.6)),
        soft_bloom((W, H), cx, cy, r * 1.7, ACCENT, 0.60),
        disc((W, H), cx, cy, r, ACCENT, 235),
        soft_bloom((W, H), cx, cy - r * 0.30, r * 0.9, (255, 190, 150), 0.40),
        ring((W, H), cx, cy, r * 1.22, ACCENT, 90, 2 * SS),
        ring((W, H), cx, cy, r * 1.48, ACCENT, 52, 2 * SS),
        halftone((W, H), ACCENT, lambda nx, ny: max(0.0, (ny - 0.30) / 0.70) ** 2.0 * 0.42,
                 cell=16 * SS, max_r=0.40),
    ]
    img = compose(base, layers).resize((w, h), Image.LANCZOS)
    return grain(img, 10, 0.11)


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for name, img in [
        ("plate-hero", plate_hero()),
        ("plate-editorial", plate_editorial()),
        ("plate-process", plate_process()),
        ("plate-cta", plate_cta()),
    ]:
        path = f"{OUT}/{name}.webp"
        img.save(path, "WEBP", quality=78, method=6)
        print(f"{name:18} {img.size[0]}x{img.size[1]}  {os.path.getsize(path)/1024:5.0f} KB")
