# CLAUDE.md

**minhas-coisas** é um PWA pessoal (uso de uma pessoa só, atrás de login Google) que reúne listas do dia a dia. Hoje tem as seções **Profissionais** (indicações de prestadores de serviço) e **Lojas** (lojas e achados salvos); a próxima é livros.

## Comandos

Sempre `yarn` (yarn@1.22.22), Node da `.nvmrc`.

| Tarefa | Comando |
| --- | --- |
| Dev server (porta 3001) | `yarn dev` |
| Build | `yarn build` |
| Typecheck | `yarn typecheck` |
| Lint | `yarn lint` / `yarn lint:fix` |

Não há testes. Valide com `yarn typecheck` e `yarn lint`.

## Stack

React 19 + TypeScript + Vite 8 (PWA), Tailwind 4 + componentes no estilo shadcn em `src/components/ui`, Firebase (Auth Google + Firestore com cache offline), Jotai, react-router-dom 7, sonner. A base veio do projeto `my-wallet` e **usa o mesmo projeto Firebase dele** (variáveis `VITE_FIREBASE_*` em `.env.local`).

## Estrutura

```
src/
  pages/<secao>/   # tudo da seção fica junto: página, components/, serviço Firestore, tipos, utils
  pages/shared/    # base das seções em formato de catálogo: PaginaCatalogo, useCatalogo, criarServico
  components/      # ui/ (design system), layout/, peças genéricas
  routes/          # router, layout e secoes.ts (fonte única do menu)
  store/           # átomos jotai (auth, theme)
  lib/             # firebase, firestore, utils
dados/             # listas para importar pela tela; não entram no bundle
```

Para criar uma seção nova: pasta em `src/pages/`, rota em `routes/router.tsx` e uma entrada em `routes/secoes.ts`. Se for uma lista com categorias (como Profissionais e Lojas), monte em cima de `pages/shared`: a seção só define tipo, serviço, busca, importação, card e formulário, e ganha busca, categorias, destaque, importar e excluir categoria.

## Dados

Firestore em `/users/{uid}/<colecao>` (hoje: `profissionais` e `lojas`). Telefones são guardados como foram digitados; `pages/profissionais/telefone.ts` interpreta (DDD padrão 31, nono dígito, fixo x celular) e marca "Conferir número" quando não fecha.

Arquivos em `dados/` têm telefones de terceiros: **nunca importe esses arquivos no código** (iriam para o bundle público). Eles entram pelo botão "Importar lista".

## Convenções

- Arrow functions sempre; sem comentários no código.
- Use os componentes de `src/components/ui` em vez de HTML cru; componentes pequenos, um por arquivo, arquivos até ~200 linhas.
- Nomes de domínio em português.
