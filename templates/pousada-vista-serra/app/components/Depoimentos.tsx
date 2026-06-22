const REVIEWS = [
  {
    text: "Acordar com a neblina no vale e o cheiro de pão na lenha não tem preço. Voltamos renovados.",
    name: "Marina & Téo",
    sub: "Hospedaram-se em julho",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  },
  {
    text: "Atendimento impecável, do check-in ao café. O chalé Lareira superou todas as expectativas.",
    name: "Roberto Lima",
    sub: "Aniversário de casamento",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
  },
  {
    text: "Levamos a nossa cachorra e fomos super bem recebidos. Estrutura linda e muito silêncio.",
    name: "Camila Duarte",
    sub: "Fim de semana pet friendly",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
  },
];

export default function Depoimentos() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head center">
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            Hóspedes
          </span>
          <h2>Quem fica, volta</h2>
        </div>
        <div className="reviews-grid">
          {REVIEWS.map((r) => (
            <div className="review" key={r.name}>
              <div className="review-stars">★★★★★</div>
              <p>“{r.text}”</p>
              <div className="review-who">
                <img src={r.img} alt={r.name} />
                <div>
                  <strong>{r.name}</strong>
                  <span>{r.sub}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
