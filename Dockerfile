FROM node:18-alpine as builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json backend/package.json
COPY frontend/package.json frontend/package.json
COPY packages/types/package.json packages/types/package.json
COPY backend/prisma ./backend/prisma/

RUN pnpm add typescript -w -D
RUN pnpm add prisma -w -D
RUN pnpm install --frozen-lockfile --prod

COPY . .

RUN pnpm run build:prisma
RUN pnpm run build

FROM node:18-alpine as runner

# Build files
COPY --from=builder /app/backend/dist /app/backend/dist
COPY --from=builder /app/frontend/dist /app/frontend/dist

# Node modules
COPY --from=builder /app/backend/node_modules /app/backend/node_modules
COPY --from=builder /app/frontend/node_modules /app/frontend/node_modules
COPY --from=builder /app/node_modules /app/node_modules

# Assets
COPY --from=builder /app/backend/prisma /app/backend/prisma
COPY --from=builder /app/backend/public /app/backend/public

EXPOSE $PORT

CMD [ "node", "./app/backend/dist/app.js" ]