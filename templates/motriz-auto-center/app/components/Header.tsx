export default function Header() {
  return (
    <header className="hdr">
      <a href="#" className="hdr-logo">
        MOTRIZ<span>.</span>
      </a>
      <nav className="hdr-nav">
        <a href="#servicos">Serviços</a>
        <a href="#diferenciais">Por que nós</a>
        <a href="#processo">Como funciona</a>
        <a href="#depoimentos">Clientes</a>
      </nav>
      <a href="#orcamento" className="btn btn-primary hdr-cta">
        Orçamento grátis
      </a>
    </header>
  );
}
