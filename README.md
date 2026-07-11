# 🏟️ Quadra Livre — Sistema de Agendamento de Quadras Esportivas

Projeto desenvolvido para o desafio **DFS-2026.2** do curso **Desenvolvimento Full Stack Básico**, Atlântico Avanti.

Aplicação web completa para cadastro de jogadores, quadras esportivas e reservas de horário, com verificação automática de conflitos de agendamento.

---

## 📋 Índice

- [Objetivo](#-objetivo)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Estrutura de pastas](#-estrutura-de-pastas)
- [Como instalar e executar](#-como-instalar-e-executar)
- [Exemplos de rotas da API](#-exemplos-de-rotas-da-api)
- [Regra de negócio: conflito de horário](#-regra-de-negócio-conflito-de-horário)
- [Prints da aplicação](#-prints-da-aplicação)
- [Equipe](#-equipe)

---

## 🎯 Objetivo

Em muitas quadras esportivas de bairros, escolas e condomínios, a reserva de horários ainda é feita de forma desorganizada — cadernos, grupos de mensagens, ordem de chegada. Isso gera conflitos de horário e dificulta a visualização da disponibilidade.

O **Quadra Livre** resolve isso permitindo:
- Cadastro de jogadores e quadras esportivas.
- Criação de reservas de horário, com **bloqueio automático de conflitos**.
- Consulta da agenda por quadra e por data, com visualização clara de horários livres/ocupados.

---

## ✅ Funcionalidades

- [x] CRUD completo de Jogadores
- [x] CRUD completo de Quadras
- [x] CRUD completo de Reservas
- [x] Verificação de conflito de horário (mesma quadra + data + horário sobreposto → bloqueado)
- [x] Consulta de agenda por quadra
- [x] Consulta de agenda por data
- [x] Filtros por data, quadra e modalidade esportiva
- [x] Dashboard com indicadores (jogadores, quadras, reservas, agenda do dia)
- [x] Landing page institucional
- [x] Toasts de sucesso/erro, loading states, confirmação antes de excluir

---

## 🛠 Tecnologias utilizadas

### Backend
- [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/) — API REST
- [Prisma ORM](https://www.prisma.io/) — modelagem e acesso ao banco de dados
- [PostgreSQL](https://www.postgresql.org/) — banco de dados relacional
- [express-validator](https://express-validator.github.io/) — validação de payloads
- Arquitetura em camadas: **Controller → Service → Repository**

### Frontend
- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/) — roteamento
- [Axios](https://axios-http.com/) — consumo da API
- CSS Modules — estilização isolada por componente

---

## 🏗 Arquitetura

```
┌─────────────────┐       HTTPS/JSON       ┌──────────────────┐       SQL       ┌─────────────┐
│  Frontend        │ ───────────────────▶  │  Backend         │ ─────────────▶ │             │
│  React + Vite    │                        │  Node + Express  │                 │ PostgreSQL  │
│                  │ ◀───────────────────   │  Prisma ORM      │ ◀───────────── │             │
└─────────────────┘        Axios           └──────────────────┘                 └─────────────┘
```

O backend segue uma arquitetura em 4 camadas:

```
Requisição HTTP → Controller → Service → Repository → Prisma → PostgreSQL
```

- **Controller**: recebe a requisição, delega ao Service, formata a resposta.
- **Service**: concentra as regras de negócio (ex.: verificação de conflito de horário).
- **Repository**: isola o acesso ao Prisma/banco de dados.

### Modelo de dados

```
Player (1) ──< Reservation >── (1) Court

Player:      id, name, email (único), phone, createdAt, updatedAt
Court:       id, name, sport (enum), location, createdAt, updatedAt
Reservation: id, playerId, courtId, date, startTime, endTime, createdAt, updatedAt
```

---

## 📁 Estrutura de pastas

```
quadras-esportivas/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/          # instância do Prisma Client
│   │   ├── controllers/     # camada HTTP
│   │   ├── services/        # regras de negócio
│   │   ├── repositories/    # acesso a dados
│   │   ├── routes/          # definição de rotas + validação
│   │   ├── middlewares/     # validação, tratamento de erros
│   │   ├── utils/           # ApiError, asyncHandler, httpResponse
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── layout/          # Navbar, Footer
    │   │   ├── common/          # Button, Modal, Loading, ConfirmDialog, Field
    │   │   ├── players/         # PlayerForm
    │   │   ├── courts/          # CourtForm
    │   │   └── reservations/    # ReservationForm, ReservationCard
    │   ├── pages/                # Landing, Dashboard, Jogadores, Quadras, Reservas, Agenda
    │   ├── services/              # Axios + services por entidade
    │   ├── hooks/                  # useToast
    │   ├── routes/                 # AppRoutes (React Router)
    │   └── styles/                  # tokens.css, global.css
    ├── .env.example
    └── package.json
```

---

## 🚀 Como instalar e executar

### Pré-requisitos
- [Node.js](https://nodejs.org/) 18+
- [PostgreSQL](https://www.postgresql.org/download/) instalado e rodando localmente

### 1. Clonar o repositório
```bash
git clone <url-do-repositorio>
cd quadras-esportivas
```

### 2. Configurar o banco de dados PostgreSQL
Crie um banco de dados (via `psql`, pgAdmin ou terminal):
```sql
CREATE DATABASE quadras_esportivas;
```

### 3. Configurar e rodar o Backend
```bash
cd backend
cp .env.example .env
```
Edite o `.env` com sua conexão real:
```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/quadras_esportivas?schema=public"
PORT=3333
NODE_ENV=development
```
Instale as dependências e rode as migrations:
```bash
npm install
npx prisma migrate dev --name init
npm run dev
```
A API estará em `http://localhost:3333`. Teste com `http://localhost:3333/api/health`.

### 4. Configurar e rodar o Frontend
Em um **novo terminal**:
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
A aplicação estará em `http://localhost:5173`.

> ⚠️ Backend e frontend precisam estar rodando **ao mesmo tempo**, em terminais separados.

### Scripts disponíveis

**Backend** (`backend/package.json`):
| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia com hot-reload (nodemon) |
| `npm start` | Inicia em modo produção |
| `npm run prisma:migrate` | Roda migrations |
| `npm run prisma:studio` | Abre o Prisma Studio (interface visual do banco) |

**Frontend** (`frontend/package.json`):
| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run preview` | Serve o build de produção localmente |

---

## 🔌 Exemplos de rotas da API

### Jogadores
```http
GET    /api/players
GET    /api/players/:id
POST   /api/players
PUT    /api/players/:id
DELETE /api/players/:id
```

**Criar jogador:**
```bash
curl -X POST http://localhost:3333/api/players \
  -H "Content-Type: application/json" \
  -d '{"name":"Fernanda Ávila","email":"fernanda@exemplo.com","phone":"81999999999"}'
```

### Quadras
```http
GET    /api/courts
GET    /api/courts/:id
POST   /api/courts
PUT    /api/courts/:id
DELETE /api/courts/:id
```

**Criar quadra:**
```bash
curl -X POST http://localhost:3333/api/courts \
  -H "Content-Type: application/json" \
  -d '{"name":"Quadra 01","sport":"FUTSAL","location":"Bloco A"}'
```
> Valores válidos para `sport`: `SOCCER`, `FUTSAL`, `VOLLEYBALL`, `BASKETBALL`, `TENNIS`, `BEACH_TENNIS`, `OTHER`.

### Reservas
```http
GET    /api/reservations                    (aceita ?courtId= e/ou ?date=)
GET    /api/reservations/:id
GET    /api/reservations/court/:courtId       # agenda de uma quadra
GET    /api/reservations/date/:date           # agenda de um dia
POST   /api/reservations
PUT    /api/reservations/:id
DELETE /api/reservations/:id
```

**Criar reserva:**
```bash
curl -X POST http://localhost:3333/api/reservations \
  -H "Content-Type: application/json" \
  -d '{"playerId":"<uuid>","courtId":"<uuid>","date":"2026-08-01","startTime":"10:00","endTime":"11:00"}'
```

**Resposta de sucesso:**
```json
{
  "success": true,
  "message": "Reserva criada com sucesso.",
  "data": { "id": "...", "date": "2026-08-01", "startTime": "10:00", "endTime": "11:00", "player": {...}, "court": {...} }
}
```

**Resposta de conflito (409):**
```json
{
  "success": false,
  "error": {
    "code": "RESERVATION_CONFLICT",
    "message": "Já existe uma reserva para a quadra \"Quadra 01\" em 2026-08-01 que sobrepõe o horário 10:00–11:00."
  }
}
```

---

## ⚔️ Regra de negócio: conflito de horário

Antes de criar ou editar uma reserva, o sistema verifica se já existe uma reserva na **mesma quadra**, **mesma data**, com **horário sobreposto**:

```
Existe conflito quando:
   reservaExistente.startTime < novaReserva.endTime
   E
   reservaExistente.endTime   > novaReserva.startTime
```

Essa fórmula cobre os três cenários possíveis de sobreposição — início no meio de uma reserva existente, fim no meio, ou uma reserva "engolindo" outra inteira. Se houver conflito, a API responde com **HTTP 409** e uma mensagem explicando qual quadra/data/horário está em conflito. O frontend exibe essa mensagem diretamente no formulário de reserva.

---

## 📸 Prints da aplicação

> Adicione aqui os prints da aplicação em funcionamento (Landing Page, Dashboard, Jogadores, Quadras, Reservas, Agenda e o bloqueio de conflito de horário).

| Landing Page | Dashboard |
|---|---|
| _print aqui_ | _print aqui_ |

| Reservas (conflito de horário) | Agenda |
|---|---|
| _print aqui_ | _print aqui_ |

---

# 🏟️ Quadra Livre — Sistema de Agendamento de Quadras Esportivas

Projeto desenvolvido para o desafio **DFS-2026.2** do curso **Desenvolvimento Full Stack Básico**, Atlântico Avanti.

Aplicação web completa para cadastro de jogadores, quadras esportivas e reservas de horário, com verificação automática de conflitos de agendamento.

---

## 📋 Índice

- [Objetivo](#-objetivo)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Estrutura de pastas](#-estrutura-de-pastas)
- [Como instalar e executar](#-como-instalar-e-executar)
- [Exemplos de rotas da API](#-exemplos-de-rotas-da-api)
- [Regra de negócio: conflito de horário](#-regra-de-negócio-conflito-de-horário)
- [Prints da aplicação](#-prints-da-aplicação)
- [Equipe](#-equipe)

---

## 🎯 Objetivo

Em muitas quadras esportivas de bairros, escolas e condomínios, a reserva de horários ainda é feita de forma desorganizada — cadernos, grupos de mensagens, ordem de chegada. Isso gera conflitos de horário e dificulta a visualização da disponibilidade.

O **Quadra Livre** resolve isso permitindo:
- Cadastro de jogadores e quadras esportivas.
- Criação de reservas de horário, com **bloqueio automático de conflitos**.
- Consulta da agenda por quadra e por data, com visualização clara de horários livres/ocupados.

---

## ✅ Funcionalidades

- [x] CRUD completo de Jogadores
- [x] CRUD completo de Quadras
- [x] CRUD completo de Reservas
- [x] Verificação de conflito de horário (mesma quadra + data + horário sobreposto → bloqueado)
- [x] Consulta de agenda por quadra
- [x] Consulta de agenda por data
- [x] Filtros por data, quadra e modalidade esportiva
- [x] Dashboard com indicadores (jogadores, quadras, reservas, agenda do dia)
- [x] Landing page institucional
- [x] Toasts de sucesso/erro, loading states, confirmação antes de excluir

---

## 🛠 Tecnologias utilizadas

### Backend
- [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/) — API REST
- [Prisma ORM](https://www.prisma.io/) — modelagem e acesso ao banco de dados
- [PostgreSQL](https://www.postgresql.org/) — banco de dados relacional
- [express-validator](https://express-validator.github.io/) — validação de payloads
- Arquitetura em camadas: **Controller → Service → Repository**

### Frontend
- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/) — roteamento
- [Axios](https://axios-http.com/) — consumo da API
- CSS Modules — estilização isolada por componente

---

## 🏗 Arquitetura

```
┌─────────────────┐       HTTPS/JSON       ┌──────────────────┐       SQL       ┌─────────────┐
│  Frontend        │ ───────────────────▶  │  Backend         │ ─────────────▶ │             │
│  React + Vite    │                        │  Node + Express  │                 │ PostgreSQL  │
│                  │ ◀───────────────────   │  Prisma ORM      │ ◀───────────── │             │
└─────────────────┘        Axios           └──────────────────┘                 └─────────────┘
```

O backend segue uma arquitetura em 4 camadas:

```
Requisição HTTP → Controller → Service → Repository → Prisma → PostgreSQL
```

- **Controller**: recebe a requisição, delega ao Service, formata a resposta.
- **Service**: concentra as regras de negócio (ex.: verificação de conflito de horário).
- **Repository**: isola o acesso ao Prisma/banco de dados.

### Modelo de dados

```
Player (1) ──< Reservation >── (1) Court

Player:      id, name, email (único), phone, createdAt, updatedAt
Court:       id, name, sport (enum), location, createdAt, updatedAt
Reservation: id, playerId, courtId, date, startTime, endTime, createdAt, updatedAt
```

---

## 📁 Estrutura de pastas

```
quadras-esportivas/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/          # instância do Prisma Client
│   │   ├── controllers/     # camada HTTP
│   │   ├── services/        # regras de negócio
│   │   ├── repositories/    # acesso a dados
│   │   ├── routes/          # definição de rotas + validação
│   │   ├── middlewares/     # validação, tratamento de erros
│   │   ├── utils/           # ApiError, asyncHandler, httpResponse
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── layout/          # Navbar, Footer
    │   │   ├── common/          # Button, Modal, Loading, ConfirmDialog, Field
    │   │   ├── players/         # PlayerForm
    │   │   ├── courts/          # CourtForm
    │   │   └── reservations/    # ReservationForm, ReservationCard
    │   ├── pages/                # Landing, Dashboard, Jogadores, Quadras, Reservas, Agenda
    │   ├── services/              # Axios + services por entidade
    │   ├── hooks/                  # useToast
    │   ├── routes/                 # AppRoutes (React Router)
    │   └── styles/                  # tokens.css, global.css
    ├── .env.example
    └── package.json
```

---

## 🚀 Como instalar e executar

### Pré-requisitos
- [Node.js](https://nodejs.org/) 18+
- [PostgreSQL](https://www.postgresql.org/download/) instalado e rodando localmente

### 1. Clonar o repositório
```bash
git clone <url-do-repositorio>
cd quadras-esportivas
```

### 2. Configurar o banco de dados PostgreSQL
Crie um banco de dados (via `psql`, pgAdmin ou terminal):
```sql
CREATE DATABASE quadras_esportivas;
```

### 3. Configurar e rodar o Backend
```bash
cd backend
cp .env.example .env
```
Edite o `.env` com sua conexão real:
```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/quadras_esportivas?schema=public"
PORT=3333
NODE_ENV=development
```
Instale as dependências e rode as migrations:
```bash
npm install
npx prisma migrate dev --name init
npm run dev
```
A API estará em `http://localhost:3333`. Teste com `http://localhost:3333/api/health`.

### 4. Configurar e rodar o Frontend
Em um **novo terminal**:
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
A aplicação estará em `http://localhost:5173`.

> ⚠️ Backend e frontend precisam estar rodando **ao mesmo tempo**, em terminais separados.

### Scripts disponíveis

**Backend** (`backend/package.json`):
| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia com hot-reload (nodemon) |
| `npm start` | Inicia em modo produção |
| `npm run prisma:migrate` | Roda migrations |
| `npm run prisma:studio` | Abre o Prisma Studio (interface visual do banco) |

**Frontend** (`frontend/package.json`):
| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run preview` | Serve o build de produção localmente |

---

## 🔌 Exemplos de rotas da API

### Jogadores
```http
GET    /api/players
GET    /api/players/:id
POST   /api/players
PUT    /api/players/:id
DELETE /api/players/:id
```

**Criar jogador:**
```bash
curl -X POST http://localhost:3333/api/players \
  -H "Content-Type: application/json" \
  -d '{"name":"Fernanda Ávila","email":"fernanda@exemplo.com","phone":"81999999999"}'
```

### Quadras
```http
GET    /api/courts
GET    /api/courts/:id
POST   /api/courts
PUT    /api/courts/:id
DELETE /api/courts/:id
```

**Criar quadra:**
```bash
curl -X POST http://localhost:3333/api/courts \
  -H "Content-Type: application/json" \
  -d '{"name":"Quadra 01","sport":"FUTSAL","location":"Bloco A"}'
```
> Valores válidos para `sport`: `SOCCER`, `FUTSAL`, `VOLLEYBALL`, `BASKETBALL`, `TENNIS`, `BEACH_TENNIS`, `OTHER`.

### Reservas
```http
GET    /api/reservations                    (aceita ?courtId= e/ou ?date=)
GET    /api/reservations/:id
GET    /api/reservations/court/:courtId       # agenda de uma quadra
GET    /api/reservations/date/:date           # agenda de um dia
POST   /api/reservations
PUT    /api/reservations/:id
DELETE /api/reservations/:id
```

**Criar reserva:**
```bash
curl -X POST http://localhost:3333/api/reservations \
  -H "Content-Type: application/json" \
  -d '{"playerId":"<uuid>","courtId":"<uuid>","date":"2026-08-01","startTime":"10:00","endTime":"11:00"}'
```

**Resposta de sucesso:**
```json
{
  "success": true,
  "message": "Reserva criada com sucesso.",
  "data": { "id": "...", "date": "2026-08-01", "startTime": "10:00", "endTime": "11:00", "player": {...}, "court": {...} }
}
```

**Resposta de conflito (409):**
```json
{
  "success": false,
  "error": {
    "code": "RESERVATION_CONFLICT",
    "message": "Já existe uma reserva para a quadra \"Quadra 01\" em 2026-08-01 que sobrepõe o horário 10:00–11:00."
  }
}
```

---

## ⚔️ Regra de negócio: conflito de horário

Antes de criar ou editar uma reserva, o sistema verifica se já existe uma reserva na **mesma quadra**, **mesma data**, com **horário sobreposto**:

```
Existe conflito quando:
   reservaExistente.startTime < novaReserva.endTime
   E
   reservaExistente.endTime   > novaReserva.startTime
```

Essa fórmula cobre os três cenários possíveis de sobreposição — início no meio de uma reserva existente, fim no meio, ou uma reserva "engolindo" outra inteira. Se houver conflito, a API responde com **HTTP 409** e uma mensagem explicando qual quadra/data/horário está em conflito. O frontend exibe essa mensagem diretamente no formulário de reserva.

---

## 📸 Prints da aplicação

Os screenshots abaixo ficam salvos na pasta [`/prints`](./prints) deste repositório.

### Landing Page
![Landing Page](./prints/landing-page.png)

### Dashboard
![Dashboard](./prints/dashboard.png)

### Cadastro de Jogadores
![Cadastro de Jogadores](./prints/jogadores.png)

### Cadastro de Quadras
![Cadastro de Quadras](./prints/quadras.png)

### Reservas — bloqueio de conflito de horário
![Conflito de horário](./prints/reservas-conflito-horario.png)

### Agenda — horários livres e ocupados
![Agenda](./prints/agenda.png)


---

## 📄 Licença

Projeto acadêmico desenvolvido para fins educacionais — Atlântico Avanti, DFS-2026.2.
