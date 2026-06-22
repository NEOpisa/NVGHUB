const SVC = [
  { icon: "🔧", title: "Revisão completa", desc: "Checklist de 40 itens, troca de óleo, filtros e fluidos com peças originais." },
  { icon: "🛑", title: "Freios", desc: "Pastilhas, discos e fluido de freio. Segurança avaliada e testada na pista." },
  { icon: "🚗", title: "Suspensão e direção", desc: "Amortecedores, molas, pivôs e alinhamento computadorizado 3D." },
  { icon: "⚡", title: "Injeção eletrônica", desc: "Scanner de última geração para diagnóstico preciso de falhas e luzes no painel." },
  { icon: "❄️", title: "Ar-condicionado", desc: "Higienização, recarga de gás e troca de filtro para o ar sempre gelado." },
  { icon: "🔋", title: "Elétrica e bateria", desc: "Teste de carga, alternador, partida e troca de bateria com garantia." },
];

export default function Servicos() {
  return (
    <section className="section" id="servicos">
      <div className="wrap">
        <div className="section-head center">
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            O que fazemos
          </span>
          <h2>Tudo para o seu carro em um só lugar</h2>
          <p>Da manutenção preventiva ao reparo pesado, com mão de obra especializada.</p>
        </div>
        <div className="svc-grid">
          {SVC.map((s) => (
            <article className="svc" key={s.title}>
              <div className="svc-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
