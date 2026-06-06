"use client";

import { useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const WA = "https://wa.me/qr/YDKPLNZS2ZDBC1";

export default function ContatoSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  useReveal(headerRef);
  useReveal(wrapRef, 100);

  const [form, setForm] = useState({ nome: "", email: "", mensagem: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("err");
  };

  return (
    <section id="contato" aria-label="Contato">
      <div className="inner">
        <div ref={headerRef}>
          <span className="section-eyebrow">Contato</span>
          <h2 className="section-heading">
            Bora <span className="text-accent-nvg">começar?</span>
          </h2>
          <p className="section-sub">
            Sem compromisso, sem enrolação. Conta o que precisa e a gente responde rápido.
          </p>
        </div>

        <div className="contact-wrap" ref={wrapRef}>
          {/* Left — WhatsApp info */}
          <div className="contact-info">
            <div>
              <div className="contact-info-title">Prefere pelo WhatsApp?</div>
              <p className="contact-info-text" style={{ marginTop: "10px" }}>
                Resposta mais rápida, conversa mais direta. Manda mensagem agora e a gente fala hoje.
              </p>
            </div>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="contact-whatsapp">
              <WhatsAppIcon />
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

          {/* Right — form */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
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
                Em construção. Tente pelo WhatsApp.
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

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
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
