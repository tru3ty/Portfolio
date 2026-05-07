import type { TimelineEvent, Project, StackCategory } from './types';

export const TIMELINE: TimelineEvent[] = [
  {
    id: 'first-line',
    date: { ru: 'Начало 2024', en: 'Early 2024' },
    year: 2024,
    title: { ru: 'Первая строка кода в проде', en: 'First line in production' },
    description: {
      ru: 'Начал писать на Next.js и NestJS — пет-проекты переросли в реальные задачи. Понял, что фронт и бэк по отдельности — скучно, и пошёл в фуллстек.',
      en: 'Started writing Next.js and NestJS — pet projects grew into real work. Realized frontend and backend in isolation is boring and went fullstack.',
    },
    tag: { ru: 'Старт', en: 'Start' },
    kind: 'milestone',
  },
  {
    id: 'leepy',
    date: { ru: 'Лето 2024', en: 'Summer 2024' },
    year: 2024,
    title: { ru: 'Лендинг Leepy', en: 'Leepy landing' },
    description: {
      ru: 'Сайт для дизайнера на Next.js + Strapi. Первое серьёзное знакомство с Framer Motion и CMS-архитектурой.',
      en: 'Designer landing on Next.js + Strapi. First deep dive into Framer Motion and CMS architecture.',
    },
    tag: { ru: 'Проект', en: 'Project' },
    kind: 'project',
  },
  {
    id: 'lisavi',
    date: { ru: 'Осень 2024', en: 'Autumn 2024' },
    year: 2024,
    title: { ru: 'Лисави — e-commerce', en: 'Lisavi — e-commerce' },
    description: {
      ru: 'Запустил e-commerce с нуля: ЮКасса, Т-Банк, доставка с расчётом, промокоды, кастомная админ-панель. Здесь научился держать в голове всю систему.',
      en: 'Built e-commerce from scratch: ЮKassa, T-Bank, shipping calc, promo codes, custom admin panel. Learned to hold an entire system in my head.',
    },
    tag: { ru: 'Проект', en: 'Project' },
    kind: 'project',
  },
  {
    id: 'devops-dive',
    date: { ru: 'Зима 2024/25', en: 'Winter 2024/25' },
    year: 2025,
    title: { ru: 'Погружение в DevOps', en: 'DevOps deep dive' },
    description: {
      ru: 'Docker, Nginx, GitHub Actions, VPS. Перестал бояться сервера и научился деплоить без боли.',
      en: 'Docker, Nginx, GitHub Actions, VPS. Stopped being scared of servers and learned to deploy without pain.',
    },
    tag: { ru: 'Скилл', en: 'Skill' },
    kind: 'learn',
  },
  {
    id: 'istok',
    date: { ru: 'Весна 2025', en: 'Spring 2025' },
    year: 2025,
    title: { ru: 'ИСТОК — платформа МФТИ', en: 'ИСТОК — MIPT platform' },
    description: {
      ru: 'Языковое тестирование для студентов МФТИ. Реализовал автоматическую проверку через GigaChat с кастомным промптом. На платформе уже больше 10 000 тестов.',
      en: 'Language testing platform for MIPT students. Built auto-grading via GigaChat with a custom system prompt. 10K+ tests on the platform.',
    },
    tag: { ru: 'Проект', en: 'Project' },
    kind: 'project',
  },
  {
    id: 'pifagorum',
    date: { ru: 'Лето 2025', en: 'Summer 2025' },
    year: 2025,
    title: { ru: 'Пифагорум — LMS', en: 'Пифагорум — LMS' },
    description: {
      ru: 'Спроектировал и поднял модуль видеоконференций на LiveKit — от медиасервера до кастомного UI с управлением комнатами и участниками.',
      en: 'Designed and built a video-conference module on LiveKit — from media server to custom UI with room and participant management.',
    },
    tag: { ru: 'Проект', en: 'Project' },
    kind: 'project',
  },
  {
    id: 'exploo',
    date: { ru: 'Осень 2025', en: 'Autumn 2025' },
    year: 2025,
    title: { ru: 'Exploo — стартап', en: 'Exploo — startup' },
    description: {
      ru: 'Платформа для репетиторов. Hono + tRPC + TanStack, видеосвязь на LiveKit, авторизация через Better Auth с привязкой Telegram. Здесь рос как архитектор.',
      en: 'Tutoring platform. Hono + tRPC + TanStack, LiveKit video, Better Auth with Telegram binding. Grew as an architect here.',
    },
    tag: { ru: 'Стартап', en: 'Startup' },
    kind: 'work',
  },
  {
    id: 'now',
    date: { ru: '2026', en: '2026' },
    year: 2026,
    title: { ru: 'Сейчас', en: 'Now' },
    description: {
      ru: 'Ищу команду, где можно расти как фуллстек и брать ответственность за архитектуру. Пилю pet-проекты, изучаю edge-runtime и WebRTC глубже.',
      en: 'Looking for a team where I can grow as fullstack and own architecture. Building pet projects, going deeper into edge runtime and WebRTC.',
    },
    tag: { ru: 'Open', en: 'Open' },
    kind: 'milestone',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'pifagorum',
    num: '01',
    name: 'Пифагорум',
    url: 'https://vc.pifagorum.qque-dev.ru/',
    description: {
      ru: 'LMS-платформа. Самостоятельно спроектировал и поднял модуль видеоконференций на LiveKit — от медиасервера до кастомного UI.',
      en: 'LMS platform. Built the video-conference module on LiveKit end-to-end — from media server to custom UI.',
    },
    stack: [
      { label: 'NestJS' },
      { label: 'Next.js' },
      { label: 'GraphQL' },
      { label: 'Prisma' },
      { label: 'LiveKit', highlight: true },
      { label: 'tldraw' },
    ],
  },
  {
    id: 'istok',
    num: '02',
    name: 'ИСТОК',
    url: 'https://istok-demo.ru/',
    description: {
      ru: 'Платформа языкового тестирования для МФТИ. Автопроверка через GigaChat с кастомным промптом. 10 000+ тестов.',
      en: 'Language testing platform for MIPT. Auto-grading via GigaChat with a custom prompt. 10,000+ tests.',
    },
    stack: [
      { label: 'NestJS' },
      { label: 'Next.js' },
      { label: 'GigaChat', highlight: true },
      { label: 'GigaChain', highlight: true },
      { label: 'Prisma' },
    ],
  },
  {
    id: 'lisavi',
    num: '03',
    name: 'Лисави',
    url: 'https://lisavi.art/',
    description: {
      ru: 'E-commerce с нуля. ЮКасса, Т-Банк, доставка, промокоды, сертификаты, кастомная админка.',
      en: 'E-commerce from scratch. ЮKassa, T-Bank, shipping, promo codes, gift certificates, custom admin.',
    },
    stack: [
      { label: 'NestJS' },
      { label: 'Next.js' },
      { label: 'Prisma' },
      { label: 'ЮКасса', highlight: true },
      { label: 'Т-Банк', highlight: true },
    ],
  },
  {
    id: 'exploo',
    num: '04',
    name: 'Exploo',
    url: 'https://exploo.ru',
    description: {
      ru: 'Стартап для репетиторов. LiveKit видеосвязь и Better Auth с привязкой Telegram.',
      en: 'Tutoring startup. LiveKit video and Better Auth with Telegram binding.',
    },
    stack: [
      { label: 'React' },
      { label: 'TanStack' },
      { label: 'Hono' },
      { label: 'tRPC' },
      { label: 'LiveKit', highlight: true },
      { label: 'Better Auth' },
    ],
  },
  {
    id: 'leepy',
    num: '05',
    name: 'Leepy',
    url: 'https://leepy.art/',
    wide: true,
    description: {
      ru: 'Лендинг для дизайнера с CMS на Strapi и анимациями на Framer Motion.',
      en: 'Designer landing with Strapi CMS and Framer Motion animations.',
    },
    stack: [
      { label: 'Next.js' },
      { label: 'Framer Motion', highlight: true },
      { label: 'Strapi' },
    ],
  },
];

export const STACK: StackCategory[] = [
  {
    id: 'frontend',
    label: { ru: 'Frontend', en: 'Frontend' },
    items: [
      { name: 'React', icon: 'react', description: { ru: 'Основной UI-фреймворк', en: 'Main UI framework' } },
      { name: 'Next.js', icon: 'next', description: { ru: 'SSR/SSG/API-роуты', en: 'SSR/SSG/API routes' } },
      { name: 'TypeScript', icon: 'typescript', description: { ru: 'Типы — это любовь', en: 'Types are love' } },
      { name: 'TanStack', icon: 'layers', description: { ru: 'Query, Router, Table', en: 'Query, Router, Table' } },
      { name: 'Tailwind', icon: 'wind', description: { ru: 'Utility-first стили', en: 'Utility-first styling' } },
      { name: 'Framer Motion', icon: 'sparkles', description: { ru: 'Анимации и interactions', en: 'Animations & interactions' } },
      { name: 'tldraw', icon: 'pencil', description: { ru: 'Whiteboard в браузере', en: 'In-browser whiteboard' } },
      { name: 'LiveKit', icon: 'video', description: { ru: 'WebRTC видео/аудио', en: 'WebRTC video/audio' } },
    ],
  },
  {
    id: 'backend',
    label: { ru: 'Backend', en: 'Backend' },
    items: [
      { name: 'NestJS', icon: 'server', description: { ru: 'Любимый Node-фреймворк', en: 'Favorite Node framework' } },
      { name: 'Hono', icon: 'flame', description: { ru: 'Edge-ready, быстрый', en: 'Edge-ready, fast' } },
      { name: 'tRPC', icon: 'plug', description: { ru: 'Типы от бэка к фронту', en: 'End-to-end types' } },
      { name: 'GraphQL', icon: 'network', description: { ru: 'Гибкие запросы', en: 'Flexible queries' } },
      { name: 'Prisma', icon: 'database', description: { ru: 'ORM для Postgres', en: 'ORM for Postgres' } },
      { name: 'PostgreSQL', icon: 'hard-drive', description: { ru: 'Основная БД', en: 'Primary DB' } },
      { name: 'Redis', icon: 'zap', description: { ru: 'Кеш и очереди', en: 'Cache & queues' } },
      { name: 'Better Auth', icon: 'shield', description: { ru: 'Auth с Telegram', en: 'Auth with Telegram' } },
    ],
  },
  {
    id: 'devops',
    label: { ru: 'DevOps', en: 'DevOps' },
    items: [
      { name: 'Docker', icon: 'box', description: { ru: 'Контейнеризация', en: 'Containerization' } },
      { name: 'Nginx', icon: 'split', description: { ru: 'Reverse proxy', en: 'Reverse proxy' } },
      { name: 'GitHub Actions', icon: 'workflow', description: { ru: 'CI/CD пайплайны', en: 'CI/CD pipelines' } },
      { name: 'VPS / Linux', icon: 'terminal', description: { ru: 'Boot, ssh, systemd', en: 'Boot, ssh, systemd' } },
    ],
  },
  {
    id: 'tools',
    label: { ru: 'Tools', en: 'Tools' },
    items: [
      { name: 'Git', icon: 'git-branch', description: { ru: 'Rebase > merge', en: 'Rebase > merge' } },
      { name: 'Figma', icon: 'figma', description: { ru: 'Читаю макеты', en: 'Reading designs' } },
      { name: 'VS Code', icon: 'code', description: { ru: 'Основной редактор', en: 'Main editor' } },
      { name: 'Postman', icon: 'send', description: { ru: 'API debugging', en: 'API debugging' } },
      { name: 'Notion', icon: 'notebook', description: { ru: 'Заметки и доки', en: 'Notes & docs' } },
      { name: 'Telegram', icon: 'message-circle', description: { ru: 'Связь с командой', en: 'Team comms' } },
    ],
  },
];
