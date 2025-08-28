'use client';

import React, { useEffect, useRef, useState } from 'react';
import ExportedImage from 'next-image-export-optimizer';

type Props = {
  src: string;
  alt?: string;
  startRef: React.RefObject<HTMLElement | null>;
  endRef: React.RefObject<HTMLElement | null>;
};

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => t * t * (3 - 2 * t);

export default function FloatingMockup({ src, alt = '', startRef, endRef }: Props) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Проверяем, мобильное ли устройство при монтировании
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // На сервере ничего не делаем
    if (typeof window === 'undefined') return;

    const el = elRef.current;
    if (!el) return;

    // baseline стили
    el.style.backgroundColor = 'transparent';
    el.style.outline = 'none';
    el.style.border = 'none';
    el.style.pointerEvents = 'none';
    el.style.backfaceVisibility = 'hidden';

    // Если мобильное устройство - статичное позиционирование
    if (isMobile) {
      const startRect = startRef.current?.getBoundingClientRect();
      if (startRect) {
        const scrollX = window.scrollX || window.pageXOffset;
        const scrollY = window.scrollY || window.pageYOffset;
        
        const startCenterAbs = {
          x: (startRect.left + startRect.right) / 2 + scrollX,
          y: (startRect.top + startRect.bottom) / 2 + scrollY,
        };

        const startW = Math.min(300, startRect.width || 300);
        const startH = startW * 1.6;

        const left = startCenterAbs.x - startW / 2;
        const top = startCenterAbs.y - startH / 2;

        el.style.width = `${startW}px`;
        el.style.height = `${startH}px`;
        el.style.transform = `translate3d(${left}px, ${top}px, 0)`;
        el.style.filter = 'drop-shadow(0 20px 40px rgba(15,23,42,0.10))';
        el.style.position = 'absolute';
      }
      return; // Завершаем выполнение для мобильных
    }

    // Оригинальная логика для десктопов
    let startRect: DOMRect | null = null;
    let endRect: DOMRect | null = null;

    function updateRects() {
      startRect = startRef.current?.getBoundingClientRect() ?? null;
      endRect = endRef.current?.getBoundingClientRect() ?? null;
    }

    function frame() {
      // Берём узел заново и выходим, если размонтировался
      const elNow = elRef.current;
      if (!elNow) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        return;
      }

      if (!startRect || !endRect) {
        updateRects();
        rafRef.current = requestAnimationFrame(frame);
        return;
      }

      const scrollX = window.scrollX || window.pageXOffset;
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportCenterY = scrollY + window.innerHeight / 2;

      const startCenterAbs = {
        x: (startRect.left + startRect.right) / 2 + scrollX,
        y: (startRect.top + startRect.bottom) / 2 + scrollY,
      };
      const endCenterAbs = {
        x: (endRect.left + endRect.right) / 2 + scrollX,
        y: (endRect.top + endRect.bottom) / 2 + scrollY,
      };

      const startTopAbs = startCenterAbs.y;
      const endTopAbs = endCenterAbs.y || startTopAbs + 1;

      const tRaw = clamp((viewportCenterY - startTopAbs) / (endTopAbs - startTopAbs || 1), 0, 1);
      const t = ease(tRaw);

      const startW = startRect.width || 400;
      const startH = startRect.height || startW * 1.6;
      const endW = endRect.width || startW;
      const endH = endRect.height || startH;

      const curW = lerp(startW, endW, t);
      const curH = lerp(startH, endH, t);
      const curX = lerp(startCenterAbs.x, endCenterAbs.x, t);
      const curY = lerp(startCenterAbs.y, endCenterAbs.y, t);

      const left = curX - curW / 2;
      const top = curY - curH / 2;

      // Применяем стили к актуальному узлу
      elNow.style.width = `${Math.max(48, curW)}px`;
      elNow.style.height = `${Math.max(48, curH)}px`;
      elNow.style.transform = `translate3d(${left}px, ${top}px, 0)`;
      elNow.style.position = 'absolute';

      const shadowLight = 'drop-shadow(0 20px 40px rgba(15,23,42,0.10))';
      const shadowStrong = 'drop-shadow(0 34px 90px rgba(15,23,42,0.12))';
      elNow.style.filter = tRaw < 0.6 ? shadowLight : shadowStrong;

      rafRef.current = requestAnimationFrame(frame);
    }

    updateRects();
    rafRef.current = requestAnimationFrame(frame);

    function onScrollResize() {
      // На мобильных не обновляем при скролле
      if (!isMobile) {
        updateRects();
      }
    }

    window.addEventListener('resize', onScrollResize);
    if (!isMobile) {
      window.addEventListener('scroll', onScrollResize, { passive: true });
    }

    const ro = 'ResizeObserver' in window ? new ResizeObserver(() => {
      if (!isMobile) {
        updateRects();
      }
    }) : null;
    
    if (ro) {
      if (startRef.current) ro.observe(startRef.current);
      if (endRef.current) ro.observe(endRef.current);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onScrollResize);
      window.removeEventListener('scroll', onScrollResize);
      ro?.disconnect();
    };
  }, [startRef, endRef, isMobile]); // Добавляем isMobile в зависимости

  return (
    <div
      ref={elRef}
      aria-hidden
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 10,
        willChange: 'transform, width, height, filter',
        transition: 'filter 160ms linear',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 24,
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