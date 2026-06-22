export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-grid">
          <div>
            <div className="ftr-logo">
              Vista<span>Serra</span>
            </div>
            <p>
              Pousada boutique na Serra da Mantiqueira. Hospedagem, gastronomia e
              natureza em um só lugar.
            </p>
          </div>
          <div>
            <h4>Visite</h4>
            <ul>
              <li>Estrada da Serra, km 14</li>
              <li>Serra da Mantiqueira — UF</li>
              <li>Check-in 14h · Check-out 12h</li>
            </ul>
          </div>
          <div>
            <h4>Contato</h4>
            <ul>
              <li>
                <a href="https://wa.me/5500000000000">WhatsApp (00) 0000-0000</a>
              </li>
              <li>
                <a href="mailto:reservas@vistaserra.com.br">reservas@vistaserra.com.br</a>
              </li>
              <li>
                <a href="#">@pousadavistaserra</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="ftr-bottom">
          © {new Date().getFullYear()} Pousada Vista Serra · Modelo demonstrativo Neovanguard
        </div>
      </div>
    </footer>
  );
}
