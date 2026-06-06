"""Verificação visual do site JE FIBER (Playwright). Servidor gerido pelo with_server.py."""
import os
from playwright.sync_api import sync_playwright

OUT = os.environ.get("SHOT_DIR", os.path.join(os.environ.get("TEMP", "/tmp"), "jefiber_shots"))
os.makedirs(OUT, exist_ok=True)
PORT = os.environ.get("APP_PORT", "3100")
URL = f"http://localhost:{PORT}"

def run():
    errors = []
    info = {}
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, args=["--use-gl=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"])

        # ---- Desktop 1440 ----
        ctx = browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
        page = ctx.new_page()
        page.on("console", lambda m: errors.append(f"[console.{m.type}] {m.text}") if m.type == "error" else None)
        page.on("pageerror", lambda e: errors.append(f"[pageerror] {e}"))
        page.goto(URL, wait_until="networkidle")
        page.wait_for_timeout(2800)  # deixa o 3D/animacoes assentarem

        info["title"] = page.title()
        ids = ["topo", "sobre", "solucoes", "servicos", "infraestrutura", "projetos", "contato"]
        info["secoes"] = {i: page.locator(f"#{i}").count() > 0 for i in ids}
        info["hero_canvas"] = page.locator("#hero-canvas-slot canvas").count() > 0

        page.screenshot(path=os.path.join(OUT, "desktop_hero.png"))
        page.screenshot(path=os.path.join(OUT, "desktop_full.png"), full_page=True)

        # Sobre (contadores)
        try:
            page.locator("#sobre").scroll_into_view_if_needed(); page.wait_for_timeout(900)
            page.screenshot(path=os.path.join(OUT, "desktop_sobre.png"))
        except Exception as e: errors.append(f"[sobre] {e}")

        # Solucoes: abrir detalhes do 1o card
        try:
            page.locator("#solucoes").scroll_into_view_if_needed(); page.wait_for_timeout(700)
            btn = page.locator("#solucoes button:has-text('Detalhes')").first
            btn.click(timeout=8000)
            page.wait_for_timeout(500)
            page.locator("#solucoes").scroll_into_view_if_needed()
            page.screenshot(path=os.path.join(OUT, "desktop_solucoes.png"))
        except Exception as e: errors.append(f"[solucoes] {e}")

        # demais seções
        for sec in ["areas", "infraestrutura", "projetos", "contato"]:
            try:
                page.locator(f"#{sec}").scroll_into_view_if_needed(); page.wait_for_timeout(700)
                page.screenshot(path=os.path.join(OUT, f"desktop_{sec}.png"))
            except Exception as e: errors.append(f"[{sec}] {e}")
        # rodapé
        try:
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)"); page.wait_for_timeout(800)
            page.screenshot(path=os.path.join(OUT, "desktop_footer.png"))
        except Exception as e: errors.append(f"[footer] {e}")
        # hover do botão de WhatsApp
        try:
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)"); page.wait_for_timeout(300)
            page.locator("a[aria-label='Falar no WhatsApp']").hover()
            page.wait_for_timeout(700)
            page.screenshot(path=os.path.join(OUT, "desktop_whatsapp_hover.png"))
        except Exception as e: errors.append(f"[wa-hover] {e}")

        ctx.close()

        # ---- Mobile 390 ----
        try:
            m = browser.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2, is_mobile=True)
            mp = m.new_page()
            mp.goto(URL, wait_until="networkidle")
            mp.wait_for_timeout(1500)
            sw = mp.evaluate("document.documentElement.scrollWidth")
            cw = mp.evaluate("document.documentElement.clientWidth")
            info["mobile_overflow_px"] = sw - cw
            mp.screenshot(path=os.path.join(OUT, "mobile_hero.png"))
            mp.screenshot(path=os.path.join(OUT, "mobile_full.png"), full_page=True)
            m.close()
        except Exception as e: errors.append(f"[mobile] {e}")

        # ---- Superwide 2560 (verifica logo no header/topbar) ----
        try:
            sw = browser.new_context(viewport={"width": 2560, "height": 1080}, device_scale_factor=1)
            sp = sw.new_page()
            sp.goto(URL, wait_until="networkidle")
            sp.wait_for_timeout(2000)
            info["logo_header_visible"] = sp.locator("header img[alt='JE FIBER']").first.is_visible()
            sp.screenshot(path=os.path.join(OUT, "superwide_top.png"))
            sw.close()
        except Exception as e:
            errors.append(f"[superwide] {e}")

        browser.close()

    print("OUT_DIR:", OUT)
    print("INFO:", info)
    print("CONSOLE_ERRORS:", len(errors))
    for e in errors[:25]:
        print("  ", e)

if __name__ == "__main__":
    run()
