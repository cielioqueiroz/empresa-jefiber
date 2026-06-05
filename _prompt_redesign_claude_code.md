# Prompt para o Claude Code — Redesign jeFiber

Quero redesenhar o visual do meu site (Next.js 15 / React 19 / Tailwind) seguindo EXATAMENTE o estilo do protótipo que está na raiz do projeto: `_prototipo_redesign.html`. Abra esse arquivo e use-o como referência de direção visual (3D, glassmorphism, bento, animações). NÃO copie os textos placeholder dele — mantenha o conteúdo real das seções.

## Regras inegociáveis
1. Manter as 3 cores da marca (já em `tailwind.config.ts` e `globals.css`):
   - marinho `#010238` (fundo/base)
   - marinho-2 `#0a0c4a` (superfície)
   - papoula `#ff0000` (destaque/CTA)
   - branco `#ffffff` (texto)
   NÃO introduzir verde/lime nem nenhuma cor nova. Acentos sempre papoula.
2. Manter as fontes já configuradas: Archivo (display), Manrope (body), IBM Plex Mono (tech).
3. Aproveitar o stack já instalado — NÃO adicionar libs novas sem necessidade: three, @react-three/fiber, @react-three/drei, @react-three/postprocessing, gsap, @gsap/react, lenis. Evoluir os componentes existentes, não reescrever do zero.
4. Não quebrar os testes (vitest) nem o build.

## Bugs de legibilidade a corrigir primeiro (críticos)
- Títulos de seção ("UMA JORNADA…", "ENGENHARIA EM FIBRA…") estão quase invisíveis (texto escuro sobre fundo escuro / reveal travando em estado invisível). Garanta branco `#fff` com `text-shadow` sutil e revise `components/ui/RevealText.tsx` para NUNCA terminar/parar em opacidade 0 ou translate fora da tela.
- Textos de card sobre fotos (Soluções) com baixo contraste: aplicar scrim forte (gradiente marinho `from-[#010238]/95` na base do card) antes do texto.

## Efeitos e animações a implementar (espelhar o protótipo)
**HERO** — `components/sections/Hero.tsx` + `components/three/HeroCanvas.tsx` + `FiberTube.tsx`
- Objeto 3D de "trama de fibra": núcleo marinho metálico + wireframe papoula emissivo + casca de glow aditivo + campo de partículas. Manter o Bloom do postprocessing.
- Parallax de câmera reagindo ao mouse (lerp suave) e leve parallax no scroll.
- Posicionar o objeto à direita; texto à esquerda com a barra papoula com glow.
- Título com reveal em "máscara" (linhas subindo de `overflow:hidden`), subtítulo e CTAs com fade escalonado.

**PROFUNDIDADE / GLASSMORPHISM (sistema reutilizável)**
- Criar um estilo de card de vidro: bg gradiente marinho/marinho-2 translúcido, border branco/10, sombra escura + inset highlight, border-radius ~18px.
- Hover: borda papoula + glow papoula (box-shadow). Aplicar a stats, soluções, projetos.

**BENTO GRID** — `components/sections/Solucoes.tsx` (e Servicos/Projetos quando fizer sentido)
- Cards de tamanhos variados (grandes, altos, largos, pequenos) para criar ritmo, como no protótipo. Aproveitar/expandir `components/ui/TiltCard.tsx` para tilt 3D real seguindo o cursor (rotateX/Y + leve translateY).

**STATS** — `components/sections/Sobre.tsx` + `components/ui/Counter.tsx`
- Números grandes em Archivo, com contadores animados ao entrar na viewport (respeitando `prefers-reduced-motion`). Sufixos (+ / %) em papoula.

**COREOGRAFIA DE SCROLL** — usar GSAP + ScrollTrigger (registrar o plugin)
- Reveals escalonados das seções/cards (IntersectionObserver ou ScrollTrigger).
- Parallax nas imagens das seções de fotos.
- Considerar pin/escala na seção de stats. Integrar com o Lenis já existente (`SmoothScroll.tsx`) — sincronizar ScrollTrigger com o scroll do Lenis.

**MICRO-INTERAÇÕES**
- Botões magnéticos (CTA se move suavemente em direção ao cursor).
- Links do header com underline papoula animado.
- Header: muda o fundo (mais opaco) ao rolar.
- Marquee técnico (PRFV · RPVC · Reservatórios · …) entre seções.

## Acessibilidade e responsividade (obrigatório)
- Respeitar `@media (prefers-reduced-motion: reduce)` já presente em `globals.css`: desligar 3D pesado, tilt, parallax e contadores nesse modo.
- Carregar o canvas 3D só em telas md+ e via dynamic import (`ssr:false`), como já é feito.
- Cap de dpr (`[1, 1.5–1.8]`) e frameloop pausado quando o hero sai da viewport.
- Layout 100% responsivo: bento colapsa para 1–2 colunas no mobile; nav vira menu.
- Manter o outline de foco papoula (`focus-visible`) e contraste AA em todos os textos.

## Performance
- Não renderizar o 3D fora da viewport (IntersectionObserver, já existe).
- Lazy-load de imagens; usar `next/image` onde possível.

## Entrega e verificação (faça antes de dizer que terminou)
1. Implemente seção por seção (Hero → Sobre/Stats → Soluções/Bento → demais).
2. Rode `npm run build` e `npm run test` e garanta que passam.
3. Rode `npm run dev`, tire screenshots de desktop e mobile de cada seção e compare visualmente com `_prototipo_redesign.html`. Ajuste até ficar fiel.
4. Cheque que NENHUM título ficou invisível e que o contraste está ok.
5. Liste no final os arquivos alterados e o que mudou em cada um.

Comece abrindo `_prototipo_redesign.html`, depois mapeie os arquivos atuais em `app/` e `components/` e me apresente um plano curto antes de editar.
