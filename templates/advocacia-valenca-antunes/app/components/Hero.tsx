import Hero3D from "./Hero3D";

export default function Hero() {
  return (
    <div className="wrap">
      <section className="hero">
        <div className="hero-copy">
          <span className="protocolo">Advocacia empresarial · [Cidade]–[UF] · desde [AAAA]</span>
          <h1>
            <span className="quebra">Construir</span>
            <span className="quebra">é com você.</span>
            <span className="quebra">
              <em>Defender</em>
            </span>
            <span className="quebra">é conosco.</span>
          </h1>
          <p className="lead">
            Assessoria estratégica em direito tributário, trabalhista e societário para empresas
            que não podem se dar ao luxo de improvisar.
          </p>
          <div className="hero-actions">
            <a className="btn solid" href="#contato">
              Agendar consulta
            </a>
            <a className="btn" href="#areas">
              Áreas de atuação
            </a>
          </div>
          <div className="ficha">
            <div>
              <b>[X]+</b>
              <span>anos de atuação</span>
            </div>
            <div>
              <b>[XXX]</b>
              <span>empresas assessoradas</span>
            </div>
            <div>
              <b>R$ [XX] mi</b>
              <span>em teses recuperadas</span>
            </div>
          </div>
        </div>
        <div className="hero-palco">
          <Hero3D />
          <span className="carimbo">Protocolado · [Cidade]-[UF]</span>
        </div>
      </section>
    </div>
  );
}
