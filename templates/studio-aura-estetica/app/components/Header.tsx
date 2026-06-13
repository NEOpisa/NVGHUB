export default function Header() {
  return (
    <header>
      <div className="wrap">
        <nav>
          <a className="logo" href="#">
            [Nome do Studio]
          </a>
          <ul className="nav-links">
            <li>
              <a href="#servicos">Serviços</a>
            </li>
            <li>
              <a href="#fidelidade">Fidelidade</a>
            </li>
            <li>
              <a href="#equipe">Equipe</a>
            </li>
            <li>
              <a href="#galeria">Resultados</a>
            </li>
          </ul>
          <a className="btn" href="#agendar">
            Agendar horário
          </a>
        </nav>
      </div>
    </header>
  );
}
