/**
 * Sistema central de animações — só transform + opacity (compositor-only, zero lag).
 * Importar e usar em qualquer componente client.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
