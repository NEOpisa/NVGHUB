"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE =
  'a, button, [role="link"], [role="button"], .quiz-option, .vy-door';

/**
 * Controles HUD fixos (canto inferior direito):
 *   SOM  — bleeps sutis de interface (WebAudio, oscilador puro, sem assets),
 *          opt-in e persistido; hover = tick agudo, clique = blip.
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
