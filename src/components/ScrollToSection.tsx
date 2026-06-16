"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getLenisInstance } from "@/lib/lenis";

export default function ScrollToSection() {
  const pathname = usePathname();

  useEffect(() => {
    const toTop = () => {
      const lenis = getLenisInstance();
      if (lenis) lenis.scrollTo(0, { offset: 0, immediate: true });
      else window.scrollTo({ top: 0 });
    };
    const t = window.setTimeout(toTop, 0);
    return () => window.clearTimeout(t);
  }, [pathname]);

  return null;
}
