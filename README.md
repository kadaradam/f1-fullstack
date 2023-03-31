# Formula 1 - Full Stack Application

Using:

-   pnpm monorepo
-   Express
-   React

## Setup repo

Install dependencies:

```bash
pnpm install
```

Go to the backend directory

Genetate prisma client

```bash
npx prisma generate
```

Copy .env.example and create a new .env file

Set your postgres DB url `DATABASE_URL`in the .env

Migrate the database

```bash
npx prisma migrate deploy
```

Seed your db

```bash
npx prisma db seed
```

## Run in development mode

Run the fullstack application in development mode:
URL: http://localhost:5173

```bash
pnpm start
```

## Build the code

Build all packages:

```bash
pnpm run build
```

## Run in production

Run the fullstack application in production mode:

```bash
pnpm start:prod
```

## Clean generated files

```bash
pnpm run clean
```

## Install a new package to a specified workspace (eg.: frontend)

```bash
pnpm add --filter frontend react
```

## Install a new dev package to a specified workspace (eg.: frontend)

```bash
pnpm add --filter frontend typescript -D
```

## Install a shared library to a workspace (eg.: install our types lib to the backend app)

```bash
pnpm add types --filter backend --workspace
```
