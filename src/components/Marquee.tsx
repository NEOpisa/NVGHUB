const ITEMS = [
  "Sites",
  "Sistemas",
  "SEO",
  "Automação",
  "Suporte",
  "E-commerce",
  "Landing Pages",
  "SaaS",
];

function Row({ reverse = false }: { reverse?: boolean }) {
  const sequence = [...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <div className={`marquee-row${reverse ? " marquee-row--reverse" : ""}`}>
      <div className="marquee-track">
        {sequence.map((item, i) => (
          <span className="marquee-item" key={`${item}-${i}`}>
            {item}
            <span className="marquee-sep" aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <Row />
    </div>
  );
}
