import type { Locale } from "./i18n";

/** Fundadores da Neovanguard. Cada pessoa tem uma página própria em
 * /sobre/<slug> e /en/about/<slug>, com `ProfilePage` + `Person` e o mesmo
 * `@id` usado em `founder` no schema da organização. Assim os buscadores ligam
 * o nome, o site, o LinkedIn e o GitHub à mesma entidade. Só escreva aqui o
 * que a própria pessoa declarou publicamente. */
export type Person = {
  slug: string;
  name: string;
  givenName: string;
  familyName: string;
  jobTitle: Record<Locale, string>;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  bio: Record<Locale, string[]>;
  focus: Record<Locale, string[]>;
  knowsAbout: string[];
  links: { label: string; url: string }[];
  updated: string;
};

export const TEAM: Person[] = [
  {
    slug: "mizael-ribeiro",
    name: "Mizael Ribeiro",
    givenName: "Mizael",
    familyName: "Ribeiro",
    jobTitle: { pt: "Cofundador e CEO da Neovanguard", en: "Co-founder and CEO of Neovanguard" },
    title: { pt: "Mizael Ribeiro, cofundador e CEO da Neovanguard", en: "Mizael Ribeiro, co-founder and CEO of Neovanguard" },
    description: {
      pt: "Mizael Ribeiro é cofundador e CEO da Neovanguard e lidera o produto e o desenvolvimento do Neovanguard OS, Linux para Bitcoin, Lightning e Nostr.",
      en: "Mizael Ribeiro is co-founder and CEO of Neovanguard and leads product and development of Neovanguard OS, Linux for Bitcoin, Lightning and Nostr.",
    },
    bio: {
      pt: [
        "Mizael Ribeiro, de Patos, na Paraíba, é cofundador e CEO da Neovanguard, empresa brasileira 100% remota. Ele lidera a visão, o produto e o desenvolvimento do Neovanguard OS, a distribuição baseada em Arch Linux para Bitcoin, Lightning e Nostr.",
        "No Neovanguard OS, Mizael trabalha principalmente com Rust e Linux e com as integrações de Bitcoin e Nostr do sistema: identidade por chave Nostr, relay local e as ferramentas para operar Bitcoin Core, Core Lightning e Elements/Liquid no próprio computador.",
        "Até 2026, a Neovanguard atuou como agência de desenvolvimento para pequenas e médias empresas, com sites sob medida, automações e integrações de IA. Mizael conduziu a mudança da empresa para um produto próprio, de código aberto, para que chaves, serviços e dados fiquem sob o controle de quem usa a máquina.",
        "Ele fundou a Neovanguard com João Antônio Rodrigues, cofundador e COO, que lidera operação, qualidade, auditorias técnicas e segurança.",
      ],
      en: [
        "Mizael Ribeiro, from Patos, Paraíba, is co-founder and CEO of Neovanguard, a fully remote Brazilian company. He leads the vision, product and development of Neovanguard OS, the Arch Linux-based distribution for Bitcoin, Lightning and Nostr.",
        "On Neovanguard OS, Mizael works mainly with Rust and Linux and with the system's Bitcoin and Nostr integrations: Nostr key identity, a local relay, and the tools to run Bitcoin Core, Core Lightning and Elements/Liquid on your own computer.",
        "Until 2026, Neovanguard operated as a development agency for small and medium-sized businesses, building custom websites, automations and AI integrations. Mizael led the company's shift to its own open-source product, so that keys, services and data stay under the control of whoever uses the machine.",
        "He founded Neovanguard with João Antônio Rodrigues, co-founder and COO, who leads operations, quality, technical audits and security.",
      ],
    },
    focus: {
      pt: ["Produto e desenvolvimento do Neovanguard OS", "Rust e Linux (Arch Linux, KDE Plasma)", "Integrações de Bitcoin, Lightning e Nostr"],
      en: ["Neovanguard OS product and development", "Rust and Linux (Arch Linux, KDE Plasma)", "Bitcoin, Lightning and Nostr integrations"],
    },
    knowsAbout: ["Linux", "Arch Linux", "Rust", "Bitcoin", "Lightning Network", "Nostr", "Software livre"],
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/mizael-ribeiro-neovanguard" },
      { label: "GitHub", url: "https://github.com/NEOpisa" },
    ],
    updated: "2026-10-03",
  },
  {
    slug: "joao-antonio-rodrigues",
    name: "João Antônio Rodrigues",
    givenName: "João Antônio",
    familyName: "Rodrigues",
    jobTitle: { pt: "Cofundador e COO da Neovanguard", en: "Co-founder and COO of Neovanguard" },
    title: { pt: "João Antônio Rodrigues, cofundador e COO da Neovanguard", en: "João Antônio Rodrigues, co-founder and COO of Neovanguard" },
    description: {
      pt: "João Antônio Rodrigues é cofundador e COO da Neovanguard e lidera operação, qualidade e segurança do Neovanguard OS, com foco em segurança ofensiva e Linux.",
      en: "João Antônio Rodrigues is co-founder and COO of Neovanguard and leads operations, quality and security of Neovanguard OS, focused on offensive security and Linux.",
    },
    bio: {
      pt: [
        "João Antônio Rodrigues é cofundador e COO da Neovanguard e estudante de Ciência da Computação. Ele lidera a operação, a qualidade, as auditorias técnicas e a segurança do Neovanguard OS, a distribuição baseada em Arch Linux para Bitcoin, Lightning e Nostr.",
        "No Neovanguard OS, João desenvolve ferramentas e integrações de sistema com Nostr, Bitcoin, Mempool e Tor, e conduz revisões adversariais internas do código. Essas revisões já confirmaram mais de 20 problemas de segurança e robustez, como limites de privilégio, comportamento do instalador, validação de Secure Boot e verificação de protocolo. Cada correção é revisada e testada de novo antes de ser considerada resolvida.",
        "Fora do sistema, ele trabalha em projetos práticos de segurança: análise de tráfego de rede e detecção de anomalias com Python e Scapy, testes de segurança em aplicações web, análise de aplicativos Android com mitmproxy e JADX, automação de ferramentas de segurança e hardening de Linux.",
        "Ele fundou a Neovanguard com Mizael Ribeiro, cofundador e CEO, que lidera produto e desenvolvimento.",
      ],
      en: [
        "João Antônio Rodrigues is co-founder and COO of Neovanguard and a Computer Science student. He leads operations, quality, technical audits and security for Neovanguard OS, the Arch Linux-based distribution for Bitcoin, Lightning and Nostr.",
        "On Neovanguard OS, João builds system tooling and integrations around Nostr, Bitcoin, Mempool and Tor, and runs internal adversarial reviews of the codebase. These reviews have confirmed more than 20 security and robustness issues, including privilege boundaries, installer behavior, Secure Boot validation and protocol verification. Every fix is reviewed and re-tested before it is considered resolved.",
        "Outside the system, he works on practical security projects: network traffic analysis and anomaly detection with Python and Scapy, web application security testing, Android app analysis with mitmproxy and JADX, security tooling automation and Linux hardening.",
        "He founded Neovanguard with Mizael Ribeiro, co-founder and CEO, who leads product and development.",
      ],
    },
    focus: {
      pt: ["Segurança ofensiva e auditoria do Neovanguard OS", "Linux, hardening e ferramentas de sistema", "Integrações com Nostr, Bitcoin e Tor"],
      en: ["Offensive security and Neovanguard OS audits", "Linux, hardening and system tooling", "Nostr, Bitcoin and Tor integrations"],
    },
    knowsAbout: ["Segurança da informação", "Segurança ofensiva", "Linux", "Python", "Bitcoin", "Nostr", "Tor"],
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/jo%C3%A3o-ant%C3%B4nio-rodrigues-884093303" },
      { label: "GitHub", url: "https://github.com/joaoinky" },
    ],
    updated: "2026-10-03",
  },
];

export const personPath = (locale: Locale, slug: string) => (locale === "en" ? "/en/about/" : "/sobre/") + slug;

/** Identificador estável da pessoa, igual nos dois idiomas. */
export const personId = (siteUrl: string, slug: string) => `${siteUrl}/sobre/${slug}#person`;
