"""Gera o favicon (app/icon.png) e o banner de compartilhamento (app/opengraph-image.png)."""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

MAR = (1, 2, 56)       # marinho
MAR2 = (12, 18, 86)    # marinho-2 (um pouco mais claro)
RED = (255, 0, 0)      # papoula
WHITE = (255, 255, 255)

def font(sz, bold=True):
    for p in ([r"C:\Windows\Fonts\arialbd.ttf"] if bold else [r"C:\Windows\Fonts\arial.ttf"]) + [r"C:\Windows\Fonts\segoeuib.ttf"]:
        if os.path.exists(p):
            return ImageFont.truetype(p, sz)
    return ImageFont.load_default()

def rounded_mask(size, rad):
    m = Image.new("L", size, 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, size[0] - 1, size[1] - 1], rad, fill=255)
    return m

def vgrad(size, top, bot):
    base = Image.new("RGB", size, top)
    top_im = Image.new("RGB", size, bot)
    mask = Image.new("L", (1, size[1]))
    for y in range(size[1]):
        mask.putpixel((0, y), int(255 * y / size[1]))
    base.paste(top_im, (0, 0), mask.resize(size))
    return base

def emblem_white_red(src="public/images/logo-jefiber.png"):
    """Recolore o emblema JE: letras -> branco, anel -> papoula."""
    im = Image.open(src).convert("RGBA").crop((0, 0, 172, 166))
    px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            if a < 30:
                continue
            if r > 110 and g < 95 and b < 95:      # vermelho -> papoula
                px[x, y] = (255, 0, 0, a)
            else:                                   # navy/escuro -> branco
                px[x, y] = (255, 255, 255, a)
    return im

# ---------- FAVICON 512 ----------
def make_icon():
    S = 512
    badge = vgrad((S, S), MAR2, MAR).convert("RGBA")
    # leve glow papoula atrás do emblema
    glow = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    ImageDraw.Draw(glow).ellipse([120, 120, 392, 392], fill=(255, 0, 0, 70))
    badge = Image.alpha_composite(badge, glow.filter(ImageFilter.GaussianBlur(40)))
    # borda sutil clara (visível em abas escuras)
    ImageDraw.Draw(badge).rounded_rectangle([6, 6, S - 7, S - 7], 110, outline=(255, 255, 255, 45), width=4)
    emb = emblem_white_red()
    scale = 300 / emb.width
    emb = emb.resize((300, int(emb.height * scale)))
    badge.alpha_composite(emb, ((S - emb.width) // 2, (S - emb.height) // 2))
    out = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    out.paste(badge, (0, 0), rounded_mask((S, S), 110))
    out.save("app/icon.png")
    print("saved app/icon.png")

# ---------- OG BANNER 1200x630 ----------
def make_og():
    W, H = 1200, 630
    bg = vgrad((W, H), MAR, MAR2).convert("RGBA")
    # foto da sede à direita, esmaecida e mesclando para a esquerda
    try:
        pw = int(W * 0.6)
        ph = Image.open("public/images/jeFiber33.jpg").convert("RGBA").resize((pw, H))
        # máscara horizontal: transparente à esquerda -> opaca à direita
        grad = Image.new("L", (pw, 1))
        for x in range(pw):
            grad.putpixel((x, 0), int(210 * min(1.0, (x / pw) * 1.5)))
        ph.putalpha(grad.resize((pw, H)))
        bg.alpha_composite(ph, (W - pw, 0))
        # véu marinho por cima para a foto ficar discreta
        bg = Image.alpha_composite(bg, Image.new("RGBA", (W, H), MAR + (120,)))
    except Exception as e:
        print("foto og:", e)
    d = ImageDraw.Draw(bg)
    # barra de acento
    d.rectangle([80, 150, 92, 300], fill=RED)
    # logo branca
    logo = Image.open("public/images/logo-jefiber.png").convert("RGBA")
    # inverter para branco
    px = logo.load()
    for y in range(logo.height):
        for x in range(logo.width):
            r, g, b, a = px[x, y]
            if a > 30:
                px[x, y] = (255, 255, 255, a)
    lw = 360
    logo2 = logo.resize((lw, int(logo.height * lw / logo.width)))
    bg.alpha_composite(logo2, (110, 90))
    d.text((112, 210), "Tecnologia e qualidade em", font=font(46), fill=WHITE)
    d.text((112, 268), "fibra de vidro", font=font(46), fill=WHITE)
    d.text((112, 326), "PRFV / RPVC", font=font(46), fill=(255, 80, 80))
    d.text((112, 430), "+15 ANOS · SANEAMENTO · QUÍMICO · ALIMENTÍCIO", font=font(22, False), fill=(200, 208, 235))
    d.text((112, 470), "Ipeúna / SP · jefiber.com.br", font=font(22, False), fill=(150, 160, 200))
    bg.convert("RGB").save("app/opengraph-image.png")
    print("saved app/opengraph-image.png")

if __name__ == "__main__":
    make_icon()
    make_og()
