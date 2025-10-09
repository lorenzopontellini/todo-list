# mio-todo-api

Template CRUD API with Node.js + TypeScript + Express + Prisma + SQLite
- Authentication: JWT
- Validation: Zod
- ORM: Prisma
- Swagger: automatic docs via swagger-jsdoc + swagger-ui-express
- Tests: Jest + Supertest

## Quick start
1. Copy `.env.example` to `.env` and set `JWT_SECRET`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Generate Prisma client & migrate:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
4. Start in development:
   ```bash
   npm run dev
   ```
5. Open Swagger UI: http://localhost:3000/api-docs

## Test
```bash
npm test
```

## Notes
- The project uses SQLite by default for simplicity. To use Postgres, change `DATABASE_URL` in `.env` and update `prisma/schema.prisma` datasource.
- See `src` for code structure.
