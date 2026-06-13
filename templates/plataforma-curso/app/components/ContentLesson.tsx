"use client";

import { useState } from "react";
import { Comment, initialComments } from "../data/comments";

interface ContentLessonProps {
  isDone: boolean;
  onToggleDone: () => void;
}

export default function ContentLesson({ isDone, onToggleDone }: ContentLessonProps) {
  const [playClicked, setPlayClicked] = useState(false);
  const [progress, setProgress] = useState(35);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [commentInput, setCommentInput] = useState("");

  function handleScrub(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    setProgress(pct);
  }

  function addComment() {
    if (!commentInput.trim()) return;
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      initials: "AL",
      author: "Mariana Ferreira",
      text: commentInput,
      time: "agora · 0 curtidas",
    };
    setComments((prev) => [newComment, ...prev]);
    setCommentInput("");
  }

  return (
    <div id="content-lesson" className="animate-in">
      <div className="content-header">
        <div>
          <div className="content-breadcrumb">MÓDULO 2 · AULA 3 DE 8</div>
          <h1 className="content-title">Projetando seu sistema pessoal</h1>
        </div>
        <button className={`mark-done-btn${isDone ? " done" : ""}`} id="markDoneBtn" onClick={onToggleDone}>
          {isDone ? "✓ Aula concluída" : "Marcar como concluída"}
        </button>
      </div>

      <div className="video-player">
        <div className="player-inner">
          {!playClicked && (
            <button className="play-btn" onClick={() => setPlayClicked(true)}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--ink)" stroke="none">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          )}
          <p>Player de vídeo protegido</p>
        </div>
        <div className="video-controls">
          <button className="ctrl-btn">▶</button>
          <div className="progress-bar-wrap" onClick={handleScrub}>
            <div className="progress-bar-fill" id="vidProgress" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="time-display">22:14 / 57:30</span>
          <button className="ctrl-btn">⛶</button>
        </div>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        <a href="#" style={{ fontSize: "0.8rem", color: "var(--gold)", textDecoration: "none", border: "1px solid var(--border)", padding: "0.4rem 0.85rem", borderRadius: "100px" }}>
          ↓ Material da aula (PDF)
        </a>
        <a href="#" style={{ fontSize: "0.8rem", color: "var(--text-soft)", textDecoration: "none", border: "1px solid var(--border)", padding: "0.4rem 0.85rem", borderRadius: "100px" }}>
          ← Aula anterior
        </a>
        <a href="#" style={{ fontSize: "0.8rem", color: "var(--text-soft)", textDecoration: "none", border: "1px solid var(--border)", padding: "0.4rem 0.85rem", borderRadius: "100px" }}>
          Próxima aula →
        </a>
      </div>

      {/* Comments */}
      <div className="comments-section">
        <h4>
          Discussão da aula{" "}
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 400 }}>(14 comentários)</span>
        </h4>
        <div className="comment-input-wrap">
          <div className="comment-avatar">AL</div>
          <div style={{ flex: 1 }}>
            <textarea
              className="comment-field"
              placeholder="Compartilhe sua dúvida ou insight sobre esta aula..."
              id="commentInput"
              rows={2}
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            ></textarea>
            <button className="btn-primary" onClick={addComment} style={{ fontSize: "0.8rem", padding: "0.5rem 1rem", marginTop: "0.5rem" }}>
              Comentar
            </button>
          </div>
        </div>
        <div id="commentsList">
          {comments.map((comment) => (
            <div className="comment-item animate-in" key={comment.id}>
              <div className="comment-avatar">{comment.initials}</div>
              <div className="comment-bubble">
                <div className="comment-author">{comment.author}</div>
                <div className="comment-text">{comment.text}</div>
                <div className="comment-time">{comment.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
