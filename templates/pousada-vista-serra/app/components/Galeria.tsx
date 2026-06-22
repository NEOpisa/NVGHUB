const PHOTOS = [
  { src: "https://images.unsplash.com/photo-1518602164578-cd0074062767?w=900&q=80", cls: "g-tall" },
  { src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=80", cls: "" },
  { src: "https://images.unsplash.com/photo-1455587734955-081b22074882?w=900&q=80", cls: "" },
  { src: "https://images.unsplash.com/photo-1521783988139-89397d761dce?w=1100&q=80", cls: "g-wide" },
  { src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900&q=80", cls: "" },
  { src: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=900&q=80", cls: "" },
];

export default function Galeria() {
  return (
    <section className="section gallery" id="galeria">
      <div className="wrap">
        <div className="section-head center">
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            Galeria
          </span>
          <h2>Um lugar que se vê melhor em fotos</h2>
        </div>
        <div className="gallery-grid">
          {PHOTOS.map((p, i) => (
            <img key={i} className={p.cls} src={p.src} alt={`Vista da pousada ${i + 1}`} loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  );
}
