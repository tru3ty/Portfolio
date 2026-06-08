'use client';

import { useState, useMemo, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../AppContext';

interface Props {
  text: string;
  className?: string;
  hoverGlitch?: boolean;
  /** Один проход скрембла при монтировании (на загрузке), без реакции на ховер. */
  loadGlitch?: boolean;
  /** Постоянное мягкое покачивание букв (волна). Гейтится motion-флагом. */
  ambient?: boolean;
}

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#________';
function randChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

// Шаг скрембла, мс. Hover (футер) — резкий; load (Hero) — медленнее и заметнее.
const STEP_HOVER = 30;
const STEP_LOAD = 60;
// Базовое число кадров скрембла (+ index%4 для разнобоя). Load длиннее.
const FRAMES_HOVER = 6;
const FRAMES_LOAD = 12;
// Запас сверх максимально долгой буквы, чтобы таймер гашения load не обрезал её.
const LOAD_MAX_FRAMES = FRAMES_LOAD + 3; // index%4 ∈ [0..3]
const LOAD_DURATION = LOAD_MAX_FRAMES * STEP_LOAD + 120;

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

export default function GlitchText({
  text,
  className,
  hoverGlitch = true,
  loadGlitch = false,
  ambient = false,
}: Props) {
  const { motion: motionOn } = useApp();
  const [hovered, setHovered] = useState(false);
  // Скрембл «на загрузке»: активен сразу после монтирования, гаснет навсегда.
  const [loadActive, setLoadActive] = useState(loadGlitch);
  const words = useMemo(() => toWords(text), [text]);

  useEffect(() => {
    if (!loadGlitch) return;
    const id = setTimeout(() => setLoadActive(false), LOAD_DURATION);
    return () => clearTimeout(id);
  }, [loadGlitch]);

  const active = ((hoverGlitch && hovered) || loadActive) && motionOn;
  // load-скрембл медленнее hover-скрембла — прокидываем в Char как `slow`.
  const slow = loadActive && motionOn;
  const sway = ambient && motionOn;

  return (
    // inline (не flex): заголовок остаётся в обычном текстовом потоке и
    // ПЕРЕНОСИТСЯ по словам — длинные фразы (Contact) больше не вылезают.
    <span
      className={className}
      onMouseEnter={hoverGlitch ? () => setHovered(true) : undefined}
      onMouseLeave={hoverGlitch ? () => setHovered(false) : undefined}
      data-cursor="hover"
    >
      {words.map((word, wi) => (
        <span key={wi}>
          {/* слово — неразрывный блок: буквы внутри не рвутся */}
          <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {word.chars.map(({ ch, i }) => (
              <Char key={i} char={ch} index={i} active={active} slow={slow} ambient={sway} stagger={motionOn} />
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
  slow,
  ambient,
  stagger,
}: {
  char: string;
  index: number;
  active: boolean;
  /** load-скрембл (Hero): медленнее и длиннее, чем hover (футер). */
  slow: boolean;
  ambient: boolean;
  stagger: boolean;
}) {
  const [display, setDisplay] = useState(char);

  useEffect(() => {
    if (!active) {
      setDisplay(char);
      return;
    }
    const step = slow ? STEP_LOAD : STEP_HOVER;
    const frames = slow ? FRAMES_LOAD : FRAMES_HOVER;
    let frame = 0;
    const max = frames + (index % 4);
    const id = setInterval(() => {
      frame++;
      if (frame >= max) {
        setDisplay(char);
        clearInterval(id);
      } else {
        setDisplay(randChar());
      }
    }, step);
    return () => clearInterval(id);
  }, [active, slow, char, index]);

  // Приоритет: ховер-скрембл > постоянное покачивание > покой.
  const anim = active
    ? { y: [0, -3, 1, 0], rotate: [0, -1, 1, 0] }
    : ambient
      ? { y: [0, -3, 0, 2, 0], rotate: [0, -1, 0, 1, 0] }
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
