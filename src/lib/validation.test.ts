import { describe, it, expect } from "vitest";
import { EMAIL_RE, isValidPhone } from "@/lib/validation";

describe("EMAIL_RE", () => {
  it("aceita e-mails válidos", () => {
    expect(EMAIL_RE.test("ana@exemplo.com")).toBe(true);
    expect(EMAIL_RE.test("ana.silva+tag@sub.dominio.com.br")).toBe(true);
  });

  it("rejeita e-mails inválidos", () => {
    expect(EMAIL_RE.test("ana@exemplo")).toBe(false);
    expect(EMAIL_RE.test("ana exemplo.com")).toBe(false);
    expect(EMAIL_RE.test("@exemplo.com")).toBe(false);
    expect(EMAIL_RE.test("")).toBe(false);
  });
});

describe("isValidPhone", () => {
  it("considera vazio como válido (campo opcional)", () => {
    expect(isValidPhone("")).toBe(true);
    expect(isValidPhone("   ")).toBe(true);
  });

  it("aceita formatos brasileiros usuais", () => {
    expect(isValidPhone("(21) 99999-9999")).toBe(true);
    expect(isValidPhone("21999999999")).toBe(true);
    expect(isValidPhone("+55 21 99999-9999")).toBe(true);
    expect(isValidPhone("2133334444")).toBe(true); // fixo, 10 dígitos
  });

  it("rejeita lixo e quantidade de dígitos fora de 10–13", () => {
    expect(isValidPhone("abc")).toBe(false);
    expect(isValidPhone("999999999")).toBe(false); // 9 dígitos
    expect(isValidPhone("12345678901234")).toBe(false); // 14 dígitos
  });
});
