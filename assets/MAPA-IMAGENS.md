# Mapa de assets — JE FIBER

Organização das fontes fornecidas. Quando o projeto Next.js for criado, as fotos
usadas vão para `public/images/` (otimizadas). Este `assets/` é o acervo-fonte.

```
assets/
├── briefing/      BRIEFING_JEFIBER.md         (briefing original)
├── marca/         logo-jefiber.png            (logo oficial, PNG transparente)
│                  JE-FIBER-Brandbook-Pomelli.pdf
├── referencias/   site-original-produtos.png  (print do site ATUAL — só referência)
│                  hero-mock.png               (mock do hero — referência de direção)
└── fotos/         jeFiber_01.png … jeFiber_32.png  (fotos reais da empresa)
```

## Logo
- `fotos/jeFiber_01.png` = **logo oficial** JE FIBER (também copiado em `marca/logo-jefiber.png`).

## Mapeamento foto → seção (confirmado por inspeção visual)

| Arquivo | Conteúdo | Seção sugerida |
|---|---|---|
| jeFiber_01 | Logo JE FIBER (PNG transparente) | Header / Footer |
| jeFiber_02 | Operário inspecionando tubo grande no caminhão | Serviços (transporte/instalação) |
| jeFiber_03 | Operário fazendo manutenção em tanque branco (banner wide) | Serviços (manutenção) |
| jeFiber_05 | Conexões/flanges de fibra na bancada | Soluções › Tubos e conexões |
| jeFiber_06 | Reservatório vertical c/ faixa laranja (industrial) | Soluções › Reservatórios / ETA |
| jeFiber_07 | Fachada da sede com totem JE FIBER | Sobre |
| jeFiber_08 | Estação de tratamento c/ vários tanques (Sabesp) | Soluções › ETA/ETE · Projetos |
| jeFiber_09 | Tanque amarelo (detalhe bocas de visita) | Soluções › Reservatórios (fabricação) |
| jeFiber_10 | Reservatórios PRFV azuis c/ faixa branca ★ | Soluções › Reservatórios (destaque) |
| jeFiber_11 | Fachada da fábrica JE FIBER (totem azul) | Sobre / Infraestrutura |
| jeFiber_12 | Tubos PRFV empilhados (crop vertical) | Soluções › Tubos e conexões |
| jeFiber_13 | Vista aérea da fábrica azul (crop vertical) | Infraestrutura |
| jeFiber_14 | Estação ETA/ETE com tubulação amarela | Soluções › ETA/ETE |
| jeFiber_16 | Tubos PRFV verdes empilhados no campo ★ | Hero (alt) · Tubos e conexões |
| jeFiber_17 | Tanque Sanepar içado por guindaste ★ | Projetos & Clientes (Sanepar) |
| jeFiber_20 | Feira Fenasucro & Agrocana | Prova social |
| jeFiber_24 | Equipe no stand (feira) | Prova social |
| jeFiber_26 | Interior da fábrica — produção de tubos ★ | Serviços (fabricação) / Infraestrutura |
| jeFiber_27 | Engenheiros analisando a planta técnica ★ | Sobre (engenharia) |
| jeFiber_29 | Vista aérea da fábrica azul + pátio de tanques ★★ | Infraestrutura (destaque) |
| jeFiber_31 | Stand JE FIBER + equipe + parede da marca | Prova social |

## Ainda não catalogadas individualmente (pool de galeria)
`jeFiber_04, _15, _18, _19, _21, _22, _23, _25, _28, _30, _32` — serão revisadas
e distribuídas nas galerias de Infraestrutura / Projetos / Soluções durante o build.

## Não usar
- Qualquer imagem com marca d'água de banco (Shutterstock) — não licenciada (ver briefing §4).
- Não recriar logotipos vetoriais de clientes (Sabesp/Sanepar); usar as fotos reais das obras.
