"use client";

import { dashCards, badges } from "../data/dashboard";
import { ContentKey } from "../data/sidebar";
import BarChart from "./BarChart";

interface ContentDashboardProps {
  setCurrentContent: (c: ContentKey) => void;
}

export default function ContentDashboard({ setCurrentContent }: ContentDashboardProps) {
  return (
    <div id="content-dashboard" className="animate-in">
      <div className="content-header">
        <div>
          <div className="content-breadcrumb">ÁREA DE MEMBROS</div>
          <h1 className="content-title">Bem-vindo de volta, Mariana Ferreira</h1>
        </div>
      </div>
      <div className="dashboard-grid">
        {dashCards.map((card) => (
          <div className="dash-card" key={card.label}>
            <div className="dash-card-label">{card.label}</div>
            <div className="dash-card-value">{card.value}</div>
            <div className="dash-card-sub">{card.sub}</div>
          </div>
        ))}
      </div>

      <div className="chart-area">
        <div className="chart-title">Progresso semanal — últimas 8 semanas</div>
        <BarChart />
      </div>

      <div style={{ marginBottom: "2rem" }}>
        <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", marginBottom: "1.25rem" }}>
          Continue de onde parou
        </h4>
        <div
          style={{
            border: "1px solid var(--border-bright)",
            borderRadius: "var(--r-lg)",
            padding: "1.5rem",
            background: "rgba(201,169,110,0.04)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
            cursor: "pointer",
          }}
          onClick={() => setCurrentContent("lesson")}
        >
          <div>
            <div style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: "var(--gold)", letterSpacing: "0.15em", marginBottom: "0.4rem" }}>
              MÓDULO 2 · AULA 3
            </div>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", marginBottom: "0.3rem" }}>
              Projetando seu sistema pessoal
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>35 min restantes · 42% concluído</div>
          </div>
          <button
            className="btn-primary"
            style={{ fontSize: "0.875rem", padding: "0.7rem 1.5rem" }}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentContent("lesson");
            }}
          >
            ▶ Continuar
          </button>
        </div>
      </div>

      {/* Badges */}
      <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", marginBottom: "1.25rem" }}>Conquistas</h4>
      <div className="badges-row">
        {badges.map((badge) => (
          <div className={`badge${badge.unlocked ? " unlocked" : ""}`} key={badge.label}>
            <span>{badge.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
