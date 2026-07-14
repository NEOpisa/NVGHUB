"use client";

import { useEffect, type RefObject } from "react";
import { getLenisInstance } from "@/lib/lenis";
import { journey } from "./journeyState";
import { ecoWheelZone } from "./ecoState";

/**
 * EXPERIMENTAL (teste local): scroll por PARADAS. Qualquer gesto de rolagem
 * dispara a viagem completa até o próximo estado — sem posições
 * intermediárias. Paradas: herói, ecossistema e destino final — a viagem
 * eco→final toca o WARP inteiro (mergulho + corredor de portões) num único
 * movimento de câmera.
 *
 * Resposta imediata: cada NOVO gesto conta na hora, mesmo no meio de uma
 * viagem — rolar de novo empilha a próxima parada e ACELERA (quem rola
 * rápido quer chegar rápido). A separação gesto novo × inércia residual é
 * feita pelo formato do delta: inércia só decai; um flick novo sobe.
 */
const SNAPS = [0, 0.35, 1];

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
    let stepAt = 0; // última viagem disparada (cooldown anti passo-duplo)

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
    const tweenTo = (y: number, ms: number, id: number) => {
      cancelAnimationFrame(tweenRaf);
      const y0 = window.scrollY;
      const t0 = performance.now();
      const step = (now: number) => {
        if (id !== travelId) return;
        const c = Math.min(1, (now - t0) / ms);
        window.scrollTo(0, y0 + (y - y0) * easeOut(c));
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

      stepAt = performance.now();
      const dist = Math.abs(SNAPS[to] - journey.progress);
      // a viagem eco→final é O warp: merece durar mais que um snap comum
      let ms = 420 + dist * 3200;
      if (chained) ms *= 0.55;
      ms = Math.min(2600, Math.max(320, ms));

      const y = toY(SNAPS[to]);
      const lenis = getLenisInstance() as SnapLenis | undefined;
      if (lenis) {
        lenis.scrollTo(y, {
          duration: ms / 1000,
          // saída rápida SEMPRE: o easeInOut arrancava devagar e o snap
          // parecia atrasado em relação ao gesto
          easing: easeOut,
          lock: true,
          onComplete: () => done(id),
        });
        // rede de segurança caso o onComplete não dispare (interrupções)
        window.setTimeout(() => done(id), ms + 500);
      } else {
        tweenTo(y, ms, id);
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
      // ponteiro sobre uma roda do ecossistema: o giro é dela, não da página
      if (ecoWheelZone(e.clientX, e.clientY) >= 0) return;
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
      // cooldown pós-viagem: 1 gesto = 1 parada — a roda de mouse emitia
      // vários notches num flick e o snap pulava DUAS paradas de uma vez
      if (fresh && now - stepAt > 380) step(e.deltaY > 0 ? 1 : -1);
    };

    // ── mobile: swipe vertical vira uma viagem completa (encadeável) ──
    // #089 · covering() é medido UMA vez por gesto (getBoundingClientRect a
    // cada touchmove era uma leitura de layout por frame de dedo) e o flick
    // conta por DISTÂNCIA OU VELOCIDADE: swipe curto e rápido também viaja
    // (42px fixos deixavam gesto rápido "morto" — sensação de travada).
    let touchY = 0;
    let touchT = 0;
    let touchCovers = false;
    // capítulo final no mobile: a seção rola por DENTRO — o snap cede o
    // gesto a ela e só volta de capítulo quando ela já está no topo
    let touchScroller: HTMLElement | null = null;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
      touchT = performance.now();
      touchCovers = covering();
      const sc = (e.target as HTMLElement | null)?.closest?.(
        ".jy-explore",
      ) as HTMLElement | null;
      touchScroller =
        sc && sc.scrollHeight > sc.clientHeight + 4 ? sc : null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchCovers && !touchScroller) e.preventDefault(); // o snap assume
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!touchCovers) return;
      const dy = touchY - e.changedTouches[0].clientY;
      if (touchScroller) {
        // swipe pra baixo com a seção no topo = voltar um capítulo
        if (dy < -42 && touchScroller.scrollTop <= 2) step(-1);
        return;
      }
      const dt = Math.max(1, performance.now() - touchT);
      const fast = Math.abs(dy) >= 16 && Math.abs(dy) / dt > 0.35; // flick
      if (Math.abs(dy) < 42 && !fast) return;
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
