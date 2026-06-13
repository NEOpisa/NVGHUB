"use client";

import { useState } from "react";

export default function VideoSection() {
  const [playClicked, setPlayClicked] = useState(false);

  return (
    <section id="videoSection" style={{ padding: "4rem 2rem", background: "var(--ink-soft)" }}>
      <div className="section-inner" style={{ textAlign: "center" }}>
        <div className="section-label">Assista antes de decidir</div>
        <h2 className="section-title">
          O que está por trás do <em>[Nome da Plataforma/Curso]</em>
        </h2>
        <div className="video-wrap">
          {!playClicked && (
            <button className="play-btn" onClick={() => setPlayClicked(true)}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--ink)" stroke="none">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          )}
          <p
            id="videoMsg"
            style={{
              color: "var(--text-muted)",
              fontSize: "0.85rem",
              opacity: playClicked ? 1 : 0,
              position: "absolute",
              transition: "opacity .4s",
            }}
          >
            ▶ Substitua este elemento pelo seu player de vídeo
          </p>
        </div>
      </div>
    </section>
  );
}
