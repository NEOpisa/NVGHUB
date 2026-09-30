"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import LanguageSwitch from "@/components/shell/LanguageSwitch";
import { ArrowUpRight, CloseIcon } from "@/components/icons";
import type { Locale, Messages } from "@/lib/i18n";

type HeaderProps = {
  locale: Locale;
  t: Messages["shell"];
  /** Destinos do menu, já no idioma da página. */
  links: Record<"home" | "features" | "documentation" | "about" | "download", string>;
  /** Caminho de cada página deste idioma → página equivalente no outro. */
  alternates: Record<string, string>;
  published: boolean;
  version: string;
};

export default function Header({ locale, t, links, alternates, published, version }: HeaderProps) {
  const path = usePathname();
  const languageUrl = alternates[path] ?? alternates[links.home];
  const navigation = (["home", "features", "documentation", "about"] as const).map(key => ({ label: t.nav[key], href: links[key] }));
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
        <Link href={links.home} className="brand" aria-label={t.brandLabel}>
          <span className="brand-symbol"><img src="/logo.svg" width={32} height={24} alt="" /></span>
          <span>Neovanguard OS</span>
        </Link>
        <nav className="desktop-nav" aria-label={t.navLabel}>
          {navigation.map(r => (
            <Link key={r.href} href={r.href} aria-current={path === r.href ? "page" : undefined}>
              {r.label}
            </Link>
          ))}
        </nav>
        <LanguageSwitch locale={locale} href={languageUrl} className="lang-switch--header" />
        <Link href={links.download} className="header-download"><span>{published ? t.download : t.availability}</span> <ArrowUpRight /></Link>
        <button ref={trigger} className="menu-trigger" type="button" aria-label={t.openMenu} aria-haspopup="dialog" aria-controls="site-menu"
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
        <div className="menu-heading"><span id="menu-title">{t.menuTitle}</span><button type="button" onClick={close} autoFocus aria-label={t.closeMenu}><CloseIcon /></button></div>
        <nav aria-label={t.mobileNavLabel}>
          {navigation.map(r => <Link key={r.href} href={r.href} onClick={close} aria-current={path === r.href ? "page" : undefined}>{r.label}<ArrowUpRight /></Link>)}
          <Link href={links.download} onClick={close} aria-current={path === links.download ? "page" : undefined}>{published ? t.menuDownload : t.menuAvailability}<ArrowUpRight /></Link>
        </nav>
        <div className="menu-language">
          <LanguageSwitch locale={locale} href={languageUrl} />
        </div>
        <p className="menu-note">Neovanguard OS {version}<br />{t.menuNote}</p>
      </dialog>
    </header>
  );
}
