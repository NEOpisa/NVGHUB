export default function Reservar() {
  return (
    <section className="reservar" id="reservar">
      <div className="wrap">
        <span className="eyebrow" style={{ justifyContent: "center", color: "#cfe3d6" }}>
          Reservas abertas
        </span>
        <h2>Sua próxima fuga começa aqui</h2>
        <p>
          Consulte disponibilidade e garanta sua diária. Respondemos em minutos
          pelo WhatsApp, com as melhores condições para reserva direta.
        </p>
        <div className="reservar-actions">
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Reservar pelo WhatsApp
          </a>
          <a href="tel:+550000000000" className="btn btn-ghost">
            (00) 0000-0000
          </a>
        </div>
      </div>
    </section>
  );
}
