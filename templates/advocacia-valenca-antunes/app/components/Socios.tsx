import Reveal from "./Reveal";

const socios = [
  {
    nome: "Helena Valença",
    iniciais: "HV",
    oab: "OAB/UF 000.000 · Tributário",
    bio: "Mestre em Direito Tributário (PUC-SP), autora de dois livros sobre recuperação de créditos e professora convidada de pós-graduação.",
    marcas: ["Mestrado PUC-SP", "2 livros publicados", "Pós-graduação — docente"],
  },
  {
    nome: "Ricardo Antunes",
    iniciais: "RA",
    oab: "OAB/UF 000.000 · Societário & M&A",
    bio: "LL.M. em Direito Empresarial (Insper), conduziu mais de 60 operações societárias e estruturações de holdings familiares.",
    marcas: ["LL.M. Insper", "60+ operações societárias", "Holdings familiares"],
  },
  {
    nome: "Beatriz Sarmento",
    iniciais: "BS",
    oab: "OAB/UF 000.000 · Contencioso Trabalhista",
    bio: "Especialista em contencioso estratégico, à frente da defesa de empresas com mais de 5.000 colaboradores.",
    marcas: ["Contencioso estratégico", "Empresas com 5.000+ colaboradores"],
  },
];

export default function Socios() {
  return (
    <section className="folha socios" id="socios">
      <div className="wrap">
        <div className="timbre">
          <b>Quadro de sócios</b>
          <span>Folha 02 / 03</span>
        </div>
        <Reveal className="sec-head">
          <h2>Quem assina a estratégia do seu caso</h2>
          <p>
            Formação sólida, produção acadêmica e prática de tribunal. Os sócios atuam pessoalmente
            nos casos do escritório.
          </p>
        </Reveal>
        <div>
          {socios.map((socio) => (
            <Reveal className="socio" key={socio.nome}>
              <div className="retrato" role="img" aria-label={`Retrato de ${socio.nome}`}>
                <b>{socio.iniciais}</b>
              </div>
              <div>
                <h3>{socio.nome}</h3>
                <p className="oab">{socio.oab}</p>
                <p className="bio">{socio.bio}</p>
                <div className="marcas">
                  {socio.marcas.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
