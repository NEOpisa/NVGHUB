import Link from "next/link";
import ScrollLink from "@/components/ScrollLink";
import { WA, IG } from "@/lib/constants";

export default function Footer() {
  return (
    <footer>
      <ScrollLink href="/" className="wordmark" ariaLabel="NEOVANGUARD — voltar ao início">
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
      </ScrollLink>

      <div className="footer-links">
        <ScrollLink href="/solucoes" target="servicos">Soluções</ScrollLink>
        <ScrollLink href="/orcamento" target="orcamento">Orçamento</ScrollLink>
        <ScrollLink href="/pacotes" target="precos">Pacotes</ScrollLink>
        <ScrollLink href="/contato" target="contato">Contato</ScrollLink>
        <Link href="/exemplos">Exemplos</Link>
        <a href={WA} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <a href={IG} target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>

      <span className="footer-copy">© 2026 Neovanguard. Todos os direitos reservados.</span>
    </footer>
  );
}
