import Link from "next/link";
import { RODAPE } from "@/lib/constants";

/** Assinatura compacta no fim da coluna de conteúdo — em toda página. */
export default function Foot() {
  return (
    <footer className="foot">
      <span>© {new Date().getFullYear()} Neovanguard</span>
      <nav aria-label="Rodapé">
        {RODAPE.map((r) => (
          <Link key={r.href} href={r.href}>
            {r.label}
          </Link>
        ))}
      </nav>
      <span>GPL-3.0 · código aberto</span>
    </footer>
  );
}
