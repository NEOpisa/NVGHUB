"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/**
 * A MARCA NV NO HERO — a casca leve.
 *
 * Este arquivo não conhece three.js. Ele decide UMA coisa: se este aparelho
 * merece a cena 3D. Se sim, puxa VScene por import dinâmico; se não, o vetor
 * oficial segura a composição.
 *
 * A casca existe porque `three` + fiber + drei somam ~900KB crus. Enquanto
 * viviam no mesmo módulo, entravam no carregamento inicial da home inteira —
 * inclusive para quem não tem WebGL, para quem pediu menos movimento e para
 * quem vai fechar a aba antes de rolar. Agora só descem depois da hidratação
 * e só quando vão ser usados.
 *
 * A reserva é a mesma peça em vetor, não um espaço vazio: o hero tem coluna
 * própria para a marca, e deixá-la em branco durante o download faria a
 * página saltar quando a cena chegasse.
 */

const RESERVA = (
  <div className="nv3d nv3d-flat">
    <img src="/logo.svg" alt="" aria-hidden="true" width={280} height={206} />
  </div>
);

const VScene = dynamic(() => import("./VScene"), {
  // sem SSR: a cena só existe depois que sabemos que há WebGL, e isso é uma
  // pergunta que só o navegador responde
  ssr: false,
  loading: () => RESERVA,
});

export default function NVMark3D({ className }: { className?: string }) {
  const [mode, setMode] = useState<"pending" | "gl" | "flat">("pending");
  const [motion, setMotion] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let gl = false;
    try {
      const c = document.createElement("canvas");
      gl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      gl = false;
    }
    setMotion(!reduced);
    setMode(gl ? "gl" : "flat");
  }, []);

  // sem WebGL (ou antes de decidir): o vetor oficial segura a composição
  if (mode !== "gl") {
    return (
      <div className={`nv3d nv3d-flat ${className ?? ""}`}>
        <img src="/logo.svg" alt="" aria-hidden="true" width={280} height={206} />
      </div>
    );
  }

  return <VScene className={className} motion={motion} />;
}
