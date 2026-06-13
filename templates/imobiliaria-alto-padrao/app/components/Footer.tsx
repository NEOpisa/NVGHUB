export default function Footer() {
  return (
    <footer id="rodape">
      <div className="wrap">
        <div className="fg">
          <div>
            <a className="logo" href="#">Alto Padrão.</a>
            <p className="fg-about">
              Curadoria de imóveis de alto padrão em São Paulo - SP. Atendimento
              privativo para quem compra, vende ou investe com exigência.
            </p>
            <p className="creci">CRECI SP 00000-J</p>
          </div>
          <div>
            <h4>Imóveis</h4>
            <ul>
              <li><a href="#destaques">Casas</a></li>
              <li><a href="#destaques">Apartamentos</a></li>
              <li><a href="#destaques">Coberturas</a></li>
              <li><a href="#destaques">Lançamentos</a></li>
            </ul>
          </div>
          <div>
            <h4>A imobiliária</h4>
            <ul>
              <li><a href="#processo">Como atendemos</a></li>
              <li><a href="#bairros">Bairros</a></li>
              <li><a href="#depoimentos">Clientes</a></li>
              <li><a href="#contato">Anuncie seu imóvel</a></li>
            </ul>
          </div>
          <div>
            <h4>Contato</h4>
            <ul>
              <li><a href="#">(00) 00000-0000</a></li>
              <li><a href="#">contato@seudominio.com.br</a></li>
              <li><a href="#">@seuinstagram</a></li>
            </ul>
          </div>
        </div>
        <div className="fb">
          <span>© 2026 Alto Padrão Imóveis. Todos os direitos reservados.</span>
          <span>Provido por Neovanguard</span>
        </div>
      </div>
    </footer>
  );
}
