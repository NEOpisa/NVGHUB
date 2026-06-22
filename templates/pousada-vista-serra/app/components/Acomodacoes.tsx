const ROOMS = [
  {
    tag: "Mais procurado",
    name: "Chalé Vale",
    desc: "Suíte com varanda privativa, hidromassagem e vista aberta para o vale.",
    price: "690",
    img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&q=80",
  },
  {
    tag: "Romântico",
    name: "Chalé Lareira",
    desc: "Aconchego com lareira a lenha, banheira e cama king — perfeito para casais.",
    price: "780",
    img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&q=80",
  },
  {
    tag: "Família",
    name: "Chalé Bosque",
    desc: "Dois quartos, cozinha equipada e deck cercado pela mata. Ideal para grupos.",
    price: "920",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80",
  },
];

export default function Acomodacoes() {
  return (
    <section className="section" id="acomodacoes">
      <div className="wrap">
        <div className="section-head center">
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            Acomodações
          </span>
          <h2>Escolha o seu refúgio</h2>
          <p>
            Oito chalés independentes, cada um com sua personalidade — todos com
            vista, roupa de cama premium e silêncio garantido.
          </p>
        </div>
        <div className="rooms-grid">
          {ROOMS.map((r) => (
            <article className="room" key={r.name}>
              <div className="room-img">
                <img src={r.img} alt={r.name} />
                <span className="room-tag">{r.tag}</span>
              </div>
              <div className="room-body">
                <h3>{r.name}</h3>
                <p>{r.desc}</p>
                <div className="room-foot">
                  <div className="room-price">
                    <strong>R$ {r.price}</strong> <span>/ diária</span>
                  </div>
                  <a href="#reservar">Reservar →</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
