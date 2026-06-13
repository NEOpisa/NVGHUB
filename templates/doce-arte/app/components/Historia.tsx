export default function Historia() {
  return (
    <section id="historia">
      <div className="historia-layout">
        <div className="historia-img-wrap">
          <div className="historia-img"></div>
          <div className="historia-accent">
            <strong>[X]</strong>
            <span>
              anos de
              <br />
              amor
            </span>
          </div>
        </div>
        <div className="historia-text">
          <p className="section-eyebrow">✦ Nossa história</p>
          <h2 className="section-title" style={{ marginBottom: "1.5rem" }}>
            Nascida numa <em>cozinha de família</em>
          </h2>
          <p>
            Em [XXXX], [Nome da Confeiteira/Proprietária] transformou as
            receitas da avó em uma confeitaria que virou ponto de encontro do
            bairro. O que começou com uma mesa de doces em festas de família
            cresceu até se tornar o endereço certo para quem busca sabor
            verdadeiro.
          </p>
          <p>
            Trabalhamos com ingredientes selecionados, massa fresca e sem
            conservantes. Cada bolo sai do forno com a atenção que você
            esperaria de uma avó fazendo para o neto.
          </p>
          <p>
            Sem intermediários, sem taxas de marketplace — só você, nós e o
            amor que colocamos em cada receita.
          </p>
          <div className="chef-sig">
            <div className="chef-avatar"></div>
            <div className="chef-info">
              <strong>[Nome da Confeiteira/Proprietária]</strong>
              <span>Chef Confeiteira & Fundadora</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
