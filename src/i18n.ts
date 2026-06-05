import type { Lang } from './types';

export const t = {
  hero: {
    label: { ru: 'Fullstack Developer · Portfolio', en: 'Fullstack Developer · Portfolio' },
    line1: { ru: 'РАЗРА', en: 'FULL' },
    line2: { ru: 'БОТЧИК', en: 'STACK' },
    line3: { ru: 'ПОЛНОГО', en: 'DEVE' },
    line4: { ru: 'ЦИКЛА', en: 'LOPER' },
    sub: {
      ru: 'Беру задачу и довожу до прода — от схемы БД до UI. За два года собрал e-commerce, LMS с видеосвязью и LLM-проверку тестов для МФТИ.',
      en: 'I take a task and ship it — from the DB schema to the UI. In two years I built an e-commerce, an LMS with video calls, and LLM test grading for MIPT.',
    },
    scroll: { ru: 'Скролл вниз', en: 'Scroll down' },
  },
  pills: {
    title: { ru: 'О себе', en: 'About' },
    items: [
      { ru: 'E-commerce с нуля', en: 'E-commerce from scratch' },
      { ru: 'Видеосвязь на LiveKit', en: 'LiveKit video calls' },
      { ru: 'LLM-проверка заданий', en: 'LLM task grading' },
      { ru: 'Платежи: ЮКасса, Т-Банк', en: 'Payments: ЮKassa, T-Bank' },
      { ru: 'Деплой и CI/CD сам', en: 'Own deploy & CI/CD' },
    ],
  },
  stats: [
    { value: '6', label: { ru: 'Проектов в проде', en: 'Projects in production' } },
    { value: '10K+', label: { ru: 'Тестов прошло на ИСТОК', en: 'Tests run on ИСТОК' } },
    { value: '2+', label: { ru: 'Года в коммерческой разработке', en: 'Years in commercial dev' } },
    { value: '4', label: { ru: 'Платёжки и LLM-интеграции', en: 'Payment & LLM integrations' } },
  ],
  sections: {
    timeline: { ru: 'Хронология', en: 'Timeline' },
    stack: { ru: 'Стек', en: 'Stack' },
    projects: { ru: 'Проекты', en: 'Projects' },
    devops: { ru: 'Инфраструктура', en: 'Infrastructure' },
    contact: { ru: 'Связаться', en: 'Get in touch' },
  },
  timelineHint: {
    ru: 'Кликни по году чтобы развернуть',
    en: 'Click a year to expand',
  },
  devops: {
    label: { ru: 'DevOps', en: 'DevOps' },
    title: { ru: 'Сам деплою то, что пишу', en: 'I deploy what I build' },
    desc: {
      ru: 'Docker, VPS на Ubuntu, CI/CD через GitHub Actions. Reverse-proxy и авто-HTTPS на Caddy и Traefik, деплою через Dokploy — этот сайт тоже так.',
      en: 'Docker, Ubuntu VPS, CI/CD via GitHub Actions. Reverse-proxy and auto-HTTPS with Caddy and Traefik, deployed via Dokploy — this very site too.',
    },
  },
  contact: {
    head: {
      ru: 'Ищу команду',
      en: 'Looking for a team',
    },
    sub: {
      ru: 'Где можно расти как фуллстек и брать ответственность за архитектуру. Пиши в телеграм — отвечаю быстро.',
      en: 'Where I can grow as a fullstack dev and own the architecture. Drop me a line on Telegram — I reply fast.',
    },
    cta: { ru: 'Написать в Telegram', en: 'Message on Telegram' },
  },
  footer: {
    role: { ru: 'Fullstack Developer', en: 'Fullstack Developer' },
  },
} as const;

export function tr<T extends { ru: string; en: string }>(obj: T, lang: Lang): string {
  return obj[lang];
}
