import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "E-mail obrigatório." },
        { status: 400 }
      );
    }

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_KEY,
        subject: "Nova inscrição na lista de espera — SaaS",
        from_name: "Lista de Espera SaaS",
        name: "Lista de Espera",
        email,
        message: `${email} se inscreveu na lista de espera do SaaS NEOVANGUARD.`,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      console.error("[waitlist]", data);
      return NextResponse.json(
        { error: "Falha ao registrar." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[waitlist]", err);
    return NextResponse.json(
      { error: "Falha ao registrar." },
      { status: 500 }
    );
  }
}
