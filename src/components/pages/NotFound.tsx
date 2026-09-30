import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { getMessages, type Locale } from "@/lib/i18n";
import { localePath } from "@/lib/routes";

export default function NotFound({ locale }: { locale: Locale }) {
  const messages = getMessages(locale);
  const t = messages.notFound;
  return (
    <section className="panel" aria-labelledby="nf-h">
      <span className="eyebrow">{t.eyebrow}</span>
      <h1 id="nf-h" className="h-xl">404</h1>
      <p className="lead">{t.text}</p>
      <div className="pill-row">
        <Link href={localePath(locale, "/")} className="pill">
          {t.home}
          <ArrowUpRight />
        </Link>
        <Link href={localePath(locale, "/baixar")} className="pill pill--ghost">
          {messages.common.viewImages}
        </Link>
      </div>
    </section>
  );
}
