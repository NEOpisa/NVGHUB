"use client";

import { track } from "@/lib/fpixel";

type Props = React.ComponentPropsWithoutRef<"a"> & {
  /** Evento do Meta Pixel disparado no clique (ex.: "Lead", "Contact"). */
  event: string;
  eventOptions?: Record<string, unknown>;
};

export default function TrackLink({ event, eventOptions, onClick, children, ...rest }: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        track(event, eventOptions);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
