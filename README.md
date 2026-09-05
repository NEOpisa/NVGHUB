# nvghub

Site do Neovanguard OS: apresentação, disponibilidade das imagens, instalação
e documentação. Construído com Next.js App Router, React e TypeScript.

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

A documentação técnica do sistema fica no [repositório da distro](https://github.com/NEOpisa/neovanguard/tree/main/documentation).
O site oferece guias de entrada e links para essa referência; comandos devem
ser conferidos no código da distro antes de alterar seus exemplos.

Ao publicar uma versão, atualize `VERSAO` e `IMAGENS` em `constants.ts`, confira
os nomes dos arquivos e o estado de publicação em `/baixar`. Só adicione links
de download depois de verificar que as imagens e assinaturas estão disponíveis.
Não publique uma impressão de chave diferente sem verificar sua origem.

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
