'use client';

import { useRef, ReactNode, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useApp } from '../AppContext';

interface Props {
  children: ReactNode;
  strength?: number;
  className?: string;
  as?: 'div' | 'button' | 'a';
  href?: string;
  target?: string;
  onClick?: () => void;
}

export default function Magnetic({
  children,
  strength = 0.3,
  className,
  as = 'div',
  href,
  target,
  onClick,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const { motion: motionOn } = useApp();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xs = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const ys = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: MouseEvent) => {
    if (!motionOn || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = motion[as as 'div'] as typeof motion.div;
  const extra: Record<string, unknown> = { href, target, onClick };

  return (
    <Component
      ref={ref as never}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: xs, y: ys }}
      className={className}
      {...extra}
    >
      {children}
    </Component>
  );
}
