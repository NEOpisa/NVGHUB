export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <p className="foot-masthead">
          A defesa da sua empresa, <em>assinada</em>.
        </p>
        <div className="foot-grid">
          <div>
            <h4>Valença &amp; Antunes</h4>
            <p className="foot-sobre">
              Advocacia empresarial com atuação em todo o estado de [UF]. Sociedade registrada na
              OAB/UF sob nº 00.000.
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
          <span>© 2026 Valença &amp; Antunes Advocacia</span>
          <span>LGPD · Conexão segura SSL</span>
          <span>Provido por Neovanguard</span>
        </div>
      </div>
    </footer>
  );
}
