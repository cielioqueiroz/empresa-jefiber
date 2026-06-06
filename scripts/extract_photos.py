"""Extrai as fotos reais distintas dos prints do site original e salva como assets finais.

Fontes (conteúdo REAL exibido, que difere do slug do print):
- produto-tubos-1        -> foto do tubo gigante (genérica de produtos no site)
- servico-calha-vertedora-> tanques verticais azuis (rotulado 'ETE' no site, visual = reservatórios)
- servico-guarda-corpo   -> estação de tratamento (ETA)
- servico-comporta       -> peça amarela (Tampas)
- servico-pecas-especiais-> painel de flanges (Peças Especiais)
"""
import os
from PIL import Image, ImageChops

PR = "public/images/prints-jeFiber"
OUT = "public/images"

def trim_white(im, thr=242):
    """Remove bordas quase-brancas."""
    bg = Image.new("RGB", im.size, (255, 255, 255))
    diff = ImageChops.difference(im, bg).convert("L")
    bbox = diff.point(lambda p: 255 if p > (255 - thr) else 0).getbbox()
    return im.crop(bbox) if bbox else im

JOBS = [
    ("produto-tubos-1",         (0, 560, 650, 1185),    "site-tubos.png",           False),
    ("servico-calha-vertedora", (605, 357, 1146, 1003), "site-reservatorios.png",   True),
    ("servico-guarda-corpo",    (605, 357, 1146, 1003), "site-eta.png",             True),
    ("servico-comporta",        (605, 357, 1146, 1003), "site-tampas.png",          True),
    ("servico-pecas-especiais", (605, 357, 1146, 1003), "site-pecas-especiais.png", True),
]

if __name__ == "__main__":
    T = os.environ.get("TEMP", "/tmp").replace("\\", "/")
    from PIL import ImageDraw
    thumbs = []
    for src, box, out, trim in JOBS:
        im = Image.open(f"{PR}/{src}.png").convert("RGB").crop(box)
        if trim:
            im = trim_white(im)
        im.save(f"{OUT}/{out}")
        print("saved", out, im.size)
        t = im.resize((200, int(200 * im.height / im.width)))
        thumbs.append((out, t))
    W = sum(t.width + 10 for _, t in thumbs); H = max(t.height for _, t in thumbs) + 24
    m = Image.new("RGB", (W, H), (20, 20, 40)); d = ImageDraw.Draw(m); x = 0
    for lbl, t in thumbs:
        m.paste(t, (x, 20)); d.text((x + 2, 2), lbl, fill=(255, 255, 0)); x += t.width + 10
    m.save(f"{T}/check_final.png"); print("montage ->", f"{T}/check_final.png")
