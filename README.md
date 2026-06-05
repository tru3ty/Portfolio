# tru3ty / portfolio

Персональное портфолио фуллстек-разработчика. Next.js 15 (App Router,
**static export**) + Tailwind v4 + framer-motion + Lenis.

## Локальная разработка

```bash
bun install
bun run dev        # http://localhost:3000
```

Сборка статики:

```bash
bun run build      # → out/ (готовая статика, output: 'export')
```

## Деплой через Docker / Dokploy

Проект — статический экспорт, раздаётся Caddy (ноль Node в рантайме).

Образ multi-stage: `bun` собирает статику → `caddy:alpine` её отдаёт
(SPA-роутинг, zstd/gzip, кэш ассетов — см. `Caddyfile`). HTTPS снаружи
терминирует Traefik (в Dokploy), поэтому Caddy слушает простой `:80`.

По умолчанию compose **не публикует host-порт** (только `expose: 80`) —
это нужно для Dokploy. Для локального запуска раскомментируй блок `ports:`
в `docker-compose.yml`, затем:

```bash
docker compose up -d --build      # → http://localhost:8080
```

### Dokploy

1. Создай **Compose**-приложение, укажи репозиторий.
2. Dokploy подхватит `docker-compose.yml` (сервис `web`, контейнер слушает `:80`).
3. Домен и HTTPS навесь через встроенный Traefik — он ходит к контейнеру по
   внутренней сети на `:80`. **Не публикуй host-порт** в compose: иначе будет
   конфликт `Bind for 0.0.0.0:3000 failed: port is already allocated`.

Настройки оформления (акцент, шрифты, motion) захардкожены в
`src/AppContext.tsx`; пользователю доступны переключатели темы и языка в шапке.
