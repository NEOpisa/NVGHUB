import Image from "next/image";

export default function Footer() {
  return (
    <footer>
      <a href="#hero" className="wordmark" aria-label="NEOVANGUARD — voltar ao topo">
        <Image
          src="/logo.png"
          alt=""
          aria-hidden
          width={120}
          height={120}
          className="nav-logo"
        />
        <span className="wordmark-text">
          N<span className="accent-letters">E</span>OVANGUAR
          <span className="accent-letters">D</span>
        </span>
      </a>

      <div className="footer-links">
        <a href="#servicos">Serviços</a>
        <a href="#precos">Preços</a>
        <a href="#contato">Contato</a>
      </div>

      <span className="footer-copy">© 2026 Neovanguard. Todos os direitos reservados.</span>
    </footer>
  );
}
