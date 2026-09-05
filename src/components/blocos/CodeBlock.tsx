"use client";

import { CopyIcon } from "@/components/icons";
import { useEffect, useRef, useState } from "react";

export default function CodeBlock({ children, label = "Terminal" }: { children: string; label?: string }) {
  const [message, setMessage] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  async function copy() {
    try { await navigator.clipboard.writeText(children); setMessage("Copiado"); }
    catch { setMessage("Selecione o texto para copiar"); }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(""), 3000);
  }
  return <div className="code-block">
    <div className="code-toolbar"><span>{label}</span><button type="button" onClick={copy} aria-label={`Copiar ${label.toLowerCase()}`}><CopyIcon />Copiar</button></div>
    <pre tabIndex={0}><code>{children}</code></pre>
    <span className="copy-status" role="status">{message}</span>
  </div>;
}
