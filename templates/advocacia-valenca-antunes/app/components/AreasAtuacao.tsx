import Reveal from "./Reveal";

const areas = [
  {
    num: "§ 1º",
    title: "Direito Tributário",
    text: "Pagar só o imposto devido — nada além. Revisão fiscal, planejamento tributário e recuperação de créditos pagos indevidamente.",
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
    <section className="folha" id="areas">
      <div className="wrap">
        <div className="timbre">
          <b>Valença &amp; Antunes — Advocacia</b>
          <span>Folha 01 / 03</span>
        </div>
        <div className="areas-grid">
          <Reveal className="areas-head">
            <h2>Áreas de atuação</h2>
            <p>
              Seis frentes, um mesmo método: entender o risco real do seu negócio antes de propor
              qualquer tese. Cada área tem página própria, escrita em linguagem direta.
            </p>
            <a className="btn em-papel" href="#contato">
              Falar com um sócio
            </a>
          </Reveal>
          <ul className="clausulas">
            {areas.map((area) => (
              <Reveal as="li" className="clausula" key={area.num}>
                <a href="#contato">
                  <span className="num">{area.num}</span>
                  <h3>{area.title}</h3>
                  <span className="seta" aria-hidden="true">
                    →
                  </span>
                  <p>{area.text}</p>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
