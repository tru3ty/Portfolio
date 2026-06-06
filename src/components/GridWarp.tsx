'use client';

import { useEffect, useRef } from 'react';
import { useApp } from '../AppContext';

/**
 * Интерактивный фон Hero: сетка линий, которые изгибаются вокруг курсора
 * (эффект гравитационной линзы). Рисуется на canvas.
 *
 * Уважает motion-флаг: при выключенных анимациях рисуется статичная ровная
 * сетка без интерактива. Цвет берётся из --text (тема), плотность и opacity
 * повторяют прежний CSS-фон.
 */
const GRID = 80; // шаг сетки, px (как было backgroundSize: 80px)
const SEG = 10; // сегментов между узлами линии — чем больше, тем плавнее изгиб
const RADIUS = 180; // радиус влияния курсора, px
const STRENGTH = 26; // максимальное смещение линии к/от курсора, px (сдержанно)

export default function GridWarp() {
  const { motion } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    // целевая позиция курсора и сглаженная (lerp) — плавное следование
    const target = { x: -9999, y: -9999 };
    const cur = { x: -9999, y: -9999 };
    let strength = 0; // 0..1 — затухание эффекта когда курсор вне зоны
    let rafId = 0;

    const lineColor = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#1a1814';

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // смещение точки (px,py) под действием «гравитации» курсора
    const warp = (px: number, py: number) => {
      if (strength <= 0.001) return { x: px, y: py };
      const dx = px - cur.x;
      const dy = py - cur.y;
      const dist = Math.hypot(dx, dy);
      if (dist > RADIUS || dist < 0.0001) return { x: px, y: py };
      // плавное затухание от центра к краю радиуса (cos-falloff)
      const f = Math.cos((dist / RADIUS) * (Math.PI / 2)); // 1 в центре → 0 на краю
      const push = f * f * STRENGTH * strength;
      // линии «втягиваются» к курсору — эффект воронки/линзы
      const nx = dx / dist;
      const ny = dy / dist;
      return { x: px - nx * push, y: py - ny * push };
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      ctx.strokeStyle = lineColor();
      ctx.globalAlpha = 0.07;

      // вертикальные линии
      for (let x = 0; x <= w + GRID; x += GRID) {
        ctx.beginPath();
        for (let i = 0; i <= SEG; i++) {
          const py = (h / SEG) * i;
          const p = warp(x, py);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      // горизонтальные линии
      for (let y = 0; y <= h + GRID; y += GRID) {
        ctx.beginPath();
        for (let i = 0; i <= SEG; i++) {
          const px = (w / SEG) * i;
          const p = warp(px, y);
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const tick = () => {
      // плавно подтягиваем сглаженный курсор к цели
      cur.x += (target.x - cur.x) * 0.18;
      cur.y += (target.y - cur.y) * 0.18;
      draw();
      rafId = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      strength = 1;
    };
    const onLeave = () => {
      strength = 0;
    };

    resize();
    // если motion off — рисуем один раз ровную сетку и выходим (без RAF/слушателей)
    if (!motion) {
      strength = 0;
      draw();
      const onResizeStatic = () => {
        resize();
        draw();
      };
      window.addEventListener('resize', onResizeStatic);
      return () => window.removeEventListener('resize', onResizeStatic);
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('resize', resize);
    canvas.addEventListener('mouseleave', onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, [motion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 w-full h-full"
      style={{ maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)' }}
    />
  );
}
