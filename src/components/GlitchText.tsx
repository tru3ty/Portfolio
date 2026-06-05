'use client';

import { useState, useMemo, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../AppContext';

interface Props {
  text: string;
  className?: string;
  hoverGlitch?: boolean;
  /** Постоянное мягкое покачивание букв (волна). Гейтится motion-флагом. */
  ambient?: boolean;
}

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#________';
function randChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

/** Разбивает текст на слова, сохраняя глобальный индекс каждой буквы. */
function toWords(text: string) {
  const words: { chars: { ch: string; i: number }[] }[] = [];
  let current: { ch: string; i: number }[] = [];
  Array.from(text).forEach((ch, i) => {
    if (ch === ' ') {
      if (current.length) words.push({ chars: current });
      current = [];
    } else {
      current.push({ ch, i });
    }
  });
  if (current.length) words.push({ chars: current });
  return words;
}

export default function GlitchText({ text, className, hoverGlitch = true, ambient = false }: Props) {
  const { motion: motionOn } = useApp();
  const [hovered, setHovered] = useState(false);
  const words = useMemo(() => toWords(text), [text]);
  const active = hoverGlitch && hovered && motionOn;
  const sway = ambient && motionOn;

  return (
    // inline (не flex): заголовок остаётся в обычном текстовом потоке и
    // ПЕРЕНОСИТСЯ по словам — длинные фразы (Contact) больше не вылезают.
    <span
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="hover"
    >
      {words.map((word, wi) => (
        <span key={wi}>
          {/* слово — неразрывный блок: буквы внутри не рвутся */}
          <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {word.chars.map(({ ch, i }) => (
              <Char key={i} char={ch} index={i} active={active} ambient={sway} stagger={motionOn} />
            ))}
          </span>
          {/* пробел между словами — точка переноса строки */}
          {wi < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </span>
  );
}

const Char = memo(function Char({
  char,
  index,
  active,
  ambient,
  stagger,
}: {
  char: string;
  index: number;
  active: boolean;
  ambient: boolean;
  stagger: boolean;
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
        setDisplay(randChar());
      }
    }, 30);
    return () => clearInterval(id);
  }, [active, char, index]);

  // Приоритет: ховер-скрембл > постоянное покачивание > покой.
  const anim = active
    ? { y: [0, -3, 1, 0], rotate: [0, -1, 1, 0] }
    : ambient
      ? { y: [0, -6, 0, 4, 0], rotate: [0, -1.2, 0, 1.2, 0] }
      : { y: 0, rotate: 0 };

  const transition = active
    ? { duration: 0.25, delay: stagger ? index * 0.012 : 0 }
    : ambient
      ? {
          // бесконечная волна со сдвигом фазы по индексу буквы
          duration: 3.2,
          repeat: Infinity,
          ease: 'easeInOut' as const,
          delay: (index % 8) * 0.18,
        }
      : { duration: 0.25 };

  return (
    // inline-block без maxWidth:fit-content — курсивные глифы (font-serif
    // italic) не клиппятся тесным боксом.
    <motion.span
      style={{ display: 'inline-block' }}
      animate={anim}
      transition={transition}
    >
      {display}
    </motion.span>
  );
});
