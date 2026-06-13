import { depoimentos } from "../site.config";
import Reveal from "./Reveal";

export default function Depoimentos() {
  const [lead, ...resto] = depoimentos;

  return (
    <section className="depo">
      <div className="wrap">
        <h2 className="sr-only">Depoimentos de clientes</h2>

        <Reveal as="figure" className="depo-lead">
          <blockquote>{lead.texto}</blockquote>
          <figcaption className="depo-who" style={{ marginTop: "26px" }}>
            {lead.autora}
            <span>{lead.ritual}</span>
          </figcaption>
        </Reveal>

        <div className="depo-row">
          {resto.map((d) => (
            <Reveal as="figure" key={d.autora}>
              <blockquote>“{d.texto}”</blockquote>
              <figcaption className="depo-who">
                {d.autora}
                <span>{d.ritual}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
