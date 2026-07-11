// #092 · Testes da rota /api/contact — validação, honeypot e limites.
// (Sem RESEND_API_KEY os caminhos de erro/honeypot são exercidos por inteiro;
// o envio real fica atrás do gate de env.)
import { describe, it, expect } from "vitest";
import { POST } from "./route";

const req = (body: unknown, ip = "10.0.0.1") =>
  new Request("http://test/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });

describe("POST /api/contact", () => {
  it("400 em JSON inválido", async () => {
    const res = await POST(
      new Request("http://test", { method: "POST", body: "{{{" }),
    );
    expect(res.status).toBe(400);
  });

  it("honeypot preenchido → 200 silencioso (bot não aprende)", async () => {
    const res = await POST(
      req({ nome: "Bot", email: "b@b.com", mensagem: "x", empresa: "spam" }, "10.0.0.2"),
    );
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);
  });

  it("400 com campos faltando", async () => {
    const res = await POST(req({ nome: "Ana" }, "10.0.0.3"));
    expect(res.status).toBe(400);
  });

  it("400 com e-mail inválido", async () => {
    const res = await POST(
      req({ nome: "Ana", email: "nao-eh-email", mensagem: "oi" }, "10.0.0.4"),
    );
    expect(res.status).toBe(400);
  });

  it("400 estourando limite de tamanho", async () => {
    const res = await POST(
      req(
        { nome: "Ana", email: "a@a.com", mensagem: "x".repeat(5000) },
        "10.0.0.5",
      ),
    );
    expect(res.status).toBe(400);
  });

  it("rate-limit: 4ª tentativa do MESMO IP leva 429", async () => {
    const ip = "10.9.9.9";
    const good = { nome: "Ana", email: "a@a.com", mensagem: "oi" };
    const statuses: number[] = [];
    for (let i = 0; i < 4; i++) statuses.push((await POST(req(good, ip))).status);
    expect(statuses[3]).toBe(429);
  });
});
