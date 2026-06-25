"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import SceneItem from "@/components/scene/SceneItem";
import type { PlateState, PlateTone } from "@/components/scene/items/ButtonPlate";

// A placa 3D usa three/fiber — carrega sob demanda (fica fora do bundle inicial,
// igual o HeroVisual). O <a>/<button> DOM aparece na hora; a placa entra depois.
const ButtonPlate = dynamic(() => import("@/components/scene/items/ButtonPlate"), {
  ssr: false,
});

type Common = {
  tone?: PlateTone;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  ariaCurrent?: boolean;
};

type Props = Common &
  (
    | { href: string; external?: boolean; onClick?: never }
    | { href?: never; external?: never; onClick: () => void }
  );

/**
 * Botão com VISUAL 3D no canvas + texto/clique no DOM (SEO/a11y preservados).
 * Mantém o <a>/<Link>/<button> real (transparente quando o WebGL está ativo) e
 * injeta uma placa 3D atrás dele, que segue o retângulo do botão. Hover eleva e
 * brilha; clique afunda. Sem WebGL, cai no estilo DOM normal (classe original).
 */
export default function Button3D({
  tone = "accent",
  className = "",
  children,
  ariaLabel,
  ariaCurrent,
  href,
  external,
  onClick,
}: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const state = useRef<PlateState>({ hover: false, press: false });
  const aria = ariaCurrent ? ({ "aria-current": "page" } as const) : {};

  const handlers = {
    onPointerEnter: () => { state.current.hover = true; },
    onPointerLeave: () => { state.current.hover = false; state.current.press = false; },
    onPointerDown: () => { state.current.press = true; },
    onPointerUp: () => { state.current.press = false; },
  };

  const cls = `${className} btn-3d`.trim();
  const plate = (
    <SceneItem>
      <ButtonPlate anchorRef={ref} state={state} tone={tone} />
    </SceneItem>
  );

  if (href !== undefined) {
    const isInternal = href.startsWith("/") && !external;
    if (isInternal) {
      return (
        <>
          <Link ref={ref} href={href} className={cls} aria-label={ariaLabel} {...aria} {...handlers}>
            {children}
          </Link>
          {plate}
        </>
      );
    }
    return (
      <>
        <a
          ref={ref}
          href={href}
          className={cls}
          aria-label={ariaLabel}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...handlers}
        >
          {children}
        </a>
        {plate}
      </>
    );
  }

  return (
    <>
      <button ref={ref} type="button" className={cls} aria-label={ariaLabel} onClick={onClick} {...handlers}>
        {children}
      </button>
      {plate}
    </>
  );
}
