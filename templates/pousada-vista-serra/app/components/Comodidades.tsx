const AMEN = [
  { icon: "🍳", title: "Café artesanal", desc: "Pães na lenha, geleias caseiras e frutas da estação servidos até as 11h." },
  { icon: "💆", title: "Spa & sauna", desc: "Massagens com agendamento, sauna seca e ofurô aquecido ao ar livre." },
  { icon: "🥾", title: "Trilhas guiadas", desc: "Cachoeiras e mirantes a poucos minutos, com guia local sob reserva." },
  { icon: "🔥", title: "Fogueira & vinho", desc: "Toda noite acendemos a fogueira central com carta de vinhos e queijos." },
];

export default function Comodidades() {
  return (
    <section className="section amen" id="comodidades">
      <div className="wrap">
        <div className="section-head center">
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            Experiências
          </span>
          <h2>Mais que uma hospedagem</h2>
          <p>Cada detalhe pensado para que você só precise relaxar e aproveitar.</p>
        </div>
        <div className="amen-grid">
          {AMEN.map((a) => (
            <div className="amen-card" key={a.title}>
              <span className="amen-icon">{a.icon}</span>
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
