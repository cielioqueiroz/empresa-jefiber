"""Comprime as imagens de public/images: remove as não-referenciadas, converte fotos
pesadas (sem alpha) para JPEG otimizado e redimensiona; mantém logo/site-*/com-alpha em PNG."""
import glob, os, re, subprocess
from PIL import Image

IMG = "public/images"
MAXSIDE = 1600
KEEP_PNG = {"logo-jefiber.png"}  # sempre PNG
PROTECT = {"jeFiber33"}          # usados na geração do OG (manter nome .png? -> tratamos abaixo)

def referenced():
    out = set()
    for root in ["app", "components", "lib"]:
        for f in glob.glob(f"{root}/**/*.*", recursive=True):
            try:
                txt = open(f, encoding="utf-8").read()
            except Exception:
                continue
            out.update(re.findall(r"/images/([A-Za-z0-9_.-]+\.png)", txt))
    return out

def has_alpha(im):
    if im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info):
        a = im.convert("RGBA").split()[3]
        return a.getextrema()[0] < 250
    return False

if __name__ == "__main__":
    ref = referenced()
    print("referenciadas:", len(ref))
    converted = {}  # png -> jpg
    removed = []
    for f in sorted(glob.glob(f"{IMG}/*.png")):
        name = os.path.basename(f)
        if name in KEEP_PNG:
            continue
        if name not in ref and name.split(".")[0] not in PROTECT:
            os.remove(f); removed.append(name); continue
        im = Image.open(f)
        w, h = im.size
        if max(w, h) > MAXSIDE:
            s = MAXSIDE / max(w, h)
            im = im.resize((int(w * s), int(h * s)), Image.LANCZOS)
        if has_alpha(im) or name.startswith("site-"):
            im.save(f, optimize=True)  # mantém PNG (transparência ou já leve)
        else:
            jpg = f[:-4] + ".jpg"
            im.convert("RGB").save(jpg, "JPEG", quality=82, optimize=True, progressive=True)
            if jpg != f:
                os.remove(f)
                converted[name] = os.path.basename(jpg)
    print("removidas:", removed)
    print("CONVERTIDAS:")
    for k, v in converted.items():
        print(f"  {k} -> {v}")
    # tamanho final
    tot = sum(os.path.getsize(x) for x in glob.glob(f"{IMG}/*.*") if os.path.isfile(x))
    print("TOTAL final (sem prints):", tot // 1024, "KB")
