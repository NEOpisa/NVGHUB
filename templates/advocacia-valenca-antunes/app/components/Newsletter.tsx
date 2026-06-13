"use client";

import { useState } from "react";
import Reveal from "./Reveal";

export default function Newsletter() {
  const [inscrito, setInscrito] = useState(false);

  return (
    <div className="wrap">
      <Reveal as="section" className="news">
        <h2>Boletim jurídico mensal</h2>
        <p>
          Uma análise por mês sobre o que muda na lei e impacta o seu negócio. Sem spam — apenas o
          essencial.
        </p>
        <div className="news-form">
          <input type="email" placeholder="Seu e-mail corporativo" aria-label="E-mail para newsletter" />
          <button className="btn solid" type="button" onClick={() => setInscrito(true)}>
            {inscrito ? "Inscrito ✓" : "Assinar"}
          </button>
        </div>
      </Reveal>
    </div>
  );
}
