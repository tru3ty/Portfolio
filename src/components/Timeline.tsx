import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useApp } from '../AppContext';
import { t, tr } from '../i18n';
import { TIMELINE } from '../data';
import { SectionHeader } from './About';

const N = TIMELINE.length - 1;
// Позиция i-й точки в процентах — просто i/N, всё в одной системе
const pct = (i: number) => `${(i / N) * 100}%`;

export default function Timeline() {
  const { lang } = useApp();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeEvent = TIMELINE[activeIndex];

  const trackRef = useRef<HTMLDivElement>(null);
  // progress — дробное 0..N, отображается на линии непрерывно
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const wheelSnapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchBaseProgress = useRef(0);
  const touchStartX = useRef(0);

  const snapToNearest = () => {
    const snapped = Math.round(progressRef.current);
    progressRef.current = snapped;
    setProgress(snapped);
    setActiveIndex(snapped);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
      e.preventDefault();
      // 300px горизонтального хода = 1 шаг
      const next = Math.max(0, Math.min(N, progressRef.current + e.deltaX / 500));
      progressRef.current = next;
      setProgress(next);
      setActiveIndex(Math.round(next));
      // снэп через 120ms после последнего события wheel
      if (wheelSnapTimer.current) clearTimeout(wheelSnapTimer.current);
      wheelSnapTimer.current = setTimeout(snapToNearest, 10);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchBaseProgress.current = progressRef.current;
    };
    const onTouchMove = (e: TouchEvent) => {
      const dx = touchStartX.current - e.touches[0].clientX;
      // 200px хода = 1 шаг
      const next = Math.max(0, Math.min(N, touchBaseProgress.current + dx / 340));
      progressRef.current = next;
      setProgress(next);
      setActiveIndex(Math.round(next));
    };
    const onTouchEnd = snapToNearest;

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <section className="px-6 md:px-12 py-20 md:py-28 max-w-[1400px] mx-auto">
      <SectionHeader id="02" label={tr(t.sections.timeline, lang)} />

      {/* Единый трек — он же слайдер */}
      <div className="mb-12 md:mb-16">
        <div
          ref={trackRef}
          className="relative select-none"
          style={{ height: 100, cursor: 'none' }}
        >
          {/* Base line через центр */}
          <div
            className="absolute inset-x-0 pointer-events-none"
            style={{ top: 20, height: 1, background: 'var(--border)' }}
          />

          {/* Accent fill — от 0% до pct(activeIndex) */}
          <motion.div
            className="absolute left-0 pointer-events-none"
            style={{ top: 19, height: 3, borderRadius: 2, background: 'var(--accent)' }}
            animate={{ width: pct(progress) }}
            transition={{ duration: 0.08, ease: 'linear' }}
          />

          {/* Точки + labels */}
          {TIMELINE.map((ev, i) => {
            const isActive = i === activeIndex;
            const isPast = i < activeIndex;

            return (
              <div
                key={ev.id}
                className="absolute flex flex-col items-center"
                style={{
                  left: pct(i),
                  top: 0,
                  transform: 'translateX(-50%)',
                }}
              >
                {/* Dot */}
                <button
                  onClick={() => { progressRef.current = i; setProgress(i); setActiveIndex(i); }}
                  data-cursor="hover"
                  className="relative flex items-center justify-center"
                  style={{ width: 40, height: 40, cursor: 'none' }}
                >
                  {isActive && (
                    <motion.span
                      className="absolute rounded-full pointer-events-none"
                      style={{ inset: 4, border: '2px solid var(--accent)', borderRadius: '50%' }}
                      animate={{ opacity: [0.7, 0, 0.7], scale: [1, 1.9, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                  <motion.span
                    animate={{
                      width: isActive ? 18 : 12,
                      height: isActive ? 18 : 12,
                      backgroundColor: isActive ? 'var(--accent)' : isPast ? 'var(--accent)' : 'var(--surface)',
                      boxShadow: isActive
                        ? '0 0 0 4px var(--accent-soft)'
                        : isPast ? '0 0 0 2px var(--accent-soft)' : '0 0 0 2px var(--border)',
                    }}
                    transition={{ duration: 0.35 }}
                    style={{ borderRadius: '50%', display: 'block', flexShrink: 0 }}
                  />
                </button>

                {/* Label */}
                <motion.button
                  onClick={() => { progressRef.current = i; setProgress(i); setActiveIndex(i); }}
                  data-cursor="hover"
                  className="font-mono text-[11px] tracking-[0.05em] px-3 py-1.5 rounded-full border text-center leading-tight whitespace-nowrap"
                  animate={{
                    borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'var(--accent-soft)' : 'transparent',
                  }}
                  transition={{ duration: 0.3 }}
                  style={{ cursor: 'none', marginTop: 4 }}
                >
                  {tr(ev.date, lang)}
                </motion.button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Card */}
      <div
        className="relative rounded-2xl border border-border overflow-hidden"
        style={{ background: 'var(--surface)', minHeight: 360 }}
      >
        <Tick pos="top-left" />
        <Tick pos="top-right" />
        <Tick pos="bottom-left" />
        <Tick pos="bottom-right" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeEvent.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 p-8 md:p-14"
          >
            <div>
              <span
                className="inline-block font-mono text-[10px] tracking-[0.18em] uppercase px-2 py-1 rounded mb-6"
                style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
              >
                {tr(activeEvent.tag, lang)}
              </span>
              <div className="font-mono text-sm text-text-secondary mb-3">
                {tr(activeEvent.date, lang)}
              </div>
              <div
                className="font-display font-extrabold leading-none tracking-[-0.04em] opacity-10"
                style={{ fontSize: 'clamp(80px, 12vw, 180px)' }}
              >
                {activeEvent.year}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h3
                className="font-display font-bold tracking-[-0.02em] leading-[1.05] mb-6"
                style={{ fontSize: 'clamp(28px, 3.4vw, 48px)' }}
              >
                {tr(activeEvent.title, lang)}
              </h3>
              <p className="font-mono text-sm md:text-[15px] leading-[1.75] text-text-secondary max-w-2xl">
                {tr(activeEvent.description, lang)}
              </p>
              <div className="mt-8 flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase text-text-muted">
                <KindMarker kind={activeEvent.kind} />
                <span>{activeEvent.kind}</span>
                <ArrowUpRight size={12} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function Tick({ pos }: { pos: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }) {
  const v = pos.startsWith('top') ? 'top-3' : 'bottom-3';
  const h = pos.endsWith('left') ? 'left-3' : 'right-3';
  return (
    <div className={`absolute ${v} ${h} w-3 h-3 pointer-events-none`}>
      <div
        className="absolute inset-0 border-l border-t border-border"
        style={{
          transform:
            pos === 'top-right' ? 'scaleX(-1)' :
              pos === 'bottom-left' ? 'scaleY(-1)' :
                pos === 'bottom-right' ? 'scale(-1)' : 'none',
        }}
      />
    </div>
  );
}

function KindMarker({ kind }: { kind: string }) {
  const colors: Record<string, string> = {
    work: '#2D5BE3',
    project: 'var(--accent)',
    learn: '#2ea66b',
    milestone: '#7c4dff',
  };
  return (
    <span
      className="inline-block w-1.5 h-1.5 rounded-full"
      style={{ background: colors[kind] ?? 'var(--accent)' }}
    />
  );
}
