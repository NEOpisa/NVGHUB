export default function Footer() {
  return (
    <>
      <footer>
        <div className="footer-brand">
          <div className="nav-logo">
            [Nome da <span>Confeitaria]</span>
          </div>
          <p>
            Confeitaria artesanal feita com ingredientes selecionados e muito
            carinho, desde [XXXX]. Sem intermediários, sem taxas — só sabor.
          </p>
        </div>
        <div>
          <h5>Navegação</h5>
          <ul>
            <li>
              <a href="#mais-vendidos">Destaques</a>
            </li>
            <li>
              <a href="#cardapio">Cardápio</a>
            </li>
            <li>
              <a href="#historia">Nossa história</a>
            </li>
            <li>
              <a href="#encomendas">Encomendas</a>
            </li>
            <li>
              <a href="#info">Localização</a>
            </li>
          </ul>
        </div>
        <div>
          <h5>Contato</h5>
          <ul>
            <li>
              <a href="#">(00) 00000-0000</a>
            </li>
            <li>
              <a href="#">contato@seudominio.com.br</a>
            </li>
            <li>
              <a href="#">@seuinstagram</a>
            </li>
          </ul>
          <h5 style={{ marginTop: "1.5rem" }}>Pagamentos</h5>
          <p style={{ fontSize: "0.84rem", marginTop: "0.5rem", lineHeight: 1.8 }}>
            Pix &nbsp;|&nbsp; Crédito &nbsp;|&nbsp; Débito
          </p>
        </div>
      </footer>
      <div className="footer-bottom">
        © 2024 [Nome da Confeitaria] Confeitaria Artesanal — Todos os
        direitos reservados &nbsp;·&nbsp; Pedidos diretos sem taxas de
        marketplace
        <div
          style={{
            marginTop: "0.4rem",
            fontSize: "0.7rem",
            color: "rgba(255,244,230,0.3)",
          }}
        >
          Provido por Neovanguard
        </div>
      </div>
    </>
  );
}
