FROM node:18-alpine

WORKDIR /app
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY apps/api/package.json ./apps/api/package.json

COPY packages/database/package.json ./packages/database/package.json

RUN npm install -g pnpm

COPY . .
RUN pnpm install --filter api...
RUN pnpm run build

EXPOSE 3333
CMD ["pnpm", "dev", "--filter=api"]
