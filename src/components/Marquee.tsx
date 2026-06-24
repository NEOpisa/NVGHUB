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
            <span className="marquee-sep" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Marquee CSS puro (animação no compositor, zero JS por frame). O `reverse`
 * só inverte a direção via classe — sem ticker/gsap, pra não custar FPS.
 */
export default function Marquee({
  items = DEFAULT_ITEMS,
  reverse = false,
}: {
  items?: string[];
  reverse?: boolean;
}) {
  return (
    <div className={`marquee${reverse ? " marquee--reverse" : ""}`} aria-hidden="true">
      <Row items={items} />
    </div>
  );
}
