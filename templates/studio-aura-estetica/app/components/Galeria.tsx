import Reveal from "./Reveal";

export default function Galeria() {
  return (
    <section id="galeria">
      <Reveal className="sec-head">
        <p className="eyebrow">Resultados</p>
        <h2>Direto do nosso feed</h2>
        <p>
          Acompanhe os resultados no Instagram <b>@seuinstagram</b> — galeria
          sincronizada automaticamente.
        </p>
      </Reveal>
      <Reveal className="gal">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Reveal>
    </section>
  );
}
