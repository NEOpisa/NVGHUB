export default function Footer() {
  return (
    <footer id="contato">
      <div className="wrap">
        <div className="foot-mark" aria-hidden="true">
          Casa Braseiro
        </div>
        <div className="fg">
          <div>
            <h4>Casa Braseiro</h4>
            <p style={{ fontSize: ".88rem" }}>
              Av. Paulista, 1842 — Bela Vista, São Paulo - SP — Pinheiros, São Paulo - SP
              <br />
              Ter–Dom · 18h à 0h | Sáb e Dom também ao almoço
            </p>
          </div>
          <div>
            <h4>Links</h4>
            <ul>
              <li>
                <a href="#cardapio">Cardápio</a>
              </li>
              <li>
                <a href="#encomendas">Eventos</a>
              </li>
              <li>
                <a href="#">Trocas e cancelamentos</a>
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
          <span>© 2026 Casa Braseiro.</span>
          <span>Política de privacidade · LGPD</span>
        </div>
        <p style={{ fontSize: ".7rem", color: "var(--ink-soft)", opacity: 0.5, marginTop: "12px", textAlign: "center" }}>
          Provido por Neovanguard
        </p>
      </div>
    </footer>
  );
}
