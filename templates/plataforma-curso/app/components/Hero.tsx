"use client";

import Tilt from "./Tilt";

export default function Hero() {
  function scrollToPricing(e: React.MouseEvent) {
    e.preventDefault();
    document.getElementById("pricingSection")?.scrollIntoView({ behavior: "smooth" });
  }

  function scrollToVideo(e: React.MouseEvent) {
    e.preventDefault();
    document.getElementById("videoSection")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section className="hero">
      <div>
        <div className="hero-eyebrow">[Nome da Plataforma/Curso] · Turma 2025</div>
        <h1>
          Do conhecimento inerte à <em>maestria que gera resultado</em>
        </h1>
        <p className="hero-sub">
          O sistema completo para transformar o que você já sabe em uma carreira e negócio que
          funcionam — com método, consistência e autoridade real.
        </p>
        <div className="hero-cta-group">
          <a href="#" className="btn-primary" onClick={scrollToPricing}>
            Quero minha vaga agora
          </a>
          <a href="#" className="btn-ghost" onClick={scrollToVideo}>
            Ver apresentação
          </a>
        </div>
      </div>
      <div className="hero-right">
        <Tilt className="panel-tilt" max={5}>
          <div className="hero-panel">
            <div className="hero-panel-head">
              <span className="term-dots" aria-hidden="true"><b /><b /><b /></span>
              comunidade.log
            </div>
            <div className="term-line" aria-hidden="true">
              <span className="term-prompt">visitante@plataforma</span>:<span className="term-path">~</span>$ cat resultados.json
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span>[X.XXX]+</span>
                <p>Alunos formados</p>
              </div>
              <div className="hero-stat">
                <span>[XX]%</span>
                <p>Taxa de conclusão</p>
              </div>
              <div className="hero-stat">
                <span>[X] anos</span>
                <p>De expertise</p>
              </div>
              <div className="hero-stat">
                <span>[X.X] ★</span>
                <p>Avaliação média</p>
              </div>
            </div>
            <div className="term-line" aria-hidden="true">
              <span className="term-prompt">visitante@plataforma</span>:<span className="term-path">~</span>$ <span className="term-cursor" />
            </div>
          </div>
        </Tilt>
      </div>
    </section>
  );
}
