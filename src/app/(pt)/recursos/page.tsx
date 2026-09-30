import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { ArrowUpRight } from "@/components/icons";

export const metadata = pageMetadata({
  path: "/recursos",
  title: "Recursos",
  description:
    "Recursos do Neovanguard OS: identidade Nostr, Bitcoin, Lightning, segurança e ferramentas de linha de comando sobre Arch Linux.",
});

/** Recursos incluídos e resumo dos comandos disponíveis no sistema. */

const CAMADAS = [
  {
    n: "01",
    t: "Identidade Nostr",
    d: "O instalador permite criar a conta local a partir de uma chave Nostr, criptografada com senha pelo NIP-49. Um cofre criptografado armazena o perfil e as configurações para restauração em outra instalação.",
    itens: ["conta local com chave Nostr", "cofre de configurações", "assinador remoto NIP-46", "relay Nostr local"],
  },
  {
    n: "02",
    t: "Bitcoin e Lightning",
    d: "Inclui Bitcoin Core para operar um nó completo, Core Lightning para canais de pagamento e Sparrow para gestão de carteiras e UTXOs. Também oferece Elements para Liquid e ferramentas Cashu.",
    itens: ["bitcoind", "Core Lightning", "Sparrow", "Elements (Liquid)", "eCash (Cashu)"],
  },
  {
    n: "03",
    t: "Segurança do sistema",
    d: "A configuração padrão mantém logs em RAM, aplica noexec em /dev/shm e /var/tmp e utiliza regras restritivas no nftables. Processos que manipulam chaves usam hardened_malloc.",
    itens: ["/var/log em tmpfs", "noexec em /dev/shm e /var/tmp", "nftables restritivo", "hardened_malloc", "Tor sob demanda"],
  },
  {
    n: "04",
    t: "Modo cofre",
    d: "Sessão acessível pelo menu de inicialização para operações de assinatura. A carteira usa um diretório em RAM, descartado ao desligar, com ferramentas para isolar a rede e assinar PSBTs.",
    itens: ["Cold Vault na inicialização", "carteira em RAM", "airgap por comando", "assinatura de PSBT"],
  },
];

/** Os comandos, como eles se descrevem. Um recorte: são 55 no sistema. */
const COMANDOS = [
  ["neo-status", "Exibe o estado do nó, Lightning, relay, rede e memória."],
  ["neo-zap", "Envia sats via Lightning para uma npub, endereço ou fatura."],
  ["neo-utxo", "Analisa UTXOs e sugere consolidações."],
  ["neo-ln", "Consulta o estado e a liquidez dos canais Lightning."],
  ["neo-mempool", "Consulta taxas e o estado da mempool local."],
  ["neo-sign", "Assina uma PSBT em ambiente isolado."],
  ["neo-vault", "Abre uma carteira em um diretório na RAM."],
  ["neo-shamir", "Divide e recompõe a seed com compartilhamento de segredo."],
  ["neo-paper", "Gera um modelo para backup físico da seed."],
  ["neo-qr", "Transfere dados entre máquinas por QR code."],
  ["neo-airgap", "Desativa a rede no nível do kernel."],
  ["neo-killswitch", "Bloqueia tráfego fora do túnel configurado."],
  ["neo-tor", "Configura o roteamento de tráfego pelo Tor."],
  ["neo-mac", "Randomiza o endereço MAC das interfaces de rede."],
  ["neo-screenguard", "Bloqueia capturas de tela durante a exibição de uma seed."],
  ["neo-entropy", "Verifica a disponibilidade de entropia no sistema."],
  ["neo-integrity", "Verifica a integridade dos binários instalados."],
  ["neo-audit", "Verifica as configurações de segurança do sistema."],
  ["neo-relays", "Mede a latência dos relays e ordena a lista."],
  ["neo-mesh", "Localiza máquinas Neovanguard na rede e troca notas."],
  ["neo-nuke", "Executa a limpeza de emergência da RAM e desliga a máquina."],
  ["neo-wipe", "Executa a limpeza de dados da sessão."],
] as const;

export default function Recursos() {
  return (
    <>
      <section className="hero" aria-label="Recursos do Neovanguard OS">
        <div className="hero-copy">
          <span className="eyebrow">Recursos</span>
          <h1 className="h-xl">
            Recursos e
            <br />
            ferramentas
          </h1>
          <p className="lead">
            O Neovanguard reúne ferramentas de identidade, pagamentos e segurança
            em pacotes gerenciados pelo pacman. Os serviços são executados
            na própria máquina.
          </p>
        </div>
      </section>

      {CAMADAS.map((c) => (
        <section className="panel" key={c.n} aria-labelledby={`c${c.n}`}>
          <div className="sec-head">
            <span className="eyebrow">Recurso {c.n}</span>
            <h2 className="h-lg" id={`c${c.n}`}>
              {c.t}
            </h2>
          </div>
          <p className="lead">{c.d}</p>
          <div className="card-tags">
            {c.itens.map((i) => (
              <span className="tag" key={i}>
                {i}
              </span>
            ))}
          </div>
        </section>
      ))}

      <section className="panel panel--accent" aria-labelledby="comandos">
        <div className="sec-head">
          <span className="eyebrow">Linha de comando</span>
          <h2 className="h-lg" id="comandos">
            Comandos <span className="h-accent">neo-*</span>
          </h2>
          <p className="lead">
            Os comandos <code>neo-*</code> auxiliam na administração de nós,
            carteiras, rede e segurança. Consulte <code>--help</code> para
            ver as opções de cada comando. Confira alguns exemplos abaixo.
          </p>
        </div>
        <div className="scan">
          <div className="scan-nota">
            <strong>neo-*</strong>
            <span>comandos com ajuda via --help</span>
          </div>
          <ul className="scan-lista">
            {COMANDOS.map(([c, d]) => (
              <li key={c}>
                <code>{c}</code>: {d}
              </li>
            ))}
          </ul>
        </div>
        <p className="grid-note">
          Os demais comandos incluem gestão de energia, rede, memória e
          limpeza de dados da sessão.
        </p>
      </section>

      <section className="panel" aria-labelledby="ambiente">
        <div className="sec-head">
          <span className="eyebrow">Ambiente gráfico</span>
          <h2 className="h-lg" id="ambiente">
            Plasma, com o tema <span className="h-accent">Birfree</span>
          </h2>
        </div>
        <p className="lead">
          O KDE Plasma é o ambiente gráfico padrão, configurado pelo aplicativo
          de ajustes do KDE. O tema Birfree reúne as cores, os ícones e a tela
          de inicialização do Neovanguard.
        </p>
        <p className="lead">
          Outros ambientes gráficos podem ser instalados com <code>pacman -S</code>,
          usando os pacotes disponíveis para Arch Linux.
        </p>
      </section>

      <section className="closer" aria-label="Próximo passo">
        <h2 className="h-xl">Teste com a imagem Live</h2>
        <div className="pill-row">
          <Link href="/baixar" className="pill">
            Consultar imagens
            <ArrowUpRight />
          </Link>
          <Link href="/instalacao" className="pill pill--ghost">
            Guia de instalação
          </Link>
        </div>
      </section>
    </>
  );
}
