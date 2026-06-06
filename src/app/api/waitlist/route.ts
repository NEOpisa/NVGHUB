import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "E-mail obrigatório." },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "NEOVANGUARD Site <onboarding@resend.dev>",
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
    console.error("[waitlist]", err);
    return NextResponse.json(
      { error: "Falha ao registrar." },
      { status: 500 }
    );
  }
}
