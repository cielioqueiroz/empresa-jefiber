# Site Institucional JE FIBER — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir um site institucional one-page para a JE FIBER (fibra de vidro PRFV/RPVC) com hero 3D "filament winding", scroll cinematográfico e identidade do brandbook, pronto para apresentar ao dono.

**Architecture:** Next.js 15 (App Router) + TypeScript + Tailwind. Página única composta por seções isoladas em `components/sections/`. Animações com GSAP/ScrollTrigger (`useGSAP` para cleanup) e scroll suave com Lenis. Cena 3D só no Hero via React Three Fiber, carregada com `dynamic(ssr:false)`. Lógica pura (mensagem de contato, motion helper, constantes) testada com Vitest; o visual/3D é verificado por `next build` + Playwright.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 3.4, @react-three/fiber, @react-three/drei, @react-three/postprocessing, three, gsap, @gsap/react, lenis, Vitest + Testing Library.

**Convenções globais:**
- Design tokens centralizados: cores em CSS vars (`app/globals.css`) e espelhadas em `tailwind.config.ts`. Marinho `#010238`, vermelho `#FF0000` (só CTA/detalhe), branco.
- Fontes via `next/font/google`: Archivo (display), Manrope (corpo), IBM Plex Mono (mono).
- Todo componente com animação usa `useGSAP` (cleanup automático) e respeita `prefers-reduced-motion` via `lib/motion.ts`.
- Acervo-fonte em `assets/fotos/`; as fotos usadas são copiadas para `public/images/`.
- Commits frequentes, um por task.

---

## File Structure

```
app/
  layout.tsx          fontes, metadata/SEO, Lenis provider, CustomCursor, WhatsAppFloat
  page.tsx            composição das 8 seções
  globals.css         design tokens (CSS vars) + base Tailwind
components/
  layout/
    Header.tsx        nav fixo translúcido
    Footer.tsx        logo, navegação, redes
    WhatsAppFloat.tsx botão flutuante pulsante
    CustomCursor.tsx  cursor magnético (desktop)
    SmoothScroll.tsx  provider Lenis + sync ScrollTrigger
  sections/
    Hero.tsx  Sobre.tsx  Solucoes.tsx  Servicos.tsx
    Infraestrutura.tsx  Projetos.tsx  Contato.tsx
  three/
    HeroCanvas.tsx    <Canvas> + cena (dynamic, ssr:false)
    FiberTube.tsx     cilindro + filamentos enrolando (filament winding)
  ui/
    SectionLabel.tsx  RevealText.tsx  TiltCard.tsx
    Counter.tsx       TechRule.tsx
lib/
  constants.ts        contatos, redes, dados de seções, links wa.me/mailto
  contact.ts          buildWhatsappUrl / buildMailtoUrl (lógica pura, testada)
  motion.ts           prefersReducedMotion()
  useLenis.ts         (dentro de SmoothScroll) — sync com ScrollTrigger
public/images/        fotos otimizadas
test/                 *.test.ts (Vitest)
```

---

## Phase 0 — Scaffold do projeto

### Task 0.1: package.json + dependências

**Files:**
- Create: `package.json`

- [ ] **Step 1: Criar `package.json`**

```json
{
  "name": "jefiber-site",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run"
  },
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "three": "^0.171.0",
    "@react-three/fiber": "^9.0.0",
    "@react-three/drei": "^10.0.0",
    "@react-three/postprocessing": "^3.0.0",
    "gsap": "^3.12.5",
    "@gsap/react": "^2.1.1",
    "lenis": "^1.1.18"
  },
  "devDependencies": {
    "typescript": "^5.7.0",
    "@types/node": "^22.10.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@types/three": "^0.171.0",
    "tailwindcss": "^3.4.17",
    "postcss": "^8.4.49",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.17.0",
    "eslint-config-next": "^15.1.0",
    "vitest": "^2.1.8",
    "@testing-library/react": "^16.1.0",
    "@testing-library/jest-dom": "^6.6.3",
    "jsdom": "^25.0.1"
  }
}
```

- [ ] **Step 2: Instalar**

Run: `npm install`
Expected: instala sem erros de peer (React 19 + R3F 9 são compatíveis). Se houver conflito de peer com `@react-three/postprocessing`, reexecutar com `npm install --legacy-peer-deps` e anotar.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: scaffold package.json e dependencias"
```

### Task 0.2: Configs (TS, Next, Tailwind, PostCSS, ESLint)

**Files:**
- Create: `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `postcss.config.mjs`, `.eslintrc.json`

- [ ] **Step 1: `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 2: `next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
};
export default nextConfig;
```

- [ ] **Step 3: `tailwind.config.ts`**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        marinho: "#010238",
        "marinho-2": "#0a0c4a",
        papoula: "#FF0000",
        branco: "#FFFFFF",
      },
      fontFamily: {
        display: ["var(--font-archivo)", "system-ui", "sans-serif"],
        body: ["var(--font-manrope)", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 4: `postcss.config.mjs`**

```js
export default { plugins: { tailwindcss: {}, autoprefixer: {} } };
```

- [ ] **Step 5: `.eslintrc.json`**

```json
{ "extends": "next/core-web-vitals" }
```

- [ ] **Step 6: Commit**

```bash
git add tsconfig.json next.config.mjs tailwind.config.ts postcss.config.mjs .eslintrc.json
git commit -m "chore: configs do Next, TypeScript, Tailwind e ESLint"
```

### Task 0.3: Tokens, fontes e shell mínimo (app roda)

**Files:**
- Create: `app/globals.css`, `app/layout.tsx`, `app/page.tsx`

- [ ] **Step 1: `app/globals.css`** (tokens + base)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --marinho: #010238;
  --marinho-2: #0a0c4a;
  --papoula: #ff0000;
  --branco: #ffffff;
}

html { scroll-behavior: auto; } /* Lenis controla o scroll */
body {
  background: var(--marinho);
  color: var(--branco);
  font-family: var(--font-manrope), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

.font-display { font-family: var(--font-archivo), sans-serif; }
.font-mono-tech { font-family: var(--font-plex-mono), monospace; letter-spacing: .12em; }

/* Régua técnica reutilizável */
.tech-line { background: linear-gradient(90deg, transparent, rgba(255,255,255,.25), transparent); height: 1px; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .001ms !important; transition-duration: .001ms !important; }
}
```

- [ ] **Step 2: `app/layout.tsx`** (fontes + metadata; providers entram em fases seguintes)

```tsx
import type { Metadata } from "next";
import { Archivo, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], weight: ["700", "800", "900"], variable: "--font-archivo" });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-manrope" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono" });

export const metadata: Metadata = {
  title: "JE FIBER — Produtos em fibra de vidro PRFV/RPVC",
  description: "Tecnologia e qualidade na fabricação e manutenção de produtos em fibra de vidro. Reservatórios, tubos, conexões e estações de tratamento (ETA/ETE).",
  openGraph: {
    title: "JE FIBER — Produtos em fibra de vidro",
    description: "+15 anos em PRFV/RPVC para saneamento, químico e alimentício.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${manrope.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: `app/page.tsx`** (placeholder que prova que roda)

```tsx
export default function Home() {
  return (
    <main>
      <section className="flex min-h-screen items-center justify-center">
        <h1 className="font-display text-5xl font-extrabold uppercase tracking-tight">JE FIBER</h1>
      </section>
    </main>
  );
}
```

- [ ] **Step 4: Rodar dev e verificar**

Run: `npm run dev` e abrir `http://localhost:3000`
Expected: fundo marinho, "JE FIBER" branco em Archivo, sem erros no console.

- [ ] **Step 5: Verificar build**

Run: `npm run build`
Expected: build OK (compiled successfully).

- [ ] **Step 6: Commit**

```bash
git add app next-env.d.ts
git commit -m "feat: tokens da marca, fontes e shell inicial do site"
```

### Task 0.4: Copiar fotos para public/images

**Files:**
- Create: `public/images/*` (cópias de `assets/fotos/`)

- [ ] **Step 1: Copiar (PowerShell)**

```powershell
New-Item -ItemType Directory -Force public\images | Out-Null
Copy-Item "assets\fotos\*.png" "public\images\"
Copy-Item "assets\marca\logo-jefiber.png" "public\images\logo-jefiber.png"
```

- [ ] **Step 2: Verificar**

Run: `Get-ChildItem public\images | Measure-Object`
Expected: 33 arquivos (32 fotos + logo).

- [ ] **Step 3: Commit**

```bash
git add public/images
git commit -m "chore: copia fotos da empresa para public/images"
```

---

## Phase 1 — Lógica pura (TDD com Vitest)

### Task 1.1: Configurar Vitest

**Files:**
- Create: `vitest.config.ts`, `test/setup.ts`

- [ ] **Step 1: `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: { environment: "jsdom", globals: true, setupFiles: ["./test/setup.ts"] },
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
});
```

- [ ] **Step 2: `test/setup.ts`**

```ts
import "@testing-library/jest-dom";
```

- [ ] **Step 3: Commit**

```bash
git add vitest.config.ts test/setup.ts
git commit -m "test: configura Vitest + jsdom"
```

### Task 1.2: `lib/contact.ts` — builders de WhatsApp/mailto (TDD)

**Files:**
- Test: `test/contact.test.ts`
- Create: `lib/contact.ts`

- [ ] **Step 1: Escrever o teste que falha**

```ts
import { describe, it, expect } from "vitest";
import { buildWhatsappUrl, buildMailtoUrl } from "@/lib/contact";

const form = { nome: "Maria", telefone: "19999999999", email: "m@x.com", mensagem: "Olá & cia" };

describe("contact builders", () => {
  it("monta url do whatsapp com mensagem codificada", () => {
    const url = buildWhatsappUrl(form, "5519996063421");
    expect(url.startsWith("https://wa.me/5519996063421?text=")).toBe(true);
    expect(url).toContain("Maria");
    expect(url).toContain("%26"); // & codificado
    expect(url).not.toContain(" "); // sem espaços crus
  });

  it("monta mailto com subject e body", () => {
    const url = buildMailtoUrl(form, "comercial@jefiber.com.br");
    expect(url.startsWith("mailto:comercial@jefiber.com.br?")).toBe(true);
    expect(url).toContain("subject=");
    expect(url).toContain("body=");
    expect(url).toContain("m%40x.com");
  });
});
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `npx vitest run test/contact.test.ts`
Expected: FAIL ("Cannot find module '@/lib/contact'").

- [ ] **Step 3: Implementar `lib/contact.ts`**

```ts
export type ContactForm = { nome: string; telefone: string; email: string; mensagem: string };

function corpo(f: ContactForm): string {
  return [
    `Nome: ${f.nome}`,
    `Telefone: ${f.telefone}`,
    `E-mail: ${f.email}`,
    "",
    f.mensagem,
  ].join("\n");
}

export function buildWhatsappUrl(f: ContactForm, phone: string): string {
  const text = `Olá! Vim pelo site.\n\n${corpo(f)}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function buildMailtoUrl(f: ContactForm, to: string): string {
  const subject = encodeURIComponent(`Contato do site — ${f.nome}`);
  const body = encodeURIComponent(corpo(f));
  return `mailto:${to}?subject=${subject}&body=${body}`;
}
```

- [ ] **Step 4: Rodar e ver passar**

Run: `npx vitest run test/contact.test.ts`
Expected: PASS (2 testes).

- [ ] **Step 5: Commit**

```bash
git add lib/contact.ts test/contact.test.ts
git commit -m "feat: builders de URL para WhatsApp e mailto (TDD)"
```

### Task 1.3: `lib/motion.ts` — prefers-reduced-motion (TDD)

**Files:**
- Test: `test/motion.test.ts`
- Create: `lib/motion.ts`

- [ ] **Step 1: Teste que falha**

```ts
import { describe, it, expect, vi } from "vitest";
import { prefersReducedMotion } from "@/lib/motion";

describe("prefersReducedMotion", () => {
  it("retorna true quando o matchMedia bate", () => {
    vi.stubGlobal("matchMedia", () => ({ matches: true }));
    expect(prefersReducedMotion()).toBe(true);
  });
  it("retorna false quando não bate", () => {
    vi.stubGlobal("matchMedia", () => ({ matches: false }));
    expect(prefersReducedMotion()).toBe(false);
  });
});
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `npx vitest run test/motion.test.ts`
Expected: FAIL (módulo não existe).

- [ ] **Step 3: Implementar `lib/motion.ts`**

```ts
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
```

- [ ] **Step 4: Rodar e ver passar**

Run: `npx vitest run test/motion.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/motion.ts test/motion.test.ts
git commit -m "feat: helper prefersReducedMotion (TDD)"
```

### Task 1.4: `lib/constants.ts` — dados centrais (TDD de integridade)

**Files:**
- Test: `test/constants.test.ts`
- Create: `lib/constants.ts`

- [ ] **Step 1: Teste que falha**

```ts
import { describe, it, expect } from "vitest";
import { CONTATO, REDES, SOLUCOES, NAV } from "@/lib/constants";

describe("constants", () => {
  it("tem telefone do whatsapp só com dígitos", () => {
    expect(CONTATO.whatsapp).toMatch(/^\d{12,13}$/);
  });
  it("tem 4 soluções com imagem e título", () => {
    expect(SOLUCOES).toHaveLength(4);
    for (const s of SOLUCOES) {
      expect(s.titulo.length).toBeGreaterThan(0);
      expect(s.imagem.startsWith("/images/")).toBe(true);
    }
  });
  it("tem 3 redes sociais e itens de nav", () => {
    expect(REDES).toHaveLength(3);
    expect(NAV.length).toBeGreaterThanOrEqual(5);
  });
});
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `npx vitest run test/constants.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implementar `lib/constants.ts`**

```ts
export const CONTATO = {
  whatsapp: "5519996063421",
  whatsappLabel: "+55 19 99606-3421",
  telefones: ["(19) 3537-1777", "(19) 3537-1786"],
  email: "comercial@jefiber.com.br",
  endereco: "Estrada Municipal do Biri (IPN-463), nº 230, Mini Distrito Industrial III, Ipeúna/SP, CEP 13.537-000",
  enderecoCurto: "Estrada Municipal do Biri, nº 230 — Ipeúna/SP",
};

export const REDES = [
  { nome: "Instagram", url: "https://www.instagram.com/je.fiber/" },
  { nome: "LinkedIn", url: "https://www.linkedin.com/in/je-fiber-7b956b140/" },
  { nome: "Facebook", url: "https://www.facebook.com/jefiber/" },
] as const;

export const NAV = [
  { label: "Sobre", href: "#sobre" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Serviços", href: "#servicos" },
  { label: "Infraestrutura", href: "#infraestrutura" },
  { label: "Projetos", href: "#projetos" },
  { label: "Contato", href: "#contato" },
] as const;

export type Solucao = {
  id: string; titulo: string; imagem: string; resumo: string;
  funcoes: string; fabricacao: string; manutencao: string;
};

export const SOLUCOES: Solucao[] = [
  {
    id: "tubos", titulo: "Tubos e conexões RPVC / PRFV", imagem: "/images/jeFiber_16.png",
    resumo: "Tubulação de alta resistência química e mecânica para adução e transporte.",
    funcoes: "Adução de água bruta/tratada, efluentes e fluidos químicos; alta resistência à corrosão.",
    fabricacao: "Enrolamento filamentar (filament winding) e laminação, sob medida por diâmetro e pressão.",
    manutencao: "Reparo laminado, inspeção e substituição de trechos com mínima parada operacional.",
  },
  {
    id: "reservatorios", titulo: "Reservatórios PRFV", imagem: "/images/jeFiber_10.png",
    resumo: "Reservatórios verticais e horizontais para água e produtos químicos.",
    funcoes: "Armazenamento de água potável, efluentes e produtos químicos; longa vida útil.",
    fabricacao: "Corpo em PRFV por enrolamento, com bocais, escadas e acessórios sob projeto.",
    manutencao: "Recuperação de paredes, bocais e revestimento interno; laudo de integridade.",
  },
  {
    id: "eta", titulo: "Estações de Tratamento de Água (ETA)", imagem: "/images/jeFiber_08.png",
    resumo: "Soluções completas em PRFV para tratamento de água.",
    funcoes: "Floculação, decantação e filtração em módulos de fibra resistentes à corrosão.",
    fabricacao: "Tanques e tubulações em PRFV integrados ao processo da estação.",
    manutencao: "Manutenção preventiva e corretiva dos módulos e tubulações.",
  },
  {
    id: "ete", titulo: "Estações de Tratamento de Esgoto (ETE)", imagem: "/images/jeFiber_14.png",
    resumo: "Tratamento de efluentes com equipamentos em fibra de vidro.",
    funcoes: "Tratamento biológico e físico-químico de efluentes; resistência a meios agressivos.",
    fabricacao: "Reatores, tanques e tubulações PRFV dimensionados por vazão.",
    manutencao: "Inspeção, reparo e modernização de unidades existentes.",
  },
];

export const VALORES = ["Qualidade", "Segurança", "Experiência", "Excelência", "Comprometimento"] as const;

// TODO: confirmar números reais com o cliente
export const NUMEROS = [
  { valor: 15, sufixo: "+", label: "anos de jornada de excelência" },
  { valor: 100, sufixo: "+", label: "projetos entregues" }, // TODO placeholder
  { valor: 3, sufixo: "", label: "setores atendidos" },
] as const;
```

- [ ] **Step 4: Rodar e ver passar**

Run: `npx vitest run test/constants.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/constants.ts test/constants.test.ts
git commit -m "feat: constantes centrais (contato, redes, solucoes, numeros)"
```

---

## Phase 2 — Shell de layout (Header, Footer, WhatsApp, scroll suave, cursor)

### Task 2.1: SmoothScroll (Lenis) + sync ScrollTrigger

**Files:**
- Create: `components/layout/SmoothScroll.tsx`
- Modify: `app/layout.tsx` (envolver children)

- [ ] **Step 1: `components/layout/SmoothScroll.tsx`**

```tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t: number) => { lenis.raf(t); requestAnimationFrame(raf); };
    const id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);
  return <>{children}</>;
}
```

- [ ] **Step 2: Envolver em `app/layout.tsx`**

Modificar o `<body>` para:

```tsx
import SmoothScroll from "@/components/layout/SmoothScroll";
// ...
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
```

- [ ] **Step 3: Verificar**

Run: `npm run dev` — rolar a página (após termos conteúdo alto). Por ora confirmar que não quebra (`npm run build`).
Expected: build OK.

- [ ] **Step 4: Commit**

```bash
git add components/layout/SmoothScroll.tsx app/layout.tsx
git commit -m "feat: scroll suave com Lenis sincronizado ao ScrollTrigger"
```

### Task 2.2: Header

**Files:**
- Create: `components/layout/Header.tsx`
- Modify: `app/page.tsx` (renderizar `<Header/>`)

- [ ] **Step 1: `components/layout/Header.tsx`**

```tsx
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/constants";

export default function Header() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid ? "bg-marinho/90 backdrop-blur border-b border-white/10" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#topo" aria-label="JE FIBER — início" className="relative h-8 w-32">
          <Image src="/images/logo-jefiber.png" alt="JE FIBER" fill className="object-contain object-left" priority />
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="font-mono-tech text-xs uppercase text-white/80 transition-colors hover:text-white">{n.label}</a>
          ))}
        </nav>
        <a href="#contato" className="rounded-sm bg-papoula px-4 py-2 font-body text-xs font-bold uppercase tracking-wide text-white transition-transform hover:scale-105">Fale conosco</a>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Renderizar em `app/page.tsx`**

```tsx
import Header from "@/components/layout/Header";
// dentro de <main>, antes das seções:
<Header />
<section id="topo" className="flex min-h-screen items-center justify-center">
  <h1 className="font-display text-5xl font-extrabold uppercase tracking-tight">JE FIBER</h1>
</section>
```

- [ ] **Step 3: Verificar**

Run: `npm run dev` — header transparente no topo, fica sólido ao rolar; logo e nav visíveis.
Expected: sem erros; nav âncora rola para seções (quando existirem).

- [ ] **Step 4: Commit**

```bash
git add components/layout/Header.tsx app/page.tsx
git commit -m "feat: header fixo com logo, navegacao e CTA"
```

### Task 2.3: WhatsAppFloat

**Files:**
- Create: `components/layout/WhatsAppFloat.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: `components/layout/WhatsAppFloat.tsx`**

```tsx
import { CONTATO } from "@/lib/constants";

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${CONTATO.whatsapp}`}
      target="_blank" rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] shadow-lg motion-safe:animate-pulse"
    >
      <svg viewBox="0 0 24 24" width="28" height="28" fill="white" aria-hidden="true">
        <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.34 4.95L2 22l5.2-1.36a9.9 9.9 0 0 0 4.84 1.24h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.8 14.18c-.25.7-1.45 1.34-2 1.42-.51.08-1.16.11-1.87-.12-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.9-4.27-5.05-4.47-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.59-.37.79-.37.2 0 .39 0 .56.01.18.01.42-.07.66.5.25.59.84 2.04.91 2.19.07.15.12.32.02.52-.1.2-.15.32-.3.49-.15.17-.31.39-.45.52-.15.15-.3.31-.13.6.17.3.77 1.27 1.65 2.05 1.14 1.02 2.1 1.33 2.4 1.48.3.15.47.12.64-.07.17-.2.74-.86.94-1.16.2-.3.4-.25.66-.15.27.1 1.7.8 1.99.95.3.15.5.22.57.34.07.13.07.7-.18 1.4Z"/>
      </svg>
    </a>
  );
}
```

- [ ] **Step 2: Renderizar em `app/layout.tsx`** dentro de `<SmoothScroll>` (depois de `{children}`)

```tsx
<SmoothScroll>
  {children}
  <WhatsAppFloat />
</SmoothScroll>
```
(import no topo: `import WhatsAppFloat from "@/components/layout/WhatsAppFloat";`)

- [ ] **Step 3: Verificar** — botão verde flutuante pulsando no canto inferior direito; clique abre `wa.me`.

- [ ] **Step 4: Commit**

```bash
git add components/layout/WhatsAppFloat.tsx app/layout.tsx
git commit -m "feat: botao flutuante de WhatsApp pulsante"
```

### Task 2.4: Footer

**Files:**
- Create: `components/layout/Footer.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: `components/layout/Footer.tsx`**

```tsx
import Image from "next/image";
import { CONTATO, REDES, NAV } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-marinho">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <div className="relative mb-4 h-9 w-36"><Image src="/images/logo-jefiber.png" alt="JE FIBER" fill className="object-contain object-left" /></div>
          <p className="max-w-xs font-body text-sm text-white/70">Tecnologia e qualidade na fabricação e manutenção de produtos em fibra de vidro.</p>
        </div>
        <nav className="flex flex-col gap-2">
          <span className="font-mono-tech mb-2 text-xs uppercase text-papoula">Navegação</span>
          {NAV.map((n) => <a key={n.href} href={n.href} className="font-body text-sm text-white/80 hover:text-white">{n.label}</a>)}
        </nav>
        <div className="flex flex-col gap-2">
          <span className="font-mono-tech mb-2 text-xs uppercase text-papoula">Contato</span>
          {CONTATO.telefones.map((t) => <span key={t} className="font-body text-sm text-white/80">{t}</span>)}
          <a href={`mailto:${CONTATO.email}`} className="font-body text-sm text-white/80 hover:text-white">{CONTATO.email}</a>
          <span className="font-body text-sm text-white/60">{CONTATO.enderecoCurto}</span>
          <div className="mt-3 flex gap-4">
            {REDES.map((r) => <a key={r.nome} href={r.url} target="_blank" rel="noopener noreferrer" className="font-mono-tech text-xs uppercase text-white/70 hover:text-white">{r.nome}</a>)}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center font-mono-tech text-[11px] uppercase tracking-wider text-white/40">© {new Date().getFullYear()} JE FIBER · Ipeúna/SP</div>
    </footer>
  );
}
```

- [ ] **Step 2: Renderizar em `app/page.tsx`** ao final do `<main>`: `<Footer />` (com import).

- [ ] **Step 3: Verificar** — rodapé com logo, navegação e contatos; links de redes abrem em nova aba.

- [ ] **Step 4: Commit**

```bash
git add components/layout/Footer.tsx app/page.tsx
git commit -m "feat: rodape com logo, navegacao, contato e redes"
```

---

## Phase 3 — Primitivos de UI/animação

### Task 3.1: SectionLabel + TechRule

**Files:**
- Create: `components/ui/SectionLabel.tsx`, `components/ui/TechRule.tsx`

- [ ] **Step 1: `components/ui/SectionLabel.tsx`**

```tsx
export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="h-3 w-1 bg-papoula" />
      <span className="font-mono-tech text-xs uppercase text-papoula">{children}</span>
    </div>
  );
}
```

- [ ] **Step 2: `components/ui/TechRule.tsx`** (linha que se desenha ao entrar na viewport)

```tsx
"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function TechRule({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(ref.current, { scaleX: 0 }, {
      scaleX: 1, transformOrigin: "left", ease: "power2.out", duration: 1,
      scrollTrigger: { trigger: ref.current, start: "top 85%" },
    });
  }, { scope: ref });
  return <div ref={ref} className={`tech-line w-full ${className}`} />;
}
```

- [ ] **Step 3: Verificar build** — `npm run build` OK.

- [ ] **Step 4: Commit**

```bash
git add components/ui/SectionLabel.tsx components/ui/TechRule.tsx
git commit -m "feat: primitivos SectionLabel e TechRule (linha que se desenha)"
```

### Task 3.2: RevealText (revelação por linha)

**Files:**
- Create: `components/ui/RevealText.tsx`

> Sem dependência paga: dividimos por palavra/linha manualmente (sem o plugin SplitText premium). Cada palavra entra com fade+rise.

- [ ] **Step 1: `components/ui/RevealText.tsx`**

```tsx
"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = { text: string; as?: "h2" | "h3" | "p"; className?: string };

export default function RevealText({ text, as = "h2", className = "" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as React.ElementType;
  const words = text.split(" ");
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const els = ref.current!.querySelectorAll(".rw");
    gsap.fromTo(els, { yPercent: 110, opacity: 0 }, {
      yPercent: 0, opacity: 1, stagger: 0.05, ease: "power3.out", duration: 0.8,
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
    });
  }, { scope: ref });
  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span className="rw inline-block">{w}&nbsp;</span>
        </span>
      ))}
    </Tag>
  );
}
```

- [ ] **Step 2: Verificar build** — `npm run build` OK.

- [ ] **Step 3: Commit**

```bash
git add components/ui/RevealText.tsx
git commit -m "feat: RevealText com revelacao por palavra (sem plugin pago)"
```

### Task 3.3: TiltCard

**Files:**
- Create: `components/ui/TiltCard.tsx`

- [ ] **Step 1: `components/ui/TiltCard.tsx`**

```tsx
"use client";
import { useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

export default function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={reset}
      className={`transition-transform duration-200 will-change-transform ${className}`}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Verificar build** — OK.

- [ ] **Step 3: Commit**

```bash
git add components/ui/TiltCard.tsx
git commit -m "feat: TiltCard com inclinacao 3D seguindo o mouse"
```

### Task 3.4: Counter (números que contam)

**Files:**
- Create: `components/ui/Counter.tsx`

- [ ] **Step 1: `components/ui/Counter.tsx`**

```tsx
"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Counter({ to, suffix = "", label }: { to: number; suffix?: string; label: string }) {
  const numRef = useRef<HTMLSpanElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const node = numRef.current!;
    if (prefersReducedMotion()) { node.textContent = `${to}${suffix}`; return; }
    const obj = { v: 0 };
    gsap.to(obj, {
      v: to, duration: 1.6, ease: "power1.out",
      onUpdate: () => { node.textContent = `${Math.round(obj.v)}${suffix}`; },
      scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
    });
  }, { scope: ref });
  return (
    <div ref={ref} className="text-center">
      <span ref={numRef} className="font-display text-5xl font-extrabold text-white">0{suffix}</span>
      <p className="font-mono-tech mt-2 text-xs uppercase text-white/60">{label}</p>
    </div>
  );
}
```

- [ ] **Step 2: Verificar build** — OK.

- [ ] **Step 3: Commit**

```bash
git add components/ui/Counter.tsx
git commit -m "feat: Counter animado por scroll"
```

### Task 3.5: CustomCursor (magnético, desktop)

**Files:**
- Create: `components/layout/CustomCursor.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: `components/layout/CustomCursor.tsx`**

```tsx
"use client";
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReducedMotion() || window.matchMedia("(pointer: coarse)").matches) return;
    const el = dot.current!;
    let x = 0, y = 0, tx = 0, ty = 0;
    const move = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const interactive = (e: MouseEvent) =>
      el.classList.toggle("cursor-grow", !!(e.target as HTMLElement).closest("a,button,[data-cursor]"));
    let raf = 0;
    const loop = () => {
      x += (tx - x) * 0.2; y += (ty - y) * 0.2;
      el.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", interactive);
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", interactive); };
  }, []);
  return <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[60] -ml-3 -mt-3 hidden h-6 w-6 rounded-full border border-papoula/80 mix-blend-difference transition-[width,height] duration-200 md:block [&.cursor-grow]:h-10 [&.cursor-grow]:w-10" />;
}
```

- [ ] **Step 2: Renderizar em `app/layout.tsx`** dentro de `<SmoothScroll>` (antes de `{children}`), com import. Adicionar `cursor: none` no `body` apenas em `@media (pointer:fine)` no `globals.css`:

```css
@media (pointer: fine) and (prefers-reduced-motion: no-preference) {
  body { cursor: none; }
}
```

- [ ] **Step 3: Verificar** — anel segue o mouse e cresce sobre links/botões; em touch não aparece.

- [ ] **Step 4: Commit**

```bash
git add components/layout/CustomCursor.tsx app/layout.tsx app/globals.css
git commit -m "feat: cursor customizado magnetico (desktop)"
```

---

## Phase 4 — Seções de conteúdo (sem 3D ainda; hero estático provisório)

### Task 4.1: Hero (versão estática com fundo de fibra)

**Files:**
- Create: `components/sections/Hero.tsx`
- Modify: `app/page.tsx`

> O `<HeroCanvas/>` 3D entra na Phase 5; aqui o hero já fica completo com fundo marinho texturizado (CSS) e a headline. O ponto de montagem do canvas fica pronto.

- [ ] **Step 1: `components/sections/Hero.tsx`**

```tsx
import RevealText from "@/components/ui/RevealText";

export default function Hero() {
  return (
    <section id="topo" className="relative flex min-h-screen items-center overflow-hidden">
      {/* fundo: textura de fibra via gradiente + leve ruído */}
      <div className="absolute inset-0 -z-10 bg-marinho">
        <div className="absolute inset-0 opacity-[0.15] [background:repeating-linear-gradient(115deg,transparent_0_6px,rgba(255,255,255,.6)_6px_7px)]" />
        <div className="absolute inset-0 [background:radial-gradient(80%_60%_at_70%_40%,rgba(10,12,74,.9),#010238)]" />
      </div>
      {/* slot do canvas 3D (preenchido na Phase 5) */}
      <div id="hero-canvas-slot" className="absolute inset-0 -z-10" />

      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="flex items-stretch gap-5">
          <span className="mt-2 w-1.5 shrink-0 bg-papoula" />
          <div className="max-w-3xl">
            <p className="font-mono-tech mb-5 text-xs uppercase text-white/70">+15 anos · PRFV / RPVC · Ipeúna/SP</p>
            <RevealText as="h1" text="TECNOLOGIA E QUALIDADE NA FABRICAÇÃO E MANUTENÇÃO"
              className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl" />
            <p className="mt-6 max-w-xl font-body text-base text-white/75 sm:text-lg">
              Produtos em fibra de vidro (PRFV/RPVC) com engenharia avançada para os setores de saneamento, químico e alimentício.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contato" data-cursor className="rounded-sm bg-papoula px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-white transition-transform hover:scale-105">Fale conosco</a>
              <a href="#solucoes" data-cursor className="rounded-sm border border-white/30 px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-white/90 hover:border-white">Ver soluções</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Em `app/page.tsx`** substituir a seção placeholder `#topo` por `<Hero />` (import).

- [ ] **Step 3: Verificar** — hero ocupa a tela, headline grande revela ao carregar, CTAs funcionam.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Hero.tsx app/page.tsx
git commit -m "feat: secao Hero (versao estatica, slot do canvas pronto)"
```

### Task 4.2: Sobre

**Files:**
- Create: `components/sections/Sobre.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: `components/sections/Sobre.tsx`**

```tsx
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import RevealText from "@/components/ui/RevealText";
import TechRule from "@/components/ui/TechRule";
import Counter from "@/components/ui/Counter";
import { VALORES, NUMEROS } from "@/lib/constants";

export default function Sobre() {
  return (
    <section id="sobre" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionLabel>Sobre a JE FIBER</SectionLabel>
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <RevealText as="h2" text="Uma jornada de excelência em fibra de vidro"
            className="font-display text-3xl font-extrabold uppercase leading-tight text-white sm:text-4xl" />
          <p className="mt-6 font-body text-white/75">
            Há mais de 15 anos, a JE FIBER projeta, fabrica e mantém produtos em PRFV/RPVC com tecnologia e engenharia de ponta — reservatórios, tubos, conexões e estações de tratamento de água e esgoto.
          </p>
          <p className="mt-4 font-body text-white/70">
            Atendemos os setores de saneamento, químico e alimentício, com soluções sob medida e foco em durabilidade, segurança e desempenho.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {VALORES.map((v) => (
              <li key={v} className="font-mono-tech rounded-sm border border-white/15 px-3 py-1 text-xs uppercase text-white/80">{v}</li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-md">
          <Image src="/images/jeFiber_27.png" alt="Engenheiros analisando o projeto técnico" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
        </div>
      </div>
      <TechRule className="my-16" />
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
        {NUMEROS.map((n) => <Counter key={n.label} to={n.valor} suffix={n.sufixo} label={n.label} />)}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Em `app/page.tsx`** adicionar `<Sobre />` após `<Hero />`.

- [ ] **Step 3: Verificar** — texto revela, contadores animam ao entrar, imagem carrega.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Sobre.tsx app/page.tsx
git commit -m "feat: secao Sobre com valores e contadores"
```

### Task 4.3: Soluções (cards com tilt + hover preview)

**Files:**
- Create: `components/sections/Solucoes.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: `components/sections/Solucoes.tsx`**

```tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import TiltCard from "@/components/ui/TiltCard";
import { SOLUCOES } from "@/lib/constants";

export default function Solucoes() {
  const [aberto, setAberto] = useState<string | null>(null);
  return (
    <section id="solucoes" className="bg-marinho-2/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>Soluções</SectionLabel>
        <h2 className="mb-12 max-w-2xl font-display text-3xl font-extrabold uppercase leading-tight text-white sm:text-4xl">
          Engenharia em fibra de vidro de ponta a ponta
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {SOLUCOES.map((s) => {
            const open = aberto === s.id;
            return (
              <TiltCard key={s.id} className="group">
                <div className="overflow-hidden rounded-md border border-white/10 bg-marinho">
                  <div className="relative h-52 overflow-hidden">
                    <Image src={s.imagem} alt={s.titulo} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:640px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-marinho via-marinho/30 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold uppercase text-white">{s.titulo}</h3>
                    <p className="mt-2 font-body text-sm text-white/70">{s.resumo}</p>
                    <button data-cursor onClick={() => setAberto(open ? null : s.id)}
                      className="font-mono-tech mt-4 text-xs uppercase text-papoula hover:underline">
                      {open ? "Fechar −" : "Detalhes +"}
                    </button>
                    {open && (
                      <dl className="mt-4 space-y-3 border-t border-white/10 pt-4">
                        <div><dt className="font-mono-tech text-xs uppercase text-white/50">Funções / Aplicações</dt><dd className="font-body text-sm text-white/80">{s.funcoes}</dd></div>
                        <div><dt className="font-mono-tech text-xs uppercase text-white/50">Fabricação</dt><dd className="font-body text-sm text-white/80">{s.fabricacao}</dd></div>
                        <div><dt className="font-mono-tech text-xs uppercase text-white/50">Manutenção</dt><dd className="font-body text-sm text-white/80">{s.manutencao}</dd></div>
                      </dl>
                    )}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Em `app/page.tsx`** adicionar `<Solucoes />`.

- [ ] **Step 3: Verificar** — 4 cards inclinam com o mouse; "Detalhes +" expande Funções/Fabricação/Manutenção.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Solucoes.tsx app/page.tsx
git commit -m "feat: secao Solucoes com cards tilt e detalhes expansiveis"
```

### Task 4.4: Serviços

**Files:**
- Create: `components/sections/Servicos.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: `components/sections/Servicos.tsx`**

```tsx
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";

const ITENS = [
  { titulo: "Fabricação", img: "/images/jeFiber_26.png", desc: "Produção de tubos, conexões e reservatórios por enrolamento filamentar e laminação, sob projeto." },
  { titulo: "Instalação", img: "/images/jeFiber_17.png", desc: "Logística, içamento e montagem em campo com equipe técnica e equipamentos próprios." },
  { titulo: "Manutenção", img: "/images/jeFiber_03.png", desc: "Inspeção, reparo laminado e recuperação de estruturas em PRFV com mínima parada." },
];

export default function Servicos() {
  return (
    <section id="servicos" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionLabel>Serviços</SectionLabel>
      <h2 className="mb-12 max-w-2xl font-display text-3xl font-extrabold uppercase leading-tight text-white sm:text-4xl">
        Da fabricação à manutenção em campo
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {ITENS.map((it) => (
          <article key={it.titulo} className="overflow-hidden rounded-md border border-white/10">
            <div className="relative h-48"><Image src={it.img} alt={it.titulo} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" /></div>
            <div className="p-6">
              <h3 className="font-display text-lg font-bold uppercase text-white">{it.titulo}</h3>
              <p className="mt-2 font-body text-sm text-white/70">{it.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Em `app/page.tsx`** adicionar `<Servicos />`.

- [ ] **Step 3: Verificar** — 3 cartões de serviço com imagens.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Servicos.tsx app/page.tsx
git commit -m "feat: secao Servicos (fabricacao, instalacao, manutencao)"
```

### Task 4.5: Infraestrutura (galeria com parallax)

**Files:**
- Create: `components/sections/Infraestrutura.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: `components/sections/Infraestrutura.tsx`**

```tsx
"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FOTOS = [
  { src: "/images/jeFiber_29.png", alt: "Vista aérea da fábrica e pátio de tanques", span: "md:col-span-2 md:row-span-2" },
  { src: "/images/jeFiber_11.png", alt: "Fachada da fábrica JE FIBER", span: "" },
  { src: "/images/jeFiber_26.png", alt: "Interior do galpão de produção", span: "" },
  { src: "/images/jeFiber_13.png", alt: "Vista aérea lateral da unidade", span: "" },
];

export default function Infraestrutura() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.utils.toArray<HTMLElement>(".parallax-img").forEach((el) => {
      gsap.fromTo(el, { yPercent: -8 }, { yPercent: 8, ease: "none",
        scrollTrigger: { trigger: el, scrub: true, start: "top bottom", end: "bottom top" } });
    });
  }, { scope: ref });
  return (
    <section id="infraestrutura" ref={ref} className="bg-marinho-2/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionLabel>Infraestrutura</SectionLabel>
        <h2 className="mb-12 max-w-2xl font-display text-3xl font-extrabold uppercase leading-tight text-white sm:text-4xl">
          Estrutura industrial preparada para grandes obras
        </h2>
        <div className="grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-4">
          {FOTOS.map((f) => (
            <div key={f.src} className={`relative overflow-hidden rounded-md ${f.span}`}>
              <Image src={f.src} alt={f.alt} fill className="parallax-img scale-110 object-cover" sizes="50vw" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Em `app/page.tsx`** adicionar `<Infraestrutura />`.

- [ ] **Step 3: Verificar** — grade de fotos com leve parallax ao rolar.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Infraestrutura.tsx app/page.tsx
git commit -m "feat: secao Infraestrutura com galeria e parallax"
```

### Task 4.6: Projetos & Clientes (scroll horizontal pinado)

**Files:**
- Create: `components/sections/Projetos.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: `components/sections/Projetos.tsx`**

```tsx
"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLabel from "@/components/ui/SectionLabel";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SLIDES = [
  { src: "/images/jeFiber_17.png", titulo: "Reservatório Sanepar", desc: "Içamento e instalação de reservatório PRFV em obra de saneamento." },
  { src: "/images/jeFiber_08.png", titulo: "Estação de tratamento", desc: "Tanques e tubulações em PRFV para ETA." },
  { src: "/images/jeFiber_10.png", titulo: "Bateria de reservatórios", desc: "Reservatórios PRFV em campo." },
  { src: "/images/jeFiber_20.png", titulo: "Fenasucro & Agrocana", desc: "Presença da JE FIBER em feiras do setor." },
  { src: "/images/jeFiber_31.png", titulo: "Equipe JE FIBER", desc: "Time técnico e comercial no stand." },
];

export default function Projetos() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (prefersReducedMotion() || window.innerWidth < 768) return;
    const t = track.current!;
    const dist = t.scrollWidth - window.innerWidth;
    gsap.to(t, {
      x: -dist, ease: "none",
      scrollTrigger: { trigger: wrap.current, pin: true, scrub: 1, start: "top top", end: () => `+=${dist}` },
    });
  }, { scope: wrap });
  return (
    <section id="projetos" ref={wrap} className="overflow-hidden py-24 md:py-0">
      <div className="mx-auto max-w-7xl px-6 md:pt-28">
        <SectionLabel>Projetos & Clientes</SectionLabel>
      </div>
      <div ref={track} className="flex flex-col gap-6 px-6 md:mt-8 md:flex-row md:gap-8 md:px-[8vw]">
        {SLIDES.map((s) => (
          <article key={s.titulo} className="md:w-[60vw] md:shrink-0 lg:w-[42vw]">
            <div className="relative h-64 overflow-hidden rounded-md md:h-[60vh]">
              <Image src={s.src} alt={s.titulo} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
            </div>
            <h3 className="mt-4 font-display text-xl font-bold uppercase text-white">{s.titulo}</h3>
            <p className="font-body text-sm text-white/70">{s.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Em `app/page.tsx`** adicionar `<Projetos />`.

- [ ] **Step 3: Verificar** — em desktop a seção "prende" e os slides rolam horizontalmente; em mobile vira lista vertical.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Projetos.tsx app/page.tsx
git commit -m "feat: secao Projetos com scroll horizontal pinado"
```

### Task 4.7: Contato (formulário → WhatsApp/mailto + mapa)

**Files:**
- Create: `components/sections/Contato.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: `components/sections/Contato.tsx`**

```tsx
"use client";
import { useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { CONTATO } from "@/lib/constants";
import { buildWhatsappUrl, buildMailtoUrl, type ContactForm } from "@/lib/contact";

const VAZIO: ContactForm = { nome: "", telefone: "", email: "", mensagem: "" };

export default function Contato() {
  const [form, setForm] = useState<ContactForm>(VAZIO);
  const set = (k: keyof ContactForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });
  const enviarWhats = (e: React.FormEvent) => { e.preventDefault(); window.open(buildWhatsappUrl(form, CONTATO.whatsapp), "_blank"); };

  return (
    <section id="contato" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <SectionLabel>Contato</SectionLabel>
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-extrabold uppercase leading-tight text-white sm:text-4xl">Vamos conversar sobre o seu projeto</h2>
          <div className="mt-8 space-y-3 font-body text-white/80">
            {CONTATO.telefones.map((t) => <p key={t}>📞 {t}</p>)}
            <p>✉️ <a href={`mailto:${CONTATO.email}`} className="hover:text-white">{CONTATO.email}</a></p>
            <p>📍 {CONTATO.endereco}</p>
          </div>
          <div className="mt-6 aspect-video overflow-hidden rounded-md border border-white/10">
            <iframe title="Mapa JE FIBER" loading="lazy" className="h-full w-full"
              src="https://www.google.com/maps?q=JE%20FIBER%20Ipe%C3%BAna%20SP&output=embed" />
          </div>
        </div>
        <form onSubmit={enviarWhats} className="space-y-4">
          <input required value={form.nome} onChange={set("nome")} placeholder="Nome" className="w-full rounded-sm border border-white/15 bg-marinho-2/40 px-4 py-3 font-body text-white placeholder:text-white/40 focus:border-papoula focus:outline-none" />
          <input required value={form.telefone} onChange={set("telefone")} placeholder="Telefone" className="w-full rounded-sm border border-white/15 bg-marinho-2/40 px-4 py-3 font-body text-white placeholder:text-white/40 focus:border-papoula focus:outline-none" />
          <input required type="email" value={form.email} onChange={set("email")} placeholder="E-mail" className="w-full rounded-sm border border-white/15 bg-marinho-2/40 px-4 py-3 font-body text-white placeholder:text-white/40 focus:border-papoula focus:outline-none" />
          <textarea required value={form.mensagem} onChange={set("mensagem")} placeholder="Mensagem" rows={5} className="w-full rounded-sm border border-white/15 bg-marinho-2/40 px-4 py-3 font-body text-white placeholder:text-white/40 focus:border-papoula focus:outline-none" />
          <div className="flex flex-wrap gap-3">
            <button type="submit" data-cursor className="rounded-sm bg-papoula px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-white transition-transform hover:scale-105">Enviar pelo WhatsApp</button>
            <a href={buildMailtoUrl(form, CONTATO.email)} data-cursor className="rounded-sm border border-white/30 px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-white/90 hover:border-white">Enviar por e-mail</a>
          </div>
          {/* TODO: integrar envio real (Formspree/Resend) quando aprovado */}
        </form>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Em `app/page.tsx`** adicionar `<Contato />` (antes do `<Footer />`).

- [ ] **Step 3: Verificar** — preencher o form e clicar "Enviar pelo WhatsApp" abre `wa.me` com a mensagem; mapa carrega.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Contato.tsx app/page.tsx
git commit -m "feat: secao Contato com formulario WhatsApp/mailto e mapa"
```

---

## Phase 5 — Hero 3D (Filament Winding)

### Task 5.1: FiberTube (cilindro + filamentos enrolando)

**Files:**
- Create: `components/three/FiberTube.tsx`

- [ ] **Step 1: `components/three/FiberTube.tsx`**

```tsx
"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Cilindro de fibra com fios helicoidais (filament winding) que avançam com o tempo/scroll. */
export default function FiberTube({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Geometria dos filamentos: várias hélices ao redor do cilindro
  const helices = useMemo(() => {
    const linhas: THREE.Vector3[][] = [];
    const voltas = 6, raio = 1.02, altura = 4, passos = 120, nFios = 16;
    for (let f = 0; f < nFios; f++) {
      const fase = (f / nFios) * Math.PI * 2;
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= passos; i++) {
        const t = i / passos;
        const ang = fase + t * voltas * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(ang) * raio, (t - 0.5) * altura, Math.sin(ang) * raio));
      }
      linhas.push(pts);
    }
    return linhas;
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    mouse.current.x += (state.pointer.x - mouse.current.x) * 0.05;
    mouse.current.y += (state.pointer.y - mouse.current.y) * 0.05;
    group.current.rotation.y += delta * 0.15 + scrollRef.current * 0.0005;
    group.current.rotation.z = mouse.current.x * 0.15;
    group.current.rotation.x = -0.2 + mouse.current.y * 0.15;
  });

  return (
    <group ref={group} rotation={[0, 0, Math.PI / 2.3]}>
      {/* núcleo do tubo */}
      <mesh>
        <cylinderGeometry args={[1, 1, 4, 48, 1, true]} />
        <meshStandardMaterial color="#0a0c4a" metalness={0.3} roughness={0.4} side={THREE.DoubleSide} />
      </mesh>
      {/* filamentos */}
      {helices.map((pts, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        return (
          <line key={i}>
            <bufferGeometry attach="geometry" {...geo} />
            <lineBasicMaterial attach="material" color={i % 5 === 0 ? "#FF0000" : "#9fa6ff"} transparent opacity={0.7} />
          </line>
        );
      })}
    </group>
  );
}
```

> Nota: usar `<line>` do R3F com geometria de pontos; se o lint reclamar de reuso de geometria, mover a criação para `useMemo`. Mantém baixo nº de polígonos.

- [ ] **Step 2: Verificar build** — `npm run build` (sem render ainda) OK.

- [ ] **Step 3: Commit**

```bash
git add components/three/FiberTube.tsx
git commit -m "feat: FiberTube 3D (filament winding) reativo a mouse/scroll"
```

### Task 5.2: HeroCanvas (Canvas + luzes + bloom + pausa fora da viewport)

**Files:**
- Create: `components/three/HeroCanvas.tsx`

- [ ] **Step 1: `components/three/HeroCanvas.tsx`**

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import FiberTube from "./FiberTube";

export default function HeroCanvas() {
  const scrollRef = useRef(0);
  const wrap = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(true);

  useEffect(() => {
    const onScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0 });
    if (wrap.current) io.observe(wrap.current);
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 1.5]} frameloop={visivel ? "always" : "demand"}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -2, 3]} intensity={2} color="#3b3fff" />
        <FiberTube scrollRef={scrollRef} />
        <EffectComposer>
          <Bloom intensity={0.7} luminanceThreshold={0.2} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 2: Verificar build** — OK.

- [ ] **Step 3: Commit**

```bash
git add components/three/HeroCanvas.tsx
git commit -m "feat: HeroCanvas com bloom e pausa de render fora da viewport"
```

### Task 5.3: Montar o canvas no Hero (dynamic, ssr:false, desligado no mobile)

**Files:**
- Modify: `components/sections/Hero.tsx`

- [ ] **Step 1: Carregar dinamicamente no Hero**

No topo de `Hero.tsx` (precisa virar client component p/ usar `dynamic` + media query):

```tsx
"use client";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import RevealText from "@/components/ui/RevealText";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), { ssr: false });
```

Adicionar dentro do componente (antes do return) a detecção de desktop:

```tsx
const [show3D, setShow3D] = useState(false);
useEffect(() => {
  const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
  setShow3D(mq.matches);
}, []);
```

Substituir o `div#hero-canvas-slot` por:

```tsx
<div id="hero-canvas-slot" className="absolute inset-0 -z-10">
  {show3D && <Suspense fallback={null}><HeroCanvas /></Suspense>}
</div>
```

- [ ] **Step 2: Verificar** — em desktop o tubo 3D aparece atrás da headline, gira e reage ao mouse; em mobile/reduced-motion fica só o fundo CSS.

- [ ] **Step 3: Verificar build** — `npm run build` OK.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: monta cena 3D no Hero (dynamic ssr:false, off no mobile)"
```

---

## Phase 6 — Acabamento, acessibilidade e verificação final

### Task 6.1: Revisão de acessibilidade e contraste

**Files:**
- Modify: conforme necessário (`Hero.tsx`, `globals.css`, seções)

- [ ] **Step 1: Checar contraste** — garantir que nenhum texto use `#FF0000` sobre `#010238` em tamanho pequeno (falha AA). Vermelho só em barras/labels grandes/CTAs com texto branco. Ajustar onde houver texto vermelho pequeno (usar `text-white` ou aumentar peso/tamanho).

- [ ] **Step 2: Foco visível** — adicionar no `globals.css`:

```css
a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible {
  outline: 2px solid var(--papoula); outline-offset: 2px;
}
```

- [ ] **Step 3: Navegação por teclado** — confirmar que todos os links/botões são alcançáveis por Tab e que o `cursor:none` não esconde foco (foco continua visível).

- [ ] **Step 4: Commit**

```bash
git add app/globals.css components
git commit -m "a11y: foco visivel e ajustes de contraste do vermelho"
```

### Task 6.2: Verificação visual com Playwright (webapp-testing)

> REQUIRED SUB-SKILL: usar `webapp-testing` para dirigir o browser.

- [ ] **Step 1: Subir o dev server** — `npm run dev` (porta 3000).

- [ ] **Step 2: Screenshots desktop (1440px)** — capturar topo (hero 3D), Soluções, Projetos (estado pinado), Contato. Conferir: hero 3D renderiza, sem overflow horizontal, fontes corretas.

- [ ] **Step 3: Screenshot mobile (375px)** — conferir: 3D desligado, layout sem overflow, header e WhatsApp acessíveis, Projetos em lista vertical.

- [ ] **Step 4: Checar console** — sem erros (warnings de bloom/three aceitáveis). Anotar e corrigir erros reais.

- [ ] **Step 5: Commit** (se houver ajustes)

```bash
git add -A
git commit -m "fix: ajustes apos verificacao visual (desktop + mobile)"
```

### Task 6.3: Verificação final (verification-before-completion)

> REQUIRED SUB-SKILL: usar `verification-before-completion`.

- [ ] **Step 1: Testes** — `npm run test` → todos passam (contact, motion, constants).
- [ ] **Step 2: Lint** — `npm run lint` → sem erros.
- [ ] **Step 3: Build** — `npm run build` → sucesso, sem erros de tipo.
- [ ] **Step 4: Conferir critérios de sucesso da spec** (§9): 8 seções na ordem, hero 3D no desktop, reduced-motion degrada, mobile sem overflow, form abre WhatsApp/mailto, sem logos de clientes recriados.
- [ ] **Step 5: Commit final**

```bash
git add -A
git commit -m "chore: verificacao final — testes, lint e build passando"
```

---

## Self-Review (cobertura da spec)

- §3 Stack → Tasks 0.1–0.3 ✓
- §4 Identidade (cores/fontes/tokens) → Tasks 0.2, 0.3 ✓
- §5 Arquitetura de componentes → estrutura de arquivos + todas as fases ✓
- §6 Seções 1–8 → Hero (4.1/5.x), Sobre (4.2), Soluções (4.3), Serviços (4.4), Infraestrutura (4.5), Projetos (4.6), Contato (4.7), Rodapé (2.4) ✓
- §7 Efeitos 1–12 → filament winding (5.x), Lenis (2.1), reveal (3.2/4.x), tilt (3.3/4.3), parallax (4.5), pin horizontal (4.6), contadores (3.4/4.2), cursor magnético (3.5), WhatsApp pulsante (2.3), hover preview de produto (4.3 — imagem escala no hover; preview-seguindo-mouse é enriquecimento opcional em 4.3), transições entre seções (scroll/Lenis), linhas técnicas (3.1) ✓
- §8 Requisitos técnicos → lazy-load/pausa (5.2/5.3), a11y/reduced-motion (motion.ts + 6.1), responsivo (Tailwind + 6.2), SEO (0.3 metadata), cleanup (useGSAP em todos) ✓
- §9 Critérios de sucesso → Task 6.3 ✓
- §10 Fora de escopo → respeitado (sem backend/rotas/logos) ✓

**Nota sobre o efeito 10 (preview seguindo o mouse):** implementado de forma simples como zoom da imagem do card no hover (Task 4.3). A variação "imagem flutuante que segue o cursor" fica como enriquecimento opcional, sem task dedicada para não inflar o escopo — pode ser adicionada depois se o dono pedir.
