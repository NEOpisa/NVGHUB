"use client";

import { useRef, useState } from "react";

export default function Newsletter() {
  const emailRef = useRef<HTMLInputElement>(null);
  const [inscrito, setInscrito] = useState(false);
  const [erro, setErro] = useState(false);

  function handleAssinar() {
    const input = emailRef.current;
    if (!input || !input.value || !input.validity.valid) {
      setErro(true);
      input?.focus();
      return;
    }
    setErro(false);
    setInscrito(true);
  }

  return (
    <section className="news">
      <div className="wrap">
        <div className="news-inner">
          <div>
            <h2>Boletim jurídico mensal</h2>
            <p>
              Uma análise por mês sobre o que muda na lei e impacta o seu negócio. Sem spam —
              apenas o essencial.
            </p>
          </div>
          <div>
            <div className="news-form">
              <input
                ref={emailRef}
                type="email"
                placeholder="Seu e-mail corporativo"
                aria-label="E-mail para o boletim"
                aria-describedby={erro ? "news-erro" : undefined}
                aria-invalid={erro || undefined}
                onChange={() => setErro(false)}
              />
              <button className="btn solid" type="button" onClick={handleAssinar}>
                {inscrito ? "Inscrito ✓" : "Assinar"}
              </button>
            </div>
            {erro && (
              <p id="news-erro" className="news-erro">
                Informe um e-mail válido para se inscrever.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
