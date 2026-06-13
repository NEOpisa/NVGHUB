export default function Hero() {
  return (
    <section className="hero">
      <p className="eyebrow">Odontologia de precisão · Pinheiros, São Paulo - SP</p>
      <h1>
        Todo sorriso conta <strong>uma história.</strong>
      </h1>
      <svg className="arc" viewBox="0 0 120 34" aria-hidden="true">
        <path d="M6 6 Q60 40 114 6" />
      </svg>
      <p className="lead">
        Diagnóstico digital, planejamento guiado por tecnologia e um
        atendimento que respeita o seu tempo — da primeira avaliação ao
        acompanhamento pós-tratamento.
      </p>
      <div className="hero-actions">
        <a className="btn gold" href="#agendar">
          Agendar minha avaliação
        </a>
        <a className="btn ghost" href="#especialidades">
          Explorar a história
        </a>
      </div>
      <div className="hero-proof">
        <div className="proof">
          <b>+2012</b>
          <span>sorrisos transformados</span>
        </div>
        <div className="proof">
          <b>12</b>
          <span>anos de excelência clínica</span>
        </div>
        <div className="proof">
          <b>4.9 ★</b>
          <span>avaliação no Google</span>
        </div>
      </div>
      <div className="scroll-hint" aria-hidden="true">
        Role para explorar
      </div>
    </section>
  );
}
