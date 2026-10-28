"""Generates static image assets: portrait WebP, favicons and 1200x630 Open Graph cards.

Run with `npm run og` after adding or renaming a blog post, then commit public/.
"""
import re
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
POSTS = ROOT / "src" / "content" / "blog"
FONTS = Path("/usr/share/fonts/truetype/noto")

BG = (10, 10, 11)
INK = (244, 242, 236)
MUTED = (163, 161, 155)
ACCENT = (255, 59, 48)


def font(name, size):
    return ImageFont.truetype(str(FONTS / name), size)


def wrap(draw, text, fnt, width):
    lines, line = [], ""
    for word in text.split():
        trial = f"{line} {word}".strip()
        if draw.textlength(trial, font=fnt) <= width:
            line = trial
        else:
            lines.append(line)
            line = word
    lines.append(line)
    return lines


def portrait():
    src = Image.open(ROOT / "src" / "assets" / "hero-portrait.png").convert("RGBA")
    w = 800
    src = src.resize((w, round(src.height * w / src.width)), Image.LANCZOS)
    src.save(PUBLIC / "chandan-pal.webp", "WEBP", quality=82, method=6)
    return src


def favicons():
    for size, name in [(32, "favicon-32.png"), (180, "apple-touch-icon.png"), (192, "icon-192.png"), (512, "icon-512.png")]:
        img = Image.new("RGB", (size, size), ACCENT)
        d = ImageDraw.Draw(img)
        f = font("NotoSans-Bold.ttf", round(size * 0.44))
        d.text((size / 2, size / 2), "CP", font=f, fill=(255, 255, 255), anchor="mm")
        img.save(PUBLIC / name)


def card(title, eyebrow, out, person=None):
    img = Image.new("RGB", (1200, 630), BG)
    d = ImageDraw.Draw(img)
    # soft accent glow, top-right
    glow = Image.new("RGB", (1200, 630), BG)
    gd = ImageDraw.Draw(glow)
    for r in range(420, 0, -6):
        a = int(26 * (1 - r / 420))
        gd.ellipse([1050 - r, -140 - r, 1050 + r, -140 + r], fill=(10 + a * 2, 10, 11))
    img = Image.blend(img, glow, 1.0)
    d = ImageDraw.Draw(img)

    text_w = 640 if person else 1000
    if person:
        h = 600
        p = person.resize((round(person.width * h / person.height), h), Image.LANCZOS)
        img.paste(p, (1200 - p.width - 30, 630 - h + 30), p)

    d.rounded_rectangle([72, 64, 120, 112], radius=10, fill=ACCENT)
    d.text((96, 88), "CP", font=font("NotoSans-Bold.ttf", 22), fill=(255, 255, 255), anchor="mm")
    d.text((136, 88), "Chandan Pal", font=font("NotoSans-SemiBold.ttf", 26), fill=INK, anchor="lm")

    d.text((72, 196), eyebrow.upper(), font=font("NotoSansMono-Regular.ttf", 24), fill=ACCENT)
    size = 64
    while size > 40:
        f = font("NotoSans-Bold.ttf", size)
        lines = wrap(d, title, f, text_w)
        if len(lines) <= 4:
            break
        size -= 4
    y = 246
    for line in lines:
        d.text((72, y), line, font=f, fill=INK)
        y += round(size * 1.18)

    d.text((72, 560), "portfolio-chandan10.vercel.app", font=font("NotoSans-Regular.ttf", 24), fill=MUTED)
    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out, optimize=True)


def frontmatter(path):
    raw = path.read_text()
    m = re.match(r"^---\n(.*?)\n---", raw, re.S)
    data = {}
    for line in m.group(1).splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            data[k.strip()] = v.strip().strip("\"'")
    return data


def main():
    person = portrait()
    favicons()
    card("Full-Stack Developer, CTO & Co-founder of VagMed India", "Jaipur, India", PUBLIC / "og" / "default.png", person)
    for md in sorted(POSTS.glob("*.md")):
        fm = frontmatter(md)
        tag = fm.get("tags", "Blog").split(",")[0].strip()
        card(fm["title"], tag, PUBLIC / "og" / f"{md.stem}.png", person if fm.get("about") == "true" else None)
    print("images written to", PUBLIC)


if __name__ == "__main__":
    main()
