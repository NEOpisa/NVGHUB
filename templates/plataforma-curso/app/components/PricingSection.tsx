"use client";

import { useState } from "react";

interface PricingSectionProps {
  onPurchase: () => void;
}

export default function PricingSection({ onPurchase }: PricingSectionProps) {
  const [orderBump, setOrderBump] = useState(false);

  return (
    <section id="pricingSection" style={{ padding: "5rem 2rem", background: "var(--ink-soft)" }}>
      <div className="section-inner" style={{ textAlign: "center" }}>
        <div className="section-label">Investimento</div>
        <h2 className="section-title">
          Acesso completo ao <em>Código Pro</em>
        </h2>
        <div className="pricing-box">
          <div className="pricing-header">
            <h3>Turma 2025 — Acesso Total</h3>
            <p>Vagas limitadas · Inscrições abertas até 31/jan</p>
          </div>
          <div className="pricing-body">
            <div className="price-main">
              <span>De R$ 0,00</span>
              <div>
                <strong>R$ 0,00</strong>
                <em> /à vista</em>
              </div>
            </div>
            <div className="price-pix">✦ Pix ou boleto: R$ 0,00 — 10% de desconto</div>
            <ul className="price-features">
              <li>6 módulos com 48 aulas em vídeo</li>
              <li>Material de apoio em PDF por módulo</li>
              <li>4 bônus avaliados em R$ [valor]</li>
              <li>Comunidade privada vitalícia</li>
              <li>Certificado de conclusão</li>
              <li>Acesso por 12 meses à plataforma</li>
            </ul>
            <div className="payment-methods">
              <span className="pay-badge">PIX</span>
              <span className="pay-badge">BOLETO</span>
              <span className="pay-badge">CARTÃO</span>
              <span className="pay-badge">12× R$ 0,00</span>
            </div>
            <button
              className="btn-primary"
              onClick={onPurchase}
              style={{ width: "100%", fontSize: "1rem", padding: "1.1rem" }}
            >
              Garantir minha vaga agora →
            </button>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "1rem", textAlign: "center" }}>
              Pagamento seguro · Garantia de 7 dias · Acesso imediato
            </p>
          </div>
        </div>

        {/* ORDER BUMP */}
        <div
          style={{
            maxWidth: "480px",
            margin: "1.25rem auto 0",
            border: "1px dashed var(--border-bright)",
            borderRadius: "var(--r-lg)",
            padding: "1.5rem",
            background: "rgba(201,169,110,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
            <input
              type="checkbox"
              id="orderBump"
              checked={orderBump}
              onChange={(e) => setOrderBump(e.target.checked)}
              style={{ marginTop: "4px", accentColor: "var(--gold)", width: "18px", height: "18px", cursor: "pointer" }}
            />
            <label htmlFor="orderBump" style={{ cursor: "pointer" }}>
              <div
                style={{
                  fontSize: "0.65rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--gold)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "0.4rem",
                }}
              >
                ⬆ Order Bump — adicionar ao pedido
              </div>
              <strong style={{ display: "block", fontSize: "0.95rem", marginBottom: "0.35rem" }}>
                Planilha Mestre de Acompanhamento
              </strong>
              <span style={{ fontSize: "0.82rem", color: "var(--text-soft)" }}>
                Sistema completo em Google Sheets para rastrear evolução, metas e resultados
                semana a semana. Por apenas <strong style={{ color: "var(--gold)" }}>+R$ 0,00</strong>.
              </span>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
