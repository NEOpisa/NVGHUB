"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE =
  'a, button, [role="link"], [role="button"], .quiz-option, .vy-door';

/**
 * Controles HUD fixos (canto inferior direito):
 *   SOM  — ambientação completa (WebAudio, tudo sintetizado, zero assets),
 *          opt-in e persistido:
 *          · cama grave: dois senos desafinados batendo devagar;
 *          · vento: ruído em loop por passa-baixa que respira via LFO;
 *          · whoosh de viagem: varredura de ruído no snap de capítulo;
 *          · bleeps de interface: hover = tick agudo, clique = blip.
 * O tier gráfico é 100% automático (detectTier + guardião de fps no PostFX).
 */
export default function HudControls() {
  const [sound, setSound] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  // restaura preferências
  useEffect(() => {
    try {
      if (localStorage.getItem("nvg-sound") === "on") setSound(true);
      // toggle GFX foi removido: descarta preferência antiga p/ ninguém
      // ficar preso no tier 0 sem ter como voltar
      localStorage.removeItem("nvg-gfx");
    } catch {}
  }, []);

  // motor de som: delegação global de hover/clique
  useEffect(() => {
    if (!sound) return;
    const ctx =
      ctxRef.current ??
      new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)();
    ctxRef.current = ctx;
    if (ctx.state === "suspended") ctx.resume();

    const bleep = (freq: number, dur: number, gain: number) => {
      if (ctx.state !== "running") return;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = freq;
      g.gain.setValueAtTime(0, ctx.currentTime);
      g.gain.linearRampToValueAtTime(gain, ctx.currentTime + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
      o.connect(g).connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + dur + 0.02);
    };

    // ── AMBIENTAÇÃO: cama grave + vento, com fade-in lento ──────────────
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(1, ctx.currentTime + 2.5);
    master.connect(ctx.destination);

    // cama: dois senos graves desafinados batendo devagar (Δ0.35Hz)
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.013;
    droneGain.connect(master);
    const o1 = ctx.createOscillator();
    o1.type = "sine";
    o1.frequency.value = 55;
    const o2 = ctx.createOscillator();
    o2.type = "sine";
    o2.frequency.value = 55.35;
    o1.connect(droneGain);
    o2.connect(droneGain);
    o1.start();
    o2.start();

    // vento: ruído em loop por um passa-baixa que respira via LFO
    const len = ctx.sampleRate * 2;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    noise.loop = true;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 220;
    lp.Q.value = 0.6;
    const windGain = ctx.createGain();
    windGain.gain.value = 0.011;
    noise.connect(lp);
    lp.connect(windGain);
    windGain.connect(master);
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.07;
    const lfoAmt = ctx.createGain();
    lfoAmt.gain.value = 90;
    lfo.connect(lfoAmt);
    lfoAmt.connect(lp.frequency);
    noise.start();
    lfo.start();

    // whoosh da viagem de capítulo (evento do ChapterSnap): varredura de
    // ruído por passa-banda — sobe com o arranque, assenta na chegada
    const onTravel = () => {
      if (ctx.state !== "running") return;
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.Q.value = 1.4;
      const g = ctx.createGain();
      const t = ctx.currentTime;
      bp.frequency.setValueAtTime(160, t);
      bp.frequency.exponentialRampToValueAtTime(950, t + 0.28);
      bp.frequency.exponentialRampToValueAtTime(120, t + 0.85);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.06, t + 0.1);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
      src.connect(bp);
      bp.connect(g);
      g.connect(master);
      src.start(t);
      src.stop(t + 0.95);
    };
    window.addEventListener("nvg:travel", onTravel);

    let last = 0;
    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.(INTERACTIVE);
      if (!el) return;
      const now = performance.now();
      if (now - last < 90) return; // rate-limit
      last = now;
      bleep(1240, 0.05, 0.028);
    };
    const onDown = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.(INTERACTIVE);
      if (!el) return;
      bleep(680, 0.09, 0.05);
    };
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("nvg:travel", onTravel);
      // a cama sai em fade e os nós morrem depois (sem clique audível)
      const t = ctx.currentTime;
      master.gain.cancelScheduledValues(t);
      master.gain.setValueAtTime(master.gain.value, t);
      master.gain.linearRampToValueAtTime(0, t + 0.35);
      window.setTimeout(() => {
        try {
          o1.stop();
          o2.stop();
          noise.stop();
          lfo.stop();
          master.disconnect();
        } catch {}
      }, 450);
    };
  }, [sound]);

  const toggleSound = () => {
    const next = !sound;
    setSound(next);
    try {
      localStorage.setItem("nvg-sound", next ? "on" : "off");
    } catch {}
  };

  return (
    <div className="hudc" aria-label="Preferências de experiência">
      <button
        type="button"
        className={`hudc-btn${sound ? " is-on" : ""}`}
        onClick={toggleSound}
        aria-pressed={sound}
      >
        <i aria-hidden="true" />
        SOM {sound ? "ON" : "OFF"}
      </button>
    </div>
  );
}
