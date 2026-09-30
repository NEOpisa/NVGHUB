import Link from "next/link";
import { PAGES } from "@/lib/pages";
import { MIZAEL_LINKEDIN, JOAO_LINKEDIN, CONTACT_EMAIL } from "@/lib/constants";
export default function EnglishPage({ path }: { path: string }) {
  const page = PAGES.find(p => p.en === path)!;
  return <article className="panel prose">
    <span className="eyebrow">Neovanguard OS</span><h1>{page.title}</h1><p className="lead">{page.description}</p>
    {page.sections.map((s, i) => <section key={s.title}><h2 id={"section-" + i}>{s.title}</h2><p>{s.text}</p></section>)}
    {path === "/en/about" && <p><a href={MIZAEL_LINKEDIN}>Mizael Ribeiro · CEO</a> · <a href={JOAO_LINKEDIN}>João Antônio Rodrigues · COO</a></p>}
    <nav aria-label="Further reading" className="pill-row"><Link className="pill" href="/en/guides">Read the guides</Link><Link className="pill pill--ghost" href="/en/news">Development notes</Link><Link className="pill pill--ghost" href="/en/download">Image availability</Link></nav>
    <p>Contact: <a href={"mailto:" + CONTACT_EMAIL}>{CONTACT_EMAIL}</a></p>
  </article>;
}

