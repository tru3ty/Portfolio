'use client';

import { useState, useMemo, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../AppContext';

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
  const { motion: motionOn } = useApp();
  const [hovered, setHovered] = useState(false);
  const chars = useMemo(() => Array.from(text), [text]);
  const active = hoverGlitch && hovered && motionOn;

  return (
    // inline-flex (не flex): заголовок остаётся inline-блоком в потоке <h1>,
    // не растягивается на всю ширину и корректно встаёт рядом с акцентом.
    <span
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'inline-flex' }}
      data-cursor="hover"
    >
      {chars.map((c, i) => (
        <Char key={i} char={c} index={i} active={active} animate={motionOn} />
      ))}
    </span>
  );
}

const Char = memo(function Char({
  char,
  index,
  active,
  animate,
}: {
  char: string;
  index: number;
  active: boolean;
  animate: boolean;
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

  const isSpace = char === ' ';

  return (
    // inline-block без maxWidth:fit-content и whiteSpace-хаков — курсивные
    // глифы (font-serif italic, строка STACK) больше не клиппятся тесным
    // flex-боксом. rotate ослаблен до ±0.5°, чтобы наклонные засечки не
    // вылезали и не дёргались на больших кеглях.
    <motion.span
      style={{
        display: 'inline-block',
        // пробел не должен схлопываться в inline-block
        ...(isSpace ? { width: '0.3em' } : null),
      }}
      animate={active ? { y: [0, -2, 1, 0], rotate: [0, -0.5, 0.5, 0] } : { y: 0, rotate: 0 }}
      transition={{ duration: 0.25, delay: animate ? index * 0.012 : 0 }}
    >
      {isSpace ? ' ' : display}
    </motion.span>
  );
});
