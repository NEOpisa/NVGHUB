import Reveal from "./Reveal";

const areas = [
  {
    num: "§ 1º",
    title: "Direito Tributário",
    text: "Pagamos só o imposto devido — nada além. Revisão fiscal, planejamento tributário e recuperação de créditos pagos indevidamente.",
  },
  {
    num: "§ 2º",
    title: "Direito Trabalhista Empresarial",
    text: "Prevenção antes do litígio: auditoria de rotinas, defesa estratégica em reclamações e blindagem de contratos de trabalho.",
  },
  {
    num: "§ 3º",
    title: "Societário & M&A",
    text: "Acordos de sócios, holdings, sucessão e operações de compra e venda com segurança jurídica em cada cláusula.",
  },
  {
    num: "§ 4º",
    title: "Contratos Empresariais",
    text: "Contratos que evitam disputas: elaboração, revisão e negociação com foco no risco real do seu negócio.",
  },
  {
    num: "§ 5º",
    title: "Compliance & LGPD",
    text: "Programas de conformidade e adequação à LGPD que protegem a reputação e evitam sanções.",
  },
  {
    num: "§ 6º",
    title: "Recuperação de Crédito",
    text: "Cobrança estruturada e execução eficiente para transformar inadimplência em caixa.",
  },
];

export default function AreasAtuacao() {
  return (
    <section id="areas">
      <Reveal className="sec-head">
        <p className="art">Art. 01 — Áreas de atuação</p>
        <h2>O que sua empresa ganha em cada frente</h2>
        <p>
          Cada área tem página própria, escrita em linguagem direta: o problema que resolvemos e o
          resultado que você pode esperar.
        </p>
      </Reveal>
      <div className="areas">
        {areas.map((area) => (
          <Reveal className="area" key={area.num}>
            <span className="num">{area.num}</span>
            <h3>{area.title}</h3>
            <p>{area.text}</p>
            <a href="#contato">Conhecer a área</a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
