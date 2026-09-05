#!/usr/bin/env node
/**
 * GERA os SVGs da marca em public/ a partir de src/lib/v-malha.json e
 * rasteriza os PNGs. Rode depois de mexer na malha ou nas cores:
 *
 *   node scripts/marca.mjs
 *
 * Por que gerar em vez de desenhar à mão: os caminhos espelhados e as
 * paredes da extrusão são fáceis de errar de um jeito que só aparece com
 * zoom. Aconteceu — nas metades espelhadas eu tinha espelhado TAMBÉM o
 * deslocamento da extrusão, e as duas paredes se cruzavam embaixo da ponta
 * do V em vez de se encontrarem nela. O deslocamento é a direção da luz:
 * ele não espelha. Aqui isso é uma linha de código, não oito caminhos
 * digitados. O teste em src/lib/vShape.test.ts prende esta conta à do site.
 *
 * Quatro masters, porque o mesmo desenho não serve aos três usos:
 *
 *   logo.svg       o vetor chapado, sem campo. É o que o site usa inline
 *                  nos trilhos, a 30px — nesse tamanho extrusão não desenha
 *                  relevo, só engrossa.
 *   perfil.svg     campo escuro + V cromado. Foto de perfil das redes e
 *                  logo da organização — vive grande, pode ter material.
 *   icone.svg      campo azul-marinho + V em silhueta, canto arredondado. Aba do
 *                  navegador, 16 a 32px.
 *   icone-app.svg  campo azul-marinho + V inteiro, sangrando até a borda. Tela
 *                  inicial e PWA, onde o sistema aplica a própria máscara.
 *
 * Precisa do rsvg-convert (pacote librsvg). Sem ele, nada é escrito.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const malha = JSON.parse(
  readFileSync(join(ROOT, "src/lib/v-malha.json"), "utf8"),
);
const { outline, facets, mirror: MIRROR } = malha;

/* ── a mesma geometria de src/lib/vShape.ts ────────────────────────────
   Duplicada porque o script roda em Node puro e vShape é TypeScript do
   bundle. vShape.test.ts compara as duas saídas caminho a caminho: se
   divergirem, o teste quebra. ─────────────────────────────────────────*/

const eixo = (x, mirrored) => (mirrored ? MIRROR - x : x);

/** polígono → atributo `d` */
function vPath(pts, { mirrored = false, dx = 0, dy = 0 } = {}) {
  return (
    pts
      .map(([x, y], i) => `${i === 0 ? "M" : "L"}${eixo(x, mirrored) + dx} ${y + dy}`)
      .join(" ") + " Z"
  );
}

/**
 * As paredes da extrusão: um quadrilátero por aresta, ligando a face da
 * frente à cópia deslocada. dx/dy são os MESMOS nas duas metades — é a
 * direção da profundidade, e ela não espelha junto com a forma.
 */
function wallPaths(pts, { dx, dy, mirrored = false }) {
  const p = pts.map(([x, y]) => [eixo(x, mirrored), y]);
  return p.map((a, i) => {
    const b = p[(i + 1) % p.length];
    const d = `M${a[0]} ${a[1]} L${b[0]} ${b[1]} L${b[0] + dx} ${b[1] + dy} L${a[0] + dx} ${a[1] + dy} Z`;
    const [ex, ey] = [b[0] - a[0], b[1] - a[1]];
    const len = Math.hypot(ex, ey) || 1;
    const luz = (-ey / len) * -0.6 + (ex / len) * -0.8;
    return { d, tom: (luz + 1) / 2 };
  });
}

/** as duas metades de uma peça */
const ambas = (pts, off = {}) => [
  vPath(pts, off),
  vPath(pts, { ...off, mirrored: true }),
];

/* ── o desenho da marca, comum aos três masters ────────────────────── */

const DX = 16;
const DY = 13;

/**
 * A marca inteira em SVG. `cores` decide o material.
 *
 * `cores.silhueta` desliga extrusão, esmalte e fio de luz, deixando só a
 * face da frente chapada. É o modo do favicon: a MESMA forma da marca, mas
 * sem o detalhe interno, que abaixo de ~24px não desenha relevo nenhum —
 * só acinzenta a lâmina e come a silhueta.
 */
function marca(cores) {
  const frente = ambas(outline).map((d) => `  <path d="${d}"/>`);
  if (cores.silhueta) {
    return [`<g fill="${cores.lamina}">`, ...frente, `</g>`].join("\n      ");
  }

  const paredes = [false, true].flatMap((mirrored) =>
    wallPaths(outline, { dx: DX, dy: DY, mirrored }),
  );

  return [
    `<g fill="${cores.parede}">`,
    ...paredes.map((p) => `  <path d="${p.d}" opacity="${(0.45 + p.tom * 0.55).toFixed(2)}"/>`),
    `</g>`,
    `<g fill="${cores.fundo}">`,
    ...ambas(outline, { dx: DX, dy: DY }).map((d) => `  <path d="${d}"/>`),
    `</g>`,
    `<g fill="${cores.lamina}">`,
    ...frente,
    `</g>`,
    `<g fill="${cores.esmalte}">`,
    ...facets.flatMap((f) => ambas(f)).map((d) => `  <path d="${d}"/>`),
    `</g>`,
    `<g stroke="#ffffff" stroke-opacity="${cores.fio}" stroke-width="5" fill="none" stroke-linecap="round">`,
    `  <path d="M492 306 L278 369"/>`,
    `  <path d="M788 306 L1002 369"/>`,
    `</g>`,
  ].join("\n      ");
}

/** centra a malha no quadrado de 1024 e aplica a escala pedida */
const posicao = (escala, dy = 0) =>
  `translate(512,${512 + dy}) scale(${escala}) translate(-640,-568)`;

const CABECA = (nota) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024" role="img" aria-label="Neovanguard">
  <!-- GERADO por scripts/marca.mjs a partir de src/lib/v-malha.json.
       Não edite à mão: rode o script.

${nota} -->`;

/* ── perfil: avatar das redes, campo escuro e cromado ──────────────── */
const PERFIL = `${CABECA(`       Foto de perfil das redes e logo da organização. Vive de 40 a 400px
       numa timeline, então pode ter material — mas TUDO precisa caber no
       círculo: Instagram, WhatsApp e LinkedIn recortam redondo, X e GitHub
       em quadrado arredondado. Por isso o contorno fica afastado da borda e a marca no
       miolo. O halo existe para descolar a peça do campo: sem ele a beirada
       escura do V encosta no fundo e a silhueta some na miniatura.`)}
  <defs>
    <radialGradient id="p-campo" cx="0.32" cy="0.24" r="0.92">
      <stop offset="0" stop-color="#172940"/>
      <stop offset="0.55" stop-color="#0c1422"/>
      <stop offset="1" stop-color="#060b13"/>
    </radialGradient>
    <radialGradient id="p-halo" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#6495ED" stop-opacity="0.36"/>
      <stop offset="0.6" stop-color="#3d65a8" stop-opacity="0.1"/>
      <stop offset="1" stop-color="#6495ED" stop-opacity="0"/>
    </radialGradient>
    <!-- espaço de usuário: uma luz só atravessa as duas metades. No padrão
         (objectBoundingBox) cada caminho ganha a sua própria rampa, e a
         peça passa a parecer duas peças encostadas. -->
    <linearGradient id="p-lamina" gradientUnits="userSpaceOnUse" x1="300" y1="300" x2="1000" y2="850">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="0.36" stop-color="#d0e0fc"/>
      <stop offset="0.72" stop-color="#a2c1f5"/>
      <stop offset="1" stop-color="#6495ED"/>
    </linearGradient>
    <linearGradient id="p-esmalte" gradientUnits="userSpaceOnUse" x1="300" y1="300" x2="1000" y2="850">
      <stop offset="0" stop-color="#86adf3"/>
      <stop offset="0.5" stop-color="#6495ED"/>
      <stop offset="1" stop-color="#3d65a8"/>
    </linearGradient>
    <linearGradient id="p-parede" gradientUnits="userSpaceOnUse" x1="300" y1="300" x2="1000" y2="850">
      <stop offset="0" stop-color="#5f80c9"/>
      <stop offset="1" stop-color="#101a38"/>
    </linearGradient>
  </defs>

  <rect width="1024" height="1024" fill="url(#p-campo)"/>
  <circle cx="512" cy="498" r="360" fill="url(#p-halo)"/>
  <rect x="84" y="84" width="856" height="856" rx="200" fill="none" stroke="#6495ED" stroke-opacity="0.42" stroke-width="3"/>
  <rect x="104" y="104" width="816" height="816" rx="182" fill="none" stroke="#6495ED" stroke-opacity="0.10" stroke-width="2"/>

  <g transform="${posicao(0.87, -6)}">
      ${marca({
        parede: "url(#p-parede)",
        fundo: "#16224a",
        lamina: "url(#p-lamina)",
        esmalte: "url(#p-esmalte)",
        fio: "0.5",
      })}
  </g>
</svg>
`;

/* ── logo: o vetor chapado que o site usa inline ───────────────────── */
const LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${malha.viewBox}" role="img" aria-label="NEOVANGUARD">
  <!-- GERADO por scripts/marca.mjs a partir de src/lib/v-malha.json.
       Não edite à mão: rode o script.

       O vetor da marca sem campo e sem extrusão, para uso inline no site
       (trilho esquerdo, barra mobile, reserva do 3D). A 30px de altura a
       extrusão não desenha relevo — só engrossa a peça e suja o entalhe.

       Os degradês são os mesmos do avatar e em espaço de usuário, então a
       luz atravessa as duas metades como uma luz só, igual ao resto do
       sistema. -->
  <defs>
    <linearGradient id="nv-lamina" gradientUnits="userSpaceOnUse" x1="300" y1="300" x2="1000" y2="850">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="0.36" stop-color="#d0e0fc"/>
      <stop offset="0.72" stop-color="#a2c1f5"/>
      <stop offset="1" stop-color="#6495ED"/>
    </linearGradient>
    <linearGradient id="nv-esmalte" gradientUnits="userSpaceOnUse" x1="300" y1="300" x2="1000" y2="850">
      <stop offset="0" stop-color="#86adf3"/>
      <stop offset="0.5" stop-color="#6495ED"/>
      <stop offset="1" stop-color="#3d65a8"/>
    </linearGradient>
  </defs>

  <g fill="url(#nv-lamina)">
${ambas(outline).map((d) => `    <path d="${d}"/>`).join("\n")}
  </g>
  <g fill="url(#nv-esmalte)">
${facets.flatMap((f) => ambas(f)).map((d) => `    <path d="${d}"/>`).join("\n")}
  </g>
</svg>
`;

/* ── ícones: campo azul-marinho, o V oficial ───────────────────────────────── */
const CAMPO_AZUL = `    <linearGradient id="i-campo" x1="0" y1="0" x2="0.35" y2="1">
      <stop offset="0" stop-color="#182d49"/>
      <stop offset="0.52" stop-color="#101c2e"/>
      <stop offset="1" stop-color="#0c1422"/>
    </linearGradient>
    <linearGradient id="i-lamina" gradientUnits="userSpaceOnUse" x1="300" y1="300" x2="1000" y2="850">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="0.6" stop-color="#b1cbf8"/>
      <stop offset="1" stop-color="#6495ED"/>
    </linearGradient>`;

const TINTA_AZUL = {
  parede: "#223d60",
  fundo: "#101c2e",
  lamina: "url(#i-lamina)",
  esmalte: "#6495ED",
  fio: "0.45",
};

/* Escalas diferentes por causa da máscara, não por gosto: o ícone de app é
   recortado pelo sistema num círculo de 80% (raio 409 do centro), e a
   diagonal da malha a 0.9 dá 402 — no limite. O da aba não é mascarado,
   então pode crescer e ganhar nitidez onde ela é mais escassa. */
const ICONE = `${CABECA(`       Favicon: 16 a 32px na aba. Canto arredondado porque o navegador NÃO
       aplica máscara — quem arredonda é o desenho.

       É o V oficial, a mesma malha de todo o resto, mas em SILHUETA: sem
       extrusão e sem esmalte. Abaixo de ~24px esse detalhe não desenha
       relevo nenhum, só acinzenta a lâmina e come a forma. A forma é a
       marca; o material é o que ela veste quando tem espaço.`)}
  <defs>
${CAMPO_AZUL}
  </defs>

  <rect width="1024" height="1024" rx="196" fill="url(#i-campo)"/>
  <rect x="24" y="24" width="976" height="976" rx="180" fill="none" stroke="#6495ED" stroke-opacity="0.6" stroke-width="24"/>

  <g transform="${posicao(0.98, 4)}">
      ${marca({ ...TINTA_AZUL, lamina: "#6495ED", silhueta: true })}
  </g>
</svg>
`;

const ICONE_APP = `${CABECA(`       Ícone de app: 60 a 192px, tela inicial e PWA. SANGRIA TOTAL, sem
       canto arredondado — iOS e Android aplicam a própria máscara, e
       arredondar aqui daria canto duplo no iPhone e borda serrilhada no
       Android. A marca cabe no círculo seguro de 80%.`)}
  <defs>
${CAMPO_AZUL}
  </defs>

  <rect width="1024" height="1024" fill="url(#i-campo)"/>
  <rect x="100" y="100" width="824" height="824" rx="172" fill="none" stroke="#6495ED" stroke-opacity="0.32" stroke-width="4"/>

  <g transform="${posicao(0.9, 4)}">
      ${marca(TINTA_AZUL)}
  </g>
</svg>
`;

/* ── escrita ───────────────────────────────────────────────────────── */

try {
  execFileSync("rsvg-convert", ["--version"], { stdio: "ignore" });
} catch {
  console.error("rsvg-convert não encontrado — instale librsvg e rode de novo.");
  process.exit(1);
}

const MASTERS = [
  ["public/logo.svg", LOGO],
  ["public/perfil.svg", PERFIL],
  ["public/icone.svg", ICONE],
  ["public/icone-app.svg", ICONE_APP],
];
for (const [rel, conteudo] of MASTERS) {
  writeFileSync(join(ROOT, rel), conteudo);
  console.log(`${rel} — gerado`);
}

/** [master, destino, lado em px, para que serve] */
const SAIDAS = [
  ["perfil.svg", "public/perfil.png", 1024, "foto de perfil das redes"],
  ["perfil.svg", "public/logo.png", 512, "logo da organização (JSON-LD)"],
  ["icone.svg", "src/app/icon.png", 32, "favicon da aba"],
  ["icone-app.svg", "src/app/apple-icon.png", 180, "ícone do iOS"],
  ["icone-app.svg", "public/icone-192.png", 192, "ícone do manifest (PWA)"],
  ["icone-app.svg", "public/icone-512.png", 512, "ícone grande do manifest"],
];
for (const [master, rel, lado, uso] of SAIDAS) {
  execFileSync("rsvg-convert", [
    join(ROOT, "public", master),
    "-w", String(lado),
    "-h", String(lado),
    "-o", join(ROOT, rel),
  ]);
  console.log(`${rel} · ${lado}px ← ${master} — ${uso}`);
}
