import type { Metadata, Viewport } from 'next';
import {
  Syne,
  DM_Mono,
  Space_Grotesk,
  JetBrains_Mono,
  Instrument_Serif,
  Manrope,
} from 'next/font/google';
import './globals.css';

// Шрифты через next/font — self-hosted, без запроса к Google на рантайме,
// без CLS. Каждый экспортит CSS-переменную, на которую ссылаются токены
// --font-* в globals.css (data-fontpair переключает их).
//
// ВАЖНО про кириллицу: Syne / DM Mono / Space Grotesk / Instrument Serif НЕ
// содержат кириллицу. Чтобы русский текст не падал на системный fallback
// (отсюда был «сломанный» вид RU и разнобой с латинскими вставками), для
// кириллицы подключаем Manrope (display/body) и JetBrains Mono (mono) с
// subset 'cyrillic' и ставим их СЛЕДУЮЩИМИ в font-family — браузер берёт их
// для тех глифов, которых нет в основном латинском шрифте.
const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});
const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-dm-mono',
  display: 'swap',
});
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});
// Кириллический «двойник» для display/body — близок по характеру к Syne/Grotesk.
const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

const fontVars = [
  syne.variable,
  dmMono.variable,
  spaceGrotesk.variable,
  jetbrainsMono.variable,
  instrumentSerif.variable,
  manrope.variable,
].join(' ');

export const metadata: Metadata = {
  // Базовый URL — чтобы og:image / иконки резолвились в абсолютные ссылки.
  metadataBase: new URL('https://tru3ty.ru'),
  title: 'Ruslan Rogatkin — Fullstack Developer',
  description:
    'Fullstack-разработчик: React, Next.js, NestJS, TypeScript. Проекты в продакшене, DevOps и быстрый онбординг в новый стек.',
  openGraph: {
    title: 'Ruslan Rogatkin — Fullstack Developer',
    description: 'Fullstack-разработчик: React, Next.js, NestJS, TypeScript. Проекты в продакшене.',
    type: 'website',
    locale: 'ru_RU',
    url: '/',
    siteName: 'tru3ty / portfolio',
    // app/opengraph-image.png подхватывается Next автоматически.
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ruslan Rogatkin — Fullstack Developer',
    description: 'Fullstack-разработчик: React, Next.js, NestJS, TypeScript.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // cover нужен, чтобы заработали env(safe-area-inset-*) — иначе на iOS
  // фикс-шапка наезжает под вырез/браузерный бар во встроенных webview.
  viewportFit: 'cover',
};

// Применяет сохранённые тему/язык ДО первой отрисовки, чтобы не было вспышки
// и mismatch при гидрации. Акцент/шрифт/motion фиксированы в разметке html.
const themeInitScript = `
(function () {
  try {
    var d = document.documentElement;
    var ls = localStorage;
    d.setAttribute('data-theme', ls.getItem('theme') || 'dark');
    d.setAttribute('lang', ls.getItem('lang') || 'ru');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ru"
      data-theme="dark"
      data-accent="orange"
      data-fontpair="grotesk"
      data-motion="on"
      className={fontVars}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
