"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import Tilt from "./Tilt";
import { useReveal } from "../hooks/useReveal";
import { useCart } from "../context/CartContext";

type Categoria = "todos" | "brasa" | "burger" | "acomp" | "doce";

interface Dish {
  cat: Exclude<Categoria, "todos">;
  nome: string;
  desc: string;
  preco: number;
}

const dishes: Dish[] = [
  {
    cat: "brasa",
    nome: "Ancho na brasa",
    desc: "300g de bife ancho, chimichurri da casa e sal de finalização.",
    preco: 64,
  },
  {
    cat: "brasa",
    nome: "Galeto fogo lento",
    desc: "Marinado 24h, assado na lenha, com farofa crocante.",
    preco: 48,
  },
  {
    cat: "burger",
    nome: "Burger da Casa",
    desc: "Smash duplo, queijo da serra, cebola na brasa e maionese defumada.",
    preco: 39,
  },
  {
    cat: "burger",
    nome: "Burger da horta",
    desc: "Blend de cogumelos grelhados, queijo vegetal e picles artesanal.",
    preco: 36,
  },
  {
    cat: "acomp",
    nome: "Batata na brasa",
    desc: "Rústica, defumada, com páprica e alecrim.",
    preco: 22,
  },
  {
    cat: "doce",
    nome: "Brownie de fogo",
    desc: "Servido quente com sorvete de creme e calda de caramelo salgado.",
    preco: 24,
  },
];

const tabs: { cat: Categoria; label: string }[] = [
  { cat: "todos", label: "Todos" },
  { cat: "brasa", label: "Da brasa" },
  { cat: "burger", label: "Burgers" },
  { cat: "acomp", label: "Acompanhamentos" },
  { cat: "doce", label: "Sobremesas" },
];

function DishCard({ dish, visible }: { dish: Dish; visible: boolean }) {
  const ref = useReveal<HTMLDivElement>();
  const { addItem } = useCart();

  return (
    <Tilt
      className="dish-tilt"
      max={10}
      style={{ display: visible ? "block" : "none" }}
    >
      <div ref={ref} className="dish rev" data-cat={dish.cat}>
        <div className="ph"></div>
        <div className="body">
          <h3>{dish.nome}</h3>
          <p>{dish.desc}</p>
          <div className="foot">
            <span className="price">R$ {dish.preco}</span>
            <button
              className="add"
              type="button"
              onClick={() => addItem(dish.nome, dish.preco)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </Tilt>
  );
}

export default function Cardapio() {
  const [ativo, setAtivo] = useState<Categoria>("todos");

  return (
    <section id="cardapio">
      <Reveal as="div" className="sec-head">
        <p className="eyebrow">Cardápio</p>
        <h2>Hoje tem fogo</h2>
        <p>
          Toque no + para montar seu pedido. Retirada no balcão ou entrega com
          taxa por bairro.
        </p>
      </Reveal>
      <Reveal as="div" className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.cat}
            type="button"
            className={`tab${ativo === tab.cat ? " on" : ""}`}
            onClick={() => setAtivo(tab.cat)}
          >
            {tab.label}
          </button>
        ))}
      </Reveal>
      <div className="menu" id="menu">
        {dishes.map((dish) => (
          <DishCard
            key={dish.nome}
            dish={dish}
            visible={ativo === "todos" || dish.cat === ativo}
          />
        ))}
      </div>
    </section>
  );
}
