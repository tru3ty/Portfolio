const { useState, useEffect, useRef, useMemo, createContext, useContext } = React;
const { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform } = window.Motion || window.framerMotion || window['framer-motion'] || window.FramerMotion;

// AppContext
const AppCtx = createContext(null);

function AppProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'ru');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [accent, setAccent] = useState(() => localStorage.getItem('accent') || 'orange');
  const [fontPair, setFontPair] = useState(() => localStorage.getItem('fontPair') || 'syne');
  const [motionOn, setMotion] = useState(() => localStorage.getItem('motion') !== 'off');

  useEffect(() => {
    const r = document.documentElement;
    r.setAttribute('data-theme', theme);
    r.setAttribute('data-accent', accent);
    r.setAttribute('data-fontpair', fontPair);
    r.setAttribute('data-motion', motionOn ? 'on' : 'off');
    r.setAttribute('lang', lang);
    localStorage.setItem('theme', theme);
    localStorage.setItem('accent', accent);
    localStorage.setItem('fontPair', fontPair);
    localStorage.setItem('motion', motionOn ? 'on' : 'off');
    localStorage.setItem('lang', lang);
  }, [theme, accent, fontPair, motionOn, lang]);

  return (
    <AppCtx.Provider value={{ lang, setLang, theme, setTheme, accent, setAccent, fontPair, setFontPair, motion: motionOn, setMotion }}>
      {children}
    </AppCtx.Provider>
  );
}

function useApp() { return useContext(AppCtx); }

// CursorBlob
function CursorBlob() {
  const { motion: mo } = useApp();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const xs = useSpring(x, { stiffness: 200, damping: 22, mass: 0.4 });
  const ys = useSpring(y, { stiffness: 200, damping: 22, mass: 0.4 });
  const dx = useSpring(x, { stiffness: 600, damping: 30, mass: 0.2 });
  const dy = useSpring(y, { stiffness: 600, damping: 30, mass: 0.2 });
  const blobRef = useRef(null);
  const stateRef = useRef('default');

  useEffect(() => {
    if (!mo) return;
    const move = (e) => {
      x.set(e.clientX); y.set(e.clientY);
      const t = e.target;
      const i = t.closest && t.closest('a, button, [data-cursor="hover"]');
      const next = i ? 'hover' : 'default';
      if (next !== stateRef.current && blobRef.current) {
        stateRef.current = next;
        blobRef.current.dataset.state = next;
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [mo]);

  if (!mo) return null;
  return [
    <motion.div key="blob" ref={blobRef} data-state="default"
        className="pointer-events-none fixed z-[9998] hidden md:block"
        style={{ left: xs, top: ys, translateX: '-50%', translateY: '-50%' }}>
        <div className="rounded-full transition-all duration-200 ease-out cursor-blob-inner"
          style={{ width: 28, height: 28, border: '1.5px solid var(--accent)', mixBlendMode: 'difference', opacity: 0.85 }} />
      </motion.div>,
    <motion.div key="dot" className="pointer-events-none fixed z-[9999] hidden md:block w-1 h-1 rounded-full"
      style={{ left: dx, top: dy, translateX: '-50%', translateY: '-50%', background: 'var(--accent)' }} />,
    <style key="style">{`[data-state="hover"] > .cursor-blob-inner { width:56px!important; height:56px!important; opacity:0.6!important; }`}</style>
  ];
}

// Magnetic
function Magnetic({ children, strength = 0.3, className, as = 'div', href, target, onClick, style }) {
  const ref = useRef(null);
  const { motion: mo } = useApp();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xs = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const ys = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const handleMove = (e) => {
    if (!mo || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const handleLeave = () => { x.set(0); y.set(0); };
  const M = motion[as] || motion.div;
  return (
    <M ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave}
      style={{ x: xs, y: ys, ...style }} className={className}
      href={href} target={target} onClick={onClick}>
      {children}
    </M>
  );
}

// GlitchText — char-level glitch on hover
const GLITCH = '!<>-_\\/[]{}—=+*^?#';
function randCh() { return GLITCH[Math.floor(Math.random() * GLITCH.length)]; }

function GlitchText({ text, className }) {
  const [hover, setHover] = useState(false);
  const chars = useMemo(() => Array.from(text), [text]);
  return (
    <span className={className} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ display: 'inline-block' }} data-cursor="hover">
      {chars.map((c, i) => <GChar key={i} c={c} idx={i} active={hover} />)}
    </span>
  );
}
function GChar({ c, idx, active }) {
  const [d, setD] = useState(c);
  useEffect(() => {
    if (!active) { setD(c); return; }
    let f = 0; const max = 6 + (idx % 4);
    const id = setInterval(() => {
      f++;
      if (f >= max) { setD(c); clearInterval(id); }
      else setD(c === ' ' ? ' ' : randCh());
    }, 30);
    return () => clearInterval(id);
  }, [active, c, idx]);
  return (
    <motion.span style={{ display: 'inline-block', whiteSpace: 'pre' }}
      animate={active ? { y: [0, -2, 1, 0], rotate: [0, -1, 1, 0] } : { y: 0, rotate: 0 }}
      transition={{ duration: 0.25, delay: idx * 0.012 }}>
      {d}
    </motion.span>
  );
}

function SectionHeader({ id, label }) {
  return (
    <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5 }}
      className="flex items-center gap-4 mb-10 md:mb-14">
      <span className="font-mono text-[11px] tracking-[0.18em] uppercase" style={{ color: 'var(--accent)' }}>/ {id}</span>
      <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-secondary">{label}</span>
      <div className="flex-1 h-px bg-border" />
    </motion.div>
  );
}

Object.assign(window, { AppProvider, useApp, CursorBlob, Magnetic, GlitchText, SectionHeader });
