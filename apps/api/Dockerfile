# Use the Node.js 18-alpine image as the base image
FROM node:18-alpine

WORKDIR /app
COPY ../../package.json ../../pnpm-lock.yaml ./
COPY ../../packages/database/ /app/packages/database/

RUN npm install -g pnpm

COPY ../../ .
RUN pnpm install

EXPOSE 3333
CMD ["pnpm", "dev", "--filter=api"]
