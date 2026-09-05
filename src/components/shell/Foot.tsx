import Link from "next/link";
import { VERSAO, REPO_URL } from "@/lib/constants";

export default function Foot() {
  return (
    <footer className="foot">
      <span>© {new Date().getFullYear()} Neovanguard OS · {VERSAO}</span>
      <nav aria-label="Rodapé">
        <Link href="/documentacao">Documentação</Link>
        <a href={REPO_URL}>Código-fonte</a>
        <Link href="/privacidade">Privacidade</Link>
        <Link href="/termos">Termos</Link>
      </nav>
      <span>Feito para ser seu.</span>
    </footer>
  );
}
