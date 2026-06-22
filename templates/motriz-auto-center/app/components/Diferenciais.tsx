const ITEMS = [
  { n: "1", h: "Orçamento antes de tudo", p: "Você aprova cada item antes de qualquer reparo. Sem surpresa na fatura." },
  { n: "2", h: "Peças com nota e garantia", p: "Trabalhamos só com fornecedores homologados e emitimos garantia por escrito." },
  { n: "3", h: "Prazo que se cumpre", p: "Definimos a data de entrega e avisamos você a cada etapa pelo WhatsApp." },
  { n: "4", h: "Mecânicos certificados", p: "Equipe com formação técnica e treinamento constante nas principais montadoras." },
];

export default function Diferenciais() {
  return (
    <section className="section diff" id="diferenciais">
      <div className="wrap diff-grid">
        <div className="diff-img">
          <img
            src="https://images.unsplash.com/photo-1632823469850-1b7b1e8b7e2e?w=1000&q=80"
            alt="Mecânico trabalhando no motor"
          />
        </div>
        <div>
          <span className="eyebrow">Por que a Motriz</span>
          <h2>Confiança não se improvisa</h2>
          <ul className="diff-list">
            {ITEMS.map((i) => (
              <li key={i.n}>
                <span className="diff-num">{i.n}</span>
                <div>
                  <h4>{i.h}</h4>
                  <p>{i.p}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
