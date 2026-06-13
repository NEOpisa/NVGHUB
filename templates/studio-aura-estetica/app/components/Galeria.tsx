import { galeria, site } from "../site.config";
import Reveal from "./Reveal";

export default function Galeria() {
  return (
    <section id="galeria">
      <div className="wrap">
        <Reveal as="header" className="sec-head split">
          <h2>Direto do espelho</h2>
          <a
            className="link-insta"
            href={`https://instagram.com/${site.instagram}`}
            target="_blank"
            rel="noopener"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="5"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
            </svg>
            @{site.instagram}
          </a>
        </Reveal>
      </div>

      <div className="wrap">
        <Reveal className="gal-strip" role="list" aria-label="Galeria de resultados">
          {galeria.map((g) => (
            <figure key={g.src} role="listitem">
              <div className="gal-ph">
                <img src={g.src} alt={g.alt} loading="lazy" width={900} height={1125} />
              </div>
            </figure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
