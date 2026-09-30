"use client";

import { GlobeIcon } from "@/components/icons";
import type { Locale } from "@/lib/i18n";

const LANGUAGES: { locale: Locale; code: string; name: string; lang: string }[] = [
  { locale: "pt", code: "PT", name: "Português", lang: "pt-BR" },
  { locale: "en", code: "EN", name: "English", lang: "en" },
];

/** Só lembra a escolha. O site nunca redireciona sozinho por ela nem pelo
 * idioma do navegador: buscadores precisam rastrear as duas versões. */
const STORAGE_KEY = "nvg-idioma";

/** Seletor segmentado PT | EN. `href` é a página equivalente no outro idioma;
 * a âncora atual acompanha a troca. */
export default function LanguageSwitch({ locale, href, className = "" }: { locale: Locale; href: string; className?: string }) {
  return (
    <div className={`lang-switch ${className}`} role="group" aria-label="Idioma / Language">
      <GlobeIcon />
      {LANGUAGES.map(language => language.locale === locale ? (
        <span key={language.locale} aria-current="true" lang={language.lang}>
          {language.code}<span className="sr-only"> · {language.name}</span>
        </span>
      ) : (
        <a key={language.locale} href={href} hrefLang={language.lang} lang={language.lang}
          onClick={event => {
            try { localStorage.setItem(STORAGE_KEY, language.locale); } catch { /* armazenamento bloqueado: a troca segue */ }
            if (!window.location.hash) return;
            event.preventDefault();
            window.location.assign(href + window.location.hash);
          }}>
          {language.code}<span className="sr-only"> · {language.name}</span>
        </a>
      ))}
    </div>
  );
}
