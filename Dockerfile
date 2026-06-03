FROM node:22-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable && corepack prepare pnpm@11.5.0 --activate
RUN pnpm install --prod --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["pnpm", "start"]
