export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-img" aria-hidden="true" />
      <div className="wrap">
        <p className="eyebrow" style={{ color: "var(--brass-light)" }}>
          Imóveis de alto padrão · São Paulo - SP
        </p>
        <h1>
          Endereços que <em>poucos</em> terão o privilégio de chamar de seu
        </h1>
        <p className="lead">
          Uma curadoria discreta de casas, coberturas e apartamentos
          exclusivos — com atendimento privativo do primeiro contato à entrega
          das chaves.
        </p>

        <div className="search" role="search">
          <div className="field">
            <label>Finalidade</label>
            <select defaultValue="comprar">
              <option value="comprar">Comprar</option>
              <option value="alugar">Alugar</option>
            </select>
          </div>
          <div className="field">
            <label>Tipo</label>
            <select>
              <option>Casa</option>
              <option>Apartamento</option>
              <option>Cobertura</option>
              <option>Terreno</option>
            </select>
          </div>
          <div className="field">
            <label>Bairro</label>
            <input type="text" placeholder="Ex.: Jardins" />
          </div>
          <div className="field">
            <label>Faixa de valor</label>
            <select>
              <option>Até R$ 1M</option>
              <option>R$ 1M – 3M</option>
              <option>R$ 3M – 6M</option>
              <option>Acima de R$ 6M</option>
            </select>
          </div>
          <button className="go" type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            Buscar
          </button>
        </div>
      </div>
    </section>
  );
}
