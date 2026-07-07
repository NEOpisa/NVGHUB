import { Resend } from "resend";
import { NextResponse } from "next/server";
import { EMAIL_RE, isValidPhone } from "@/lib/validation";
import { createRateLimiter } from "@/lib/rateLimit";

const MAX_LEN = { nome: 120, email: 180, telefone: 40, tipo: 120 };

const isRateLimited = createRateLimiter({ windowMs: 10 * 60 * 1000, max: 5 });

type LeadItem = { label: string; price: number | null };

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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
  if (telefone && !isValidPhone(telefone)) {
    return NextResponse.json({ error: "Informe um telefone válido." }, { status: 400 });
  }
  if (
    nome.length > MAX_LEN.nome || email.length > MAX_LEN.email ||
    telefone.length > MAX_LEN.telefone || tipo.length > MAX_LEN.tipo
  ) {
    return NextResponse.json({ error: "Um dos campos passou do limite de tamanho." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("[lead] RESEND_API_KEY não configurada.");
    return NextResponse.json({ error: "Serviço indisponível no momento." }, { status: 500 });
  }
  const resend = new Resend(process.env.RESEND_API_KEY);

  const contato = [email && `E-mail: ${email}`, telefone && `Tel: ${telefone}`].filter(Boolean).join(" · ");
  const linhasTxt = itens.map((i) => `• ${i.label}${i.price != null ? ` — R$ ${i.price.toLocaleString("pt-BR")}` : ""}`);
  const tipoLabel = tipo || "Atendimento sob medida";

  const textParts = [
    `Nome: ${nome || "(não informado)"}`,
    `Tipo: ${tipoLabel}`,
    `Origem: ${origem}`,
    contato && `Contato: ${contato}`,
    linhasTxt.length ? `\nItens:\n${linhasTxt.join("\n")}` : null,
    valor != null ? `\nTotal estimado: R$ ${valor.toLocaleString("pt-BR")}` : null,
  ].filter(Boolean);

  const linhasHtml = itens
    .map((i) => `<li style="margin:2px 0;">${escapeHtml(i.label)}${i.price != null ? ` — R$ ${i.price.toLocaleString("pt-BR")}` : ""}</li>`)
    .join("");

  try {
    const { error } = await resend.emails.send({
      from: "Neovanguard <comercial@neovanguard.com.br>",
      to: "comercial@neovanguard.com.br",
      replyTo: email || undefined,
      subject: `Novo pedido pelo site — ${nome || tipoLabel}`,
      text: textParts.join("\n"),
      html: `
        <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; max-width: 560px; margin: 0 auto;">
          <h2 style="margin: 0 0 16px; color: #1a1a1a;">Novo pedido pelo site</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #333;">
            <tr>
              <td style="padding: 6px 0; color: #777; width: 90px;">Nome</td>
              <td style="padding: 6px 0;">${escapeHtml(nome || "(não informado)")}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #777;">Tipo</td>
              <td style="padding: 6px 0;">${escapeHtml(tipoLabel)}</td>
            </tr>
            ${email ? `<tr>
              <td style="padding: 6px 0; color: #777;">E-mail</td>
              <td style="padding: 6px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
            </tr>` : ""}
            ${telefone ? `<tr>
              <td style="padding: 6px 0; color: #777;">Telefone</td>
              <td style="padding: 6px 0;">${escapeHtml(telefone)}</td>
            </tr>` : ""}
            <tr>
              <td style="padding: 6px 0; color: #777;">Origem</td>
              <td style="padding: 6px 0;">${escapeHtml(origem)}</td>
            </tr>
          </table>
          ${linhasHtml ? `<p style="margin: 18px 0 6px; color: #777; font-size: 14px;">Itens</p>
          <ul style="margin: 0; padding-left: 18px; font-size: 14px; color: #333; line-height: 1.6;">${linhasHtml}</ul>` : ""}
          ${valor != null ? `<p style="margin: 18px 0 0; font-size: 14px; color: #333;"><strong>Total estimado:</strong> R$ ${valor.toLocaleString("pt-BR")}</p>` : ""}
        </div>
      `,
    });

    if (error) {
      console.error("[lead] Resend error:", error);
      return NextResponse.json({ error: "Não foi possível registrar seu pedido agora." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] erro inesperado:", err);
    return NextResponse.json({ error: "Erro interno ao registrar o pedido." }, { status: 500 });
  }
}
