export const PAGES = [
  {
    "pt": "/",
    "en": "/en",
    "label": "Início",
    "title": "Linux for Bitcoin, Lightning and Nostr",
    "description": "An Arch Linux distribution with KDE Plasma and tools for local Bitcoin, Lightning and Nostr infrastructure.",
    "sections": [
      {
        "title": "The company and the product",
        "text": "Neovanguard is the company behind Neovanguard OS. The product brings together an Arch Linux desktop, local services and optional Nostr identity."
      },
      {
        "title": "Current availability",
        "text": "Public ISO downloads are not available yet. The development repository is private. Read the public guides and development notes before planning a build or installation."
      },
      {
        "title": "Explore the system",
        "text": "Compare NVG Live and NVG Install, learn about networking and storage, and check the limitations of each feature. The project's declared license is GPL-3.0."
      }
    ],
    "updated": "2026-09-30"
  },
  {
    "pt": "/baixar",
    "en": "/en/download",
    "label": "Imagens e disponibilidade",
    "title": "Images and availability",
    "description": "Compare NVG Live and NVG Install and check the status of public ISO downloads.",
    "sections": [
      {
        "title": "No public ISO download yet",
        "text": "Neither NVG Live nor NVG Install currently has a confirmed public download. The site previously described version 1.1.0; development notes also document 1.2.1 in preparation. A source version or checksum is not a downloadable image."
      },
      {
        "title": "NVG Live",
        "text": "Boot KDE Plasma from a USB drive to try the desktop. The Live image does not include the installer."
      },
      {
        "title": "NVG Install",
        "text": "Install carries the Live system payload and a Rust terminal installer. Basic installation is offline. Recovering a remote profile requires connectivity."
      },
      {
        "title": "Before writing a USB drive",
        "text": "When files are published, verify the checksum and any published signature against the announced signing-key fingerprint. Check that the verification instructions refer to the exact image you downloaded."
      }
    ],
    "updated": "2026-09-30"
  },
  {
    "pt": "/recursos",
    "en": "/en/features",
    "label": "Recursos",
    "title": "System features",
    "description": "Explore optional Nostr identity, local services, networking controls and storage on Neovanguard OS.",
    "sections": [
      {
        "title": "Arch Linux and KDE Plasma",
        "text": "The system uses Arch Linux, KDE Plasma and pacman, with additional Neovanguard packages."
      },
      {
        "title": "Optional Nostr identity",
        "text": "A regular local account is supported. Nostr identity can restore preferences and uses password-protected NIP-49 key storage. Review credentials and the target disk locally."
      },
      {
        "title": "Local infrastructure",
        "text": "Bitcoin Core, Core Lightning, Elements and a local Nostr relay provide the underlying services. Installed packages still require configuration and, where applicable, synchronization."
      },
      {
        "title": "Privacy and recovery",
        "text": "System logs are volatile by default. LUKS is optional. Btrfs and Snapper support snapshots whose scope depends on the layout. Tor, VPN controls and isolation tools require verification on the target machine; they do not guarantee anonymity."
      }
    ],
    "updated": "2026-09-30"
  },
  {
    "pt": "/instalacao",
    "en": "/en/installation",
    "label": "Instalação",
    "title": "Installation overview",
    "description": "Prepare a future NVG Install image and review disk, account and offline payload settings.",
    "sections": [
      {
        "title": "Availability comes first",
        "text": "Public ISOs are not available yet. These instructions describe the installation flow; they are not a download announcement. Back up the data you intend to keep before testing an installer."
      },
      {
        "title": "Prepare the medium",
        "text": "Use the Install image, not Live. Verify the published checksum and signature when available, write the ISO to a USB drive and choose that device in the computer's boot menu."
      },
      {
        "title": "Review the target",
        "text": "The terminal interface covers networking, optional identity, locale, system, disk, format, account, programs, appearance, review and execution. Screens depend on the medium and recovered profile. Confirm the target disk and formatting choices before proceeding."
      },
      {
        "title": "Offline installation",
        "text": "The installer extracts the Live payload and configures the destination. Basic installation does not require a network connection. Remote profile recovery and additional online services do. Validate rebooting from the installed disk after testing in a virtual machine."
      }
    ],
    "updated": "2026-09-30"
  },
  {
    "pt": "/documentacao",
    "en": "/en/documentation",
    "label": "Documentação",
    "title": "Documentation",
    "description": "Public Neovanguard OS guides, diagnostics and information about restricted build documentation.",
    "sections": [
      {
        "title": "Public guides",
        "text": "Start with the guides below for Bitcoin and Lightning, Nostr identity, Liquid, network controls, storage and installation media. They describe the documented development state and identify limitations."
      },
      {
        "title": "Building from source",
        "text": "The development repository is private. Authorized contributors should follow the build guide for the exact revision: prepare an Arch Linux environment, build dependencies and assets, run checks, build the images and test boot and installation in a VM."
      },
      {
        "title": "Reporting an issue",
        "text": "Record the version, installation medium, reproduction steps and error message. Remove private keys, passwords and personal data. Contact Mizael by email if you cannot access the repository."
      },
      {
        "title": "A package repository is not an ISO release",
        "text": "Source pushes, package publication and ISO distribution are separate operations. The presence of checksums or package files does not imply that a new system image is available."
      }
    ],
    "updated": "2026-09-30"
  },
  {
    "pt": "/sobre",
    "en": "/en/about",
    "label": "Sobre",
    "title": "About Neovanguard",
    "description": "Meet the company and cofounders behind Neovanguard OS, a Linux distribution for local infrastructure.",
    "sections": [
      {
        "title": "Company and product",
        "text": "Neovanguard is the company. Neovanguard OS is its Linux distribution, focused on operating Bitcoin, Lightning and Nostr infrastructure on your own computer."
      },
      {
        "title": "The cofounders",
        "text": "Mizael Ribeiro, cofounder and CEO, leads product and development. João Antônio Rodrigues, cofounder and COO, leads operations, quality and security. Their responsibilities complement each other."
      },
      {
        "title": "Scope and limitations",
        "text": "The project targets people willing to operate and maintain Linux services. Network controls do not promise anonymity. Recovery depends on keys, backups, storage layout and configuration; the software is provided without warranty under its declared GPL-3.0 license."
      }
    ],
    "updated": "2026-09-30"
  },
  {
    "pt": "/privacidade",
    "en": "/en/privacy",
    "label": "Privacidade",
    "title": "Privacy policy",
    "description": "How the Neovanguard website handles audience statistics, contact messages and package access.",
    "sections": [
      {
        "title": "What we collect",
        "text": "Audience measurement uses anonymous browsing statistics without individual identification cookies. The site has no forms for submitting names, email addresses or phone numbers."
      },
      {
        "title": "Package repository",
        "text": "The /repo address distributes signed packages without a login or installation identifier. Access to files may generate hosting logs, as with other web services."
      },
      {
        "title": "Operating system",
        "text": "Neovanguard OS does not send telemetry. System logs are stored in RAM by default and discarded at shutdown. Relays used for Nostr identity are selected by the user independently of this website."
      },
      {
        "title": "Use and retention",
        "text": "We do not sell or share your data with third parties for marketing. We do not send bulk email; we respond to your requests. Contact messages are kept only as long as needed for support and legal obligations."
      },
      {
        "title": "Your rights",
        "text": "You may request access, correction or deletion of your data through our contact email. Requests are handled within the applicable legal time limit."
      }
    ],
    "updated": "2026-09-30"
  },
  {
    "pt": "/termos",
    "en": "/en/terms",
    "label": "Termos de uso",
    "title": "Terms of use",
    "description": "Terms for website content, Neovanguard OS information, availability and contact.",
    "sections": [
      {
        "title": "Website content",
        "text": "Texts, branding and visual material on this website belong to Neovanguard and may not be reproduced without permission."
      },
      {
        "title": "System information",
        "text": "The website describes Neovanguard OS. Consult the project's source repository for the software license and distribution conditions; access to the development repository is currently restricted."
      },
      {
        "title": "Availability",
        "text": "The website may become unavailable during maintenance without prior notice."
      },
      {
        "title": "Contact",
        "text": "For questions about these terms or privacy, contact mizael.neovanguard@gmail.com. The website's privacy policy describes data handling."
      }
    ],
    "updated": "2026-09-30"
  }
] as const;

