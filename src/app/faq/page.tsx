import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import FaqList, { type FaqItem } from "@/components/blocos/FaqList";
import { ArrowUpRight } from "@/components/icons";
import { REPO_URL, VERSAO } from "@/lib/constants";

export const metadata = pageMetadata({
  title: "Perguntas frequentes",
  description:
    "Respostas sobre instalação, hardware, identidade Nostr, atualizações, privacidade e licença do Neovanguard OS.",
  path: "/faq",
});

const FAQ: FaqItem[] = [
  {
    q: "Preciso conhecer Bitcoin e Nostr para usar o sistema?",
    a: "Não para usar o ambiente KDE Plasma e os aplicativos comuns. A instalação aceita uma conta local sem chave Nostr. Para administrar nós, canais e relays, é necessário conhecer os serviços e sua configuração.",
    tag: "Uso",
  },
  {
    q: "O que acontece se eu perder a minha chave Nostr?",
    a: "Sem a chave privada ou um backup, você perde o acesso à identidade Nostr e ao cofre associado. A conta local continua funcionando. Ao criar uma chave na instalação, guarde as palavras de recuperação em local seguro. O projeto não oferece recuperação de chaves.",
    tag: "Identidade",
  },
  {
    q: "Quais são os requisitos de hardware?",
    a: "O sistema é destinado a PCs x86-64 com UEFI ou BIOS legado. O instalador informa o espaço mínimo em disco e impede a instalação quando ele é insuficiente. Um nó Bitcoin exige recursos adicionais, conforme a configuração e a retenção de blocos. Use a Live para verificar a compatibilidade do hardware.",
    tag: "Hardware",
  },
  {
    q: "Qual imagem devo usar?",
    a: "Use a Live para testar pelo pendrive e a Install para instalar no disco. Ambas contêm o mesmo sistema e funcionam sem internet. Somente a Install inclui o instalador. Consulte a página de imagens para verificar a disponibilidade.",
    tag: "Mídias",
  },
  {
    q: "Posso instalar sem internet?",
    a: "Sim. A imagem Install contém os arquivos necessários. A etapa de rede é opcional e permite recuperar dados da identidade Nostr.",
    tag: "Mídias",
  },
  {
    q: "Posso usar o AUR e o pacman normalmente?",
    a: "Sim. O sistema usa o pacman e permite o uso do AUR. Os componentes do Neovanguard são distribuídos em um repositório adicional.",
    tag: "Base",
  },
  {
    q: "Como atualizar o sistema?",
    a: "Use pacman -Syu com privilégios de administrador. Os pacotes do projeto vêm do repositório neovanguard e têm suas assinaturas verificadas com a chave de lançamento incluída no sistema.",
    tag: "Atualização",
  },
  {
    q: "O sistema envia telemetria?",
    a: "O Neovanguard OS não envia telemetria. O repositório fornece pacotes sem exigir cadastro, mas o acesso pode gerar registros na hospedagem. As conexões com nós e relays dependem dos serviços configurados pelo usuário.",
    tag: "Privacidade",
  },
  {
    q: "Como os logs em RAM afetam o diagnóstico?",
    a: "Os logs mantidos em RAM são descartados ao desligar, o que limita a investigação de sessões anteriores. Para diagnosticar uma falha, consulte ou exporte os registros antes de encerrar a sessão.",
    tag: "Privacidade",
  },
  {
    q: "O sistema é gratuito?",
    a: "Sim. O Neovanguard OS é software livre sob a GPL-3.0, sem edição paga ou recursos por assinatura.",
    tag: "Licença",
  },
  {
    q: "Como verificar a imagem ISO?",
    a: "Verifique a soma SHA-256 e a assinatura GPG. A soma detecta corrupção do arquivo; a assinatura permite conferir sua origem com a chave esperada. Os comandos e a impressão digital da chave estão na página de imagens.",
    tag: "Segurança",
  },
  {
    q: "Como contribuir?",
    a: "Use o repositório para relatar problemas, propor alterações e enviar correções. Inclua passos para reproduzir falhas e, quando possível, um teste de regressão. A documentação descreve a estrutura do código e o processo de build.",
    tag: "Comunidade",
  },
];

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <section className="panel" aria-labelledby="faq-h">
        <span className="eyebrow">FAQ · {FAQ.length} perguntas · versão {VERSAO}</span>
        <h1 id="faq-h" className="h-xl">
          Perguntas <em className="h-accent">frequentes</em>
        </h1>
        <p className="lead">
          Consulte os requisitos de hardware, as opções de instalação e as
          informações sobre chaves, atualizações e privacidade.
        </p>
      </section>

      <section className="panel" aria-label="Lista de perguntas">
        <FaqList itens={FAQ} />
      </section>

      <section className="closer" aria-label="Ainda com dúvida">
        <h2 className="h-xl">Suporte no repositório</h2>
        <p className="lead">
          Para dúvidas e problemas não cobertos aqui, consulte as issues
          existentes ou abra uma nova no repositório.
        </p>
        <div className="pill-row">
          <a
            href={`${REPO_URL}/issues`}
            target="_blank"
            rel="noopener noreferrer"
            className="pill"
          >
            Abrir uma issue
            <ArrowUpRight />
          </a>
          <Link href="/documentacao" className="pill pill--ghost">
            Documentação
          </Link>
        </div>
      </section>
    </>
  );
}
