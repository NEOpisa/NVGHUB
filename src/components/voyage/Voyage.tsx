"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { journey, clamp01 } from "@/components/journey/journeyState";
import VoyageOverlay from "./VoyageOverlay";
import BlueprintHud from "./BlueprintHud";

const VoyageCanvas = dynamic(() => import("./VoyageCanvas"), { ssr: false });

/**
 * VOYAGE — a jornada da home, reconstruída do zero (neobsidian + blueprint).
 * Um espaçador de scroll (~560vh, mais curto que a jornada antiga = menos
 * fadiga) dirige o progresso 0..1 lido pelo canvas fixo e pelo overlay.
 * Capítulos: HERO → DNA → BIFURCAÇÃO (Ouro|Platina) → EXPLORAR.
 * Sem WebGL ou com reduced-motion, cai no modo estático (seções empilhadas).
 */
export default function Voyage() {
  const wrap = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"pending" | "gl" | "static">("pending");

  useEffect(() => {
    const off =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      new URLSearchParams(window.location.search).get("motion") === "off";
    let gl = false;
    try {
      const c = document.createElement("canvas");
      gl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      gl = false;
    }
    setMode(off || !gl ? "static" : "gl");
  }, []);

  // driver de progresso: scroll nativo (Lenis também emite scroll nativo)
  useEffect(() => {
    if (mode !== "gl") return;
    const el = wrap.current;
    if (!el) return;
    const update = () => {
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      journey.progress = clamp01(-el.getBoundingClientRect().top / total);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [mode]);

  const isStatic = mode === "static";
  return (
    <div ref={wrap} className={`vy-wrap${isStatic ? " vy-wrap-static" : ""}`}>
      {mode === "gl" && <VoyageCanvas />}
      {mode === "gl" && <BlueprintHud />}
      <VoyageOverlay staticMode={isStatic} />
    </div>
  );
}
