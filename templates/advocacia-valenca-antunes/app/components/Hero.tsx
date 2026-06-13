import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="hero">
      <div>
        <p className="art">Advocacia empresarial · desde [AAAA]</p>
        <h1>
          Decisões jurídicas que <em>protegem</em> o que sua empresa construiu.
        </h1>
        <p className="lead">
          Assessoria estratégica em direito tributário, trabalhista e societário para empresas que
          não podem se dar ao luxo de improvisar.
        </p>
        <div className="hero-actions">
          <a className="btn solid" href="#contato">
            Agendar consulta
          </a>
          <a className="btn" href="#calc">
            Calcular rescisão
          </a>
        </div>
        <div className="bar">
          <div>
            <b>[X]+</b>
            <span>anos de atuação</span>
          </div>
          <div>
            <b>+[XXX]</b>
            <span>empresas assessoradas</span>
          </div>
          <div>
            <b>R$ [valor]</b>
            <span>em teses recuperadas</span>
          </div>
        </div>
      </div>
      <Reveal className="hero-visual" role="img" aria-label="Identidade do escritório" />
    </section>
  );
}
