"use client";

import { useEffect, useMemo, useState } from "react";
import { agenda, equipe, rituais, site } from "../site.config";
import Reveal from "./Reveal";

/* Agendamento sem backend: as escolhas viram uma mensagem de WhatsApp
   pré-montada — o canal onde o agendamento realmente acontece no Brasil.
   A cliente vê a mensagem exata antes de enviar. */

const QUALQUER = "Qualquer disponível";

function dataBonita(iso: string) {
  if (!iso) return "";
  const [a, m, d] = iso.split("-").map(Number);
  return new Date(a, m - 1, d).toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  });
}

export default function Agendar() {
  const [ritual, setRitual] = useState<string | null>(null);
  const [quem, setQuem] = useState(QUALQUER);
  const [data, setData] = useState("");
  const [hora, setHora] = useState<string | null>(null);

  // O menu de rituais pré-seleciona o serviço ao clicar numa linha.
  useEffect(() => {
    const onRitual = (e: Event) =>
      setRitual((e as CustomEvent<string>).detail);
    window.addEventListener("aura:ritual", onRitual);
    return () => window.removeEventListener("aura:ritual", onRitual);
  }, []);

  const completo = Boolean(ritual && data && hora);

  const mensagem = useMemo(() => {
    const linhas: string[] = [agenda.saudacao];
    if (ritual) linhas.push(`✦ Ritual: ${ritual}`);
    if (quem !== QUALQUER) linhas.push(`✦ Com: ${quem}`);
    if (data) linhas.push(`✦ Data: ${dataBonita(data)}`);
    if (hora) linhas.push(`✦ Horário: ${hora}`);
    linhas.push("Pode confirmar pra mim?");
    return linhas.join("\n");
  }, [ritual, quem, data, hora]);

  const enviar = () => {
    if (!completo) return;
    window.open(
      `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensagem)}`,
      "_blank",
      "noopener"
    );
  };

  const hoje = new Date().toISOString().slice(0, 10);

  return (
    <section className="agendar" id="agendar">
      <div className="wrap agendar-grid">
        <Reveal className="agendar-copy">
          <h2>
            Reserve sem sair <em>do site.</em>
          </h2>
          <p>
            Monte o seu horário em três escolhas. A mensagem chega pronta no
            nosso WhatsApp — você só confirma o envio.
          </p>

          <div className="wa-preview" aria-live="polite">
            <span className="quem">
              <svg viewBox="0 0 32 32" aria-hidden>
                <path d="M16 3C9.4 3 4 8.4 4 15c0 2.4.7 4.6 1.9 6.5L4 29l7.7-1.8c1.8 1 3.8 1.5 5.9 1.5 6.6 0 12-5.4 12-12S22.6 3 16 3z" />
              </svg>
              Sua mensagem
            </span>
            {completo ? (
              <p>
                {agenda.saudacao}
                {"\n"}
                <b>✦ Ritual: {ritual}</b>
                {quem !== QUALQUER && (
                  <>
                    {"\n"}
                    <b>✦ Com: {quem}</b>
                  </>
                )}
                {"\n"}
                <b>✦ Data: {dataBonita(data)}</b>
                {"\n"}
                <b>✦ Horário: {hora}</b>
                {"\n"}Pode confirmar pra mim?
              </p>
            ) : (
              <p className="vazio">
                Escolha o ritual, a data e o horário ao lado — a mensagem se
                escreve sozinha aqui.
              </p>
            )}
          </div>
        </Reveal>

        <Reveal
          as="form"
          className="agendar-form"
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            enviar();
          }}
        >
          <fieldset>
            <legend>
              <i>1</i>O ritual
            </legend>
            <div className="chips">
              {rituais.map((r) => (
                <button
                  type="button"
                  key={r.nome}
                  className="chip"
                  aria-pressed={ritual === r.nome}
                  onClick={() => setRitual(r.nome)}
                >
                  {r.nome}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <i>2</i>Com quem
            </legend>
            <div className="chips">
              {[QUALQUER, ...equipe.map((p) => p.nome)].map((nome) => (
                <button
                  type="button"
                  key={nome}
                  className="chip"
                  aria-pressed={quem === nome}
                  onClick={() => setQuem(nome)}
                >
                  {nome}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <i>3</i>Quando
            </legend>
            <div className="quando">
              <input
                className="campo-data"
                type="date"
                min={hoje}
                value={data}
                onChange={(e) => setData(e.target.value)}
                aria-label="Escolha a data"
              />
              <div className="chips">
                {agenda.horarios.map((h) => (
                  <button
                    type="button"
                    key={h}
                    className="chip"
                    aria-pressed={hora === h}
                    onClick={() => setHora(h)}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          </fieldset>

          <button className="btn btn-full" type="submit" disabled={!completo}>
            Confirmar no WhatsApp
            <svg viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M4 12h15m0 0-6-6m6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <p className="agendar-nota">
            Sem taxas, sem cadastro, sem app — a conversa acontece no seu
            WhatsApp.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
