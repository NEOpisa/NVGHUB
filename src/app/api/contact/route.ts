import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { nome, email, mensagem } = await req.json();

    if (!nome || !email || !mensagem) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando.' }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: 'Neovanguard <contato@neovanguard.com.br>',
      to: 'comercial@neovanguard.com',
      replyTo: email,
      subject: `Novo contato de ${nome}`,
      text: `Nome: ${nome}\nEmail: ${email}\n\nMensagem:\n${mensagem}`,
    });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: 'Erro ao enviar e-mail.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
