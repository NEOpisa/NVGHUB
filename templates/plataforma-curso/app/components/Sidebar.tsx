"use client";

import { ContentKey, sidebarModules } from "../data/sidebar";

interface SidebarProps {
  currentContent: ContentKey;
  setCurrentContent: (c: ContentKey) => void;
  progressPct: number;
  sidebarOpen: boolean;
}

export default function Sidebar({ currentContent, setCurrentContent, progressPct, sidebarOpen }: SidebarProps) {
  return (
    <aside className={`sidebar${sidebarOpen ? " open" : ""}`} id="sidebar">
      {/* User info */}
      <div style={{ padding: "0 1.5rem 1.5rem", borderBottom: "1px solid var(--border)", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div className="author-avatar" style={{ width: "38px", height: "38px", fontSize: "0.9rem" }}>
            AL
          </div>
          <div>
            <div style={{ fontSize: "0.875rem", fontWeight: 500 }}>[Nome do Aluno]</div>
            <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Módulo 2 em andamento</div>
          </div>
        </div>
        {/* Progress bar */}
        <div style={{ marginTop: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: "0.4rem" }}>
            <span>Progresso geral</span>
            <span id="progressPct">{progressPct}%</span>
          </div>
          <div style={{ height: "4px", background: "var(--border)", borderRadius: "100px" }}>
            <div
              id="progressBar"
              style={{ height: "100%", background: "var(--gold)", borderRadius: "100px", width: `${progressPct}%`, transition: "width .5s" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <div className="sidebar-section">
        <div className="sidebar-label">Navegar</div>
        <button
          className={`sidebar-item${currentContent === "dashboard" ? " active" : ""}`}
          onClick={() => setCurrentContent("dashboard")}
        >
          <span style={{ fontSize: "1rem" }}>◈</span> Dashboard
        </button>
        <button
          className={`sidebar-item${currentContent === "certificate" ? " active" : ""}`}
          onClick={() => setCurrentContent("certificate")}
        >
          <span style={{ fontSize: "1rem" }}>✦</span> Certificado
        </button>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label">Módulos</div>
        {sidebarModules.map((mod) => {
          const isActive = currentContent === mod.target && mod.status === "active";
          let statusClass = "lesson-status";
          let statusContent: React.ReactNode = null;
          let statusStyle: React.CSSProperties | undefined;

          if (mod.status === "done") {
            statusClass += " done";
            statusContent = "✓";
          } else if (mod.status === "locked") {
            statusClass += " locked";
          } else {
            statusStyle = { borderColor: "var(--gold)" };
          }

          return (
            <button
              key={mod.label}
              className={`sidebar-item${isActive ? " active" : ""}`}
              onClick={() => setCurrentContent(mod.target)}
            >
              <div className={statusClass} style={statusStyle}>
                {statusContent}
              </div>{" "}
              {mod.label}
            </button>
          );
        })}
      </div>

      <div style={{ padding: "1rem 1.5rem", textAlign: "center" }}>
        <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", opacity: 0.7 }}>
          Provido por Neovanguard
        </span>
      </div>
    </aside>
  );
}
