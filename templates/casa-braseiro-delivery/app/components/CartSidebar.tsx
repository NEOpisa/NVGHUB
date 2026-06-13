"use client";

import { useCart } from "../context/CartContext";

function formatBRL(value: number) {
  return "R$ " + value.toFixed(2).replace(".", ",");
}

export default function CartSidebar() {
  const {
    items,
    mudar,
    bairro,
    setBairro,
    cartOpen,
    toggleCart,
    subtotal,
    frete,
    total,
    cashback,
    finalizado,
    finalizar,
  } = useCart();

  const keys = Object.keys(items);

  return (
    <aside
      className={`cart${cartOpen ? " open" : ""}`}
      id="cart"
      aria-label="Seu pedido"
    >
      <div className="head">
        <h3>Seu pedido</h3>
        <button
          className="close"
          onClick={() => toggleCart(false)}
          aria-label="Fechar"
          type="button"
        >
          ✕
        </button>
      </div>
      <div className="items" id="items">
        {keys.length === 0 ? (
          <p className="empty">
            Seu carrinho está vazio.
            <br />
            Escolha algo gostoso no cardápio
          </p>
        ) : (
          keys.map((k) => {
            const it = items[k];
            return (
              <div className="c-item" key={k}>
                <span>{k}</span>
                <div className="qt">
                  <button type="button" onClick={() => mudar(k, -1)}>
                    −
                  </button>
                  <b>{it.q}</b>
                  <button type="button" onClick={() => mudar(k, 1)}>
                    +
                  </button>
                  <span>{formatBRL(it.preco * it.q)}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className="foot">
        <div className="frete">
          <label htmlFor="bairro">Entrega ou retirada</label>
          <select
            id="bairro"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          >
            <option value="0">Retirar no balcão — grátis</option>
            <option value="6">Bairro 1 — R$ 6</option>
            <option value="9">Bairro 2 — R$ 9</option>
            <option value="12">Bairro 3 — R$ 12</option>
          </select>
        </div>
        <div className="tot">
          <span>Subtotal</span>
          <span id="sub">{formatBRL(subtotal)}</span>
        </div>
        <div className="tot">
          <span>Entrega</span>
          <span id="frete-v">{frete ? formatBRL(frete) : "Grátis"}</span>
        </div>
        <div className="tot big">
          <span>Total</span>
          <span id="tot">{formatBRL(total)}</span>
        </div>
        <button className="btn" type="button" onClick={finalizar}>
          {finalizado
            ? "Pedido enviado! Acompanhe no WhatsApp ✓"
            : "Pagar com Pix ou cartão"}
        </button>
        <p className="cb">
          Você vai acumular <span id="cash">{formatBRL(cashback)}</span> de
          cashback
        </p>
      </div>
    </aside>
  );
}
