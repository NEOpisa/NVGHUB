"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { NAV, VERSAO } from "@/lib/constants";
import { ROUTES } from "@/lib/routes";
import { ArrowUpRight, CloseIcon } from "@/components/icons";

export default function Header() {
  const path = usePathname();
  const english = path === "/en" || path.startsWith("/en/");
  const route = ROUTES.find(r => r.pt === path || r.en === path);
  const languageUrl = english ? route?.pt ?? "/" : route?.en ?? "/en";
  const navigation = english ? [{label: "Features", href: "/en/features"}, {label: "Documentation", href: "/en/documentation"}, {label: "About", href: "/en/about"}] : NAV;
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
        <Link href={english ? "/en" : "/"} className="brand" aria-label={english ? "Neovanguard OS: home" : "Neovanguard OS: início"}>
          <span className="brand-symbol"><img src="/logo.svg" width={32} height={24} alt="" /></span>
          <span>Neovanguard OS</span>
        </Link>
        <nav className="desktop-nav" aria-label={english ? "Main navigation" : "Navegação principal"}>
          {navigation.map(r => (
            <Link key={r.href} href={r.href} aria-current={path === r.href ? "page" : undefined}>
              {r.label}
            </Link>
          ))}
        </nav>
        <a href={languageUrl} hrefLang={english ? "pt-BR" : "en"} className="language-switch" aria-label={english ? "Ler em português" : "Read in English"}>{english ? "PT" : "EN"}</a>
        <Link href={english ? "/en/download" : "/baixar"} className="header-download"><span>Status</span> <ArrowUpRight /></Link>
        <button ref={trigger} className="menu-trigger" type="button" aria-label={english ? "Open menu" : "Abrir menu"} aria-haspopup="dialog" aria-controls="site-menu"
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
        <div className="menu-heading"><span id="menu-title">{english ? "Main menu" : "Menu principal"}</span><button type="button" onClick={close} autoFocus aria-label={english ? "Close menu" : "Fechar menu"}><CloseIcon /></button></div>
        <nav aria-label="Navegação para dispositivos móveis">
          {navigation.map(r => <Link key={r.href} href={r.href} onClick={close} aria-current={path === r.href ? "page" : undefined}>{r.label}<ArrowUpRight /></Link>)}
          <Link href={english ? "/en/download" : "/baixar"} onClick={close}>{english ? "Image availability" : "Disponibilidade das imagens"}<ArrowUpRight /></Link>
        </nav>
        <p className="menu-note">Neovanguard OS {VERSAO}<br />{english ? "Arch Linux · free and open source" : "Arch Linux · livre e de código aberto"}</p>
      </dialog>
    </header>
  );
}
