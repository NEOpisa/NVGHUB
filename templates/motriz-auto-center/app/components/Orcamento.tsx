export default function Orcamento() {
  return (
    <section className="orc" id="orcamento">
      <div className="wrap">
        <span className="eyebrow" style={{ justifyContent: "center" }}>
          Orçamento sem compromisso
        </span>
        <h2>
          Bora resolver <span>de uma vez?</span>
        </h2>
        <p>
          Manda o modelo do carro e o que está sentindo. A gente responde rápido
          com a próxima janela de agendamento e uma estimativa inicial.
        </p>
        <div className="orc-actions">
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Pedir orçamento no WhatsApp
          </a>
          <a href="tel:+550000000000" className="btn btn-outline">
            (00) 0000-0000
          </a>
        </div>
      </div>
    </section>
  );
}
