# DESIGN.md — Valença & Antunes

Norte: **"O Protocolo"** — a linguagem visual dos artefatos jurídicos brasileiros físicos
(capa de Vade Mecum, papel timbrado, carimbo de protocolo, petição datilografada, rubrica
a caneta) traduzida em interface. Nada decorativo sem ancestral documental.

## Tema

Drenched: o vinho-oxblood (cor de capa de código jurídico encadernado) é a superfície do
site, não um acento. As seções de papel são exceções estruturais — "o documento aberto
sobre a mesa" — e recebem cabeçalho de papel timbrado (`.timbre`) com numeração de folha.
O vermelho-carimbo é o único acento, usado como um carimbo aparece num processo: raro e
significando aprovação/ação.

## Cores (OKLCH; fallback hex no globals.css)

| Token | Valor | Papel |
|---|---|---|
| `--vinho` | oklch(25.5% 0.05 20) | superfície base (body) |
| `--vinho-2` | oklch(29.5% 0.055 20) | seções elevadas (calculadora), hovers no escuro |
| `--vinho-3` | oklch(19.5% 0.042 20) | footer, header rolado, menu mobile |
| `--papel` | oklch(96.5% 0.007 30) | seções-documento (áreas, sócios, contato), guia |
| `--papel-2` | oklch(93% 0.01 30) | hover sobre papel |
| `--tinta` | oklch(25% 0.03 20) | headings e texto forte sobre papel |
| `--tinta-2` | oklch(44% 0.028 20) | texto corrido sobre papel (≥4.5:1) |
| `--carimbo` | oklch(55% 0.185 30) | acento vivo: carimbos, rubrica, hover de CTA |
| `--carimbo-tinta` | oklch(47% 0.165 28) | acento legível sobre papel: CTAs, §, OAB |
| `--carimbo-claro` | oklch(76% 0.105 35) | acento legível sobre vinho: tags, protocolo |
| `--texto-v` / `--texto-v-forte` | oklch(87%/97%) | corpo / forte sobre vinho |

Regra: o carimbo aparece em poucos elementos por viewport. Sem dourado, sem navy — esses
são os clichês da categoria que este template existe para evitar.

## Tipografia

| Papel | Família | Uso |
|---|---|---|
| Display | **Besley** (Clarendon revival) 500–600, itálico raro | h1–h3, masthead do footer, logo. A letra de certificados e selos oficiais do séc. XIX: afirma sem gritar. |
| Corpo/UI | **Archivo** 300–600 | parágrafos, nav, botões, inputs |
| Protocolo | **Courier Prime** 400/700 | datilografia oficial: `.protocolo`, `.timbre`, `.carimbo`, labels de campo, números §, OAB, datas, foot-bottom |

Escala: h1 `clamp(2.5rem, 5vw, 4.3rem)` (estrofe de 4 linhas deliberada no hero);
h2 `clamp(2rem, 3.8vw, 3rem)`. Corpo 16.5px, weight 300, line-height 1.75.
Mono nunca em texto corrido — só em rótulos curtos datilografados.

## Assinaturas do sistema

- **`.timbre`** — cabeçalho de papel timbrado ("VALENÇA & ANTUNES — ADVOCACIA · FOLHA 01/03")
  abrindo cada seção de papel. É o único "eyebrow" do site e é um sistema nomeado.
- **`.carimbo`** — selo com borda dupla, rotação de -2.5° e textura de tinta falhada
  (mask SVG com feTurbulence). Aparece no hero e nos estados de sucesso
  (`.resultado`, `.ok`), com animação `carimbar` (scale 1.25→1).
- **`.protocolo`** — linha datilografada em Courier (hero, insights).
- **Rubrica** — traço de caneta SVG sob a palavra-argumento do h1. Uma vez por página.
- **§ numerados** — só nas cláusulas de áreas de atuação, onde a sequência é real.
- **Guia de cálculo** — a calculadora é um formulário de papel com pontilhado vermelho
  destacável no topo, flutuando sobre a mesa vinho.

## Hero 3D ("os autos")

`Hero3D.tsx`: Three.js importado dinamicamente (fora do bundle inicial). Pilha de 13
folhas A4 (10 no mobile) em hélice, uma folha em vermelho-carimbo (a rubrica nos autos).
Luz quente de abajur + rim carimbo. Flutuação senoidal + parallax de ponteiro (lerp).
DPR ≤ 2, pausa fora do viewport e com aba oculta, `prefers-reduced-motion` = 1 frame
estático, fallback 2D em CSS sem WebGL, dispose completo no unmount.

## Motion

- Entrada do hero: stagger CSS (`subir`, .9s, cubic-bezier(.16,1,.3,1)), delays 50–520ms.
- Reveals ao scroll: `Reveal.tsx` (IntersectionObserver), visível por padrão sem JS
  (`@media (scripting:enabled)`).
- Carimbadas: `carimbar` .45s nos estados de sucesso.
- Hovers: .25s ease-out (fundo/cor); seta das cláusulas desliza 6px.
- Tudo desligado em `prefers-reduced-motion: reduce`.

## Layout

- `.wrap` 1200px. Seções `clamp(88px, 11vw, 140px)` vertical; `scroll-margin-top` 64px.
- Geometria ortogonal: `border-radius: 0` em tudo (exceto o botão do WhatsApp).
- Linhas de 1px como linguagem de separação (cláusulas, posts, fichas de sócios,
  expediente). Sombra só na guia de papel (profundidade física real).
- Sem cards em grid: cláusulas, posts e sócios são fileiras editoriais separadas por
  linhas.
- Breakpoints: 1024px (sticky off), 940px (nav burger, hero 1 coluna, fileiras empilham),
  560px (form 1 coluna, footer 1 coluna).

## Não fazer

- Dourado/navy, serifa delicada, foto de martelo/balança/colunas.
- Gradiente em texto, glassmorphism (blur só no header rolado), border-left de acento.
- Carimbo/protocolo replicados como grammar de toda seção — escassez é a mensagem.
- Bold 700 em headings Besley (600 é o teto).
- Newsletter como destaque de primeiro nível (é uma faixa discreta antes do footer).
