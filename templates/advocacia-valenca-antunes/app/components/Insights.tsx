import Reveal from "./Reveal";

const posts = [
  {
    tag: "Tributário",
    title: "Reforma tributária: o cronograma que sua empresa precisa seguir em 2026",
    text: "O que muda na transição CBS/IBS e onde estão os riscos de quem deixar para depois.",
    date: "Jun 2026",
  },
  {
    tag: "Trabalhista",
    title: "Trabalho híbrido: as cláusulas que evitam passivo trabalhista",
    text: "Como formalizar o regime híbrido sem criar horas extras invisíveis.",
    date: "Mai 2026",
  },
  {
    tag: "Societário",
    title: "Holding familiar ainda vale a pena? O que avaliar antes de constituir",
    text: "Critérios objetivos de economia, sucessão e proteção patrimonial.",
    date: "Mai 2026",
  },
];

export default function Insights() {
  return (
    <section className="insights" id="insights">
      <div className="wrap">
        <Reveal className="sec-head">
          <h2>Análises que antecipam o que afeta sua empresa</h2>
          <span className="protocolo">Boletim · edição corrente</span>
        </Reveal>
        <ul className="posts">
          {posts.map((post) => (
            <Reveal as="li" className="post" key={post.title}>
              <a href="#">
                <time>{post.date}</time>
                <h3>{post.title}</h3>
                <span className="tag">{post.tag}</span>
                <p className="resumo">{post.text}</p>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
