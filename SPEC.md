# SPEC.md — Site Institucional NeoVanguard

## Contexto do Projeto

**Empresa:** NeoVanguard — Agência de Soluções Digitais  
**Fase atual:** Fase 1 (Fundação) — empresa em estruturação, ainda sem CNPJ formal  
**Time:** 4 cofundadores (Mizael, Daniel, Kauã, João) — 25% cada  
**Objetivo do site:** Apresentar a agência ao mercado, transmitir credibilidade para pequenas empresas locais e atrair os primeiros clientes pagantes

---

## Audiência-Alvo

**Primária:** Pequenos negócios locais sem presença digital (barbearias, restaurantes, lojas, clínicas)  
**Secundária:** Potenciais parceiros, freelancers e futuros investidores

**Perfil do decisor:** Dono de negócio, 30–55 anos, não técnico, que precisa sentir que a NeoVanguard é séria e acessível ao mesmo tempo.

---

## Tom e Posicionamento

- **Institucional mas approachable** — sério o suficiente para gerar confiança, humano o suficiente para não intimidar
- Não usar jargão técnico pesado (evitar: "infraestrutura", "stack", "deploy")
- Linguagem direta, objetiva, orientada a resultado para o cliente
- **Proibido:** buzzwords como "soluções inovadoras", "transformação digital", "cutting-edge"
- Focar no concreto: "criamos seu site e entregamos com rapidez e qualidade", "você aparece no Google"

---

## Stack Técnica

- **Framework:** Next.js 14+ (App Router)
- **Estilização:** Tailwind CSS
- **Deploy:** Vercel
- **Sem backend** por enquanto — site 100% estático na primeira versão
- **SEO:** meta tags, Open Graph, sitemap.xml gerado automaticamente

---

## Seções (ordem sugerida)

### 1. Hero
- Tagline forte, direta, orientada ao problema do cliente
- Subtexto explicando o que a NeoVanguard faz em 1–2 frases
- CTA primário: "Solicitar orçamento" (link para WhatsApp ou âncora para contato)
- Visual: impactante, sem foto de banco de imagem genérica

### 2. O que fazemos (Serviços)
- 3 linhas de serviço principais:
  - **Sites e Landing Pages** — presença digital rápida
  - **Sistemas para negócios** — cardápio digital, agendamento, catálogo
  - **SaaS próprio** (em breve) — produto escalável em desenvolvimento
- Apresentar com resultado, não com feature: "Seu cliente encontra você no Google" > "Site responsivo com SEO"

### 3. Por que a NeoVanguard
- 3–4 diferenciais reais e verificáveis:
  - Entrega em até 7 dias úteis
  - Time técnico completo (design + dev + infra)
  - Suporte pós-entrega via WhatsApp
  - Preços acessíveis para pequenos negócios

### 4. Time
- 4 cofundadores com foto, nome, cargo e área de atuação
- Apresentar de forma humana, não corporativa
- Mizael — Gestão & Código  
- Daniel — Design & Front-end  
- Kauã — Marketing & Vendas  
- João — Back-end & Infraestrutura

### 5. Contato / CTA Final
- Formulário simples via Formspree (nome, e-mail, mensagem) — zero backend
- Alternativa/complemento: botão WhatsApp direto
- Reforçar região de atuação se quiserem capturar mercado local

---

## Identidade Visual

**Status atual:** Logo e paleta existem mas podem ser revisadas
**Referência atual:** https://neopisa.github.io/NeovanguardHub/

**Observações:**
- Paleta escura com roxo/azul — mantém o posicionamento técnico
- Tipografia atual é genérica — upgrade recomendado
- O IMPECCABLE vai sugerir refinamentos via palette.mjs; aceitar as críticas

**Diretrizes:**
- Usar as cores atuais como ponto de partida (preservar identidade da marca)
- Fundo escuro (#0d0d0d ou similar) + acento na cor da marca
- **Proibido pelo IMPECCABLE:** gradiente de texto, glassmorphism decorativo, cards idênticos em grid, eyebrow em toda seção, cream/sand background

---

## Tipografia

- **Display/Heading:** Syne, Cabinet Grotesk, Clash Display ou DM Sans Bold
- **Body:** Plus Jakarta Sans, DM Sans Regular (Inter é aceitável pela seriedade)
- Máximo 2 famílias tipográficas
- Hierarquia clara: H1 impacto, H2 orientação, body clareza

---

## Motion

- Entrada suave nas seções via scroll (fade + translate, sem bounce)
- Micro-interações nos CTAs (hover nos botões)
- Nada excessivo — site institucional, não portfólio criativo
- Usar `framer-motion` ou CSS transitions simples

---

## SEO e Performance

- Title: "NeoVanguard — Agência de Soluções Digitais"
- Meta description: focada no benefício para o cliente local
- Imagens otimizadas com `next/image`
- Core Web Vitals: LCP < 2.5s, sem layout shifts

---

## Restrições da v1

- Sem CMS — conteúdo hardcoded
- Sem blog
- Sem troca de idioma
- Deploy na Vercel (integrado com GitHub)

---

## Fluxo Recomendado com IMPECCABLE

```
1. /impeccable init           → cria PRODUCT.md e DESIGN.md, define paleta
2. /impeccable craft hero     → seção Hero
3. /impeccable craft services → seção de serviços
4. /impeccable craft team     → seção do time
5. /impeccable craft contact  → seção de contato
6. /impeccable critique       → avaliação geral com score
7. /impeccable polish         → refinamento final
8. /impeccable audit          → checagem de a11y, responsividade, performance
```

> Dica: rode `/impeccable init` antes de qualquer coisa. Se reportar `NO_PRODUCT_MD`, siga as instruções antes de continuar.

---

## Referências Visuais

Tom desejado: institucional + approachable + fundo escuro
- linear.app
- railway.app
- resend.com

**O que absorver:** densidade controlada, tipografia com peso, espaçamento generoso, CTAs claros.  
**O que evitar:** animações excessivas, layouts de agência criativa, visual de portfólio.
