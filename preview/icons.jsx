// Lucide icon wrapper using lucide UMD
const { createElement: h, useEffect: useEffectI, useRef: useRefI } = React;

function LucideIcon({ name, size = 22, ...rest }) {
  const ref = useRefI(null);
  useEffectI(() => {
    if (!ref.current) return;
    ref.current.innerHTML = '';
    try {
      const lucide = window.lucide;
      const data = lucide.icons?.[name];
      if (!data) return;
      // lucide UMD exposes createElement helper
      const el = lucide.createElement(data);
      el.setAttribute('width', String(size));
      el.setAttribute('height', String(size));
      el.setAttribute('stroke', 'currentColor');
      el.setAttribute('stroke-width', '1.6');
      ref.current.appendChild(el);
    } catch (e) {}
  }, [name, size]);
  return <span ref={ref} style={{ display: 'inline-flex' }} {...rest} />;
}

// Map react-friendly names to lucide kebab-case
const LUCIDE_MAP = {
  layers: 'layers', wind: 'wind', sparkles: 'sparkles', pencil: 'pencil',
  video: 'video', server: 'server', flame: 'flame', plug: 'plug',
  network: 'network', database: 'database', 'hard-drive': 'hard-drive',
  zap: 'zap', shield: 'shield', box: 'box', split: 'split-square-vertical',
  workflow: 'workflow', terminal: 'terminal', 'git-branch': 'git-branch',
  figma: 'figma', code: 'code-2', send: 'send', notebook: 'notebook',
  'message-circle': 'message-circle', settings: 'settings', x: 'x',
  sun: 'sun', moon: 'moon', 'arrow-down': 'arrow-down',
  'arrow-up-right': 'arrow-up-right', send2: 'send', type: 'type',
};

function L({ name, size = 18, ...rest }) {
  return <LucideIcon name={LUCIDE_MAP[name] || name} size={size} {...rest} />;
}

function ReactIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </svg>
  );
}
function NextIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9 8v8M9 8l7 8" />
    </svg>
  );
}
function TSIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 10h6M10 10v7M16 16c0 0.8 0.7 1.5 1.6 1.5s1.6-0.7 1.6-1.5c0-1.5-3.2-1.5-3.2-3 0-0.8 0.7-1.5 1.6-1.5s1.6 0.7 1.6 1.5" />
    </svg>
  );
}

function StackIcon({ name, size = 22 }) {
  if (name === 'react') return <ReactIcon size={size} />;
  if (name === 'next') return <NextIcon size={size} />;
  if (name === 'typescript') return <TSIcon size={size} />;
  return <L name={name} size={size} />;
}

Object.assign(window, { L, StackIcon });
