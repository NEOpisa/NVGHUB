"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { track } from "@/lib/fpixel";

type Campo = "nome" | "email" | "mensagem";

const VAZIO = { nome: "", email: "", mensagem: "", empresa: "" };

/** Formulário de contato — mesma validação amigável de antes, markup novo. */
export default function ContatoForm() {
  const router = useRouter();
  const [form, setForm] = useState(VAZIO);
  const [erros, setErros] = useState<Partial<Record<Campo, string>>>({});
  const [tocado, setTocado] = useState<Partial<Record<Campo, boolean>>>({});
  const [estado, setEstado] = useState<"idle" | "enviando" | "erro">("idle");
  const [msgErro, setMsgErro] = useState("");

  const valida = (campo: Campo, valor: string): string => {
    const v = valor.trim();
    if (campo === "nome") return v.length < 2 ? "Como podemos te chamar?" : "";
    if (campo === "email")
      return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
        ? "Confira o e-mail — parece incompleto."
        : "";
    return v.length < 10 ? "Conte um pouquinho mais (mín. 10 caracteres)." : "";
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (estado === "erro") setEstado("idle");
    if (tocado[name as Campo])
      setErros((x) => ({ ...x, [name]: valida(name as Campo, value) }));
  };

  const onBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setTocado((t) => ({ ...t, [name]: true }));
    setErros((x) => ({ ...x, [name]: valida(name as Campo, value) }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const campos: Campo[] = ["nome", "email", "mensagem"];
    const novos: Partial<Record<Campo, string>> = {};
    campos.forEach((c) => {
      const m = valida(c, form[c]);
      if (m) novos[c] = m;
    });
    setTocado({ nome: true, email: true, mensagem: true });
    setErros(novos);
    const primeiro = campos.find((c) => novos[c]);
    if (primeiro) {
      document.getElementById(primeiro)?.focus();
      return;
    }

    setEstado("enviando");
    setMsgErro("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        track("Contact");
        setForm(VAZIO);
        router.push("/obrigado");
        return;
      }
      setEstado("erro");
      setMsgErro(data.error ?? "Não foi possível enviar sua mensagem.");
    } catch {
      setEstado("erro");
      setMsgErro("Não foi possível enviar. Verifique sua conexão.");
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <label className="field" htmlFor="nome">
        <span>Nome</span>
        <input
          id="nome"
          name="nome"
          value={form.nome}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete="name"
          placeholder="Como podemos te chamar?"
          aria-invalid={!!erros.nome}
        />
        {erros.nome && <em className="field-err">{erros.nome}</em>}
      </label>

      <label className="field" htmlFor="email">
        <span>E-mail</span>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete="email"
          placeholder="voce@empresa.com.br"
          aria-invalid={!!erros.email}
        />
        {erros.email && <em className="field-err">{erros.email}</em>}
      </label>

      <label className="field" htmlFor="mensagem">
        <span>O que você precisa</span>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={5}
          value={form.mensagem}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Conte o problema que quer resolver — quanto mais concreto, melhor."
          aria-invalid={!!erros.mensagem}
        />
        {erros.mensagem && <em className="field-err">{erros.mensagem}</em>}
      </label>

      {/* honeypot: bot preenche, humano nunca vê */}
      <input
        className="hp"
        name="empresa"
        tabIndex={-1}
        autoComplete="off"
        value={form.empresa}
        onChange={onChange}
        aria-hidden="true"
      />

      <div className="pill-row">
        <button type="submit" className="pill pill--accent" disabled={estado === "enviando"}>
          {estado === "enviando" ? "Enviando…" : "Enviar mensagem"}
        </button>
      </div>

      {estado === "erro" && (
        <p className="field-err" role="alert">
          {msgErro}
        </p>
      )}
      <p className="form-note">
        Respondemos em até 3h úteis. Seus dados ficam só com a gente.
      </p>
    </form>
  );
}
