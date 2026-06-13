export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-bg"></div>
      <div className="hero-grain"></div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <p className="hero-eyebrow">✦ Confeitaria Artesanal — Desde [XXXX]</p>
        <h1 className="hero-title">
          Feito com <em>amor</em>,<br />
          entregue na sua porta
        </h1>
        <p className="hero-sub">
          Bolos artesanais, doces finos e encomendas especiais — sem taxas de
          marketplace, com todo o carinho que você merece.
        </p>
        <div className="hero-btns">
          <a href="#pedido" className="btn-primary">
            Pedir agora
          </a>
          <a href="#cardapio" className="btn-outline">
            Ver cardápio completo
          </a>
        </div>
      </div>
      <div className="hero-scroll">
        <span>Rolar</span>
        <div className="hero-scroll-line"></div>
      </div>
    </section>
  );
}
