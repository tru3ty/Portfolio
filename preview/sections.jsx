// Sections: TopBar, Hero, About, Timeline, Stack, Projects, DevOps, Contact, Footer, Tweaks

function TopBar() {
  const { lang, setLang } = useApp();
  return (
    <motion.header initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-md"
      style={{ background: 'color-mix(in oklab, var(--bg) 80%, transparent)' }}>
      <div className="flex items-center justify-between max-w-[1400px] mx-auto px-6 md:px-12 py-4 border-b border-border">
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-secondary flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full inline-block"
            style={{ background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }} />
          tru3ty / portfolio
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative flex items-center font-mono text-[11px] tracking-[0.15em] uppercase border border-border rounded-full p-0.5">
            <button onClick={() => setLang('ru')} data-cursor="hover"
              className="relative z-10 px-3 py-1 transition-colors"
              style={{ color: lang === 'ru' ? 'var(--invert-text)' : 'var(--text-secondary)' }}>RU</button>
            <button onClick={() => setLang('en')} data-cursor="hover"
              className="relative z-10 px-3 py-1 transition-colors"
              style={{ color: lang === 'en' ? 'var(--invert-text)' : 'var(--text-secondary)' }}>EN</button>
            <motion.div layout transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="absolute top-0.5 bottom-0.5 rounded-full"
              style={{ background: 'var(--invert-bg)', left: lang === 'ru' ? 2 : '50%', width: 'calc(50% - 2px)' }} />
          </div>
          <Magnetic as="a" href="https://t.me/tru3ty" target="_blank"
            className="hidden sm:flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase px-4 py-2 rounded-full border border-border hover:border-[var(--accent)] transition-colors">
            <L name="send" size={12} />
            <span>@tru3ty</span>
          </Magnetic>
        </div>
      </div>
    </motion.header>
  );
}

function Hero() {
  const { lang } = useApp();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const lines = [
    { text: tr(I18N.hero.line1, lang), y: y1 },
    { text: tr(I18N.hero.line2, lang), y: y1, accent: true },
    { text: tr(I18N.hero.line3, lang), y: y2 },
    { text: tr(I18N.hero.line4, lang), y: y2 },
  ];
  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 pb-20 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'linear-gradient(to right, var(--text) 1px, transparent 1px), linear-gradient(to bottom, var(--text) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }} />
      <motion.div initial="hidden" animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
        className="max-w-[1400px] w-full mx-auto">
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          className="flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] uppercase text-text-secondary mb-10">
          <span className="w-6 h-px" style={{ background: 'var(--accent)' }} />
          {tr(I18N.hero.label, lang)}
        </motion.div>
        <h1 className="font-display font-extrabold leading-[0.85] tracking-[-0.04em] select-none"
          style={{ fontSize: 'clamp(56px, 14vw, 220px)' }}>
          {lines.map((ln, i) => (
            <motion.div key={i} style={{ y: ln.y }}
              variants={{
                hidden: { opacity: 0, y: 60, skewY: 6 },
                show: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="overflow-hidden">
              <GlitchText text={ln.text}
                className={ln.accent ? 'inline-block italic' : 'inline-block'} />
              {ln.accent && (
                <motion.span aria-hidden initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="inline-block ml-4 align-middle origin-left rounded-full"
                  style={{ width: 'clamp(40px, 8vw, 140px)', height: 'clamp(8px, 1.4vw, 24px)', background: 'var(--accent)' }} />
              )}
            </motion.div>
          ))}
        </h1>
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          className="mt-12 grid md:grid-cols-2 gap-8 items-end">
          <p className="font-mono text-sm md:text-[15px] leading-[1.7] text-text-secondary max-w-md border-l-2 pl-5"
            style={{ borderColor: 'var(--accent)' }}>{tr(I18N.hero.sub, lang)}</p>
          <div className="hidden md:flex justify-end">
            <motion.div style={{ opacity }}
              className="flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] uppercase text-text-secondary">
              <L name="arrow-down" size={14} />
              {tr(I18N.hero.scroll, lang)}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function About() {
  const { lang } = useApp();
  return (
    <section className="px-6 md:px-12 py-20 md:py-28 max-w-[1400px] mx-auto">
      <SectionHeader id="01" label={tr(I18N.pills.title, lang)} />
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-15%' }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        className="flex flex-wrap gap-3 max-w-3xl">
        {I18N.pills.items.map((p, i) => (
          <motion.span key={i}
            variants={{ hidden: { opacity: 0, y: 12, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1 } }}
            whileHover={{ y: -3, borderColor: 'var(--accent)', color: 'var(--accent)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-[12px] px-4 py-2 rounded-full border border-border bg-surface text-text-secondary cursor-default"
            data-cursor="hover">{tr(p, lang)}</motion.span>
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
      {I18N.stats.map((s, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          className="bg-surface px-6 md:px-8 py-8 md:py-10 group hover:bg-surface-2 transition-colors relative overflow-hidden"
          data-cursor="hover">
          <div className="absolute top-0 left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
            style={{ background: 'var(--accent)' }} />
          <div className="font-display font-extrabold leading-none tracking-[-0.04em]"
            style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}>{s.value}</div>
          <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-text-secondary mt-3">
            {tr(s.label, lang)}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Timeline() {
  const { lang } = useApp();
  const [active, setActive] = useState(TIMELINE[0].id);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineProgress = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  const grouped = useMemo(() => {
    const m = new Map();
    TIMELINE.forEach((e) => {
      const list = m.get(e.year) || [];
      list.push(e); m.set(e.year, list);
    });
    return Array.from(m.entries()).sort((a, b) => a[0] - b[0]);
  }, []);
  const activeEvent = TIMELINE.find((e) => e.id === active) || TIMELINE[0];
  const kindColors = { work: '#2D5BE3', project: 'var(--accent)', learn: '#2ea66b', milestone: '#7c4dff' };

  return (
    <section ref={ref} className="px-6 md:px-12 py-20 md:py-28 max-w-[1400px] mx-auto">
      <SectionHeader id="02" label={tr(I18N.sections.timeline, lang)} />
      <div className="relative mb-12 md:mb-16">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-border hidden md:block" />
        <motion.div className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] origin-left hidden md:block"
          style={{ scaleX: lineProgress, background: 'var(--accent)', width: '100%' }} />
        <div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-12">
          {grouped.map(([year, events]) => (
            <div key={year} className="relative flex-1 flex flex-col items-center">
              <div className="font-display font-extrabold leading-none tracking-[-0.04em] select-none mb-6"
                style={{ fontSize: 'clamp(48px, 6vw, 88px)' }}>{year}</div>
              <div className="relative flex gap-2 md:gap-3 flex-wrap justify-center">
                {events.map((ev) => (
                  <motion.button key={ev.id} onClick={() => setActive(ev.id)}
                    whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }} data-cursor="hover"
                    className="relative font-mono text-[11px] tracking-[0.05em] px-3 py-2 rounded-full border transition-colors"
                    style={{
                      borderColor: active === ev.id ? 'var(--accent)' : 'var(--border)',
                      color: active === ev.id ? 'var(--accent)' : 'var(--text-secondary)',
                      background: active === ev.id ? 'var(--accent-soft)' : 'var(--surface)',
                    }}>
                    {active === ev.id && (
                      <motion.span layoutId="timeline-pulse"
                        className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                        style={{ background: 'var(--accent)' }} />
                    )}
                    {tr(ev.date, lang)}
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 font-mono text-[11px] tracking-[0.12em] uppercase text-text-muted text-center">
          {tr(I18N.timelineHint, lang)}
        </div>
      </div>
      <div className="relative rounded-2xl border border-border overflow-hidden"
        style={{ background: 'var(--surface)', minHeight: 360 }}>
        <AnimatePresence mode="wait">
          <motion.div key={activeEvent.id}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 p-8 md:p-14">
            <div>
              <span className="inline-block font-mono text-[10px] tracking-[0.18em] uppercase px-2 py-1 rounded mb-6"
                style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                {tr(activeEvent.tag, lang)}
              </span>
              <div className="font-mono text-sm text-text-secondary mb-3">{tr(activeEvent.date, lang)}</div>
              <div className="font-display font-extrabold leading-none tracking-[-0.04em] opacity-10"
                style={{ fontSize: 'clamp(80px, 12vw, 180px)' }}>{activeEvent.year}</div>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="font-display font-bold tracking-[-0.02em] leading-[1.05] mb-6"
                style={{ fontSize: 'clamp(28px, 3.4vw, 48px)' }}>
                {tr(activeEvent.title, lang)}
              </h3>
              <p className="font-mono text-sm md:text-[15px] leading-[1.75] text-text-secondary max-w-2xl">
                {tr(activeEvent.description, lang)}
              </p>
              <div className="mt-8 flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase text-text-muted">
                <span className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: kindColors[activeEvent.kind] || 'var(--accent)' }} />
                <span>{activeEvent.kind}</span>
                <L name="arrow-up-right" size={12} />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function Stack() {
  const { lang } = useApp();
  const [active, setActive] = useState('frontend');
  const cat = STACK.find((c) => c.id === active);
  return (
    <section className="px-6 md:px-12 py-20 md:py-28 max-w-[1400px] mx-auto">
      <SectionHeader id="03" label={tr(I18N.sections.stack, lang)} />
      <div className="flex flex-wrap gap-2 mb-10 md:mb-14">
        {STACK.map((c) => (
          <motion.button key={c.id} onClick={() => setActive(c.id)}
            whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} data-cursor="hover"
            className="relative font-mono text-[12px] tracking-[0.05em] px-5 py-2.5 rounded-full border transition-colors"
            style={{
              borderColor: active === c.id ? 'transparent' : 'var(--border)',
              color: active === c.id ? 'var(--invert-text)' : 'var(--text-secondary)',
            }}>
            {active === c.id && (
              <motion.span layoutId="stack-tab-bg"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                className="absolute inset-0 rounded-full"
                style={{ background: 'var(--invert-bg)' }} />
            )}
            <span className="relative z-10">{tr(c.label, lang)}</span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={cat.id}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {cat.items.map((item, i) => (
            <motion.div key={item.name}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              whileHover={{ y: -4 }} data-cursor="hover"
              className="group relative bg-surface border border-border rounded-2xl p-5 md:p-6 cursor-default overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ background: 'var(--accent)' }} />
              <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'var(--accent-soft)', filter: 'blur(20px)' }} />
              <div className="relative w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300 group-hover:text-[var(--accent)]"
                style={{ background: 'var(--bg-2)', color: 'var(--text)' }}>
                <StackIcon name={item.icon} size={20} />
              </div>
              <div className="relative font-display font-bold text-[17px] tracking-[-0.01em] mb-1.5">{item.name}</div>
              <div className="relative font-mono text-[11px] text-text-secondary leading-[1.55]">
                {tr(item.description, lang)}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function Projects() {
  const { lang } = useApp();
  return (
    <section className="px-6 md:px-12 py-20 md:py-28 max-w-[1400px] mx-auto">
      <SectionHeader id="04" label={tr(I18N.sections.projects, lang)} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PROJECTS.map((p, i) => (
          <motion.a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }} data-cursor="hover"
            className={`group relative block bg-surface border border-border rounded-2xl p-7 md:p-8 overflow-hidden ${p.wide ? 'md:col-span-2' : ''}`}>
            <div className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
              style={{ background: 'var(--accent)' }} />
            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: 'var(--accent-soft)', filter: 'blur(40px)' }} />
            <div className="relative flex items-start justify-between mb-4">
              <span className="font-mono text-[11px] text-text-muted">{p.num}</span>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--accent)' }}>
                <L name="arrow-up-right" size={20} />
              </div>
            </div>
            <div className="relative">
              <h3 className="font-display font-bold text-xl md:text-2xl tracking-[-0.02em] mb-2">{p.name}</h3>
              <p className="font-mono text-[12.5px] leading-[1.7] text-text-secondary mb-6 max-w-2xl">
                {tr(p.description, lang)}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span key={s.label}
                    className="font-mono text-[10px] tracking-[0.04em] px-2.5 py-1 rounded"
                    style={s.highlight
                      ? { background: 'var(--accent-soft)', color: 'var(--accent)' }
                      : { background: 'var(--bg-2)', color: 'var(--text-secondary)' }}>
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

const DEVOPS_TOOLS = ['Docker', 'VPS', 'GitHub Actions', 'Nginx', 'Linux'];
function DevOps() {
  const { lang } = useApp();
  return (
    <section className="px-6 md:px-12 py-20 md:py-28 max-w-[1400px] mx-auto">
      <SectionHeader id="05" label={tr(I18N.sections.devops, lang)} />
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }} transition={{ duration: 0.7 }}
        className="relative rounded-2xl p-8 md:p-12 overflow-hidden"
        style={{ background: 'var(--invert-bg)', color: 'var(--invert-text)' }}>
        <div aria-hidden className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
        <div className="relative grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center">
          <div>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-50 mb-3">
              {tr(I18N.devops.label, lang)}
            </div>
            <h3 className="font-display font-bold text-2xl md:text-3xl tracking-[-0.02em] mb-4">
              {tr(I18N.devops.title, lang)}
            </h3>
            <p className="font-mono text-[13px] leading-[1.7] opacity-60 max-w-xl">
              {tr(I18N.devops.desc, lang)}
            </p>
          </div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
            className="flex flex-wrap gap-2 md:justify-end">
            {DEVOPS_TOOLS.map((tool) => (
              <motion.span key={tool}
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ scale: 1.05 }} data-cursor="hover"
                className="font-mono text-[11px] px-3 py-1.5 rounded-md border cursor-default"
                style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.75)' }}>
                {tool}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function Contact() {
  const { lang } = useApp();
  return (
    <section className="px-6 md:px-12 py-20 md:py-28 max-w-[1400px] mx-auto">
      <SectionHeader id="06" label={tr(I18N.sections.contact, lang)} />
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }} transition={{ duration: 0.7 }} className="relative">
        <h2 className="font-display font-extrabold leading-[0.9] tracking-[-0.04em] mb-6"
          style={{ fontSize: 'clamp(48px, 9vw, 140px)' }}>
          <GlitchText text={tr(I18N.contact.head, lang)} />
        </h2>
        <p className="font-mono text-sm md:text-base leading-[1.7] text-text-secondary mb-10 max-w-xl">
          {tr(I18N.contact.sub, lang)}
        </p>
        <Magnetic as="a" href="https://t.me/tru3ty" target="_blank" strength={0.4}
          className="inline-flex items-center gap-3 group">
          <span className="flex items-center gap-3 font-mono text-sm md:text-base tracking-[0.05em] px-7 md:px-9 py-4 md:py-5 rounded-full transition-colors"
            style={{ background: 'var(--accent)', color: '#fff' }}>
            <L name="send" size={16} />
            <span>{tr(I18N.contact.cta, lang)}</span>
            <span className="font-bold">@tru3ty</span>
            <L name="arrow-up-right" size={16} />
          </span>
        </Magnetic>
      </motion.div>
    </section>
  );
}

function Footer() {
  const { lang } = useApp();
  const year = new Date().getFullYear();
  return (
    <footer className="px-6 md:px-12 py-12 max-w-[1400px] mx-auto border-t border-border">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-text-secondary">
          {tr(I18N.footer.role, lang)} · <span style={{ color: 'var(--accent)' }}>{year}</span>
        </div>
        <div className="font-mono text-[11px] tracking-[0.12em] uppercase text-text-secondary">
          NestJS · Next.js · React · TypeScript
        </div>
        <a href="https://t.me/tru3ty" target="_blank" rel="noopener noreferrer"
          className="font-mono text-[11px] tracking-[0.12em] uppercase hover:text-[var(--accent)] transition-colors"
          data-cursor="hover">@tru3ty ↗</a>
      </div>
    </footer>
  );
}

const ACCENTS = [
  { id: 'orange', color: '#E8622A' }, { id: 'blue', color: '#2D5BE3' },
  { id: 'violet', color: '#7C4DFF' }, { id: 'green', color: '#2EA66B' },
  { id: 'pink', color: '#EC4899' },
];
const FONTS = [
  { id: 'syne', label: 'Syne / DM Mono', sample: 'Aa' },
  { id: 'grotesk', label: 'Grotesk / JetBrains', sample: 'Aa' },
  { id: 'serif', label: 'Instrument / Grotesk', sample: 'Aa' },
];

function TweaksPanel() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme, accent, setAccent, fontPair, setFontPair, motion: mo, setMotion } = useApp();
  return (
    <>
      <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }} onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} data-cursor="hover"
        className="fixed bottom-6 right-6 z-[60] w-12 h-12 rounded-full border border-border flex items-center justify-center shadow-lg"
        style={{ background: 'var(--surface)', color: 'var(--text)' }}>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.4 }}>
          <L name={open ? 'x' : 'settings'} size={18} />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-[60] w-[280px] rounded-2xl border border-border p-5 shadow-2xl"
            style={{ background: 'var(--surface)' }}>
            <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-secondary mb-4">Tweaks</div>
            <Row label="Theme">
              <div className="flex gap-1 p-0.5 rounded-full border border-border">
                <ToggleBtn active={theme === 'light'} onClick={() => setTheme('light')} label="Light" iconName="sun" />
                <ToggleBtn active={theme === 'dark'} onClick={() => setTheme('dark')} label="Dark" iconName="moon" />
              </div>
            </Row>
            <Row label="Accent">
              <div className="flex gap-2">
                {ACCENTS.map((a) => (
                  <button key={a.id} onClick={() => setAccent(a.id)} data-cursor="hover"
                    className="relative w-7 h-7 rounded-full transition-transform hover:scale-110"
                    style={{ background: a.color }}>
                    {accent === a.id && (
                      <motion.span layoutId="accent-ring"
                        className="absolute -inset-1 rounded-full border-2 pointer-events-none"
                        style={{ borderColor: 'var(--text)' }} />
                    )}
                  </button>
                ))}
              </div>
            </Row>
            <Row label="Fonts">
              <div className="flex flex-col gap-1.5 w-full">
                {FONTS.map((f) => (
                  <button key={f.id} onClick={() => setFontPair(f.id)} data-cursor="hover"
                    className="flex items-center justify-between w-full px-3 py-2 rounded-lg border transition-colors"
                    style={{
                      borderColor: fontPair === f.id ? 'var(--accent)' : 'var(--border)',
                      background: fontPair === f.id ? 'var(--accent-soft)' : 'transparent',
                    }}>
                    <span className="font-mono text-[11px] text-text-secondary">{f.label}</span>
                    <span className="font-display text-base font-bold">{f.sample}</span>
                  </button>
                ))}
              </div>
            </Row>
            <Row label="Motion">
              <button onClick={() => setMotion(!mo)} data-cursor="hover"
                className="flex items-center gap-2 font-mono text-[11px] px-3 py-1.5 rounded-full border"
                style={{ borderColor: mo ? 'var(--accent)' : 'var(--border)', color: mo ? 'var(--accent)' : 'var(--text-secondary)' }}>
                <L name="sparkles" size={12} />
                {mo ? 'ON' : 'OFF'}
              </button>
            </Row>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Row({ label, children }) {
  return (
    <div className="flex items-start justify-between gap-3 py-3 border-t border-border first:border-t-0">
      <span className="font-mono text-[11px] text-text-secondary mt-1.5 shrink-0">{label}</span>
      <div className="flex items-center justify-end">{children}</div>
    </div>
  );
}

function ToggleBtn({ active, onClick, label, iconName }) {
  return (
    <button onClick={onClick} data-cursor="hover"
      className="relative flex items-center gap-1 px-2.5 py-1 font-mono text-[10px] tracking-[0.05em] rounded-full"
      style={{ color: active ? 'var(--invert-text)' : 'var(--text-secondary)' }}>
      {active && (
        <motion.span layoutId="theme-toggle-bg" className="absolute inset-0 rounded-full"
          style={{ background: 'var(--invert-bg)' }} />
      )}
      <span className="relative z-10 flex items-center gap-1">
        <L name={iconName} size={12} />
        {label}
      </span>
    </button>
  );
}

Object.assign(window, { TopBar, Hero, About, Timeline, Stack, Projects, DevOps, Contact, Footer, TweaksPanel });
