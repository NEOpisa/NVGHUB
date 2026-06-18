"use client";

import { useMemo, useState } from "react";
import { site, cores, pecas, provador } from "../site.config";
import Reveal from "./Reveal";

/* ------------------------------------------------------------
   Geometria das roupas (o desenho de cada peça).
   Vive aqui porque é estrutura, não conteúdo — nome, preço e
   cor estão em site.config.ts. Coordenadas no viewBox 300×660,
   alinhadas ao manequim. `extras` são vincos (traços), `collar`
   e `lapels` são detalhes opcionais por peça.
   ------------------------------------------------------------ */
type Shape = { d: string; extras?: string[]; collar?: string; lapels?: string[] };

const SHAPES: Record<string, Shape> = {
  // ---- Tops ----
  blusa: {
    d: "M104,120 C100,150 100,205 108,250 C103,288 107,322 118,332 L182,332 C193,322 197,288 192,250 C200,205 200,150 196,120 C184,128 176,150 170,150 C162,168 138,168 130,150 C124,150 116,128 104,120 Z",
    extras: ["M124,250 C128,280 130,305 128,328", "M176,250 C172,280 170,305 172,328"],
  },
  trico: {
    d: "M106,122 C101,152 101,205 109,250 C104,286 108,320 119,330 L181,330 C192,320 196,286 191,250 C199,205 199,152 194,122 C182,130 174,140 168,140 C160,150 140,150 132,140 C126,140 118,130 106,122 Z",
    collar: "M137,90 C137,84 163,84 163,90 L163,120 C163,126 137,126 137,120 Z",
    extras: ["M120,250 L122,326", "M180,250 L178,326", "M150,150 L150,330"],
  },
  blazer: {
    d: "M100,118 C97,150 98,210 104,260 C100,300 104,338 116,346 L184,346 C196,338 200,300 196,260 C202,210 203,150 200,118 C186,126 176,150 170,150 L156,202 L150,252 L144,202 L130,150 C124,150 114,126 100,118 Z",
    lapels: ["M130,150 L150,252 L150,228 L139,182 Z", "M170,150 L150,252 L150,228 L161,182 Z"],
    extras: ["M118,260 L120,342", "M182,260 L180,342"],
  },
  // ---- Bottoms ----
  pantalona: {
    d: "M108,300 L192,300 L198,624 L158,624 C156,520 152,420 150,366 C148,420 144,520 142,624 L102,624 Z",
    extras: ["M129,312 L122,622", "M171,312 L178,622", "M108,312 L192,312"],
  },
  saia: {
    d: "M114,300 L186,300 L210,492 L90,492 Z",
    extras: [
      "M122,304 L112,490",
      "M137,304 L132,490",
      "M150,304 L150,490",
      "M163,304 L168,490",
      "M178,304 L188,490",
    ],
  },
  reta: {
    d: "M114,302 L186,302 L188,592 L158,592 C156,500 153,420 150,366 C147,420 144,500 142,592 L112,592 Z",
    extras: ["M132,314 L130,588", "M168,314 L170,588", "M114,314 L186,314"],
  },
  // ---- Vestidos ----
  slip: {
    d: "M120,126 L128,116 C140,150 160,150 172,116 L180,126 C186,210 182,380 196,560 L150,582 L104,560 C118,380 114,210 120,126 Z",
    lapels: ["M120,108 L128,108 L132,126 L124,124 Z", "M180,108 L172,108 L168,126 L176,124 Z"],
    extras: ["M150,150 C150,320 156,460 168,556", "M150,150 C150,320 144,460 132,556"],
  },
  tubinho: {
    d: "M110,124 C106,152 108,200 116,240 C110,300 114,400 120,470 L180,470 C186,400 190,300 184,240 C192,200 194,152 190,124 C178,132 172,150 166,150 C158,160 142,160 134,150 C128,150 122,132 110,124 Z",
    extras: ["M126,240 L130,466", "M174,240 L170,466"],
  },
};

const FORM = "#D8CDBC"; // manequim — greige morno
const corByKey = (k: string) => cores.find((c) => c.key === k)!;
const pecaById = (id: string) => pecas.find((p) => p.id === id)!;
const brl = (n: number) => `R$ ${n.toLocaleString("pt-BR")}`;

const tops = pecas.filter((p) => p.tipo === "top");
const bottoms = pecas.filter((p) => p.tipo === "bottom");
const vestidos = pecas.filter((p) => p.tipo === "vestido");

function Garment({ id, corKey }: { id: string; corKey: string }) {
  const s = SHAPES[id];
  const hex = corByKey(corKey).hex;
  if (!s) return null;
  return (
    <g className="garment garment-enter" key={`${id}-${corKey}`}>
      <path d={s.d} fill={hex} stroke="var(--ink)" strokeOpacity={0.16} strokeWidth={1.4} strokeLinejoin="round" />
      {s.lapels?.map((d, i) => (
        <path key={i} d={d} fill="rgba(0,0,0,.13)" />
      ))}
      <path d={s.d} fill="url(#sheen)" />
      {s.collar && (
        <path d={s.collar} fill={hex} stroke="var(--ink)" strokeOpacity={0.16} strokeWidth={1.4} />
      )}
      {s.extras?.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="rgba(0,0,0,.16)" strokeWidth={1.1} strokeLinecap="round" />
      ))}
    </g>
  );
}

export default function Provador() {
  const ini = provador.inicial;
  const [modo, setModo] = useState<"look" | "vestido">(ini.modo);
  const [topId, setTopId] = useState<string>(ini.top);
  const [bottomId, setBottomId] = useState<string>(ini.bottom);
  const [vestidoId, setVestidoId] = useState<string>(ini.vestido);
  const [tamanho, setTamanho] = useState<string>(ini.tamanho);
  const [alvo, setAlvo] = useState<string>(ini.top); // peça que a cartela de cor edita
  const [colors, setColors] = useState<Record<string, string>>(() =>
    Object.fromEntries(pecas.map((p) => [p.id, p.cor]))
  );

  // peças visíveis no manequim (ordem de baixo para cima)
  const visiveis: string[] = modo === "look" ? [bottomId, topId] : [vestidoId];
  const selecionadas = visiveis.map(pecaById);
  const total = selecionadas.reduce((s, p) => s + p.preco, 0);
  const alvoEfetivo = visiveis.includes(alvo) ? alvo : visiveis[visiveis.length - 1];
  const alvoPeca = pecaById(alvoEfetivo);

  const lookNome =
    modo === "look" ? `${pecaById(topId).nome} + ${pecaById(bottomId).nome}` : pecaById(vestidoId).nome;

  function trocaModo(m: "look" | "vestido") {
    setModo(m);
    setAlvo(m === "look" ? topId : vestidoId);
  }

  function escolhe(id: string, tipo: "top" | "bottom" | "vestido") {
    if (tipo === "top") setTopId(id);
    if (tipo === "bottom") setBottomId(id);
    if (tipo === "vestido") setVestidoId(id);
    setAlvo(id);
  }

  function pinta(corKey: string) {
    setColors((c) => ({ ...c, [alvoEfetivo]: corKey }));
  }

  function surpreende() {
    const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
    const cor = () => pick(cores).key;
    if (modo === "look") {
      const t = pick(tops).id;
      const b = pick(bottoms).id;
      setTopId(t);
      setBottomId(b);
      setColors((c) => ({ ...c, [t]: cor(), [b]: cor() }));
      setAlvo(t);
    } else {
      const v = pick(vestidos).id;
      setVestidoId(v);
      setColors((c) => ({ ...c, [v]: cor() }));
      setAlvo(v);
    }
  }

  const waLink = useMemo(() => {
    const linhas = selecionadas.map(
      (p) => `— ${p.nome} · cor ${corByKey(colors[p.id]).nome} · ${brl(p.preco)}`
    );
    const msg = [
      provador.saudacao,
      "",
      ...linhas,
      `Tamanho: ${tamanho}`,
      `Total: ${brl(total)}`,
      "",
      "Consigo reservar para provar?",
    ].join("\n");
    return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
  }, [selecionadas, colors, tamanho, total]);

  const grupos =
    modo === "look"
      ? [
          { titulo: "Parte de cima", tipo: "top" as const, lista: tops, sel: topId },
          { titulo: "Parte de baixo", tipo: "bottom" as const, lista: bottoms, sel: bottomId },
        ]
      : [{ titulo: "Vestido", tipo: "vestido" as const, lista: vestidos, sel: vestidoId }];

  return (
    <section className="provador" id="provador">
      <div className="wrap">
        <Reveal className="sec-head stack" as="div">
          <span className="kicker">Provador virtual</span>
          <h2>{provador.titulo}</h2>
          <p>{provador.lead}</p>
        </Reveal>

        <div className="prov-grid">
          {/* Palco do manequim */}
          <Reveal className="prov-stage" as="div">
            <div className="prov-figure">
              <svg viewBox="0 0 300 660" role="img" aria-label={`Manequim vestindo: ${lookNome}`}>
                <defs>
                  <linearGradient id="sheen" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="0.25" y2="1">
                    <stop offset="0" stopColor="#fff" stopOpacity="0.42" />
                    <stop offset="0.5" stopColor="#fff" stopOpacity="0.06" />
                    <stop offset="1" stopColor="#000" stopOpacity="0.08" />
                  </linearGradient>
                </defs>

                {/* sombra no chão */}
                <ellipse cx="150" cy="640" rx="78" ry="11" fill="rgba(0,0,0,.07)" />

                {/* manequim */}
                <g>
                  <ellipse cx="150" cy="58" rx="22" ry="28" fill={FORM} />
                  <path
                    d="M150,86 C160,86 168,96 170,108 C188,118 198,124 198,132 C196,170 190,230 196,300 C200,320 198,340 192,344 C196,420 190,520 184,600 C184,612 180,624 176,628 L160,628 C158,560 156,460 154,360 L146,360 C144,460 142,560 140,628 L124,628 C120,624 116,612 116,600 C110,520 104,420 108,344 C102,340 100,320 104,300 C110,230 104,170 102,132 C102,124 112,118 130,108 C132,96 140,86 150,86 Z"
                    fill={FORM}
                  />
                  {/* leve modelado lateral */}
                  <path
                    d="M150,86 C140,86 132,96 130,108 C112,118 102,124 102,132 C104,170 110,230 104,300 C100,320 102,340 108,344 C104,420 110,520 116,600 C116,612 120,624 124,628 L132,628 C140,500 138,300 138,150 C138,110 142,92 150,86 Z"
                    fill="rgba(0,0,0,.05)"
                  />
                </g>

                {/* roupas */}
                {visiveis.map((id) => (
                  <Garment key={id} id={id} corKey={colors[id]} />
                ))}
              </svg>
            </div>

            <div className="prov-stage-foot">
              <div className="prov-look-name">
                {lookNome}
                <span>Tamanho {tamanho}</span>
              </div>
              <button type="button" className="prov-shuffle" onClick={surpreende}>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M3 7h4l10 10h4M3 17h4l3-3m4-4 3-3h4M17 3l4 4-4 4M17 13l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Surpreenda-me
              </button>
            </div>
          </Reveal>

          {/* Painel de controles */}
          <Reveal className="prov-panel" as="div">
            <div className="prov-modes" role="group" aria-label="Tipo de look">
              <button type="button" aria-pressed={modo === "look"} onClick={() => trocaModo("look")}>
                Conjunto
              </button>
              <button type="button" aria-pressed={modo === "vestido"} onClick={() => trocaModo("vestido")}>
                Vestido
              </button>
            </div>

            {grupos.map((g) => (
              <div className="prov-block" key={g.tipo}>
                <h3>{g.titulo}</h3>
                <div className="prov-pecas">
                  {g.lista.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className="prov-peca"
                      aria-pressed={g.sel === p.id}
                      onClick={() => escolhe(p.id, g.tipo)}
                    >
                      <b>{p.nome}</b>
                      <span>{brl(p.preco)}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="prov-block">
              <h3>Cor</h3>
              <p className="prov-cor-alvo">
                Pintando: <b>{alvoPeca.nome}</b>
              </p>
              <div className="prov-cores">
                {cores.map((c) => (
                  <button
                    key={c.key}
                    type="button"
                    className="prov-cor"
                    style={{ background: c.hex }}
                    aria-pressed={colors[alvoEfetivo] === c.key}
                    aria-label={`Cor ${c.nome}`}
                    title={c.nome}
                    onClick={() => pinta(c.key)}
                  />
                ))}
              </div>
            </div>

            <div className="prov-block">
              <h3>Tamanho</h3>
              <div className="prov-tamanhos">
                {provador.tamanhos.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className="prov-tam"
                    aria-pressed={tamanho === t}
                    onClick={() => setTamanho(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="prov-resumo">
              {selecionadas.map((p) => (
                <div className="prov-linha" key={p.id}>
                  <span>
                    <i className="dot" style={{ background: corByKey(colors[p.id]).hex }} />
                    {p.nome} · {corByKey(colors[p.id]).nome}
                  </span>
                  <b>{brl(p.preco)}</b>
                </div>
              ))}
              <div className="prov-total">
                <span>Total do look</span>
                <b>{brl(total)}</b>
              </div>

              <a className="btn prov-cta" href={waLink} target="_blank" rel="noopener">
                Enviar look pelo WhatsApp
                <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <p className="prov-nota">Sem compromisso — separamos para você provar na loja.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
