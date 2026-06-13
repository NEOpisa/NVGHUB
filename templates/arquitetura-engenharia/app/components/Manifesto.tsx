import Reveal from "./Reveal";

export default function Manifesto() {
  return (
    <section className="manifesto" id="manifesto">
      <div className="wrap">
        <div className="row">
          <Reveal>
            <p className="eyebrow">O estúdio</p>
          </Reveal>
          <Reveal>
            <p className="big">
              Acreditamos que arquitetura e engenharia são a mesma frase dita em
              duas línguas. Projetamos <em>forma, estrutura e obra</em> como uma
              decisão só — para que nada se perca entre a prancheta e a chave na
              mão.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
