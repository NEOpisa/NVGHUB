import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { HALF_OUTLINE, HALF_FACETS, bothHalves, wallPaths } from "@/lib/vShape";
import { VERSAO } from "@/lib/constants";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

type Tema = {
  chrome: string[];
  esmalte: string[];
  parede: string[];
  fundo: string;
};
const THEME: Tema = {
  chrome: ["#edf3ff", "#d0e0fc", "#a2c1f5", "#6495ED"],
  esmalte: ["#86adf3", "#6495ED", "#3d65a8"],
  parede: ["#547fbf", "#1b304e"],
  fundo: "#101c2e",
};
const DX = 15;
const DY = 12;
const LUZ = { x1: 300, y1: 300, x2: 1000, y2: 850 };

function VMark({ t }: { t: Tema }) {
  const paredes = [false, true].flatMap((mirror) =>
    wallPaths(HALF_OUTLINE, { dx: DX, dy: DY, mirror }),
  );

  return (
    <svg width={320} height={236} viewBox="260 290 760 560">
      <defs>
        <linearGradient id="og-chrome" gradientUnits="userSpaceOnUse" {...LUZ}>
          <stop offset="0" stopColor={t.chrome[0]} />
          <stop offset="0.36" stopColor={t.chrome[1]} />
          <stop offset="0.72" stopColor={t.chrome[2]} />
          <stop offset="1" stopColor={t.chrome[3]} />
        </linearGradient>
        <linearGradient id="og-esmalte" gradientUnits="userSpaceOnUse" {...LUZ}>
          <stop offset="0" stopColor={t.esmalte[0]} />
          <stop offset="0.5" stopColor={t.esmalte[1]} />
          <stop offset="1" stopColor={t.esmalte[2]} />
        </linearGradient>
        <linearGradient id="og-parede" gradientUnits="userSpaceOnUse" {...LUZ}>
          <stop offset="0" stopColor={t.parede[0]} />
          <stop offset="1" stopColor={t.parede[1]} />
        </linearGradient>
      </defs>

      {paredes.map((p, i) => (
        <path key={`w${i}`} d={p.d} fill="url(#og-parede)" opacity={0.45 + p.tom * 0.55} />
      ))}
      {bothHalves(HALF_OUTLINE, { dx: DX, dy: DY }).map((d, i) => (
        <path key={`s${i}`} d={d} fill={t.fundo} />
      ))}
      {bothHalves(HALF_OUTLINE).map((d, i) => (
        <path key={`b${i}`} d={d} fill="url(#og-chrome)" />
      ))}
      {HALF_FACETS.flatMap((f, i) =>
        bothHalves(f).map((d, j) => (
          <path key={`f${i}-${j}`} d={d} fill="url(#og-esmalte)" />
        )),
      )}
      {/* fio de luz nas duas arestas do topo: a quina que pega a chave */}
      <g stroke="#ffffff" strokeOpacity={0.38} strokeWidth={3} fill="none" strokeLinecap="round">
        <path d="M492 306 L278 369" />
        <path d="M788 306 L1002 369" />
      </g>
    </svg>
  );
}

export function ogAlt() {
  return "Neovanguard OS — A máquina é sua. Sua identidade também. Arch Linux, KDE Plasma e código aberto.";
}

/** The social card shares the site's dark frame and cornflower palette.
 * Local fonts and vector geometry keep builds independent of remote assets. */
export async function renderOg() {
  const dir = join(process.cwd(), "src/app/og-assets");
  const [semibold, regular, mono] = await Promise.all([
    readFile(join(dir, "grotesk-600.ttf")),
    readFile(join(dir, "grotesk-400.ttf")),
    readFile(join(dir, "plexmono-500.ttf")),
  ]);
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", padding: 24, background: "#060b13", fontFamily: "Grotesk", color: "#edf3ff" }}>
      <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", flexDirection: "column", border: "1px solid #354e70", borderRadius: 24, background: "#0c1422", padding: "34px 42px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 26, borderBottom: "1px solid #213149" }}>
          <div style={{ display: "flex", fontSize: 30, fontWeight: 600, letterSpacing: -1 }}>neovanguard<span style={{ color: "#6495ED" }}>.</span></div>
          <span style={{ fontFamily: "Mono", fontSize: 15, color: "#a9b8d0" }}>NEOVANGUARD OS / {VERSAO}</span>
        </div>
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "space-between", gap: 32 }}>
          <div style={{ display: "flex", flexDirection: "column", width: 640 }}>
            <span style={{ color: "#6495ED", fontFamily: "Mono", fontSize: 14, letterSpacing: 2, marginBottom: 22 }}>SEU SISTEMA. SUAS ESCOLHAS.</span>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 56, fontWeight: 600, lineHeight: 1.13, letterSpacing: -2 }}>
              <span>A máquina é sua.</span>
              <span style={{ color: "#a2c1f5" }}>Sua identidade também.</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 348, height: 310, flexShrink: 0, borderRadius: 18, border: "1px solid #354e70", backgroundImage: "radial-gradient(ellipse at 50% 40%, #233e65, #101c2e)" }}>
            <VMark t={THEME} />
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #213149", paddingTop: 24, fontSize: 17, color: "#a9b8d0" }}>
          <span>Arch Linux · KDE Plasma · Código aberto</span>
          <span style={{ color: "#6495ED" }}>neovanguard.com.br</span>
        </div>
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        { name: "Grotesk", data: semibold, weight: 600, style: "normal" },
        { name: "Grotesk", data: regular, weight: 400, style: "normal" },
        { name: "Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
