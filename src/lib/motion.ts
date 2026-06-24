/**
 * Helpers de scroll-motion (compositor-only). Só o que está em uso hoje:
 * parallax, pinHorizontal (galeria horizontal) e splitReveal (tipografia cinética).
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// ── Parallax: o elemento desliza ligado ao progresso do scroll ───────────────
export function parallax(
  el: Element,
  opts: { speed?: number; axis?: "y" | "x"; start?: string; end?: string } = {}
) {
  const { speed = 0.2, axis = "y", start = "top bottom", end = "bottom top" } = opts;
  const dist = speed * 100; // percent do próprio elemento (transform puro)
  const prop = axis === "y" ? "yPercent" : "xPercent";
  const from: gsap.TweenVars = { [prop]: -dist };
  const to: gsap.TweenVars = {
    [prop]: dist,
    ease: "none",
    scrollTrigger: { trigger: el, start, end, scrub: true },
  };
  return gsap.fromTo(el, from, to);
}

// ── Pin + scroll horizontal: prende a seção e rola o track na horizontal ─────
export function pinHorizontal(
  pinEl: Element,
  track: HTMLElement,
  opts: { start?: string; extra?: number } = {}
) {
  const { start = "top top", extra = 0 } = opts;
  // distância = quanto o track passa além da janela visível (o viewport que o contém)
  const distance = () => {
    const visible = track.parentElement?.clientWidth ?? window.innerWidth;
    return Math.max(0, track.scrollWidth - visible + extra);
  };
  return gsap.to(track, {
    x: () => -distance(),
    ease: "none",
    scrollTrigger: {
      trigger: pinEl,
      start,
      end: () => "+=" + distance(),
      scrub: 0.3,
      pin: pinEl,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });
}

// ── Tipografia cinética: revela por linha/palavra (SplitText) ────────────────
export function splitReveal(
  el: HTMLElement,
  opts: { type?: "lines" | "words" | "chars"; stagger?: number; duration?: number; start?: string } = {}
) {
  const { type = "lines", stagger = 0.08, duration = 0.9, start = "top 85%" } = opts;
  const split = new SplitText(el, {
    type,
    linesClass: "sr-line",
    mask: type === "lines" ? ("lines" as const) : undefined,
  });
  const parts = (split[type] ?? []) as Element[];
  // desfaz o pre-hide do ScrollJuice ([data-split] fica opacity:0 antes do paint)
  gsap.set(el, { opacity: 1 });
  gsap.set(parts, { yPercent: 115 });
  const tween = gsap.to(parts, {
    yPercent: 0,
    duration,
    ease: "power4.out",
    stagger,
    scrollTrigger: { trigger: el, start, once: true },
    onComplete: () => split.revert(), // devolve o texto original (a11y/seleção)
  });
  return { split, tween };
}
