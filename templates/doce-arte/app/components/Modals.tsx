"use client";

import { useStore } from "@/app/context/StoreContext";
import { pedidosCozinha, type PainelTicket } from "@/app/data/pedidosCozinha";

const cols: { key: keyof typeof pedidosCozinha; label: string; cls: string }[] = [
  { key: "novo", label: "Novos", cls: "novo" },
  { key: "fazendo", label: "Fazendo", cls: "fazendo" },
  { key: "pronto", label: "Prontos", cls: "pronto" },
];

function PainelTicketCard({ ticket }: { ticket: PainelTicket }) {
  return (
    <div className="painel-ticket">
      <div className="ticket-num">{ticket.num}</div>
      <div className="ticket-items">
        {ticket.itens.split("\n").map((linha, i, arr) => (
          <span key={i}>
            {linha}
            {i < arr.length - 1 && <br />}
          </span>
        ))}
      </div>
      <div className="ticket-time">⏱ {ticket.hora}</div>
    </div>
  );
}

export default function Modals() {
  const {
    isPedidoModalOpen,
    closePedidoModal,
    isCozinhaModalOpen,
    closeCozinhaModal,
  } = useStore();

  return (
    <>
      {/* MODAL FINALIZAÇÃO */}
      <div
        className={`modal-overlay${isPedidoModalOpen ? " open" : ""}`}
        id="modal-pedido"
        onClick={(e) => {
          if (e.target === e.currentTarget) closePedidoModal();
        }}
      >
        <div className="modal">
          <button className="modal-close" onClick={closePedidoModal}>
            ×
          </button>
          <h3>Pedido confirmado!</h3>
          <p>
            Seu pedido foi recebido com sucesso. Você receberá uma confirmação
            pelo WhatsApp em instantes com o número do pedido e tempo
            estimado.
          </p>
          <div
            style={{
              background: "#FFF3E0",
              borderRadius: "3px",
              padding: "1rem",
              marginBottom: "1.5rem",
              fontSize: "0.85rem",
            }}
          >
            <strong>Pedido #PED-2847</strong>
            <br />
            Previsão de entrega: <strong>35–50 minutos</strong>
            <br />
            Status:{" "}
            <span style={{ color: "var(--laranja)", fontWeight: 600 }}>
              Em preparo
            </span>
          </div>
          <button className="btn-primary full-btn" onClick={closePedidoModal}>
            Acompanhar pedido
          </button>
        </div>
      </div>

      {/* MODAL COZINHA */}
      <div
        className={`modal-overlay${isCozinhaModalOpen ? " open" : ""}`}
        id="modal-cozinha"
        style={{ alignItems: "flex-start", paddingTop: "5rem" }}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeCozinhaModal();
        }}
      >
        <div
          className="modal"
          style={{ maxWidth: "720px", width: "95vw", maxHeight: "80vh", overflowY: "auto" }}
        >
          <button className="modal-close" onClick={closeCozinhaModal}>
            ×
          </button>
          <h3>Painel da Cozinha</h3>
          <p>Arraste os pedidos entre as colunas conforme o preparo avança.</p>
          <div className="painel-grid" id="painel-grid">
            {cols.map((col) => (
              <div className={`painel-col ${col.cls}`} key={col.key}>
                <h4>{col.label}</h4>
                {pedidosCozinha[col.key].map((ticket) => (
                  <PainelTicketCard key={ticket.num} ticket={ticket} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
