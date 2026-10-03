import Link from "next/link";
import { CONTACT_EMAIL, SITE_REPO_URL } from "@/lib/constants";
import { getMessages, type Locale } from "@/lib/i18n";
import { localePath } from "@/lib/routes";
import { TEAM, personPath } from "@/lib/team";

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
        {TEAM.map(p => <Link key={p.slug} href={personPath(locale, p.slug)}>{p.name}</Link>)}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </nav>
      <span>{t.freeSoftware} · GPL-3.0</span>
    </footer>
  );
}
