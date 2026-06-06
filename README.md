<div align="center">

# JE FIBER — Site Institucional

**Tecnologia e qualidade na fabricação e manutenção de produtos em fibra de vidro (PRFV/RPVC).**

Site institucional da [JE FIBER](https://www.jefiber.com.br) — +15 anos em reservatórios, tubos, conexões e estações de tratamento de água (ETA) e esgoto (ETE) para os setores de saneamento, químico e alimentício. Ipeúna/SP.

</div>

---

## ✨ Sobre o projeto

Proposta de novo site institucional construída do zero, com foco em causar impacto ("uau") já no primeiro scroll, mantendo um tom profissional, técnico e sólido — alinhada ao brandbook oficial da marca.

### Destaques

- **Hero com foto da sede + anéis orbitais 3D** — a foto da empresa cobre toda a seção (segundo plano), com um sistema de anéis finos em 3D girando por cima (leitura de precisão/engenharia), reativo ao mouse e ao scroll. Construído em React Three Fiber — minimalista e leve à vista.
- **Páginas internas (subpáginas):**
  - **Empresa** (`/empresa`) — história, parque fabril, diferenciais e mídia.
  - **Produtos** (`/produtos/[slug]`) — Reservatórios, Tubos e Conexões, ETA, ETE (com Projeto / Montagem / Supervisão e galeria).
  - **Serviços** (`/servicos/[slug]`) — Calha Vertedora, Comporta, Guarda-corpo, Peças Especiais, Tampas.
  - **Downloads** (`/downloads`) — catálogos técnicos em PDF.
- **Home cinematográfica** — rolagem suave (Lenis) sincronizada com animações de scroll (GSAP/ScrollTrigger). Seções: Hero · Sobre · Banner · Soluções · Serviços · Áreas · Infraestrutura · Projetos · Contato.
- **Navegação responsiva** — dropdowns (Produtos/Serviços) que abrem por hover **e** clique (compatível com toque) e **menu hambúrguer** no mobile.
- **Efeitos:** revelação de texto, cards com inclinação 3D + spotlight, ken-burns nas fotos, carrossel automático em Projetos, contadores, botão de WhatsApp flutuante com hover.
- **Identidade da marca:** marinho `#010238`, vermelho papoula `#FF0000` (só em CTAs/detalhes), branco. Tipografia **Sora** (títulos) + **Plus Jakarta Sans** (corpo) + **JetBrains Mono** (números/metadados).
- **Contato sem backend:** o formulário monta a mensagem e abre o WhatsApp (`wa.me`) ou o e-mail (`mailto`), com consentimento LGPD.
- **Compartilhamento:** favicon próprio (`app/icon.png`) e banner Open Graph (`app/opengraph-image.png`) para prévia em WhatsApp/Telegram/redes.

### Performance & acessibilidade

- Cena 3D carregada sob demanda (`dynamic`, `ssr:false`), **desligada no mobile** e com `prefers-reduced-motion`, pausando a renderização fora da viewport.
- Imagens otimizadas (`next/image`) e **comprimidas** (~5,7 MB no total; fotos em JPEG, logo/ícones em PNG).
- Layout responsivo (320–2560px+), foco visível por teclado, `aria-label`s e metadados/SEO (Open Graph + Twitter Card).

---

## 🛠️ Stack

| Camada | Tecnologias |
|---|---|
| Framework | **Next.js 15** (App Router) + **TypeScript** + **React 19** |
| Estilo | **Tailwind CSS** (design tokens em CSS vars + `tailwind.config.ts`) |
| 3D | **React Three Fiber** + Three.js (sem postprocessing) |
| Animação | **GSAP** + ScrollTrigger (`@gsap/react`/`useGSAP`), **Lenis** (scroll suave) |
| Testes | **Vitest** + Testing Library |

---

## 🚀 Como rodar

> Requisitos: **Node.js 18+** (recomendado 20/22+) e npm.

```bash
npm install            # instalar dependências
npm run dev            # desenvolvimento → http://localhost:3000
                       # (porta ocupada? npm run dev -- -p 3100)
npm run build && npm run start   # build de produção
npm run test           # testes (Vitest)
npm run lint           # lint
```

---

## 📁 Estrutura

```
app/
  layout.tsx           layout raiz, fontes, metadata/OG, favicon
  page.tsx             home (composição das seções)
  empresa/             página "A Empresa"
  produtos/[slug]/     páginas de produto (SSG)
  servicos/[slug]/     páginas de serviço (SSG)
  downloads/           página de downloads (PDFs)
  icon.png             favicon · opengraph-image.png  banner de compartilhamento
components/
  layout/              Header (nav + dropdowns + menu mobile), Footer, WhatsAppFloat, SmoothScroll
  sections/            Hero, Sobre, Banner, Solucoes, Servicos, Areas, Infraestrutura, Projetos, Contato
  three/               HeroCanvas (Canvas) + FiberOrb (anéis orbitais)
  ui/                  SectionLabel, RevealText, TiltCard, Counter, PageHero, Logo, SocialIcons
lib/                   constants (contatos/produtos/serviços/downloads/empresa), contact, motion
public/
  images/              fotos usadas no site (site-*.png extraídas do site original)
  downloads/           catálogos em PDF
scripts/               extract_photos · compress_images · make_brand · verify_* (utilitários de build/QA)
docs/superpowers/      spec de design e plano de implementação
test/                  testes unitários
```

> **Notas:**
> - O acervo-fonte original (fotos em alta, brandbook PDF, briefing) fica em `assets/` **fora do versionamento** (`.gitignore`).
> - Os prints de referência do site original ficam em `public/images/prints-jeFiber/`, também **fora do versionamento** (~80 MB, material de apoio local).
> - `scripts/make_brand.py` regenera o favicon e o banner OG; `scripts/compress_images.py` comprime as fotos.

---

## 📌 Pendências / próximos passos

- [ ] **Tema claro/escuro** e **tradução PT/EN** (toggles) — em planejamento.
- [ ] **Fotos dedicadas** de Comporta, Calha Vertedora, Guarda-corpo e ETE (hoje usam foto de equipamento genérica).
- [ ] **Contadores:** os números em `lib/constants.ts` (`NUMEROS`) usam placeholder ("100+ projetos") — confirmar valores reais.
- [ ] **Deploy:** publicar preview na **Vercel** para aprovação (definir `NEXT_PUBLIC_SITE_URL` para os metadados/OG).
- [ ] **Formulário:** integração de envio real (Formspree/Resend), além do WhatsApp.

---

## 📞 Contato JE FIBER

- WhatsApp: [(19) 99606-3421](https://wa.me/5519996063421) · Telefones: (19) 3537-1777 · (19) 3537-1786
- E-mail: comercial@jefiber.com.br
- Endereço: Estrada Municipal do Biri (IPN-463), nº 230, Mini Distrito Industrial III, Ipeúna/SP
- [Instagram](https://www.instagram.com/je.fiber/) · [LinkedIn](https://www.linkedin.com/in/je-fiber-7b956b140/) · [Facebook](https://www.facebook.com/jefiber/)
