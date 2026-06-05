'use client';

import { motion } from 'framer-motion';
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

  return (
    <section className="px-6 md:px-12 py-20 md:py-28 max-w-[1400px] mx-auto">
      <SectionHeader id="02" label={tr(t.sections.timeline, lang)} />

      <div className="relative">
        {/* Центральная вертикальная линия. На мобиле прижата влево. */}
        <div
          aria-hidden
          className="absolute top-0 bottom-0 left-6 md:left-1/2 w-px pointer-events-none"
          style={{ background: 'var(--border)', transform: 'translateX(-50%)' }}
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col items-center text-center pt-4 md:pt-8"
    >
      {/* Кружок на линии над цифрой года */}
      <span
        aria-hidden
        className="absolute -top-2 left-6 md:left-1/2 w-3 h-3 rounded-full"
        style={{
          transform: 'translateX(-50%)',
          border: '2px solid var(--accent)',
          background: 'var(--bg)',
        }}
      />
      <div
        className="font-display font-extrabold leading-none tracking-[-0.04em] tabular-nums ml-12 md:ml-0"
        style={{ fontSize: 'clamp(56px, 9vw, 120px)' }}
      >
        {year.year}
      </div>
      <div className="font-mono italic text-[12px] md:text-[13px] tracking-[0.04em] text-text-secondary mt-3 ml-12 md:ml-0">
        {tr(year.subtitle, lang)}
      </div>
      <p className="font-mono text-[12px] md:text-[13px] leading-[1.7] text-text-secondary mt-4 max-w-md ml-12 md:ml-0">
        {tr(year.summary, lang)}
      </p>
    </motion.div>
  );
}

function EventRow({ event, side }: { event: TimelineEvent; side: 'left' | 'right' }) {
  const isRight = side === 'right';
  return (
    <div className="relative flex md:items-center">
      {/* Узел события на центральной линии */}
      <span
        aria-hidden
        className="absolute top-7 md:top-1/2 left-6 md:left-1/2 w-2.5 h-2.5 rounded-full z-10"
        style={{
          transform: 'translate(-50%, -50%)',
          background: 'var(--accent)',
          boxShadow: '0 0 0 4px var(--accent-soft)',
        }}
      />

      {isRight ? (
        <>
          <div className="hidden md:block md:w-1/2" />
          <div className="hidden md:block w-8 h-px shrink-0" style={{ background: 'var(--border)' }} />
          <div className="w-full pl-14 md:pl-0 md:w-1/2 flex md:justify-start">
            <EventCard event={event} />
          </div>
        </>
      ) : (
        <>
          {/* desktop: карточка слева */}
          <div className="hidden md:flex md:w-1/2 justify-end">
            <EventCard event={event} />
          </div>
          <div className="hidden md:block w-8 h-px shrink-0" style={{ background: 'var(--border)' }} />
          <div className="hidden md:block md:w-1/2" />
          {/* mobile: всё справа от линии */}
          <div className="w-full pl-14 md:hidden">
            <EventCard event={event} />
          </div>
        </>
      )}
    </div>
  );
}

function EventCard({ event }: { event: TimelineEvent }) {
  const { lang } = useApp();
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      data-cursor="hover"
      className="group relative bg-surface border border-border rounded-2xl p-6 md:p-7 overflow-hidden w-full max-w-[460px]"
    >
      {/* акцентная линия сверху при hover */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ background: 'var(--accent)' }}
      />

      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-mono font-medium text-[15px] tracking-[-0.01em]">
          {tr(event.title, lang)}
        </h3>
        <StatusBadge event={event} />
      </div>

      <p className="font-mono text-[12px] leading-[1.7] text-text-secondary mb-5">
        {tr(event.description, lang)}
      </p>

      {event.stack && event.stack.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {event.stack.map((s) => (
            <span
              key={s}
              className="font-mono text-[10px] tracking-[0.02em] px-2.5 py-1 rounded-md border border-border text-text-secondary"
            >
              {s}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-end justify-between gap-3 pt-1">
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

  const inner = (
    <span className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.02em] text-text-secondary whitespace-nowrap">
      <span
        className="w-2 h-2 rounded-full shrink-0"
        style={{
          background: meta.filled ? meta.color : 'transparent',
          border: meta.filled ? 'none' : `1.5px solid ${meta.color}`,
        }}
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
