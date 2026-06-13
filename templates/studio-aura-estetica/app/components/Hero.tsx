import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section className="hero">
      <div>
        <p className="eyebrow">Estética · Beleza · Autocuidado</p>
        <h1>
          Realce o que já é <em>seu.</em>
        </h1>
        <p className="lead">
          Sobrancelhas, cílios, skincare e nails com técnica, delicadeza e
          horário marcado — sem fila, sem app de terceiros, sem taxa.
        </p>
        <div className="hero-actions">
          <a className="btn" href="#agendar">
            Agendar agora
          </a>
          <a className="btn lt" href="#servicos">
            Ver serviços e valores
          </a>
        </div>
        <div className="stats">
          <div>
            <b>[X.X]★</b>
            <span>no Google</span>
          </div>
          <div>
            <b>+[XXXX]</b>
            <span>clientes atendidas</span>
          </div>
          <div>
            <b>[X] anos</b>
            <span>de studio</span>
          </div>
        </div>
      </div>
      <Reveal className="hero-visual">
        <div
          className="hv-main"
          role="img"
          aria-label="Ambiente do studio"
        ></div>
        <div className="hv-tag">
          <b>Lembrete automático 💬</b>
          <p>
            Você recebe a confirmação e o lembrete do horário direto no
            WhatsApp.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
