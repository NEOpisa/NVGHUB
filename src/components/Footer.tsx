import Link from "next/link";
import { WA, IG } from "@/lib/constants";

const COLS: {
  title: string;
  links: { label: string; href: string; ext?: boolean }[];
}[] = [
  {
    title: "DIVISÕES",
    links: [
      { label: "Ouro", href: "/ouro" },
      { label: "Candidatura Platina", href: "/?tier=platina" },
      { label: "Consulta rápida", href: "/solucao" },
    ],
  },
  {
    title: "INSTITUCIONAL",
    links: [
      { label: "Quem somos", href: "/sobre" },
      { label: "Metodologia", href: "/metodologia" },
      { label: "Exemplos", href: "/exemplos" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "CANAIS",
    links: [
      { label: "Contato", href: "/contato" },
      { label: "WhatsApp", href: WA, ext: true },
      { label: "Instagram", href: IG, ext: true },
    ],
  },
];

/**
 * FOOTER BLUEPRINT — assinatura institucional na linguagem neobsidian:
 * hairline violeta + corner ticks, wordmark + tese à esquerda, três colunas
 * de rotas com título mono "//", base com © e carimbo do sistema.
 */
export default function Footer() {
  return (
    <footer className="ft">
      <div className="ft-grid">
        <div className="ft-brand">
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
          <p className="ft-thesis">
            Ecossistemas digitais que impulsionam o crescimento — sites,
            sistemas, SEO e suporte operados como um só organismo.
          </p>
          <span className="ft-mono" aria-hidden="true">
            {"NVG · 100% remoto · Brasil"}
          </span>
        </div>

        {COLS.map((col) => (
          <nav key={col.title} className="ft-col" aria-label={col.title}>
            <span className="ft-col-title">
              {col.title}
            </span>
            <ul>
              {col.links.map((l) =>
                l.ext ? (
                  <li key={l.label}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer">
                      {l.label}
                    </a>
                  </li>
                ) : (
                  <li key={l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
        ))}
      </div>

      <div className="ft-base">
        <span className="ft-copy">
          © {new Date().getFullYear()} Neovanguard · Todos os direitos
          reservados
        </span>
        <span className="ft-mono" aria-hidden="true">
          {"blueprint obsidian · v2"}
        </span>
      </div>
    </footer>
  );
}
