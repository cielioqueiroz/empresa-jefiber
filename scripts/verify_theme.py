import os
from playwright.sync_api import sync_playwright
OUT = os.environ.get("SHOT_DIR", os.path.join(os.environ.get("TEMP", "/tmp"), "jefiber_theme"))
os.makedirs(OUT, exist_ok=True)
PORT = os.environ.get("APP_PORT", "3380"); BASE = f"http://localhost:{PORT}"

with sync_playwright() as p:
    b = p.chromium.launch(headless=True, args=["--use-gl=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"])
    errs = []
    pg = b.new_page(viewport={"width": 1440, "height": 900})
    pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
    pg.on("pageerror", lambda e: errs.append(str(e)))

    pg.goto(BASE, wait_until="domcontentloaded"); pg.wait_for_timeout(3000)
    pg.screenshot(path=os.path.join(OUT, "hero_dark.png"))            # hero (logo em ondas) escuro

    # alterna para tema claro
    pg.get_by_role("button", name="Tema claro").click(); pg.wait_for_timeout(900)
    pg.screenshot(path=os.path.join(OUT, "home_light.png"))
    # seção de conteúdo no claro
    pg.evaluate("document.querySelector('#solucoes')?.scrollIntoView()"); pg.wait_for_timeout(900)
    pg.screenshot(path=os.path.join(OUT, "solucoes_light.png"))
    pg.evaluate("document.querySelector('#contato')?.scrollIntoView()"); pg.wait_for_timeout(700)
    pg.screenshot(path=os.path.join(OUT, "contato_light.png"))

    # subpágina no claro (tema persiste via localStorage)
    pg.goto(f"{BASE}/empresa", wait_until="domcontentloaded"); pg.wait_for_timeout(1200)
    info_light = pg.evaluate("document.documentElement.classList.contains('light')")
    pg.screenshot(path=os.path.join(OUT, "empresa_light.png"), full_page=True)

    # teste: clicar na logo do header volta para a home
    pg.get_by_role("link", name="JE FIBER — voltar para a página inicial").first.click(); pg.wait_for_timeout(800)
    logo_url = pg.url

    # volta ao escuro e confirma persistência
    pg.get_by_role("button", name="Tema escuro").click(); pg.wait_for_timeout(500)
    dark_now = not pg.evaluate("document.documentElement.classList.contains('light')")

    print("light_persist_subpage:", info_light)
    print("logo_click_url:", logo_url)
    print("voltou_escuro:", dark_now)
    print("CONSOLE_ERRORS:", len(errs))
    for e in errs[:10]: print("  ", e[:120])
    b.close()
