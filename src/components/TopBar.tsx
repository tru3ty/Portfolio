import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useApp } from '../AppContext';
import Magnetic from './Magnetic';

export default function TopBar() {
  const { lang, setLang } = useApp();
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md"
      style={{ background: 'color-mix(in oklab, var(--bg) 80%, transparent)' }}
    >
      <div className="flex items-center justify-between max-w-[1400px] mx-auto px-6 md:px-12 py-4 border-b border-border">
        <Magnetic className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-secondary flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full inline-block"
            style={{ background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }}
          />
          tru3ty / portfolio
        </Magnetic>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative flex items-center font-mono text-[11px] tracking-[0.15em] uppercase border border-border rounded-full p-0.5">
            <button
              onClick={() => setLang('ru')}
              className="relative z-10 px-3 py-1 transition-colors"
              style={{ color: lang === 'ru' ? 'var(--invert-text)' : 'var(--text-secondary)' }}
              data-cursor="hover"
            >
              RU
            </button>
            <button
              onClick={() => setLang('en')}
              className="relative z-10 px-3 py-1 transition-colors"
              style={{ color: lang === 'en' ? 'var(--invert-text)' : 'var(--text-secondary)' }}
              data-cursor="hover"
            >
              EN
            </button>
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="absolute top-0.5 bottom-0.5 rounded-full"
              style={{
                background: 'var(--invert-bg)',
                left: lang === 'ru' ? 2 : '50%',
                width: 'calc(50% - 2px)',
              }}
            />
          </div>

          <Magnetic
            as="a"
            href="https://t.me/tru3ty"
            target="_blank"
            className="hidden sm:flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase px-4 py-2 rounded-full border border-border hover:border-[var(--accent)] transition-colors"
          >
            <Send size={12} />
            <span>@tru3ty</span>
          </Magnetic>
        </div>
      </div>
    </motion.header>
  );
}
