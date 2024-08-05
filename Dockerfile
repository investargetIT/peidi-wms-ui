FROM node:20-slim
RUN corepack enable
WORKDIR /app
COPY . .
RUN pnpm config set store-dir /root/.local/share/pnpm/store/v3 --global
RUN pnpm install
RUN pnpm run build:icons
EXPOSE 5173
CMD pnpm run dev --host 0.0.0.0
