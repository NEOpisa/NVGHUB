import Reveal from "./Reveal";

const steps = [
  { n: "1", t: "Conversa inicial", d: "Entendemos seu momento, seu padrão de vida e exatamente o que você procura — ou quer vender." },
  { n: "2", t: "Curadoria personalizada", d: "Selecionamos apenas imóveis que fazem sentido para você e montamos uma agenda de visitas reservadas." },
  { n: "3", t: "Visita & análise", d: "Acompanhamos cada visita com dossiê técnico, avaliação de mercado e resposta a todas as dúvidas." },
  { n: "4", t: "Negociação & escritura", d: "Conduzimos a proposta, o jurídico e o cartório até a entrega das chaves, com total transparência." },
];

export default function Processo() {
  return (
    <section className="processo" id="processo">
      <div className="wrap">
        <div className="proc-row">
          <Reveal className="proc-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=900&q=80"
              alt="Interior de imóvel de alto padrão"
              loading="lazy"
            />
          </Reveal>
          <Reveal>
            <p className="eyebrow">Como atendemos</p>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)" }}>
              Um concierge imobiliário, do primeiro café à chave na mão
            </h2>
            <ul className="steps">
              {steps.map((s) => (
                <li className="step" key={s.n}>
                  <b>0{s.n}</b>
                  <div>
                    <h4>{s.t}</h4>
                    <p>{s.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
