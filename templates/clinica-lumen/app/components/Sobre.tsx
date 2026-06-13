import Reveal from "./Reveal";

export default function Sobre() {
  return (
    <section className="sobre" id="sobre">
      <div className="wrap">
        <Reveal as="div">
          <p className="eyebrow">Capítulo 03 · A clínica</p>
          <h2>12 anos elevando o padrão da odontologia na região</h2>
          <p>
            A Clínica Lumen nasceu de uma convicção: tratamento de excelência começa
            no diagnóstico. Por isso investimos em tomografia digital,
            escaneamento intraoral e planejamento assistido por software —
            tudo dentro da própria clínica.
          </p>
          <ul>
            <li>Centro de diagnóstico digital próprio</li>
            <li>Protocolos de biossegurança auditados</li>
            <li>Salas individuais e ambiente climatizado</li>
            <li>Estacionamento e acessibilidade completa</li>
          </ul>
        </Reveal>
        <Reveal
          as="div"
          className="sobre-visual"
          role="img"
          aria-label="Interior da clínica"
        />
      </div>
    </section>
  );
}
