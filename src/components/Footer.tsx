import { WA, IG } from "@/lib/constants";

export default function Footer() {
  return (
    <footer>
      <a href="#hero" className="wordmark" aria-label="NEOVANGUARD — voltar ao topo">
        <img
          src="/logo.png"
          alt=""
          aria-hidden
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
        <a href={WA} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <a href={IG} target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>

      <span className="footer-copy">© 2026 Neovanguard. Todos os direitos reservados.</span>
    </footer>
  );
}
