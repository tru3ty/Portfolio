'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import type { Lang, Theme, Accent, FontPair } from './types';

interface AppCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  // Захардкоженные значения — панель настроек убрана. Сеттеров нет.
  accent: Accent;
  fontPair: FontPair;
  motion: boolean;
}

const Ctx = createContext<AppCtx | null>(null);

// Фиксированные настройки оформления (бывшая TweaksPanel). Менять здесь.
const ACCENT: Accent = 'orange';
const FONT_PAIR: FontPair = 'grotesk';
const MOTION = true;

// Управляемые значения. Дефолты ДОЛЖНЫ совпадать с атрибутами <html> в
// layout.tsx, иначе первый клиентский рендер разойдётся с SSR (hydration mismatch).
const DEFAULT_LANG: Lang = 'ru';
const DEFAULT_THEME: Theme = 'dark';

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

  // Пока не прочитали localStorage — не пишем в него, чтобы дефолты
  // не затёрли сохранённые пользователем значения на первом проходе.
  const hydrated = useRef(false);

  // Однократно после монтирования читаем сохранённые lang/theme.
  useEffect(() => {
    const storedLang = localStorage.getItem('lang') as Lang | null;
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedLang === 'ru' || storedLang === 'en') setLang(storedLang);
    if (storedTheme === 'light' || storedTheme === 'dark') setTheme(storedTheme);
    hydrated.current = true;
  }, []);

  // Синхронизация состояния -> DOM + localStorage. Акцент/шрифт/motion
  // фиксированы, поэтому проставляются один раз без localStorage.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-accent', ACCENT);
    root.setAttribute('data-fontpair', FONT_PAIR);
    root.setAttribute('data-motion', MOTION ? 'on' : 'off');
    root.setAttribute('lang', lang);

    if (!hydrated.current) return;
    localStorage.setItem('theme', theme);
    localStorage.setItem('lang', lang);
  }, [theme, lang]);

  return (
    <Ctx.Provider
      value={{ lang, setLang, theme, setTheme, accent: ACCENT, fontPair: FONT_PAIR, motion: MOTION }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useApp must be used within AppProvider');
  return v;
}
