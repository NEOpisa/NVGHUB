import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { nome, email, mensagem } = await req.json();

    if (!nome || !email || !mensagem) {
      return NextResponse.json(
        { error: "Preencha todos os campos." },
        { status: 400 }
      );
    }

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_KEY,
        subject: `Novo contato pelo site — ${nome}`,
        from_name: nome,
        name: nome,
        email,
        message: mensagem,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      console.error("[contato]", data);
      return NextResponse.json(
        { error: "Falha ao enviar. Tente pelo WhatsApp." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contato]", err);
    return NextResponse.json(
      { error: "Falha ao enviar. Tente pelo WhatsApp." },
      { status: 500 }
    );
  }
}
