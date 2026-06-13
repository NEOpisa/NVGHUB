"use client";

import { type Produto, badgeMap } from "@/app/data/produtos";
import { useStore } from "@/app/context/StoreContext";
import Tilt from "./Tilt";

export default function ProductCard({
  produto,
  dark = false,
}: {
  produto: Produto;
  dark?: boolean;
}) {
  const { addToCart } = useStore();

  return (
    <Tilt className="card-tilt" max={8}>
      <div className={`card${dark ? " menu-card" : ""}`}>
      <div
        className="card-img"
        style={{ backgroundImage: `url('${produto.img}')` }}
      />
      <div className="card-body">
        <div className="card-badges">
          {produto.badges.map((b) => (
            <span key={b} className={`badge badge-${b}`}>
              {badgeMap[b] || b}
            </span>
          ))}
        </div>
        <div className="card-name">{produto.nome}</div>
        <div className="card-desc">
          {produto.desc}{" "}
          <em style={{ fontSize: "0.78rem", opacity: 0.65 }}>
            {produto.porcoes}
          </em>
        </div>
        <div className="card-footer">
          <div className="card-price">
            R$ {produto.preco.toFixed(2).replace(".", ",")}{" "}
            <small>/ {produto.porcoes}</small>
          </div>
          <button
            className="card-add"
            onClick={() => addToCart(produto.id)}
            title="Adicionar"
          >
            +
          </button>
        </div>
      </div>
      </div>
    </Tilt>
  );
}
