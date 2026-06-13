import Reveal from "./Reveal";

const fotos = [
  { cls: "a", cap: "Casa Pátio · Living", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1100&q=80" },
  { cls: "b", cap: "Edifício Lâmina · Fachada", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80" },
  { cls: "c", cap: "Residência Mata · Escada", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80" },
  { cls: "d", cap: "Retrofit Centro · Interior", img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1100&q=80" },
];

export default function Gallery() {
  return (
    <Reveal as="div" className="gallery" style={{ marginTop: "70px" }}>
      {fotos.map((f) => (
        <div className={`gphoto ${f.cls}`} key={f.cap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={f.img} alt={f.cap} loading="lazy" />
          <span className="gcap">{f.cap}</span>
        </div>
      ))}
    </Reveal>
  );
}
