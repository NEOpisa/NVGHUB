import type { Locale } from "./i18n";
export type { Locale };
export type Section = { title: string; text: string };
export type Guide = { slug: string; title: Record<Locale, string>; description: Record<Locale, string>; source: string; updated: string; sections: Record<Locale, Section[]>; code: string };
export const GUIDES: Guide[] = [
  {
    "slug": "bitcoin-lightning",
    "title": {
      "pt": "Bitcoin Core e Core Lightning: primeiros passos",
      "en": "Bitcoin Core and Core Lightning: first steps"
    },
    "description": {
      "pt": "Prepare os serviços locais e confira o diagnóstico antes de operar um nó ou abrir canais.",
      "en": "Prepare local services and inspect diagnostics before running a node or opening channels."
    },
    "source": "soberania.md",
    "updated": "2026-09-30",
    "sections": {
      "pt": [
        {
          "title": "Antes de começar",
          "text": "Instalar os pacotes não significa que o nó está configurado ou sincronizado. Os serviços são fornecidos por Bitcoin Core e Core Lightning; a configuração inicial passa pelo assistente neo-first-boot."
        },
        {
          "title": "Verifique o estado",
          "text": "Execute neo-status no sistema instalado. Registre a versão e verifique os serviços e a conectividade. Consulte --help antes de alterar configurações. A sincronização do Bitcoin depende da rede, do armazenamento e das opções do nó."
        },
        {
          "title": "Antes de usar Lightning",
          "text": "Confira a sincronização do nó e a configuração do Core Lightning. Abrir canais e movimentar fundos exige decisões próprias de liquidez, backup e operação. Este guia de diagnóstico não executa transações nem substitui a documentação da versão instalada."
        }
      ],
      "en": [
        {
          "title": "Before you start",
          "text": "Installing packages does not mean the node is configured or synchronized. Bitcoin Core and Core Lightning provide the services; initial configuration is handled by neo-first-boot."
        },
        {
          "title": "Inspect the current state",
          "text": "Run neo-status on the installed system. Record the version and inspect services and connectivity. Read --help before changing configuration. Bitcoin synchronization depends on networking, storage and node options."
        },
        {
          "title": "Before using Lightning",
          "text": "Check node synchronization and Core Lightning configuration. Opening channels and moving funds requires liquidity, backup and operational decisions. This diagnostic guide does not execute transactions or replace documentation for the installed version."
        }
      ]
    },
    "code": "neo-status\nsystemctl --failed"
  },
  {
    "slug": "identidade-nostr",
    "title": {
      "pt": "Identidade Nostr e chave protegida com NIP-49",
      "en": "Nostr identity and NIP-49 key protection"
    },
    "description": {
      "pt": "Entenda a conta opcional, o perfil recuperável e os limites do relay local.",
      "en": "Understand optional identity, profile recovery and the limits of a local relay."
    },
    "source": "identidade.md",
    "updated": "2026-09-30",
    "sections": {
      "pt": [
        {
          "title": "Identidade é opcional",
          "text": "O instalador permite conta local comum ou associação a uma chave Nostr. Recuperar preferências não substitui a confirmação do disco, da conta e das credenciais locais."
        },
        {
          "title": "O que fica no disco",
          "text": "A chave é armazenada como ncryptsec protegida por senha, usando NIP-49, em ~/.local/share/neovanguard/chave.ncryptsec. A identidade pública e o manifesto local são arquivos separados. Proteja também a senha e os meios de recuperação."
        },
        {
          "title": "Consultar antes de publicar",
          "text": "Os comandos abaixo consultam identidade, relays e configurações. Publicar o manifesto e salvar configurações são ações diferentes: podem enviar dados cifrados e ponteiros a serviços externos e exigem as credenciais correspondentes."
        },
        {
          "title": "Relay local",
          "text": "O relay usa 127.0.0.1:7777. Na revisão documentada, seu banco fica em /run e é temporário; reiniciar o serviço e desligar a máquina têm efeitos diferentes. Confirme backups antes de contar com persistência de eventos."
        }
      ],
      "en": [
        {
          "title": "Identity is optional",
          "text": "The installer supports a regular local account or an account associated with a Nostr key. Recovering preferences does not replace confirming the disk, account and local credentials."
        },
        {
          "title": "What is stored on disk",
          "text": "The key is stored as a password-protected NIP-49 ncryptsec at ~/.local/share/neovanguard/chave.ncryptsec. Public identity and the local manifest are separate files. Protect the password and recovery material too."
        },
        {
          "title": "Inspect before publishing",
          "text": "The commands below inspect identity, relays and configuration. Publishing a manifest and saving settings are separate actions: they may send encrypted data and pointers to external services and require the corresponding credentials."
        },
        {
          "title": "Local relay",
          "text": "The relay uses 127.0.0.1:7777. In the documented revision, its database is temporary under /run; restarting the service and shutting down the machine have different effects. Verify backups before relying on persistent events."
        }
      ]
    },
    "code": "nvg-nostr ver\nnvg-nostr relays\nnvg-nostr configs listar"
  },
  {
    "slug": "elements-liquid",
    "title": {
      "pt": "Elements e Liquid: preparação do nó local",
      "en": "Elements and Liquid: preparing a local node"
    },
    "description": {
      "pt": "Conheça a integração com Elements antes de configurar serviços e movimentar ativos.",
      "en": "Understand the Elements integration before configuring services and moving assets."
    },
    "source": "soberania.md",
    "updated": "2026-09-30",
    "sections": {
      "pt": [
        {
          "title": "Componente do sistema",
          "text": "O Neovanguard OS integra Elements como serviço subjacente para Liquid. A presença do pacote não comprova configuração, conectividade ou sincronização. Comece pelo diagnóstico geral e pela ajuda da ferramenta instalada."
        },
        {
          "title": "Leia a configuração",
          "text": "Confira rede, armazenamento, credenciais RPC e vínculo com Bitcoin Core na documentação da revisão instalada. Não exponha RPC à internet nem copie credenciais para um relato público de erro."
        },
        {
          "title": "Operações são uma etapa separada",
          "text": "neo-liquid inclui operações de saldo, endereço e transferência. Peg-in e peg-out têm condições próprias e dependem da rede e da federação Liquid. Primeiro valide o serviço sem fundos; a ajuda abaixo não inicia uma transferência."
        }
      ],
      "en": [
        {
          "title": "System component",
          "text": "Neovanguard OS integrates Elements as the underlying Liquid service. Package installation does not prove configuration, connectivity or synchronization. Start with general diagnostics and the installed tool's help."
        },
        {
          "title": "Read the configuration",
          "text": "Check network, storage, RPC credentials and the Bitcoin Core connection in the documentation for your installed revision. Do not expose RPC to the internet or copy credentials into a public error report."
        },
        {
          "title": "Transfers are a separate step",
          "text": "neo-liquid includes balance, address and transfer operations. Peg-in and peg-out have their own conditions and depend on the Liquid network and federation. Validate the service without funds first; the help command below does not initiate a transfer."
        }
      ]
    },
    "code": "neo-status\nneo-liquid --help"
  },
  {
    "slug": "tor-vpn-isolamento",
    "title": {
      "pt": "Tor, VPN e isolamento de rede",
      "en": "Tor, VPN and network isolation"
    },
    "description": {
      "pt": "Confira o estado real da rede antes de depender de um modo de privacidade.",
      "en": "Check actual network state before relying on a privacy mode."
    },
    "source": "soberania.md",
    "updated": "2026-09-30",
    "sections": {
      "pt": [
        {
          "title": "Funções diferentes",
          "text": "Tor, kill switch e airgap tratam problemas diferentes. O pacote de soberania inclui neo-tor, neo-killswitch e neo-airgap. Antes de selecionar um modo, leia a ajuda e confira quais interfaces e serviços serão afetados."
        },
        {
          "title": "Verifique as regras",
          "text": "Use o diagnóstico do sistema e consulte as regras nftables. Uma indicação de modo ativado não prova que todo o tráfego percorre o caminho esperado. O teste depende também de DNS, interfaces adicionais e endpoints de VPN."
        },
        {
          "title": "Limites do isolamento",
          "text": "O modo Vault tenta desativar interfaces, rádios e serviços de rede. A raiz do sistema instalado continua no disco. Verifique o resultado no hardware de destino; não há promessa de anonimato ou segurança absoluta."
        }
      ],
      "en": [
        {
          "title": "Different functions",
          "text": "Tor, a kill switch and an airgap address different problems. The sovereignty package includes neo-tor, neo-killswitch and neo-airgap. Read the help and check which interfaces and services will be affected before selecting a mode."
        },
        {
          "title": "Verify the rules",
          "text": "Use system diagnostics and inspect nftables rules. An enabled-mode indicator does not prove that all traffic follows the expected path. Testing also depends on DNS, additional interfaces and VPN endpoints."
        },
        {
          "title": "Isolation limits",
          "text": "Vault mode attempts to disable interfaces, radios and network services. The installed system root remains on disk. Verify the result on the target hardware; there is no promise of absolute anonymity or security."
        }
      ]
    },
    "code": "neo-tor --help\nneo-killswitch --help\nneo-airgap --help\nsudo nft list ruleset"
  },
  {
    "slug": "luks-btrfs-snapper",
    "title": {
      "pt": "LUKS, Btrfs e Snapper: instalação e recuperação",
      "en": "LUKS, Btrfs and Snapper: installation and recovery"
    },
    "description": {
      "pt": "Entenda o que a criptografia protege e o que os snapshots realmente cobrem.",
      "en": "Understand what encryption protects and what snapshots actually cover."
    },
    "source": "manutencao.md",
    "updated": "2026-09-30",
    "sections": {
      "pt": [
        {
          "title": "Escolhas no instalador",
          "text": "A revisão documentada usa Btrfs por padrão e oferece LUKS; a criptografia começa desabilitada. Revise disco, formatação e opções antes de confirmar. Faça backup externo dos dados que deseja manter."
        },
        {
          "title": "Confirme o snapshot",
          "text": "O pacote fornece uma configuração Snapper para a raiz e um hook antes das transações do pacman. O hook pode falhar sem impedir a atualização. Consulte a lista para confirmar que um snapshot existe antes de depender dele."
        },
        {
          "title": "Escopo de recuperação",
          "text": "Snapshots da raiz não incluem automaticamente /home, outros subvolumes separados, a partição EFI ou cópias externas. O rollback depende do layout e do boot. Snapshot não substitui backup; LUKS protege dados em repouso e depende das credenciais de desbloqueio."
        }
      ],
      "en": [
        {
          "title": "Installer choices",
          "text": "The documented revision uses Btrfs by default and offers LUKS; encryption starts disabled. Review the disk, formatting and options before confirming. Make an external backup of data you want to keep."
        },
        {
          "title": "Confirm the snapshot",
          "text": "The package provides a Snapper root configuration and a pre-transaction pacman hook. The hook may fail without blocking the update. Inspect the list to confirm that a snapshot exists before relying on it."
        },
        {
          "title": "Recovery scope",
          "text": "Root snapshots do not automatically include /home, other separate subvolumes, the EFI partition or external copies. Rollback depends on layout and boot configuration. Snapshots do not replace backups; LUKS protects data at rest and depends on unlock credentials."
        }
      ]
    },
    "code": "findmnt -no FSTYPE /\nsudo snapper -c root list"
  },
  {
    "slug": "nvg-live-install",
    "title": {
      "pt": "NVG Live ou NVG Install: qual imagem usar?",
      "en": "NVG Live or NVG Install: which image should you use?"
    },
    "description": {
      "pt": "Compare a sessão pelo pendrive com a instalação offline no disco.",
      "en": "Compare a USB live session with offline disk installation."
    },
    "source": "as-isos.md",
    "updated": "2026-09-30",
    "sections": {
      "pt": [
        {
          "title": "NVG Live",
          "text": "A Live inicia o KDE Plasma pelo pendrive para conhecer o ambiente. Não inclui o pacote do instalador. Use essa mídia para experimentar o desktop antes de decidir pela instalação."
        },
        {
          "title": "NVG Install",
          "text": "A Install inicia uma interface de terminal em Rust e carrega o SquashFS produzido pela Live. Ela extrai esse sistema no disco e configura o destino. A instalação básica é offline; recuperação de perfil e operações externas precisam de rede."
        },
        {
          "title": "Nomes e disponibilidade",
          "text": "NVG é o nome apresentado neste site. A árvore de desenvolvimento ainda contém identificadores MBN, como mbn-live e mbn.sfs; não renomeie comandos ou arquivos internos por conta disso. As duas ISOs ainda não têm download público confirmado."
        }
      ],
      "en": [
        {
          "title": "NVG Live",
          "text": "Live starts KDE Plasma from a USB drive so you can explore the environment. It does not include the installer package. Use it to try the desktop before deciding to install."
        },
        {
          "title": "NVG Install",
          "text": "Install starts a Rust terminal interface and carries the SquashFS produced by Live. It extracts that system onto disk and configures the target. Basic installation is offline; profile recovery and external operations need networking."
        },
        {
          "title": "Names and availability",
          "text": "NVG is the name presented on this website. The development tree still contains MBN identifiers such as mbn-live and mbn.sfs; do not rename internal commands or files because of this naming change. Neither ISO has a confirmed public download."
        }
      ]
    },
    "code": ""
  },
  {
    "slug": "instalador-rust",
    "title": {
      "pt": "Como funciona o instalador em Rust",
      "en": "How the Rust installer works"
    },
    "description": {
      "pt": "Conheça a interface de terminal, a revisão do plano e a cópia offline do sistema.",
      "en": "Learn about the terminal interface, plan review and offline system extraction."
    },
    "source": "as-isos.md",
    "updated": "2026-09-30",
    "sections": {
      "pt": [
        {
          "title": "Interface e execução",
          "text": "O instalador usa Rust e ratatui para a interface de terminal. As telas abrangem rede, identidade opcional, locale, sistema, disco, formato, conta, programas, aparência, revisão e execução. O fluxo efetivo depende da mídia e do perfil recuperado."
        },
        {
          "title": "Revisão antes de escrever",
          "text": "O payload e o hash são verificados antes das operações destrutivas. A revisão deve apresentar o dispositivo alvo e as opções de formatação. Não prossiga sem identificar o disco e guardar os arquivos que precisam ser preservados."
        },
        {
          "title": "O que os testes cobrem",
          "text": "Validações de composição, boot, payload e contratos entre executáveis ajudam a detectar regressões. Elas não substituem iniciar a ISO, instalar offline e reiniciar pelo disco em uma VM ou no hardware de destino. Rust por si só não garante uma instalação segura."
        }
      ],
      "en": [
        {
          "title": "Interface and execution",
          "text": "The installer uses Rust and ratatui for its terminal interface. Screens cover networking, optional identity, locale, system, disk, format, account, programs, appearance, review and execution. The actual flow depends on the medium and recovered profile."
        },
        {
          "title": "Review before writing",
          "text": "The payload and hash are checked before destructive operations. Review should present the target device and formatting choices. Do not proceed without identifying the disk and backing up files you need to preserve."
        },
        {
          "title": "What tests cover",
          "text": "Composition, boot, payload and executable-contract checks help detect regressions. They do not replace booting the ISO, installing offline and rebooting from disk in a VM or on target hardware. Rust alone does not guarantee a safe installation."
        }
      ]
    },
    "code": ""
  }
];

