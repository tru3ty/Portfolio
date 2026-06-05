'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useApp } from '../AppContext';
import { t, tr } from '../i18n';
import { TIMELINE, TIMELINE_YEARS } from '../data';
import type { EventStatus, TimelineEvent, TimelineYear } from '../types';
import { SectionHeader } from './About';

const STATUS_META: Record<EventStatus, { ru: string; en: string; color: string; filled: boolean }> = {
  production: { ru: 'в проде', en: 'production', color: '#2ea66b', filled: true },
  launched: { ru: 'запущен', en: 'launched', color: '#2ea66b', filled: true },
  'in-progress': { ru: 'в работе', en: 'in progress', color: 'var(--accent)', filled: false },
  archived: { ru: 'архив', en: 'archived', color: 'var(--text-muted)', filled: true },
};

export default function Timeline() {
  const { lang } = useApp();
  const trackRef = useRef<HTMLDivElement>(null);

  // Прогресс скролла по контейнеру timeline — заливаем центральную линию.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 65%', 'end 60%'],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section className="px-6 md:px-12 py-20 md:py-28 max-w-[1400px] mx-auto">
      <SectionHeader id="02" label={tr(t.sections.timeline, lang)} />

      <div ref={trackRef} className="relative">
        {/* Статичная серая направляющая */}
        <div
          aria-hidden
          className="absolute top-0 bottom-0 left-6 md:left-1/2 w-px pointer-events-none"
          style={{ background: 'var(--border)', transform: 'translateX(-50%)' }}
        />
        {/* Акцентная линия прогресса — заливается по мере скролла */}
        <motion.div
          aria-hidden
          className="absolute top-0 bottom-0 left-6 md:left-1/2 w-[2px] pointer-events-none origin-top"
          style={{
            background: 'var(--accent)',
            transform: 'translateX(-50%)',
            scaleY: lineScale,
          }}
        />

        <div className="flex flex-col gap-16 md:gap-10">
          {TIMELINE_YEARS.map((y) => {
            const events = TIMELINE.filter((e) => e.year === y.year);
            return (
              <div key={y.year} className="flex flex-col gap-10 md:gap-8">
                <YearMarker year={y} />
                {events.map((ev, i) => (
                  <EventRow key={ev.id} event={ev} side={i % 2 === 0 ? 'right' : 'left'} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function YearMarker({ year }: { year: TimelineYear }) {
  const { lang } = useApp();
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-15%' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      className="relative flex flex-col items-center text-center pt-4 md:pt-8"
    >
      {/* Кружок на линии — появляется с pop. Позиционер снаружи, scale внутри. */}
      <div
        aria-hidden
        className="absolute -top-2 left-6 md:left-1/2 w-3 h-3 -translate-x-1/2"
      >
        <motion.span
          className="block w-full h-full rounded-full"
          style={{ border: '2px solid var(--accent)', background: 'var(--bg)' }}
          variants={{ hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1 } }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
        />
      </div>
      {/* Плашка цвета фона под цифрой — перекрывает центральную линию,
          чтобы оранжевая линия прогресса не резала год. */}
      <motion.div
        className="relative font-display font-extrabold leading-none tracking-[-0.04em] tabular-nums ml-12 md:ml-0 md:px-6"
        style={{ fontSize: 'clamp(56px, 9vw, 120px)', background: 'var(--bg)' }}
        variants={{ hidden: { opacity: 0, y: 30, scale: 0.92 }, show: { opacity: 1, y: 0, scale: 1 } }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {year.year}
      </motion.div>
      <motion.div
        className="relative font-mono italic text-[12px] md:text-[13px] tracking-[0.04em] text-text-secondary mt-3 ml-12 md:ml-0 md:px-3"
        style={{ background: 'var(--bg)' }}
        variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.5 }}
      >
        {tr(year.subtitle, lang)}
      </motion.div>
      <motion.p
        className="relative font-mono text-[12px] md:text-[13px] leading-[1.7] text-text-secondary mt-4 max-w-md ml-12 md:ml-0 md:px-4"
        style={{ background: 'var(--bg)' }}
        variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.5 }}
      >
        {tr(year.summary, lang)}
      </motion.p>
    </motion.div>
  );
}

function EventRow({ event, side }: { event: TimelineEvent; side: 'left' | 'right' }) {
  const isRight = side === 'right';
  return (
    <div className="relative flex md:items-center">
      <EventNode />

      {isRight ? (
        <>
          <div className="hidden md:block md:w-1/2" />
          <Connector side="right" />
          <div className="w-full pl-14 md:pl-0 md:w-1/2 flex md:justify-start">
            <EventCard event={event} from="right" />
          </div>
        </>
      ) : (
        <>
          <div className="hidden md:flex md:w-1/2 justify-end">
            <EventCard event={event} from="left" />
          </div>
          <Connector side="left" />
          <div className="hidden md:block md:w-1/2" />
          <div className="w-full pl-14 md:hidden">
            <EventCard event={event} from="right" />
          </div>
        </>
      )}
    </div>
  );
}

/** Узел события на линии: pop при появлении + постоянная пульсация ореола.
 *  Позиционирование (-50%/-50% к линии) держит ВНЕШНИЙ div статикой, а
 *  framer-motion анимирует scale на ВНУТРЕННЕМ — иначе motion-transform
 *  затирает translate и точка съезжает с линии. */
function EventNode() {
  return (
    <div
      aria-hidden
      className="absolute top-6 md:top-1/2 left-6 md:left-1/2 z-10 w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2"
    >
      <motion.span
        className="relative block w-full h-full"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ type: 'spring', stiffness: 380, damping: 16 }}
      >
        {/* пульсирующий ореол */}
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ background: 'var(--accent)' }}
          animate={{ scale: [1, 2.4, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span
          className="absolute inset-0 rounded-full"
          style={{ background: 'var(--accent)', boxShadow: '0 0 0 4px var(--accent-soft)' }}
        />
      </motion.span>
    </div>
  );
}

/** Горизонтальный коннектор от линии к карточке — рисуется scaleX 0→1. */
function Connector({ side }: { side: 'left' | 'right' }) {
  return (
    <motion.div
      aria-hidden
      className="hidden md:block w-8 h-px shrink-0"
      style={{ background: 'var(--border)', transformOrigin: side === 'right' ? 'left' : 'right' }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    />
  );
}

function EventCard({ event, from }: { event: TimelineEvent; from: 'left' | 'right' }) {
  const { lang } = useApp();
  // Карточка въезжает со своей стороны — усиливает зигзаг.
  const dx = from === 'left' ? -48 : 48;
  return (
    <motion.div
      initial={{ opacity: 0, x: dx, y: 14 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      data-cursor="hover"
      className="group relative bg-surface border border-border rounded-2xl p-6 md:p-7 overflow-hidden w-full max-w-[460px]"
    >
      {/* акцентная линия сверху при hover */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ background: 'var(--accent)' }}
      />
      {/* мягкий радиальный свет при hover */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 100% 0%, var(--accent-soft) 0%, transparent 60%)' }}
      />

      <div className="relative flex items-start justify-between gap-3 mb-3">
        <h3 className="font-mono font-medium text-[15px] tracking-[-0.01em]">
          {tr(event.title, lang)}
        </h3>
        <StatusBadge event={event} />
      </div>

      <p className="relative font-mono text-[12px] leading-[1.7] text-text-secondary mb-5">
        {tr(event.description, lang)}
      </p>

      {event.stack && event.stack.length > 0 && (
        <div className="relative flex flex-wrap gap-1.5 mb-5">
          {event.stack.map((s) => (
            <span
              key={s}
              className="font-mono text-[10px] tracking-[0.02em] px-2.5 py-1 rounded-md border border-border text-text-secondary transition-colors group-hover:border-[var(--border-strong)]"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      <div className="relative flex items-end justify-between gap-3 pt-1">
        {event.role && (
          <span className="font-mono text-[11px] text-text-secondary">{tr(event.role, lang)}</span>
        )}
        {event.note && (
          <span className="font-mono italic text-[11px] text-text-secondary ml-auto text-right">
            {tr(event.note, lang)}
          </span>
        )}
      </div>
    </motion.div>
  );
}

function StatusBadge({ event }: { event: TimelineEvent }) {
  const { lang } = useApp();
  if (!event.status) return null;
  const meta = STATUS_META[event.status];
  const label = lang === 'ru' ? meta.ru : meta.en;
  const live = event.status === 'production' || event.status === 'in-progress';

  const inner = (
    <span className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.02em] text-text-secondary whitespace-nowrap">
      <motion.span
        className="w-2 h-2 rounded-full shrink-0"
        style={{
          background: meta.filled ? meta.color : 'transparent',
          border: meta.filled ? 'none' : `1.5px solid ${meta.color}`,
        }}
        animate={live ? { opacity: [1, 0.4, 1] } : undefined}
        transition={live ? { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } : undefined}
      />
      {label}
      {event.url && <ArrowUpRight size={12} className="opacity-60" />}
    </span>
  );

  if (event.url) {
    return (
      <a
        href={event.url}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="hover"
        className="shrink-0 hover:text-[var(--accent)] transition-colors"
      >
        {inner}
      </a>
    );
  }
  return <span className="shrink-0">{inner}</span>;
}
