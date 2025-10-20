# --- FASE DI BUILD ---
FROM node:20-bullseye-slim AS builder

WORKDIR /app

COPY package*.json ./
ENV NODE_ENV=development
RUN npm ci

COPY . .
RUN npm run prisma:generate
RUN npm run build

# --- FASE DI RUNTIME ---
FROM node:20-bullseye-slim AS runner

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env ./.env

RUN npx prisma generate

EXPOSE 4000

CMD ["node", "dist/server.js"]
