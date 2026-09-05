"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { NAV, VERSAO } from "@/lib/constants";
import { ArrowUpRight, CloseIcon } from "@/components/icons";

export default function Header() {
  const path = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = () => dialog.current?.close();

  useEffect(() => { dialog.current?.close(); }, [path]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");
    const resize = () => { if (desktop.matches) dialog.current?.close(); };
    desktop.addEventListener("change", resize);
    return () => { desktop.removeEventListener("change", resize); document.body.style.overflow = ""; };
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Neovanguard OS — início">
          <span className="brand-symbol"><img src="/logo.svg" width={32} height={24} alt="" /></span>
          <span>neovanguard<span className="brand-dot">.</span></span>
        </Link>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {NAV.filter(r => r.href !== "/baixar").map(r => (
            <Link key={r.href} href={r.href} aria-current={path === r.href ? "page" : undefined}>
              {r.href === "/faq" ? "FAQ" : r.label}
            </Link>
          ))}
        </nav>
        <Link href="/baixar" className="header-download"><span>Obter<span className="download-suffix"> o sistema</span></span> <ArrowUpRight /></Link>
        <button ref={trigger} className="menu-trigger" type="button" aria-label="Abrir menu" aria-haspopup="dialog" aria-controls="site-menu"
          onClick={() => { dialog.current?.showModal(); document.body.style.overflow = "hidden"; }}>
          <span /> <span />
        </button>
      </div>
      <dialog ref={dialog} id="site-menu" className="mobile-menu" aria-labelledby="menu-title"
        onKeyDown={event => {
          if (event.key !== "Tab") return;
          const elements = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
          const first = elements[0];
          const last = elements.at(-1);
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
        }}
        onClose={() => { document.body.style.overflow = ""; trigger.current?.focus(); }}>
        <div className="menu-heading"><span id="menu-title">Explorar Neovanguard</span><button type="button" onClick={close} autoFocus aria-label="Fechar menu"><CloseIcon /></button></div>
        <nav aria-label="Navegação mobile">
          {NAV.map(r => <Link key={r.href} href={r.href} onClick={close} aria-current={path === r.href ? "page" : undefined}>{r.label}<ArrowUpRight /></Link>)}
        </nav>
        <p className="menu-note">Neovanguard OS {VERSAO}<br />Arch Linux · livre e de código aberto</p>
      </dialog>
    </header>
  );
}
