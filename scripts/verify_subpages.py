"""Verificação visual das subpáginas + hero novo + menu mobile (Playwright)."""
import os
from playwright.sync_api import sync_playwright

OUT = os.environ.get("SHOT_DIR", os.path.join(os.environ.get("TEMP", "/tmp"), "jefiber_sub"))
os.makedirs(OUT, exist_ok=True)
PORT = os.environ.get("APP_PORT", "3100")
BASE = f"http://localhost:{PORT}"

def run():
    errors = []
    info = {}
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, args=["--use-gl=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"])
        ctx = browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
        page = ctx.new_page()
        page.on("console", lambda m: errors.append(f"[console.error] {m.text}") if m.type == "error" else None)
        page.on("pageerror", lambda e: errors.append(f"[pageerror] {e}"))

        # Home — hero novo (foto de fundo + 3D)
        page.goto(BASE, wait_until="domcontentloaded"); page.wait_for_timeout(2800)
        page.screenshot(path=os.path.join(OUT, "home_hero.png"))
        # rodapé (cards menores)
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)"); page.wait_for_timeout(800)
        page.screenshot(path=os.path.join(OUT, "home_footer.png"))

        # Dropdown de produtos no header
        page.evaluate("window.scrollTo(0,0)"); page.wait_for_timeout(500)
        try:
            page.get_by_role("button", name="Produtos").hover(); page.wait_for_timeout(600)
            page.screenshot(path=os.path.join(OUT, "home_dropdown.png"))
        except Exception as e: errors.append(f"[dropdown] {e}")

        # Produto: reservatorios
        page.goto(f"{BASE}/produtos/reservatorios", wait_until="domcontentloaded"); page.wait_for_timeout(1200)
        info["produto_title"] = page.title()
        page.screenshot(path=os.path.join(OUT, "produto_reservatorios.png"), full_page=True)

        # Serviço: comporta
        page.goto(f"{BASE}/servicos/comporta", wait_until="domcontentloaded"); page.wait_for_timeout(1200)
        info["servico_title"] = page.title()
        page.screenshot(path=os.path.join(OUT, "servico_comporta.png"), full_page=True)

        # Downloads
        page.goto(f"{BASE}/downloads", wait_until="domcontentloaded"); page.wait_for_timeout(1000)
        info["downloads_title"] = page.title()
        info["pdf_links"] = page.locator("a[href$='.pdf']").count()
        page.screenshot(path=os.path.join(OUT, "downloads.png"), full_page=True)

        # Empresa
        page.goto(f"{BASE}/empresa", wait_until="domcontentloaded"); page.wait_for_timeout(1200)
        info["empresa_title"] = page.title()
        page.screenshot(path=os.path.join(OUT, "empresa.png"), full_page=True)
        ctx.close()

        # Mobile 390 — overflow + menu hambúrguer
        m = browser.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2, is_mobile=True)
        mp = m.new_page()
        mp.goto(BASE, wait_until="domcontentloaded"); mp.wait_for_timeout(1800)
        info["mobile_overflow_px"] = mp.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
        mp.screenshot(path=os.path.join(OUT, "mobile_hero.png"))
        try:
            mp.get_by_role("button", name="Abrir menu").click(); mp.wait_for_timeout(600)
            mp.screenshot(path=os.path.join(OUT, "mobile_menu.png"))
        except Exception as e: errors.append(f"[mobile-menu] {e}")
        # produto no mobile
        mp.goto(f"{BASE}/produtos/tubos", wait_until="domcontentloaded"); mp.wait_for_timeout(1000)
        info["mobile_produto_overflow_px"] = mp.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
        mp.screenshot(path=os.path.join(OUT, "mobile_produto.png"), full_page=True)
        m.close()

        # Superwide 2560
        sw = browser.new_context(viewport={"width": 2560, "height": 1080}, device_scale_factor=1)
        sp = sw.new_page()
        sp.goto(BASE, wait_until="domcontentloaded"); sp.wait_for_timeout(2000)
        info["logo_header_visible"] = sp.locator("header img[alt='JE FIBER']").first.is_visible()
        sp.screenshot(path=os.path.join(OUT, "superwide_hero.png"))
        sw.close()
        browser.close()

    print("OUT_DIR:", OUT)
    print("INFO:", info)
    print("CONSOLE_ERRORS:", len(errors))
    for e in errors[:25]:
        print("  ", e)

if __name__ == "__main__":
    run()
