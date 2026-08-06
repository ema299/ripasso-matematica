"""Genera le icone dell'app (stile 'timbro di viaggio') con Pillow."""
import math
import os
from PIL import Image, ImageDraw

NAVY = (15, 42, 61, 255)
GOLD = (217, 154, 43, 255)
CORAL = (232, 96, 60, 255)
SAND = (251, 243, 227, 255)

OUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'icons')
os.makedirs(OUT_DIR, exist_ok=True)


def rounded_rect(draw, box, radius, fill):
    draw.rounded_rectangle(box, radius=radius, fill=fill)


def make_icon(size, filename, padded=False):
    S = size * 4  # super-sampling per bordi più puliti
    img = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    radius = int(S * 0.22)
    rounded_rect(d, (0, 0, S, S), radius, NAVY)

    cx, cy = S / 2, S / 2

    # Anello dorato (timbro)
    ring_r = S * 0.34
    ring_w = S * 0.045
    d.ellipse((cx - ring_r, cy - ring_r, cx + ring_r, cy + ring_r), outline=GOLD, width=int(ring_w))

    # Piccoli trattini attorno all'anello (come un timbro postale)
    for i in range(24):
        ang = i * (2 * math.pi / 24)
        r1 = ring_r + ring_w * 1.6
        r2 = ring_r + ring_w * 2.6
        x1, y1 = cx + r1 * math.cos(ang), cy + r1 * math.sin(ang)
        x2, y2 = cx + r2 * math.cos(ang), cy + r2 * math.sin(ang)
        d.line((x1, y1, x2, y2), fill=(217, 154, 43, 160), width=int(S * 0.006))

    # Aeroplanino di carta (coral) al centro, leggermente ruotato
    plane = [(-0.30, -0.02), (0.28, -0.20), (0.02, 0.02), (0.28, 0.20)]
    scale = S * 0.42
    angle = math.radians(-18)
    pts = []
    for (px, py) in plane:
        rx = px * math.cos(angle) - py * math.sin(angle)
        ry = px * math.sin(angle) + py * math.cos(angle)
        pts.append((cx + rx * scale, cy + ry * scale))
    d.polygon(pts, fill=CORAL)

    # Puntino sabbia sulla coda (dettaglio "timbro")
    d.ellipse((cx - S * 0.015, cy - S * 0.015, cx + S * 0.015, cy + S * 0.015), fill=SAND)

    img = img.resize((size, size), Image.LANCZOS)

    if not padded:
        img.save(os.path.join(OUT_DIR, filename))
    else:
        # icona con margine di sicurezza (per apple-touch-icon, che non gestisce roundrect)
        img.save(os.path.join(OUT_DIR, filename))


make_icon(192, 'icon-192.png')
make_icon(512, 'icon-512.png')
make_icon(180, 'apple-touch-icon.png')
print('Icone generate in', OUT_DIR)
