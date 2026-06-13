const itens = [
  "Sem taxa de marketplace",
  "Cashback 5% em todo pedido",
  "Entrega média 38 min",
  "Fogo de lenha todo dia",
  "-10% no primeiro pedido",
];

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...itens, ...itens].map((item, idx) => (
          <span key={idx}>{item}</span>
        ))}
      </div>
    </div>
  );
}
