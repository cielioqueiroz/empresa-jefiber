# Briefing — Novo site institucional JE FIBER

> Documento para guiar a construção do novo site. Pode ser colado no Claude Code
> ou colocado na raiz do projeto: "leia o BRIEFING_JEFIBER.md e implemente".

---

## 1. Sobre a empresa

- **JE FIBER** — produtos em fibra de vidro **PRFV / RPVC**. **+15 anos** de atuação
  ("Jornada de Excelência"). Sede em **Ipeúna/SP**. Site: www.jefiber.com.br
- **Produtos:** reservatórios, tubos, conexões e acessórios em fibra de vidro.
- **Soluções:** estações de tratamento de água (ETA) e esgoto (ETE), reservatórios PRFV,
  tubulação RPVC/PRFV.
- **Setores atendidos:** saneamento, químico e alimentício.
- **Clientes de referência:** Sabesp, Sanepar (use como prova social — ver nota em §4).
- **Tagline:** "Tecnologia e qualidade na fabricação e manutenção de produtos em fibra de vidro."
- **Tom/voz:** profissional, técnico, sólido, confiável.
- **Valores:** qualidade, segurança, experiência, excelência, comprometimento.
- **Contato e redes (usar no rodapé e na seção Contato):**
  - WhatsApp: +55 19 99606-3421 → link `https://wa.me/5519996063421`
  - Telefones: (19) 3537-1777 · (19) 3537-1786
  - E-mail: comercial@jefiber.com.br
  - Endereço: Estrada Municipal do Biri (IPN-463), nº 230, Mini Distrito Industrial III, Ipeúna/SP, CEP 13.537-000
  - Instagram: https://www.instagram.com/je.fiber/
  - LinkedIn: https://www.linkedin.com/in/je-fiber-7b956b140/
  - Facebook: https://www.facebook.com/jefiber/

---

## 2. Identidade visual (brandbook oficial)

- **Cores oficiais** (usar exatamente; centralizar em design tokens):
  - Marinho (base/fundo): `#010238`  ("Preto Obsidiana")
  - Vermelho (acento/CTA): `#FF0000`  ("Vermelho Papoula")
  - Branco: `#FFFFFF`
  - Base escura marinho + texto branco + vermelho só em CTAs e detalhes (é saturado).
- **Tipografia (definida):** **Archivo** (títulos, 700/800) + **Manrope** (corpo, 400/500) +
  **IBM Plex Mono** (metadados/números). Todas no Google Fonts, via `next/font/google`.
  > Nota: diverge do Poppins do brandbook original. Se o dono questionar, o argumento é:
  > Archivo transmite mais peso industrial que Poppins, mantendo modernidade e legibilidade.

---

## 3. Mapa de imagens → seções

Fotos reais da empresa fornecidas. Sugestão de uso:

- **Hero:** textura de fibra escura ao fundo + a cena 3D por cima. (A vista aérea da
  fábrica e os tubos PRFV empilhados também funcionam como plano de fundo alternativo.)
- **Sobre / Empresa:** engenheiros analisando o projeto técnico (planta); fachada da sede
  com o totem JE FIBER; foto da equipe no stand.
- **Soluções:**
  - *Tubos e conexões* → tubos PRFV verdes empilhados no campo; tubos no galpão; processo.
  - *Reservatórios* → tanques azuis no pátio; interior do galpão com tanques em produção.
  - *ETA / ETE* → fotos das estações de tratamento.
- **Serviços (fabricação / instalação / manutenção):** processo de fabricação dos tubos;
  enrolamento de fibra (filament winding); içamento de tanque com guindaste.
- **Infraestrutura:** vista aérea da fábrica azul com pátio de tanques; interior do galpão.
- **Projetos / Clientes:** tanque com identidade da Sanepar sendo instalado; tanques em
  obras de saneamento. (Mostrar as fotos das obras, não recriar logos — ver §4.)
- **Prova social:** stand da JE FIBER na feira Fenasucro & Agrocana; equipe no evento.

> **Não usar:** a imagem de banco com marca d'água (Shutterstock) — é de terceiros e
> não licenciada. Substituir por uma foto real da empresa.

---

## 4. Nota de direitos (importante)

As fotos das obras são da própria JE FIBER, então ok usá-las como portfólio. Mas evite
**recriar/embutir o logotipo vetorial** de clientes como Sabesp/Sanepar no site — prefira
mostrar a foto real da obra (onde a marca aparece no tanque). Se quiser uma seção
"clientes" com logos, confirme autorização antes.

---

## 5. Prompt para o Claude Code

```
Quero criar do ZERO o novo site institucional da JE FIBER — empresa brasileira com +15
anos em produtos de fibra de vidro (PRFV/RPVC): reservatórios, tubos, conexões e estações
de tratamento de água (ETA) e esgoto (ETE) para saneamento, químico e alimentício. O site
atual está desatualizado; vou apresentar esta versão ao dono para aprovação, então precisa
impressionar ("uau") já no primeiro scroll, com efeitos 3D, mantendo tom profissional,
técnico e sólido.

USE AS SKILLS QUE TENHO INSTALADAS
- Comece pela skill "brainstorming" para alinhar estrutura e conceito antes de codar.
- Aplique: "frontend-design", "senior-frontend", "react-patterns",
  "vercel-react-best-practices", "ui-ux-pro-max", "typescript-pro", "clean-code".
- Ao final: "verification-before-completion" e "webapp-testing".

IDENTIDADE DA MARCA (obrigatório — brandbook oficial)
- Cores (use exatamente; design tokens em CSS vars + tailwind.config):
    Marinho (base/fundo):  #010238
    Vermelho (acento/CTA): #FF0000   (saturado — usar só em CTAs e detalhes)
    Branco:                #FFFFFF
- Tipografia: títulos em **Archivo** (700/800, caixa alta nos heroes), corpo em
  **Manrope** (400/500), metadados/números em **IBM Plex Mono**. Via next/font/google.
- Tom: profissional, técnico, sólido, confiável.
- Tagline: "Tecnologia e qualidade na fabricação e manutenção de produtos em fibra de vidro."

ESTRUTURA DO SITE
1. Hero — título forte + barra vermelha à esquerda + cena 3D (ver efeitos).
2. Sobre — +15 anos, trajetória, engenharia e valores.
3. Soluções — Tubos e conexões RPVC/PRFV; Reservatórios PRFV; ETA; ETE.
   Cada um com cards (Funções/Aplicações, Fabricação, Manutenção).
4. Serviços — fabricação, instalação e manutenção.
5. Infraestrutura — a fábrica e instalações (galeria).
6. Projetos & Clientes — obras realizadas (Sabesp, Sanepar e outras) + prova social
   de feiras (Fenasucro & Agrocana).
7. Contato — formulário (nome, telefone, e-mail, mensagem), telefones (19) 3537-1777 e
   (19) 3537-1786, e-mail comercial@jefiber.com.br, endereço (Estrada Municipal do Biri,
   nº 230, Ipeúna/SP), mapa e botão de WhatsApp (https://wa.me/5519996063421 — flutuante).
8. Rodapé — logo, links, redes: Instagram (je.fiber), LinkedIn (je-fiber-7b956b140),
   Facebook (jefiber).

STACK (melhores tecnologias atuais)
- Next.js 15 (App Router) + TypeScript + Tailwind CSS.
- React Three Fiber (@react-three/fiber) + @react-three/drei
  (+ @react-three/postprocessing para bloom) → cena 3D do hero.
- GSAP + ScrollTrigger + @gsap/react (hook useGSAP para cleanup). GSAP é gratuito hoje.
- Lenis → scroll suave.
- Deploy de PREVIEW na Vercel, para eu enviar o link ao dono aprovar.

EFEITOS 3D E ANIMAÇÕES (capriche — é proposta para vender)
1. HERO com cena 3D TEMÁTICA em React Three Fiber: um tubo/cilindro de fibra de vidro
   com filamentos se "enrolando" nele (referência ao processo real de filament winding
   da empresa), reagindo ao mouse e ao scroll. Fundo marinho (#010238) com leve textura
   de fibra. Carregar com dynamic(() => import(...), { ssr:false }) + <Suspense>.
2. Scroll suave global (Lenis) sincronizado com o ScrollTrigger.
3. Revelação de texto por linha (SplitText + ScrollTrigger) nos títulos.
4. Cards das Soluções com tilt 3D seguindo o mouse e profundidade nos elementos.
5. Parallax discreto nas fotos de infraestrutura/projetos.
6. Seção Projetos/Soluções em scroll horizontal preso (pin do ScrollTrigger).
7. Números que contam: +15 anos de experiência, nº de projetos/clientes (preencher).
8. Cursor customizado magnético sobre links e cards.
9. Botão de WhatsApp flutuante com leve pulsação; CTAs com efeito magnético.
10. Hover nos cards de Soluções revelando uma imagem/preview do produto que acompanha o mouse.
11. Transição suave entre seções (e, se virar multipágina, transição de página animada).
12. Linhas/réguas técnicas que se "desenham" ao entrar na tela (combina com o ar de engenharia).

REQUISITOS TÉCNICOS
- Performance: lazy-load do 3D, baixa contagem de polígonos, pausar o render do canvas
  fora da viewport, reduzir/desligar o 3D no mobile.
- Acessibilidade: respeitar @media (prefers-reduced-motion: reduce); contraste AA
  (testar o vermelho puro sobre o marinho); teclado e aria-labels.
- Responsivo 320–1920px+. SEO (metadados, Open Graph, título por seção).
- Cleanup de GSAP (useGSAP) e do loop do Three.js ao desmontar.
- As fotos ficam em /public/images. Onde faltar conteúdo, usar placeholders e marcar TODO.
- Não recriar logos de clientes; usar as fotos reais das obras.

COMO PROCEDER
1. Brainstorm e me apresente: estrutura final, conceito visual do 3D do hero e o que vai
   instalar. Espere meu OK.
2. Implemente por etapas (tokens da marca + layout → scroll/reveal → 3D do hero →
   demais efeitos), me mostrando cada uma rodando.
3. No fim, build + preview na Vercel para eu enviar ao dono.
```

---

## 6. Tipografia — escolha final

**Archivo** (display/títulos) + **Manrope** (corpo) + **IBM Plex Mono** (mono/números).
Todas gratuitas no Google Fonts. Carregar via `next/font/google`.

Regra de uso:
- Títulos hero: Archivo 800/900, caixa alta, letter-spacing negativo (-0.02em).
- Subtítulos/leads: Archivo 700, caixa alta.
- Corpo/parágrafos: Manrope 400/500, normal.
- Rótulos, medidas, números (+15 anos, PRFV, CEP): IBM Plex Mono 400/500, letter-spacing largo.
- Botões/CTAs: Manrope 600/700, caixa alta, letter-spacing moderado.
