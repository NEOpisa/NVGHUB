import Reveal from "./Reveal";

const equipe = [
  { nome: "[Nome da Profissional]", especialidade: "[Especialidade]" },
  { nome: "[Nome da Profissional]", especialidade: "[Especialidade]" },
  { nome: "[Nome da Profissional]", especialidade: "[Especialidade]" },
  { nome: "[Nome da Profissional]", especialidade: "[Especialidade]" },
];

export default function Equipe() {
  return (
    <section id="equipe">
      <Reveal className="sec-head">
        <p className="eyebrow">Equipe</p>
        <h2>Quem cuida de você</h2>
      </Reveal>
      <div className="eq-grid">
        {equipe.map((p, i) => (
          <Reveal as="div" key={i} className="pro">
            <div className="ph"></div>
            <div className="info">
              <h3>{p.nome}</h3>
              <span>{p.especialidade}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
