import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * OG image no design "Blueprint Obsidian" — gerado pelo next/og com as
 * mesmas fontes do site (Space Grotesk + IBM Plex Mono, TTFs locais em
 * og-assets) e a marca NV desenhada como blueprint: contorno frontal em
 * traço de luz, contorno traseiro deslocado e conectores de profundidade.
 */

export const runtime = "nodejs";
export const alt =
  "Neovanguard — ecossistemas digitais que impulsionam o crescimento";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// mesma malha 2D da logo 3D (logoGeometry), sem importar three
const WHITE: [number, number][] = [
  [48, 25], [86, 44], [168, 93], [194, 143], [94, 78],
  [94, 144], [155, 216], [138, 206], [71, 151], [70, 48],
];
const PURPLE: [number, number][] = [
  [287, 27], [202, 219], [153, 175], [110, 116], [190, 169],
];
const pts = (arr: [number, number][]) =>
  arr.map((p) => p.join(",")).join(" ");
// deslocamento do contorno traseiro (profundidade do blueprint)
const DX = 13;
const DY = -10;

const monoStyle = {
  fontFamily: "Mono",
  fontSize: 15,
  letterSpacing: 4,
  textTransform: "uppercase" as const,
  color: "rgba(200, 190, 255, 0.55)",
};

export default async function OgImage() {
  const dir = join(process.cwd(), "src/app/og-assets");
  const [g600, g400, mono] = await Promise.all([
    readFile(join(dir, "grotesk-600.ttf")),
    readFile(join(dir, "grotesk-400.ttf")),
    readFile(join(dir, "plexmono-500.ttf")),
  ]);

  const tick = (pos: Record<string, number>) => {
    const style: Record<string, string | number> = {
      position: "absolute",
      width: 22,
      height: 22,
      display: "flex",
      ...pos,
    };
    if ("top" in pos) style.borderTop = "3px solid #6c5cff";
    if ("bottom" in pos) style.borderBottom = "3px solid #6c5cff";
    if ("left" in pos) style.borderLeft = "3px solid #6c5cff";
    if ("right" in pos) style.borderRight = "3px solid #6c5cff";
    return <div style={style} />;
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#000000",
          fontFamily: "Grotesk",
        }}
      >
        {/* grade blueprint */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(157, 140, 255,0.07) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage:
              "linear-gradient(to bottom, rgba(157, 140, 255,0.07) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            display: "flex",
          }}
        />
        {/* nebulosa violeta */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 18% 8%, rgba(108, 92, 255,0.30), transparent 55%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 88% 92%, rgba(90, 69, 240,0.22), transparent 50%)",
            display: "flex",
          }}
        />

        {/* moldura HUD + cantoneiras */}
        <div
          style={{
            position: "absolute",
            top: 26, left: 26, right: 26, bottom: 26,
            border: "1px solid rgba(200,190,255,0.18)",
            display: "flex",
          }}
        />
        {tick({ top: 26, left: 26 })}
        {tick({ top: 26, right: 26 })}
        {tick({ bottom: 26, left: 26 })}
        {tick({ bottom: 26, right: 26 })}

        {/* coluna de texto */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 660,
            paddingLeft: 88,
          }}
        >
          <div style={{ ...monoStyle, display: "flex" }}>
            <span style={{ color: "#6c5cff", marginRight: 10 }}>{"//"}</span>
            ecossistema digital
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 58,
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: -2,
              color: "#f0f0f0",
              marginTop: 22,
            }}
          >
            Ecossistemas digitais que impulsionam o&nbsp;
            <span style={{ color: "#9d8cff" }}>crescimento da sua empresa</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 34,
              fontFamily: "Mono",
              fontSize: 17,
              letterSpacing: 5,
              color: "#f0f0f0",
            }}
          >
            NEO
            <span style={{ color: "#6c5cff" }}>VANGUARD</span>
            <span
              style={{
                width: 44,
                height: 1,
                backgroundColor: "rgba(157, 140, 255,0.5)",
                margin: "0 16px",
              }}
            />
            <span style={{ fontSize: 14, color: "rgba(200,190,255,0.55)" }}>
              ferramentas para negócios · brasil
            </span>
          </div>
        </div>

        {/* marca NV em blueprint (frente + trás + conectores) */}
        <svg
          width={440}
          height={340}
          viewBox="0 0 330 250"
          style={{ position: "absolute", right: 64, top: 145 }}
        >
          {/* contorno traseiro (profundidade) */}
          <g
            opacity={0.38}
            stroke="#6c5cff"
            fill="none"
            strokeWidth={1.4}
            transform={`translate(${DX} ${DY})`}
          >
            <polygon points={pts(WHITE)} />
            <polygon points={pts(PURPLE)} />
          </g>
          {/* conectores frente↔trás */}
          <g stroke="#6c5cff" opacity={0.32} strokeWidth={1}>
            {[...WHITE, ...PURPLE].map(([x, y], i) => (
              <line key={i} x1={x} y1={y} x2={x + DX} y2={y + DY} />
            ))}
          </g>
          {/* contornos frontais em traço de luz */}
          <polygon
            points={pts(WHITE)}
            fill="none"
            stroke="#e6e9f6"
            strokeWidth={2.2}
          />
          <polygon
            points={pts(PURPLE)}
            fill="none"
            stroke="#9d8cff"
            strokeWidth={2.2}
          />
          {/* nós dos vértices */}
          <g fill="#e6e9f6">
            {WHITE.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={2.4} />
            ))}
          </g>
          <g fill="#9d8cff">
            {PURPLE.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={2.4} />
            ))}
          </g>
          {/* crosshair de medição */}
          <g stroke="rgba(207,200,240,0.7)" strokeWidth={1}>
            <line x1={287} y1={12} x2={287} y2={42} />
            <line x1={272} y1={27} x2={302} y2={27} />
          </g>
        </svg>

        {/* callout mono do blueprint */}
        <div
          style={{
            ...monoStyle,
            position: "absolute",
            right: 84,
            top: 118,
            fontSize: 13,
            color: "rgba(207,200,240,0.8)",
            display: "flex",
          }}
        >
          MAT {">"} 100%
        </div>

        {/* rodapé HUD */}
        <div
          style={{
            ...monoStyle,
            position: "absolute",
            left: 88,
            bottom: 44,
            fontSize: 13,
            display: "flex",
          }}
        >
          <span style={{ color: "#6c5cff", marginRight: 10 }}>{"//"}</span>
          blueprint obsidian
        </div>
        <div
          style={{
            ...monoStyle,
            position: "absolute",
            right: 88,
            bottom: 44,
            fontSize: 13,
            color: "#f8b1ec",
            display: "flex",
          }}
        >
          neovanguard.com.br
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Grotesk", data: g600, weight: 600, style: "normal" },
        { name: "Grotesk", data: g400, weight: 400, style: "normal" },
        { name: "Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
