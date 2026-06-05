<div align="center">

# JE FIBER — Site Institucional

**Tecnologia e qualidade na fabricação e manutenção de produtos em fibra de vidro (PRFV/RPVC).**

Site one-page institucional da [JE FIBER](https://www.jefiber.com.br) — +15 anos em reservatórios, tubos, conexões e estações de tratamento de água (ETA) e esgoto (ETE) para os setores de saneamento, químico e alimentício.

</div>

---

## ✨ Sobre o projeto

Proposta de novo site institucional construída do zero, com foco em causar impacto ("uau") já no primeiro scroll, mantendo um tom profissional, técnico e sólido — alinhada ao brandbook oficial da marca.

### Destaques

- **Hero 3D "Filament Winding"** — um tubo de fibra de vidro com filamentos se enrolando ao redor (referência ao processo real de enrolamento filamentar da empresa), reativo ao mouse e ao scroll, com efeito *bloom*. Construído em React Three Fiber.
- **Experiência one-page cinematográfica** — rolagem suave (Lenis) sincronizada com animações de scroll (GSAP/ScrollTrigger).
- **Seções:** Hero · Sobre · Soluções · Serviços · Infraestrutura · Projetos & Clientes · Contato.
- **Efeitos:** revelação de texto por palavra, cards com inclinação 3D, parallax, **scroll horizontal "pinado"** em Projetos, contadores animados, cursor magnético, linhas técnicas que se desenham e botão de WhatsApp flutuante.
- **Identidade da marca:** marinho `#010238`, vermelho papoula `#FF0000` (só em CTAs/detalhes), branco. Tipografia Archivo (títulos) + Manrope (corpo) + IBM Plex Mono (números/metadados).
- **Contato sem backend:** o formulário monta a mensagem e abre o WhatsApp (`wa.me`) ou o e-mail (`mailto`).

### Performance & acessibilidade

- A cena 3D é carregada sob demanda (`dynamic`, `ssr:false`), **desligada no mobile** e quando o usuário prefere menos animação (`prefers-reduced-motion`), e pausa a renderização fora da viewport.
- Layout responsivo (320–1920px+), foco visível por teclado, contraste auditado (AA), `aria-label`s e metadados/SEO (Open Graph).

---

## 🛠️ Stack

| Camada | Tecnologias |
|---|---|
| Framework | **Next.js 15** (App Router) + **TypeScript** |
| Estilo | **Tailwind CSS** (design tokens em CSS vars + `tailwind.config.ts`) |
| 3D | **React Three Fiber**, `@react-three/postprocessing` (bloom), Three.js |
| Animação | **GSAP** + ScrollTrigger (`@gsap/react`/`useGSAP`), **Lenis** (scroll suave) |
| Testes | **Vitest** + Testing Library |

---

## 🚀 Como rodar

> Requisitos: **Node.js 18+** (recomendado 20/22+) e npm.

```bash
# 1. Instalar dependências
npm install

# 2. Ambiente de desenvolvimento
npm run dev
# abra http://localhost:3000
# (se a porta 3000 estiver ocupada: npm run dev -- -p 3100)

# 3. Build de produção
npm run build
npm run start

# 4. Testes e lint
npm run test
npm run lint
```

---

## 📁 Estrutura

```
app/                 layout, página (composição das seções), globals.css, icon.svg (favicon)
components/
  layout/            Header, Footer, WhatsAppFloat, CustomCursor, SmoothScroll (Lenis)
  sections/          Hero, Sobre, Solucoes, Servicos, Infraestrutura, Projetos, Contato
  three/             HeroCanvas (Canvas + bloom), FiberTube (filament winding)
  ui/                SectionLabel, RevealText, TiltCard, Counter, TechRule
lib/                 constants (contatos/soluções/números), contact (WhatsApp/mailto), motion
public/images/       fotos da empresa usadas no site
docs/superpowers/    spec de design e plano de implementação
test/                testes unitários (contact, motion, constants)
```

> **Nota:** o acervo-fonte original (fotos em alta, brandbook PDF, briefing) fica em `assets/` **fora do versionamento** (`.gitignore`) por ser pesado e estar duplicado em `public/images`.

---

## 📌 Pendências / próximos passos

- [ ] **Contadores:** os números em `lib/constants.ts` (`NUMEROS`) usam um placeholder ("100+ projetos") — confirmar os valores reais com a empresa.
- [ ] **Deploy:** publicar um preview na **Vercel** para aprovação.
- [ ] **Formulário:** integração de envio real (Formspree/Resend) caso se queira receber por e-mail/servidor, além do WhatsApp.

---

## 📞 Contato JE FIBER

- WhatsApp: [+55 19 99606-3421](https://wa.me/5519996063421) · Telefones: (19) 3537-1777 · (19) 3537-1786
- E-mail: comercial@jefiber.com.br
- Endereço: Estrada Municipal do Biri (IPN-463), nº 230, Mini Distrito Industrial III, Ipeúna/SP
- [Instagram](https://www.instagram.com/je.fiber/) · [LinkedIn](https://www.linkedin.com/in/je-fiber-7b956b140/) · [Facebook](https://www.facebook.com/jefiber/)
