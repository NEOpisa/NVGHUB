// #091 · Testes do estado da jornada (funções puras + persistência).
import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  clamp01,
  rangeN,
  CH,
  journey,
  saveJourneyProgress,
  loadJourneyProgress,
} from "./journeyState";

describe("clamp01", () => {
  it("limita ao intervalo [0,1]", () => {
    expect(clamp01(-0.5)).toBe(0);
    expect(clamp01(0)).toBe(0);
    expect(clamp01(0.42)).toBe(0.42);
    expect(clamp01(1)).toBe(1);
    expect(clamp01(7)).toBe(1);
  });
});

describe("rangeN", () => {
  it("normaliza dentro da faixa", () => {
    expect(rangeN(0.5, 0, 1)).toBe(0.5);
    expect(rangeN(0.3, 0.2, 0.4)).toBeCloseTo(0.5);
  });
  it("satura fora da faixa", () => {
    expect(rangeN(0.1, 0.2, 0.4)).toBe(0);
    expect(rangeN(0.9, 0.2, 0.4)).toBe(1);
  });
});

describe("CH (faixas dos capítulos)", () => {
  it("faixas são crescentes e não se sobrepõem", () => {
    const list = [CH.hero, CH.eco, CH.services, CH.explore];
    for (const c of list) expect(c.end).toBeGreaterThan(c.start);
    for (let i = 1; i < list.length; i++)
      expect(list[i].start).toBeGreaterThanOrEqual(list[i - 1].end);
  });
});

describe("persistência do progresso (#043)", () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    vi.stubGlobal("sessionStorage", {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, v),
    });
  });

  it("salva e restaura o progresso", () => {
    journey.progress = 0.4321;
    saveJourneyProgress();
    expect(loadJourneyProgress()).toBeCloseTo(0.4321, 3);
  });

  it("retorna 0 sem valor salvo ou com lixo", () => {
    expect(loadJourneyProgress()).toBe(0);
    sessionStorage.setItem("nvg:journey-p", "not-a-number");
    expect(loadJourneyProgress()).toBe(0);
  });

  it("clampa valores fora de [0,1]", () => {
    sessionStorage.setItem("nvg:journey-p", "3.5");
    expect(loadJourneyProgress()).toBe(1);
  });
});
