export type PainelTicket = {
  num: string;
  itens: string;
  hora: string;
};

export type PedidosCozinha = {
  novo: PainelTicket[];
  fazendo: PainelTicket[];
  pronto: PainelTicket[];
};

export const pedidosCozinha: PedidosCozinha = {
  novo: [
    { num: "#PED-2847", itens: "1× Bolo Cenoura\n2× Brigadeiro", hora: "14:32" },
    { num: "#PED-2848", itens: "3× Croissant\n1× Café especial", hora: "14:45" },
  ],
  fazendo: [
    { num: "#PED-2845", itens: "1× Bolo Morango\n1× Quiche queijo", hora: "14:18" },
  ],
  pronto: [
    { num: "#PED-2841", itens: "1× Red Velvet\n4× Pão de Mel", hora: "13:55" },
  ],
};
