"use client";

import { useRef } from "react";
import { useStore } from "@/app/context/StoreContext";

export default function Experimental() {
  const { showToast } = useStore();
  const formRef = useRef<HTMLFormElement>(null);

  const agendarAula = () => {
    showToast("Aula agendada. Você receberá a confirmação no WhatsApp.");
    formRef.current?.reset();
  };

  return (
    <section id="experimental" className="sec">
      <div className="exp-layout">
        <div className="exp-copy">
          <h2 className="sec-title">
            Venha treinar <span>de graça</span>
          </h2>
          <p>
            Sem compromisso, sem pressão. Você experimenta uma aula completa,
            conhece os coaches e sente a comunidade. Se não for para você, sem
            problema — sem cadastro forçado.
          </p>
        </div>
        <form
          className="exp-form"
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            agendarAula();
          }}
        >
          <h3>Agendar aula experimental</h3>
          <div className="form-grid">
            <div className="form-field">
              <label>Nome</label>
              <input type="text" placeholder="Seu nome" />
            </div>
            <div className="form-field">
              <label>WhatsApp</label>
              <input type="tel" placeholder="(00) 00000-0000" />
            </div>
          </div>
          <div className="form-field">
            <label>E-mail</label>
            <input type="email" placeholder="seu@email.com" />
          </div>
          <div className="form-grid">
            <div className="form-field">
              <label>Data preferida</label>
              <input type="date" />
            </div>
            <div className="form-field">
              <label>Horário</label>
              <select>
                <option>06:00 — CrossFit</option>
                <option>07:00 — CrossFit</option>
                <option>09:00 — CrossFit</option>
                <option>12:00 — CrossFit</option>
                <option>18:00 — CrossFit</option>
                <option>19:00 — CrossFit</option>
                <option>20:00 — CrossFit</option>
              </select>
            </div>
          </div>
          <div className="form-field">
            <label>Experiência prévia</label>
            <select>
              <option>Nunca treinei CrossFit</option>
              <option>Menos de 6 meses</option>
              <option>6 meses a 2 anos</option>
              <option>Mais de 2 anos</option>
            </select>
          </div>
          <button
            className="btn-volt"
            style={{ width: "100%", marginTop: ".5rem", padding: "1rem" }}
            type="submit"
          >
            Confirmar aula grátis →
          </button>
        </form>
      </div>
    </section>
  );
}
