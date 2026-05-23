# Preset Library

Preset Library e uma aplicacao local-first para organizar presets de guitarra, agrupados por setlists e associados a amplificadores.

Esta documentacao descreve o estado da aplicacao no fechamento da versao `v0.8.0`.

## Objetivo

O objetivo da aplicacao e permitir que o usuario mantenha uma biblioteca pessoal de presets de guitarra, com busca, tags, organizacao por setlists, detalhes de amplificadores e backup manual dos dados.

A aplicacao roda no navegador e armazena os dados localmente em IndexedDB. Nao ha backend, login ou sincronizacao remota nesta versao.

## Stack

- React
- TypeScript
- Vite
- React Router
- Dexie
- IndexedDB
- Tailwind CSS
- ESLint

## Funcionalidades

### Presets

- Listagem de presets da setlist ativa.
- Busca por nome, descricao e tags.
- Filtro por tags disponiveis na setlist ativa.
- Criacao de presets.
- Edicao de presets.
- Exclusao de presets.
- Visualizacao detalhada de um preset.
- Associacao de preset a um amplificador.
- Reordenacao manual de presets.
- Reordenacao preservada mesmo quando ha busca ou filtro por tag ativo.

### Setlists

- Listagem de setlists.
- Criacao de setlists.
- Edicao de setlists.
- Selecao de setlist ativa.
- Exclusao de setlists.
- Ao excluir uma setlist, os presets vinculados a ela tambem sao removidos.
- Se a setlist ativa for excluida, outra setlist disponivel passa a ser definida como ativa.
- Se todas as setlists forem excluidas, uma setlist padrao e criada automaticamente.

### Amplificadores

- Listagem de amplificadores cadastrados no banco local.
- Visualizacao detalhada de um amplificador.
- Listagem de presets que usam determinado amplificador.
- Amplificadores iniciais criados via seed.
- Nesta versao, os amplificadores ainda nao possuem tela de cadastro ou edicao.

### Backup

- Exportacao da biblioteca para um arquivo JSON.
- Importacao de backup JSON.
- O backup inclui:
  - presets
  - amplificadores
  - setlists
  - setlist ativa
  - versao do formato do backup
  - data de exportacao
- A importacao substitui todos os dados locais atuais.
- A importacao valida a estrutura basica e a versao do backup.
- Se a setlist ativa do backup nao existir nos dados importados, a aplicacao usa a primeira setlist disponivel como fallback.

## Rotas

| Rota | Descricao |
| --- | --- |
| `/` | Home com presets da setlist ativa |
| `/preset/:id` | Detalhes de um preset |
| `/new-preset` | Criacao de preset |
| `/preset/:id/edit` | Edicao de preset |
| `/setlists` | Listagem e selecao de setlists |
| `/new-setlist` | Criacao de setlist |
| `/setlists/:id/edit` | Edicao de setlist |
| `/amps` | Listagem de amplificadores |
| `/amp/:id` | Detalhes de um amplificador |
| `/backup` | Exportacao e importacao de dados |

## Modelo de dados

### Preset

```ts
interface Preset {
  id: string
  name: string
  ampId: string
  description: string
  setlistId: string
  tags: string[]
  order: number
}
```

### Amp

```ts
interface Amp {
  id: string
  name: string
  brand: string
  image: string
  description: string
}
```

### Setlist

```ts
interface Setlist {
  id: string
  name: string
  description: string
}
```

## Persistencia

Os dados sao armazenados localmente no navegador usando IndexedDB via Dexie.

Banco:

```ts
PresetLibraryDatabase
```

Tabelas:

- `presets`
- `amps`
- `setlists`

Indices atuais:

```ts
presets: 'id, name, ampId, setlistId'
amps: 'id, name, brand'
setlists: 'id, name, description'
```

A setlist ativa e armazenada separadamente em `localStorage`, usando a chave:

```ts
activeSetlistId
```

## Seed inicial

Na inicializacao, a aplicacao executa um seed local.

O seed garante:

- amplificadores iniciais no banco local
- uma setlist padrao chamada `My Presets`
- presets iniciais de exemplo, caso ainda nao existam presets

Amplificadores iniciais:

- Two Rock Studio Signature
- EVH 5150 III
- Marshall JCM 800
- Fender Deluxe Reverb 65
- Vox AC30
- Outro

Nesta versao, todos os amplificadores usam uma imagem generica versionada:

```txt
src/assets/amps/no_image.jpg
```

As imagens especificas dos amplificadores nao fazem parte do commit da v1.0.0.

## Formato do backup

O backup exportado segue o formato:

```json
{
  "version": 1,
  "exportedAt": "2026-05-23T00:00:00.000Z",
  "data": {
    "presets": [],
    "amps": [],
    "setlists": [],
    "activeSetlistId": null
  }
}
```

O formato do backup possui versao propria, independente da versao do schema do IndexedDB.

## Estrutura do projeto

```txt
src/
  components/
    AmpCard.tsx
    BottomNavigation.tsx
    PresetCard.tsx
    PresetForm.tsx
  database/
    db.ts
    seed.ts
  lib/
    activeSetlist.ts
    initializeApp.ts
  pages/
    AmpDetailsPage.tsx
    AmpsPage.tsx
    BackupPage.tsx
    EditPresetPage.tsx
    EditSetlistPage.tsx
    HomePage.tsx
    NewPresetPage.tsx
    NewSetlistPage.tsx
    PresetDetailsPage.tsx
    SetlistsPage.tsx
  services/
    ampService.ts
    backupService.ts
    presetService.ts
    setlistService.ts
  types/
    amp.ts
    preset.ts
    setlist.ts
```

## Comandos

Instalar dependencias:

```bash
npm install
```

Rodar em desenvolvimento:

```bash
npm run dev
```

Gerar build de producao:

```bash
npm run build
```

Rodar lint:

```bash
npm run lint
```

Preview do build:

```bash
npm run preview
```

## Limitacoes conhecidas da v0.8.0

- Nao ha cadastro ou edicao de amplificadores.
- Nao ha upload de imagens pelo usuario.
- As imagens dos amplificadores usam placeholder generico.
- Nao ha sincronizacao em nuvem.
- Nao ha testes automatizados.
- A importacao de backup substitui toda a biblioteca atual.
- Validacoes de formulario ainda sao simples.
- Algumas mensagens de interface ainda misturam portugues e ingles.

## Evolucoes planejadas

- Cadastro e edicao de amplificadores.
- Novos atributos para amplificadores.
- Suporte a imagem personalizada para amplificadores.
- Melhorias de validacao nos formularios.
- Melhorias de acessibilidade.
- Melhor tratamento de estados de carregamento e erro.
- Estrategia de merge para importacao de backup.
- Testes automatizados para servicos e fluxos principais.
