import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import Foot from "@/components/shell/Foot";
import FaqList, { type FaqItem } from "@/components/blocos/FaqList";
import { ArrowUpRight } from "@/components/icons";
import { REPO_URL, VERSAO } from "@/lib/constants";

export const metadata = pageMetadata({
  title: "Perguntas frequentes — Neovanguard OS",
  description:
    "O que se pergunta antes de instalar o Neovanguard OS: hardware, chave Nostr, Bitcoin, atualizações e o que acontece se você perder a chave.",
  path: "/faq",
});

const FAQ: FaqItem[] = [
  {
    q: "Preciso entender de Bitcoin ou de Nostr para usar?",
    a: "Não. A área de trabalho é o KDE Plasma e o sistema funciona como qualquer Linux — navegador, arquivos, terminal. A camada de soberania fica ali, ligada, para quando você quiser. Dá para instalar sem chave nenhuma e criar uma conta comum.",
    tag: "Começar",
  },
  {
    q: "O que acontece se eu perder a minha chave Nostr?",
    a: "A identidade se perde, e não há recuperação — é essa a contrapartida de não haver cadastro nem servidor de senha. O sistema continua funcionando e a sua conta local continua sendo sua; o que se perde é o perfil e o cofre de configurações guardados na rede. Por isso a instalação, quando cria uma chave nova, mostra as palavras e insiste que você as anote antes de seguir.",
    tag: "Identidade",
  },
  {
    q: "Qual máquina roda isso?",
    a: "Qualquer PC x86-64 com UEFI ou BIOS legado. A Install precisa de disco para o sistema aberto mais folga — o instalador mostra o número exato na tela de Disco, e recusa um disco pequeno demais dizendo os dois tamanhos. Para rodar um nó Bitcoin completo, conte com algumas centenas de GB a mais.",
    tag: "Hardware",
  },
  {
    q: "Qual imagem eu baixo?",
    a: "A Live, se quer só experimentar — ela roda do pendrive e não instala nada. A Install, se já decidiu: ela leva o sistema inteiro dentro e não precisa de internet. A MYO, se quer escolher cada peça: disco, formato, núcleo, ambiente gráfico e programas, baixados na hora.",
    tag: "Mídias",
  },
  {
    q: "Dá para instalar sem internet?",
    a: "Com a Install, sim — o sistema viaja dentro da mídia. A MYO precisa de internet do começo ao fim, porque é ela que baixa e monta o sistema, e o instalador avisa isso na primeira tela em vez de deixar você descobrir na décima.",
    tag: "Mídias",
  },
  {
    q: "É Arch? Posso usar o AUR e o pacman normalmente?",
    a: "É Arch, e sim. Os repositórios são os do Arch e o pacman é o pacman. O que a distro acrescenta vem de um repositório próprio e assinado, em pacotes com nome e versão — que dá para desinstalar sem quebrar o resto.",
    tag: "Base",
  },
  {
    q: "Como as atualizações chegam?",
    a: "Por pacman -Syu, como no Arch. O que é da distro vem do repositório neovanguard, assinado pela chave de lançamento que as imagens já trazem no chaveiro — um pacote nosso que não venha assinado por ela é recusado.",
    tag: "Atualização",
  },
  {
    q: "Meus dados vão para algum servidor de vocês?",
    a: "Não existe servidor nosso no caminho. O relay Nostr, o nó Bitcoin e o Lightning rodam na sua máquina. A identidade vive nos relays que você escolher. O que hospedamos é o repositório de pacotes, que serve arquivos assinados e não recebe nada.",
    tag: "Privacidade",
  },
  {
    q: "O log fica mesmo só na memória?",
    a: "Fica. O journald grava em RAM e /var/log é tmpfs, então o registro do que a máquina fez não sobrevive ao desligamento. É uma troca: você perde o histórico para depurar um problema de ontem.",
    tag: "Privacidade",
  },
  {
    q: "Custa alguma coisa? Tem edição paga?",
    a: "Não e não. É GPL-3.0, código aberto, sem edição empresarial, sem recurso atrás de assinatura.",
    tag: "Licença",
  },
  {
    q: "Como eu sei que a imagem que baixei é a de vocês?",
    a: "Conferindo a assinatura, não só a soma. A soma pega download corrompido; a assinatura pega adulteração, porque quem trocar a imagem troca a soma junto. A página de download traz o comando e a impressão inteira da chave.",
    tag: "Segurança",
  },
  {
    q: "Posso contribuir?",
    a: "O código é aberto e as issues estão abertas. Todo defeito de classe nova vira uma verificação automática no repositório — é a regra da casa, e é o tipo de contribuição que mais vale.",
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
        <span className="eyebrow">FAQ · {FAQ.length} registros · versão {VERSAO}</span>
        <h1 id="faq-h" className="h-xl">
          Perguntas <em className="h-accent">frequentes.</em>
        </h1>
        <p className="lead">
          Hardware, chave, Bitcoin, atualizações e o que acontece quando algo dá
          errado — respondido sem rodeio, inclusive quando a resposta é
          desconfortável.
        </p>
      </section>

      <section className="panel" aria-label="Lista de perguntas">
        <FaqList itens={FAQ} />
      </section>

      <section className="closer" aria-label="Ainda com dúvida">
        <h2 className="h-xl">Não achou sua resposta?</h2>
        <p className="lead">
          As issues do repositório são o canal — e ficam abertas para quem vier
          depois com a mesma dúvida.
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

      <Foot />
    </>
  );
}
