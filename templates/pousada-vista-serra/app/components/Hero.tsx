export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-inner">
        <span className="eyebrow">Serra da Mantiqueira · 1.450m</span>
        <h1>
          Onde a montanha <em>te chama</em> para desacelerar
        </h1>
        <p>
          Chalés com vista para o vale, café da manhã artesanal e o silêncio que
          só a serra oferece. Um refúgio boutique a três horas da capital.
        </p>
        <div className="hero-actions">
          <a href="#reservar" className="btn btn-primary">
            Reservar estadia
          </a>
          <a href="#acomodacoes" className="btn btn-ghost">
            Ver acomodações
          </a>
        </div>
        <div className="hero-meta">
          <div>
            <strong>8</strong>
            <span>chalés exclusivos</span>
          </div>
          <div>
            <strong>4.9</strong>
            <span>avaliação dos hóspedes</span>
          </div>
          <div>
            <strong>12ha</strong>
            <span>de mata preservada</span>
          </div>
        </div>
      </div>
    </section>
  );
}
