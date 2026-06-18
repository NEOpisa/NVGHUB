import { depoimentos } from "../site.config";
import Reveal from "./Reveal";

export default function Depoimentos() {
  return (
    <section id="depoimentos">
      <div className="wrap">
        <Reveal className="sec-head stack" as="div">
          <span className="kicker">Quem veste</span>
          <h2>Roupa que volta a ser usada.</h2>
        </Reveal>

        <div className="depo-grid">
          {depoimentos.map((d) => (
            <Reveal as="figure" key={d.autora}>
              <blockquote>“{d.texto}”</blockquote>
              <figcaption className="depo-who">
                {d.autora}
                <span>{d.peca}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
