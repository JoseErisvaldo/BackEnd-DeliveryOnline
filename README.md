# NestJS + TypeORM + Postgres + Docker (JWT Auth)

Minimal scaffold that includes:
- NestJS (minimal)
- TypeORM configured for Postgres
- Docker & docker-compose
- JWT authentication (login + protected route)
- Users table with hashed passwords

Usage:
1. Copy `.env.example` to `.env` and adjust variables.
2. `docker-compose up --build` to run Postgres and the app.
3. The app listens on port 3000.

Endpoints:
- POST /auth/register  -> register a new user
- POST /auth/login     -> login and get JWT
- GET /users/profile   -> protected route (requires Authorization: Bearer <token>)
