"use client";

import { useState } from "react";
import { useStore } from "@/app/context/StoreContext";

type Aviso = { texto: string; cor: string } | null;

export default function Encomendas() {
  const { showToast } = useStore();
  const [aviso, setAviso] = useState<Aviso>(null);

  function verificarData(val: string) {
    if (!val) {
      setAviso(null);
      return;
    }
    const hoje = new Date();
    const data = new Date(val);
    const diff = Math.round(
      (data.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diff < 5) {
      setAviso({
        texto:
          "Esta data é muito próxima. Precisamos de no mínimo 5 dias úteis. Entre em contato pelo WhatsApp para verificar disponibilidade.",
        cor: "#E65100",
      });
    } else if (diff < 15) {
      setAviso({
        texto:
          "Data disponível! Lembrando que sinal de 50% confirma a agenda.",
        cor: "#2E7D32",
      });
    } else {
      setAviso({
        texto: "Ótima escolha de data! Temos disponibilidade.",
        cor: "#2E7D32",
      });
    }
  }

  function enviarEncomenda() {
    showToast("Redirecionando para o WhatsApp...");
    setTimeout(
      () =>
        window.open(
          "https://wa.me/5500000000000?text=Olá!+Gostaria+de+solicitar+um+orçamento+de+encomenda.",
          "_blank"
        ),
      800
    );
  }

  return (
    <section id="encomendas">
      <p className="section-eyebrow">✦ Especial para você</p>
      <h2 className="section-title">
        Bolos e <em>encomendas</em>
      </h2>
      <div className="encomendas-layout">
        <div className="encomenda-img"></div>
        <div>
          <div className="notice">
            <span>
              Encomendas precisam de no mínimo <strong>5 dias úteis</strong>{" "}
              de antecedência. Para datas especiais como casamentos,
              recomendamos 15 dias. Um sinal de 50% é necessário para
              confirmar a agenda.
            </span>
          </div>
          <div className="encomenda-form">
            <div className="form-row">
              <label>Nome completo</label>
              <input type="text" placeholder="Seu nome" />
            </div>
            <div className="form-row">
              <label>WhatsApp</label>
              <input type="tel" placeholder="(00) 00000-0000" />
            </div>
            <div className="form-row">
              <label>Tipo de encomenda</label>
              <select>
                <option>Bolo de aniversário</option>
                <option>Bolo de casamento</option>
                <option>Bolo temático</option>
                <option>Caixa de doces finos</option>
                <option>Kit festa salgados</option>
                <option>Cesta personalizada</option>
              </select>
            </div>
            <div className="form-row">
              <label>Data do evento</label>
              <input
                type="date"
                id="data-evento"
                onChange={(e) => verificarData(e.target.value)}
              />
              {aviso && (
                <div
                  id="data-aviso"
                  style={{
                    display: "",
                    marginTop: "0.4rem",
                    fontSize: "0.8rem",
                    color: aviso.cor,
                  }}
                >
                  {aviso.texto}
                </div>
              )}
            </div>
            <div className="form-row">
              <label>Número de porções</label>
              <select>
                <option>10–15 porções</option>
                <option>16–25 porções</option>
                <option>26–40 porções</option>
                <option>41–60 porções</option>
                <option>60+ porções</option>
              </select>
            </div>
            <div className="form-row">
              <label>Detalhes e preferências</label>
              <textarea
                placeholder="Sabor, tema, cores, recheio, alergias, inspirações..."
                rows={3}
              ></textarea>
            </div>
            <button
              className="btn-primary full-btn"
              onClick={enviarEncomenda}
            >
              Solicitar orçamento via WhatsApp →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
