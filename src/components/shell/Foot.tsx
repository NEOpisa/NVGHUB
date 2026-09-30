import Link from "next/link";
import { CONTACT_EMAIL, MIZAEL_LINKEDIN, JOAO_LINKEDIN, SITE_REPO_URL } from "@/lib/constants";
import { getMessages, type Locale } from "@/lib/i18n";
import { localePath } from "@/lib/routes";

const LINKS = [
  ["features", "/recursos"],
  ["documentation", "/documentacao"],
  ["installation", "/instalacao"],
  ["guides", "/guias"],
  ["news", "/novidades"],
  ["about", "/sobre"],
  ["privacy", "/privacidade"],
  ["terms", "/termos"],
] as const;

export default function Foot({ locale }: { locale: Locale }) {
  const t = getMessages(locale).shell;
  return (
    <footer className="foot">
      <span>© {new Date().getFullYear()} Neovanguard · Neovanguard OS</span>
      <nav aria-label={t.footerLabel}>
        {LINKS.map(([key, path]) => <Link key={key} href={localePath(locale, path)}>{t.footer[key]}</Link>)}
        <a href={SITE_REPO_URL}>{t.githubSite}</a>
        <a href={MIZAEL_LINKEDIN}>LinkedIn · Mizael</a>
        <a href={JOAO_LINKEDIN}>LinkedIn · João</a>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </nav>
      <span>{t.freeSoftware} · GPL-3.0</span>
    </footer>
  );
}
