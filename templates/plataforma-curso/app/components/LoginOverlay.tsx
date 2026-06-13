"use client";

interface LoginOverlayProps {
  onLogin: () => void;
  onClose: () => void;
}

export default function LoginOverlay({ onLogin, onClose }: LoginOverlayProps) {
  return (
    <div className="login-overlay" id="loginOverlay">
      <div className="login-box animate-in">
        <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", color: "var(--gold)", marginBottom: "0.5rem" }}>
          ◈
        </div>
        <h2>Área de Membros</h2>
        <p>Acesse seu conteúdo exclusivo</p>
        <input className="form-field" type="email" placeholder="E-mail" id="loginEmail" />
        <input className="form-field" type="password" placeholder="Senha" id="loginPass" />
        <button className="btn-primary" onClick={onLogin} style={{ width: "100%", marginBottom: "1rem" }}>
          Entrar
        </button>
        <div className="login-divider">ou</div>
        <button className="btn-ghost" onClick={onLogin} style={{ width: "100%", fontSize: "0.85rem" }}>
          Continuar com Google
        </button>
        <p style={{ marginTop: "1.5rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
          <a href="#" style={{ color: "var(--gold)", textDecoration: "none" }}>
            Esqueci minha senha
          </a>
        </p>
        <p style={{ marginTop: "0.75rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
          Ainda não tem acesso?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
            style={{ color: "var(--gold)", textDecoration: "none" }}
          >
            Ver o curso
          </a>
        </p>
      </div>
    </div>
  );
}
