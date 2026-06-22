import Link from "next/link";
import { WA, IG } from "@/lib/constants";

export default function Footer() {
  return (
    <footer>
      <Link href="/" className="wordmark" aria-label="NEOVANGUARD — voltar ao início">
        <img
          src="/logo.png"
          alt=""
          aria-hidden
          width={43}
          height={32}
          className="nav-logo"
        />
        <span className="wordmark-text">
          NEO<b>VANGUARD</b>
        </span>
      </Link>

      <div className="footer-links">
        <Link href="/solucao">Sua solução</Link>
        <Link href="/pacotes">Pacotes</Link>
        <Link href="/contato">Contato</Link>
        <Link href="/exemplos">Exemplos</Link>
        <a href={WA} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <a href={IG} target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>

      <span className="footer-copy">© {new Date().getFullYear()} Neovanguard. Todos os direitos reservados.</span>
    </footer>
  );
}
