export default function Header() {
  return (
    <header>
      <div className="wrap">
        <a className="logo" href="#">
          Atelier <span>/ arq+eng</span>
        </a>
        <nav className="nav-links">
          <a href="#disciplinas">Disciplinas</a>
          <a href="#projetos">Projetos</a>
          <a href="#processo">Processo</a>
          <a href="#sobre">Estúdio</a>
          <a href="#contato" className="nav-cta">
            Contato
          </a>
        </nav>
      </div>
    </header>
  );
}
