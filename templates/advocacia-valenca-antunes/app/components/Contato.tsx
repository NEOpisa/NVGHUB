"use client";

import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";

export default function Contato() {
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviado(true);
  }

  return (
    <section className="contato" id="contato">
      <div className="wrap cont-grid">
        <Reveal className="cont-info">
          <p className="art">Art. 05 — Contato</p>
          <h2 style={{ fontSize: "clamp(1.9rem,3.4vw,2.6rem)" }}>Vamos analisar o seu caso</h2>
          <p style={{ marginTop: "16px" }}>
            Preencha o formulário e nossa equipe retorna em até um dia útil com os próximos passos
            — ou agende diretamente uma reunião online.
          </p>
          <ul>
            <li>
              <b>Endereço</b> [Endereço completo] — [Bairro, Cidade - UF]
            </li>
            <li>
              <b>Telefone</b> (00) 00000-0000 · WhatsApp Business
            </li>
            <li>
              <b>E-mail</b> contato@seudominio.com.br
            </li>
            <li>
              <b>Horário</b> Segunda a sexta, 9h às 18h
            </li>
          </ul>
        </Reveal>
        <Reveal as="form" className="qualif" onSubmit={handleSubmit}>
          <h3>Formulário de atendimento</h3>
          <p className="sub">As respostas direcionam seu caso ao sócio responsável pela área.</p>
          <div className="row2">
            <div className="field">
              <label htmlFor="nome">Nome</label>
              <input id="nome" required />
            </div>
            <div className="field">
              <label htmlFor="email">E-mail corporativo</label>
              <input id="email" type="email" required />
            </div>
          </div>
          <div className="row2">
            <div className="field">
              <label htmlFor="dem">Tipo de demanda</label>
              <select id="dem" required defaultValue="">
                <option value="">Selecionar…</option>
                <option>Tributário</option>
                <option>Trabalhista</option>
                <option>Societário / M&amp;A</option>
                <option>Contratos</option>
                <option>Compliance / LGPD</option>
                <option>Recuperação de crédito</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="porte">Porte da empresa</label>
              <select id="porte" required defaultValue="">
                <option value="">Selecionar…</option>
                <option>MEI / Autônomo</option>
                <option>Até R$ 4,8 mi/ano</option>
                <option>R$ 4,8 mi – 30 mi/ano</option>
                <option>Acima de R$ 30 mi/ano</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="msg">Resumo do caso</label>
            <textarea id="msg" placeholder="Descreva brevemente a situação"></textarea>
          </div>
          <button className="btn solid" type="submit" style={{ width: "100%", justifyContent: "center" }}>
            {enviado ? "Enviado ✓" : "Enviar e agendar reunião"}
          </button>
          <div className={`ok${enviado ? " show" : ""}`} id="ok-msg">
            ✓ Recebido. Você receberá no e-mail o link para escolher o horário da reunião online.
          </div>
          <p style={{ fontSize: ".72rem", color: "#8A93A0", marginTop: "14px" }}>
            Seus dados são tratados conforme a LGPD e nossa Política de Privacidade. Comunicação
            protegida por criptografia SSL.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
