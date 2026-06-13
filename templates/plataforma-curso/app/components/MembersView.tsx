"use client";

import { ContentKey } from "../data/sidebar";
import Sidebar from "./Sidebar";
import ContentDashboard from "./ContentDashboard";
import ContentLesson from "./ContentLesson";
import ContentCertificate from "./ContentCertificate";
import ContentLocked from "./ContentLocked";
import ContentMod1 from "./ContentMod1";

interface MembersViewProps {
  currentContent: ContentKey;
  setCurrentContent: (c: ContentKey) => void;
  progressPct: number;
  isDone: boolean;
  onToggleDone: () => void;
  sidebarOpen: boolean;
}

export default function MembersView({
  currentContent,
  setCurrentContent,
  progressPct,
  isDone,
  onToggleDone,
  sidebarOpen,
}: MembersViewProps) {
  return (
    <div className="view active" id="membersView">
      <div className="members-layout">
        <Sidebar
          currentContent={currentContent}
          setCurrentContent={setCurrentContent}
          progressPct={progressPct}
          sidebarOpen={sidebarOpen}
        />
        <main className="content-area" id="mainContent">
          {currentContent === "dashboard" && <ContentDashboard setCurrentContent={setCurrentContent} />}
          {currentContent === "lesson" && <ContentLesson isDone={isDone} onToggleDone={onToggleDone} />}
          {currentContent === "certificate" && <ContentCertificate />}
          {currentContent === "mod1" && <ContentMod1 setCurrentContent={setCurrentContent} />}
          {currentContent === "locked" && <ContentLocked setCurrentContent={setCurrentContent} />}
        </main>
      </div>
    </div>
  );
}
