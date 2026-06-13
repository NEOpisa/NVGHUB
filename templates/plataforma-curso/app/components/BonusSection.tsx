import { bonuses } from "../data/bonuses";

export default function BonusSection() {
  return (
    <section className="bonus-section" style={{ padding: "6rem 2rem" }}>
      <div className="section-inner">
        <div className="section-label">Incluído na sua inscrição</div>
        <h2 className="section-title">
          Bônus que <em>amplificam</em> o resultado
        </h2>
        <div className="bonus-grid">
          {bonuses.map((b) => (
            <div className="bonus-card" key={b.title}>
              <h4>{b.title}</h4>
              <p>{b.description}</p>
              <div className="bonus-value">{b.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
