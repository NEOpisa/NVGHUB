import Link from "next/link";
import { CONTACT_EMAIL, MIZAEL_LINKEDIN, JOAO_LINKEDIN } from "@/lib/constants";

export default function Foot({ english = false }: { english?: boolean }) {
  const links = english ? [["/en/features", "Features"], ["/en/documentation", "Documentation"], ["/en/installation", "Installation"], ["/en/guides", "Guides"], ["/en/news", "Development notes"], ["/en/about", "About"], ["/en/privacy", "Privacy"], ["/en/terms", "Terms"]] : [["/recursos", "Recursos"], ["/documentacao", "Documentação"], ["/instalacao", "Instalação"], ["/guias", "Guias"], ["/novidades", "Novidades"], ["/sobre", "Sobre"], ["/privacidade", "Privacidade"], ["/termos", "Termos"]];
  return (
    <footer className="foot">
      <span>© {new Date().getFullYear()} Neovanguard · Neovanguard OS</span>
      <nav aria-label={english ? "Footer" : "Rodapé"}>
        {links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
        <a href="https://github.com/NEOpisa/NVGHUB">GitHub · {english ? "website" : "site"}</a>
        <a href={MIZAEL_LINKEDIN}>LinkedIn · Mizael</a>
        <a href={JOAO_LINKEDIN}>LinkedIn · João</a>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </nav>
      <span>{english ? "Free software" : "Software livre"} · GPL-3.0</span>
    </footer>
  );
}
