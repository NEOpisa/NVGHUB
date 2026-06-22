export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-grid">
          <div>
            <div className="ftr-logo">
              MOTRIZ<span>.</span>
            </div>
            <p>
              Centro automotivo completo. Manutenção, reparo e diagnóstico com
              garantia e transparência.
            </p>
          </div>
          <div>
            <h4>VISITE</h4>
            <ul>
              <li>Av. das Oficinas, 1200</li>
              <li>São Paulo — UF</li>
              <li>Seg–Sex 8h–18h · Sáb 8h–13h</li>
            </ul>
          </div>
          <div>
            <h4>CONTATO</h4>
            <ul>
              <li>
                <a href="https://wa.me/5500000000000">WhatsApp (00) 0000-0000</a>
              </li>
              <li>
                <a href="mailto:contato@motriz.com.br">contato@motriz.com.br</a>
              </li>
              <li>
                <a href="#">@motrizautocenter</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="ftr-bottom">
          © {new Date().getFullYear()} Motriz Auto Center · Modelo demonstrativo Neovanguard
        </div>
      </div>
    </footer>
  );
}
