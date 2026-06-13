import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section className="cta" id="contato">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow" style={{ color: "#fff", marginBottom: "28px", justifyContent: "center", display: "flex" }}>
            Vamos conversar
          </p>
          <h2>
            Tem um terreno, uma ideia ou uma <em>obra para tirar do papel?</em>
          </h2>
          <a className="btn" href="mailto:contato@seudominio.com.br">
            Agendar uma conversa
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </Reveal>
        <div className="cta-meta">
          <div>
            E-mail
            <b>contato@seudominio.com.br</b>
          </div>
          <div>
            Telefone
            <b>(00) 00000-0000</b>
          </div>
          <div>
            Estúdio
            <b>Av. Paulista, 1842 — São Paulo - SP — São Paulo - SP</b>
          </div>
        </div>
      </div>
    </section>
  );
}
