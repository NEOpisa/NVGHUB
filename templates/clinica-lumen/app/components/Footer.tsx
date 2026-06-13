export default function Footer() {
  return (
    <footer id="contato">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <h4>Clínica Lumen</h4>
            <p style={{ fontSize: ".9rem" }}>
              Av. Paulista, 1842 — Bela Vista, São Paulo - SP
              <br />
              Pinheiros, São Paulo - SP
            </p>
            <div className="mapa">Mapa interativo (Google Maps)</div>
          </div>
          <div>
            <h4>Atendimento</h4>
            <ul>
              <li>Seg–Sex · 8h às 19h</li>
              <li>Sábado · 8h às 13h</li>
              <li>(00) 00000-0000</li>
              <li>contato@seudominio.com.br</li>
            </ul>
          </div>
          <div>
            <h4>Navegação</h4>
            <ul>
              <li>
                <a href="#especialidades">Especialidades</a>
              </li>
              <li>
                <a href="#equipe">Equipe</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
              <li>
                <a href="#">Área do paciente</a>
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
                <a href="#">Responsável técnico · CRM/UF 000000</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Clínica Lumen. Todos os direitos reservados.</span>
          <span>Avalie-nos no Google ★★★★★</span>
        </div>
        <div
          style={{
            marginTop: "16px",
            fontSize: ".72rem",
            color: "rgba(191, 211, 209, .5)",
            textAlign: "center",
          }}
        >
          Provido por Neovanguard
        </div>
      </div>
    </footer>
  );
}
