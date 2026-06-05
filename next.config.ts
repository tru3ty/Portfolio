import type { NextConfig } from 'next';
import { fileURLToPath } from 'node:url';

const nextConfig: NextConfig = {
  // Статический экспорт: Next пререндерит HTML на этапе сборки.
  // Готовая статика раздаётся с любого CDN — ноль нагрузки на сервер,
  // минимум JS у пользователя. Идеально для одностраничного портфолио.
  output: 'export',
  images: {
    // next/image требует серверного оптимизатора, которого нет при export
    unoptimized: true,
  },
  // Пинаем корень проекта: в домашней папке есть посторонний package-lock.json,
  // из-за которого Next иначе выбирает неверный workspace root.
  outputFileTracingRoot: fileURLToPath(new URL('.', import.meta.url)),
};

export default nextConfig;
