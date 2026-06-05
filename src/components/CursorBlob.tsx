'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useApp } from '../AppContext';

export default function CursorBlob() {
  const { motion: motionOn } = useApp();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const xs = useSpring(x, { stiffness: 200, damping: 22, mass: 0.4 });
  const ys = useSpring(y, { stiffness: 200, damping: 22, mass: 0.4 });
  const dotX = useSpring(x, { stiffness: 600, damping: 30, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 600, damping: 30, mass: 0.2 });
  const stateRef = useRef<'default' | 'hover'>('default');
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!motionOn) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor="hover"]');
      const next: 'default' | 'hover' = interactive ? 'hover' : 'default';
      if (next !== stateRef.current && blobRef.current) {
        stateRef.current = next;
        blobRef.current.dataset.state = next;
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [motionOn, x, y]);

  if (!motionOn) return null;

  return (
    <>
      <motion.div
        ref={blobRef}
        data-state="default"
        className="pointer-events-none fixed z-[9998] hidden md:block"
        style={{
          left: xs,
          top: ys,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div
          className="rounded-full transition-[width,height,background,border,opacity] duration-200 ease-out"
          style={{
            width: 'var(--blob-size, 28px)',
            height: 'var(--blob-size, 28px)',
            border: '1.5px solid var(--accent)',
            mixBlendMode: 'difference' as const,
            opacity: 0.85,
          }}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed z-[9999] hidden md:block w-1 h-1 rounded-full"
        style={{
          left: dotX,
          top: dotY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'var(--accent)',
        }}
      />
      <style>{`
        [data-state="hover"] > div { width: 56px !important; height: 56px !important; opacity: 0.6 !important; }
      `}</style>
    </>
  );
}
