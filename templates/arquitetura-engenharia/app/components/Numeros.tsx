import Reveal from "./Reveal";

const nums = [
  { b: "320 mil", s: "m² projetados" },
  { b: "320+", s: "obras entregues" },
  { b: "48 anos", s: "de escritório" },
  { b: "48", s: "prêmios & publicações" },
];

export default function Numeros() {
  return (
    <section className="numeros" id="numeros">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow" style={{ marginBottom: "8px" }}>
            Em números
          </p>
        </Reveal>
        <Reveal as="div" className="num-grid">
          {nums.map((n) => (
            <div className="num" key={n.s}>
              <b>{n.b}</b>
              <span>{n.s}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
