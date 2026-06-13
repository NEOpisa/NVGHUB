const itens = [
  "Entrega em até 50 min",
  "Ingredientes artesanais",
  "Pix ou cartão",
  "Primeira entrega: 10% off",
  "Confirmação via WhatsApp",
];

export default function Strip() {
  return (
    <div className="strip" aria-hidden="true">
      <div className="strip-track">
        {[...itens, ...itens].map((item, idx) => (
          <div className="strip-item" key={idx}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
