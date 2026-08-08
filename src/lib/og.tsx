import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { HALF_OUTLINE, HALF_FACETS, bothHalves, wallPaths } from "@/lib/vShape";

/**
 * AS IMAGENS DE LINK (OG) — uma peça só, três variantes.
 *
 * O símbolo aqui é o V da marca nova; o brasão roxo com escudo e lâmina saiu
 * de cena. Profundidade sem degradê nenhum: a lâmina vira sólido com face
 * de trás e paredes laterais em dois tons — a mesma anatomia da extrusão do
 * 3D da home, congelada num ângulo.
 *
 * Variantes: `site` (cornflower), `ouro` (a divisão principal) e `platina`
 * (a divisão sem vitrine, que não tem página própria mas precisa de imagem
 * quando alguém compartilha ou anuncia a porta).
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

type Variante = "site" | "ouro" | "platina";

type Tema = {
  alt: string;
  kicker: string;
  titulo: string;
  destaque: string;
  rodape: string;
  /** cor de acento da variante — rótulos, cantoneiras e a barra do pé */
  accent: string;
  /** lâmina cromada */
  corpo: string;
  /** esmalte de acento sobre a lâmina */
  esmalte: string;
  /** a face de trás da extrusão */
  sombra: string;
  /** parede lateral que encara a luz */
  paredeClara: string;
  /** parede lateral que foge dela */
  paredeEscura: string;
};

const TEMAS: Record<Variante, Tema> = {
  site: {
    alt: "Neovanguard — a ferramenta certa para o seu problema",
    kicker: "estúdio de tecnologia · desde 2023",
    titulo: "A ferramenta certa",
    destaque: "para o seu problema.",
    rodape: "sistemas · automações · ia aplicada",
    accent: "#6495ed",
    corpo: "#d6e2fb",
    esmalte: "#2b54e3",
    sombra: "#101a38",
    paredeClara: "#5f80c9",
    paredeEscura: "#26365e",
  },
  ouro: {
    alt: "Neovanguard Ouro — a ferramenta do seu negócio no ar em até 16 dias",
    kicker: "divisão ouro · produto principal",
    titulo: "A ferramenta do seu negócio",
    destaque: "no ar em até 16 dias.",
    rodape: "escopo fechado · suporte incluso · sem contrato mínimo",
    accent: "#f4b74a",
    corpo: "#ffe9c2",
    esmalte: "#d99a2e",
    sombra: "#33230a",
    paredeClara: "#c9a256",
    paredeEscura: "#5e4413",
  },
  platina: {
    alt: "Neovanguard Platina — parceria completa para poucas operações por vez",
    kicker: "divisão platina · vagas limitadas",
    titulo: "Parceria completa,",
    destaque: "para poucas operações por vez.",
    rodape: "candidatura · análise · retorno em até 48h",
    accent: "#cfd6e6",
    corpo: "#eef1f7",
    esmalte: "#8f9bb3",
    sombra: "#232833",
    paredeClara: "#9aa4b8",
    paredeEscura: "#454d5e",
  },
};

const INK = "#06070b";
const LINHA = "rgba(214, 226, 251, 0.055)";
const TX_3 = "rgba(152, 162, 184, 0.9)";

/* deslocamento da cópia de trás — a "espessura" da chapa */
const DX = 16;
const DY = 12;

const mono = {
  fontFamily: "Mono",
  fontSize: 15,
  letterSpacing: 4,
  textTransform: "uppercase" as const,
  color: TX_3,
};

/**
 * A marca em sólido: paredes da extrusão, face de trás, face da frente e o
 * esmalte cravado por cima. A parede é o que separa isto de um vulto
 * deslocado — sem ela, a cópia atrás lê como sombra projetada, não como
 * espessura.
 */
function VMark({ t }: { t: Tema }) {
  const paredes = [false, true].flatMap((mirror) =>
    wallPaths(HALF_OUTLINE, { dx: DX, dy: DY, mirror }),
  );

  return (
    <svg width={452} height={333} viewBox="260 290 760 560">
      {paredes.map((p, i) => (
        <path
          key={`w${i}`}
          d={p.d}
          fill={p.tom > 0.5 ? t.paredeClara : t.paredeEscura}
        />
      ))}
      {bothHalves(HALF_OUTLINE, { dx: DX, dy: DY }).map((d, i) => (
        <path key={`s${i}`} d={d} fill={t.sombra} />
      ))}
      {bothHalves(HALF_OUTLINE).map((d, i) => (
        <path key={`b${i}`} d={d} fill={t.corpo} />
      ))}
      {HALF_FACETS.flatMap((f, i) =>
        bothHalves(f).map((d, j) => (
          <path key={`f${i}-${j}`} d={d} fill={t.esmalte} />
        )),
      )}
    </svg>
  );
}

function tick(pos: Record<string, number>, cor: string) {
  const style: Record<string, string | number> = {
    position: "absolute",
    width: 22,
    height: 22,
    display: "flex",
    ...pos,
  };
  if ("top" in pos) style.borderTop = `3px solid ${cor}`;
  if ("bottom" in pos) style.borderBottom = `3px solid ${cor}`;
  if ("left" in pos) style.borderLeft = `3px solid ${cor}`;
  if ("right" in pos) style.borderRight = `3px solid ${cor}`;
  return <div style={style} />;
}

/** grade fina do fundo — estrutura, não degradê */
function grade(dir: "right" | "bottom") {
  return (
    <div
      style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        display: "flex",
        backgroundImage: `linear-gradient(to ${dir}, ${LINHA} 1px, transparent 1px)`,
        backgroundSize: "72px 72px",
      }}
    />
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
          backgroundColor: INK,
          fontFamily: "Grotesk",
        }}
      >
        {grade("right")}
        {grade("bottom")}

        {/* moldura e cantoneiras */}
        <div
          style={{
            position: "absolute",
            top: 26, left: 26, right: 26, bottom: 26,
            border: "1px solid rgba(214,226,251,0.14)",
            display: "flex",
          }}
        />
        {tick({ top: 26, left: 26 }, t.accent)}
        {tick({ top: 26, right: 26 }, t.accent)}
        {tick({ bottom: 26, left: 26 }, t.accent)}
        {tick({ bottom: 26, right: 26 }, t.accent)}

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
          <div style={{ ...mono, display: "flex" }}>
            <span style={{ color: t.accent, marginRight: 10 }}>{"//"}</span>
            {t.kicker}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 56,
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: -2,
              color: "#eef1f7",
              marginTop: 22,
            }}
          >
            <span>{t.titulo}</span>
            <span style={{ color: t.accent }}>{t.destaque}</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 36,
              fontFamily: "Mono",
              fontSize: 17,
              letterSpacing: 5,
              color: "#eef1f7",
            }}
          >
            NEO
            <span style={{ color: t.accent }}>VANGUARD</span>
            <span
              style={{
                width: 44,
                height: 1,
                backgroundColor: "rgba(214,226,251,0.4)",
                margin: "0 16px",
              }}
            />
            <span style={{ fontSize: 14, color: TX_3 }}>neovanguard.com.br</span>
          </div>
        </div>

        {/* a marca */}
        <div
          style={{
            position: "absolute",
            right: 68,
            top: 149,
            display: "flex",
          }}
        >
          <VMark t={t} />
        </div>

        {/* rodapé e barra da variante */}
        <div
          style={{
            ...mono,
            position: "absolute",
            left: 88,
            bottom: 52,
            fontSize: 13,
            display: "flex",
          }}
        >
          <span style={{ color: t.accent, marginRight: 10 }}>{"//"}</span>
          {t.rodape}
        </div>
        <div
          style={{
            position: "absolute",
            left: 26,
            right: 26,
            bottom: 26,
            height: 5,
            backgroundColor: t.accent,
            display: "flex",
          }}
        />
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
