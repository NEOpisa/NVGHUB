import Reveal from "./Reveal";

const heights = [55, 62, 58, 70, 68, 74, 80, 88];

export default function Dashboard() {
  return (
    <section id="dashboard" className="sec">
      <h2 className="sec-title">
        Painel do <span>dono</span>
      </h2>
      <p className="sec-lead">
        Receita, churn e frequência em tempo real. Gestão do box no mesmo
        lugar em que o aluno faz check-in.
      </p>
      <Reveal className="owner-dash">
        <div className="owner-header">
          <h3>[Nome da Academia] — Visão geral</h3>
          <select className="period-select" defaultValue="Junho 2025">
            <option>Junho 2025</option>
            <option>Maio 2025</option>
            <option>Abril 2025</option>
          </select>
        </div>
        <div className="kpi-row">
          <div className="kpi">
            <div className="kpi-val neutral">R$41.2k</div>
            <div className="kpi-label">Receita recorrente</div>
            <div className="kpi-delta up">↑ +8.3% vs mês anterior</div>
          </div>
          <div className="kpi">
            <div className="kpi-val up">847</div>
            <div className="kpi-label">Alunos ativos</div>
            <div className="kpi-delta up">↑ +23 novos</div>
          </div>
          <div className="kpi">
            <div className="kpi-val down">4.2%</div>
            <div className="kpi-label">Churn mensal</div>
            <div className="kpi-delta down">↑ +0.8pp (monitorar)</div>
          </div>
          <div className="kpi">
            <div className="kpi-val neutral">78%</div>
            <div className="kpi-label">Freq. média/semana</div>
            <div className="kpi-delta up">↑ +3pp</div>
          </div>
          <div className="kpi">
            <div className="kpi-val up">94%</div>
            <div className="kpi-label">Retenção 90 dias</div>
            <div className="kpi-delta up">Estável</div>
          </div>
        </div>
        <div className="owner-body">
          <div className="owner-panel">
            <h4>Receita recorrente — últimas 8 semanas</h4>
            <div className="chart-mock">
              {heights.map((h, i) => (
                <div
                  key={i}
                  className={`bar-mock${i === heights.length - 1 ? " highlight" : ""}`}
                  style={{ height: `${h}%` }}
                  title={`Semana ${i + 1}: R$ ${(h * 520).toLocaleString(
                    "pt-BR"
                  )}`}
                ></div>
              ))}
            </div>
            <p style={{ fontSize: ".72rem", color: "var(--text-secondary)", marginTop: ".8rem" }}>
              Passe o mouse nas barras para ver detalhes
            </p>
          </div>
          <div className="owner-panel">
            <h4>Alertas e notificações</h4>
            <div className="alert-item">
              <div className="alert-dot churn"></div>
              <div className="alert-text">
                <strong>12 alunos</strong> com pagamento em atraso há 5+ dias —
                acionar cobrança automática.
              </div>
            </div>
            <div className="alert-item">
              <div className="alert-dot renew"></div>
              <div className="alert-text">
                <strong>34 planos</strong> renovam nos próximos 7 dias —
                lembrete automático enviado.
              </div>
            </div>
            <div className="alert-item">
              <div className="alert-dot absent"></div>
              <div className="alert-text">
                <strong>8 alunos</strong> sem treinar há 10+ dias — enviar
                mensagem &quot;sentimos sua falta&quot;.
              </div>
            </div>
            <div className="alert-item">
              <div className="alert-dot" style={{ background: "var(--green)" }}></div>
              <div className="alert-text">
                <strong>5 aulas experimentais</strong> agendadas esta semana.
                Taxa de conversão atual: 71%.
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
