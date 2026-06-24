/**
 * Sistema central de animações — só transform + opacity (compositor-only, zero lag).
 * Importar e usar em qualquer componente client.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// ── Easing padrão ────────────────────────────────────────────────────────────
export const EASE = {
  out:    "power3.out",
  outSm:  "power2.out",
  back:   "back.out(1.6)",
  expo:   "expo.out",
} as const;

// ── Surgimento de baixo (o mais suave e natural) ─────────────────────────────
export function revealUp(
  el: Element | Element[] | NodeListOf<Element>,
  opts: { delay?: number; duration?: number; stagger?: number; start?: string } = {}
) {
  const { delay = 0, duration = 0.75, stagger = 0, start = "top 88%" } = opts;
  const targets = el instanceof Element ? [el] : Array.from(el);
  if (!targets.length) return;
  gsap.set(targets, { opacity: 0, y: 40 });
  ScrollTrigger.create({
    trigger: targets[0] as Element,
    start,
    once: true,
    onEnter: () =>
      gsap.to(targets, {
        opacity: 1, y: 0,
        duration, ease: EASE.out,
        stagger, delay,
      }),
  });
}

// ── Reveal por clip-path — texto sobe de trás de uma linha invisível ─────────
export function revealClip(
  el: Element | Element[],
  opts: { delay?: number; duration?: number; stagger?: number; start?: string } = {}
) {
  const { delay = 0, duration = 0.80, stagger = 0.06, start = "top 88%" } = opts;
  const targets = Array.isArray(el) ? el : [el];
  if (!targets.length) return;
  gsap.set(targets, { clipPath: "inset(0 0 100% 0)", y: 12 });
  ScrollTrigger.create({
    trigger: targets[0] as Element,
    start,
    once: true,
    onEnter: () =>
      gsap.to(targets, {
        clipPath: "inset(0 0 0% 0)", y: 0,
        duration, ease: "power4.out",
        stagger, delay,
      }),
  });
}

// ── Surge com escala (cards, visuais) ────────────────────────────────────────
export function revealScale(
  el: Element | Element[],
  opts: { delay?: number; duration?: number; stagger?: number; start?: string } = {}
) {
  const { delay = 0, duration = 0.7, stagger = 0.08, start = "top 86%" } = opts;
  const targets = Array.isArray(el) ? el : [el];
  gsap.set(targets, { opacity: 0, scale: 0.88, transformOrigin: "center bottom" });
  ScrollTrigger.create({
    trigger: targets[0] as Element,
    start,
    once: true,
    onEnter: () =>
      gsap.to(targets, {
        opacity: 1, scale: 1,
        duration, ease: EASE.back,
        stagger, delay,
      }),
  });
}

// ── Linha horizontal que expande (separadores, decoração) ────────────────────
export function revealLine(el: Element, opts: { delay?: number } = {}) {
  gsap.set(el, { scaleX: 0, transformOrigin: "left" });
  ScrollTrigger.create({
    trigger: el,
    start: "top 90%",
    once: true,
    onEnter: () =>
      gsap.to(el, {
        scaleX: 1,
        duration: 0.9, ease: "power3.out",
        delay: opts.delay ?? 0,
      }),
  });
}

// ── Stagger de filhos diretos ─────────────────────────────────────────────────
export function revealChildren(
  container: Element,
  opts: { duration?: number; stagger?: number; y?: number; start?: string } = {}
) {
  const { duration = 0.65, stagger = 0.07, y = 32, start = "top 84%" } = opts;
  const children = Array.from(container.children) as Element[];
  if (!children.length) return;
  gsap.set(children, { opacity: 0, y });
  ScrollTrigger.create({
    trigger: container,
    start,
    once: true,
    onEnter: () =>
      gsap.to(children, {
        opacity: 1, y: 0,
        duration, ease: EASE.out,
        stagger,
      }),
  });
}

// ── Rotação leve no surgimento (cards, depoimentos) ──────────────────────────
export function revealTilt(
  el: Element | Element[],
  opts: { delay?: number; stagger?: number } = {}
) {
  const { delay = 0, stagger = 0.10 } = opts;
  const targets = Array.isArray(el) ? el : [el];
  gsap.set(targets, { opacity: 0, y: 50, rotateX: 14, transformOrigin: "top center", perspective: 800 });
  ScrollTrigger.create({
    trigger: targets[0] as Element,
    start: "top 84%",
    once: true,
    onEnter: () =>
      gsap.to(targets, {
        opacity: 1, y: 0, rotateX: 0,
        duration: 0.80, ease: EASE.back,
        stagger, delay,
      }),
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// SCRUB / SCROLL-LINKED — movimento contínuo ligado à posição do scroll.
// Todos compositor-only (yPercent/xPercent/skew = transform). Use dentro de
// gsap.matchMedia() para ligar só no tier FULL (ver motionConfig.ts).
// ─────────────────────────────────────────────────────────────────────────────

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

// ── Reveal scrubado: "monta" conforme você rola pelo range (não once) ────────
export function scrubReveal(
  el: Element | Element[],
  opts: { start?: string; end?: string; from?: gsap.TweenVars } = {}
) {
  const { start = "top 85%", end = "top 40%", from } = opts;
  const targets = Array.isArray(el) ? el : [el];
  if (!targets.length) return;
  const fromVars: gsap.TweenVars = from ?? { opacity: 0, yPercent: 28 };
  return gsap.fromTo(targets, fromVars, {
    opacity: 1,
    yPercent: 0,
    ease: "none",
    stagger: 0.04,
    scrollTrigger: { trigger: targets[0] as Element, start, end, scrub: true },
  });
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

// ── Velocity skew ("juice"): deforma sutil conforme a velocidade do scroll ───
export function velocitySkew(
  targets: Element[],
  opts: { maxSkew?: number; factor?: number } = {}
): () => void {
  const { maxSkew = 6, factor = 0.0009 } = opts;
  if (!targets.length) return () => {};
  const setters = targets.map((t) =>
    gsap.quickTo(t, "skewY", { duration: 0.5, ease: "power3.out" })
  );
  const st = ScrollTrigger.create({
    onUpdate: (self) => {
      const skew = gsap.utils.clamp(-maxSkew, maxSkew, self.getVelocity() * factor);
      setters.forEach((set) => set(skew));
    },
  });
  return () => st.kill();
}
