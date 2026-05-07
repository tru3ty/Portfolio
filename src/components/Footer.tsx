import { useApp } from '../AppContext';
import { t, tr } from '../i18n';

export default function Footer() {
  const { lang } = useApp();
  const year = new Date().getFullYear();
  return (
    <footer className="px-6 md:px-12 py-12 max-w-[1400px] mx-auto border-t border-border">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-text-secondary">
          {tr(t.footer.role, lang)} · <span style={{ color: 'var(--accent)' }}>{year}</span>
        </div>
        <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-text-secondary">
          NestJS · Next.js · React · TypeScript
        </div>
        <a
          href="https://t.me/tru3ty"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] tracking-[0.12em] uppercase hover:text-[var(--accent)] transition-colors"
          data-cursor="hover"
        >
          @tru3ty ↗
        </a>
      </div>
    </footer>
  );
}
