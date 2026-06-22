const REVS = [
  { text: "Resolveram um barulho na suspensão que duas oficinas não acharam. Orçamento justo e no prazo.", name: "André Souza", sub: "Civic 2018" },
  { text: "Atendimento honesto. Me explicaram tudo e só fizeram o necessário. Virei cliente fixo.", name: "Patrícia Gomes", sub: "Onix 2020" },
  { text: "Levei com a luz da injeção acesa, saiu no mesmo dia com diagnóstico certeiro. Recomendo.", name: "Marcos Vieira", sub: "Hilux 2017" },
];

export default function Depoimentos() {
  return (
    <section className="section diff" id="depoimentos">
      <div className="wrap">
        <div className="section-head center">
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            Quem confia
          </span>
          <h2>Clientes que voltam</h2>
        </div>
        <div className="rev-grid">
          {REVS.map((r) => (
            <div className="rev" key={r.name}>
              <div className="rev-stars">★★★★★</div>
              <p>“{r.text}”</p>
              <div className="rev-who">
                <strong>{r.name}</strong>
                <span>{r.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
