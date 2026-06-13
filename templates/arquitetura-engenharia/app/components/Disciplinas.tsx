import Reveal from "./Reveal";

const itens = [
  {
    n: "01",
    t: "Arquitetura",
    d: "Projeto arquitetônico completo, do estudo preliminar ao executivo, com legalização e aprovações.",
  },
  {
    n: "02",
    t: "Engenharia",
    d: "Cálculo estrutural, fundações, instalações e compatibilização — segurança que sustenta o desenho.",
  },
  {
    n: "03",
    t: "Interiores",
    d: "Detalhamento de interiores, marcenaria sob medida, iluminação e curadoria de acabamentos.",
  },
  {
    n: "04",
    t: "Gestão de obra",
    d: "Planejamento, orçamento, acompanhamento técnico e entrega — uma obra previsível, do início ao fim.",
  },
];

export default function Disciplinas() {
  return (
    <>
      <div className="sec-head">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: "20px" }}>
            Disciplinas
          </p>
          <h2>Um escritório, quatro frentes integradas</h2>
        </Reveal>
        <Reveal>
          <p>
            Reunimos projeto e execução sob o mesmo teto. Você fala com um time
            só — e a responsabilidade técnica nunca fica no meio do caminho.
          </p>
        </Reveal>
      </div>
      <Reveal as="div" className="disc">
        {itens.map((i) => (
          <div className="disc-item" key={i.n}>
            <span className="idx">{i.n} —</span>
            <h3>{i.t}</h3>
            <p>{i.d}</p>
          </div>
        ))}
      </Reveal>
    </>
  );
}
