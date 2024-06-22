# Metalab Fullstack Engineer Take-Home Assignment

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Node.js (version 18)](https://nodejs.org/en/download/)
- [pnpm](https://pnpm.io/installation)

## Project Structure
```bash
/metalab-mood-test
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

## Setup and Installation
1. Clone the repository:
```sh
git clone https://github.com/yourusername/metalab.git
cd metalab
```

2. Install dependencies:
```sh
pnpm install
```

3.Generate Prisma client:
```sh
cd packages/database
npx prisma generate
```

### Running the Project
#### Using Docker Compose
1. Build and run the Docker containers:
```sh
docker-compose up --build
```
This command will build and start the following services:

- `postgres`: PostgreSQL database service
- `api`: NestJS backend service
- `web`: Next.js frontend service

#### Running using Turbo
- Start the development server:
```sh
turbo run dev
```
- Build the project:
```sh
turbo run build
```

#### Accessing the Services
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




