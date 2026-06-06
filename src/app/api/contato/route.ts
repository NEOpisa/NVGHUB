import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.hostinger.com",
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function POST(req: Request) {
  try {
    const { nome, email, mensagem } = await req.json();

    if (!nome || !email || !mensagem) {
      return NextResponse.json(
        { error: "Preencha todos os campos." },
        { status: 400 }
      );
    }

    const transporter = createTransport();
    await transporter.verify();

    await transporter.sendMail({
      from: `"NEOVANGUARD Site" <${process.env.SMTP_USER}>`,
      to: "comercial@neovanguard.com.br",
      replyTo: email,
      subject: `Novo contato pelo site — ${nome}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
          <h2 style="color:#7c3aed">Novo contato pelo site</h2>
          <p><strong>Nome:</strong> ${nome}</p>
          <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Mensagem:</strong></p>
          <blockquote style="border-left:3px solid #7c3aed;margin:0;padding:8px 16px;color:#555">
            ${mensagem.replace(/\n/g, "<br>")}
          </blockquote>
          <hr style="margin-top:24px;border:none;border-top:1px solid #eee"/>
          <p style="font-size:12px;color:#999">Enviado via neovanguard.com.br</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contato] erro SMTP:", err);
    return NextResponse.json(
      { error: "Falha ao enviar. Tente pelo WhatsApp." },
      { status: 500 }
    );
  }
}
