'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

type Mode = 'fixed' | 'static' | 'autohide';

type Props = {
  text?: string;
  ctaText?: string;
  ctaHref?: string;
  /** 'fixed' (по умолчанию), 'static' (скроллится), 'autohide' (фикс + скрывается вниз/вверх) */
  mode?: Mode;
  storageKey?: string;
  expireDays?: number;
};

const GRAD_BG = 'bg-gradient-to-r from-[#0D70DF] via-[#6A5DD6] to-[#E63637]';

export default function TopAnnouncementBar({
  text = 'ЗАПИШИТЕСЬ НА ДЕМОНСТРАЦИЮ СИСТЕМЫ ЧТОБЫ ПОЛУЧИТЬ МАКСИМАЛЬНУЮ ВЫГОДУ',
  ctaText = 'ЗАПИСАТЬСЯ',
  ctaHref = '#contact',
  mode = 'fixed',
  storageKey = 'announcementBarDismissed',
  expireDays = 7,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [hiddenByScroll, setHiddenByScroll] = useState(false); // для autohide
  const barRef = useRef<HTMLDivElement | null>(null);
  const [barH, setBarH] = useState(0);

  // показать, если не закрыт ранее
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const saved = JSON.parse(raw) as { ts: number };
        const ms = expireDays * 24 * 60 * 60 * 1000;
        if (Date.now() - saved.ts < ms) return;
      }
    } catch {}
    setVisible(true);
  }, [storageKey, expireDays]);

  // измеряем фактическую высоту бара (для спейсера)
  useLayoutEffect(() => {
    if (!visible || mode === 'static') return setBarH(0);
    const m = () => setBarH(barRef.current?.offsetHeight ?? 0);
    m();
    window.addEventListener('resize', m);
    return () => window.removeEventListener('resize', m);
  }, [visible, mode]);

  // autohide: прячем при скролле вниз, показываем при скролле вверх
  useEffect(() => {
    if (!(visible && mode === 'autohide')) return;
    let lastY = window.scrollY;
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        const goingDown = y > lastY;
        const passed = y > 40; // начинаем автоскрытие после 40px
        setHiddenByScroll(goingDown && passed);
        lastY = y;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [visible, mode]);

  const close = () => {
    setVisible(false);
    try {
      localStorage.setItem(storageKey, JSON.stringify({ ts: Date.now() }));
    } catch {}
  };

  if (!visible) return null;

  const fixedLike = mode !== 'static'; // fixed или autohide
  const fixedClasses = fixedLike ? 'fixed top-0 left-0 z-[60]' : 'relative';

  return (
    <>
      <style>{`
        @keyframes slideDown { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .autohide-hidden { transform: translateY(-100%); }
        .autohide-trans { transition: transform .25s ease, opacity .25s ease; }
      `}</style>

      {/* Плашка */}
      <div
        ref={barRef}
        className={[
          'w-full text-white',
          GRAD_BG,
          'border-b border-white/10 shadow-[0_6px_24px_rgba(13,112,223,0.25)]',
          fixedClasses,
          'animate-[slideDown_.35s_ease-out]',
          mode === 'autohide' ? 'autohide-trans' : '',
          mode === 'autohide' && hiddenByScroll ? 'autohide-hidden' : '',
        ].join(' ')}
      >
        {/* Совпадаем по краям с шапкой */}
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-3 sm:gap-4 py-2 sm:py-2.5">
            <p className="flex-1 text-[13px] sm:text-[15px] lg:text-[16px] font-semibold tracking-wide leading-snug uppercase">
              {text}
            </p>

            <a
              href={ctaHref}
              className="shrink-0 inline-flex items-center rounded-full px-3 sm:px-4 py-1.5 text-[12px] sm:text-[13px] font-semibold bg-white/15 hover:bg-white/25 transition whitespace-nowrap"
            >
              {ctaText}
            </a>

            <button
              aria-label="Закрыть уведомление"
              onClick={close}
              className="ml-1 shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/90">
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Спейсер — равен реальной высоте бара (чтобы sticky-хедер не перекрывался) */}
      {fixedLike && <div aria-hidden style={{ height: barH }} />}
    </>
  );
}
