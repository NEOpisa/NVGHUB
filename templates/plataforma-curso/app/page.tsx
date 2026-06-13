"use client";

import { useEffect, useState } from "react";
import TopNav from "./components/TopNav";
import SalesView from "./components/SalesView";
import MembersView from "./components/MembersView";
import QuizOverlay from "./components/QuizOverlay";
import LoginOverlay from "./components/LoginOverlay";
import UpsellOverlay from "./components/UpsellOverlay";
import { ContentKey } from "./data/sidebar";

export type View = "sales" | "members";

export default function Home() {
  const [view, setViewState] = useState<View>("sales");
  const [currentContent, setCurrentContent] = useState<ContentKey>("dashboard");
  const [progressPct, setProgressPct] = useState(38);
  const [isDone, setIsDone] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [showQuiz, setShowQuiz] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);

  function setView(v: View) {
    setViewState(v);
    if (v === "members") {
      setCurrentContent("dashboard");
      setSidebarOpen(false);
    }
  }

  useEffect(() => {
    if (view === "members") {
      window.scrollTo(0, 64);
    } else {
      window.scrollTo(0, 0);
    }
  }, [view]);

  useEffect(() => {
    if (view === "members") {
      window.scrollTo(0, 64);
    }
  }, [currentContent, view]);

  function smoothTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  function handleToggleDone() {
    setIsDone((prev) => {
      const next = !prev;
      if (next) {
        setProgressPct(Math.min(100, 38 + 4));
      }
      return next;
    });
  }

  function handlePurchase() {
    setShowUpsell(true);
  }

  function handleCloseUpsell() {
    setShowUpsell(false);
    setView("members");
  }

  function handleDoLogin() {
    setShowLogin(false);
    setView("members");
  }

  return (
    <>
      {showQuiz && <QuizOverlay onClose={() => setShowQuiz(false)} />}
      {showLogin && <LoginOverlay onLogin={handleDoLogin} onClose={() => setShowLogin(false)} />}
      {showUpsell && <UpsellOverlay onClose={handleCloseUpsell} />}

      <TopNav
        view={view}
        setView={setView}
        onShowLogin={() => setShowLogin(true)}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        smoothTo={smoothTo}
      />

      {view === "sales" && <SalesView onPurchase={handlePurchase} />}
      {view === "members" && (
        <MembersView
          currentContent={currentContent}
          setCurrentContent={setCurrentContent}
          progressPct={progressPct}
          isDone={isDone}
          onToggleDone={handleToggleDone}
          sidebarOpen={sidebarOpen}
        />
      )}
    </>
  );
}
