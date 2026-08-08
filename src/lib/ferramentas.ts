/**
 * Catálogo de EXEMPLOS DE FERRAMENTAS — casos no formato da casa:
 * problema → ferramenta → resultado. Cada item é uma ferramenta real que
 * a Neovanguard constrói sob medida; o accent colore o card.
 */
type FerramentaItem = {
  slug: string;
  /** grupo de filtro na página de exemplos */
  category: string;
  title: string;
  problema: string;
  ferramenta: string;
  /** resultado em uma linha — o destaque do card */
  resultado: string;
  tags: string[];
  accent: string;
};

export const FERRAMENTAS: FerramentaItem[] = [
  {
    slug: "pdv-mercado",
    category: "Gestão & Painéis",
    title: "PDV + estoque para mercado",
    problema: "Fila no caixa, estoque no caderno e fechamento à mão toda noite.",
    ferramenta:
      "PDV com leitor de código de barras, estoque atualizado a cada venda e relatórios prontos num painel só.",
    resultado: "Fechamento do dia em 5 minutos",
    tags: ["PDV", "Estoque", "Relatórios"],
    accent: "#3ef08a",
  },
  {
    slug: "agenda-barbearia",
    category: "Gestão & Painéis",
    title: "Agendamento para barbearia",
    problema: "WhatsApp lotado de \"tem horário?\" e cliente que marca e some.",
    ferramenta:
      "Página de agendamento com horários reais, confirmação na hora e lembrete automático no WhatsApp.",
    resultado: "Faltas caem até 70% com lembrete",
    tags: ["Agenda", "Lembretes", "Painel"],
    accent: "#f4b74a",
  },
  {
    slug: "cardapio-mesa",
    category: "Gestão & Painéis",
    title: "Cardápio digital com pedido na mesa",
    problema: "Garçom anotando errado e cozinha recebendo pedido atrasado.",
    ferramenta:
      "QR code na mesa abre o cardápio; o pedido cai direto na tela da cozinha, com conta parcial por mesa.",
    resultado: "Pedido direto da mesa, sem app",
    tags: ["QR code", "Comanda", "Cozinha"],
    accent: "#ff4d06",
  },
  {
    slug: "portal-cliente",
    category: "Gestão & Painéis",
    title: "Portal do cliente para prestadores",
    problema: "Cliente ligando para saber status, pedir 2ª via e histórico.",
    ferramenta:
      "Área logada onde cada cliente acompanha o serviço, baixa documentos e abre chamados sozinho.",
    resultado: "Menos ligações, cliente informado 24/7",
    tags: ["Login", "Status", "2ª via"],
    accent: "#a8c0f5",
  },
  {
    slug: "contador-lavoura",
    category: "IA & Visão",
    title: "Contador de plantas por drone",
    problema: "Contagem de mudas no olho: semanas de campo e margem de erro alta.",
    ferramenta:
      "Visão computacional que conta plantas, mudas e falhas de plantio direto da imagem do drone.",
    resultado: "40 hectares contados em horas",
    tags: ["Visão computacional", "Drone", "Precisão"],
    accent: "#8ef03e",
  },
  {
    slug: "ia-qualificacao",
    category: "IA & Visão",
    title: "IA que qualifica seus leads",
    problema: "Vendedor perdendo hora com curioso enquanto o lead quente esfria.",
    ferramenta:
      "Agente de IA que conversa, entende o caso, pontua o lead e agenda direto na agenda do vendedor.",
    resultado: "Só lead pronto chega ao vendedor",
    tags: ["Agente IA", "Score", "Agenda"],
    accent: "#c86bff",
  },
  {
    slug: "painel-dono",
    category: "Dados & Integração",
    title: "Painel do dono",
    problema: "Venda num sistema, caixa noutro, estoque numa planilha — zero visão.",
    ferramenta:
      "Dashboard que junta tudo: faturamento, caixa, estoque e metas em tempo real, no celular.",
    resultado: "O negócio inteiro numa tela",
    tags: ["BI", "Tempo real", "KPIs"],
    accent: "#f0c93e",
  },
  {
    slug: "radar-precos",
    category: "Dados & Integração",
    title: "Radar de preços da concorrência",
    problema: "Concorrente muda o preço e você descobre pelo cliente.",
    ferramenta:
      "Coleta diária e automática dos preços do mercado, com comparativo e alerta do que mudou.",
    resultado: "Preço ajustado todo dia às 7h",
    tags: ["Scraping", "Alertas", "Mercado"],
    accent: "#3e9df0",
  },
  {
    slug: "integracao-pix-erp",
    category: "Dados & Integração",
    title: "Pagamentos direto no seu sistema",
    problema: "Pix cai na conta e alguém digita a baixa no sistema, um por um.",
    ferramenta:
      "Integração que liga pagamento, ERP e planilha: cada venda entra sozinha, com nota e baixa.",
    resultado: "Zero digitação manual",
    tags: ["Pix", "ERP", "Webhooks"],
    accent: "#40e0b0",
  },
];

/**
 * Coleção de EXEMPLOS DE AUTOMAÇÕES — robôs e rotinas que trabalham
 * sozinhos. Mesmo formato problema → ferramenta → resultado.
 */
export const AUTOMACOES: FerramentaItem[] = [
  {
    slug: "robo-whatsapp",
    category: "Atendimento",
    title: "Atendente automático no WhatsApp",
    problema: "Mensagens fora do horário sem resposta viram cliente perdido.",
    ferramenta:
      "Robô que responde na hora, tria a dúvida, agenda e entrega para um humano só quando precisa.",
    resultado: "Resposta em segundos, 24/7",
    tags: ["Bot", "Triagem", "CRM"],
    accent: "#25d366",
  },
  {
    slug: "avaliacoes-google",
    category: "Atendimento",
    title: "Pedido de avaliação pós-venda",
    problema: "Cliente satisfeito vai embora sem deixar avaliação no Google.",
    ferramenta:
      "Depois de cada venda concluída, a automação agradece e pede a avaliação na hora certa, com o link pronto.",
    resultado: "Avaliações subindo no piloto automático",
    tags: ["Google", "Reputação", "Pós-venda"],
    accent: "#f0c93e",
  },
  {
    slug: "cobranca-automatica",
    category: "Financeiro",
    title: "Cobrança e conciliação automáticas",
    problema: "Boleto vencido sem aviso e planilha de conciliação toda segunda.",
    ferramenta:
      "Cobrança que se envia sozinha (Pix e boleto), baixa automática ao pagar e conciliação diária sem toque.",
    resultado: "8h de retrabalho por semana a zero",
    tags: ["Pix", "Boleto", "Conciliação"],
    accent: "#3fe0d8",
  },
  {
    slug: "notas-sem-toque",
    category: "Financeiro",
    title: "Emissão de notas sem toque",
    problema: "Fim do mês vira mutirão de emitir nota uma por uma.",
    ferramenta:
      "Venda aprovada → NF-e emitida, enviada ao cliente e arquivada sozinha, com o contador copiado.",
    resultado: "Nota emitida em segundos, sem fila",
    tags: ["NF-e", "Contador", "Arquivo"],
    accent: "#a8c0f5",
  },
  {
    slug: "funil-followup",
    category: "Vendas & Follow-up",
    title: "Follow-up que não esquece ninguém",
    problema: "Orçamento enviado e esquecido — ninguém cobra a resposta.",
    ferramenta:
      "Sequência automática que acompanha cada proposta: lembra, reforça e avisa o vendedor na hora certa.",
    resultado: "Nenhuma proposta morre no vácuo",
    tags: ["Funil", "Sequências", "Alertas"],
    accent: "#e7352b",
  },
  {
    slug: "carrinho-abandonado",
    category: "Vendas & Follow-up",
    title: "Resgate de carrinho abandonado",
    problema: "Cliente enche o carrinho, fecha a aba e nunca mais volta.",
    ferramenta:
      "Mensagem automática no WhatsApp com o carrinho salvo e um empurrão para fechar — no tempo certo.",
    resultado: "Vendas recuperadas toda semana",
    tags: ["E-commerce", "WhatsApp", "Recuperação"],
    accent: "#ff4d06",
  },
  {
    slug: "reposicao-estoque",
    category: "Operação",
    title: "Reposição automática de estoque",
    problema: "Produto campeão em falta porque ninguém viu o estoque baixar.",
    ferramenta:
      "Estoque mínimo atingido → pedido de compra montado e enviado ao fornecedor, com aviso no seu WhatsApp.",
    resultado: "Prateleira nunca mais vazia",
    tags: ["Estoque", "Fornecedor", "Alertas"],
    accent: "#3ef08a",
  },
  {
    slug: "relatorio-segunda",
    category: "Operação",
    title: "Relatório que chega pronto",
    problema: "Toda segunda alguém perde a manhã montando o mesmo relatório.",
    ferramenta:
      "Rotina que junta venda, caixa e estoque da semana e entrega o resumo no seu WhatsApp às 7h.",
    resultado: "Segunda começa com o número na mão",
    tags: ["Relatórios", "Rotina", "WhatsApp"],
    accent: "#3e9df0",
  },
];
