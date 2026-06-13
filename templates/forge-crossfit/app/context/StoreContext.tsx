"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

type StoreContextValue = {
  isPlanoModalOpen: boolean;
  openPlanoModal: () => void;
  closePlanoModal: () => void;
  confirmarPlano: () => void;

  isAreaModalOpen: boolean;
  openAreaModal: () => void;
  closeAreaModal: () => void;
  loginAluno: () => void;

  toastMsg: string;
  toastVisible: boolean;
  showToast: (msg: string) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [isPlanoModalOpen, setPlanoModalOpen] = useState(false);
  const [isAreaModalOpen, setAreaModalOpen] = useState(false);

  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 3500);
  }, []);

  const openPlanoModal = useCallback(() => setPlanoModalOpen(true), []);
  const closePlanoModal = useCallback(() => setPlanoModalOpen(false), []);

  const openAreaModal = useCallback(() => setAreaModalOpen(true), []);
  const closeAreaModal = useCallback(() => setAreaModalOpen(false), []);

  const confirmarPlano = useCallback(() => {
    setPlanoModalOpen(false);
    showToast("Assinatura confirmada. Bem-vindo ao [Nome da Academia].");
  }, [showToast]);

  const loginAluno = useCallback(() => {
    setAreaModalOpen(false);
    if (typeof window !== "undefined") {
      const el = document.getElementById("area-aluno");
      el?.scrollIntoView({ behavior: "smooth" });
    }
    showToast("Bem-vindo de volta, [Nome do Aluno].");
  }, [showToast]);

  const value: StoreContextValue = {
    isPlanoModalOpen,
    openPlanoModal,
    closePlanoModal,
    confirmarPlano,
    isAreaModalOpen,
    openAreaModal,
    closeAreaModal,
    loginAluno,
    toastMsg,
    toastVisible,
    showToast,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within a StoreProvider");
  return ctx;
}
