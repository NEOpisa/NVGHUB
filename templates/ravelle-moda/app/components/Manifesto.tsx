import { manifesto } from "../site.config";
import Reveal from "./Reveal";

export default function Manifesto() {
  return (
    <section className="manif" id="atelier">
      <div className="wrap">
        <Reveal as="div">
          <span className="kicker">O atelier</span>
          <h2 dangerouslySetInnerHTML={{ __html: manifesto.titulo.replace("coleção.", "<em>coleção.</em>") }} />
        </Reveal>
        <Reveal as="div">
          {manifesto.paragrafos.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <div className="manif-nums">
            {manifesto.numeros.map((n) => (
              <div key={n.rotulo}>
                <b>{n.valor}</b>
                <span>{n.rotulo}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
