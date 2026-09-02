import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { HALF_OUTLINE, HALF_FACETS, bothHalves, wallPaths } from "@/lib/vShape";

/**
 * AS IMAGENS DE LINK (OG) — uma peça só, três variantes.
 *
 * A composição é a da OG que a casa já tinha e que funcionava: marca à
 * ESQUERDA, e à direita o logotipo grande como protagonista, com a promessa
 * abaixo dele. A versão anterior desta função tinha invertido isso — punha
 * uma manchete no lugar do logotipo e cercava tudo de moldura, cantoneiras
 * e barra no pé. Cartão de link não é painel de instrumentos: quem vê tem
 * dois segundos, e nesses dois segundos o que precisa entrar é o nome.
 *
 * A marca é sólida de verdade — parede lateral ligando a face da frente à
 * de trás — e agora com material: os degradês usam gradientUnits em espaço
 * de usuário, então a luz atravessa as duas metades como uma luz só. No
 * padrão (objectBoundingBox) cada metade recebe a sua própria rampa, e é
 * isso que fazia a peça parecer duas peças encostadas.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

type Variante = "site" | "parceria";

type Tema = {
  alt: string;
  /** o selo da divisão; vazio no site, que não precisa se apresentar */
  selo: string;
  promessa: string;
  rodape: string;
  /** acento da variante — metade do logotipo, selo e fio do topo */
  accent: string;
  /** halo atrás da marca */
  halo: string;
  /** lâmina cromada, do claro ao acento (4 paradas) */
  chrome: [string, string, string, string];
  /** esmalte de acento sobre a lâmina (3 paradas) */
  esmalte: [string, string, string];
  /** parede da extrusão: a que encara a luz e a que foge (2 paradas) */
  parede: [string, string];
  /** face de trás, chapada */
  fundo: string;
};

const TEMAS: Record<Variante, Tema> = {
  site: {
    alt: "Neovanguard OS — a máquina é sua, inclusive a identidade",
    selo: "",
    promessa: "A máquina é sua.\nInclusive a identidade.",
    rodape: "sistema operacional · arch linux · gpl-3.0",
    accent: "#6495ed",
    halo: "rgba(100, 149, 237, 0.20)",
    chrome: ["#ffffff", "#dbe5fc", "#9dbaf5", "#6495ed"],
    esmalte: ["#4f7ce8", "#2b54e3", "#0000cd"],
    parede: ["#5f80c9", "#1d2a4d"],
    fundo: "#111b3d",
  },
  parceria: {
    alt: "Neovanguard — seja nosso parceiro ou parceira",
    selo: "trabalhar junto",
    promessa: "Seja nosso parceiro\nou parceira.",
    rodape: "escopo fechado · suporte incluso",
    accent: "#f4b74a",
    halo: "rgba(244, 183, 74, 0.16)",
    chrome: ["#fff8e8", "#ffe9c2", "#f0c877", "#d99a2e"],
    esmalte: ["#d9a848", "#b87d1e", "#7a4f0c"],
    parede: ["#c9a256", "#4a3510"],
    fundo: "#2b1e08",
  },
};

const INK = "#06070b";
const TX = "#eef1f7";
const TX_2 = "#aeb7c9";
const TX_3 = "rgba(152, 162, 184, 0.82)";
const GRADE = "rgba(214, 226, 251, 0.05)";

/* deslocamento da face de trás — a espessura da chapa */
const DX = 15;
const DY = 12;

/** ponta a ponta da malha, para os degradês em espaço de usuário */
const LUZ = { x1: 300, y1: 300, x2: 1000, y2: 850 };

/**
 * A marca em sólido. A ordem importa: parede, face de trás, face da frente,
 * esmalte. As paredes que ficariam escondidas num sólido de verdade acabam
 * cobertas pelas faces, então não é preciso decidir quais arestas formam a
 * silhueta.
 */
function VMark({ t }: { t: Tema }) {
  const paredes = [false, true].flatMap((mirror) =>
    wallPaths(HALF_OUTLINE, { dx: DX, dy: DY, mirror }),
  );

  return (
    <svg width={424} height={312} viewBox="260 290 760 560">
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

export function ogAlt(v: Variante) {
  return TEMAS[v].alt;
}

export async function renderOg(v: Variante) {
  const t = TEMAS[v];
  const dir = join(process.cwd(), "src/app/og-assets");
  const [g600, g400, plex] = await Promise.all([
    readFile(join(dir, "grotesk-600.ttf")),
    readFile(join(dir, "grotesk-400.ttf")),
    readFile(join(dir, "plexmono-500.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          alignItems: "center",
          backgroundColor: INK,
          fontFamily: "Grotesk",
        }}
      >
        {/* grade fina: estrutura de fundo, não decoração */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            display: "flex",
            backgroundImage: `linear-gradient(to right, ${GRADE} 1px, transparent 1px), linear-gradient(to bottom, ${GRADE} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* halo atrás da marca — separa a peça do preto sem virar brilho */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            display: "flex",
            backgroundImage: `radial-gradient(circle at 26% 50%, ${t.halo}, transparent 46%)`,
          }}
        />
        {/* fio da variante no topo: a única cor que toca a borda */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: 6,
            display: "flex",
            backgroundImage: `linear-gradient(to right, ${t.accent}, ${t.accent} 46%, transparent)`,
          }}
        />

        {/* a marca */}
        <div
          style={{
            width: 560,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <VMark t={t} />
        </div>

        {/* logotipo, promessa, assinatura */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            paddingRight: 84,
          }}
        >
          {t.selo ? (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                marginBottom: 22,
                padding: "7px 15px",
                border: `1px solid ${t.accent}`,
                borderRadius: 999,
                fontFamily: "Mono",
                fontSize: 14,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: t.accent,
              }}
            >
              {t.selo}
            </div>
          ) : null}

          <div
            style={{
              display: "flex",
              fontFamily: "Mono",
              fontSize: 58,
              fontWeight: 500,
              letterSpacing: 6,
              color: TX,
            }}
          >
            NEO
            <span style={{ color: t.accent }}>VANGUARD</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 26,
              fontSize: 27,
              fontWeight: 400,
              lineHeight: 1.38,
              color: TX_2,
            }}
          >
            {t.promessa.split("\n").map((linha) => (
              <span key={linha}>{linha}</span>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 34,
              fontFamily: "Mono",
              fontSize: 15,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: TX_3,
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: 30,
                height: 1,
                marginRight: 16,
                backgroundColor: t.accent,
              }}
            />
            {t.rodape}
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Grotesk", data: g600, weight: 600, style: "normal" },
        { name: "Grotesk", data: g400, weight: 400, style: "normal" },
        { name: "Mono", data: plex, weight: 500, style: "normal" },
      ],
    },
  );
}
