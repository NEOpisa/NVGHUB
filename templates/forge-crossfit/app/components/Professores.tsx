import Reveal from "./Reveal";
import { coaches } from "@/app/data/coaches";

export default function Professores() {
  return (
    <section id="professores" className="sec">
      <h2 className="sec-title">
        Quem comanda o <span>treino</span>
      </h2>
      <p className="sec-lead">
        Certificações verificáveis e formação continuada. Quem corrige o seu
        movimento sabe exatamente o que está corrigindo.
      </p>
      <div className="prof-grid">
        {coaches.map((c) => (
          <Reveal className="prof-card" key={c.nome}>
            <div
              className="prof-photo"
              style={{ backgroundImage: `url('${c.img}')` }}
            ></div>
            <div className="prof-info">
              <h4>{c.nome}</h4>
              <div className="prof-role">{c.role}</div>
              <div className="prof-certs">
                {c.certs.map((cert) => (
                  <span className="cert-tag" key={cert}>
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
