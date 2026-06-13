"use client";

import { useCart } from "../context/CartContext";

export default function Header() {
  const { itemCount, toggleCart } = useCart();

  return (
    <header>
      <div className="wrap">
        <nav>
          <a className="logo" href="#">
            Casa Braseiro
          </a>
          <ul className="nav-links">
            <li>
              <a href="#cardapio">Cardápio</a>
            </li>
            <li>
              <a href="#historia">A casa</a>
            </li>
            <li>
              <a href="#encomendas">Encomendas</a>
            </li>
            <li>
              <a href="#contato">Contato</a>
            </li>
          </ul>
          <button
            className="btn cart-btn"
            onClick={() => toggleCart(true)}
            type="button"
          >
            Pedido <span className="n">{itemCount}</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
