import Reveal from "./Reveal";

export default function Sobre() {
  return (
    <section className="sobre line-top" id="sobre">
      <div className="wrap">
        <div className="row">
          <Reveal className="sobre-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80"
              alt="Escritório de arquitetura"
              loading="lazy"
            />
          </Reveal>
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: "22px" }}>
              Quem assina
            </p>
            <h2>Arquitetos e engenheiros, lado a lado desde o primeiro risco</h2>
            <p>
              O Valença & Antunes nasceu da convicção de que projeto e
              cálculo não deveriam viver em prédios diferentes. Aqui, a mesma
              equipe pensa a forma e garante que ela fique de pé.
            </p>
            <p>
              Atuamos em residências, edifícios, retrofit e projetos
              corporativos — sempre com responsabilidade técnica, transparência
              de orçamento e obediência ao prazo.
            </p>
            <div className="sign">
              <div>
                <b>Marina Duarte</b>
                <span>Arquiteto(a) e Eng. — CAU/CREA 00000</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
