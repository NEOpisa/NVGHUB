"use client";

import { useStore } from "@/app/context/StoreContext";
import { IconSpark } from "./icons";

export default function Toast() {
  const { toastMsg, toastVisible } = useStore();

  return (
    <div className={`toast${toastVisible ? " show" : ""}`} id="toast">
      <span className="toast-icon">
        <IconSpark />
      </span>
      <span id="toast-msg">{toastMsg}</span>
    </div>
  );
}
