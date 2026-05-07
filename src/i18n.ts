import type { Lang } from './types';

export const t = {
  hero: {
    label: { ru: 'Fullstack Developer · Portfolio', en: 'Fullstack Developer · Portfolio' },
    line1: { ru: 'РАЗРА', en: 'FULL' },
    line2: { ru: 'БОТЧИК', en: 'STACK' },
    line3: { ru: 'ПОЛНОГО', en: 'DEVE' },
    line4: { ru: 'ЦИКЛА', en: 'LOPER' },
    sub: {
      ru: 'Быстро вникаю в новый стек и контекст задачи. Люблю разбираться как всё устроено изнутри, а не просто «сделать чтобы работало».',
      en: 'I jump into new stacks fast and dig into how things work under the hood — not just shipping code that runs, but code I understand.',
    },
    scroll: { ru: 'Скролль вниз', en: 'Scroll down' },
  },
  pills: {
    title: { ru: 'О себе', en: 'About' },
    items: [
      { ru: 'Опыт продакшн-разработки', en: 'Production experience' },
      { ru: 'Работа в команде', en: 'Team player' },
      { ru: 'Проекты с нуля', en: 'Greenfield projects' },
      { ru: 'Быстро обучаюсь', en: 'Fast learner' },
      { ru: 'Чистый и поддерживаемый код', en: 'Clean & maintainable code' },
    ],
  },
  stats: [
    { value: '5+', label: { ru: 'Боевых проектов', en: 'Production projects' } },
    { value: '10K+', label: { ru: 'Тестов на ИСТОК', en: 'Tests on ИСТОК' } },
    { value: '2+', label: { ru: 'Года в коде', en: 'Years coding' } },
    { value: '∞', label: { ru: 'Чашек кофе', en: 'Cups of coffee' } },
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
    title: { ru: 'Деплой и CI/CD', en: 'Deploy & CI/CD' },
    desc: {
      ru: 'Деплоил проекты на VPS, работал с Docker, настраивал CI/CD через GitHub Actions.',
      en: 'Deployed projects on VPS, worked with Docker, configured CI/CD via GitHub Actions.',
    },
  },
  contact: {
    head: {
      ru: 'Готов к новым задачам',
      en: 'Open to new challenges',
    },
    sub: {
      ru: 'Пиши в телеграм — отвечаю быстро.',
      en: 'Drop me a line on Telegram — I reply fast.',
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
