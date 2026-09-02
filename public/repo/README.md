# Repositório de pacotes do Neovanguard OS

Isto não é conteúdo do site. É o repositório pacman da distro, servido como
arquivo estático em `https://neovanguard.com.br/repo/x86_64/`.

O `/etc/pacman.conf` das três ISOs declara `[neovanguard]` e aponta para cá. Sem
estes arquivos, um `pacman -Syu` numa máquina com Neovanguard OS instalado não
traz nenhum dos pacotes da distro — e, até a MYO passar a carregar os próprios
pacotes, um repositório ausente aqui era uma **instalação que não completava**:
`pacman -Sy` sai com 1 quando qualquer banco falha.

## Por que dentro do site

O `neovanguard.com.br` está na Vercel, que não tem SSH nem rsync — que é tudo o
que o `publish-repo.sh` da distro falava. São 5,2 MB, então a saída mais curta é
servi-los como arquivo estático daqui mesmo, sem infraestrutura nova.

**Não edite nada neste diretório à mão.** Ele é gerado inteiro por:

    cd <repositório da distro>
    ./neo/packaging/publish-repo.sh --estatico <este-diretório>

Os `neovanguard.db` e `neovanguard.files` são cópias reais de `.db.tar.gz` e
`.files.tar.gz`, e não links simbólicos: são os nomes que o pacman pede, e
hospedagem estática não garante link.

## O que ainda falta

O repositório **não está assinado** — `SigLevel = Optional TrustAll`. Servido
pela rede, isso é confiança depositada só no transporte, e se repete a cada
atualização. A correção é `./neo/packaging/gen-release-key.sh` na distro e
republicar; o `SigLevel` vira sozinho quando a chave existir.
