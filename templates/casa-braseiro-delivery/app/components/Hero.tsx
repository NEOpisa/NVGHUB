export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-stamp" aria-hidden="true">
        Fogo<b>100%</b>lenha
      </div>
      <span className="hero-tag">Cozinha de fogo · [Bairro, Cidade - UF]</span>
      <h1>
        O lugar
        <br />
        do <em>fogo</em>
      </h1>
      <p className="lead">
        Peça pelo nosso site e pague menos: sem taxa de marketplace, com
        cashback em todo pedido e entrega acompanhada em tempo real.
      </p>
      <div className="hero-actions">
        <a className="btn" href="#cardapio">
          Pedir agora
        </a>
        <a className="btn lt" href="#historia">
          Conhecer a casa
        </a>
      </div>
      <div className="badges">
        <div className="badge">
          <b>−10%</b> no 1º pedido pelo site
        </div>
        <div className="badge">
          <b>5%</b> de cashback sempre
        </div>
        <div className="badge">
          Entrega média <b>38 min</b>
        </div>
      </div>
    </section>
  );
}
