import { motion } from 'framer-motion';
import { useApp } from '../AppContext';
import { t, tr } from '../i18n';
import { SectionHeader } from './About';

const TOOLS = ['Docker', 'VPS', 'GitHub Actions', 'Nginx', 'Linux'];

export default function DevOps() {
  const { lang } = useApp();
  return (
    <section className="px-6 md:px-12 py-20 md:py-28 max-w-[1400px] mx-auto">
      <SectionHeader id="05" label={tr(t.sections.devops, lang)} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl p-8 md:p-12 overflow-hidden"
        style={{ background: 'var(--invert-bg)', color: 'var(--invert-text)' }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center">
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-50 mb-3">
              {tr(t.devops.label, lang)}
            </div>
            <h3 className="font-display font-bold text-2xl md:text-3xl tracking-[-0.02em] mb-4">
              {tr(t.devops.title, lang)}
            </h3>
            <p className="font-mono text-[13px] leading-[1.7] opacity-60 max-w-xl">
              {tr(t.devops.desc, lang)}
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
            className="flex flex-wrap gap-2 md:justify-end"
          >
            {TOOLS.map((tool) => (
              <motion.span
                key={tool}
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ scale: 1.05, borderColor: 'var(--accent)' }}
                data-cursor="hover"
                className="font-mono text-[11px] px-3 py-1.5 rounded-md border cursor-default"
                style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.75)' }}
              >
                {tool}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
