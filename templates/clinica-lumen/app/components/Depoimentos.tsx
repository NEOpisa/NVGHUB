import Reveal from "./Reveal";

const depoimentos = [
  {
    texto:
      '"Tinha pavor de dentista. A equipe me acolheu de um jeito que nunca vivi em outra clínica — fiz todo o tratamento sem ansiedade."',
    autor: "Camila Souza · Lentes de contato",
  },
  {
    texto:
      '"Vi a simulação do meu sorriso no computador antes de começar. O resultado final ficou idêntico ao planejado."',
    autor: "Camila Souza · Implantes",
  },
  {
    texto:
      '"Agendamento pelo site, lembrete no WhatsApp, ficha preenchida em casa. Atendimento pontual do início ao fim."',
    autor: "Camila Souza · Ortodontia",
  },
];

export default function Depoimentos() {
  return (
    <section>
      <Reveal as="div" className="sec-head">
        <p className="eyebrow">Depoimentos</p>
        <h2>O que nossos pacientes contam</h2>
      </Reveal>
      <div className="dep-grid">
        {depoimentos.map((dep, idx) => (
          <Reveal as="div" className="dep" key={idx}>
            <div className="stars">★★★★★</div>
            <p>{dep.texto}</p>
            <p className="who">{dep.autor}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
