import { LOGO_B64 } from "@/lib/logo";

const WA = "https://wa.me/qr/YDKPLNZS2ZDBC1";
const IG = "https://www.instagram.com/neo_vanguard?utm_source=qr&igsh=MWx5Ym1nZ2J0NW5kMw==";

export default function Footer() {
  return (
    <footer>
      <a href="#hero" className="wordmark" aria-label="NEOVANGUARD — voltar ao topo">
        <img
          src={LOGO_B64}
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
