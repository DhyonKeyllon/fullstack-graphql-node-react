# 🚀 Bondy Desafio Fullstack

Sistema completo de autenticação com GraphQL, React e Node.js construído como monorepo usando Lerna.

## Pré-requisitos para executar o projeto

- **Node.js 18.x** (obrigatório)
- **Yarn** package manager
- **NVM** (recomendado para gerenciar versões do Node)

## Estrutura do Projeto

Este projeto é um monorepo construído com [Lerna](https://lerna.js.org/) que contém:

```
bondy-desafio-fullstack/
├── packages/
│   ├── backend/           # API GraphQL (Serverless + Apollo Server)
│   │   ├── src/
│   │   │   ├── graphql/   # Resolvers e configuração Apollo
│   │   │   ├── models/    # Modelos MongoDB
│   │   │   ├── typeDefs/  # Schema GraphQL
│   │   │   └── memoryDB/  # Conexão MongoDB
│   │   ├── package.json
│   │   └── serverless.yml
│   └── frontend/          # App React (Vite + TypeScript)
│       ├── src/
│       │   ├── pages/     # Páginas da aplicação
│       │   └── styles/    # Estilos CSS
│       ├── package.json
│       └── vite.config.ts
├── package.json           # Configuração raiz
└── lerna.json
```

## Instalação e Execução

### 1. Configurar Node.js 18

```bash
# Com NVM (recomendado)
nvm use 18

# Ou verificar se já tem a versão correta
node --version  # deve retornar v18.x.x
```

### 2. Instalar Dependências

```bash
# Na raiz do projeto
yarn install
```

### 3. Executar o Projeto Completo

```bash
# Rodar backend e frontend simultaneamente
yarn start

# Ou usar o alias
yarn dev
```

### 4. (Alternativo) Executar Serviços Individualmente

```bash
# Apenas o backend (porta 3333)
yarn start:backend

# Apenas o frontend (porta 5555)
yarn start:frontend
```

## URLs de Acesso

Após executar `yarn start`, os serviços estarão disponíveis em:

- **Frontend**: <http://localhost:5555>
- **Backend GraphQL**: <http://localhost:3333/local/desafio>
- **GraphQL Playground**: <http://localhost:3333/local/desafio> (GET request)

## Credenciais de Teste

Use as seguintes credenciais para testar o login:

- **Email**: `desafio@bondy.com.br`
- **Senha**: `123456`

## Tecnologias Utilizadas

### Backend

- **Node.js 18** - Runtime JavaScript
- **GraphQL** - API query language
- **Apollo Server** - Servidor GraphQL
- **Serverless Framework** - Deploy e desenvolvimento local
- **MongoDB** - Banco de dados
- **bcrypt** - Criptografia de senhas
- **TypeScript** - Tipagem estática

### Frontend

- **React v18** - Framework frontend
- **Vite v5** - Build tool moderna
- **React Router Dom** - Roteamento
- **TypeScript** - Tipagem estática
- **Apollo Client** - Cliente GraphQL

## Scripts Disponíveis

### Scripts da Raiz

```bash
yarn start          # Inicia backend e frontend
yarn dev            # Alias para yarn start
yarn start:backend  # Inicia apenas o backend
yarn start:frontend # Inicia apenas o frontend
yarn install:all    # Instala todas as dependências
yarn clean          # Limpa node_modules e cache
```

### Scripts do Backend

```bash
yarn lerna run start --scope=backend     # Iniciar servidor
yarn lerna run test --scope=backend      # Executar testes
yarn lerna run lint --scope=backend      # Executar linter
```

### Scripts do Frontend

```bash
yarn lerna run dev --scope=frontend      # Modo desenvolvimento
yarn lerna run build --scope=frontend    # Build para produção
yarn lerna run preview --scope=frontend  # Preview do build
yarn lerna run lint --scope=frontend     # Executar linter
```

## Configuração de Portas

As portas são configuradas via variáveis de ambiente:

- **Backend**: Porta 3333 (definida em `packages/backend/.env.local`)
- **Frontend**: Porta 5555 (definida em `packages/frontend/.env.local`)

Para alterar as portas, edite os respectivos arquivos `.env.local`:

```bash
# packages/backend/.env.local
PORT=3333

# packages/frontend/.env.local
PORT=5555
```

## Arquitetura

### Backend (GraphQL API)

- **Resolver de Login**: Valida credenciais com bcrypt
- **MongoDB**: Armazena dados dos usuários
- **Serverless Offline**: Simula ambiente AWS localmente
- **TypeScript**: Tipagem estática e melhor DX

### Frontend (React SPA)

- **Páginas**: Login e Welcome
- **Apollo Client**: Gerencia estado e cache GraphQL
- **Vite**: Build rápido e HMR
- **TypeScript**: Tipagem estática

## 🚨 Troubleshooting (se tiver)

### Erro de Porta em Uso

```bash
# Matar processos nas portas
pkill -f "serverless offline"
pkill -f "vite"

# Ou verificar processos específicos
lsof -i :3333 -i :5555
```

### Erro de Versão do Node

```bash
# Verificar versão atual
node --version

# Trocar para Node 18
nvm use 18
```

### Problemas de Dependências

```bash
# Limpar cache e reinstalar
yarn clean
yarn install
```

---

**Desenvolvido com ❤️ para o Desafio da Bondy**
