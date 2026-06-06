# Design

> Seed generated from SPEC.md pre-implementation. Re-run `/impeccable document` once real CSS tokens and components exist to replace this with a code-derived capture.

## Theme

Dark-mode-first institutional site. Deep neutral background with a single strong brand accent (purple-blue family). High contrast for legibility and authority; color is deliberate, not decorative. The palette signals technical competence without feeling cold.

## Color

| Role | Value | Notes |
|---|---|---|
| Background | `#0d0d0d` | Near-black — primary surface |
| Surface | `#141414` | Cards, sections — 1 step up |
| Surface raised | `#1c1c1c` | Hover states, subtle elevation |
| Border | `#2a2a2a` | Dividers, outlines |
| Text primary | `#f0f0f0` | High-contrast body |
| Text secondary | `#a0a0a0` | Supporting copy, captions |
| Text muted | `#606060` | Meta, timestamps, labels |
| Accent | `#7c3aed` | Brand purple — primary CTA, highlights |
| Accent hover | `#6d28d9` | Darkened for hover/active states |
| Accent subtle | `#7c3aed1a` | Tinted backgrounds, badges |
| Success | `#22c55e` | Confirmations only |
| Destructive | `#ef4444` | Errors only |

All accent-on-dark combinations must satisfy WCAG AA (≥ 4.5:1 for text). Verify `#7c3aed` against `#0d0d0d` before use on body text — may need lightening to `#9f6ef9` at small sizes.

## Typography

**Display / Headings:** Syne (primary choice) or Cabinet Grotesk as fallback. Syne's geometric weight reads as confident and modern without feeling trendy.

**Body / UI:** Plus Jakarta Sans. Clean, humanist, legible at 14–16px. Inter is an acceptable fallback.

Maximum 2 families in production.

| Scale | Size | Weight | Family | Usage |
|---|---|---|---|---|
| Display | 56–72px | 700–800 | Syne | Hero H1 only |
| H1 | 40–48px | 700 | Syne | Section heroes |
| H2 | 28–32px | 600 | Syne | Section headings |
| H3 | 20–22px | 600 | Plus Jakarta Sans | Card/block titles |
| Body large | 17–18px | 400 | Plus Jakarta Sans | Lead paragraphs |
| Body | 15–16px | 400 | Plus Jakarta Sans | Default copy |
| Small | 13–14px | 400 | Plus Jakarta Sans | Captions, meta |
| Label / UI | 12px | 500 | Plus Jakarta Sans | Tags, badges, nav |

Line height: 1.5–1.6 for body; 1.1–1.2 for display/headings. Letter spacing: −0.02em on display, 0 on body.

## Spacing

Base unit: 4px. Scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128px.

Section vertical padding: 96–128px desktop, 64–80px mobile. Max content width: 1200px. Gutter: 24px mobile, 48px desktop.

## Radius

| Context | Value |
|---|---|
| Buttons | 8px |
| Cards | 12px |
| Badges / chips | 999px (pill) |
| Input fields | 8px |

No sharp 0px radius (too cold). No excessive 24px+ radius on cards (too casual).

## Elevation & Borders

Minimal shadow usage on dark backgrounds — shadows are near-invisible. Use border (`1px solid #2a2a2a`) as the primary separation mechanism. Reserved shadow: `0 0 0 1px #ffffff08, 0 8px 32px #00000060` for modal/overlay layers only.

## Iconography

Line icons preferred. Lucide or Phosphor (consistent set — pick one). 20–24px at 1.5px stroke weight. Never fill icons mixed with outline icons in the same context.

## Motion

Entrance: `fade-in + translateY(12px → 0)`, triggered on scroll intersection. Duration: 400–500ms. Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo).

Hover on CTAs: background color transition 150ms ease. No scale transforms on buttons.

No bounce, spring, or 3D transforms. All animations wrapped in `@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; } }`.

## Components

### Button — Primary
Background `#7c3aed`, text `#ffffff`, radius 8px, padding `12px 24px`, font Plus Jakarta Sans 15px/500. Hover: background `#6d28d9`. Focus: `outline: 2px solid #7c3aed; outline-offset: 3px`.

### Button — Secondary / Ghost
Border `1px solid #2a2a2a`, background transparent, text `#f0f0f0`. Hover: border `#7c3aed`, text `#f0f0f0`. Same radius and padding as primary.

### Card
Background `#141414`, border `1px solid #2a2a2a`, radius 12px. Hover (if interactive): border-color `#3a3a3a`, subtle transition 200ms. No shadow. No glassmorphism.

### Badge / Tag
Background `#7c3aed1a`, text `#9f6ef9`, border `1px solid #7c3aed30`, radius 999px, padding `4px 12px`, font 12px/500. Use sparingly — not as eyebrow on every section.

### Section layout
Full-width section, constrained inner content to 1200px, centered. Alternating background between `#0d0d0d` and `#0a0a0a` for visual rhythm — no heavy section backgrounds.

## Imagery & Illustration

No stock photos. Team section uses real founder photos. Abstract geometric or code-themed accents acceptable as background texture (low-opacity, not focal). Brand mark / logotype must be available in SVG for crisp rendering.

## Do Not

- Gradient text
- Glassmorphism (frosted glass, blur-saturate backgrounds decoratively)
- Identical card grid with same icon + same copy structure repeated 3+ times
- Eyebrow label ("Nossos Serviços") in every single section header
- Cream, sand, or warm-neutral backgrounds
- Mix Syne and Plus Jakarta Sans in the same text block (headings vs body is fine; mixed inline is not)
