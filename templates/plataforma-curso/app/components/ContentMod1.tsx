"use client";

import { ContentKey } from "../data/sidebar";

interface ContentMod1Props {
  setCurrentContent: (c: ContentKey) => void;
}

export default function ContentMod1({ setCurrentContent }: ContentMod1Props) {
  return (
    <div id="content-mod1" className="animate-in">
      <div className="content-header">
        <div>
          <div className="content-breadcrumb">MÓDULO 1 · DIAGNÓSTICO E CLAREZA</div>
          <h1 className="content-title">Módulo concluído</h1>
        </div>
        <button className="mark-done-btn done">✓ Módulo concluído</button>
      </div>

      <div
        style={{
          border: "1px solid var(--border-bright)",
          borderRadius: "var(--r-lg)",
          padding: "2.5rem",
          background: "rgba(201,169,110,0.04)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✓</div>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", marginBottom: "0.75rem" }}>
          Parabéns! Você concluiu o Módulo 1
        </h2>
        <p style={{ color: "var(--text-soft)", maxWidth: "480px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
          Você já mapeou seus recursos, definiu seu posicionamento e tem clareza sobre seu ponto
          de partida. Continue para o Módulo 2 e comece a construir sua arquitetura de método.
        </p>
        <button className="btn-primary" onClick={() => setCurrentContent("lesson")}>
          Ir para o Módulo 2 →
        </button>
      </div>

      <div className="module-lessons" style={{ marginTop: "2rem", justifyContent: "center" }}>
        <span className="lesson-tag">Autoavaliação profunda</span>
        <span className="lesson-tag">Mapa de recursos</span>
        <span className="lesson-tag">Declaração de posicionamento</span>
      </div>
    </div>
  );
}
