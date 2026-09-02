import Link from "next/link";
import type { Metadata } from "next";
import Foot from "@/components/shell/Foot";
import { ArrowUpRight } from "@/components/icons";
import { VERSAO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Instalação",
  description:
    "Como instalar o Neovanguard OS: gravar o pendrive, dar boot, e as etapas do instalador em cada uma das duas mídias que instalam.",
};

/**
 * INSTALAÇÃO — o guia. Ele descreve o instalador que existe, incluindo o que
 * ele **não** pergunta e por quê: quase todo mal-entendido de instalação nasce
 * de alguém procurando uma tela que a mídia escolhida não tem.
 */

const GRAVAR = [
  {
    n: "01",
    t: "Confira a imagem",
    d: "A assinatura antes da soma. Está na página de download, com a impressão da chave.",
  },
  {
    n: "02",
    t: "Grave no pendrive",
    d: "A imagem é híbrida: dd, Ventoy, Impressor de USB do GNOME, Etcher — qualquer um serve. Não descompacte nada.",
  },
  {
    n: "03",
    t: "Dê boot pelo pendrive",
    d: "Na maioria das máquinas é F12, F11 ou Esc no ligar. Em UEFI com Secure Boot ligado, desligue-o antes: as imagens ainda não são assinadas para ele.",
  },
];

const MBN = [
  ["Início", "o que esta mídia faz, e que ela não precisa de rede"],
  ["Rede", "opcional aqui — só serve para trazer a sua identidade"],
  ["Identidade", "a sua chave Nostr, se você tiver uma"],
  ["Disco", "onde instalar, com o espaço que a instalação exige na tela"],
  ["Conta", "usuário, senha, teclado e fuso"],
  ["Revisão", "tudo o que vai acontecer, antes do primeiro comando destrutivo"],
  ["Instalação", "o sistema sai da própria mídia, sem baixar nada"],
] as const;

const MYO = [
  ["Início", "o que esta mídia faz, e que ela precisa de rede"],
  ["Rede", "obrigatória: o sistema é baixado"],
  ["Identidade", "a sua chave Nostr, se você tiver uma"],
  ["Idioma e região", "locale, teclado e fuso"],
  ["Sistema", "ambiente gráfico, núcleo, gerenciador de arranque, soberania"],
  ["Disco", "onde instalar"],
  ["Formato", "ext4, btrfs com subvolumes, xfs ou f2fs · LUKS · swap ou ZRAM"],
  ["Conta", "usuário e senha"],
  ["Programas", "os conjuntos que entram"],
  ["Aparência", "a paleta"],
  ["Revisão", "tudo o que vai acontecer"],
  ["Instalação", "pacstrap, e o sistema é montado na hora"],
] as const;

export default function Instalacao() {
  return (
    <>
      <section className="hero" aria-label="Instalar o Neovanguard OS">
        <div className="hero-copy">
          <span className="eyebrow">Guia · versão {VERSAO}</span>
          <h1 className="h-xl">Do pendrive ao disco.</h1>
          <p className="lead">
            O instalador é próprio, roda no terminal e é um comando que você
            digita: <code>nvginstall</code>. Ele não abre sozinho, e isso é uma
            decisão — uma mídia que toma o terminal de quem só queria olhar o
            disco é uma mídia que alguém atravessa sem ler.
          </p>
        </div>
      </section>

      <section className="panel" aria-labelledby="gravar">
        <div className="sec-head">
          <span className="eyebrow">Antes</span>
          <h2 className="h-lg" id="gravar">
            Gravar e dar <span className="h-accent">boot</span>
          </h2>
        </div>
        <div className="cards">
          {GRAVAR.map((g) => (
            <article className="card" key={g.n}>
              <span className="card-n">{g.n}</span>
              <h3 className="card-t">{g.t}</h3>
              <p className="card-d">{g.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel" aria-labelledby="mbn">
        <div className="sec-head">
          <span className="eyebrow">MBN Install</span>
          <h2 className="h-lg" id="mbn">
            Sete etapas, <span className="h-accent">sem internet</span>
          </h2>
          <p className="lead">
            O sistema inteiro viaja dentro da mídia e é copiado para o disco.
            Não há tela de Formato, de Programas nem de Aparência — o que já
            está pronto define os três, e oferecer uma escolha que não muda
            nada seria mentir sobre o que a escolha faz.
          </p>
        </div>
        <ol className="steps">
          {MBN.map(([t, d], i) => (
            <li className="step" key={t}>
              <span className="step-code">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <div className="step-top">
                  <h3 className="step-name">{t}</h3>
                </div>
                <p className="step-desc">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="panel" aria-labelledby="myo">
        <div className="sec-head">
          <span className="eyebrow">MYO</span>
          <h2 className="h-lg" id="myo">
            Doze etapas, <span className="h-accent">tudo escolhido</span>
          </h2>
          <p className="lead">
            Um archinstall de verdade, com a camada de soberania como itens
            marcáveis. Precisa de internet do começo ao fim — e o instalador
            avisa disso na primeira tela, não na décima.
          </p>
        </div>
        <ol className="steps">
          {MYO.map(([t, d], i) => (
            <li className="step" key={t}>
              <span className="step-code">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <div className="step-top">
                  <h3 className="step-name">{t}</h3>
                </div>
                <p className="step-desc">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="panel panel--accent" aria-labelledby="cuidados">
        <div className="sec-head">
          <span className="eyebrow">O que costuma pegar</span>
          <h2 className="h-lg" id="cuidados">
            Três coisas que valem saber antes
          </h2>
        </div>
        <div className="cards">
          <article className="card">
            <span className="card-n">01</span>
            <h3 className="card-t">O disco é apagado por inteiro</h3>
            <p className="card-d">
              No modo padrão, sim. Existe o modo manual, para usar partições que
              já existem — e a tela de Revisão diz qual disco vai embora, antes
              de qualquer comando destrutivo.
            </p>
          </article>
          <article className="card">
            <span className="card-n">02</span>
            <h3 className="card-t">A chave Nostr é opcional</h3>
            <p className="card-d">
              Dá para instalar sem nenhuma e criar uma conta comum. A tela de
              Identidade nunca bloqueia: sem rede, sem chave ou com o relay
              mudo, você segue adiante.
            </p>
          </article>
          <article className="card">
            <span className="card-n">03</span>
            <h3 className="card-t">Se algo falhar no fim, você fica sabendo</h3>
            <p className="card-d">
              As últimas etapas não derrubam uma instalação com o disco já
              escrito. O que não deu certo é registrado, e o assistente do
              primeiro boot repete a lista antes de qualquer pergunta.
            </p>
          </article>
        </div>
      </section>

      <section className="closer" aria-label="Próximo passo">
        <h2 className="h-xl">Instalou. E agora?</h2>
        <div className="pill-row">
          <Link href="/documentacao" className="pill">
            Documentação
            <ArrowUpRight />
          </Link>
          <Link href="/faq" className="pill pill--ghost">
            Perguntas frequentes
          </Link>
        </div>
      </section>

      <Foot />
    </>
  );
}
