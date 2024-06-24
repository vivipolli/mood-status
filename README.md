# Metalab Fullstack Engineer Take-Home Assignment

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js (version 18)](https://nodejs.org/en/download/)
- [pnpm](https://pnpm.io/installation)
- [PostgresSQL](https://www.postgresql.org/)

## Project Structure
```bash
/metalab
  /apps
    /api
      Dockerfile
      ...
    /web
      Dockerfile
      ...
  /packages
    /database
      prisma
  docker-compose.yml
  package.json
  pnpm-lock.yaml
  turbo.json
  pnpm-workspace.yaml
```

## Running the Project
### Using Docker Compose
1. Make sure you don't have another postgres service running stoping the service:
```sh
sudo service postgresql stop
```
2. Build and run the Docker containers:
```sh
docker compose up --build
```

Obs:
This command will build and start the following services:

- `@repo/db:`: PostgreSQL database service
- `api`: NestJS backend service
- `web`: Next.js frontend service

### Local Setup and Installation (Turbo)
1. Install dependencies (root):
```sh
pnpm install
```

2. Inside packages/database/.env, change the DATABASE_URL to use locally:
```sh
DATABASE_URL="postgresql://admin:mypassword@localhost:5432/mood?schema=public"
```

3. Create database and user:
```
sudo -u postgres psql
```

```sql
CREATE DATABASE mood;
CREATE USER admin WITH PASSWORD 'mypassword';
GRANT ALL PRIVILEGES ON DATABASE mood TO admin;
```

4. Generate Prisma client and start the development server:
```sh
turbo run db:push --filter=@repo/db && turbo run db:generate --filter=@repo/db &&
turbo dev"
```

### Accessing the Services
- **Frontend (Next.js)**: http://localhost:3000
- **Backend (NestJS)**: http://localhost:3333

### Environment Variables
Ensure you have the following environment variables set.  
You can create a .env file in the packages/database directory for this purpose.
```sh
DATABASE_URL=postgresql://admin:mypassword@postgres:5432/mood
```

Also in the apps/web
```sh
NEXT_PUBLIC_API_HOST=http://localhost:3333
```




