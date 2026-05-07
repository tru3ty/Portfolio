export type Lang = 'ru' | 'en';
export type Theme = 'light' | 'dark';
export type Accent = 'orange' | 'blue' | 'violet' | 'green' | 'pink';
export type FontPair = 'syne' | 'grotesk' | 'serif';

export interface TimelineEvent {
  id: string;
  date: { ru: string; en: string };
  year: number;
  title: { ru: string; en: string };
  description: { ru: string; en: string };
  tag: { ru: string; en: string };
  kind: 'work' | 'project' | 'learn' | 'milestone';
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
