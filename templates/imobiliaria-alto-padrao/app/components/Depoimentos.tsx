import Reveal from "./Reveal";

const deps = [
  { q: "Encontraram a casa dos nossos sonhos antes mesmo de ela ir ao mercado. Discrição e bom gosto do começo ao fim.", n: "[Nome do Cliente]", c: "Comprou em [Bairro]" },
  { q: "Vendi meu apartamento 12% acima do que esperava, sem stress e sem visita desnecessária. Atendimento impecável.", n: "[Nome do Cliente]", c: "Vendeu em [Bairro]" },
  { q: "Senti que tinha um sócio cuidando de cada detalhe — jurídico, mudança, reforma. Recomendo de olhos fechados.", n: "[Nome do Cliente]", c: "Cobertura em [Bairro]" },
];

export default function Depoimentos() {
  return (
    <section id="depoimentos">
      <div className="wrap">
        <Reveal className="sec-head center">
          <p className="eyebrow">Quem confiou</p>
          <h2>
            Histórias que terminam em <em>endereço novo</em>
          </h2>
        </Reveal>
        <div className="depos">
          {deps.map((d) => (
            <Reveal as="div" className="depo" key={d.n + d.c}>
              <div className="q" aria-hidden="true">&ldquo;</div>
              <p>{d.q}</p>
              <div className="who">
                <b>{d.n}</b>
                {d.c}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
