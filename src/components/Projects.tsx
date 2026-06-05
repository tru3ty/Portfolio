'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useApp } from '../AppContext';
import { t, tr } from '../i18n';
import { PROJECTS } from '../data';
import { SectionHeader } from './About';

export default function Projects() {
  const { lang } = useApp();
  return (
    <section className="px-6 md:px-12 py-20 md:py-28 max-w-[1400px] mx-auto">
      <SectionHeader id="04" label={tr(t.sections.projects, lang)} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PROJECTS.map((p, i) => (
          <motion.a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            data-cursor="hover"
            className={`group relative block bg-surface border border-border rounded-2xl p-7 md:p-8 overflow-hidden ${
              p.wide ? 'md:col-span-2' : ''
            }`}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
              style={{ background: 'var(--accent)' }}
            />
            <div
              className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: 'var(--accent-soft)', filter: 'blur(40px)' }}
            />

            <div className="relative flex items-start justify-between mb-4">
              <span className="font-mono text-[11px] text-text-muted">{p.num}</span>
              <motion.div
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: 'var(--accent)' }}
              >
                <ArrowUpRight size={20} />
              </motion.div>
            </div>

            <div className="relative">
              <h3 className="font-display font-bold text-xl md:text-2xl tracking-[-0.02em] mb-2">
                {p.name}
              </h3>
              <p className="font-mono text-[12.5px] leading-[1.7] text-text-secondary mb-6 max-w-2xl">
                {tr(p.description, lang)}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span
                    key={s.label}
                    className="font-mono text-[10px] tracking-[0.04em] px-2.5 py-1 rounded"
                    style={
                      s.highlight
                        ? { background: 'var(--accent-soft)', color: 'var(--accent)' }
                        : { background: 'var(--bg-2)', color: 'var(--text-secondary)' }
                    }
                  >
                    {s.label}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
