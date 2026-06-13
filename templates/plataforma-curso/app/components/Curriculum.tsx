import { curriculumModules } from "../data/curriculum";
import Tilt from "./Tilt";

export default function Curriculum() {
  return (
    <section id="curriculum" style={{ padding: "6rem 2rem", background: "var(--ink-soft)" }}>
      <div className="section-inner">
        <div className="section-label">Conteúdo programático</div>
        <h2 className="section-title">
          O que você vai <em>dominar</em>
        </h2>
        <p style={{ color: "var(--text-soft)", maxWidth: "560px", marginBottom: "0.5rem", lineHeight: 1.7 }}>
          6 módulos projetados para transformação progressiva — cada etapa prepara terreno para a
          próxima.
        </p>
        <div className="curriculum-grid">
          {curriculumModules.map((mod) => (
            <Tilt className="module-tilt" max={8} key={mod.num}>
              <div className="module-card">
                <div className="module-num">{mod.num}</div>
                <h3>{mod.title}</h3>
                <p>{mod.description}</p>
                <div className="module-lessons">
                  {mod.lessons.map((lesson) => (
                    <span className="lesson-tag" key={lesson}>
                      {lesson}
                    </span>
                  ))}
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
