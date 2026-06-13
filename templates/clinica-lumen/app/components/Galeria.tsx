import Reveal from "./Reveal";

export default function Galeria() {
  return (
    <section>
      <Reveal as="div" className="sec-head">
        <p className="eyebrow">Nosso espaço</p>
        <h2>Um ambiente pensado para o seu conforto</h2>
      </Reveal>
      <Reveal as="div" className="gal">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Reveal>
    </section>
  );
}
