export default function Header() {
  return (
    <header>
      <div className="wrap">
        <nav>
          <a className="logo" href="#">
            [Nome do Escritório de Advocacia]
          </a>
          <ul className="nav-links">
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
              <a href="#contato">Contato</a>
            </li>
            <li>
              <a href="#" title="Área do cliente">
                Área do cliente
              </a>
            </li>
          </ul>
          <a className="btn" href="#contato">
            Agendar consulta
          </a>
        </nav>
      </div>
    </header>
  );
}
