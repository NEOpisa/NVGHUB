"use client";

import { useStore } from "@/app/context/StoreContext";

export default function Toast() {
  const { toastMsg, toastVisible } = useStore();

  return (
    <div className={`toast${toastVisible ? " show" : ""}`} id="toast">
      <span id="toast-msg">{toastMsg}</span>
    </div>
  );
}
