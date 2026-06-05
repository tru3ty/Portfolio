# syntax=docker/dockerfile:1

# ── Builder: собираем статику через Next static export (output: 'export') ──
FROM oven/bun:1 AS builder
WORKDIR /app

# Сначала только манифесты — кэшируем слой зависимостей.
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Затем исходники и сборка → out/
COPY . .
RUN bun run build

# ── Runner: раздаём статику Caddy-ем (ноль Node в рантайме) ──
FROM caddy:2-alpine AS runner

# Свой конфиг (SPA-роутинг, zstd/gzip, кэш ассетов)
COPY Caddyfile /etc/caddy/Caddyfile

# Статический экспорт из builder
COPY --from=builder /app/out /srv

EXPOSE 80

# Проверка живости для Dokploy/оркестратора
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/ >/dev/null 2>&1 || exit 1

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
