"use client";

import { useStore } from "@/app/context/StoreContext";

export default function Modals() {
  const {
    isPlanoModalOpen,
    closePlanoModal,
    confirmarPlano,
    isAreaModalOpen,
    closeAreaModal,
    loginAluno,
  } = useStore();

  return (
    <>
      {/* MODAL PLANO */}
      <div
        className={`modal-overlay${isPlanoModalOpen ? " open" : ""}`}
        id="modal-plano"
        onClick={(e) => {
          if (e.target === e.currentTarget) closePlanoModal();
        }}
      >
        <div className="modal">
          <button className="modal-close" onClick={closePlanoModal} type="button">
            ×
          </button>
          <h3>Assinar plano</h3>
          <p>
            Preencha seus dados para iniciar a assinatura. Cobrança automática
            mensal — cancele quando quiser.
          </p>
          <div className="form-field">
            <label>Nome completo</label>
            <input type="text" placeholder="Seu nome" />
          </div>
          <div className="form-field">
            <label>CPF</label>
            <input type="text" placeholder="000.000.000-00" />
          </div>
          <div className="form-field">
            <label>E-mail</label>
            <input type="email" placeholder="seu@email.com" />
          </div>
          <div className="form-field">
            <label>Forma de pagamento</label>
            <select>
              <option>Cartão de crédito (recorrente)</option>
              <option>Pix mensal</option>
            </select>
          </div>
          <button
            className="btn-volt"
            style={{ width: "100%", padding: ".9rem", marginTop: ".5rem" }}
            onClick={confirmarPlano}
            type="button"
          >
            Confirmar assinatura →
          </button>
        </div>
      </div>

      {/* MODAL ÁREA DO ALUNO */}
      <div
        className={`modal-overlay${isAreaModalOpen ? " open" : ""}`}
        id="modal-area"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeAreaModal();
        }}
      >
        <div className="modal">
          <button className="modal-close" onClick={closeAreaModal} type="button">
            ×
          </button>
          <h3>Área do aluno</h3>
          <p>
            Entre com seus dados para acessar seu histórico, próximos treinos
            e evolução de cargas.
          </p>
          <div className="form-field">
            <label>E-mail</label>
            <input type="email" placeholder="seu@email.com" />
          </div>
          <div className="form-field">
            <label>Senha</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <button
            className="btn-volt"
            style={{ width: "100%", padding: ".9rem", marginTop: ".5rem" }}
            onClick={loginAluno}
            type="button"
          >
            Entrar →
          </button>
          <p style={{ textAlign: "center", marginTop: "1rem", fontSize: ".78rem" }}>
            <a href="#" style={{ color: "var(--muted)" }}>
              Esqueci minha senha
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
