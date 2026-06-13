"use client";

import { useState } from "react";
import Reveal from "./Reveal";

export default function Agendar() {
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviado(true);
  }

  return (
    <section className="agendar" id="agendar">
      <div className="wrap">
        <Reveal as="div">
          <p className="eyebrow">Agendamento online</p>
          <h2>Sua avaliação em menos de um minuto</h2>
          <ol className="steps">
            <li>
              <b>01</b> Escolha a especialidade e o melhor horário na agenda
              em tempo real.
            </li>
            <li>
              <b>02</b> Receba a confirmação e o lembrete automático no seu
              WhatsApp.
            </li>
            <li>
              <b>03</b> Preencha a pré-anamnese digital em casa e chegue
              direto para o atendimento.
            </li>
            <li>
              <b>04</b> Acompanhe histórico, documentos e retornos na área do
              paciente.
            </li>
          </ol>
        </Reveal>
        <form id="form-agendar" onSubmit={handleSubmit}>
          <h3>Agende sua avaliação</h3>
          <p className="sub">
            Retornamos a confirmação no WhatsApp em poucos minutos.
          </p>
          <div className="field">
            <label htmlFor="nome">Nome completo</label>
            <input id="nome" required placeholder="Seu nome" />
          </div>
          <div className="row2">
            <div className="field">
              <label htmlFor="tel">WhatsApp</label>
              <input id="tel" required placeholder="(11) 9 0000-0000" />
            </div>
            <div className="field">
              <label htmlFor="esp">Especialidade</label>
              <select id="esp" required defaultValue="">
                <option value="">Selecionar…</option>
                <option>Implantes</option>
                <option>Lentes de contato</option>
                <option>Ortodontia</option>
                <option>Harmonização</option>
                <option>Prevenção / limpeza</option>
                <option>Outra</option>
              </select>
            </div>
          </div>
          <div className="row2">
            <div className="field">
              <label htmlFor="data">Data preferida</label>
              <input id="data" type="date" required />
            </div>
            <div className="field">
              <label htmlFor="hora">Período</label>
              <select id="hora" required defaultValue="">
                <option value="">Selecionar…</option>
                <option>Manhã</option>
                <option>Tarde</option>
                <option>Fim do dia</option>
              </select>
            </div>
          </div>
          <button className="btn gold" type="submit">
            {enviado ? "Agendamento enviado ✓" : "Confirmar agendamento"}
          </button>
          <div className={`ok${enviado ? " show" : ""}`} id="msg-ok">
            ✓ Pedido recebido! Em instantes você recebe a confirmação e o link
            da pré-anamnese no seu WhatsApp.
          </div>
        </form>
      </div>
    </section>
  );
}
