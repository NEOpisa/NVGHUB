"use client";

import { useState } from "react";
import Reveal from "./Reveal";

type TipoDesligamento = "semjusta" | "pedido" | "acordo";

export default function Calculadora() {
  const [salario, setSalario] = useState("");
  const [anos, setAnos] = useState("");
  const [tipo, setTipo] = useState<TipoDesligamento>("semjusta");
  const [resultado, setResultado] = useState<string | null>(null);

  function calcular() {
    const sal = parseFloat(salario) || 0;
    const anosNum = parseFloat(anos) || 0;

    if (!sal) return;

    const fgtsAcum = sal * 0.08 * 12 * anosNum;
    let total = sal; // saldo aproximado (1 mês)
    total += (sal / 12) * 6; // 13º proporcional (~6 meses)
    total += (sal / 12) * 6 * 1.3333; // férias proporcionais + 1/3

    if (tipo === "semjusta") {
      total += sal; // aviso
      total += fgtsAcum * 0.4; // multa 40%
    }
    if (tipo === "acordo") {
      total += sal / 2; // metade do aviso
      total += fgtsAcum * 0.2; // multa 20%
    }

    setResultado(total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }));
  }

  return (
    <section className="calc-sec" id="calc">
      <div className="wrap calc-grid">
        <Reveal>
          <p className="art">Art. 03 — Ferramentas</p>
          <h2 style={{ fontSize: "clamp(1.9rem,3.4vw,2.6rem)" }}>
            Calculadora de verbas rescisórias
          </h2>
          <p style={{ marginTop: "16px" }}>
            Faça uma estimativa imediata e gratuita. Empresas que usam nossas calculadoras recebem
            um relatório completo por e-mail — e nossa equipe à disposição para revisar o cálculo
            oficial.
          </p>
          <p style={{ marginTop: "14px", fontSize: ".9rem" }}>
            Também disponíveis: <u>simulador do Simples Nacional</u> e <u>cálculo de pró-labore</u>.
          </p>
        </Reveal>
        <Reveal className="calc">
          <h3>Estimativa de rescisão</h3>
          <p className="sub">Valores aproximados, sem efeito legal.</p>
          <div className="field">
            <label htmlFor="sal">Salário mensal (R$)</label>
            <input
              id="sal"
              type="number"
              min={0}
              placeholder="3500"
              value={salario}
              onChange={(e) => setSalario(e.target.value)}
            />
          </div>
          <div className="row2">
            <div className="field">
              <label htmlFor="anos">Anos de empresa</label>
              <input
                id="anos"
                type="number"
                min={0}
                placeholder="4"
                value={anos}
                onChange={(e) => setAnos(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="tipo">Tipo de desligamento</label>
              <select
                id="tipo"
                value={tipo}
                onChange={(e) => setTipo(e.target.value as TipoDesligamento)}
              >
                <option value="semjusta">Dispensa sem justa causa</option>
                <option value="pedido">Pedido de demissão</option>
                <option value="acordo">Acordo (art. 484-A)</option>
              </select>
            </div>
          </div>
          <button className="btn solid" onClick={calcular} type="button">
            Calcular estimativa
          </button>
          <div className={`result${resultado !== null ? " show" : ""}`} id="res">
            <b id="res-val">{resultado ?? "R$ 0,00"}</b>
            <span>estimativa total de verbas rescisórias</span>
          </div>
          <p className="disclaim">
            Estimativa simplificada (saldo, aviso, 13º e férias proporcionais, multa do FGTS quando
            aplicável). O cálculo oficial depende do caso concreto.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
