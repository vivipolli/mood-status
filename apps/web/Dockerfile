# Use the Node.js 18-alpine image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the monorepo's package.json and pnpm-lock.yaml to the working directory
COPY ../../package.json ../../pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Copy all files from the monorepo to the container
COPY ../../ .

# Install all dependencies
RUN pnpm install

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js server in development mode
CMD ["pnpm", "dev", "--filter=web"]
