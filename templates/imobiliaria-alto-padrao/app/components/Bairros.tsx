import Reveal from "./Reveal";

const bairros = [
  { nome: "Jardins", qtd: "32 imóveis", img: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=700&q=80" },
  { nome: "Beira-Mar", qtd: "18 imóveis", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=700&q=80" },
  { nome: "Alto da Colina", qtd: "24 imóveis", img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=700&q=80" },
  { nome: "Condomínios", qtd: "41 imóveis", img: "https://images.unsplash.com/photo-1518883115960-b2c0f1c4a5c7?w=700&q=80" },
];

export default function Bairros() {
  return (
    <section className="bairros" id="bairros">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="eyebrow">Onde estamos</p>
          <h2>
            Os endereços mais <em>desejados</em> da cidade
          </h2>
          <p>
            Conhecemos cada rua dos bairros que importam. Escolha uma região e
            veja o que temos de mais exclusivo.
          </p>
        </Reveal>
        <Reveal as="div" className="bairro-grid">
          {bairros.map((b) => (
            <a className="bairro" href="#destaques" key={b.nome}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.img} alt={b.nome} loading="lazy" />
              <span className="bairro-info">
                <b>{b.nome}</b>
                <span>{b.qtd}</span>
              </span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
