import { LOGO_B64 } from "@/lib/logo";

const HUB = { x: 260, y: 260, r: 42 };
const NODE_R = 16;
const LOGO_R = (HUB.r - 9) * 2;

const NODES = [
  { x: 260, y: 92,  label: "Sites",     anchor: "middle" as const, lx: 260, ly: 56  },
  { x: 420, y: 208, label: "Sistemas",  anchor: "start"  as const, lx: 450, ly: 214 },
  { x: 359, y: 396, label: "SEO",       anchor: "middle" as const, lx: 359, ly: 433 },
  { x: 161, y: 396, label: "Suporte",   anchor: "middle" as const, lx: 161, ly: 433 },
  { x: 100, y: 208, label: "Automação", anchor: "end"    as const, lx: 70,  ly: 214 },
];

export default function EcosystemGraphic() {
  return (
    <svg
      viewBox="0 0 520 520"
      className="ecosystem-graphic"
      role="img"
      aria-label="Diagrama mostrando a NEOVANGUARD como centro que conecta sites, sistemas, SEO, suporte e automação"
    >
      <defs>
        <radialGradient id="eco-hub-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(167,139,250,0.55)" />
          <stop offset="55%" stopColor="rgba(124,58,237,0.16)" />
          <stop offset="100%" stopColor="rgba(124,58,237,0)" />
        </radialGradient>
        <filter id="eco-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="eco-hub-clip">
          <circle cx={HUB.x} cy={HUB.y} r={LOGO_R} />
        </clipPath>
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
        <circle cx={HUB.x} cy={HUB.y} r={HUB.r} className="eco-ripple" style={{ animationDelay: "0s" }} />
        <circle cx={HUB.x} cy={HUB.y} r={HUB.r} className="eco-ripple" style={{ animationDelay: "-2.6s" }} />
        <circle cx={HUB.x} cy={HUB.y} r={HUB.r} className="eco-ripple" style={{ animationDelay: "-5.2s" }} />
      </g>

      {/* satellite nodes */}
      {NODES.map((n, i) => (
        <g key={`node-${i}`} className="eco-node" style={{ animationDelay: `${i * -1.1}s` }}>
          <circle cx={n.x} cy={n.y} r={NODE_R} className="eco-node-ring" />
          <circle cx={n.x} cy={n.y} r="5.5" className="eco-node-core" filter="url(#eco-glow)" />
          <text x={n.lx} y={n.ly} textAnchor={n.anchor} className="eco-label">
            {n.label}
          </text>
        </g>
      ))}

      {/* central hub — the NEOVANGUARD mark, the point everything connects to */}
      <circle cx={HUB.x} cy={HUB.y} r={HUB.r + 30} fill="url(#eco-hub-glow)" className="eco-hub-halo" />
      <image
        href={LOGO_B64}
        x={HUB.x - LOGO_R}
        y={HUB.y - LOGO_R}
        width={LOGO_R * 2}
        height={LOGO_R * 2}
        clipPath="url(#eco-hub-clip)"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  );
}
