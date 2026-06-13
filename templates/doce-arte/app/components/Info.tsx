export default function Info() {
  return (
    <section id="info">
      <p className="section-eyebrow">✦ Estamos aqui</p>
      <h2 className="section-title">
        Horários e <em>localização</em>
      </h2>
      <div className="info-grid">
        <div className="info-card">
          <h4>Horário de funcionamento</h4>
          <p>
            Segunda a sexta: <strong>9h–20h</strong>
            <br />
            Sábados: <strong>9h–18h</strong>
            <br />
            Domingos: <strong>9h–14h</strong>
            <br />
            <em>Feriados: consulte-nos</em>
          </p>
        </div>
        <div className="info-card">
          <h4>Onde nos encontrar</h4>
          <p>
            Av. Paulista, 1842 — Bela Vista, São Paulo - SP
            <br />
            Pinheiros, São Paulo - SP
            <br />
            CEP 00000-000
            <br />
            <br />
            <a href="https://maps.google.com" target="_blank">
              Abrir no Google Maps →
            </a>
          </p>
        </div>
        <div className="info-card">
          <h4>Área de entrega</h4>
          <p>
            Raio de 10 km da loja.
            <br />
            <br />
            <strong>Taxa por bairro:</strong>
            <br />
            Até 3 km: R$ 5,00
            <br />
            3–6 km: R$ 10,00
            <br />
            6–10 km: R$ 15,00
          </p>
        </div>
        <div className="info-card">
          <h4>Fale com a gente</h4>
          <p>
            Para dúvidas, encomendas urgentes ou confirmações, fale direto
            pelo WhatsApp.
            <br />
            <br />
          </p>
          <a
            href="https://wa.me/5500000000000"
            className="wpp-btn"
            target="_blank"
          >
            Chamar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
