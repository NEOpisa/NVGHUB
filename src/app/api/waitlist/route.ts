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
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "E-mail obrigatório." },
        { status: 400 }
      );
    }

    const transporter = createTransport();
    await transporter.verify();

    await transporter.sendMail({
      from: `"NEOVANGUARD Site" <${process.env.SMTP_USER}>`,
      to: "comercial@neovanguard.com.br",
      replyTo: email,
      subject: "Nova inscrição na lista de espera — SaaS",
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
          <h2 style="color:#7c3aed">Nova inscrição na lista de espera SaaS</h2>
          <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr style="margin-top:24px;border:none;border-top:1px solid #eee"/>
          <p style="font-size:12px;color:#999">Enviado via neovanguard.com.br</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[waitlist] erro SMTP:", err);
    return NextResponse.json(
      { error: "Falha ao registrar." },
      { status: 500 }
    );
  }
}
