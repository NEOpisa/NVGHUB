export default function Expert() {
  return (
    <section id="expert" className="expert-section" style={{ padding: "6rem 2rem" }}>
      <div className="section-inner expert-inner">
        <div>
          <div className="expert-portrait">
            <div className="portrait-placeholder">
              <span>?</span>
              <p>Foto de João Pedro Martins</p>
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
                <h4>+10 anos de experiência</h4>
                <p>Mais de uma década formando profissionais e liderando projetos na área.</p>
              </div>
            </div>
            <div className="cred-item">
              <div className="cred-dot"></div>
              <div>
                <h4>+8 mil alunos formados</h4>
                <p>
                  Comunidade ativa de alunos que já aplicaram o método na prática.
                </p>
              </div>
            </div>
            <div className="cred-item">
              <div className="cred-dot"></div>
              <div>
                <h4>Reconhecimento na área</h4>
                <p>
                  Presença reconhecida no mercado, com cases e resultados comprovados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
