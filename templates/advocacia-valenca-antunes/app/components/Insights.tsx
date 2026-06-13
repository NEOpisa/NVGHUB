import Reveal from "./Reveal";

const posts = [
  {
    tag: "Tributário",
    title: "Reforma tributária: o cronograma que sua empresa precisa seguir em 2026",
    text: "O que muda na transição CBS/IBS e onde estão os riscos de quem deixar para depois.",
    date: "Junho de 2026",
  },
  {
    tag: "Trabalhista",
    title: "Trabalho híbrido: as cláusulas que evitam passivo trabalhista",
    text: "Como formalizar o regime híbrido sem criar horas extras invisíveis.",
    date: "Maio de 2026",
  },
  {
    tag: "Societário",
    title: "Holding familiar ainda vale a pena? O que avaliar antes de constituir",
    text: "Critérios objetivos de economia, sucessão e proteção patrimonial.",
    date: "Maio de 2026",
  },
];

export default function Insights() {
  return (
    <section id="insights">
      <Reveal className="sec-head">
        <p className="art">Art. 04 — Insights</p>
        <h2>Análises que antecipam o que afeta sua empresa</h2>
      </Reveal>
      <div className="posts">
        {posts.map((post) => (
          <Reveal as="a" className="post" href="#" key={post.title}>
            <span className="tag">{post.tag}</span>
            <h3>{post.title}</h3>
            <p>{post.text}</p>
            <time>{post.date}</time>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
