const painPoints = [
  {
    icon: "→",
    title: "Paralisia por excesso de informação",
    text: "Você consome conteúdo sem parar, mas na hora de agir, trava. Sabe muito e executa pouco.",
  },
  {
    icon: "◎",
    title: "Método sem consistência",
    text: "Começa um sistema, abandona, começa outro. Nunca há tempo de consolidar o que funciona.",
  },
  {
    icon: "△",
    title: "Resultados que não chegam",
    text: "Você se esforça, mas a sensação de estar andando em círculos nunca vai embora.",
  },
  {
    icon: "◇",
    title: "Falta de posicionamento claro",
    text: "Ninguém entende ao certo o que você faz, qual sua especialidade, por que deveriam te escolher.",
  },
  {
    icon: "⬡",
    title: "Síndrome do impostor",
    text: "No fundo, você não acredita que merece ser pago pelo que sabe. Isso sabota tudo.",
  },
  {
    icon: "✦",
    title: "Escala sem estrutura",
    text: "Quando aparecem mais clientes ou mais trabalho, tudo desmorona porque não há sistema.",
  },
];

export default function PainGrid() {
  return (
    <section style={{ padding: "6rem 2rem" }}>
      <div className="section-inner">
        <div className="section-label">Você se reconhece nisso?</div>
        <h2 className="section-title">
          As dores que impedem você
          <br />
          de <em>avançar de verdade</em>
        </h2>
        <div className="pain-grid">
          {painPoints.map((p) => (
            <div className="pain-card" key={p.title}>
              <div className="pain-card-icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
