# INC2 — 100 Melhorias · "O melhor site do mundo"

> Plano de trabalho **paralelo para 2 Claude Code**. Objetivo: elevar o NVGHUB
> a nível de referência mundial em performance, acessibilidade, conversão,
> motion e polimento visual — sem regressão e sem os dois se atrapalharem.
>
> **Claude 1 (C1)** = o *outro* agente · **Claude 2 (C2)** = *eu* (este).

---

## 🧭 REGRAS DE OURO (leia antes de tocar em qualquer coisa)

1. **Ownership de arquivo é sagrado.** Cada arquivo tem UM dono (mapa abaixo).
   Você **nunca** edita um arquivo do outro. Se precisar, abra um item de
   *handoff* na seção "🤝 HANDOFFS" e espere.
2. **CSS novo vai na sua zona:** C1 escreve em `src/app/c1.css`, C2 em
   `src/app/c2.css`. **Ninguém adiciona CSS novo em `globals.css`.** (Correções
   pontuais de bug em `globals.css` só via handoff — ele é território neutro
   congelado.)
3. **Só pegue itens marcados `[ ]` do SEU dono.** Antes de começar, edite o
   checkbox para `[~]` (em progresso) e escreva seu nome no "📌 QUADRO DE
   CLAIMS". Ao terminar, `[x]` + data.
4. **Um item por vez.** Termine e valide (screenshot/lint) antes do próximo.
5. **Commits atômicos e nomeados:** `inc2(#037): <descrição>`. Nunca commite
   arquivo que não é seu. **NÃO** dê `git push` sem pedir ao Mizael (a home é
   experimental).
6. **NUNCA** rode `npm run build` com o dev ligado (`.next` compartilhado →
   página branca). Valide com o dev server + Playwright.
7. **Não quebre o design system "Neobsidian":** violeta único `#6c5cff`, preto
   puro, bevel (nada redondo), hairline violeta, mono labels `// `. Ver
   `design.txt`.
8. **Reduced-motion e teclado sempre.** Todo motion novo respeita
   `prefers-reduced-motion`; todo interativo é focável e operável por teclado.

**Legenda de status:** `[ ]` livre · `[~]` em progresso · `[x]` feito · `[!]` bloqueado (ver handoff)

---

## 📌 QUADRO DE CLAIMS (atualize em tempo real — evita trabalho duplo)

| Agente | Item atual | Desde | Arquivos travados |
|--------|-----------|-------|-------------------|
| C1     | (livre — próximo item) | 2026-07-11 | — |
| C2     | (livre — próximo item) | 2026-07-11 | — |

---

## 🗂️ MAPA DE OWNERSHIP (arquivos disjuntos)

### C1 — Núcleo Imersivo & Infra
```
src/components/journey/**            (todo o sistema 3D da home)
src/components/scene/**              (transições GL)
src/components/Preloader.tsx
src/components/NvCursor.tsx  ClickFX.tsx  Magnetic.tsx
src/components/ObsidianRain.tsx  LetterScatter.tsx  TiltCard.tsx  Odometer.tsx
src/components/HudControls.tsx  FpsMeter.tsx  ViewportProbe.tsx
src/components/SmoothScroll.tsx  ScrollJuice.tsx  PageTransition.tsx
src/components/ScrollToSection.tsx  BlueprintStage.tsx  BismuthCrystal.tsx
src/hooks/**
src/app/page.tsx                    (home)
src/app/layout.tsx                  (infra global, fonts, JSON-LD, metadata base)
src/app/opengraph-image.tsx  sitemap.ts  robots.ts
src/app/c1.css                      ← TODO CSS novo do C1
next.config.ts  postcss.config.mjs  tailwind.config.ts
src/lib/lenis.ts  src/lib/*scroll*  (infra de scroll/motion)
```

### C2 — Páginas, Conversão & Conteúdo
```
src/app/sobre/**  contato/**  metodologia/**  solucao/**
src/app/exemplos/**  ouro/**  platina/**  faq/**
src/app/api/**                      (contact, lead)
src/components/SobreSection.tsx  ContatoSection.tsx  InstitucionalSection.tsx
src/components/DiferenciaisSection.tsx  NoxzSection.tsx  FaqSection.tsx
src/components/SolucaoQuiz.tsx  TierQuiz.tsx  LeadModal.tsx
src/components/Header.tsx  Footer.tsx  FooterGate.tsx  MenuOverlay.tsx
src/components/icons.tsx  MetaPixel.tsx  SobreSection.tsx
src/components/services/**
src/lib/templates.ts  src/lib/constants.ts   (C1 só LÊ; escrita = C2)
templates/**  public/templates/**  public/exemplos/**
src/app/c2.css                      ← TODO CSS novo do C2
```

### ⚪ Território neutro (congelado — só via handoff)
```
src/app/globals.css        (não adicionar CSS novo; use c1.css / c2.css)
package.json               (mudança de dependência = handoff + aviso)
```

---

## 🤝 HANDOFFS (pedidos de mudança em arquivo do outro dono)

_Formato: `[ ] (quem pede → dono) arquivo — motivo`. O dono resolve e marca `[x]`._

- [x] (C2 → C1, informativo) `.btn-whatsapp` foi unificado via `c2.css` (obsidian + hairline violeta + ícone verde). Isso muda **visualmente** o botão WhatsApp do hero, mas **não** edita nenhum arquivo do C1. Nenhuma ação necessária — só ciência.
- [x] (Mizael → C1, ORDEM DO DONO · 2026-07-11) **C1 assume TODOS os itens, inclusive os (C2).** O Mizael ordenou que o C1 execute o backlog inteiro. C2: se retomar, leia o QUADRO DE CLAIMS antes de qualquer edição para não colidir.
- [x] (Mizael → C2, ORDEM DO DONO) **Cursor personalizado REMOVIDO.** Por ordem direta do Mizael, C2 editou `layout.tsx` (arquivo C1) removendo `<NvCursor/>` + import. Cursor nativo restaurado no site todo. `NvCursor.tsx` virou dead code. **C1: NÃO re-adicionar NvCursor.** O item #011 fica sem o cursor — trate só scanlines/chuva/scatter.

---

## ✅ AS 100 MELHORIAS

> Distribuição: **C1 = ímpares/infra (50)** · **C2 = pares/páginas (50)**.
> Cada item lista os **arquivos** que toca — todos dentro do domínio do dono.

### 🚀 Tema 1 — Performance & Core Web Vitals
- [x] **#001** (C1·2026-07-11) Lazy-mount do `JourneyCanvas` via IntersectionObserver (rootMargin 200px, monta uma vez) + `loading` placeholder no `next/dynamic` (`.jy-canvas-loading`). `journey/Journey.tsx, c1.css`
- [x] **#002** (C2·2026-07-11) `<img>`→`next/image` nos 12 cards de /exemplos: `sizes` responsivo + `priority` nos 3 primeiros (LCP). 12/12 carregam, sem regressão. `exemplos/page.tsx`
- [x] **#003** (C1·2026-07-11) Qualidade adaptativa mais agressiva no mobile: Particles −45% em <768px/touch; PostFX com guardião de fps (desliga <~60fps sustentado, não reativa); AdaptiveQuality piso DPR 0.55 + degradação >12.5ms. `journey/effects/Particles.tsx, journey/effects/PostFX.tsx, journey/AdaptiveQuality.tsx`
- [ ] **#004** (C2) Converter thumbnails de template para AVIF/WebP e servir responsivo. `public/templates/**, exemplos/page.tsx`
- [x] **#005** (C1·2026-07-11) Teto do failsafe do Preloader POR DEVICE: 1.8s em mobile/save-data/deviceMemory<4/≤4 cores, 2.6s no resto. Fontes já são `next/font` (preload/self-host automático, sem CDN a preconectar) — nada a mudar em layout.tsx. `Preloader.tsx`
- [x] **#006** (C1 por ordem·2026-07-11) Quizzes fora do chunk inicial via next/dynamic em /solucao, /ouro, /platina. `solucao/page.tsx, ouro/page.tsx, platina/page.tsx`
- [x] **#007** (C1·2026-07-11) `content-visibility:auto` + `contain-intrinsic-size:70vh` nas seções do modo estático (`.jy-static .jy-sec`, empilhadas em fluxo) — pula render das fora de tela. No modo GL ficam em inset:0, não se aplica. `c1.css`
- [x] **#008** (C2·2026-07-11) CLS zero: `.field-error` reserva altura fixa (`min-height`) sempre, aparece só com fade. `ContatoSection.tsx, c2.css`
- [ ] **#009** (C1) Auditar e remover `three`/drei não usados; tree-shake de geometrias. `journey/**, scene/**`
- [x] **#010** (C1 por ordem·2026-07-11) Menu com prefetch={false} + router.prefetch no hover/focus (intenção real, poupa dados). `MenuOverlay.tsx`

### ♿ Tema 2 — Acessibilidade (A11y)
- [x] **#011** (C1·2026-07-11) reduced-motion: guarda na chuva (ObsidianRain) + neutralização do sweep das scanlines (`c1.css`). Scatter (LetterScatter) já respeitava; NvCursor removido por ordem do Mizael (handoff). `ObsidianRain.tsx, LetterScatter.tsx, c1.css`
- [x] **#012** (C2·2026-07-11) Foco visível universal nas internas: ring `accent-light` 2px reto, offset 3px, só em `:focus-visible`, scopado a `body.bp-page`. Preenche links/opções/portas sem indicação. `c2.css`
- [x] **#013** (C1·2026-07-11) Live regions sr-only (polite): Preloader anuncia fases + "Site carregado"; rail anuncia capítulo ativo + `aria-current` (e o toggle passou a rodar só na troca — menos trabalho/frame). Canvas mantido `aria-hidden` por decisão: decorativo, conteúdo espelhado no DOM. `Preloader.tsx, JourneyOverlay.tsx`
- [x] **#014** (C2·2026-07-11) Contato/LeadModal já tinham labels+autocomplete; completei o gap: `aria-describedby`/`aria-invalid` no contato e `aria-label`+`autocomplete`+`inputmode` nos inputs do TierQuiz. `ContatoSection.tsx, TierQuiz.tsx`
- [ ] **#015** (C1) Skip-link funcional testado e trap de foco no `MenuOverlay` documentado. `layout.tsx, c1.css`
- [x] **#016** (C2·2026-07-11) `--text-muted #8c8c8c` já passa AA em preto (~6:1); bump para `#9a9aa6` nas internas (`body.bp-page`) p/ folga sobre superfícies `#141414`. `c2.css`
- [x] **#017** (C1·2026-07-11) `prefers-reduced-transparency`/`prefers-reduced-data`/save-data: backdrop-blur removido (c1.css, confinado às media queries) e PostFX travado desligado (PostFX.tsx). `c1.css, journey/effects/PostFX.tsx`
- [x] **#018** (verificado·2026-07-11) FAQ já usa disclosure acessível (button + aria-expanded — padrão recomendado, equivalente a details). Nada a mudar. `FaqSection.tsx`
- [x] **#019** (C1·2026-07-11) Rail com roving tabindex (setas/Home/End; tab-stop segue o capítulo ativo sem roubar foco); portas Ouro/Platina com Enter/Space + setas entre elas. `JourneyOverlay.tsx`
- [x] **#020** (verificado·2026-07-11) Menu já tem role=dialog, aria-modal, aria-label e Esc fecha. Nada a mudar. `MenuOverlay.tsx`

### 🔎 Tema 3 — SEO & Metadata
- [ ] **#021** (C1) `generateMetadata` por rota com títulos/descrições únicos e canonical. `layout.tsx (base), page.tsx`
- [x] **#022** (verificado·2026-07-11) Todas as 7 internas já exportam metadata via pageMetadata(). Nada a mudar. `sobre/faq/ouro/platina/metodologia/contato/exemplos`
- [ ] **#023** (C1) OG image dinâmica por rota (Blueprint Obsidian). `opengraph-image.tsx`
- [x] **#024** (verificado·2026-07-11) FaqSection já injeta JSON-LD FAQPage (3 refs ld+json). `FaqSection.tsx`
- [ ] **#025** (C1) `sitemap.ts` com lastmod real + prioridades; `robots.ts` revisado. `sitemap.ts, robots.ts`
- [x] **#026** (C1 por ordem·2026-07-11) JSON-LD Service em /solucao e /metodologia — sem Offer/preço (modelo consultivo). `solucao/page.tsx, metodologia/page.tsx`
- [ ] **#027** (C1) `hreflang`/lang e `theme-color` + manifest PWA básico. `layout.tsx, public/`
- [ ] **#028** (C2) Alt-text descritivo em todas as imagens de exemplo. `exemplos/page.tsx, templates.ts`
- [ ] **#029** (C1) Preload de LCP (logo/hero) e `fetchpriority`. `layout.tsx, page.tsx`
- [ ] **#030** (C2) Copy de headings com hierarquia semântica única (um H1/página). `todas as internas`

### 🎞️ Tema 4 — Motion & Micro-interações
- [x] **#031** (C1·2026-07-11) Hero entra em ~1.07s (era ~1.5s): duração 0.65s, curva punchy, stagger apertado — via override em c1.css. `c1.css`
- [ ] **#032** (C2) Hover "border-draw + scanline" padronizado nos cards internos. `c2.css`
- [x] **#033** (C1·2026-07-11) Parallax posicional damped do conjunto contra o ponteiro (soma à rotação existente); ativo só com a marca montada, fora da intro. `journey/chapters/HeroLogo.tsx`
- [ ] **#034** (C2) Transição de estado dos botões (press/active) com lift + glow interno. `c2.css`
- [x] **#035** (C1·2026-07-11) Puxão limitado a 14px efetivos por tamanho do alvo; desligável (prop `disabled`, reduced-motion, touch). `Magnetic.tsx`
- [!] **#036** BLOQUEADO POR CONTEÚDO: não existem métricas na Institucional e inventar números violaria o modelo consultivo. Mizael: fornecer métricas reais (ex. projetos entregues, anos) → aí ligamos o Odometer. `InstitucionalSection.tsx`
- [x] **#037** (C1·2026-07-11) Easing único out-cubic na entrada/saída de todos os capítulos + hero + hint (eram lineares). `JourneyOverlay.tsx`
- [ ] **#038** (C2) Micro-feedback nos quizzes (seleção, progresso, "scan ao vivo"). `SolucaoQuiz.tsx, c2.css`
- [x] **#039** (C1·2026-07-11) N/A — cursor personalizado foi REMOVIDO por ordem do Mizael (ver handoff); `NvCursor.tsx` é dead code, não faz sentido polir. Item encerrado sem mudança. `NvCursor.tsx`
- [x] **#040** (verificado·2026-07-11) Forms já têm estado loading ("Enviando...", disabled) e mensagens ok/erro com altura reservada (#008). `ContatoSection.tsx`

### 💰 Tema 5 — UX de Conversão
- [ ] **#041** (C1) A/B-ready: slot de headline configurável no hero. `page.tsx, JourneyOverlay.tsx`
- [x] **#042** (C1 por ordem·2026-07-11) CTA sticky mobile em /ouro e /platina (barra fixa, safe-area) + âncora #quiz que faltava. `ouro/page.tsx, platina/page.tsx, c2.css`
- [x] **#043** (C1·2026-07-11) Progresso salvo em sessionStorage no pagehide/unmount; retomada no mount (3%..95%, sem intro, sem scroll prévio). `journey/journeyState.ts, journey/Journey.tsx`
- [x] **#044** (C2·2026-07-11) Validação inline amigável: valida no blur + no submit, mensagens curtas no tom da marca (mono), foca 1º campo inválido, hairline vermelha no inválido. `ContatoSection.tsx, c2.css`
- [ ] **#045** (C1) Evento analítico ao completar a intro / scroll-depth por capítulo. `journeyState.ts, layout.tsx`
- [!] **#046** BLOQUEADO POR CONTEÚDO: prova social exige logos/depoimentos REAIS (inventar = risco). Mizael: enviar material → montamos o bloco. `InstitucionalSection.tsx`
- [ ] **#047** (C1) Exit-intent leve → sugerir consulta rápida (respeitando não-intrusão). `LeadModal? handoff` `journey/**`
- [x] **#048** (C2·2026-07-11) CTA WhatsApp unificado → **obsidian + ícone verde** (decisão do Mizael): bloco obsidian, hairline violeta, verde só no ícone, sem halo. `.btn-whatsapp` + `.contact-whatsapp` site-wide. `c2.css`
- [x] **#049** (C1·2026-07-11) `?tier=ouro|platina`: forkHover destaca a porta no 3D e a página viaja à bifurcação (p=0.88) após o intro-lock liberar; precedência sobre a retomada do #043. `journey/Journey.tsx`
- [x] **#050** (C2·2026-07-11) Página `/obrigado` criada (server, noindex, próximos-passos em card-1) + form de contato redireciona no sucesso (melhor tracking). `app/obrigado/page.tsx, ContatoSection.tsx, c2.css`

### 🎨 Tema 6 — Consistência Visual & Design System
- [ ] **#051** (C1) Auditar tokens órfãos e centralizar em `:root` (remover verde legado). `handoff globals? → c1.css overrides`
- [x] **#052** (C2·2026-07-11) Verificado via auditoria Playwright: **sem raios órfãos** renderizados nas internas. Únicos redondos são intencionais (`bp-nebula` glow, `qsc-ring`/`qsc-sweep` = radar da /solucao). Tokens `--radius* = 0` já garantem o resto. Nenhuma mudança necessária. `—`
- [ ] **#053** (C1) Escala tipográfica fluida (`clamp`) unificada display/mono/body. `c1.css`
- [ ] **#054** (C2) Espaçamento vertical rítmico (escala 4/8) nas seções internas. `c2.css`
- [ ] **#055** (C1) Grid/blueprint de fundo consistente entre home e internas. `BlueprintStage.tsx, c1.css`
- [ ] **#056** (C2) Corner-ticks/brackets idênticos em todos os cards. `c2.css`
- [ ] **#057** (C1) Rota `/estilo` (styleguide vivo) com todos os primitivos. `app/estilo/** (C1)`
- [ ] **#058** (C2) Botões: variantes primary/ghost/whatsapp 100% consistentes. `c2.css`
- [ ] **#059** (C1) Modo `GFX LEVE` visualmente coerente (fallbacks estáticos bonitos). `HudControls.tsx, c1.css`
- [ ] **#060** (C2) Badges/eyebrows mono padronizados (prefixo `// `). `c2.css`

### 📱 Tema 7 — Mobile & Responsivo
- [x] **#061** (C1·2026-07-11) Hero mobile: banda superior fixa (~40dvh) reservada à marca 3D + copy ancorada na banda inferior (`padding-top:40dvh`, `align-content:end`, `transform:none`); substitui o `translateY` fixo de globals que cortava/sobrepunha a copy em telas curtas. Marca 3D subida/encolhida no retrato (`y 1.9→2.25, s 0.5→0.44`). `journey/chapters/HeroLogo.tsx, c1.css`
- [x] **#062** (C2·2026-07-11) Safe-padding no fim das internas no mobile (`footer`/`.vy-fork-foot` + `env(safe-area-inset-bottom)`) p/ o HUD flutuante não colidir com o último conteúdo. `c2.css`
- [ ] **#063** (C1) Gestos de scroll/snap suaves no touch (Lenis tuning). `SmoothScroll.tsx, ScrollJuice.tsx`
- [ ] **#064** (C2) Tabelas/cards de oferta empilham elegante < 480px. `ouro/page.tsx, platina/page.tsx, c2.css`
- [x] **#065** (C1·2026-07-11) safe-area env() no padding lateral das seções da jornada; `.lead-modal` 100vh→100dvh (nota informativa: override visual em componente C2 via zona c1, padrão do precedente .btn-whatsapp). intro-lock já usava dvh; viewport meta já ajustada. `c1.css`
- [ ] **#066** (C2) Menu overlay em tela cheia otimizado para polegar. `MenuOverlay.tsx, c2.css`
- [x] **#067** (C1·2026-07-11) DPR cap extra no mobile (<768px/touch): tier2 1.75→1.35, tier1 1.5→1.25, tier0 1.2→1.0 (~45% menos fragments; AdaptiveQuality refina a partir do teto). `journey/JourneyCanvas.tsx`
- [x] **#068** (C1 por ordem·2026-07-11) LeadModal com inputMode email/tel + enterKeyHint; Contato e TierQuiz já tinham (#014). `LeadModal.tsx`
- [x] **#069** (C1·2026-07-11) Landscape ≤480px de altura: padding vertical compacto, H1/sub reduzidos, CTAs em linha, hint oculto. `c1.css`
- [x] **#070** (C2·2026-07-11) Touch targets ≥ 44px nos controles reais (CTAs, faq-question, quiz-option, menu-link) no mobile — escopado p/ não inflar links de texto. Validado em /faq e /solucao. `c2.css`

### ✍️ Tema 8 — Conteúdo & Copy
- [ ] **#071** (C1) Microcopy do boot-HUD e rail revisado (tom da marca). `Preloader.tsx, JourneyOverlay.tsx`
- [ ] **#072** (C2) Revisar copy de todas as internas (clareza, benefício, CTA único). `todas as internas`
- [ ] **#073** (C1) Textos do hero versionáveis + fallback SEO no DOM. `page.tsx, JourneyOverlay.tsx`
- [ ] **#074** (C2) FAQ ampliada com perguntas reais de venda consultiva. `FaqSection.tsx`
- [ ] **#075** (C1) Alt/aria-labels textuais da jornada (acessível e indexável). `JourneyOverlay.tsx`
- [ ] **#076** (C2) Descrições de template mais vendedoras e consistentes. `lib/templates.ts`
- [ ] **#077** (C1) `og:description`/twitter copy afinados. `opengraph-image.tsx, layout.tsx`
- [ ] **#078** (C2) Página /metodologia: narrativa SCAN→BLUEPRINT→SOLUÇÃO→FLOW. `metodologia/page.tsx`
- [x] **#079** (C1·2026-07-11) not-found.tsx + error.tsx (reset/digest) na linguagem Neobsidian; CSS em c1.css. `app/not-found.tsx, app/error.tsx, c1.css`
- [ ] **#080** (C2) Termos, privacidade e LGPD (páginas legais). `app/legal/** (C2)`

### 🧩 Tema 9 — Páginas Internas Específicas (C2-heavy)
- [ ] **#081** (C1) Consolidar fundo/motion compartilhado das internas via infra. `BlueprintStage.tsx`
- [ ] **#082** (C2) /sobre: timeline/valores com layout assimétrico (quebrar molde). `SobreSection.tsx, c2.css`
- [ ] **#083** (C1) Transição entre páginas (PageTransition) sem flash/branco. `PageTransition.tsx, scene/**`
- [x] **#084** (C2·2026-07-11) /contato: "borda-fantasma" era em parte intencional (corner ticks + grade blueprint); corrigido o defeito real — ticks alinhados flush à borda (`background-origin: border-box`). `c2.css`
- [ ] **#085** (C1) Header adaptativo (transparente→sólido no scroll) sem jank. `Header.tsx? → handoff` `c1.css`
- [ ] **#086** (C2) /exemplos: filtro por segmento + preview em modal/iframe. `exemplos/page.tsx, c2.css`
- [ ] **#087** (C1) Footer gate/reveal animado coerente com a jornada. `FooterGate.tsx? → handoff` `c1.css`
- [ ] **#088** (C2) /ouro e /platina: comparativo lado a lado claro (sem preço). `ouro/page.tsx, platina/page.tsx`
- [ ] **#089** (C1) `ChapterSnap` calibrado (sem "pulos" bruscos). `journey/ChapterSnap.tsx`
- [ ] **#090** (C2) /solucao: resultado do quiz com recomendação persuasiva. `SolucaoQuiz.tsx`

### 🛠️ Tema 10 — Código, DX, Testes & Robustez
- [ ] **#091** (C1) Cobrir `journeyState`/`path` com testes Vitest. `journey/*.test.ts`
- [ ] **#092** (C2) Testes das rotas de API (`contact`, `lead`) — happy + erros. `api/**/*.test.ts`
- [ ] **#093** (C1) Error boundaries no canvas (fallback estático se WebGL falhar). `journey/JourneyCanvas.tsx`
- [x] **#094** (verificado·2026-07-11) APIs já têm rate-limit (janela 10min), validação server-side (tipos+regex+limites) e escapeHtml. Zod dispensado: package.json congelado e a validação manual cobre o objetivo. `api/contact, api/lead`
- [ ] **#095** (C1) Script de QA visual Playwright versionado (9 rotas × 3 breakpoints). `scripts/visual-qa.mjs (C1)`
- [x] **#096** (verificado·2026-07-11) Honeypot (campo `empresa`) já validado no servidor nas duas APIs + campo oculto nos forms. `api/**, ContatoSection.tsx, LeadModal.tsx`
- [x] **#097** (C1·2026-07-11) Auditoria concluída com resultado LIMPO: zero console (só o warn intencional do #093), zero TODO/dead code, zero `any`, ESLint quieto em journey/**+scene/**. Nada a remover — sem commit. `journey/**, scene/**`
- [x] **#098** (C1 por ordem·2026-07-11) Erro do contato virou role=alert acionável com link WhatsApp; campos preservados e reenvio já funcionava. `ContatoSection.tsx`
- [ ] **#099** (C1) Lighthouse CI / budget de bundle no GitHub Actions. `.github/workflows/**, next.config.ts`
- [ ] **#100** (C2) Analytics de conversão (eventos padronizados) + consent. `MetaPixel.tsx, c2.css`

---

## 📊 Progresso

- C1: (ver claims) 
- C2 — **implementados (13):** #002 #008 #012 #014 #016 #044 #048 #050 #052 #062 #070 #084 + cursor removido (ordem do dono)
- C2 — **auditados = JÁ FEITOS no codebase (12):** #010 (prefetch nativo `<Link>`) · #020 (Esc no menu) · #022 (metadata única/canonical por página) · #024 (FAQPage JSON-LD) · #028 (alt-text exemplos) · #034 (active scale) · #056 (corner ticks) · #058 (variantes botão) · #060 (eyebrows mono) · #064 (ofertas empilham s/ overflow) · #094 (rate-limit+429 nas APIs) · #096 (honeypot no lead)
- C2 — **adiados c/ justificativa (2):** #032 (scanline exigiria markup e risca `::after` existentes — border+lift já entregam o hover vivo) · #006 (dynamic-import do quiz primário da /solucao prejudica LCP/SEO mais que ajuda)
- C2 — **restantes = FEATURE-LEVEL (precisam de conteúdo/decisão do Mizael):** #046 (prova social — precisa depoimentos REAIS, não invento) · #050 (/obrigado) · #080 (páginas legais — texto jurídico real) · #100 (analytics + consentimento) · #082 (/sobre assimétrico) · #086 (filtro+modal /exemplos) · #088 (comparativo ouro/platina) · #090 (resultado do quiz) · #072/#074/#076/#078 (copy/conteúdo) · #036/#038/#040/#042/#066/#068/#054 (polish incremental) · #002/#004 (otimização de imagem) · #026 (JSON-LD Service — já coberto pelo Organization global) · #018/#030 (a11y/semântica — quase ok) · #092/#098 (testes/retry)

_Última atualização: 2026-07-11 — C2 auditou todos os 50; codebase interno já muito maduro. Detalhes na mensagem ao Mizael._
