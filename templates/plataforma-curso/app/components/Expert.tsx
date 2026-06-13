export default function Expert() {
  return (
    <section id="expert" className="expert-section" style={{ padding: "6rem 2rem" }}>
      <div className="section-inner expert-inner">
        <div>
          <div className="expert-portrait">
            <div className="portrait-placeholder">
              <span>?</span>
              <p>Foto de [Nome do Mentor]</p>
            </div>
          </div>
        </div>
        <div>
          <div className="section-label">Quem está por trás</div>
          <h2 className="section-title">
            Uma trajetória
            <br />
            construída na <em>prática</em>
          </h2>
          <p style={{ color: "var(--text-soft)", marginBottom: "2.5rem", lineHeight: 1.7 }}>
            Não ensino teoria de livro. Tudo que está aqui foi testado, quebrado, ajustado e
            comprovado em cenários reais — com clientes reais, pressões reais, resultados
            mensuráveis.
          </p>
          <div className="expert-creds">
            <div className="cred-item">
              <div className="cred-dot"></div>
              <div>
                <h4>[Credencial 1]</h4>
                <p>[Descrição da credencial 1 — ex: tempo de experiência, número de alunos formados, etc.]</p>
              </div>
            </div>
            <div className="cred-item">
              <div className="cred-dot"></div>
              <div>
                <h4>[Credencial 2]</h4>
                <p>
                  [Descrição da credencial 2 — ex: projetos relevantes, faturamento gerado, etc.]
                </p>
              </div>
            </div>
            <div className="cred-item">
              <div className="cred-dot"></div>
              <div>
                <h4>[Credencial 3]</h4>
                <p>
                  [Descrição da credencial 3 — ex: reconhecimentos, prêmios, listas de destaque, etc.]
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
