"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function TableOfContents() {
  const path = usePathname();
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
  const [active, setActive] = useState("");
  const enabled = ["/documentacao", "/instalacao", "/recursos", "/baixar"].includes(path);

  useEffect(() => {
    if (!enabled) return;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("main h2[id]"));
    setHeadings(nodes.map(node => ({ id: node.id, text: node.textContent ?? "" })));
    const update = () => {
      const current = nodes.filter(node => node.getBoundingClientRect().top <= 180).at(-1) ?? nodes[0];
      setActive(current?.id ?? "");
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [path, enabled]);

  if (!enabled) return null;
  const links = headings.map(h => (
    <a key={h.id} href={`#${h.id}`} aria-current={active === h.id ? "location" : undefined}
      onClick={event => event.currentTarget.closest("details")?.removeAttribute("open")}>
      {h.text}
    </a>
  ));
  return (
    <aside className="page-toc">
      <nav className="toc-desktop" aria-label="Nesta página"><span className="eyebrow">Nesta página</span>{links}</nav>
      <details className="toc-mobile"><summary>Nesta página</summary><nav aria-label="Seções desta página">{links}</nav></details>
    </aside>
  );
}
