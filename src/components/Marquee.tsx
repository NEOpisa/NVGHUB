"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MQ, MOTION, motionEnabled } from "@/lib/motionConfig";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_ITEMS = [
  "Sites",
  "Sistemas",
  "SEO",
  "Automação",
  "Suporte",
  "E-commerce",
  "Landing Pages",
  "SaaS",
];

export default function Marquee({
  items = DEFAULT_ITEMS,
  reverse = false,
}: {
  items?: string[];
  reverse?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const sequence = [...items, ...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !motionEnabled()) return;

    const mm = gsap.matchMedia();
    mm.add(MQ.full, () => {
      // Assume o controle do CSS para acoplar a velocidade do scroll.
      track.classList.add("marquee-track--js");

      // Conteúdo triplicado → andar 1/3 fecha o loop sem emenda.
      const from = reverse ? -33.333 : 0;
      const to = reverse ? 0 : -33.333;
      const loop = gsap.fromTo(
        track,
        { xPercent: from },
        { xPercent: to, ease: "none", duration: 18, repeat: -1 }
      );

      // timeScale acelera com a velocidade do scroll e decai pro "drift" base.
      let target = 1;
      let current = 1;
      const st = ScrollTrigger.create({
        onUpdate: (self) => {
          const boost = Math.min(
            Math.abs(self.getVelocity()) * MOTION.marquee.boost,
            MOTION.marquee.maxScale
          );
          target = 1 + boost;
        },
      });
      const tick = () => {
        target += (1 - target) * 0.05; // volta pro drift
        current += (target - current) * 0.1; // suaviza
        loop.timeScale(current);
      };
      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        st.kill();
        loop.kill();
        track.classList.remove("marquee-track--js");
        gsap.set(track, { clearProps: "transform" });
      };
    });

    return () => mm.revert();
  }, [reverse]);

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-row">
        <div className="marquee-track" ref={trackRef}>
          {sequence.map((item, i) => (
            <span className="marquee-item" key={`${item}-${i}`}>
              {item}
              <span className="marquee-sep" aria-hidden="true">
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
