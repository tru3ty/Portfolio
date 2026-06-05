import type { Metadata, Viewport } from 'next';
import { Syne, DM_Mono, Space_Grotesk, JetBrains_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';

// Шрифты через next/font — self-hosted, без запроса к Google на рантайме,
// без CLS. Каждый экспортит CSS-переменную, на которую ссылаются токены
// --font-* в globals.css (data-fontpair переключает их).
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
  subsets: ['latin'],
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

const fontVars = [
  syne.variable,
  dmMono.variable,
  spaceGrotesk.variable,
  jetbrainsMono.variable,
  instrumentSerif.variable,
].join(' ');

export const metadata: Metadata = {
  title: 'Portfolio — Fullstack Developer',
  description:
    'Fullstack-разработчик: React, Next.js, NestJS, TypeScript. Проекты в продакшене, DevOps и быстрый онбординг в новый стек.',
  openGraph: {
    title: 'Portfolio — Fullstack Developer',
    description: 'Fullstack-разработчик: React, Next.js, NestJS, TypeScript.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

// Применяет сохранённые настройки (тема/акцент/шрифт/язык) ДО первой отрисовки,
// чтобы не было вспышки светлой темы и mismatch при гидрации.
const themeInitScript = `
(function () {
  try {
    var d = document.documentElement;
    var ls = localStorage;
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var motion = ls.getItem('motion');
    d.setAttribute('data-theme', ls.getItem('theme') || 'light');
    d.setAttribute('data-accent', ls.getItem('accent') || 'orange');
    d.setAttribute('data-fontpair', ls.getItem('fontPair') || 'syne');
    d.setAttribute('data-motion', (motion ? motion === 'on' : !prefersReduced) ? 'on' : 'off');
    d.setAttribute('lang', ls.getItem('lang') || 'ru');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ru"
      data-theme="light"
      data-accent="orange"
      data-fontpair="syne"
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
