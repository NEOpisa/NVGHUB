import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = { nome: 120, email: 180, mensagem: 4000 };

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
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

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.' }, { status: 429 });
  }

  let body: { nome?: unknown; email?: unknown; mensagem?: unknown; empresa?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Requisição inválida.' }, { status: 400 });
  }

  // Honeypot: campo invisível que só bots preenchem.
  if (typeof body.empresa === 'string' && body.empresa.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const nome = typeof body.nome === 'string' ? body.nome.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const mensagem = typeof body.mensagem === 'string' ? body.mensagem.trim() : '';

  if (!nome || !email || !mensagem) {
    return NextResponse.json({ error: 'Preencha todos os campos.' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Informe um e-mail válido.' }, { status: 400 });
  }
  if (nome.length > MAX_LEN.nome || email.length > MAX_LEN.email || mensagem.length > MAX_LEN.mensagem) {
    return NextResponse.json({ error: 'Um dos campos passou do limite de tamanho.' }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: 'Neovanguard <contato@neovanguard.com.br>',
      to: 'comercial@neovanguard.com.br',
      replyTo: email,
      subject: `Novo contato pelo site — ${nome}`,
      text: `Nome: ${nome}\nE-mail: ${email}\n\nMensagem:\n${mensagem}`,
      html: `
        <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; max-width: 560px; margin: 0 auto;">
          <h2 style="margin: 0 0 16px; color: #1a1a1a;">Novo contato pelo site</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #333;">
            <tr>
              <td style="padding: 6px 0; color: #777; width: 90px;">Nome</td>
              <td style="padding: 6px 0;">${escapeHtml(nome)}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #777;">E-mail</td>
              <td style="padding: 6px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
            </tr>
          </table>
          <p style="margin: 18px 0 6px; color: #777; font-size: 14px;">Mensagem</p>
          <p style="white-space: pre-wrap; font-size: 14px; color: #333; line-height: 1.6;">${escapeHtml(mensagem)}</p>
        </div>
      `,
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return NextResponse.json({ error: 'Não foi possível enviar a mensagem agora.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] erro inesperado:', err);
    return NextResponse.json({ error: 'Erro interno ao enviar a mensagem.' }, { status: 500 });
  }
}
