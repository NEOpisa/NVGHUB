import Reveal from "./Reveal";

const posts = [
  {
    tag: "Estética",
    titulo: "Lente de contato dental: para quem é indicada?",
    desc: "Entenda os critérios clínicos e o que esperar do resultado.",
  },
  {
    tag: "Implantes",
    titulo: "Implante dói? O que mudou com a cirurgia guiada",
    desc: "Como a tecnologia tornou o procedimento mais previsível.",
  },
  {
    tag: "Prevenção",
    titulo: "De quanto em quanto tempo fazer limpeza?",
    desc: "A recomendação ideal para cada perfil de paciente.",
  },
];

export default function Blog() {
  return (
    <section id="blog">
      <Reveal as="div" className="sec-head">
        <p className="eyebrow">Blog Clínica Lumen</p>
        <h2>Conteúdo para cuidar do seu sorriso</h2>
      </Reveal>
      <div className="blog-grid">
        {posts.map((post) => (
          <Reveal as="a" className="post" href="#" key={post.titulo}>
            <div className="ph" />
            <div className="info">
              <span className="tag">{post.tag}</span>
              <h3>{post.titulo}</h3>
              <p>{post.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
