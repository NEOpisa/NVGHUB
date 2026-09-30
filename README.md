# nvghub

Site do Neovanguard OS: apresentação, disponibilidade das imagens, instalação
e documentação. Construído com Next.js App Router, React e TypeScript.

Desenvolvido pela [Neovanguard](https://neovanguard.com.br), cofundada por
[Mizael Ribeiro](https://www.linkedin.com/in/mizael-ribeiro-8a3b42385) e
[João Antônio Rodrigues](https://www.linkedin.com/in/jo%C3%A3o-ant%C3%B4nio-rodrigues-884093303).

## Executar localmente

Use Node.js 22 (a versão usada no CI) e npm.

```sh
npm ci
npm run dev
```

Abra http://localhost:3000. Não são necessárias variáveis de ambiente para
executar o site. Para conferir a versão de produção:

```sh
npm run build
npm start
```

## Verificar alterações

```sh
npm run lint
npx tsc --noEmit
npm test
npm run build
```

Com o servidor rodando, `node scripts/visual-qa.mjs` captura as nove páginas
em desktop, tablet e celular. Requer Chromium instalado no cache do Playwright
(`npx playwright install chromium`). Capturas ficam em `.qa-shots/`, ignorada
pelo Git. Confira também navegação por teclado, menu, links do sumário, cópia
de comandos e a preferência de movimento reduzido. A captura sozinha não
valida essas interações.

## Organização

- `src/app/`: páginas, metadados, manifest e `shell.css`.
- `src/components/shell/`: cabeçalho, sumário contextual e rodapé globais.
- `src/components/blocos/`: acordeão e blocos de comandos copiáveis.
- `src/components/brand/`: carregamento progressivo, geometria e cena 3D.
- `src/lib/constants.ts`: versão, navegação, mídias, links e chave pública.
- `src/lib/v-malha.json`: geometria compartilhada entre SVG, ícones e 3D.
- `public/repo/`: arquivos do repositório de pacotes.
- `public/templates/`: conteúdo legado; não participa do shell atual.

## Atualizar o conteúdo

A documentação técnica do sistema fica no [repositório privado de desenvolvimento](https://github.com/NEOpisa/neovanguard-os-dev/tree/main/documentation).
O site oferece guias de entrada e links para essa referência; comandos devem
ser conferidos no código da distro antes de alterar seus exemplos.

Ao publicar uma versão, atualize `VERSAO` e `IMAGENS` em `constants.ts`, confira
os nomes dos arquivos e o estado de publicação em `/baixar`. Só adicione links
de download depois de verificar que as imagens e assinaturas estão disponíveis.
Não publique uma impressão de chave diferente sem verificar sua origem.
Ao alterar conteúdo significativo, atualize a data editorial em `src/lib/pages.ts`,
`src/lib/guides.ts` ou `src/lib/routes.ts`. O sitemap usa esse cadastro, com pares
pt-BR/en/x-default, e não inventa uma data nova a cada build.

As páginas em português ficam em `src/app/(pt)/`, sem mudar suas URLs. O grupo
possui layout com `lang=pt-BR`; `src/app/en/` usa `lang=en`. Canonical, Open Graph
e hreflang são gerados por `pageMetadata`. Os guias compartilham conteúdo e
metadados tipados. `/faq` redireciona com 301 para `/documentacao`.

Após o build, inicie `npm start -- --port 3100` e execute
`node scripts/seo-qa.mjs`: todas as URLs do sitemap precisam responder 200,
ter idioma, canonical e alternates coerentes e dados estruturados válidos.
`QA_URL` permite verificar outro servidor. Esse teste não mede ranking.

As fontes locais WOFF2 em `src/assets/fonts/` vêm do repositório google/fonts,
com suas licenças OFL incluídas. Elas evitam downloads externos durante o build.
Os arquivos de verificação de Google/Bing devem entrar em `public/`, com o
nome e conteúdo originais fornecidos pela conta do responsável.

O desenvolvimento do OS permanece privado e as ISOs não estão publicadas.
Os guias públicos são introduções ao estado documentado, não validação de
uma instalação completa. Notas da versão distinguem preparação e release.

As rotas do QA visual e do Lighthouse precisam acompanhar as páginas atuais.
O CI executa lint, tipos, testes, build e um limite de tamanho do bundle da home.

## Sistema visual

O shell usa uma moldura sobre fundo escuro, superfícies azul-marinho e
`#6495ED` como cor principal. Texto claro e variantes de cornflower blue
mantêm a hierarquia. Botões preenchidos usam texto escuro para contraste. Os tokens no início de `shell.css` definem
cores, escala tipográfica e raios. Space Grotesk é usada em títulos, Plus
Jakarta Sans em leitura e IBM Plex Mono em comandos.

Mantenha páginas internas com abertura compacta. Use `CodeBlock` para comandos,
`h2` com `id` para seções do sumário e `hero--home` apenas na página inicial.
O menu usa `<dialog>` nativo para foco modal e fechamento com Escape.
`Motion` revela as seções uma vez com a Web Animations API; o conteúdo continua
visível sem JavaScript. A preferência de movimento reduzido cancela animações
ativas e evita novas animações.

A cena 3D é importada dinamicamente, pausa fora da tela e em abas ocultas, e
usa o SVG quando WebGL não está disponível ou há preferência por menos
movimento. Evite separar as metades ou aplicar biséis às pontas agudas da marca.

## Gerar a marca

```sh
node scripts/marca.mjs
```

Requer `rsvg-convert` (librsvg). O script gera os SVGs, favicons e PNGs do
manifest a partir da malha compartilhada. Não edite os caminhos gerados à mão.
Os testes verificam a simetria e a direção da extrusão. Os PNGs e SVGs gerados
necessários ao site devem ser versionados juntos.
