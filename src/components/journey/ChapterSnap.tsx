"use client";

import { useEffect, type RefObject } from "react";
import { getLenisInstance } from "@/lib/lenis";
import { journey } from "./journeyState";

/**
 * EXPERIMENTAL (teste local): scroll por PARADAS. Qualquer gesto de rolagem
 * dispara a viagem completa até o próximo estado — sem posições
 * intermediárias. Paradas: herói, ecossistema, cada uma das 5 soluções e o
 * destino final (os valores casam com os waypoints da câmera em path.ts).
 *
 * Resposta imediata: cada NOVO gesto conta na hora, mesmo no meio de uma
 * viagem — rolar de novo empilha a próxima parada e ACELERA (quem rola
 * rápido quer chegar rápido). A separação gesto novo × inércia residual é
 * feita pelo formato do delta: inércia só decai; um flick novo sobe.
 */
const SNAPS = [0, 0.35, 0.522, 0.566, 0.61, 0.654, 0.698, 1];

type SnapLenis = {
  scrollTo: (
    target: number,
    opts?: {
      duration?: number;
      easing?: (t: number) => number;
      lock?: boolean;
      onComplete?: () => void;
    },
  ) => void;
};

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export default function ChapterSnap({
  wrap,
}: {
  wrap: RefObject<HTMLDivElement | null>;
}) {
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;

    let busy = false;
    let targetIdx: number | null = null;
    let travelId = 0;
    let tweenRaf = 0;

    const toY = (p: number) =>
      el.offsetTop + p * (el.offsetHeight - window.innerHeight);

    const covering = () => {
      const r = el.getBoundingClientRect();
      return r.top <= 1 && r.bottom >= window.innerHeight - 1;
    };

    const nearestIdx = () => {
      const p = journey.progress;
      let best = 0;
      let bd = Infinity;
      for (let i = 0; i < SNAPS.length; i++) {
        const d = Math.abs(SNAPS[i] - p);
        if (d < bd) {
          bd = d;
          best = i;
        }
      }
      return best;
    };

    const done = (id: number) => {
      if (id !== travelId) return; // viagem já foi substituída por outra
      busy = false;
    };

    // tween próprio pro caminho sem Lenis (mobile/pointer coarse)
    const tweenTo = (y: number, ms: number, id: number, chained: boolean) => {
      cancelAnimationFrame(tweenRaf);
      const y0 = window.scrollY;
      const t0 = performance.now();
      const ease = chained ? easeOut : easeInOut; // encadeado: sem re-acelerar
      const step = (now: number) => {
        if (id !== travelId) return;
        const c = Math.min(1, (now - t0) / ms);
        window.scrollTo(0, y0 + (y - y0) * ease(c));
        if (c < 1) tweenRaf = requestAnimationFrame(step);
        else done(id);
      };
      tweenRaf = requestAnimationFrame(step);
    };

    const step = (dir: 1 | -1) => {
      const from = busy && targetIdx !== null ? targetIdx : nearestIdx();
      const to = Math.min(SNAPS.length - 1, Math.max(0, from + dir));
      if (to === from && !busy) return;
      const chained = busy; // rolou de novo no meio = quer velocidade
      targetIdx = to;
      busy = true;
      const id = ++travelId;

      const dist = Math.abs(SNAPS[to] - journey.progress);
      let ms = 460 + dist * 2000;
      if (chained) ms *= 0.55;
      ms = Math.min(1500, Math.max(340, ms));

      const y = toY(SNAPS[to]);
      const lenis = getLenisInstance() as SnapLenis | undefined;
      if (lenis) {
        lenis.scrollTo(y, {
          duration: ms / 1000,
          easing: chained ? easeOut : easeInOut,
          lock: true,
          onComplete: () => done(id),
        });
        // rede de segurança caso o onComplete não dispare (interrupções)
        window.setTimeout(() => done(id), ms + 500);
      } else {
        tweenTo(y, ms, id, chained);
      }
    };

    // ── desktop: wheel em captura, antes do handler do Lenis ──
    // Intenção nova × inércia: a inércia do trackpad só DECAI; um flick novo
    // faz o delta subir (ou chega depois de uma pausa). Roda de mouse: deltas
    // grandes e constantes com intervalo entre cliques — cada notch conta.
    let lastAd = 0;
    let lastT = 0;
    const onWheel = (e: WheelEvent) => {
      if (!covering()) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      const now = performance.now();
      const ad = Math.abs(e.deltaY);
      const gap = now - lastT;
      const fresh =
        (gap > 200 && ad > 8) || // pausa real desde o último evento
        (ad > lastAd * 1.35 && ad > 15) || // delta SUBIU: flick novo
        (gap > 45 && ad >= lastAd * 0.92 && ad >= 60); // notch de mouse
      lastAd = ad;
      lastT = now;
      if (fresh) step(e.deltaY > 0 ? 1 : -1);
    };

    // ── mobile: swipe vertical vira uma viagem completa (encadeável) ──
    let touchY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (covering()) e.preventDefault(); // o snap assume o controle
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!covering()) return;
      const dy = touchY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 42) return;
      step(dy > 0 ? 1 : -1);
    };

    window.addEventListener("wheel", onWheel, {
      passive: false,
      capture: true,
    });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      cancelAnimationFrame(tweenRaf);
    };
  }, [wrap]);

  return null;
}
