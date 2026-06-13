import Reveal from "./Reveal";

const itens = [
  { n: "01", t: "Curadoria, não catálogo", d: "Selecionamos a dedo cada imóvel que entra no portfólio. Você vê o que vale a pena — não uma lista infinita." },
  { n: "02", t: "Atendimento privativo", d: "Um consultor dedicado do início ao fim, com sigilo absoluto sobre você e sobre cada negociação." },
  { n: "03", t: "Visitas sob agenda", d: "Visitas reservadas, no seu tempo, com tour completo e dossiê técnico de cada propriedade." },
  { n: "04", t: "Avaliação justa", d: "Precificação baseada em dados reais de mercado — para comprar bem ou vender pelo valor certo." },
  { n: "05", t: "Jurídico e cartório", d: "Cuidamos de documentação, due diligence e escritura. Você assina tranquilo." },
  { n: "06", t: "Pós-venda de verdade", d: "Mudança, reforma, decoração e indicações de confiança depois que as chaves são suas." },
];

export default function Diferenciais() {
  return (
    <section id="diferenciais">
      <div className="wrap">
        <Reveal className="sec-head center">
          <p className="eyebrow">Por que a [Nome]</p>
          <h2>
            O cuidado de uma <em>butique</em>, a força de uma imobiliária
          </h2>
        </Reveal>
        <div className="dif-grid">
          {itens.map((i) => (
            <Reveal as="div" className="dif" key={i.n}>
              <span className="di">{i.n}</span>
              <h3>{i.t}</h3>
              <p>{i.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
