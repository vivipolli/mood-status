# Use the Node.js 18-alpine image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the monorepo's package.json and pnpm-lock.yaml to the working directory
COPY ../../package.json ../../pnpm-lock.yaml ./

COPY ../../packages/database/package.json /app/packages/database/package.json

# Install pnpm globally
RUN npm install -g pnpm

# Copy all files from the monorepo to the container
COPY ../../ .

# Install all dependencies
RUN pnpm install

RUN npx prisma generate --schema=packages/database/prisma/schema.prisma

# Expose the port the app runs on
EXPOSE 3333

# Start the NestJS server in development mode
CMD ["pnpm", "dev", "--filter=api"]
