import Reveal from "./Reveal";
import { depos } from "@/app/data/depos";

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="sec">
      <p className="sec-label">✦ Transformações reais</p>
      <h2 className="sec-title">
        Quem <span>já treina</span> aqui
      </h2>
      <div className="depo-grid">
        {depos.map((d) => (
          <Reveal className="depo-card" key={d.nome}>
            <div className="depo-stars">{d.stars}</div>
            <p className="depo-text">{d.txt}</p>
            <div className="depo-author">
              <div
                className="depo-avatar"
                style={{ backgroundImage: `url('${d.avatar}')` }}
              ></div>
              <div>
                <div className="depo-name">{d.nome}</div>
                <div className="depo-meta">{d.meta}</div>
                {d.trans && (
                  <div className="transform-badge">
                    ✦ Transformação verificada
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
