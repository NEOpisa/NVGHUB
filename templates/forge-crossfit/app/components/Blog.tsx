import Reveal from "./Reveal";
import { blogPosts } from "@/app/data/blogPosts";

export default function Blog() {
  return (
    <section id="blog" className="sec">
      <p className="sec-label">✦ Conhecimento</p>
      <h2 className="sec-title">
        Blog de treino <span>e nutrição</span>
      </h2>
      <div className="blog-grid">
        {blogPosts.map((p) => (
          <Reveal className="blog-card" key={p.title}>
            <div
              className="blog-img"
              style={{ backgroundImage: `url('${p.img}')` }}
            ></div>
            <div className="blog-body">
              <div className="blog-cat">{p.cat}</div>
              <div className="blog-title">{p.title}</div>
              <div className="blog-meta">{p.data}</div>
            </div>
          </Reveal>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
        <a href="#" className="btn-ghost">
          Ver todos os artigos →
        </a>
      </div>
    </section>
  );
}
