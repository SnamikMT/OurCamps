'use client';

import React, { useEffect, useRef, useState } from 'react';
import ExportedImage from 'next-image-export-optimizer';

type Props = { mockRef: React.RefObject<HTMLDivElement | null> };

const FeatureItemVert: React.FC<{
  icon?: string;
  title: string;
  text: string;
  side?: 'left' | 'right';
  style?: React.CSSProperties;
}> = ({ icon, title, text, side = 'left', style }) => {
  const isLeft = side === 'left';
  return (
    <div
      className={`w-[220px] flex flex-col transition-all duration-700 opacity-0 translate-y-6 ${
        !isLeft ? 'text-right' : ''
      }`}
      style={style}
      data-reveal
    >
      {icon && (
        <div className={`${isLeft ? 'self-start' : 'self-end'} mb-2`}>
          <div className="w-[56px] h-[56px] flex items-center justify-center">
            <ExportedImage
              src={icon}
              alt={title}
              width={56}
              height={56}
              className="w-[56px] h-[56px] object-contain block"
            />
          </div>
        </div>
      )}
      <div className="text-[20px] font-extrabold leading-tight text-[#2D3B6F]">{title}</div>
      <div className="text-[13px] font-normal text-gray-600 mt-1 leading-snug">{text}</div>
    </div>
  );
};

export default function FeatureCircleSection({ mockRef }: Props) {
  // анимация появления пунктов
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('opacity-100', 'translate-y-0')),
      { threshold: 0.2 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // скролл-прогресс секции для сдвига заголовков
  const sectionRef = useRef<HTMLElement | null>(null);
  const [p, setP] = useState(0); // 0..1

  useEffect(() => {
    let raf: number | null = null;
    const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const sec = sectionRef.current;
        if (!sec) return;
        const r = sec.getBoundingClientRect();
        const viewportMid = window.innerHeight * 0.5;
        const secMid = r.top + r.height * 0.5;
        const t = clamp(1 - Math.abs(secMid - viewportMid) / (window.innerHeight * 0.6));
        setP(t);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  // увеличенный размах движения
  const titleStyle = {
    transform: `translateX(${lerp(-280, 0, p)}px)`,
    opacity: lerp(0.85, 1, p),
    transition: 'transform 0.08s linear, opacity 0.08s linear',
  } as React.CSSProperties;

  const subtitleStyle = {
    transform: `translateX(${lerp(-200, 0, p)}px)`,
    opacity: lerp(0.9, 1, p),
    transition: 'transform 0.08s linear, opacity 0.08s linear',
  } as React.CSSProperties;

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-[var(--bg-page,#fbf9fb)]"
    >
      <style>{`
        [data-reveal]{opacity:0;transform:translateY(20px)}
        .opacity-100{opacity:1!important}
        .translate-y-0{transform:translateY(0)!important}
      `}</style>

      <div className="container mx-auto px-4 lg:px-8">
        {/* Надзаголовок */}
        <div className="flex items-center justify-center mb-6">
          <span
            className="inline-flex items-center py-1.5 px-4 rounded-full text-sm sm:text-base font-medium bg-[#0D70DF]/10 text-[#0D70DF]"
            style={subtitleStyle}
          >
            <i className="fa-solid fa-gear mr-2 text-[#0D70DF]" />
            Совершенствуйте показатели по всем направлениям
          </span>
        </div>

        {/* Заголовок */}
        <div className="text-center mb-10 sm:mb-14" style={titleStyle}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bounded font-bold leading-tight tracking-tight" style={{ color: '#4a4a4a' }}>
            <span>Надёжное решение</span>
            <span className="block">для детских лагерей</span>
          </h2>
        </div>

        {/* Сцена */}
        <div className="relative flex items-center justify-center min-h-[760px] lg:min-h-[920px]">
          {/* SVG кольца */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <svg
              viewBox="0 0 1600 1400"
              className="w-[1400px] h-[1200px]"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden
            >
              <defs>
                <linearGradient id="ringsGradient" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0D70DF" />
                  <stop offset="100%" stopColor="#E63637" />
                </linearGradient>
              </defs>
              <g transform="translate(800,700)">
                <circle r="480" fill="none" stroke="url(#ringsGradient)" strokeWidth="3" strokeDasharray="16 20" strokeLinecap="round" strokeOpacity="0.5" />
                <circle r="350" fill="none" stroke="url(#ringsGradient)" strokeWidth="2" strokeDasharray="12 18" strokeLinecap="round" strokeOpacity="0.35" />
                <circle r="220" fill="none" stroke="url(#ringsGradient)" strokeWidth="1.5" strokeDasharray="8 14" strokeLinecap="round" strokeOpacity="0.25" />
              </g>
            </svg>
          </div>

          {/* Мокап */}
          <div className="relative z-20 flex items-center justify-center">
            <div
              ref={mockRef}
              className="w-[260px] sm:w-[340px] md:w-[420px] lg:w-[520px] h-auto rounded-3xl pointer-events-none"
              style={{ height: 760, visibility: 'hidden' }}
            />
          </div>

          {/* Левая колонка (заходит на дуги) */}
          <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[280px] z-20">
            <div className="relative h-full">
              <div className="absolute" style={{ top: '14%', left: '60px' }}>
                <FeatureItemVert
                  icon="/images/icons/24h.png"
                  title="24/7"
                  text="Система автономно продаёт и оформляет путёвки без участия сотрудников"
                  side="left"
                />
              </div>
              <div className="absolute" style={{ top: '44%', left: '50px' }}>
                <FeatureItemVert
                  icon="/images/icons/5min.png"
                  title="5 минут"
                  text="Среднее время, которое родитель тратит на оформление и оплату путёвки"
                  side="left"
                />
              </div>
              <div className="absolute" style={{ top: '72%', left: '60px' }}>
                <FeatureItemVert
                  icon="/images/icons/70pc.png"
                  title="На 70%"
                  text="Сокращается время на формирование документооборота смены"
                  side="left"
                />
              </div>
            </div>
          </div>

          {/* Правая колонка (заходит на дуги) */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[280px] z-20">
            <div className="relative h-full">
              <div className="absolute" style={{ top: '14%', right: '60px' }}>
                <FeatureItemVert
                  icon="/images/icons/40pc.png"
                  title="До 40%"
                  text="Увеличение эффективности типовых процессов лагеря"
                  side="right"
                />
              </div>
              <div className="absolute" style={{ top: '44%', right: '50px' }}>
                <FeatureItemVert
                  icon="/images/icons/50pc.png"
                  title="До 50%"
                  text="Экономии на комиссиях при приёме оплаты за путёвки"
                  side="right"
                />
              </div>
              <div className="absolute" style={{ top: '72%', right: '60px' }}>
                <FeatureItemVert
                  icon="/images/icons/100pc.png"
                  title="На 100%"
                  text="Улучшенная система аналитики"
                  side="right"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
