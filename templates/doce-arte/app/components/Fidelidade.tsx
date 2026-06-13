export default function Fidelidade() {
  return (
    <section id="fidelidade">
      <p className="section-eyebrow">✦ Para nossos clientes</p>
      <h2 className="section-title">
        Programa de <em>fidelidade</em>
      </h2>
      <p
        style={{
          marginTop: "1rem",
          fontSize: "1rem",
          opacity: 0.85,
          maxWidth: "560px",
          margin: "1rem auto 0",
        }}
      >
        A cada pedido você acumula pontos e troca por descontos reais. Sem
        pegadinhas.
      </p>
      <div className="fidelidade-cards">
        <div className="fid-card">
          <h4>Boas-vindas</h4>
          <p>
            10% de desconto no primeiro pedido. Use o cupom{" "}
            <strong>BEMVINDO10</strong> no carrinho.
          </p>
        </div>
        <div className="fid-card">
          <h4>Cashback 5%</h4>
          <p>
            Todo pedido gera 5% de cashback em pontos. Troque por produtos ou
            desconto na próxima compra.
          </p>
        </div>
        <div className="fid-card">
          <h4>Cliente VIP</h4>
          <p>
            Após 10 pedidos: frete grátis sempre, acesso antecipado a
            novidades e 15% de desconto.
          </p>
        </div>
        <div className="fid-card">
          <h4>Aniversário</h4>
          <p>
            No seu mês de aniversário, ganhe um docinho artesanal de brinde em
            qualquer pedido acima de R$50.
          </p>
        </div>
      </div>
    </section>
  );
}
