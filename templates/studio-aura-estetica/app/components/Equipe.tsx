import { equipe } from "../site.config";
import Reveal from "./Reveal";

export default function Equipe() {
  return (
    <section id="equipe">
      <div className="wrap">
        <Reveal as="header" className="sec-head split">
          <h2>Quem assina o seu olhar</h2>
          <p>
            Cada técnica nas mãos de quem domina o assunto — uma especialista
            por ritual, do início ao fim.
          </p>
        </Reveal>

        <ul className="equipe-grid">
          {equipe.map((p) => (
            <Reveal as="li" key={p.nome}>
              <div className="pro-ph">
                {p.foto ? (
                  <img src={p.foto} alt={`${p.nome}, ${p.especialidade}`} />
                ) : (
                  // Monograma elegante até o studio subir os retratos reais
                  <span className="mono" aria-hidden>
                    {p.nome.charAt(0)}
                  </span>
                )}
              </div>
              <h3>{p.nome}</h3>
              <span className="papel">{p.especialidade}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
