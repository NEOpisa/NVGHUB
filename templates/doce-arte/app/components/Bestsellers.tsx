import { produtos } from "@/app/data/produtos";
import ProductCard from "./ProductCard";

export default function Bestsellers() {
  const destaque = produtos.slice(0, 4);

  return (
    <section id="mais-vendidos">
      <div className="bestsellers-header">
        <div>
          <p className="section-eyebrow">✦ Favoritos da casa</p>
          <h2 className="section-title">
            Mais <em>vendidos</em>
          </h2>
        </div>
        <a href="#cardapio" className="see-all">
          Ver tudo →
        </a>
      </div>
      <div className="bestsellers-grid" id="bestsellers-grid">
        {destaque.map((p) => (
          <ProductCard key={p.id} produto={p} />
        ))}
      </div>
    </section>
  );
}
