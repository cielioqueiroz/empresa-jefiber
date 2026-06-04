# Spec — Novo site institucional JE FIBER

**Data:** 2026-06-04
**Status:** Aprovado (design) — pronto para plano de implementação
**Fonte:** `assets/briefing/BRIEFING_JEFIBER.md` + brainstorm

---

## 1. Objetivo

Construir do zero o novo site institucional da JE FIBER (fibra de vidro PRFV/RPVC, +15 anos,
Ipeúna/SP). É uma **proposta para aprovação do dono**: precisa impressionar ("uau") já no
primeiro scroll, com efeitos 3D, mantendo tom profissional, técnico e sólido. One-page.

## 2. Decisões fechadas (brainstorm)

| Tema | Decisão |
|---|---|
| Arquitetura | **One-page** (scroll cinematográfico, sem rotas internas) |
| Nível 3D | **Completo** (todos os efeitos do briefing) |
| Conceito do hero 3D | **A — Filament Winding**: cilindro de fibra com filamentos enrolando, reativo a mouse/scroll |
| Seções internas | Efeito "linhas técnicas que se desenham" (sabor do conceito C) |
| Formulário de contato | **WhatsApp + e-mail** (monta a mensagem e abre `wa.me`/`mailto`; sem backend). TODO p/ integração real |
| Deploy | **Depois** da aprovação (build + preview local primeiro; Vercel ao fim) |
| Dados faltantes | Contadores (nº projetos/clientes) com placeholder + TODO |

## 3. Stack

- **Next.js 15 (App Router) + TypeScript + Tailwind CSS**.
- **3D:** `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing` (bloom).
  Hero via `dynamic(() => import(...), { ssr:false })` + `<Suspense>`.
- **Animação:** `gsap` + `ScrollTrigger` + `@gsap/react` (`useGSAP` p/ cleanup).
- **Scroll suave:** `lenis`, sincronizado com ScrollTrigger.
- **Fontes:** `next/font/google` — Archivo, Manrope, IBM Plex Mono.

## 4. Identidade visual (obrigatória — brandbook)

Design tokens centralizados em `globals.css` (CSS vars) + `tailwind.config.ts`:

- **Cores:** Marinho base/fundo `#010238`; Vermelho acento/CTA `#FF0000` (saturado — só em
  CTAs e detalhes); Branco `#FFFFFF`. Base escura + texto branco + vermelho pontual.
- **Tipografia:**
  - Títulos hero: **Archivo** 800/900, caixa alta, `letter-spacing: -0.02em`.
  - Subtítulos/leads: Archivo 700, caixa alta.
  - Corpo: **Manrope** 400/500.
  - Rótulos/medidas/números (+15 anos, PRFV, CEP): **IBM Plex Mono** 400/500, tracking largo.
  - Botões/CTAs: Manrope 600/700, caixa alta, tracking moderado.
- **Tagline:** "Tecnologia e qualidade na fabricação e manutenção de produtos em fibra de vidro."

## 5. Arquitetura de componentes

```
app/
  layout.tsx        fontes, metadata/SEO global, <CustomCursor>, <WhatsAppFloat>, Lenis provider
  page.tsx          composição das seções na ordem
  globals.css       design tokens (CSS vars), base
components/
  layout/   Header  Footer  WhatsAppFloat  CustomCursor
  sections/ Hero  Sobre  Solucoes  Servicos  Infraestrutura  Projetos  Contato
  three/    HeroCanvas  FiberTube (filament winding)  scene helpers
  ui/       SectionLabel  RevealText  TiltCard  Counter  TechRule  ProductHoverPreview
lib/
  useLenis.ts          scroll suave + sync ScrollTrigger
  motion.ts            helper prefers-reduced-motion
  constants.ts         contatos, redes, links wa.me/mailto, dados das seções
public/images/         fotos otimizadas (origem: assets/fotos/)
```

**Princípio:** cada seção é um componente isolado, sem estado compartilhado entre seções.
Animações montadas no próprio componente com `useGSAP` (cleanup automático). O canvas 3D
vive só no Hero e não vaza para o resto.

## 6. Seções (one-page, nesta ordem)

1. **Hero** — headline "TECNOLOGIA E QUALIDADE NA FABRICAÇÃO E MANUTENÇÃO" (Archivo caixa
   alta) + barra vermelha à esquerda + tagline + CTA "Fale conosco". Fundo marinho com leve
   textura de fibra + cena 3D filament winding (reage a mouse/scroll).
2. **Sobre** — +15 anos, trajetória, engenharia, valores. Foto `_27` (planta) / `_07` (fachada).
   Texto revelado por linha (SplitText + ScrollTrigger).
3. **Soluções** — 4 cards com tilt 3D e preview no hover:
   - Tubos e conexões RPVC/PRFV (`_16`, `_05`, `_12`)
   - Reservatórios PRFV (`_10`, `_09`)
   - ETA (`_08`, `_06`)
   - ETE (`_14`)
   Cada card detalha: Funções/Aplicações · Fabricação · Manutenção.
4. **Serviços** — fabricação (`_26`), instalação/içamento (`_17`), manutenção (`_03`/`_02`).
5. **Infraestrutura** — galeria com parallax discreto; destaque aérea `_29` (+ `_11`,`_13`).
6. **Projetos & Clientes** — scroll horizontal "pinado" (ScrollTrigger) com obras
   (`_17` Sanepar, `_08` Sabesp) + prova social de feiras (`_20`,`_31`,`_24`).
   **Não recriar logos de clientes** — usar as fotos reais das obras (briefing §4).
7. **Contato** — formulário (nome, telefone, e-mail, mensagem) que monta a mensagem e abre
   **WhatsApp** (`https://wa.me/5519996063421`) ou **mailto** (`comercial@jefiber.com.br`).
   Telefones (19) 3537-1777 / (19) 3537-1786, endereço (Estrada Municipal do Biri, nº 230,
   Ipeúna/SP), mapa embed.
8. **Rodapé** — logo (`assets/marca/logo-jefiber.png`), navegação, redes:
   Instagram `je.fiber`, LinkedIn `je-fiber-7b956b140`, Facebook `jefiber`.

Botão **WhatsApp flutuante** com pulsação leve, presente em todas as seções.

## 7. Efeitos e animações (12 do briefing)

1. Hero 3D filament winding reativo a mouse + scroll.
2. Scroll suave global (Lenis) sincronizado com ScrollTrigger.
3. Revelação de texto por linha nos títulos.
4. Cards de Soluções com tilt 3D seguindo o mouse.
5. Parallax discreto em Infraestrutura/Projetos.
6. Seção Projetos em scroll horizontal pinado.
7. Contadores: +15 anos, nº projetos/clientes (placeholder + TODO).
8. Cursor customizado magnético sobre links/cards.
9. WhatsApp flutuante pulsante; CTAs magnéticos.
10. Hover nos cards revelando preview do produto que segue o mouse.
11. Transições suaves entre seções.
12. Linhas/réguas técnicas que se "desenham" ao entrar na tela.

## 8. Requisitos técnicos

- **Performance:** lazy-load do 3D; baixa contagem de polígonos; pausar o render do canvas
  fora da viewport; reduzir/desligar o 3D no mobile.
- **Acessibilidade:** respeitar `@media (prefers-reduced-motion: reduce)`; contraste AA
  (validar vermelho puro sobre marinho — usar vermelho só em elementos não-texto ou com
  tamanho/peso que passe AA); navegação por teclado; `aria-label`s.
- **Responsivo** 320–1920px+.
- **SEO:** metadata, Open Graph, títulos por seção.
- **Cleanup:** GSAP via `useGSAP`; loop do Three.js desmontado ao sair.
- Fotos em `public/images`; onde faltar conteúdo, placeholder + TODO.

## 9. Critérios de sucesso (verificáveis)

- `npm run build` passa sem erros de tipo/lint.
- Site abre em `npm run dev` e renderiza as 8 seções na ordem, com o hero 3D animado em
  desktop.
- Com `prefers-reduced-motion: reduce`, o 3D/animações degradam (sem travar) e o conteúdo
  permanece legível.
- Mobile (≤768px): 3D reduzido/desligado, layout sem overflow horizontal, CTAs e WhatsApp
  acessíveis.
- Formulário de contato abre WhatsApp/mailto com a mensagem preenchida.
- Contraste AA validado nos textos principais.
- Nenhum logo vetorial de cliente recriado; só fotos reais.

## 10. Fora de escopo (YAGNI nesta versão)

- Backend/CMS, e-mail transacional real, multi-idioma, blog, área logada.
- Páginas internas (é one-page).
- Recriação de logos de clientes.
