"use client";

import { useState } from "react";
import Reveal from "./Reveal";

type TipoDesligamento = "semjusta" | "pedido" | "acordo";

export default function Calculadora() {
  const [salario, setSalario] = useState("");
  const [anos, setAnos] = useState("");
  const [tipo, setTipo] = useState<TipoDesligamento>("semjusta");
  const [resultado, setResultado] = useState<string | null>(null);
  const [erroSalario, setErroSalario] = useState(false);

  function calcular() {
    const sal = parseFloat(salario) || 0;
    const anosNum = parseFloat(anos) || 0;

    if (!sal) {
      setErroSalario(true);
      return;
    }
    setErroSalario(false);

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
        <Reveal className="calc-copy">
          <h2>Calculadora de verbas rescisórias</h2>
          <p>
            Estime as verbas rescisórias de um colaborador em segundos. O cálculo oficial é feito
            pelo escritório após análise do caso concreto.
          </p>
          <p className="extras">
            Também disponíveis: <u>simulador do Simples Nacional</u> e <u>cálculo de pró-labore</u>.
          </p>
        </Reveal>
        <Reveal className="guia">
          <div className="guia-cab">
            <b>Guia de cálculo nº 001</b>
            <span>Uso livre</span>
          </div>
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
              aria-invalid={erroSalario || undefined}
              aria-describedby={erroSalario ? "sal-erro" : undefined}
              onChange={(e) => {
                setSalario(e.target.value);
                setErroSalario(false);
              }}
            />
            {erroSalario && (
              <span id="sal-erro" className="erro-msg">
                Informe o salário mensal para calcular.
              </span>
            )}
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
          <div className={`resultado${resultado !== null ? " show" : ""}`} aria-live="polite">
            <b>{resultado ?? "R$ 0,00"}</b>
            <span>Total estimado de verbas</span>
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
