import Reveal from "./Reveal";

const cargas = [
  { label: "Back Squat", value: "120 kg", width: "80%" },
  { label: "Deadlift", value: "145 kg", width: "88%" },
  { label: "Snatch", value: "72 kg", width: "55%" },
  { label: "Clean & Jerk", value: "90 kg", width: "65%" },
];

const proximosTreinos = [
  { texto: "Seg 06:00 — Cindy + Snatch", tipo: "WOD" },
  { texto: "Ter 18:00 — Weightlifting", tipo: "Técnica" },
  { texto: "Qua 07:00 — Diane + Skills", tipo: "WOD" },
  { texto: "Sex 19:00 — Hero WOD", tipo: "WOD" },
  { texto: "Sáb 09:00 — Team WOD", tipo: "Comunidade" },
];

const historico = [
  {
    texto: "Sex — Fran",
    cor: "var(--green)",
    extra: "3:42",
  },
  { texto: "Qui — Weightlifting PR Snatch", cor: "var(--green)" },
  { texto: "Qua — AMRAP 20 min", cor: "var(--green)" },
  { texto: "Ter — Faltou", cor: "#888" },
  { texto: "Seg — Cindy 26 rounds", cor: "var(--green)" },
];

export default function AreaAluno() {
  return (
    <section id="area-aluno" className="sec">
      <p className="sec-label">✦ Dashboard</p>
      <h2 className="sec-title">
        Área do <span>aluno</span>
      </h2>
      <Reveal className="aluno-dash">
        <div className="dash-header">
          <div>
            <h3>
              [Nome do Aluno]{" "}
              <span
                style={{
                  fontSize: "1rem",
                  color: "var(--muted)",
                  fontStyle: "normal",
                }}
              >
                — Plano Ilimitado
              </span>
            </h3>
          </div>
          <div className="dash-status">Plano ativo · renova em 14 dias</div>
        </div>
        <div className="dash-grid">
          <div className="dash-stat">
            <div className="dash-stat-num">23</div>
            <div className="dash-stat-label">Treinos este mês</div>
          </div>
          <div className="dash-stat">
            <div className="dash-stat-num">142</div>
            <div className="dash-stat-label">Total de treinos</div>
          </div>
          <div className="dash-stat">
            <div className="dash-stat-num">87%</div>
            <div className="dash-stat-label">Freq. últimos 30 dias</div>
          </div>
          <div className="dash-stat">
            <div className="dash-stat-num">8.4</div>
            <div className="dash-stat-label">Nota WOD médio</div>
          </div>
        </div>
        <div className="dash-body">
          <div className="dash-panel">
            <h4>Evolução de cargas — últimas 8 semanas</h4>
            {cargas.map((c) => (
              <div className="prog-bar-wrap" key={c.label}>
                <div className="prog-bar-label">
                  <span>{c.label}</span>
                  <span>{c.value}</span>
                </div>
                <div className="prog-bar">
                  <div
                    className="prog-bar-fill"
                    style={{ width: c.width }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="dash-panel">
            <h4>Próximos treinos</h4>
            {proximosTreinos.map((t) => (
              <div className="treino-item" key={t.texto}>
                <span>{t.texto}</span>
                <span className="treino-tipo">{t.tipo}</span>
              </div>
            ))}
          </div>
          <div className="dash-panel">
            <h4>Histórico recente</h4>
            {historico.map((h) => (
              <div className="hist-item" key={h.texto}>
                <div
                  className="hist-dot"
                  style={{ background: h.cor }}
                ></div>
                {h.texto}
                {h.extra && (
                  <>
                    {" "}
                    <span
                      style={{
                        fontFamily: "var(--font-jetbrains-mono), monospace",
                        fontSize: ".75rem",
                        color: "var(--volt)",
                      }}
                    >
                      {h.extra}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
