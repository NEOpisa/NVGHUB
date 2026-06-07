const NODES = [
  { x: 240, y: 72,  label: "Sites",     anchor: "middle" as const, lx: 240, ly: 46  },
  { x: 400, y: 188, label: "Sistemas",  anchor: "start"  as const, lx: 418, ly: 192 },
  { x: 339, y: 376, label: "SEO",       anchor: "middle" as const, lx: 339, ly: 404 },
  { x: 141, y: 376, label: "Suporte",   anchor: "middle" as const, lx: 141, ly: 404 },
  { x: 80,  y: 188, label: "Automação", anchor: "end"    as const, lx: 62,  ly: 192 },
];

const HUB = { x: 240, y: 240 };

export default function EcosystemGraphic() {
  return (
    <svg
      viewBox="0 0 480 480"
      className="ecosystem-graphic"
      role="img"
      aria-label="Diagrama mostrando a NEOVANGUARD como centro que conecta sites, sistemas, SEO, suporte e automação"
    >
      <defs>
        <radialGradient id="eco-hub-fill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="55%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#5b21b6" />
        </radialGradient>
        <filter id="eco-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* connection lines */}
      <g className="eco-lines">
        {NODES.map((n, i) => (
          <line
            key={`line-${i}`}
            x1={HUB.x} y1={HUB.y} x2={n.x} y2={n.y}
            className="eco-line"
            style={{ animationDelay: `${i * -1.6}s` }}
          />
        ))}
      </g>

      {/* hub ripples */}
      <g className="eco-hub-ripples">
        <circle cx={HUB.x} cy={HUB.y} r="40" className="eco-ripple" style={{ animationDelay: "0s" }} />
        <circle cx={HUB.x} cy={HUB.y} r="40" className="eco-ripple" style={{ animationDelay: "-2.6s" }} />
        <circle cx={HUB.x} cy={HUB.y} r="40" className="eco-ripple" style={{ animationDelay: "-5.2s" }} />
      </g>

      {/* satellite nodes */}
      {NODES.map((n, i) => (
        <g key={`node-${i}`} className="eco-node" style={{ animationDelay: `${i * -1.1}s` }}>
          <circle cx={n.x} cy={n.y} r="15" className="eco-node-ring" />
          <circle cx={n.x} cy={n.y} r="5.5" className="eco-node-core" filter="url(#eco-glow)" />
          <text x={n.lx} y={n.ly} textAnchor={n.anchor} className="eco-label">
            {n.label}
          </text>
        </g>
      ))}

      {/* central hub */}
      <circle cx={HUB.x} cy={HUB.y} r="34" className="eco-hub-core" fill="url(#eco-hub-fill)" filter="url(#eco-glow)" />
      <circle cx={HUB.x} cy={HUB.y} r="34" className="eco-hub-ring" />
      <text x={HUB.x} y={HUB.y + 4} textAnchor="middle" className="eco-hub-label">NVG</text>
    </svg>
  );
}
