# IFFA HUB CMS

A full-stack Content Management System (CMS) for IFFA HUB built with Node.js, Express, TypeScript, PostgreSQL, and Redis.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [API Documentation](#api-documentation)
- [Development](#development)
- [License](#license)

## ✨ Features

- **Authentication & Authorization**: Session-based authentication with Passport.js and Google OAuth 2.0
- **User Management**: Complete user CRUD operations
- **Secure Sessions**: Redis-backed session management
- **Type Safety**: Full TypeScript implementation
- **Database ORM**: Drizzle ORM for type-safe database queries
- **Validation**: Request validation using Zod
- **Security**: Helmet.js for security headers, bcrypt for password hashing
- **Error Handling**: Centralized error handling middleware

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5.x
- **Language**: TypeScript
- **Database**: PostgreSQL 15
- **ORM**: Drizzle ORM
- **Cache/Session Store**: Redis 7
- **Authentication**: Passport.js (Google OAuth 2.0)
- **Validation**: Zod
- **Security**: Helmet.js, bcryptjs
- **Session Management**: express-session with connect-redis

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Development**: Nodemon with ts-node

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Docker](https://www.docker.com/) & Docker Compose
- [Git](https://git-scm.com/)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd iffa-cms
```

### 2. Install dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
npm run backend:install
```

### 3. Set up environment variables

Create environment files in the `backend` directory:

```bash
# Development environment
touch backend/.env.development.local
```

Add the following variables (see [Environment Variables](#environment-variables) section):

```env
PORT=8080
NODE_ENV=development
CLIENT_URL=http://localhost:3000
REDIS_SESSION_NAME=iffa_session
REDIS_SESSION_SECRET=your-secret-key-here
DB_URL=postgresql://admin:admin@localhost:5432/iffa_hub
BCRYPT_SALT_ROUNDS=10
```

### 4. Start Docker services

Start PostgreSQL and Redis containers:

```bash
npm run docker:init
```

This will start:
- PostgreSQL on `localhost:5432`
- Redis on `localhost:6379`

### 5. Push database schema

```bash
npm run db:push
```

### 6. Start the development server

```bash
npm run dev:backend
```

The backend API will be available at `http://localhost:8080`

## 📁 Project Structure

```
iffa-cms/
├── backend/
│   ├── src/
│   │   ├── config/           # Configuration files (env, redis)
│   │   ├── controllers/      # Route controllers
│   │   ├── drizzle/          # Database connection and schema
│   │   │   └── schema/       # Database schemas
│   │   ├── middlewares/      # Express middlewares
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic
│   │   ├── types/            # TypeScript type definitions
│   │   ├── utils/            # Utility functions
│   │   ├── validators/       # Zod validation schemas
│   │   ├── index.ts          # Application entry point
│   │   └── server.ts         # Express server setup
│   ├── drizzle.config.ts     # Drizzle ORM configuration
│   ├── nodemon.json          # Nodemon configuration
│   ├── tsconfig.json         # TypeScript configuration
│   └── package.json          # Backend dependencies
├── compose.yaml              # Docker Compose configuration
├── package.json              # Root package.json with scripts
└── README.md                 # This file
```

## 📜 Available Scripts

### Root Level

- `npm run backend:install` - Install backend dependencies
- `npm run dev:backend` - Start backend in development mode
- `npm run build:backend` - Build backend for production
- `npm run start:backend` - Start backend in production mode
- `npm run docker:init` - Start Docker containers (PostgreSQL & Redis)
- `npm run db:push` - Push database schema to PostgreSQL

### Backend Level (from backend directory)

- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run db:generate` - Generate Drizzle migrations
- `npm run db:migrate` - Run Drizzle migrations
- `npm run db:push` - Push schema changes to database

## 🔐 Environment Variables

Create a `.env.development.local` file in the `backend` directory with the following variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `8080` |
| `NODE_ENV` | Environment mode | `development`, `production`, or `test` |
| `CLIENT_URL` | Frontend URL | `http://localhost:3000` |
| `REDIS_SESSION_NAME` | Redis session name | `iffa_session` |
| `REDIS_SESSION_SECRET` | Secret for session encryption | `your-secret-key` |
| `DB_URL` | PostgreSQL connection URL | `postgresql://admin:admin@localhost:5432/iffa_hub` |
| `BCRYPT_SALT_ROUNDS` | Number of salt rounds for bcrypt | `10` |

## 🗄 Database

The project uses PostgreSQL 15 with Drizzle ORM for database operations.

### Running Migrations

```bash
# Generate migration files
npm run db:generate

# Run migrations
npm run db:migrate

# Or push schema directly (development)
npm run db:push
```

### Database Schema

The database schema is defined in `backend/src/drizzle/schema/` directory using Drizzle ORM.

## 📚 API Documentation

### Authentication Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with credentials
- `POST /api/auth/logout` - Logout current user

### User Routes

- `GET /api/users` - Get all users (protected)

## 💻 Development

### Code Structure

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic
- **Middlewares**: Authentication, validation, error handling
- **Validators**: Zod schemas for request validation
- **Utils**: Helper functions and utilities

### Adding New Features

1. Define the database schema in `backend/src/drizzle/schema/`
2. Create validation schemas in `backend/src/validators/`
3. Implement business logic in `backend/src/services/`
4. Create controllers in `backend/src/controllers/`
5. Define routes in `backend/src/routes/`
6. Register routes in `backend/src/server.ts`

## 🐳 Docker Services

The `compose.yaml` file defines the following services:

- **PostgreSQL**: Database service running on port 5432
- **Redis**: Cache and session store running on port 6379

Both services include persistent volumes for data storage.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

---

**Note**: This project is part of the IFFA HUB internship program.

