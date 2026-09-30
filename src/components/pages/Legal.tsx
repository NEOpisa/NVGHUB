import { Fragment } from "react";
import { CONTACT_EMAIL } from "@/lib/constants";
import { getMessages, type Locale } from "@/lib/i18n";
import { rich } from "@/lib/rich";
import { localePath } from "@/lib/routes";

type Section = { title: string; text?: string; items?: string[] };

/** Política de privacidade e termos de uso: mesma estrutura, textos do
 * dicionário. A política espelha os fluxos reais do site. */
export default function Legal({ locale, page }: { locale: Locale; page: "privacy" | "terms" }) {
  const t = getMessages(locale)[page];
  const links = { mail: `mailto:${CONTACT_EMAIL}`, privacy: localePath(locale, "/privacidade") };
  return (
    <article className="panel prose">
      <span className="eyebrow">{t.eyebrow}</span>
      <h1 className="h-lg">{t.title}</h1>
      {(t.sections as Section[]).map(section => (
        <Fragment key={section.title}>
          <h2>{section.title}</h2>
          {section.text && <p>{rich(section.text, links)}</p>}
          {section.items && <ul>{section.items.map(item => <li key={item}>{rich(item, links)}</li>)}</ul>}
        </Fragment>
      ))}
    </article>
  );
}
