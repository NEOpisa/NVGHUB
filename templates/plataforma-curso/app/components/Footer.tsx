export default function Footer() {
  return (
    <footer style={{ padding: "3rem 2rem", borderTop: "1px solid var(--border)", textAlign: "center" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div className="nav-logo" style={{ display: "inline-block", marginBottom: "1.5rem", fontSize: "1rem" }}>
          Código Pro
        </div>
        <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.8 }}>
          © 2025 Código Pro. Todos os direitos reservados.
          <br />
          <a href="#" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
            Termos de uso
          </a>{" "}
          ·{" "}
          <a href="#" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
            Política de privacidade
          </a>{" "}
          ·{" "}
          <a href="#" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
            Suporte
          </a>
          <br />
          contato@seudominio.com.br · (00) 00000-0000 ·{" "}
          <a href="#" style={{ color: "var(--text-muted)", textDecoration: "none" }}>
            @seuinstagram
          </a>
        </p>
        <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "1.5rem", opacity: 0.7 }}>
          Provido por Neovanguard
        </p>
      </div>
    </footer>
  );
}
