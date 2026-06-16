"use client";

import { useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { WhatsAppIcon } from "@/components/icons";
import { WA } from "@/lib/constants";

export default function ContatoSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  useReveal(headerRef);
  useReveal(wrapRef, 100);

  const [form, setForm] = useState({ nome: "", email: "", mensagem: "", empresa: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (status === "err") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        setStatus("ok");
        setForm({ nome: "", email: "", mensagem: "", empresa: "" });
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
        <div ref={headerRef}>
          <h2 className="section-heading">
            Bora <span className="text-accent-nvg">começar?</span>
          </h2>
          <p className="section-sub">
            Sem compromisso, sem enrolação. Conta o que precisa e a gente responde rápido.
          </p>
        </div>

        <div className="contact-wrap" ref={wrapRef}>

          <div className="contact-info">
            <div>
              <div className="contact-info-title">Prefere pelo WhatsApp?</div>
              <p className="contact-info-text" style={{ marginTop: "10px" }}>
                Resposta mais rápida, conversa mais direta. Manda mensagem agora e a gente fala hoje.
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
                required
                value={form.nome}
                onChange={handleChange}
              />
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
                required
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="mensagem">O que você precisa?</label>
              <textarea
                className="form-textarea"
                id="mensagem"
                name="mensagem"
                placeholder="Conta um pouco sobre seu negócio e o que está buscando..."
                required
                value={form.mensagem}
                onChange={handleChange}
              />
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
