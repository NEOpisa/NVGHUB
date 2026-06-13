import Reveal from "./Reveal";

export default function Encomendas() {
  return (
    <section id="encomendas">
      <Reveal as="div" className="sec-head">
        <p className="eyebrow">Mais que delivery</p>
        <h2>Do jeito que você precisar</h2>
      </Reveal>
      <div className="strip">
        <Reveal as="div" className="st-card">
          <span className="num">01</span>
          <h3>Acompanhe seu pedido</h3>
          <p>
            Status em tempo real: na brasa → saiu para entrega → chegou. Sem
            precisar perguntar no WhatsApp.
          </p>
        </Reveal>
        <Reveal as="div" className="st-card">
          <span className="num">02</span>
          <h3>Clube Casa Braseiro</h3>
          <p>
            5% de cashback em todo pedido pelo site, acumulado automático no
            seu cadastro para usar quando quiser.
          </p>
        </Reveal>
        <Reveal as="div" className="st-card">
          <span className="num">03</span>
          <h3>Eventos &amp; encomendas</h3>
          <p>
            Churrasco para empresas e festas a partir de 20 pessoas. Peça
            orçamento com 5 dias de antecedência.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
