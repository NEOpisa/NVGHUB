import { testimonials } from "../data/testimonials";

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: "6rem 2rem" }}>
      <div className="section-inner">
        <div className="section-label">Prova social</div>
        <h2 className="section-title">
          O que dizem os <em>alunos</em>
        </h2>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t.name}>
              <div className="stars">★★★★★</div>
              <blockquote>&quot;{t.quote}&quot;</blockquote>
              <div className="testimonial-author">
                <div className="author-avatar">{t.initials}</div>
                <div className="author-info">
                  <strong>{t.name}</strong>
                  <br />
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
