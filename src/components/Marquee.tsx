const DEFAULT_ITEMS = [
  "Sites",
  "Sistemas",
  "SEO",
  "Automação",
  "Suporte",
  "E-commerce",
  "Landing Pages",
  "SaaS",
];

function Row({ items }: { items: string[] }) {
  const sequence = [...items, ...items, ...items];
  return (
    <div className="marquee-row">
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

export default function Marquee({ items = DEFAULT_ITEMS }: { items?: string[] }) {
  return (
    <div className="marquee" aria-hidden="true">
      <Row items={items} />
    </div>
  );
}
