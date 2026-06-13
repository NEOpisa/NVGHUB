import Reveal from "./Reveal";

const especialidades = [
  {
    title: "Implantes dentários",
    text: "Reabilitação com cirurgia guiada por computador, mais previsibilidade e recuperação mais confortável.",
  },
  {
    title: "Lentes de contato dental",
    text: "Facetas ultrafinas em porcelana, planejadas com prévia digital do resultado antes de qualquer procedimento.",
  },
  {
    title: "Ortodontia & alinhadores",
    text: "Alinhadores invisíveis e aparelhos estéticos com acompanhamento por escaneamento 3D.",
  },
  {
    title: "Harmonização orofacial",
    text: "Procedimentos conduzidos por especialistas, com naturalidade como princípio inegociável.",
  },
  {
    title: "Prevenção & periodontia",
    text: "Programa de acompanhamento contínuo com lembretes automáticos de retorno e limpeza.",
  },
  {
    title: "Sedação consciente",
    text: "Atendimento humanizado para pacientes com medo de dentista, com protocolos de conforto.",
  },
];

export default function Especialidades() {
  return (
    <section id="especialidades">
      <Reveal as="div" className="sec-head">
        <p className="eyebrow">Capítulo 02 · Especialidades</p>
        <h2>Tratamentos para cada fase do seu sorriso</h2>
        <p>
          Cada especialidade tem página própria com indicações, casos reais e
          respostas às dúvidas mais comuns.
        </p>
      </Reveal>
      <div className="esp-rows">
        {especialidades.map((item, idx) => (
          <Reveal as="a" className="esp-row" href="#agendar" key={item.title}>
            <span className="num">{String(idx + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <span className="go">Ver casos →</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
