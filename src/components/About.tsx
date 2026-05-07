import { motion } from 'framer-motion';
import { useApp } from '../AppContext';
import { t, tr } from '../i18n';

export default function About() {
  const { lang } = useApp();
  return (
    <section className="px-6 md:px-12 py-20 md:py-28 max-w-[1400px] mx-auto">
      <SectionHeader id="01" label={tr(t.pills.title, lang)} />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-15%' }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.06 } },
        }}
        className="flex flex-wrap gap-3 max-w-3xl"
      >
        {t.pills.items.map((p, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 12, scale: 0.95 },
              show: { opacity: 1, y: 0, scale: 1 },
            }}
            whileHover={{ y: -3, borderColor: 'var(--accent)', color: 'var(--accent)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-[12px] px-4 py-2 rounded-full border border-border bg-surface text-text-secondary cursor-default"
            data-cursor="hover"
          >
            {tr(p, lang)}
          </motion.span>
        ))}
      </motion.div>

      <Stats />
    </section>
  );
}

function Stats() {
  const { lang } = useApp();
  return (
    <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
      {t.stats.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          className="bg-surface px-6 md:px-8 py-8 md:py-10 group hover:bg-surface-2 transition-colors relative overflow-hidden"
          data-cursor="hover"
        >
          <div
            className="absolute top-0 left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
            style={{ background: 'var(--accent)' }}
          />
          <div
            className="font-display font-extrabold leading-none tracking-[-0.04em]"
            style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}
          >
            {s.value}
          </div>
          <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-text-secondary mt-3">
            {tr(s.label, lang)}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function SectionHeader({ id, label }: { id: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-4 mb-10 md:mb-14"
    >
      <span className="font-mono text-[11px] tracking-[0.18em] uppercase" style={{ color: 'var(--accent)' }}>
        / {id}
      </span>
      <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-secondary">{label}</span>
      <div className="flex-1 h-px bg-border" />
    </motion.div>
  );
}
