export default function ContentCertificate() {
  return (
    <div id="content-certificate" className="animate-in">
      <div className="content-header">
        <div>
          <div className="content-breadcrumb">ÁREA DE MEMBROS</div>
          <h1 className="content-title">Seu Certificado</h1>
        </div>
        <button className="btn-primary" style={{ fontSize: "0.85rem", padding: "0.6rem 1.2rem", opacity: 0.4, cursor: "not-allowed" }}>
          Disponível ao concluir
        </button>
      </div>
      <p style={{ color: "var(--text-soft)", marginBottom: "2rem", fontSize: "0.9rem" }}>
        Complete 100% do curso para desbloquear e baixar seu certificado personalizado.
      </p>
      <div className="certificate">
        <div className="cert-logo">Código Pro</div>
        <h2>Certificado de Conclusão</h2>
        <div className="student-name">Mariana Ferreira</div>
        <p>
          concluiu com êxito o programa completo do Código Pro, demonstrando domínio dos
          fundamentos de posicionamento, sistemas de produtividade e estratégia de crescimento
          profissional.
        </p>
        <div className="cert-seal">
          CERT
          <br />
          2025
        </div>
        <div className="cert-footer">
          <span>Emitido em: 00/00/2025</span>
          <span>ID: 0042-2025-1180</span>
          <span>seudominio.com.br</span>
        </div>
      </div>
    </div>
  );
}
