'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, Sun, Moon, Sparkles, Type } from 'lucide-react';
import { useApp } from '../AppContext';
import type { Accent, FontPair } from '../types';

const ACCENTS: { id: Accent; color: string }[] = [
  { id: 'orange', color: '#E8622A' },
  { id: 'blue', color: '#2D5BE3' },
  { id: 'violet', color: '#7C4DFF' },
  { id: 'green', color: '#2EA66B' },
  { id: 'pink', color: '#EC4899' },
];

const FONTS: { id: FontPair; label: string; sample: string }[] = [
  { id: 'syne', label: 'Syne / DM Mono', sample: 'Aa' },
  { id: 'grotesk', label: 'Space Grotesk / JetBrains', sample: 'Aa' },
  { id: 'serif', label: 'Instrument Serif / Grotesk', sample: 'Aa' },
];

export default function TweaksPanel() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme, accent, setAccent, fontPair, setFontPair, motion: motionOn, setMotion } = useApp();

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-cursor="hover"
        className="fixed bottom-6 right-6 z-[60] w-12 h-12 rounded-full border border-border flex items-center justify-center shadow-lg"
        style={{ background: 'var(--surface)', color: 'var(--text)' }}
        aria-label="Open tweaks"
      >
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.4 }}>
          {open ? <X size={18} /> : <Settings size={18} />}
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-[60] w-[280px] rounded-2xl border border-border p-5 shadow-2xl"
            style={{ background: 'var(--surface)' }}
          >
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-secondary mb-4">
              Tweaks
            </div>

            {/* Theme */}
            <Row label="Theme">
              <div className="flex gap-1 p-0.5 rounded-full border border-border">
                <ToggleBtn
                  active={theme === 'light'}
                  onClick={() => setTheme('light')}
                  label="Light"
                  icon={<Sun size={12} />}
                />
                <ToggleBtn
                  active={theme === 'dark'}
                  onClick={() => setTheme('dark')}
                  label="Dark"
                  icon={<Moon size={12} />}
                />
              </div>
            </Row>

            {/* Accent */}
            <Row label="Accent">
              <div className="flex gap-2">
                {ACCENTS.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setAccent(a.id)}
                    data-cursor="hover"
                    className="relative w-7 h-7 rounded-full transition-transform hover:scale-110"
                    style={{ background: a.color }}
                    aria-label={a.id}
                  >
                    {accent === a.id && (
                      <motion.span
                        layoutId="accent-ring"
                        className="absolute -inset-1 rounded-full border-2 pointer-events-none"
                        style={{ borderColor: 'var(--text)' }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </Row>

            {/* Font pair */}
            <Row label="Fonts">
              <div className="flex flex-col gap-1.5 w-full">
                {FONTS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFontPair(f.id)}
                    data-cursor="hover"
                    className="flex items-center justify-between w-full px-3 py-2 rounded-lg border transition-colors"
                    style={{
                      borderColor: fontPair === f.id ? 'var(--accent)' : 'var(--border)',
                      background: fontPair === f.id ? 'var(--accent-soft)' : 'transparent',
                    }}
                  >
                    <span className="font-mono text-[11px] text-text-secondary">{f.label}</span>
                    <span className="font-display text-base font-bold">{f.sample}</span>
                  </button>
                ))}
              </div>
            </Row>

            {/* Motion */}
            <Row label="Motion">
              <button
                onClick={() => setMotion(!motionOn)}
                data-cursor="hover"
                className="flex items-center gap-2 font-mono text-[11px] px-3 py-1.5 rounded-full border"
                style={{
                  borderColor: motionOn ? 'var(--accent)' : 'var(--border)',
                  color: motionOn ? 'var(--accent)' : 'var(--text-secondary)',
                }}
              >
                <Sparkles size={12} />
                {motionOn ? 'ON' : 'OFF'}
              </button>
            </Row>

            <div className="font-mono text-[10px] text-text-muted mt-2 flex items-center gap-1.5">
              <Type size={10} />
              Saved to localStorage
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 py-3 border-t border-border first:border-t-0">
      <span className="font-mono text-[11px] text-text-secondary mt-1.5 shrink-0">{label}</span>
      <div className="flex items-center justify-end">{children}</div>
    </div>
  );
}

function ToggleBtn({ active, onClick, label, icon }: { active: boolean; onClick: () => void; label: string; icon: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      data-cursor="hover"
      className="relative flex items-center gap-1 px-2.5 py-1 font-mono text-[10px] tracking-[0.05em] rounded-full"
      style={{ color: active ? 'var(--invert-text)' : 'var(--text-secondary)' }}
    >
      {active && (
        <motion.span
          layoutId="theme-toggle-bg"
          className="absolute inset-0 rounded-full"
          style={{ background: 'var(--invert-bg)' }}
        />
      )}
      <span className="relative z-10 flex items-center gap-1">
        {icon}
        {label}
      </span>
    </button>
  );
}
