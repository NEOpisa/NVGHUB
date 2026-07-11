"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// HOME É CANVAS-FIRST: os headings da jornada (.jy-*) ficam FORA do scatter —
// fatiá-los criava centenas de spans + raycast de ponteiro em cima do 3D.
// Na home, quem faz o show é o canvas; o scatter segue vivo nas internas.
const TARGETS =
  ".section-heading:not([data-split]), .tp-h1, .tp-h2";
const RADIUS = 90; // px de influência do cursor
const PUSH = 7; // deslocamento máximo por letra (sutil)

/**
 * ESTILHAÇO DE TÍTULOS — cada heading é fatiado em letras; as letras perto
 * do cursor se AFASTAM dele (com leve rotação) e voltam com mola ao sair.
 * As mesmas letras servem à revelação em cascata (CSS via --ci).
 * Só em ponteiro fino; respeita reduced-motion; preserva spans internos.
 */
export default function LetterScatter() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    type Head = {
      el: HTMLElement;
      chars: HTMLElement[];
      /** centro de cada letra RELATIVO ao heading (medido 1x, zero thrash) */
      off: Float32Array | null;
      hot: boolean;
    };
    const heads: Head[] = [];

    const split = (el: HTMLElement) => {
      if (el.dataset.lsc) return;
      el.dataset.lsc = "1";
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          // gradiente por background-clip não sobrevive a spans inline-block
          const p = node.parentElement;
          if (p?.closest(".text-gradient, [data-no-lsc]"))
            return NodeFilter.FILTER_REJECT;
          return node.textContent && node.textContent.trim()
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP;
        },
      });
      const texts: Text[] = [];
      let n: Node | null;
      while ((n = walker.nextNode())) texts.push(n as Text);
      const chars: HTMLElement[] = [];
      let ci = 0;
      for (const t of texts) {
        const frag = document.createDocumentFragment();
        // agrupa por PALAVRA (nowrap) para não quebrar no meio
        for (const token of (t.textContent ?? "").split(/(\s+)/)) {
          if (!token) continue;
          if (/^\s+$/.test(token)) {
            frag.appendChild(document.createTextNode(token));
            continue;
          }
          const w = document.createElement("span");
          w.className = "lsc-w";
          for (const ch of token) {
            const s = document.createElement("span");
            s.className = "lsc-c";
            s.style.setProperty("--ci", String(ci++));
            s.textContent = ch;
            w.appendChild(s);
            chars.push(s);
          }
          frag.appendChild(w);
        }
        t.parentNode?.replaceChild(frag, t);
      }
      heads.push({ el, chars, off: null, hot: false });
    };

    document.querySelectorAll<HTMLElement>(TARGETS).forEach(split);

    let px = -9999,
      py = -9999,
      raf = 0;
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const measure = (h: Head, r: DOMRect) => {
      // uma única passada de medição por "entrada" no heading
      const off = new Float32Array(h.chars.length * 2);
      for (let i = 0; i < h.chars.length; i++) {
        const cr = h.chars[i].getBoundingClientRect();
        off[i * 2] = cr.left + cr.width / 2 - r.left;
        off[i * 2 + 1] = cr.top + cr.height / 2 - r.top;
      }
      h.off = off;
    };

    const apply = () => {
      raf = 0;
      for (const h of heads) {
        const r = h.el.getBoundingClientRect();
        // fora da caixa (com margem)? limpa uma única vez e pula
        if (
          px < r.left - RADIUS ||
          px > r.right + RADIUS ||
          py < r.top - RADIUS ||
          py > r.bottom + RADIUS ||
          r.width === 0
        ) {
          if (h.hot) {
            h.hot = false;
            h.off = null;
            for (const c of h.chars) c.style.transform = "";
          }
          continue;
        }
        if (!h.hot) {
          h.hot = true;
          measure(h, r);
        }
        const off = h.off;
        if (!off) continue;
        for (let i = 0; i < h.chars.length; i++) {
          const dx = r.left + off[i * 2] - px;
          const dy = r.top + off[i * 2 + 1] - py;
          const d = Math.hypot(dx, dy);
          const c = h.chars[i];
          if (d > RADIUS || d === 0) {
            if (c.style.transform) c.style.transform = "";
            continue;
          }
          const f = (1 - d / RADIUS) ** 1.6;
          const ux = dx / d;
          const uy = dy / d;
          c.style.transform = `translate(${(ux * PUSH * f).toFixed(1)}px, ${(
            uy *
            PUSH *
            f
          ).toFixed(1)}px) rotate(${(ux * 3.5 * f).toFixed(1)}deg)`;
        }
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      for (const h of heads)
        for (const c of h.chars) c.style.transform = "";
    };
  }, [pathname]);

  return null;
}
