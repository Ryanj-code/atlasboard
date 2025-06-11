# AtlasBoard

## About

AtlasBoard is a full-stack web app that helps users manage tasks and projects collaboratively using boards and tasks. Inspired by tools like Trello and Notion, AtlasBoard emphasizes clarity, real-time collaboration, and ownership.

## Features

- Authentication with JWT (Login / Signup)
- Board & Task Management
- Member Roles (Owner, Editor, Viewer)
- Task Assignment + Due Dates
- Real-time Subscriptions for tasks
- Board search and filtering
- Full GraphQL API (codegen-supported)

## Tech Stack

**Frontend**

- React (with TypeScript)
- Tailwind CSS
- Apollo Client (GraphQL)
- Vite

**Backend**

- Node.js (TypeScript)
- GraphQL (with Apollo Server)
- Prisma ORM
- PostgreSQL
- JWT-based Authentication
- WebSockets (GraphQL Subscriptions via `graphql-ws`)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ryanj-code/atlasboard.git
cd atlasboard
```

### 2. Install Dependencies

#### Frontend:

```bash
cd frontend
npm install
```

#### Backend:

```bash
cd ../backend
npm install
```

### 3. Environment Setup

Create a `.env` file in the `backend` directory

```bash
DATABASE_URL=postgresql://<your-database-url>
JWT_SECRET_KEY=your_jwt_secret
REFRESH_SECRET_KEY=your_refresh_token_secret
```

Create a `.env` file in the `frontend` directory

```bash
VITE_GRAPHQL_URI=http://localhost:4000/graphql
VITE_GRAPHQL_WS_URI=ws://localhost:4000/graphql
```

### 4. Prisma Migration & Generation

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. GraphQL Code Generation

In the `backend` directory:

```bash
npm run generate:schema
```

In the `frontend` directory:

```bash
npm run generate
```

### 6. Run Development Servers

#### Backend:

```bash
cd ../backend
npm run dev
```

#### Frontend (in separate terminal):

```bash
cd frontend
npm run dev
```
