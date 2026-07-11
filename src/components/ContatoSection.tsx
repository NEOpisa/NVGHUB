"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useReveal } from "@/hooks/useReveal";
import { WhatsAppIcon } from "@/components/icons";
import { WA } from "@/lib/constants";
import { track } from "@/lib/fpixel";

export default function ContatoSection() {
  const router = useRouter();
  const headerRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  useReveal(headerRef);
  useReveal(wrapRef, 100);

  const [form, setForm] = useState({ nome: "", email: "", mensagem: "", empresa: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // validação amigável por campo (mensagens curtas, tom da marca)
  const validateField = (name: string, value: string): string => {
    const v = value.trim();
    if (name === "nome") return v.length < 2 ? "Como podemos te chamar?" : "";
    if (name === "email")
      return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Confira o e-mail — parece incompleto." : "";
    if (name === "mensagem")
      return v.length < 10 ? "Conte um pouquinho mais (mín. 10 caracteres)." : "";
    return "";
  };
  const validateAll = () => {
    const errs: Record<string, string> = {};
    (["nome", "email", "mensagem"] as const).forEach((k) => {
      const msg = validateField(k, form[k]);
      if (msg) errs[k] = msg;
    });
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (status === "err") setStatus("idle");
    // revalida em tempo real só depois que o campo já foi tocado
    if (touched[name])
      setFieldErrors((fe) => ({ ...fe, [name]: validateField(name, value) }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setFieldErrors((fe) => ({ ...fe, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // valida tudo antes de enviar; foca o primeiro campo inválido
    const errs = validateAll();
    setTouched({ nome: true, email: true, mensagem: true });
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      const first = ["nome", "email", "mensagem"].find((k) => errs[k]);
      if (first) document.getElementById(first)?.focus();
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        track("Contact");
        setForm({ nome: "", email: "", mensagem: "", empresa: "" });
        // pós-conversão dedicada (#050): melhor tracking + próximos passos
        router.push("/obrigado");
      } else {
        setStatus("err");
        setErrorMsg(data.error ?? "Não foi possível enviar sua mensagem.");
      }
    } catch {
      setStatus("err");
      setErrorMsg("Não foi possível enviar sua mensagem. Verifique sua conexão.");
    }
  };

  return (
    <section id="contato" aria-label="Contato">
      <div className="inner">
        <div ref={headerRef} data-parallax="0.1">
          <span className="section-eyebrow">Contato</span>
          <h2 className="section-heading" data-split>
            Vamos <span className="text-accent-nvg">começar?</span>
          </h2>
          <p className="section-sub">
            Sem compromisso, sem enrolação. Conte o que precisa e respondemos rápido.
          </p>
        </div>

        <div className="contact-wrap" ref={wrapRef}>

          <div className="contact-info">
            <div>
              <div className="contact-info-title">Prefere pelo WhatsApp?</div>
              <p className="contact-info-text" style={{ marginTop: "10px" }}>
                Resposta mais rápida, conversa mais direta. Mande mensagem agora e falamos ainda hoje.
              </p>
            </div>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="contact-whatsapp">
              <WhatsAppIcon size={18} />
              Falar pelo WhatsApp
            </a>
            <div className="contact-meta">
              <span className="contact-meta-item">
                <PinIcon />
                Brasil — atendimento nacional
              </span>
              <span className="contact-meta-item">
                <ClockIcon />
                Resposta em até 3 horas úteis
              </span>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>

            <input
              type="text"
              name="empresa"
              value={form.empresa}
              onChange={handleChange}
              className="form-honeypot"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <div className="form-group">
              <label className="form-label" htmlFor="nome">Seu nome</label>
              <input
                className="form-input"
                type="text"
                id="nome"
                name="nome"
                placeholder="Como quer ser chamado?"
                autoComplete="name"
                enterKeyHint="next"
                required
                aria-invalid={!!fieldErrors.nome}
                aria-describedby={fieldErrors.nome ? "err-nome" : undefined}
                value={form.nome}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="field-error" id="err-nome" role="alert">
                {fieldErrors.nome ?? ""}
              </span>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">E-mail</label>
              <input
                className="form-input"
                type="email"
                id="email"
                name="email"
                placeholder="seu@email.com"
                autoComplete="email"
                inputMode="email"
                enterKeyHint="next"
                required
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "err-email" : undefined}
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="field-error" id="err-email" role="alert">
                {fieldErrors.email ?? ""}
              </span>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="mensagem">O que você precisa?</label>
              <textarea
                className="form-textarea"
                id="mensagem"
                name="mensagem"
                placeholder="Conte um pouco sobre seu negócio e o que está buscando..."
                required
                aria-invalid={!!fieldErrors.mensagem}
                aria-describedby={fieldErrors.mensagem ? "err-mensagem" : undefined}
                value={form.mensagem}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="field-error" id="err-mensagem" role="alert">
                {fieldErrors.mensagem ?? ""}
              </span>
            </div>

            {status === "ok" && (
              <div className="form-message success">
                ✓ Mensagem enviada! Retornaremos em breve.
              </div>
            )}
            {status === "err" && (
              <div className="form-message error">
                {errorMsg} Tente novamente ou fale pelo WhatsApp.
              </div>
            )}

            <button
              className="form-submit"
              type="submit"
              disabled={status === "loading" || status === "ok"}
            >
              {status === "loading" ? "Enviando..." : "Enviar mensagem"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}
