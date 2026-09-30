import { describe, expect, it } from "vitest";
import pt from "@/messages/pt.json";
import en from "@/messages/en.json";
import errors from "@/messages/error.json";
import { GUIDES } from "./guides";
import { ROUTES, localePath } from "./routes";

/** Caminho de cada texto, com o tamanho das listas: `home.pillars.cards[4]`. */
function shape(value: unknown, path = ""): string[] {
  if (Array.isArray(value)) return [`${path}[${value.length}]`, ...value.flatMap((item, index) => shape(item, `${path}.${index}`))];
  if (value && typeof value === "object") return Object.entries(value).flatMap(([key, item]) => shape(item, path ? `${path}.${key}` : key));
  return [path];
}

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  return value && typeof value === "object" ? Object.values(value).flatMap(strings) : [];
}

const tags = (text: string) => (text.match(/<\/?[a-z:\w-]*>|\{\w+\}/g) ?? []).sort();

describe("dicionários", () => {
  it("têm as mesmas chaves e o mesmo número de itens nos dois idiomas", () => {
    expect(shape(en)).toEqual(shape(pt));
    expect(shape(errors.en)).toEqual(shape(errors.pt));
  });

  it("usam a mesma marcação e os mesmos marcadores em cada texto", () => {
    const portuguese = strings(pt);
    strings(en).forEach((text, index) => expect(tags(text), text).toEqual(tags(portuguese[index])));
  });

  it("não deixam texto vazio", () => {
    for (const text of [...strings(pt), ...strings(en)]) expect(text.trim()).not.toBe("");
  });
});

describe("rotas", () => {
  it("têm pares únicos, com o inglês sob /en", () => {
    expect(new Set(ROUTES.map(r => r.pt)).size).toBe(ROUTES.length);
    expect(new Set(ROUTES.map(r => r.en)).size).toBe(ROUTES.length);
    for (const route of ROUTES) {
      expect(route.pt.startsWith("/en")).toBe(false);
      expect(route.en === "/en" || route.en.startsWith("/en/")).toBe(true);
    }
    expect(ROUTES.filter(r => r.guide)).toHaveLength(GUIDES.length);
  });

  it("levam à página equivalente e preservam a âncora", () => {
    expect(localePath("en", "/recursos")).toBe("/en/features");
    expect(localePath("en", "/documentacao#construir")).toBe("/en/documentation#construir");
    expect(localePath("pt", "/documentacao#construir")).toBe("/documentacao#construir");
    expect(localePath("en", "/")).toBe("/en");
    expect(() => localePath("en", "/nao-existe")).toThrow();
  });
});
