import { motion } from 'framer-motion';
import { Send, ArrowUpRight } from 'lucide-react';
import { useApp } from '../AppContext';
import { t, tr } from '../i18n';
import { SectionHeader } from './About';
import Magnetic from './Magnetic';
import GlitchText from './GlitchText';

export default function Contact() {
  const { lang } = useApp();
  return (
    <section className="px-6 md:px-12 py-20 md:py-28 max-w-[1400px] mx-auto">
      <SectionHeader id="06" label={tr(t.sections.contact, lang)} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <h2
          className="font-display font-extrabold leading-[0.9] tracking-[-0.04em] mb-6"
          style={{ fontSize: 'clamp(48px, 9vw, 140px)' }}
        >
          <GlitchText text={tr(t.contact.head, lang)} />
        </h2>
        <p className="font-mono text-sm md:text-base leading-[1.7] text-text-secondary mb-10 max-w-xl">
          {tr(t.contact.sub, lang)}
        </p>

        <Magnetic
          as="a"
          href="https://t.me/tru3ty"
          target="_blank"
          strength={0.4}
          className="inline-flex items-center gap-3 group"
        >
          <span
            className="flex items-center gap-3 font-mono text-sm md:text-base tracking-[0.05em] px-7 md:px-9 py-4 md:py-5 rounded-full transition-colors"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            <Send size={16} />
            <span>{tr(t.contact.cta, lang)}</span>
            <span className="font-bold">@tru3ty</span>
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </span>
        </Magnetic>
      </motion.div>
    </section>
  );
}
