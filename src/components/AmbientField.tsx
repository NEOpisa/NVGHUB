"use client";

import { usePathname } from "next/navigation";

export default function AmbientField() {
  const pathname = usePathname();
  const minimal = pathname !== "/";

  return (
    <div
      className={`ambient-field${minimal ? " ambient-field--minimal" : ""}`}
      aria-hidden="true"
    >
      <div className="ambient-grain" />
      <div className="ambient-3d">
        <div className="ambient-3d-plane ambient-3d-floor" />
        <div className="ambient-3d-plane ambient-3d-ceiling" />
        <div className="ambient-3d-plane ambient-3d-left" />
        <div className="ambient-3d-plane ambient-3d-right" />
      </div>
      <div className="ambient-grid" />
      <div className="ambient-orb ambient-orb-a" />
      <div className="ambient-orb ambient-orb-b" />
      <div className="ambient-orb ambient-orb-c" />
      <div className="ambient-beam" />
    </div>
  );
}
