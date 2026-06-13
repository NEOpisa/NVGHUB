"use client";

import { useCart } from "../context/CartContext";

export default function Overlay() {
  const { cartOpen, toggleCart } = useCart();

  return (
    <div
      className={`overlay${cartOpen ? " on" : ""}`}
      id="ov"
      onClick={() => toggleCart(false)}
    />
  );
}
