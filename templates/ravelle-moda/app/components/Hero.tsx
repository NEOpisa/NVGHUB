import { hero, site } from "../site.config";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <Reveal className="hero-copy" as="div">
            <span className="kicker">{hero.tag}</span>
            <h1>
              {hero.titulo1}
              <em className="line2">{hero.titulo2}</em>
            </h1>
            <p className="lead">{hero.lead}</p>
            <div className="hero-actions">
              <a className="btn" href="#provador">
                {hero.ctaPrimario}
                <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a className="btn ghost" href="#colecao">
                {hero.ctaSecundario}
              </a>
            </div>
            <p className="hero-proof">{site.prova}</p>
          </Reveal>

          <Reveal as="figure" className="hero-figure">
            <div className="shot">
              <img src={hero.imagem.src} alt={hero.imagem.alt} />
            </div>
            <figcaption>
              <b>Série curta</b>
              <span>{site.bairro}</span>
            </figcaption>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
