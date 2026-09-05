import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = {
  alternates: { canonical: "/recursos" },
  title: "Recursos",
  description:
    "O que vem no Neovanguard OS: identidade Nostr como conta do sistema, nó Bitcoin e Lightning próprios, relay local, endurecimento por padrão e 55 comandos neo-*.",
};

/**
 * RECURSOS — o que a distro acrescenta a um Arch, e por quê.
 *
 * A lista de comandos é a real, colhida do repositório: cada linha é a
 * descrição que o próprio comando dá de si em `neo-<algo> --help`. Escrever
 * uma segunda descrição aqui criaria duas verdades sobre a mesma coisa, e a
 * daqui envelheceria primeiro.
 */

const CAMADAS = [
  {
    n: "01",
    t: "Identidade",
    d: "A chave Nostr é a conta do sistema. O instalador a recebe, cifra com a sua senha (NIP-49) e cria o usuário a partir dela. O perfil e as configurações vivem num cofre que só você abre, e voltam em qualquer máquina.",
    itens: ["conta a partir da chave", "cofre de configurações", "assinador remoto NIP-46", "relay Nostr local"],
  },
  {
    n: "02",
    t: "Bitcoin",
    d: "Nó completo, não carteira leve apontada para o servidor de outra pessoa. Lightning por cima, Liquid ao lado, e uma carteira de análise de UTXO para quem se importa com quais moedas está gastando.",
    itens: ["bitcoind", "Core Lightning", "Sparrow", "Elements (Liquid)", "eCash (Cashu)"],
  },
  {
    n: "03",
    t: "Endurecimento",
    d: "Ligado de fábrica, não uma seção do manual. O log do sistema vive em RAM, /dev/shm e /var/tmp não executam nada, o firewall começa restritivo e há um alocador endurecido para os processos que tocam em chave.",
    itens: ["/var/log em tmpfs", "noexec em shm e var/tmp", "nftables restritivo", "hardened_malloc", "Tor sob demanda"],
  },
  {
    n: "04",
    t: "Modo cofre",
    d: "Uma sessão que existe só na memória, para assinar sem deixar rastro. Entra pelo menu de boot, abre a carteira num diretório volátil e some no desligamento.",
    itens: ["Cold Vault no boot", "carteira em RAM", "airgap por comando", "PSBT sem sair do isolamento"],
  },
];

/** Os comandos, como eles se descrevem. Um recorte: são 55 no sistema. */
const COMANDOS = [
  ["neo-status", "o painel: nó, Lightning, relay, rede e memória, numa tela"],
  ["neo-zap", "manda sats por Lightning para uma npub, um endereço ou uma fatura"],
  ["neo-utxo", "olha as suas moedas e sugere o que consolidar"],
  ["neo-ln", "saúde e liquidez dos seus canais Lightning"],
  ["neo-mempool", "a taxa da rede agora, e o estado da mempool local"],
  ["neo-sign", "assina uma transação PSBT sem sair do ambiente isolado"],
  ["neo-vault", "abre uma carteira num diretório volátil, que só existe na RAM"],
  ["neo-shamir", "divide a sua semente em partes, e junta de volta"],
  ["neo-paper", "gera a folha para gravar a seed em papel ou em placa de aço"],
  ["neo-qr", "passa dados entre máquinas por QR Code, sem cabo e sem rede"],
  ["neo-airgap", "corta toda a rede desta máquina, no nível do kernel"],
  ["neo-killswitch", "nada sai desta máquina fora do túnel"],
  ["neo-tor", "manda todo o tráfego da máquina pelo Tor"],
  ["neo-mac", "troca o endereço MAC das interfaces por um aleatório"],
  ["neo-screenguard", "bloqueia captura de tela enquanto uma seed está à mostra"],
  ["neo-entropy", "o sistema tem aleatoriedade suficiente para gerar uma chave?"],
  ["neo-integrity", "confere se os binários instalados são os que os pacotes trouxeram"],
  ["neo-audit", "confere a postura de segurança desta máquina"],
  ["neo-relays", "mede a velocidade dos seus relays e ordena a lista"],
  ["neo-mesh", "acha outras máquinas Neovanguard por perto e troca notas com elas"],
  ["neo-nuke", "pânico: destrói o que está na RAM e desliga a máquina"],
  ["neo-wipe", "apaga o rastro desta sessão"],
] as const;

export default function Recursos() {
  return (
    <>
      <section className="hero" aria-label="Recursos do Neovanguard OS">
        <div className="hero-copy">
          <span className="eyebrow">O que vem dentro</span>
          <h1 className="h-xl">
            Um Arch com quatro
            <br />
            camadas em cima.
          </h1>
          <p className="lead">
            Nada aqui é um serviço nosso. Tudo roda na sua máquina, vem
            configurado e pode ser desinstalado — são pacotes com nome e versão,
            não arquivos espalhados por um script de instalação.
          </p>
        </div>
      </section>

      {CAMADAS.map((c) => (
        <section className="panel" key={c.n} aria-labelledby={`c${c.n}`}>
          <div className="sec-head">
            <span className="eyebrow">Camada {c.n}</span>
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
          <span className="eyebrow">A interface de verdade</span>
          <h2 className="h-lg" id="comandos">
            55 comandos <span className="h-accent">neo-*</span>
          </h2>
          <p className="lead">
            Operar um nó, um relay e uma carteira normalmente significa decorar
            as flags de cinco programas diferentes. Estes comandos existem para
            que não signifique. Cada um se explica com <code>--help</code>, e
            todos falam a mesma língua. Um recorte:
          </p>
        </div>
        <div className="scan">
          <div className="scan-nota">
            <strong>55</strong>
            <span>e todos respondem a --help</span>
          </div>
          <ul className="scan-lista">
            {COMANDOS.map(([c, d]) => (
              <li key={c}>
                <code>{c}</code> — {d}
              </li>
            ))}
          </ul>
        </div>
        <p className="grid-note">
          O recorte acima tem 22. Os outros 33 cobrem energia, rede, memória e
          limpeza de rastro.
        </p>
      </section>

      <section className="panel" aria-labelledby="ambiente">
        <div className="sec-head">
          <span className="eyebrow">A cara</span>
          <h2 className="h-lg" id="ambiente">
            Plasma, com o tema <span className="h-accent">Birfree</span>
          </h2>
        </div>
        <p className="lead">
          A área de trabalho é o KDE Plasma, e as configurações do sistema são as
          dele — a distro não mantém aplicativos próprios de configuração, porque
          o System Settings já faz isso melhor. O que é nosso é a identidade
          visual: paleta, ícones, tela de arranque e o tema Birfree, todos
          gerados de uma fonte só.
        </p>
        <p className="lead">
          Trocar de ambiente depois é um <code>pacman -S</code> como em qualquer
          Arch — nada aqui prende você ao Plasma.
        </p>
      </section>

      <section className="closer" aria-label="Próximo passo">
        <h2 className="h-xl">Veja rodando antes de instalar.</h2>
        <div className="pill-row">
          <Link href="/baixar" className="pill">
            Baixar a Live
            <ArrowUpRight />
          </Link>
          <Link href="/instalacao" className="pill pill--ghost">
            Como instalar
          </Link>
        </div>
      </section>
    </>
  );
}
