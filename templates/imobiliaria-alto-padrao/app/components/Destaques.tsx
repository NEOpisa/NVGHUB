import Reveal from "./Reveal";

const imoveis = [
  {
    tag: "Exclusivo",
    brass: true,
    loc: "[Bairro Nobre] · [Cidade]",
    nome: "Casa Térrea com Pátio Interno",
    preco: "R$ 4.850.000",
    dorm: "4 suítes",
    banho: "6 banhos",
    area: "520 m²",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
  },
  {
    tag: "Cobertura",
    loc: "[Bairro Nobre] · [Cidade]",
    nome: "Cobertura Duplex Vista Parque",
    preco: "R$ 6.200.000",
    dorm: "3 suítes",
    banho: "4 banhos",
    area: "310 m²",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
  },
  {
    tag: "Lançamento",
    loc: "[Bairro Nobre] · [Cidade]",
    nome: "Residência Contemporânea",
    preco: "R$ 3.480.000",
    dorm: "4 suítes",
    banho: "5 banhos",
    area: "440 m²",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
  {
    tag: "Exclusivo",
    brass: true,
    loc: "[Bairro Nobre] · [Cidade]",
    nome: "Apartamento Garden Reformado",
    preco: "R$ 2.150.000",
    dorm: "3 dorm.",
    banho: "3 banhos",
    area: "180 m²",
    img: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800&q=80",
  },
  {
    tag: "Casa de Campo",
    loc: "[Condomínio] · [Cidade]",
    nome: "Casa em Condomínio Fechado",
    preco: "R$ 5.700.000",
    dorm: "5 suítes",
    banho: "7 banhos",
    area: "680 m²",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
  },
  {
    tag: "Vista Mar",
    loc: "[Orla] · [Cidade]",
    nome: "Apartamento Frente Mar",
    preco: "R$ 4.100.000",
    dorm: "4 suítes",
    banho: "5 banhos",
    area: "260 m²",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
  },
];

const Bed = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 14h18M5 10V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3M3 18v2M21 18v2" /></svg>
);
const Bath = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3ZM6 12V6a2 2 0 0 1 2-2 2 2 0 0 1 2 2M7 19l-1 2M18 19l1 2" /></svg>
);
const Area = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 9V4h5M20 15v5h-5M4 4l6 6M20 20l-6-6" /></svg>
);

export default function Destaques() {
  return (
    <section id="destaques">
      <div className="wrap">
        <div className="sec-top">
          <Reveal className="sec-head">
            <p className="eyebrow">Seleção da casa</p>
            <h2>
              Imóveis <em>em destaque</em>
            </h2>
          </Reveal>
          <Reveal>
            <a className="btn ghost" href="#contato">
              Ver portfólio completo
            </a>
          </Reveal>
        </div>

        <div className="listings">
          {imoveis.map((im) => (
            <Reveal as="article" className="listing" key={im.nome}>
              <div className="listing-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={im.img} alt={im.nome} loading="lazy" />
                <span className={`listing-tag${im.brass ? " brass" : ""}`}>{im.tag}</span>
                <span className="listing-fav" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 21s-7-4.5-9.5-9A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z" /></svg>
                </span>
              </div>
              <div className="listing-body">
                <p className="listing-loc">{im.loc}</p>
                <h3>{im.nome}</h3>
                <p className="listing-price">
                  {im.preco}
                  <small>Condições e IPTU sob consulta</small>
                </p>
                <div className="specs">
                  <span className="spec"><Bed /> {im.dorm}</span>
                  <span className="spec"><Bath /> {im.banho}</span>
                  <span className="spec"><Area /> {im.area}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
