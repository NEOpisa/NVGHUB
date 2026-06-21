"use client";

import { useEffect, useRef, useState } from "react";

export type LeadItem = { label: string; price: number | null };

type Props = {
  open: boolean;
  onClose: () => void;
  /** "orcamento" | "pacote" — de onde veio o lead. */
  origem: string;
  /** Rótulo do tipo (ex.: "Orçamento sob medida", "Pacote Sistema"). */
  tipo: string;
  /** Itens selecionados, exibidos como resumo. */
  itens: LeadItem[];
  /** Total estimado em BRL (null quando não há preço fechado). */
  valor: number | null;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LeadModal({ open, onClose, origem, tipo, itens, valor }: Props) {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", empresa: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Reseta ao abrir e bloqueia o scroll do fundo.
  useEffect(() => {
    if (!open) return;
    setStatus("idle");
    setErrorMsg("");
    setForm({ nome: "", email: "", telefone: "", empresa: "" });
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstFieldRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (status === "err") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = form.email.trim();
    const telefone = form.telefone.trim();
    if (!email && !telefone) {
      setStatus("err");
      setErrorMsg("Informe pelo menos um e-mail ou telefone para a gente te retornar.");
      return;
    }
    if (email && !EMAIL_RE.test(email)) {
      setStatus("err");
      setErrorMsg("O e-mail informado não parece válido.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome.trim(),
          email,
          telefone,
          empresa: form.empresa,
          origem,
          tipo,
          itens,
          valor,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("ok");
      } else {
        setStatus("err");
        setErrorMsg(data.error ?? "Não foi possível enviar agora.");
      }
    } catch {
      setStatus("err");
      setErrorMsg("Não foi possível enviar. Verifique sua conexão.");
    }
  };

  return (
    <div className="lead-overlay" onClick={onClose} role="presentation">
      <div
        className="lead-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="lead-close" onClick={onClose} aria-label="Fechar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {status === "ok" ? (
          <div className="lead-success">
            <div className="lead-success-icon" aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h3 id="lead-modal-title" className="lead-title">Recebido!</h3>
            <p className="lead-sub">
              Sua solução já está com a nossa equipe. A gente te chama pelo contato informado em até <strong>3 horas úteis</strong>.
            </p>
            <ol className="lead-success-steps">
              <li><span className="lead-step-n">1</span> Analisamos o seu diagnóstico</li>
              <li><span className="lead-step-n">2</span> Montamos a proposta sob medida</li>
              <li><span className="lead-step-n">3</span> Falamos com você no WhatsApp</li>
            </ol>
            <button className="form-submit" onClick={onClose}>Fechar</button>
          </div>
        ) : (
          <>
            <h3 id="lead-modal-title" className="lead-title">Quase lá!</h3>
            <p className="lead-sub">
              Deixa um contato e a equipe te chama com a sua solução sob medida. Sem compromisso.
            </p>

            {itens.length > 0 && (
              <div className="lead-resumo">
                <div className="lead-resumo-label">{tipo}</div>
                <ul className="lead-resumo-list">
                  {itens.map((i) => (
                    <li key={i.label}>
                      <span>{i.label}</span>
                      {i.price != null && <span className="lead-resumo-price">R$ {i.price.toLocaleString("pt-BR")}</span>}
                    </li>
                  ))}
                </ul>
                {valor != null && (
                  <div className="lead-resumo-total">
                    <span>Total estimado</span>
                    <strong>R$ {valor.toLocaleString("pt-BR")}</strong>
                  </div>
                )}
              </div>
            )}

            <form className="lead-form" onSubmit={handleSubmit} noValidate>
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
                <label className="form-label" htmlFor="lead-nome">Seu nome <span className="lead-opt">(opcional)</span></label>
                <input
                  ref={firstFieldRef}
                  className="form-input"
                  type="text"
                  id="lead-nome"
                  name="nome"
                  placeholder="Como quer ser chamado?"
                  autoComplete="name"
                  value={form.nome}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="lead-email">E-mail</label>
                <input
                  className="form-input"
                  type="email"
                  id="lead-email"
                  name="email"
                  placeholder="seu@email.com"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="lead-telefone">WhatsApp / Telefone</label>
                <input
                  className="form-input"
                  type="tel"
                  id="lead-telefone"
                  name="telefone"
                  placeholder="(21) 99999-9999"
                  autoComplete="tel"
                  value={form.telefone}
                  onChange={handleChange}
                />
              </div>
              <p className="lead-hint">Informe e-mail ou telefone — o que for melhor pra você.</p>

              {status === "err" && <div className="form-message error">{errorMsg}</div>}

              <button className="form-submit" type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Enviando..." : "Quero que me chamem"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
