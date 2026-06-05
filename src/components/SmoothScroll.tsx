'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { useApp } from '../AppContext';

/**
 * Глобальный плавный скролл на Lenis.
 * Рендерит null — только управляет инстансом.
 *
 * Уважает motion-тумблер: когда анимации выключены (вручную или через
 * системный prefers-reduced-motion, см. AppContext), Lenis не запускается,
 * чтобы скролл оставался нативным и мгновенным.
 */
export default function SmoothScroll() {
  const { motion } = useApp();

  useEffect(() => {
    if (!motion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [motion]);

  return null;
}
