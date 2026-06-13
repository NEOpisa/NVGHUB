"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const servicos = [
  "Design de sobrancelhas",
  "Extensão de cílios",
  "Limpeza de pele",
  "Nails design",
  "Lash lifting",
  "Pacote [Nome do Studio] Day",
];

const profissionais = [
  "Qualquer disponível",
  "[Nome da Profissional]",
  "[Nome da Profissional]",
  "[Nome da Profissional]",
  "[Nome da Profissional]",
];

const horarios = ["9:00", "10:30", "13:00", "14:30", "16:00", "17:30", "19:00", "20:00"];

export default function Agendar() {
  const [slot, setSlot] = useState<string | null>(null);
  const [confirmado, setConfirmado] = useState(false);

  const confirmar = () => {
    setConfirmado(true);
  };

  return (
    <section className="book" id="agendar">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">Agendamento online</p>
          <h2 style={{ fontSize: "clamp(2rem,4vw,2.8rem)" }}>
            Seu horário em 30 segundos
          </h2>
          <p style={{ marginTop: "14px", color: "var(--soft)" }}>
            Escolha o serviço, a profissional e o horário disponível em tempo
            real. A confirmação chega no seu WhatsApp — e se abrir um horário
            antes, a lista de espera te avisa.
          </p>
        </Reveal>
        <Reveal>
          <div className="r2">
            <div className="fld">
              <label htmlFor="sv">Serviço</label>
              <select id="sv">
                {servicos.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="fld">
              <label htmlFor="pf">Profissional</label>
              <select id="pf">
                {profissionais.map((p, i) => (
                  <option key={i}>{p}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="fld">
            <label htmlFor="dt">Data</label>
            <input id="dt" type="date" />
          </div>
          <div className="fld">
            <label>Horários disponíveis</label>
            <div className="slots" id="slots">
              {horarios.map((h) => (
                <div
                  key={h}
                  className={`slot${slot === h ? " sel" : ""}`}
                  onClick={() => setSlot(h)}
                >
                  {h}
                </div>
              ))}
            </div>
          </div>
          <div className="fld">
            <label htmlFor="wp">Seu WhatsApp</label>
            <input id="wp" placeholder="(00) 00000-0000" />
          </div>
          <button
            className="btn"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={confirmar}
          >
            Confirmar agendamento
          </button>
          <div className={`okmsg${confirmado ? " show" : ""}`} id="bok">
            ✓ Horário reservado! A confirmação já está a caminho do seu
            WhatsApp. 💛
          </div>
        </Reveal>
      </div>
    </section>
  );
}
