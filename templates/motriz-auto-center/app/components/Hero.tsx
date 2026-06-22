export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-inner">
        <span className="eyebrow">Auto center completo · 12 anos na estrada</span>
        <h1>
          Seu carro nas mãos de quem <span>entende</span>
        </h1>
        <p>
          Diagnóstico computadorizado, peças com procedência e garantia em todo
          serviço. Da revisão simples à suspensão completa, resolvemos de uma vez.
        </p>
        <div className="hero-actions">
          <a href="#orcamento" className="btn btn-primary">
            Pedir orçamento
          </a>
          <a href="#servicos" className="btn btn-outline">
            Ver serviços
          </a>
        </div>
        <div className="hero-strip">
          <div>
            <strong>+18 mil</strong>
            <span>carros atendidos</span>
          </div>
          <div>
            <strong>90 dias</strong>
            <span>de garantia</span>
          </div>
          <div>
            <strong>4.8★</strong>
            <span>no Google</span>
          </div>
        </div>
      </div>
    </section>
  );
}
