import { vitrine, vitrineHead } from "../site.config";
import Reveal from "./Reveal";

export default function Vitrine() {
  return (
    <section id="colecao">
      <div className="wrap">
        <Reveal className="sec-head split" as="div">
          <div>
            <span className="kicker">Vitrine</span>
            <h2>{vitrineHead.titulo}</h2>
          </div>
          <p>{vitrineHead.intro}</p>
        </Reveal>

        <div className="vit-grid">
          {vitrine.map((p, i) => (
            <Reveal as="a" className="vit-card" href="#provador" key={p.nome} style={{ transitionDelay: `${(i % 3) * 60}ms` }}>
              <div className="vit-ph">
                {p.selo ? <span className="vit-selo">{p.selo}</span> : null}
                <img src={p.imagem} alt={p.alt} loading="lazy" />
                <span className="vit-provar">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M4 7l3-3h10l3 3-3 3-1-1v11H8V9L7 10 4 7Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Provar no manequim
                </span>
              </div>
              <div className="vit-meta">
                <h3>
                  {p.nome}
                  <span className="cat">{p.categoria}</span>
                </h3>
                <span className="preco">{p.preco}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
