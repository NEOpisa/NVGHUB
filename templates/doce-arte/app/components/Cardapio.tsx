"use client";

import { useState } from "react";
import { produtos } from "@/app/data/produtos";
import ProductCard from "./ProductCard";

type FiltroCat = "todos" | "bolo" | "doce" | "salgado" | "bebida" | "veg" | "gf";

const filtros: { key: FiltroCat; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "bolo", label: "Bolos" },
  { key: "doce", label: "Doces Finos" },
  { key: "salgado", label: "Salgados" },
  { key: "bebida", label: "Bebidas" },
  { key: "veg", label: "Vegetariano" },
  { key: "gf", label: "Sem Glúten" },
];

export default function Cardapio() {
  const [filtro, setFiltro] = useState<FiltroCat>("todos");

  const filtered =
    filtro === "todos"
      ? produtos
      : filtro === "veg"
      ? produtos.filter((p) => p.veg)
      : filtro === "gf"
      ? produtos.filter((p) => p.gf)
      : produtos.filter((p) => p.cat === filtro);

  return (
    <section id="cardapio">
      <p className="section-eyebrow">✦ Tudo que preparamos</p>
      <h2 className="section-title">
        Cardápio <em>completo</em>
      </h2>
      <div className="filters">
        {filtros.map((f) => (
          <button
            key={f.key}
            className={`filter-btn${f.key === "veg" ? " veg" : ""}${
              filtro === f.key ? " active" : ""
            }`}
            onClick={() => setFiltro(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="menu-grid" id="menu-grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} produto={p} dark />
        ))}
      </div>
    </section>
  );
}
