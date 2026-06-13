export default function Header() {
  return (
    <header>
      <div className="wrap">
        <nav>
          <a className="logo" href="#">
            Clínica Lumen
          </a>
          <ul className="nav-links">
            <li>
              <a href="#especialidades">Especialidades</a>
            </li>
            <li>
              <a href="#sobre">A clínica</a>
            </li>
            <li>
              <a href="#equipe">Equipe</a>
            </li>
            <li>
              <a href="#blog">Blog</a>
            </li>
            <li>
              <a href="#" title="Área do paciente">
                Área do paciente
              </a>
            </li>
          </ul>
          <a className="btn" href="#agendar">
            Agendar avaliação
          </a>
        </nav>
      </div>
    </header>
  );
}
