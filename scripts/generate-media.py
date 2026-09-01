"""
Generate the BHMR POC's original visual artifacts.

Everything here is drawn from scratch — no stock, no scraping, nothing from
any reference site, nothing hotlinked from a third-party domain. Palette
matches the live design tokens in src/app/globals.css (white / near-black /
BHMR orange #ff4400) — update both together if the brand palette changes.

Re-run:  python scripts/generate-media.py
"""

import math
import os
from PIL import Image, ImageDraw, ImageFilter

SS = 2

INK = (10, 10, 10)
ACCENT = (255, 68, 0)
EMBER = (255, 160, 100)

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "media")


def layer(size):
    return Image.new("RGBA", size, (0, 0, 0, 0))


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
    return lyr.filter(ImageFilter.GaussianBlur(radius * 0.08))


def flowing_ribbon(size, seed_y, amplitude, freq, phase, width, color, alpha, blur):
    """A soft, glowing streak that undulates like a ribbon of light."""
    w, h = size
    lyr = layer(size)
    d = ImageDraw.Draw(lyr)
    steps = 90
    pts = []
    for i in range(steps + 1):
        t = i / steps
        x = t * w
        y = seed_y + amplitude * math.sin(t * freq * 2 * math.pi + phase)
        pts.append((x, y))
    # Thick line segments with alpha tapered at both ends, so the ribbon
    # fades in and out rather than cutting off at the frame edge.
    for i in range(len(pts) - 1):
        t = i / (len(pts) - 1)
        edge_fade = min(1.0, t * 4, (1 - t) * 4)
        a = int(alpha * edge_fade)
        if a <= 1:
            continue
        d.line([pts[i], pts[i + 1]], fill=color + (a,), width=width)
    return lyr.filter(ImageFilter.GaussianBlur(blur))


def grain(img, amount=10, mix=0.09):
    noise = Image.effect_noise(img.size, amount).convert("L")
    rgb = Image.merge("RGB", (noise, noise, noise))
    return Image.blend(img, Image.blend(img, rgb, 0.5), mix)


def compose(base, layers):
    out = base.convert("RGBA")
    for lyr in layers:
        out = Image.alpha_composite(out, lyr)
    return out.convert("RGB")


def cta_flow(w=1800, h=1000):
    """
    Flowing orange light on near-black — the CTASection background.

    The owner asked to keep this exact look after seeing it live; the
    original was a third-party-hosted render, so this recreates the same
    visual family (soft undulating light ribbons, warm glow rising from the
    bottom edge) as a self-hosted, licence-clean original.
    """
    W, H = w * SS, h * SS
    base = Image.new("RGB", (W, H), INK)

    layers = [bloom((W, H), W * 0.5, H * 1.1, W * 0.7, ACCENT, 0.35)]

    # (y-fraction, amplitude, frequency, phase, width, color, alpha, blur) —
    # six ribbons at different heights and warmth so they read as a field,
    # not one repeated shape.
    ribbons = [
        (0.30, 90, 1.3, 0.2, 26, ACCENT, 130, 14),
        (0.42, 130, 1.0, 1.4, 40, ACCENT, 110, 20),
        (0.55, 70, 1.6, 2.6, 18, EMBER, 150, 10),
        (0.66, 160, 0.8, 0.6, 50, ACCENT, 90, 26),
        (0.78, 100, 1.2, 3.8, 22, EMBER, 140, 12),
        (0.88, 190, 0.7, 4.6, 60, ACCENT, 70, 32),
    ]
    for fy, amp, freq, phase, width, color, alpha, blur in ribbons:
        layers.append(
            flowing_ribbon(
                (W, H), H * fy, amp * SS, freq, phase, width * SS, color, alpha, blur * SS
            )
        )

    img = compose(base, layers).resize((w, h), Image.LANCZOS)
    return grain(img, 10, 0.08)


PLATES = [
    ("cta-flow", cta_flow),
]

if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for name, fn in PLATES:
        img = fn()
        path = os.path.join(OUT, f"{name}.webp")
        img.save(path, "WEBP", quality=82, method=6)
        print(f"{name:12} {img.size[0]}x{img.size[1]}  {os.path.getsize(path) / 1024:5.0f} KB")
