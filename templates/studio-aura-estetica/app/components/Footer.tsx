export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="fg">
          <div>
            <h4>[Nome do Studio]</h4>
            <p style={{ fontSize: ".9rem" }}>
              [Endereço completo]
              <br />
              [Bairro, Cidade - UF]
              <br />
              Ter–Sáb · 9h às 20h
            </p>
          </div>
          <div>
            <h4>Links</h4>
            <ul>
              <li>
                <a href="#servicos">Serviços</a>
              </li>
              <li>
                <a href="#agendar">Agendar</a>
              </li>
              <li>
                <a href="#fidelidade">Clube [Nome do Studio]</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Contato</h4>
            <ul>
              <li>(00) 00000-0000</li>
              <li>@seuinstagram</li>
              <li>contato@seudominio.com.br</li>
            </ul>
          </div>
        </div>
        <div className="fb">
          <span>© 2026 [Nome do Studio].</span>
          <span>Política de privacidade · LGPD</span>
        </div>
        <p
          style={{
            marginTop: "16px",
            fontSize: ".74rem",
            color: "var(--soft)",
            textAlign: "center",
          }}
        >
          Provido por Neovanguard
        </p>
      </div>
    </footer>
  );
}
