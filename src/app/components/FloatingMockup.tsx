'use client';

import React, { useEffect, useRef } from 'react';
import ExportedImage from 'next-image-export-optimizer';

type Props = {
  src: string;
  alt?: string;
  startRef: React.RefObject<HTMLElement | null>;
  endRef: React.RefObject<HTMLElement | null>;
};

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
// простой ease (smoothstep)
const ease = (t: number) => t * t * (3 - 2 * t);

export default function FloatingMockup({ src, alt = '', startRef, endRef }: Props) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    // безопасные baseline стили (используем backgroundColor, не shorthand)
    el.style.backgroundColor = 'transparent';
    el.style.outline = 'none';
    el.style.border = 'none';
    el.style.pointerEvents = 'none';
    el.style.backfaceVisibility = 'hidden';

    let startRect: DOMRect | null = null;
    let endRect: DOMRect | null = null;

    function updateRects() {
      startRect = startRef.current?.getBoundingClientRect() ?? null;
      endRect = endRef.current?.getBoundingClientRect() ?? null;
    }

    function frame() {
      if (!startRect || !endRect) {
        updateRects();
        rafRef.current = requestAnimationFrame(frame);
        return;
      }

      const scrollY = window.scrollY || window.pageYOffset;
      const viewportCenterY = scrollY + window.innerHeight / 2;

      const startCenterAbs = {
        x: (startRect.left + startRect.right) / 2 + (window.scrollX || window.pageXOffset),
        y: (startRect.top + startRect.bottom) / 2 + (window.scrollY || window.pageYOffset),
      };
      const endCenterAbs = {
        x: (endRect.left + endRect.right) / 2 + (window.scrollX || window.pageXOffset),
        y: (endRect.top + endRect.bottom) / 2 + (window.scrollY || window.pageYOffset),
      };

      const startTopAbs = startCenterAbs.y;
      const endTopAbs = endCenterAbs.y || startTopAbs + 1; // avoid div by zero

      let tRaw = clamp((viewportCenterY - startTopAbs) / (endTopAbs - startTopAbs || 1), 0, 1);
      const t = ease(tRaw);

      // guard sizes: если endRect имеет 0 ширину/высоту — используем startRect как fallback
      const startW = startRect.width || 400;
      const startH = startRect.height || (startW * 1.6); // портретный планшет
      const endW = endRect.width || startW;
      const endH = endRect.height || startH;

      // интерполируем по eased t
      const curW = lerp(startW, endW, t);
      const curH = lerp(startH, endH, t);

      const curX = lerp(startCenterAbs.x, endCenterAbs.x, t);
      const curY = lerp(startCenterAbs.y, endCenterAbs.y, t);

      const left = curX - curW / 2;
      const top = curY - curH / 2;

      // применяем размеры и позиционирование
      el.style.width = `${Math.max(48, curW)}px`;
      el.style.height = `${Math.max(48, curH)}px`;
      el.style.transform = `translate3d(${left}px, ${top}px, 0)`;

      // drop-shadow с плавным изменением
      const shadowLight = 'drop-shadow(0 20px 40px rgba(15,23,42,0.10))';
      const shadowStrong = 'drop-shadow(0 34px 90px rgba(15,23,42,0.12))';
      el.style.filter = tRaw < 0.6 ? shadowLight : shadowStrong;

      rafRef.current = requestAnimationFrame(frame);
    }

    updateRects();
    rafRef.current = requestAnimationFrame(frame);

    function onScrollResize() {
      updateRects();
    }

    window.addEventListener('resize', onScrollResize);
    window.addEventListener('scroll', onScrollResize, { passive: true });

    const ro = new ResizeObserver(() => updateRects());
    if (startRef.current) ro.observe(startRef.current);
    if (endRef.current) ro.observe(endRef.current);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onScrollResize);
      window.removeEventListener('scroll', onScrollResize);
      ro.disconnect();
    };
  }, [startRef, endRef]);

  return (
    <div
      ref={elRef}
      aria-hidden
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        pointerEvents: 'none',
        zIndex: 60,
        willChange: 'transform, width, height, filter',
        transition: 'filter 160ms linear',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '24px',
          overflow: 'hidden',
          backgroundColor: 'transparent',
        }}
      >
        <ExportedImage
          src={src}
          alt={alt}
          width={800}
          height={1200}
          className="w-full h-full object-contain block"
          style={{ display: 'block', backgroundColor: 'transparent' }}
        />
      </div>
    </div>
  );
}
