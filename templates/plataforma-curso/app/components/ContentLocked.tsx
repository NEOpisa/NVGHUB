"use client";

import { ContentKey } from "../data/sidebar";

interface ContentLockedProps {
  setCurrentContent: (c: ContentKey) => void;
}

export default function ContentLocked({ setCurrentContent }: ContentLockedProps) {
  return (
    <div id="content-locked" className="animate-in">
      <div style={{ textAlign: "center", padding: "5rem 2rem" }}>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", marginBottom: "1rem" }}>
          Conteúdo ainda não liberado
        </h2>
        <p style={{ color: "var(--text-soft)", maxWidth: "400px", margin: "0 auto 2rem" }}>
          Este módulo será liberado automaticamente quando você completar o anterior. O drip
          content garante que você absorva cada etapa antes de avançar.
        </p>
        <button className="btn-ghost" onClick={() => setCurrentContent("lesson")}>
          Continuar módulo atual
        </button>
      </div>
    </div>
  );
}
