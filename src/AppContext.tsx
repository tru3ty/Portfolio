'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import type { Lang, Theme, Accent, FontPair } from './types';

interface AppCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  accent: Accent;
  setAccent: (a: Accent) => void;
  fontPair: FontPair;
  setFontPair: (f: FontPair) => void;
  motion: boolean;
  setMotion: (m: boolean) => void;
}

const Ctx = createContext<AppCtx | null>(null);

// Дефолты ДОЛЖНЫ совпадать с атрибутами <html> в layout.tsx,
// иначе первый клиентский рендер разойдётся с SSR-разметкой (hydration mismatch).
const DEFAULTS = {
  lang: 'ru' as Lang,
  theme: 'light' as Theme,
  accent: 'orange' as Accent,
  fontPair: 'syne' as FontPair,
  motion: true,
};

export function AppProvider({ children }: { children: ReactNode }) {
  // Стартуем с дефолтов — на сервере localStorage нет, и первый рендер
  // на клиенте обязан совпасть с серверным. Реальные значения подтянем в effect.
  const [lang, setLang] = useState<Lang>(DEFAULTS.lang);
  const [theme, setTheme] = useState<Theme>(DEFAULTS.theme);
  const [accent, setAccent] = useState<Accent>(DEFAULTS.accent);
  const [fontPair, setFontPair] = useState<FontPair>(DEFAULTS.fontPair);
  const [motion, setMotion] = useState<boolean>(DEFAULTS.motion);

  // Пока не прочитали localStorage — не пишем в него, чтобы дефолты
  // не затёрли сохранённые пользователем значения на первом проходе.
  const hydrated = useRef(false);

  // Однократно после монтирования: читаем сохранённые настройки и
  // системный prefers-reduced-motion. Только здесь доступен браузер.
  useEffect(() => {
    const get = <T extends string>(key: string): T | null =>
      (localStorage.getItem(key) as T | null) ?? null;

    const storedLang = get<Lang>('lang');
    const storedTheme = get<Theme>('theme');
    const storedAccent = get<Accent>('accent');
    const storedFont = get<FontPair>('fontPair');
    const storedMotion = localStorage.getItem('motion');

    if (storedLang) setLang(storedLang);
    if (storedTheme) setTheme(storedTheme);
    if (storedAccent) setAccent(storedAccent);
    if (storedFont) setFontPair(storedFont);

    if (storedMotion === 'on' || storedMotion === 'off') {
      setMotion(storedMotion === 'on');
    } else {
      // Пользователь ничего не выбирал — уважаем системную настройку.
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setMotion(!prefersReduced);
    }

    hydrated.current = true;
  }, []);

  // Синхронизация состояния -> DOM + localStorage. До гидрации не трогаем
  // localStorage (см. hydrated), но data-атрибуты держим в актуальном виде.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-accent', accent);
    root.setAttribute('data-fontpair', fontPair);
    root.setAttribute('data-motion', motion ? 'on' : 'off');
    root.setAttribute('lang', lang);

    if (!hydrated.current) return;
    localStorage.setItem('theme', theme);
    localStorage.setItem('accent', accent);
    localStorage.setItem('fontPair', fontPair);
    localStorage.setItem('motion', motion ? 'on' : 'off');
    localStorage.setItem('lang', lang);
  }, [theme, accent, fontPair, motion, lang]);

  return (
    <Ctx.Provider value={{ lang, setLang, theme, setTheme, accent, setAccent, fontPair, setFontPair, motion, setMotion }}>
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useApp must be used within AppProvider');
  return v;
}
