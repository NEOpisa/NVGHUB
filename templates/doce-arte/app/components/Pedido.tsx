"use client";

import { useState } from "react";
import { useStore } from "@/app/context/StoreContext";
import { taxas } from "@/app/data/produtos";

type TaxaInfo = {
  bg: string;
  color: string;
  html: React.ReactNode;
  taxa: number | null;
};

export default function Pedido() {
  const {
    cart,
    changeQty,
    deliveryMode,
    setDeliveryMode,
    desconto,
    aplicarCupom,
    selectedPay,
    setSelectedPay,
    subtotal,
    taxaEntrega,
    total,
    finalizarPedido,
  } = useStore();

  const [cupomValue, setCupomValue] = useState("");
  const [taxaInfo, setTaxaInfo] = useState<TaxaInfo | null>(null);

  function calcTaxa(cep: string) {
    const limpo = cep.replace(/\D/g, "");
    if (limpo.length < 8) {
      return;
    }
    const prefix = limpo.substring(0, 2);
    const taxa = taxas[prefix] ?? 10;
    if (taxa === 0) {
      setTaxaInfo({
        bg: "#FCE4EC",
        color: "#C62828",
        taxa: 0,
        html: (
          <>
            CEP fora da nossa área de entrega.{" "}
            <a href="#info" style={{ color: "inherit" }}>
              Ver área de cobertura
            </a>
          </>
        ),
      });
    } else {
      setTaxaInfo({
        bg: "#E8F5E9",
        color: "#2E7D32",
        taxa,
        html: (
          <>
            Entrega disponível! Taxa: <strong>R$ {taxa},00</strong>
          </>
        ),
      });
    }
  }

  const taxaValDisplay =
    taxaInfo && taxaInfo.taxa
      ? `R$ ${taxaInfo.taxa},00`
      : `R$ ${taxaEntrega.toFixed(2).replace(".", ",")}`;

  return (
    <section id="pedido">
      <p className="section-eyebrow">✦ Rápido e fácil</p>
      <h2 className="section-title" style={{ marginBottom: "2.5rem" }}>
        Faça seu <em>pedido</em>
      </h2>
      <div className="pedido-layout">
        <div>
          <div className="order-form">
            <h3>Seus dados de entrega</h3>
            <div className="delivery-toggle">
              <button
                className={`dtoggle-btn${
                  deliveryMode === "entrega" ? " active" : ""
                }`}
                onClick={() => setDeliveryMode("entrega")}
              >
                Entrega
              </button>
              <button
                className={`dtoggle-btn${
                  deliveryMode === "retirada" ? " active" : ""
                }`}
                onClick={() => setDeliveryMode("retirada")}
              >
                Retirada
              </button>
            </div>

            {deliveryMode === "entrega" && (
              <div id="delivery-fields">
                <div className="form-row">
                  <label>Seu nome</label>
                  <input type="text" placeholder="Ex: Maria Luiza" />
                </div>
                <div className="form-row">
                  <label>Telefone (WhatsApp)</label>
                  <input type="tel" placeholder="(00) 00000-0000" />
                </div>
                <div className="form-row">
                  <label>CEP</label>
                  <input
                    type="text"
                    placeholder="00000-000"
                    id="cep-input"
                    onInput={(e) => calcTaxa(e.currentTarget.value)}
                  />
                </div>
                <div className="form-row">
                  <label>Endereço completo</label>
                  <input
                    type="text"
                    placeholder="Rua, número, complemento"
                  />
                </div>
                <div className="form-row">
                  <label>Bairro</label>
                  <input
                    type="text"
                    placeholder="Seu bairro"
                    id="bairro-input"
                  />
                </div>
                {taxaInfo && (
                  <div
                    id="taxa-display"
                    style={{
                      display: "",
                      padding: "0.7rem 1rem",
                      background: taxaInfo.bg,
                      borderRadius: "3px",
                      marginBottom: "1rem",
                      fontSize: "0.85rem",
                      color: taxaInfo.color,
                      fontWeight: 600,
                    }}
                  >
                    {taxaInfo.html}
                  </div>
                )}
              </div>
            )}

            {deliveryMode === "retirada" && (
              <div
                id="retirada-msg"
                style={{
                  display: "",
                  padding: "1rem",
                  background: "#E8F5E9",
                  borderRadius: "3px",
                  marginBottom: "1rem",
                  fontSize: "0.88rem",
                  color: "#2E7D32",
                }}
              >
                <strong>Retirada gratuita!</strong> [Endereço completo] –
                [Bairro, Cidade - UF]
                <br />
                Horário: Seg–Sáb 9h–20h | Dom 9h–14h
              </div>
            )}

            <div className="form-row">
              <label>Observações</label>
              <textarea
                placeholder="Alergias, preferências, ponto de entrega..."
                rows={2}
              ></textarea>
            </div>
          </div>

          {/* Status tracker */}
          <div className="status-tracker mt-2">
            <h4>Acompanhamento do Pedido</h4>
            <div className="tracker-steps">
              <div className="tstep done">
                <div className="tstep-dot">✓</div>
                <div className="tstep-label">
                  Pedido
                  <br />
                  recebido
                </div>
              </div>
              <div className="tstep active">
                <div className="tstep-dot"></div>
                <div className="tstep-label">
                  Em
                  <br />
                  preparo
                </div>
              </div>
              <div className="tstep">
                <div className="tstep-dot"></div>
                <div className="tstep-label">
                  Saiu para
                  <br />
                  entrega
                </div>
              </div>
              <div className="tstep">
                <div className="tstep-dot"></div>
                <div className="tstep-label">Entregue</div>
              </div>
            </div>
          </div>
        </div>

        {/* CARRINHO */}
        <div className="cart-summary">
          <h3>Seu carrinho</h3>
          <div id="cart-items">
            {cart.length === 0 ? (
              <p style={{ fontSize: "0.85rem", opacity: 0.5, padding: "1rem 0" }}>
                Seu carrinho está vazio. Escolha seus itens acima!
              </p>
            ) : (
              cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-name">
                    {item.nome.split(" ").slice(0, 4).join(" ")}
                  </div>
                  <div className="cart-item-qty">
                    <button
                      className="qty-btn"
                      onClick={() => changeQty(item.id, -1)}
                    >
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => changeQty(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-price">
                    R$ {(item.preco * item.qty).toFixed(2).replace(".", ",")}
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="cart-total" id="cart-total">
            {cart.length > 0 && (
              <>
                <div className="cart-total-row">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2).replace(".", ",")}</span>
                </div>
                {deliveryMode === "entrega" ? (
                  <div className="cart-total-row">
                    <span>Taxa de entrega</span>
                    <span id="taxa-val">{taxaValDisplay}</span>
                  </div>
                ) : (
                  <div className="cart-total-row">
                    <span>Retirada</span>
                    <span style={{ color: "#4A7C59" }}>Grátis</span>
                  </div>
                )}
                {desconto > 0 && (
                  <div
                    className="cart-total-row"
                    style={{ color: "#4A7C59" }}
                  >
                    <span>Desconto</span>
                    <span>− R$ {desconto.toFixed(2).replace(".", ",")}</span>
                  </div>
                )}
                <div className="cart-total-row final">
                  <span>Total</span>
                  <span className="price">
                    R$ {Math.max(0, total).toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </>
            )}
          </div>
          <div className="coupon-row">
            <input
              className="coupon-input"
              id="coupon"
              placeholder="Cupom de desconto"
              type="text"
              value={cupomValue}
              onChange={(e) => setCupomValue(e.target.value)}
            />
            <button
              className="coupon-btn"
              onClick={() => aplicarCupom(cupomValue)}
            >
              Aplicar
            </button>
          </div>
          <div style={{ marginTop: "1.2rem" }}>
            <p
              style={{
                fontSize: "0.76rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,244,230,0.5)",
                marginBottom: "0.6rem",
              }}
            >
              Forma de pagamento
            </p>
            <div className="payment-opts">
              <button
                className={`pay-btn${selectedPay === 0 ? " active" : ""}`}
                onClick={() => setSelectedPay(0)}
              >
                Pix
              </button>
              <button
                className={`pay-btn${selectedPay === 1 ? " active" : ""}`}
                onClick={() => setSelectedPay(1)}
              >
                Crédito
              </button>
              <button
                className={`pay-btn${selectedPay === 2 ? " active" : ""}`}
                onClick={() => setSelectedPay(2)}
              >
                Débito
              </button>
            </div>
          </div>
          <button
            className="btn-primary full-btn mt-1"
            onClick={finalizarPedido}
          >
            Finalizar pedido →
          </button>
          <p
            style={{
              fontSize: "0.75rem",
              textAlign: "center",
              marginTop: "0.8rem",
              color: "rgba(255,244,230,0.4)",
            }}
          >
            Você receberá confirmação pelo WhatsApp
          </p>
        </div>
      </div>
    </section>
  );
}
