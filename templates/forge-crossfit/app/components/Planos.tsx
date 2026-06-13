"use client";

import { useStore } from "@/app/context/StoreContext";

const planos = [
  {
    name: "Starter",
    price: "R$ 0,00",
    featured: false,
    features: [
      { text: "3× por semana (CrossFit)", off: false },
      { text: "Aula experimental grátis", off: false },
      { text: "Check-in digital", off: false },
      { text: "Área do aluno", off: false },
      { text: "Open Gym", off: true },
      { text: "Weightlifting incluso", off: true },
      { text: "Nutrição com coaches", off: true },
    ],
  },
  {
    name: "Ilimitado",
    price: "R$ 0,00",
    featured: true,
    features: [
      { text: "Aulas ilimitadas", off: false },
      { text: "CrossFit + Weightlifting", off: false },
      { text: "Open Gym incluso", off: false },
      { text: "Check-in digital", off: false },
      { text: "Área do aluno completa", off: false },
      { text: "Relatório mensal de evolução", off: false },
      { text: "Nutrição com coaches", off: true },
    ],
  },
  {
    name: "Elite",
    price: "R$ 0,00",
    featured: false,
    features: [
      { text: "Tudo do Ilimitado", off: false },
      { text: "Coaching nutricional mensal", off: false },
      { text: "Plano de treino individual", off: false },
      { text: "Análise de vídeo dos movimentos", off: false },
      { text: "Priority check-in", off: false },
      { text: "Acesso a eventos e competições", off: false },
      { text: "Camiseta exclusiva [Nome da Academia]", off: false },
    ],
  },
];

export default function Planos() {
  const { openPlanoModal } = useStore();

  return (
    <section id="planos" className="sec">
      <h2 className="sec-title">
        Planos sem <span>pegadinha</span>
      </h2>
      <p className="sec-lead">
        Sem taxa de adesão, sem contrato de fidelidade, sem letra miúda.
        Cancele quando quiser.
      </p>
      <div className="planos-grid">
        {planos.map((plano) => (
          <div
            className={`plano-card${plano.featured ? " featured" : ""}`}
            key={plano.name}
          >
            {plano.featured && (
              <div className="plano-badge-top">Mais popular</div>
            )}
            <div className="plano-name">{plano.name}</div>
            <div className="plano-price">
              <div className="amount">{plano.price}</div>
              <span className="per">por mês · renovação automática</span>
            </div>
            <ul className="plano-features">
              {plano.features.map((f) => (
                <li className={f.off ? "off" : ""} key={f.text}>
                  {f.text}
                </li>
              ))}
            </ul>
            <button className="btn-plano" onClick={openPlanoModal} type="button">
              Escolher plano
            </button>
          </div>
        ))}
      </div>
      <p
        style={{
          textAlign: "center",
          marginTop: "1.5rem",
          fontSize: ".82rem",
          color: "var(--text-secondary)",
        }}
      >
        Aceitamos cartão, Pix e recorrência automática. Sem taxa de adesão.
        Cancele quando quiser.
      </p>
    </section>
  );
}
