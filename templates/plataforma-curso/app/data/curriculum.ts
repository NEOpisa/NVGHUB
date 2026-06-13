export interface CurriculumModule {
  num: string;
  title: string;
  description: string;
  lessons: string[];
}

export const curriculumModules: CurriculumModule[] = [
  {
    num: "Módulo 01",
    title: "Diagnóstico e Clareza",
    description:
      "Identifique onde você está, mapeie seus recursos reais e defina com precisão o destino que faz sentido para você.",
    lessons: ["Autoavaliação profunda", "Mapa de recursos", "Declaração de posicionamento"],
  },
  {
    num: "Módulo 02",
    title: "Arquitetura do Método",
    description:
      "Construa um sistema de trabalho personalizado que respeita como você pensa e produz — não um modelo genérico copiado.",
    lessons: ["Design de sistema pessoal", "Gestão de energia", "Protocolos de foco"],
  },
  {
    num: "Módulo 03",
    title: "Autoridade e Presença",
    description:
      "Como se posicionar como referência no seu nicho, criar conteúdo com consistência e ser lembrado pelas razões certas.",
    lessons: ["Estratégia de conteúdo", "Voz autoral", "Presença digital"],
  },
  {
    num: "Módulo 04",
    title: "Oferta e Precificação",
    description:
      "Estruture seus serviços ou produtos de forma que o valor seja óbvio e o preço justo — para você e para o mercado.",
    lessons: ["Modelagem de oferta", "Precificação estratégica", "Proposta de valor"],
  },
  {
    num: "Módulo 05",
    title: "Aquisição e Relacionamento",
    description:
      "Os melhores clientes chegam por indicação, confiança e posicionamento. Aprenda a construir isso de forma orgânica.",
    lessons: ["Funil de confiança", "Nutrição de leads", "Conversas que convertem"],
  },
  {
    num: "Módulo 06",
    title: "Escala com Fundação",
    description:
      "Quando o sistema funciona, como escalar sem quebrar o que foi construído. Automação, delegação e expansão com inteligência.",
    lessons: ["Processos escaláveis", "Delegação eficiente", "Métricas de crescimento"],
  },
];
