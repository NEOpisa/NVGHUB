export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <h4>[Nome do Escritório de Advocacia]</h4>
            <p style={{ fontSize: ".88rem", maxWidth: "26rem" }}>
              Advocacia empresarial com atuação em todo o estado de [UF]. Sociedade
              registrada na OAB/UF sob nº 00.000.
            </p>
          </div>
          <div>
            <h4>Navegação</h4>
            <ul>
              <li>
                <a href="#areas">Áreas de atuação</a>
              </li>
              <li>
                <a href="#socios">Sócios</a>
              </li>
              <li>
                <a href="#insights">Insights</a>
              </li>
              <li>
                <a href="#">Área do cliente</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Institucional</h4>
            <ul>
              <li>
                <a href="#">Política de privacidade</a>
              </li>
              <li>
                <a href="#">Termos de uso</a>
              </li>
              <li>
                <a href="#">Imprensa &amp; mídia</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 [Nome do Escritório de Advocacia].</span>
          <span className="lgpd">Site em conformidade com a LGPD · Conexão segura SSL</span>
        </div>
        <div className="foot-bottom" style={{ borderTop: "none", paddingTop: 0, marginTop: "-6px" }}>
          <span style={{ fontSize: ".7rem", color: "var(--txt)" }}>Provido por Neovanguard</span>
        </div>
      </div>
    </footer>
  );
}
