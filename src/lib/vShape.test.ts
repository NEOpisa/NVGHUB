import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { HALF_OUTLINE, bothHalves, wallPaths } from "@/lib/vShape";

/**
 * Estes testes existem por causa de um bug real: nas metades espelhadas dos
 * SVGs de public/ eu tinha espelhado TAMBÉM o deslocamento da extrusão. O
 * deslocamento é a direção da profundidade — ele não espelha. O resultado
 * era sutil o bastante para passar despercebido em miniatura e evidente com
 * zoom: as duas paredes se cruzavam por baixo da ponta do V em vez de se
 * encontrarem nela.
 *
 * Hoje os SVGs são gerados por scripts/marca.mjs, que carrega a mesma malha
 * mas repete a conta em JavaScript puro (o script roda em Node, vShape é do
 * bundle). Estes testes prendem uma coisa na outra: se as contas divergirem,
 * ou se alguém editar os SVGs à mão, quebram aqui.
 */

const ROOT = join(import.meta.dirname, "..", "..");
const DX = 16;
const DY = 13;

/** todos os `d="..."` de um arquivo SVG */
function caminhos(rel: string): string[] {
  const svg = readFileSync(join(ROOT, rel), "utf8");
  return [...svg.matchAll(/\sd="([^"]+)"/g)].map((m) => m[1]);
}

describe("a ponta do V", () => {
  it("é o mesmo ponto nas duas metades", () => {
    const ponta = HALF_OUTLINE.find(([, y]) => y === 830);
    expect(ponta).toBeDefined();
    // o vértice mais baixo tem de estar exatamente no eixo de espelhamento,
    // senão as metades se cruzam ou deixam fenda em vez de se tocarem
    expect(ponta![0]).toBe(640);
  });

  it("não espelha o deslocamento da extrusão", () => {
    const esq = wallPaths(HALF_OUTLINE, { dx: DX, dy: DY });
    const dir = wallPaths(HALF_OUTLINE, { dx: DX, dy: DY, mirror: true });

    // a parede de trás de cada metade tem de sair para o MESMO lado
    const desloca = (d: string) => {
      const n = d.match(/-?\d+(\.\d+)?/g)!.map(Number);
      // quadrilátero: frente(a, b) → trás(b+d, a+d)
      return { dx: n[4] - n[2], dy: n[5] - n[3] };
    };
    expect(desloca(esq[0].d)).toEqual({ dx: DX, dy: DY });
    expect(desloca(dir[0].d)).toEqual({ dx: DX, dy: DY });
  });
});

describe("os SVGs gerados em public/", () => {
  /** a face da frente: o glifo em si, obrigatório em todo master */
  const FRENTE = bothHalves(HALF_OUTLINE);
  /** a extrusão: só nos masters que a desenham */
  const EXTRUSAO = [
    ...[false, true].flatMap((mirror) =>
      wallPaths(HALF_OUTLINE, { dx: DX, dy: DY, mirror }).map((p) => p.d),
    ),
    ...bothHalves(HALF_OUTLINE, { dx: DX, dy: DY }),
  ];

  /** [arquivo, tem extrusão?] — o vetor inline e o favicon são chapados de
      propósito: a 16–32px a extrusão não desenha relevo, só engrossa */
  const MASTERS: [string, boolean][] = [
    ["public/perfil.svg", true],
    ["public/icone-app.svg", true],
    ["public/icone.svg", false],
    ["public/logo.svg", false],
  ];

  for (const [rel, comExtrusao] of MASTERS) {
    it(`${rel} traz o glifo que o site usa`, () => {
      const achados = new Set(caminhos(rel));
      for (const d of FRENTE) expect(achados.has(d)).toBe(true);
    });

    it(`${rel} ${comExtrusao ? "extruda" : "não extruda"} como o site`, () => {
      const achados = new Set(caminhos(rel));
      for (const d of EXTRUSAO) expect(achados.has(d)).toBe(comExtrusao);
    });
  }
});
