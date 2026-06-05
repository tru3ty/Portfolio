'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { useApp } from '../AppContext';
import { t, tr } from '../i18n';
import GlitchText from './GlitchText';

export default function Hero() {
  const { lang } = useApp();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const lines = [
    { text: tr(t.hero.line1, lang), y: y1 },
    { text: tr(t.hero.line2, lang), y: y1, accent: true },
    { text: tr(t.hero.line3, lang), y: y2 },
    { text: tr(t.hero.line4, lang), y: y2 },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 pb-20 overflow-hidden"
    >
      {/* background grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--text) 1px, transparent 1px), linear-gradient(to bottom, var(--text) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
        }}
        className="max-w-[1400px] w-full mx-auto"
      >
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          className="flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] uppercase text-text-secondary mb-10"
        >
          <span className="w-6 h-px" style={{ background: 'var(--accent)' }} />
          {tr(t.hero.label, lang)}
        </motion.div>

        <h1
          className="flex flex-col font-display font-extrabold leading-[0.85] tracking-[-0.04em] select-none"
          style={{ fontSize: 'clamp(56px, 14vw, 220px)' }}
        >
          {lines.map((ln, i) => (
            <motion.div
              key={i}
              style={{ y: ln.y }}
              variants={{
                hidden: { opacity: 0, y: 60, skewY: 6 },
                show: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <div className={ln.accent ? 'flex items-center' : undefined}>
                <GlitchText
                  text={ln.text}
                  ambient
                  className={ln.accent ? 'italic font-serif' : undefined}
                />
                {ln.accent && (
                  <motion.span
                    aria-hidden
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="pointer-events-none shrink-0 ml-4 origin-left rounded-full"
                    style={{
                      width: 'clamp(40px, 8vw, 140px)',
                      height: 'clamp(8px, 1.4vw, 24px)',
                      background: 'var(--accent)',
                    }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </h1>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          className="mt-12 grid md:grid-cols-2 gap-8 items-end"
        >
          <p
            className="font-mono text-sm md:text-[15px] leading-[1.7] text-text-secondary max-w-md border-l-2 pl-5"
            style={{ borderColor: 'var(--accent)' }}
          >
            {tr(t.hero.sub, lang)}
          </p>
          <div className="hidden md:flex justify-end">
            <motion.div
              style={{ opacity }}
              className="flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] uppercase text-text-secondary"
            >
              <ArrowDown size={14} className="animate-bounce" />
              {tr(t.hero.scroll, lang)}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
