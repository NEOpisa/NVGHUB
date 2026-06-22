export default function Header() {
  return (
    <header className="hdr">
      <a href="#" className="hdr-logo">
        Vista<span>Serra</span>
      </a>
      <nav className="hdr-nav">
        <a href="#sobre">A pousada</a>
        <a href="#acomodacoes">Acomodações</a>
        <a href="#comodidades">Experiências</a>
        <a href="#galeria">Galeria</a>
      </nav>
      <a href="#reservar" className="btn btn-primary hdr-cta">
        Reservar
      </a>
    </header>
  );
}
