export default function Footer() {
  return (
    <footer id="contato">
      <div className="wrap">
        <div className="foot-mark" aria-hidden="true">
          [Nome do Restaurante]
        </div>
        <div className="fg">
          <div>
            <h4>[Nome do Restaurante]</h4>
            <p style={{ fontSize: ".88rem" }}>
              [Endereço completo] — [Bairro, Cidade - UF]
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
          <span>© 2026 [Nome do Restaurante].</span>
          <span>Política de privacidade · LGPD</span>
        </div>
        <p style={{ fontSize: ".7rem", color: "var(--ink-soft)", opacity: 0.5, marginTop: "12px", textAlign: "center" }}>
          Provido por Neovanguard
        </p>
      </div>
    </footer>
  );
}
