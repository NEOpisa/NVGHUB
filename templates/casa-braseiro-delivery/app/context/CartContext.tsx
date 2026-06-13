"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  preco: number;
  q: number;
}

export type CartItems = Record<string, CartItem>;

interface CartContextValue {
  items: CartItems;
  addItem: (nome: string, preco: number) => void;
  mudar: (nome: string, delta: number) => void;
  bairro: string;
  setBairro: (bairro: string) => void;
  cartOpen: boolean;
  toggleCart: (open: boolean) => void;
  subtotal: number;
  frete: number;
  total: number;
  cashback: number;
  itemCount: number;
  finalizado: boolean;
  finalizar: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItems>({});
  const [bairro, setBairro] = useState("0");
  const [cartOpen, setCartOpen] = useState(false);
  const [finalizado, setFinalizado] = useState(false);

  const addItem = useCallback((nome: string, preco: number) => {
    setItems((prev) => {
      const atual = prev[nome] ?? { preco, q: 0 };
      return {
        ...prev,
        [nome]: { preco: atual.preco, q: atual.q + 1 },
      };
    });
    setFinalizado(false);
    setCartOpen(true);
  }, []);

  const mudar = useCallback((nome: string, delta: number) => {
    setItems((prev) => {
      const atual = prev[nome];
      if (!atual) return prev;
      const novaQ = atual.q + delta;
      const next = { ...prev };
      if (novaQ <= 0) {
        delete next[nome];
      } else {
        next[nome] = { ...atual, q: novaQ };
      }
      return next;
    });
    setFinalizado(false);
  }, []);

  const toggleCart = useCallback((open: boolean) => {
    setCartOpen(open);
  }, []);

  const keys = Object.keys(items);

  const subtotal = useMemo(
    () => keys.reduce((sum, k) => sum + items[k].preco * items[k].q, 0),
    [items, keys]
  );

  const itemCount = useMemo(
    () => keys.reduce((sum, k) => sum + items[k].q, 0),
    [items, keys]
  );

  const frete = keys.length ? parseFloat(bairro) : 0;
  const total = subtotal + frete;
  const cashback = subtotal * 0.05;

  const finalizar = useCallback(() => {
    if (!Object.keys(items).length) return;
    setFinalizado(true);
  }, [items]);

  const handleSetBairro = useCallback((value: string) => {
    setBairro(value);
  }, []);

  const value: CartContextValue = {
    items,
    addItem,
    mudar,
    bairro,
    setBairro: handleSetBairro,
    cartOpen,
    toggleCart,
    subtotal,
    frete,
    total,
    cashback,
    itemCount,
    finalizado,
    finalizar,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
