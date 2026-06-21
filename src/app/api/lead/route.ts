import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = { nome: 120, email: 180, telefone: 40, tipo: 120 };

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const lastRequests = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (lastRequests.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT_MAX) {
    lastRequests.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  lastRequests.set(ip, timestamps);
  return false;
}

type LeadItem = { label: string; price: number | null };

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Muitas tentativas. Aguarde alguns minutos e tente novamente." }, { status: 429 });
  }

  let body: {
    nome?: unknown; email?: unknown; telefone?: unknown; empresa?: unknown;
    origem?: unknown; tipo?: unknown; itens?: unknown; valor?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  // Honeypot: bot preencheu campo escondido.
  if (typeof body.empresa === "string" && body.empresa.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const nome = typeof body.nome === "string" ? body.nome.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const telefone = typeof body.telefone === "string" ? body.telefone.trim() : "";
  const origem = typeof body.origem === "string" ? body.origem.trim() : "site";
  const tipo = typeof body.tipo === "string" ? body.tipo.trim() : "";
  const valor = typeof body.valor === "number" && Number.isFinite(body.valor) ? body.valor : null;
  const itens: LeadItem[] = Array.isArray(body.itens)
    ? body.itens
        .filter((i): i is LeadItem => !!i && typeof (i as LeadItem).label === "string")
        .map((i) => ({ label: String(i.label).slice(0, 160), price: typeof i.price === "number" ? i.price : null }))
    : [];

  if (!email && !telefone) {
    return NextResponse.json({ error: "Informe um e-mail ou telefone para contato." }, { status: 400 });
  }
  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Informe um e-mail válido." }, { status: 400 });
  }
  if (
    nome.length > MAX_LEN.nome || email.length > MAX_LEN.email ||
    telefone.length > MAX_LEN.telefone || tipo.length > MAX_LEN.tipo
  ) {
    return NextResponse.json({ error: "Um dos campos passou do limite de tamanho." }, { status: 400 });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  // Chave de serviço (secret) — rota server-side, bypassa RLS. A anon legada
  // está desligada no projeto, por isso a secret é a opção principal.
  const SUPABASE_KEY =
    process.env.SUPABASE_SECRET_KEY ??
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_ANON_KEY ??
    process.env.SUPABASE_KEY;
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("[lead] SUPABASE_URL / SUPABASE_SECRET_KEY não configurados.");
    return NextResponse.json({ error: "Serviço indisponível no momento." }, { status: 500 });
  }

  // Resumo legível para o campo "Obs." (aparece no painel de planejamentos).
  const linhas = itens.map((i) => `• ${i.label}${i.price != null ? ` — R$ ${i.price.toLocaleString("pt-BR")}` : ""}`);
  const contato = [email && `E-mail: ${email}`, telefone && `Tel: ${telefone}`].filter(Boolean).join(" · ");
  const obs = [
    linhas.length ? linhas.join("\n") : null,
    valor != null ? `Total estimado: R$ ${valor.toLocaleString("pt-BR")}` : null,
    contato,
  ].filter(Boolean).join("\n");

  const registro = {
    Nome: nome || null,
    Tipo: tipo || (origem === "pacote" ? "Pacote" : "Atendimento sob medida"),
    Status: "pendente",
    Email: email || null,
    Telefone: telefone || null,
    Origem: origem,
    Itens: itens.length ? itens : null,
    Valor: valor,
    "Obs.": obs || null,
  };

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/Clientes`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(registro),
    });

    if (!res.ok) {
      const detalhe = await res.text();
      console.error("[lead] Supabase insert falhou:", res.status, detalhe);
      return NextResponse.json({ error: "Não foi possível registrar seu pedido agora." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] erro inesperado:", err);
    return NextResponse.json({ error: "Erro interno ao registrar o pedido." }, { status: 500 });
  }
}
