import { useState, useMemo, useEffect, memo } from 'react';
import { motion } from 'framer-motion';

interface Props {
  text: string;
  className?: string;
  hoverGlitch?: boolean;
}

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#________';
function randChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

export default function GlitchText({ text, className, hoverGlitch = true }: Props) {
  const [hovered, setHovered] = useState(false);
  const chars = useMemo(() => Array.from(text), [text]);

  return (
    <span
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'flex' }}
      data-cursor="hover"
    >
      {chars.map((c, i) => (
        <Char key={i} char={c} index={i} active={hoverGlitch && hovered} />
      ))}
    </span>
  );
}

const Char = memo(function Char({
  char,
  index,
  active,
}: {
  char: string;
  index: number;
  active: boolean;
}) {
  const [display, setDisplay] = useState(char);

  useEffect(() => {
    if (!active) {
      setDisplay(char);
      return;
    }
    let frame = 0;
    const max = 6 + (index % 4);
    const id = setInterval(() => {
      frame++;
      if (frame >= max) {
        setDisplay(char);
        clearInterval(id);
      } else {
        setDisplay(char === ' ' ? ' ' : randChar());
      }
    }, 30);
    return () => clearInterval(id);
  }, [active, char, index]);

  return (
    <motion.span
      style={{ display: 'flex', whiteSpace: 'pre', maxWidth: 'fit-content' }}
      animate={active ? { y: [0, -2, 1, 0], rotate: [0, -1, 1, 0] } : { y: 0, rotate: 0 }}
      transition={{ duration: 0.25, delay: index * 0.012 }}
    >
      {display}
    </motion.span>
  );
});
