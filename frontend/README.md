# 🎬 CineVerse - Sistema de Gerenciamento de Filmes

Um sistema completo de gerenciamento de filmes construído com Next.js, Express.js e MongoDB, oferecendo uma interface moderna e intuitiva para organizar sua coleção cinematográfica.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [API Endpoints](#api-endpoints)
- [Componentes](#componentes)
- [Como Usar](#como-usar)
- [Desenvolvimento](#desenvolvimento)
- [Deploy](#deploy)

## 🎯 Visão Geral

O CineVerse é uma aplicação web moderna que permite aos usuários:

- **Gerenciar filmes**: Adicionar, editar, visualizar e deletar filmes
- **Organizar por status**: Separar filmes assistidos dos não assistidos
- **Avaliar conteúdo**: Sistema de rating com estrelas (1-5)
- **Filtrar e ordenar**: Visualizar filmes por diferentes critérios
- **Interface responsiva**: Funciona perfeitamente em desktop e mobile

## ✨ Funcionalidades

### 🎬 Gerenciamento de Filmes
- ✅ Adicionar novos filmes com título, ano, gênero
- ✅ Marcar filmes como assistidos/não assistidos
- ✅ Sistema de avaliação com estrelas (1-5)
- ✅ Editar informações dos filmes
- ✅ Deletar filmes da coleção

### 🔍 Visualizações e Filtros
- **Todos os Filmes**: Visualização completa da coleção
- **Filmes Assistidos**: Apenas filmes marcados como assistidos
- **Para Assistir**: Filmes ainda não assistidos
- **Por Rating**: Filmes ordenados por avaliação (maior para menor)

### 🎨 Interface Moderna
- Design dark theme elegante
- Animações suaves com Framer Motion
- Componentes responsivos
- Indicadores visuais para status e ratings
- Modais de confirmação para ações importantes

## 🛠 Tecnologias

### Frontend
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Animações e transições
- **Lucide React** - Ícones modernos

### Backend
- **Express.js** - Framework Node.js
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB

### Ferramentas
- **ESLint** - Linting de código
- **Git** - Controle de versão

## 🚀 Instalação

### Pré-requisitos
- Node.js (versão 18 ou superior)
- MongoDB (local ou Atlas)
- npm, yarn, pnpm ou bun

### Passos de Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd movies
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
```

4. **Configure o MongoDB**
```bash
# No arquivo .env.local
MONGODB_URI=mongodb://localhost:27017/cineverse
# ou para MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cineverse
```

5. **Execute o servidor de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

6. **Acesse a aplicação**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/cineverse

# Next.js
NEXT_PUBLIC_API_URL=http://localhost:3000

# Opcional: Para produção
NODE_ENV=production
PORT=3000
```

### Estrutura do Banco de Dados

O modelo `Movie` possui os seguintes campos:

```typescript
interface Movie {
  _id: string;           // ID único do MongoDB
  title: string;         // Título do filme
  year: Date;           // Ano de lançamento
  gender: string;        // Gênero do filme
  watched: boolean;     // Status de assistido
  rating: number;       // Avaliação (0-5)
  createdAt: Date;      // Data de criação
}
```

## 📁 Estrutura do Projeto

```
movies/
├── src/
│   ├── app/                    # App Router do Next.js
│   │   ├── movie/             # Páginas relacionadas a filmes
│   │   │   ├── [id]/          # Página individual do filme
│   │   │   ├── new/           # Página de criação
│   │   │   └── page.tsx       # Lista principal de filmes
│   │   ├── layout.tsx         # Layout principal
│   │   └── page.tsx           # Página inicial
│   ├── components/            # Componentes React
│   │   ├── AllMovies.tsx      # Componente para todos os filmes
│   │   ├── WatchedMovies.tsx  # Componente para filmes assistidos
│   │   ├── NotWatchedMovies.tsx # Componente para não assistidos
│   │   ├── MoviesByRating.tsx # Componente ordenado por rating
│   │   ├── StarRating.tsx     # Componente de avaliação
│   │   └── Navbar.tsx         # Barra de navegação
│   ├── context/               # Context API do React
│   │   └── useMovie.tsx       # Contexto global de filmes
│   ├── services/              # Serviços de API
│   │   └── api.tsx            # Funções de comunicação com API
│   └── type/                  # Definições de tipos TypeScript
│       └── index.ts           # Interfaces e tipos
├── server.js                  # Servidor Express.js
├── models/                    # Modelos do Mongoose
│   └── Movie.js              # Modelo do filme
├── config/                    # Configurações
│   └── dbConnect.js          # Conexão com MongoDB
└── package.json              # Dependências e scripts
```

## 🔌 API Endpoints

### Filmes

| Método | Endpoint | Descrição | Parâmetros |
|--------|----------|-----------|------------|
| `GET` | `/api/movies` | Lista todos os filmes | `?watched=true/false&sortBy=rating&order=desc` |
| `GET` | `/api/movie/:id` | Busca filme específico | `id` (string) |
| `POST` | `/api/movie` | Cria novo filme | Body: `{title, year, gender, watched, rating}` |
| `PUT` | `/api/movie/:id` | Atualiza filme | `id` (string) + Body |
| `DELETE` | `/api/movies/:id` | Deleta filme | `id` (string) |

### Exemplos de Uso

**Buscar todos os filmes:**
```bash
GET /api/movies
```

**Buscar apenas filmes assistidos:**
```bash
GET /api/movies?watched=true
```

**Buscar filmes ordenados por rating:**
```bash
GET /api/movies?sortBy=rating&order=desc
```

**Criar novo filme:**
```bash
POST /api/movie
Content-Type: application/json

{
  "title": "Inception",
  "year": "2010-07-16T00:00:00.000Z",
  "gender": "Ficção Científica",
  "watched": true,
  "rating": 5
}
```

## 🧩 Componentes

### AllMovies
- **Função**: Exibe todos os filmes da coleção
- **Endpoint**: `GET /api/movies`
- **Características**: Botões de editar/deletar, indicadores de status

### WatchedMovies
- **Função**: Exibe apenas filmes assistidos
- **Endpoint**: `GET /api/movies?watched=true`
- **Características**: Borda verde, badge "Assistido"

### NotWatchedMovies
- **Função**: Exibe apenas filmes não assistidos
- **Endpoint**: `GET /api/movies?watched=false`
- **Características**: Borda laranja, badge "Para Assistir"

### MoviesByRating
- **Função**: Exibe filmes ordenados por rating
- **Endpoint**: `GET /api/movies?sortBy=rating&order=desc`
- **Características**: Bordas coloridas por rating, ordenação visual

### StarRating
- **Função**: Componente de avaliação com estrelas
- **Características**: Interativo, hover effects, tamanhos configuráveis

## 📖 Como Usar

### 1. Visualizar Filmes
- Acesse a página principal em `/movie`
- Use os botões de navegação para alternar entre visualizações:
  - **Todos**: Todos os filmes
  - **Assistidos**: Apenas filmes assistidos
  - **Para Assistir**: Apenas não assistidos
  - **Por Rating**: Ordenados por avaliação

### 2. Adicionar Filme
- Clique no botão "Adicionar Filme" na navbar
- Preencha o formulário com:
  - Título (obrigatório)
  - Ano de lançamento (obrigatório)
  - Gênero (obrigatório)
  - Status de assistido (opcional)
  - Avaliação (se assistido)

### 3. Editar Filme
- Clique no ícone de edição em qualquer filme
- Será redirecionado para a página de detalhes
- Use os controles na seção "Controles" para:
  - Marcar/desmarcar como assistido
  - Alterar avaliação com estrelas

### 4. Deletar Filme
- Clique no ícone de lixeira em qualquer filme
- Confirme a ação no modal de confirmação

### 5. Avaliar Filmes
- Marque o filme como assistido
- Use o componente de estrelas para avaliar (1-5)
- A avaliação será salva automaticamente

## 🛠 Desenvolvimento

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Cria build de produção
npm run start        # Inicia servidor de produção

# Linting
npm run lint         # Executa ESLint
npm run lint:fix     # Corrige problemas de linting automaticamente
```

### Adicionando Novos Gêneros

Para adicionar novos gêneros de filmes, edite o arquivo `src/app/movie/new/page.tsx`:

```typescript
<option value="Novo Gênero">Novo Gênero</option>
```

### Personalizando Cores

As cores do tema podem ser alteradas no arquivo `tailwind.config.js` ou diretamente nos componentes usando classes Tailwind.

### Adicionando Novos Campos

1. **Atualize o modelo** (`models/Movie.js`)
2. **Atualize a interface TypeScript** (`src/type/index.ts`)
3. **Atualize o formulário** (`src/app/movie/new/page.tsx`)
4. **Atualize os componentes** de exibição

## 🚀 Deploy

### Deploy no Vercel (Recomendado)

1. **Conecte seu repositório ao Vercel**
2. **Configure as variáveis de ambiente**:
   - `MONGODB_URI`: Sua string de conexão MongoDB
   - `NODE_ENV`: `production`

3. **Deploy automático**: O Vercel fará deploy automaticamente a cada push

### Deploy Manual

1. **Build da aplicação**:
```bash
npm run build
```

2. **Configure servidor de produção**:
```bash
npm run start
```

### Deploy do MongoDB

**Opção 1: MongoDB Atlas (Recomendado)**
- Crie uma conta gratuita no [MongoDB Atlas](https://www.mongodb.com/atlas)
- Configure um cluster gratuito
- Obtenha a string de conexão

**Opção 2: MongoDB Local**
- Instale MongoDB localmente
- Configure a string de conexão: `mongodb://localhost:27017/cineverse`

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique a [documentação](#documentação)
2. Procure por [issues existentes](../../issues)
3. Crie uma [nova issue](../../issues/new)

## 🎉 Agradecimentos

- [Next.js](https://nextjs.org/) - Framework React
- [Express.js](https://expressjs.com/) - Framework Node.js
- [MongoDB](https://www.mongodb.com/) - Banco de dados
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Framer Motion](https://www.framer.com/motion/) - Animações
- [Lucide](https://lucide.dev/) - Ícones

---

**Desenvolvido com ❤️ para organizar sua coleção cinematográfica**