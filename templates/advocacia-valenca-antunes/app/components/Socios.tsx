import Reveal from "./Reveal";

const socios = [
  {
    nome: "[Nome do(a) Advogado(a)]",
    oab: "OAB/UF 000.000 · [Área de Atuação]",
    bio: "Mestre em Direito Tributário (PUC-SP), autora de dois livros sobre recuperação de créditos e professora convidada de pós-graduação.",
  },
  {
    nome: "[Nome do(a) Advogado(a)]",
    oab: "OAB/UF 000.000 · [Área de Atuação]",
    bio: "LL.M. em Direito Empresarial (Insper), conduziu mais de 60 operações societárias e estruturações de holdings familiares.",
  },
  {
    nome: "[Nome do(a) Advogado(a)]",
    oab: "OAB/UF 000.000 · [Área de Atuação]",
    bio: "Especialista em contencioso estratégico, à frente da defesa de empresas com mais de 5.000 colaboradores.",
  },
];

export default function Socios() {
  return (
    <section className="socios" id="socios">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="art">Art. 02 — Sócios</p>
          <h2>Quem assina a estratégia do seu caso</h2>
          <p>
            Formação sólida, produção acadêmica e prática de tribunal. Os sócios atuam pessoalmente
            nos casos do escritório.
          </p>
        </Reveal>
        <div className="soc-grid">
          {socios.map((socio) => (
            <Reveal className="socio" key={socio.bio}>
              <div className="ph"></div>
              <div className="info">
                <h3>{socio.nome}</h3>
                <p className="oab">{socio.oab}</p>
                <p>{socio.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
