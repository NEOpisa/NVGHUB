import { hero, site } from "../site.config";
import SilkCanvas from "./SilkCanvas";

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-veil" aria-hidden />
      <SilkCanvas />

      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1>
            {hero.titulo1}
            <br />
            <em>{hero.titulo2}</em>
          </h1>
          <p className="lead">{hero.lead}</p>
          <div className="hero-actions">
            <a className="btn" href="#agendar">
              {hero.ctaPrimario}
            </a>
            <a className="btn ghost" href="#rituais">
              {hero.ctaSecundario}
            </a>
          </div>
          <p className="hero-proof">{site.prova}</p>
        </div>

        <div className="hero-portrait">
          <div className="arch">
            <img
              src={hero.imagem.src}
              alt={hero.imagem.alt}
              width={900}
              height={1148}
              fetchPriority="high"
            />
          </div>
          <div className="hero-chip">
            <svg viewBox="0 0 32 32" aria-hidden>
              <path d="M16 3C9.4 3 4 8.4 4 15c0 2.4.7 4.6 1.9 6.5L4 29l7.7-1.8c1.8 1 3.8 1.5 5.9 1.5 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-1.9 0-3.7-.5-5.2-1.4l-.4-.2-4.6 1.1 1.1-4.4-.3-.4c-1-1.6-1.6-3.5-1.6-5.5C5 9.5 9.9 4.9 16 4.9S27 9.5 27 15s-4.9 9.8-11 9.8zm5.5-7.3c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.6 0-.2-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.1 1.3 3.3c.2.2 2.3 3.5 5.6 4.9.8.3 1.4.5 1.9.7.8.2 1.5.2 2.1.1.6-.1 1.8-.7 2.1-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.5-.3z" />
            </svg>
            <p>
              <b>Confirmação no WhatsApp</b> — reserve aqui e receba o lembrete
              do seu horário.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
