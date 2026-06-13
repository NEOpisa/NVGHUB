import Reveal from "./Reveal";
import Tilt from "./Tilt";

const equipe = [
  {
    nome: "[Nome do(a) Especialista]",
    cro: "CRM/UF 000000 · [Especialidade]",
    desc: "Mestre em Implantodontia, +[XXXX] implantes instalados com cirurgia guiada.",
  },
  {
    nome: "[Nome do(a) Especialista]",
    cro: "CRM/UF 000000 · [Especialidade]",
    desc: "Especialista em reabilitação estética e lentes de contato, formação internacional em DSD.",
  },
  {
    nome: "[Nome do(a) Especialista]",
    cro: "CRM/UF 000000 · [Especialidade]",
    desc: "Certificada em alinhadores invisíveis, especialista em casos de adultos e adolescentes.",
  },
  {
    nome: "[Nome do(a) Especialista]",
    cro: "CRM/UF 000000 · [Especialidade]",
    desc: "Doutor em Periodontia, responsável pelo programa de prevenção contínua da clínica.",
  },
];

export default function Equipe() {
  return (
    <section id="equipe">
      <Reveal as="div" className="sec-head">
        <p className="eyebrow">Equipe</p>
        <h2>Especialistas que assinam cada resultado</h2>
      </Reveal>
      <div className="grid-eq">
        {equipe.map((prof, idx) => (
          <Reveal as="div" key={idx}>
            <Tilt className="prof-tilt" max={12}>
              <div className="prof">
                <div className="ph" />
                <div className="info">
                  <h3>{prof.nome}</h3>
                  <p className="cro">{prof.cro}</p>
                  <p>{prof.desc}</p>
                </div>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
