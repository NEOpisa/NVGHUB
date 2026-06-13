import Reveal from "./Reveal";

const diffs = [
  {
    icon: "👥",
    title: "Turmas pequenas, atenção real",
    text: "Máximo 12 alunos por turma. Seu coach sabe seu nome, histórico de lesões e metas pessoais — não é número de matrícula.",
  },
  {
    icon: "📊",
    title: "Programação periodizada",
    text: "Planejamento científico de 12 semanas. Cada treino tem propósito — não é sortear exercício no dado.",
  },
  {
    icon: "🏆",
    title: "Comunidade que puxa junto",
    text: "O último a terminar o WOD recebe mais aplausos que o primeiro. Essa cultura é construída, não prometida.",
  },
  {
    icon: "📱",
    title: "Acompanhamento completo",
    text: "Área do aluno com histórico de cargas, fotos de progresso e comunicação direta com o coach.",
  },
];

export default function Porque() {
  return (
    <section id="porque" className="sec">
      <div className="porque-grid">
        <Reveal className="porque-img">
          <div className="porque-photo"></div>
          <div className="porque-badge">
            <strong>[X]</strong>
            <span>anos de [Nome da Academia]</span>
          </div>
        </Reveal>
        <Reveal>
          <p className="sec-label">✦ Por que o [Nome da Academia]</p>
          <h2 className="sec-title">
            A diferença que você <span>sente</span> no primeiro treino
          </h2>
          <div className="diff-list">
            {diffs.map((d) => (
              <div className="diff-item" key={d.title}>
                <div className="diff-icon">{d.icon}</div>
                <div>
                  <h4>{d.title}</h4>
                  <p>{d.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
