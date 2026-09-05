"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";

function FlatMark() {
  return <div className="nv3d nv3d-flat" aria-hidden="true"><img src="/logo.svg" alt="" width={280} height={206} /></div>;
}
const VScene = dynamic(() => import("./VScene"), { ssr: false, loading: FlatMark });

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <FlatMark /> : this.props.children; }
}

/** Keep the official SVG visible until WebGL is available. Offscreen scenes
 * stop rendering, and reduced-motion users never need to download Three.js. */
export default function NVMark3D() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const choose = () => {
      if (preference.matches) { setEnabled(false); return; }
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2");
      setEnabled(!!gl);
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    };
    try { choose(); } catch { setEnabled(false); }
    preference.addEventListener("change", choose);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .05 });
    if (ref.current) observer.observe(ref.current);
    const visibility = () => setPageVisible(!document.hidden);
    visibility();
    document.addEventListener("visibilitychange", visibility);
    return () => { observer.disconnect(); preference.removeEventListener("change", choose); document.removeEventListener("visibilitychange", visibility); };
  }, []);

  return <div className="nv3d" ref={ref} aria-hidden="true">
    {enabled && !failed ? <SceneBoundary><VScene active={visible && pageVisible} onFailure={() => setFailed(true)} /></SceneBoundary> : <FlatMark />}
  </div>;
}
