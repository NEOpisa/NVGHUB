import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { nome, email, mensagem } = await req.json();

    if (!nome || !email || !mensagem) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando.' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'NeoVanguard <contato@neovanguard.com.br>',
      to: 'comercial@neovanguard.com',
      replyTo: email,
      subject: `Novo contato de ${nome}`,
      text: `Nome: ${nome}\nEmail: ${email}\n\nMensagem:\n${mensagem}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
