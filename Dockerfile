FROM node:18

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/package.json backend/package.json
COPY frontend/package.json frontend/package.json

RUN pnpm add typescript -w -D
RUN pnpm install --frozen-lockfile --prod

COPY . .

RUN pnpm run build

EXPOSE $PORT

CMD [ "pnpm", "run", "start:prod" ]