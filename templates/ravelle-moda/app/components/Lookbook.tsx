import { lookbook, site } from "../site.config";
import Reveal from "./Reveal";

export default function Lookbook() {
  return (
    <section id="lookbook">
      <div className="wrap">
        <Reveal className="sec-head split" as="div">
          <div>
            <span className="kicker">Lookbook</span>
            <h2>{lookbook.titulo}</h2>
            <p style={{ marginTop: 14 }}>{lookbook.legenda}</p>
          </div>
          <a className="link-insta" href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
              <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
            </svg>
            @{site.instagram}
          </a>
        </Reveal>
      </div>

      <div className="lb-strip">
        {lookbook.fotos.map((f) => (
          <figure key={f.src}>
            <div className="lb-ph">
              <img src={f.src} alt={f.alt} loading="lazy" />
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
