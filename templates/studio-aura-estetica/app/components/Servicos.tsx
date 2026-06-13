import Reveal from "./Reveal";

const servicos = [
  {
    nome: "Design de sobrancelhas",
    desc: "Mapeamento facial + design personalizado com ou sem henna.",
    duracao: "45 min",
    preco: "R$ 0,00",
  },
  {
    nome: "Extensão de cílios",
    desc: "Volume brasileiro, híbrido ou egípcio com fios premium.",
    duracao: "2h",
    preco: "R$ 0,00",
  },
  {
    nome: "Limpeza de pele",
    desc: "Protocolo completo com extração, máscara calmante e proteção.",
    duracao: "1h30",
    preco: "R$ 0,00",
  },
  {
    nome: "Nails design",
    desc: "Alongamento em gel, banho de gel e nail art exclusiva.",
    duracao: "1h40",
    preco: "R$ 0,00",
  },
  {
    nome: "Lash lifting",
    desc: "Curvatura natural dos seus próprios cílios, efeito por até 8 semanas.",
    duracao: "1h",
    preco: "R$ 0,00",
  },
  {
    nome: "Pacote [Nome do Studio] Day",
    desc: "Sobrancelha + limpeza de pele + nails no mesmo dia, com desconto.",
    duracao: "3h30",
    preco: "R$ 0,00",
  },
];

export default function Servicos() {
  return (
    <section id="servicos">
      <Reveal className="sec-head">
        <p className="eyebrow">Menu de serviços</p>
        <h2>Escolha o seu momento</h2>
        <p>
          Valores transparentes e duração real de cada procedimento — para
          você planejar seu dia.
        </p>
      </Reveal>
      <div className="serv-grid">
        {servicos.map((s) => (
          <Reveal as="div" key={s.nome} className="serv">
            <h3>{s.nome}</h3>
            <p>{s.desc}</p>
            <div className="meta">
              <span>{s.duracao}</span>
              <b>{s.preco}</b>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
