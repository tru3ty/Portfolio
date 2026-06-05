export type Lang = 'ru' | 'en';
export type Theme = 'light' | 'dark';
export type Accent = 'orange' | 'blue' | 'violet' | 'green' | 'pink';
export type FontPair = 'syne' | 'grotesk' | 'serif';

/** Локализованная строка ru/en. */
export type L10n = { ru: string; en: string };

export type EventStatus = 'production' | 'in-progress' | 'launched' | 'archived';

export interface TimelineEvent {
  id: string;
  date: L10n;
  year: number;
  title: L10n;
  description: L10n;
  tag: L10n;
  kind: 'work' | 'project' | 'learn' | 'milestone';
  /** Стадия проекта — рендерится бейджем в правом верхнем углу карточки. */
  status?: EventStatus;
  /** Роль на проекте (нижний левый угол карточки). */
  role?: L10n;
  /** Курсивная пометка в правом нижнем углу карточки. */
  note?: L10n;
  /** Внешняя ссылка — иконка ↗ рядом со статусом. */
  url?: string;
  /** Технологический стек — бордерные пилюли. */
  stack?: string[];
}

/** Заголовок года: крупная цифра + курсивный подзаголовок + сводка. */
export interface TimelineYear {
  year: number;
  subtitle: L10n;
  summary: L10n;
}

export interface Project {
  id: string;
  num: string;
  name: string;
  url: string;
  description: { ru: string; en: string };
  stack: { label: string; highlight?: boolean }[];
  wide?: boolean;
}

export interface StackItem {
  name: string;
  icon: string; // lucide icon name OR custom key
  description: { ru: string; en: string };
}

export interface StackCategory {
  id: 'frontend' | 'backend' | 'devops' | 'tools';
  label: { ru: string; en: string };
  items: StackItem[];
}
