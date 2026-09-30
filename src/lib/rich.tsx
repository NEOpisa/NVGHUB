import Link from "next/link";
import type { ReactNode } from "react";

const TAG = /<br>|<(code|strong|em|a:[\w-]+)>(.*?)<\/(?:code|strong|em|a)>/g;

/** Marcação mínima dos textos traduzidos: `<code>`, `<strong>`, `<em>` (o
 * destaque azul dos títulos), `<br>` e `<a:chave>`, cujo destino vem de
 * `links`. Mantém os dicionários como texto puro, sem JSX por idioma. */
export function rich(text: string, links: Record<string, string> = {}): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(TAG)) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const [whole, tag, inner] = match;
    const key = match.index;
    if (whole === "<br>") nodes.push(<br key={key} />);
    else if (tag === "code") nodes.push(<code key={key}>{inner}</code>);
    else if (tag === "strong") nodes.push(<strong key={key}>{inner}</strong>);
    else if (tag === "em") nodes.push(<span className="h-accent" key={key}>{inner}</span>);
    else {
      const href = links[tag.slice(2)];
      if (!href) throw new Error("Link sem destino: " + tag);
      nodes.push(href.startsWith("/") ? <Link key={key} href={href}>{inner}</Link> : <a key={key} href={href}>{inner}</a>);
    }
    last = match.index + whole.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}
