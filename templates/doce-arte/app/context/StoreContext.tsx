"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { produtos, type Produto } from "@/app/data/produtos";

export type CartItem = Produto & { qty: number };

export type DeliveryMode = "entrega" | "retirada";

type StoreContextValue = {
  cart: CartItem[];
  addToCart: (id: number) => void;
  changeQty: (id: number, delta: number) => void;

  deliveryMode: DeliveryMode;
  setDeliveryMode: (mode: DeliveryMode) => void;

  desconto: number;
  aplicarCupom: (code: string) => void;

  selectedPay: number;
  setSelectedPay: (idx: number) => void;

  subtotal: number;
  taxaEntrega: number;
  total: number;

  finalizarPedido: () => void;

  isPedidoModalOpen: boolean;
  closePedidoModal: () => void;

  isCozinhaModalOpen: boolean;
  openCozinhaModal: () => void;
  closeCozinhaModal: () => void;

  toastMsg: string;
  toastVisible: boolean;
  showToast: (msg: string) => void;
};

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("entrega");
  const [desconto, setDesconto] = useState(0);
  const [selectedPay, setSelectedPay] = useState(0);

  const [isPedidoModalOpen, setPedidoModalOpen] = useState(false);
  const [isCozinhaModalOpen, setCozinhaModalOpen] = useState(false);

  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 3200);
  }, []);

  const addToCart = useCallback(
    (id: number) => {
      const p = produtos.find((x) => x.id === id);
      if (!p) return;
      setCart((prev) => {
        const ex = prev.find((x) => x.id === id);
        if (ex) {
          return prev.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x));
        }
        return [...prev, { ...p, qty: 1 }];
      });
      showToast(`${p.nome.split(" ").slice(0, 3).join(" ")} adicionado!`);
    },
    [showToast]
  );

  const changeQty = useCallback((id: number, delta: number) => {
    setCart((prev) => {
      const idx = prev.findIndex((x) => x.id === id);
      if (idx < 0) return prev;
      const next = [...prev];
      const newQty = next[idx].qty + delta;
      if (newQty <= 0) {
        next.splice(idx, 1);
      } else {
        next[idx] = { ...next[idx], qty: newQty };
      }
      return next;
    });
  }, []);

  const aplicarCupom = useCallback(
    (rawCode: string) => {
      const code = rawCode.toUpperCase().trim();
      if (code === "BEMVINDO10") {
        const sub = cart.reduce((a, i) => a + i.preco * i.qty, 0);
        setDesconto(sub * 0.1);
        showToast("Cupom BEMVINDO10 aplicado! 10% de desconto");
      } else if (code === "DOCINHO5") {
        setDesconto(5);
        showToast("Cupom aplicado: R$5,00 de desconto!");
      } else {
        showToast("Cupom inválido ou expirado.");
      }
    },
    [cart, showToast]
  );

  const subtotal = useMemo(
    () => cart.reduce((a, i) => a + i.preco * i.qty, 0),
    [cart]
  );
  const taxaEntrega = deliveryMode === "entrega" ? 10 : 0;
  const total = subtotal + taxaEntrega - desconto;

  const finalizarPedido = useCallback(() => {
    if (!cart.length) {
      showToast("Adicione itens ao carrinho primeiro!");
      return;
    }
    setPedidoModalOpen(true);
    setCart([]);
    setDesconto(0);
  }, [cart, showToast]);

  const closePedidoModal = useCallback(() => setPedidoModalOpen(false), []);
  const openCozinhaModal = useCallback(() => setCozinhaModalOpen(true), []);
  const closeCozinhaModal = useCallback(() => setCozinhaModalOpen(false), []);

  const value: StoreContextValue = {
    cart,
    addToCart,
    changeQty,
    deliveryMode,
    setDeliveryMode,
    desconto,
    aplicarCupom,
    selectedPay,
    setSelectedPay,
    subtotal,
    taxaEntrega,
    total,
    finalizarPedido,
    isPedidoModalOpen,
    closePedidoModal,
    isCozinhaModalOpen,
    openCozinhaModal,
    closeCozinhaModal,
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
