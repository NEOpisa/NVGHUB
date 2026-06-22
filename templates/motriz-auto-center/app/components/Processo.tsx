const STEPS = [
  { n: "01", h: "Você agenda", p: "Manda o modelo do carro e o problema pelo WhatsApp. Marcamos o melhor horário." },
  { n: "02", h: "Diagnóstico", p: "Avaliamos com scanner e identificamos exatamente o que precisa de reparo." },
  { n: "03", h: "Orçamento aprovado", p: "Você recebe o orçamento detalhado e só seguimos com a sua autorização." },
  { n: "04", h: "Carro pronto", p: "Executamos o serviço, testamos e devolvemos com garantia por escrito." },
];

export default function Processo() {
  return (
    <section className="section" id="processo">
      <div className="wrap">
        <div className="section-head center">
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            Como funciona
          </span>
          <h2>Simples do começo ao fim</h2>
        </div>
        <div className="steps">
          {STEPS.map((s) => (
            <div className="step" key={s.n}>
              <div className="step-n">{s.n}</div>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
