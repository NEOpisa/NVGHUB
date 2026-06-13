# Studio Aura — template premium para beleza & estética

Template one-page para studios de estética, salões e clínicas de beleza no
Brasil. Sem backend, sem mensalidade: o agendamento gera uma mensagem pronta
de **WhatsApp** — o canal onde a conversão realmente acontece.

## Personalize em um arquivo

Todo o conteúdo editável vive em **`app/site.config.ts`**: nome do studio,
WhatsApp, Instagram, endereço, rituais (serviços/preços), equipe, galeria,
depoimentos e textos do hero. Troque os valores e o site inteiro se atualiza —
nenhum texto está hard-coded em componente.

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # build de produção (site estático)
```

## O que vem dentro

- **Hero com shader WebGL** (`SilkCanvas.tsx`): seda de mel fluida escrita em
  GLSL puro, zero dependências. Reage ao cursor, pausa fora da tela, congela em
  `prefers-reduced-motion` e cai num gradiente CSS se não houver WebGL.
- **Agendamento sem backend** (`Agendar.tsx`): três escolhas viram uma mensagem
  de WhatsApp pré-montada, com prévia ao vivo em bolha de chat. O cliente vê
  exatamente o que será enviado.
- **Menu de rituais** (`Rituais.tsx`): lista editorial com prévia lateral fixa
  que troca em crossfade conforme o ritual sob o cursor; clicar num ritual rola
  até o agendamento já com o serviço selecionado.
- **Antes & depois** (`AntesDepois.tsx`): comparador por arrasto (funciona com
  toque e teclado) com **fotos reais da mesma cliente** — natural na preparação
  × produção completa (Pexels, uso comercial liberado). Troque pelos seus
  resultados em `public/antes-depois/`.
- **Clube de fidelidade** (`ClubeAura.tsx`): cartão com tilt 3D e brilho
  holográfico que segue o ponteiro; selos interativos.
- **Galeria horizontal**, depoimentos editoriais, equipe com monogramas
  (suba retratos reais preenchendo `foto` na config).

## Trocar as fotos

As imagens da demo vêm do Unsplash/Pexels via `site.config.ts`. Substitua as
URLs pelas suas (ou por arquivos em `public/`) — qualquer foto 4:5 funciona
bem nos retratos e prévias.

## Conferir o resultado (screenshots)

Com o site rodando (`npm run dev` ou `npm start`):

```bash
npm run shot          # desktop 1440px, página inteira em fatias → /tmp/aura-shot-NN.png
npm run shot:mobile   # mobile 390px @2x
node scripts/screenshot.mjs --url=http://localhost:3000 --out=shots/home --single --scroll=2400
```

Não precisa instalar nada do npm: o script fala CDP direto com o
`chrome-headless-shell` do cache do puppeteer (ou use `CHROME_BIN=...`).

## Identidade

Sistema de design documentado em `DESIGN.md` (paleta OKLCH, Gloock + Hanken
Grotesk, regras de movimento). Direção estratégica em `PRODUCT.md`. Para mudar
a cor da marca, ajuste os tokens `--honey-*` em `app/globals.css`.

---

Stack: Next.js 14 (App Router) · React 18 · TypeScript · CSS puro (sem
Tailwind, sem libs de UI). First load ≈ 95 kB.
