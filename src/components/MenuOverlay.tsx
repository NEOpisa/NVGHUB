"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { WhatsAppIcon, InstagramIcon } from "@/components/icons";
import { WA, IG } from "@/lib/constants";

const ROUTES = [
  { num: "RT_00", label: "Início", href: "/" },
  { num: "RT_01", label: "Ouro", href: "/ouro" },
  { num: "RT_02", label: "Platina", href: "/platina" },
  { num: "RT_03", label: "Quem somos", href: "/sobre" },
  { num: "RT_04", label: "Contato", href: "/contato" },
];

const listVariants = {
  open: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};
const rowVariants = {
  open: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 240, damping: 26 },
  },
  closed: { opacity: 0, y: 26, filter: "blur(5px)" },
};

/**
 * MENU NOVO — overlay em tela cheia animado com Motion (AnimatePresence +
 * stagger com mola). Linguagem neobsidian + blueprint: preto puro, grade 1px,
 * rotas mono (RT_xx) em cards com cantoneiras. Fecha por ESC, X ou rota.
 */
export default function MenuOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("nv-menu-lock");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("nv-menu-lock");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="nv-menu is-open"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.28 } }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="bp-grid nv-menu-grid" aria-hidden="true" />
          <span className="bp-scan" aria-hidden="true" />

          <motion.nav
            className="nv-menu-routes"
            variants={listVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {ROUTES.map((r) => (
              <motion.div key={r.num} variants={rowVariants}>
                <Link
                  href={r.href}
                  className="nv-menu-route card-1"
                  onClick={onClose}
                >
                  <span className="nv-menu-num">{r.num}</span>
                  <span className="nv-menu-label">{r.label}</span>
                  <span className="nv-menu-state" aria-hidden="true">
                    <i /> PRONTO
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          <motion.div
            className="nv-menu-foot"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
          >
            <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <WhatsAppIcon />
              Falar pelo WhatsApp
            </a>
            <a href={IG} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <InstagramIcon />
              Instagram
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
