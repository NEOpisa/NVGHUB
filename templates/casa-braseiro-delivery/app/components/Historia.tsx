import Reveal from "./Reveal";

export default function Historia() {
  return (
    <section className="hist" id="historia">
      <div className="wrap">
        <Reveal as="div">
          <p className="eyebrow">A casa</p>
          <h2 style={{ fontSize: "clamp(2rem,4vw,2.9rem)" }}>
            Uma família, um forno a lenha e 12+ anos de história
          </h2>
          <p style={{ marginTop: "16px" }}>
            O Casa Braseiro nasceu no quintal de Chef Marcos, assando
            galeto para os vizinhos aos domingos. O quintal cresceu, virou
            restaurante — mas o fogo continua o mesmo.
          </p>
          <p>
            Tudo aqui é feito na casa: dos pães de burger à maionese
            defumada. E quando você pede pelo nosso site, cada real fica
            entre a gente — sem comissão de aplicativo.
          </p>
        </Reveal>
        <Reveal
          className="hist-visual"
          role="img"
          aria-label="Forno a lenha da casa"
        />
      </div>
    </section>
  );
}
