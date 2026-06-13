import Reveal from "./Reveal";

const depoimentos = [
  {
    texto:
      '"Agendei pelo site em um minuto, sem precisar mandar mensagem e esperar resposta. Atendimento pontual e impecável."',
    autor: "[Nome do Cliente]",
  },
  {
    texto:
      '"O cartão fidelidade digital é genial — ganhei minha limpeza de pele de presente no mês passado!"',
    autor: "[Nome do Cliente]",
  },
  {
    texto:
      '"Melhor design de sobrancelha da cidade. O studio é lindo e o cuidado com cada detalhe se nota na hora."',
    autor: "[Nome do Cliente]",
  },
];

export default function Depoimentos() {
  return (
    <section>
      <Reveal className="sec-head">
        <p className="eyebrow">Depoimentos</p>
        <h2>Elas contam melhor</h2>
      </Reveal>
      <div className="dep-row">
        {depoimentos.map((d, i) => (
          <Reveal as="div" key={i} className="dep">
            <div className="st">★★★★★</div>
            <p>{d.texto}</p>
            <b>{d.autor}</b>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
