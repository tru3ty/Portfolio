import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
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

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('lang') as Lang) || 'ru');
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'light');
  const [accent, setAccent] = useState<Accent>(() => (localStorage.getItem('accent') as Accent) || 'orange');
  const [fontPair, setFontPair] = useState<FontPair>(() => (localStorage.getItem('fontPair') as FontPair) || 'syne');
  const [motion, setMotion] = useState<boolean>(() => localStorage.getItem('motion') !== 'off');

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-accent', accent);
    root.setAttribute('data-fontpair', fontPair);
    root.setAttribute('data-motion', motion ? 'on' : 'off');
    root.setAttribute('lang', lang);
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
