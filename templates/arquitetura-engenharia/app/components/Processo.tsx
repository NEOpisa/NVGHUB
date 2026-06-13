import Reveal from "./Reveal";

const etapas = [
  { n: "01", t: "Briefing", d: "Entendemos programa, terreno, orçamento e o jeito que você quer viver ou operar." },
  { n: "02", t: "Estudo", d: "Partido arquitetônico, volumetria e viabilidade técnica e estrutural." },
  { n: "03", t: "Projeto", d: "Executivo completo: arquitetura, estrutura, instalações e detalhamento." },
  { n: "04", t: "Obra", d: "Gestão de canteiro, cronograma, medições e controle de qualidade." },
  { n: "05", t: "Entrega", d: "Vistoria, as-built, manual do proprietário e acompanhamento pós-entrega." },
];

export default function Processo() {
  return (
    <>
      <div className="sec-head">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: "20px" }}>
            Como trabalhamos
          </p>
          <h2>Do terreno à entrega, em cinco etapas</h2>
        </Reveal>
        <Reveal>
          <p>
            Um método claro para uma obra previsível — você sempre sabe em que
            ponto o seu projeto está.
          </p>
        </Reveal>
      </div>
      <Reveal as="div" className="proc">
        {etapas.map((e) => (
          <div className="proc-step" key={e.n}>
            <span className="idx">{e.n}</span>
            <h4>{e.t}</h4>
            <p>{e.d}</p>
          </div>
        ))}
      </Reveal>
    </>
  );
}
