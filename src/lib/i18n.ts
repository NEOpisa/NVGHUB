import pt from "@/messages/pt.json";
import en from "@/messages/en.json";

export type Locale = "pt" | "en";
export type Messages = typeof pt;

export const LOCALES: Locale[] = ["pt", "en"];
/** Valor de `<html lang>`, hreflang e `inLanguage`. */
export const HTML_LANG: Record<Locale, string> = { pt: "pt-BR", en: "en" };
export const OG_LOCALE: Record<Locale, string> = { pt: "pt_BR", en: "en_US" };

const MESSAGES: Record<Locale, Messages> = { pt, en };

/** Textos do site. As páginas dos dois idiomas renderizam os mesmos
 * componentes; só este dicionário muda. Use apenas em Server Components:
 * componentes cliente recebem por props o recorte de que precisam. */
export const getMessages = (locale: Locale) => MESSAGES[locale];

export const localeOf = (path: string): Locale => (path === "/en" || path.startsWith("/en/") ? "en" : "pt");

/** Substitui `{chave}` pelos valores informados. */
export function fmt(text: string, values: Record<string, string | number>) {
  return text.replace(/\{(\w+)\}/g, (match, key) => (key in values ? String(values[key]) : match));
}
