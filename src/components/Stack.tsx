import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../AppContext';
import { t, tr } from '../i18n';
import { STACK } from '../data';
import { SectionHeader } from './About';
import StackIcon, { ICON_COLORS } from './StackIcon';
import type { StackCategory } from '../types';

export default function Stack() {
  const { lang } = useApp();
  const [active, setActive] = useState<StackCategory['id']>('frontend');
  const cat = STACK.find((c) => c.id === active)!;

  return (
    <section className="px-6 md:px-12 py-20 md:py-28 max-w-[1400px] mx-auto">
      <SectionHeader id="03" label={tr(t.sections.stack, lang)} />

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-10 md:mb-14">
        {STACK.map((c) => (
          <motion.button
            key={c.id}
            onClick={() => setActive(c.id)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            data-cursor="hover"
            className="relative font-mono text-[12px] tracking-[0.05em] px-5 py-2.5 rounded-full border transition-colors"
            style={{
              borderColor: active === c.id ? 'transparent' : 'var(--border)',
              color: active === c.id ? 'var(--invert-text)' : 'var(--text-secondary)',
            }}
          >
            {active === c.id && (
              <motion.span
                layoutId="stack-tab-bg"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                className="absolute inset-0 rounded-full"
                style={{ background: 'var(--invert-bg)' }}
              />
            )}
            <span className="relative z-10">{tr(c.label, lang)}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={cat.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {cat.items.map((item, i) => {
            const color = ICON_COLORS[item.icon] ?? 'var(--accent)';
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                data-cursor="hover"
                className="group relative bg-surface border border-border rounded-2xl p-5 md:p-6 cursor-default overflow-hidden"
              >
                {/* градиент из цвета иконки — появляется при hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 0% 100%, ${color}18 0%, transparent 70%)`,
                  }}
                />
                {/* верхняя линия */}
                <div
                  className="absolute top-0 left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  style={{ background: color }}
                />
                {/* иконка */}
                <div
                  className="relative w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: `${color}18` }}
                >
                  <StackIcon name={item.icon} size={22} />
                </div>
                <div className="relative font-display font-bold text-[17px] tracking-[-0.01em] mb-1.5">
                  {item.name}
                </div>
                <div className="relative font-mono text-[11px] text-text-secondary leading-[1.55]">
                  {tr(item.description, lang)}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
