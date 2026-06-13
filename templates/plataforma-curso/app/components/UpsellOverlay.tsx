"use client";

interface UpsellOverlayProps {
  onClose: () => void;
}

export default function UpsellOverlay({ onClose }: UpsellOverlayProps) {
  return (
    <div className="upsell-overlay" id="upsellOverlay">
      <div className="upsell-box animate-in">
        <div className="upsell-header">
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.7, marginBottom: "0.5rem" }}>
            Oferta especial — apenas agora
          </div>
          <h3>Turbine seus resultados</h3>
          <p>Adicione o Mentoring VIP à sua compra por apenas +R$ 0,00</p>
        </div>
        <div className="upsell-body">
          <div className="upsell-offer">
            <div className="upsell-check">✓</div>
            <div className="upsell-offer-text">
              <strong>4 sessões de mentoria ao vivo</strong>
              <span>1h cada, em pequenos grupos, com feedback direto</span>
            </div>
          </div>
          <div className="upsell-offer">
            <div className="upsell-check">✓</div>
            <div className="upsell-offer-text">
              <strong>Revisão personalizada do seu projeto</strong>
              <span>Análise detalhada do seu caso específico</span>
            </div>
          </div>
          <div className="upsell-offer">
            <div className="upsell-check">✓</div>
            <div className="upsell-offer-text">
              <strong>Acesso ao grupo privado de WhatsApp</strong>
              <span>Suporte direto durante 3 meses</span>
            </div>
          </div>
        </div>
        <div className="upsell-footer">
          <button className="upsell-decline" onClick={onClose}>
            Não, obrigado
          </button>
          <button className="btn-primary" onClick={onClose} style={{ flex: 2 }}>
            Sim! Adicionar por +R$ 0,00 →
          </button>
        </div>
      </div>
    </div>
  );
}
