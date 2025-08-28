'use client';

import React, { useEffect, useRef, useState } from 'react';
import ExportedImage from 'next-image-export-optimizer';

type Props = { mockRef: React.RefObject<HTMLDivElement | null> };

const FeatureItem: React.FC<{
  icon?: string;
  title: string;
  text: string;
  style?: React.CSSProperties;
  index: number;
}> = ({ icon, title, text, style, index }) => {
  return (
    <div
      className="w-full flex flex-col items-center text-center transition-all duration-700 opacity-0 translate-y-6 mb-6"
      style={style}
      data-reveal
    >
      {icon && (
        <div className="mb-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mx-auto rounded-xl p-2">
            <ExportedImage
              src={icon}
              alt={title}
              width={56}
              height={56}
              className="w-full h-full object-contain block"
            />
          </div>
        </div>
      )}
      <div className="text-base sm:text-lg font-extrabold leading-tight text-[#2D3B6F] mb-1">{title}</div>
      <div className="text-xs sm:text-sm font-normal text-gray-600 leading-relaxed max-w-xs mx-auto px-2">
        {text}
      </div>
    </div>
  );
};

export default function FeatureCircleSection({ mockRef }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  // Анимация появления пунктов
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('opacity-100', 'translate-y-0')),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Анимация заголовков - фиксируем после достижения центра
  useEffect(() => {
    const section = sectionRef.current;
    const titleElement = titleRef.current;
    const subtitleElement = subtitleRef.current;
    
    if (!section || !titleElement || !subtitleElement) return;

    const updateAnimation = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Прогресс видимости секции (0 - не видно, 1 - полностью видно)
      const visibilityProgress = Math.max(0, Math.min(1, 1 - rect.top / viewportHeight));
      
      if (!animationCompleted && visibilityProgress > 0.3) {
        // Быстрая анимация до центра в начале появления секции
        const progress = Math.min(1, visibilityProgress * 3); // Ускоряем анимацию
        
        const titleOffset = -600 + (progress * 600);
        const subtitleOffset = -500 + (progress * 500);
        
        titleElement.style.transform = `translateX(${titleOffset}px)`;
        subtitleElement.style.transform = `translateX(${subtitleOffset}px)`;
        
        // Когда достигли центра - фиксируем позицию
        if (progress >= 1) {
          setAnimationCompleted(true);
        }
      } else if (animationCompleted) {
        // После завершения анимации фиксируем позицию
        titleElement.style.transform = 'translateX(0)';
        subtitleElement.style.transform = 'translateX(0)';
      }
      
      animationRef.current = requestAnimationFrame(updateAnimation);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animationRef.current = requestAnimationFrame(updateAnimation);
        } else if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
          // Сбрасываем состояние анимации при выходе из viewport
          setAnimationCompleted(false);
        }
      },
      { threshold: 0 }
    );

    observer.observe(section);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      observer.disconnect();
    };
  }, [animationCompleted]);

  const features = [
    {
      icon: "/images/icons/24h.png",
      title: "24/7",
      text: "Автоматическая продажа путёвок без участия сотрудников"
    },
    {
      icon: "/images/icons/5min.png",
      title: "5 минут",
      text: "Среднее время оформления путёвки родителем"
    },
    {
      icon: "/images/icons/70pc.png",
      title: "На 70%",
      text: "Сокращение времени на документооборот"
    },
    {
      icon: "/images/icons/40pc.png",
      title: "До 40%",
      text: "Увеличение эффективности процессов"
    },
    {
      icon: "/images/icons/50pc.png",
      title: "До 50%",
      text: "Экономии на комиссиях за оплату"
    },
    {
      icon: "/images/icons/100pc.png",
      title: "На 100%",
      text: "Улучшенная система аналитики"
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-10 sm:py-14 lg:py-20 bg-[var(--bg-page,#fbf9fb)]"
    >
      <style>{`
        [data-reveal] {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .opacity-100 {
          opacity: 1 !important;
        }
        .translate-y-0 {
          transform: translateY(0) !important;
        }
        
        .slide-title {
          will-change: transform;
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .slide-subtitle {
          will-change: transform;
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s;
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Надзаголовок */}
        <div 
          ref={subtitleRef}
          className="slide-subtitle flex items-center justify-center mb-4 sm:mb-6"
          style={{ transform: 'translateX(-500px)' }}
        >
          <span className="inline-flex items-center py-1.5 px-3 rounded-full text-xs sm:text-sm font-medium bg-[#0D70DF]/10 text-[#0D70DF] text-center">
            <i className="fa-solid fa-gear mr-2 text-[#0D70DF]" />
            Совершенствуйте показатели
          </span>
        </div>

        {/* Заголовок */}
        <div 
          ref={titleRef}
          className="slide-title text-center mb-6 sm:mb-8 px-4"
          style={{ transform: 'translateX(-600px)' }}
        >
          <h2 className="lg:text-[42px] sm:text-2xl md:text-3xl font-bounded font-bold leading-tight tracking-tight text-[#4a4a4a] mb-3">
            <span>Надёжное решение</span>
            <span className="block mt-1">для детских лагерей</span>
          </h2>
        </div>

        {/* Мобильная версия - компактная сетка */}
        <div className="lg:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <FeatureItem
                key={index}
                icon={feature.icon}
                title={feature.title}
                text={feature.text}
                index={index}
                style={{ animationDelay: `${0.1 * index}s` }}
              />
            ))}
          </div>
        </div>

        {/* Десктопная версия - компактная */}
        <div className="hidden lg:block relative flex items-center justify-center min-h-[500px] lg:min-h-[600px]">
          {/* Уменьшенные SVG кольца */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <svg
              viewBox="0 0 1200 1000"
              className="w-[900px] h-[800px]"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden
            >
              <defs>
                <linearGradient id="ringsGradient" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0D70DF" />
                  <stop offset="100%" stopColor="#E63637" />
                </linearGradient>
              </defs>
              <g transform="translate(600,500)">
                <circle r="320" fill="none" stroke="url(#ringsGradient)" strokeWidth="2.5" strokeDasharray="16 20" strokeLinecap="round" strokeOpacity="0.5" />
                <circle r="240" fill="none" stroke="url(#ringsGradient)" strokeWidth="2" strokeDasharray="12 18" strokeLinecap="round" strokeOpacity="0.35" />
                <circle r="160" fill="none" stroke="url(#ringsGradient)" strokeWidth="1.5" strokeDasharray="8 14" strokeLinecap="round" strokeOpacity="0.25" />
              </g>
            </svg>
          </div>

          {/* Уменьшенный мокап */}
          <div className="relative z-20 flex items-center justify-center">
            <div
              ref={mockRef}
              className="w-[200px] sm:w-[260px] md:w-[320px] h-auto rounded-2xl pointer-events-none"
              style={{ height: 500, visibility: 'hidden' }}
            />
          </div>

          {/* Компактная левая колонка */}
          <div className="absolute left-0 top-0 bottom-0 w-[200px] z-20">
            <div className="relative h-full">
              <div className="absolute" style={{ left: '140px' }}>
                <DesktopFeatureItem
                  icon="/images/icons/24h.png"
                  title="24/7"
                  text="Автоматическая продажа путёвок"
                  side="left"
                />
              </div>
              <div className="absolute" style={{ top: '35%', left: '80px' }}>
                <DesktopFeatureItem
                  icon="/images/icons/5min.png"
                  title="5 минут"
                  text="Быстрое оформление путёвки"
                  side="left"
                />
              </div>
              <div className="absolute" style={{ top: '65%', left: '140px' }}>
                <DesktopFeatureItem
                  icon="/images/icons/70pc.png"
                  title="На 70%"
                  text="Сокращение документооборота"
                  side="left"
                />
              </div>
            </div>
          </div>

          {/* Компактная правая колонка */}
          <div className="absolute right-0 top-0 bottom-0 w-[200px] z-20">
            <div className="relative h-full">
              <div className="absolute" style={{ right: '140px' }}>
                <DesktopFeatureItem
                  icon="/images/icons/40pc.png"
                  title="До 40%"
                  text="Увеличение эффективности"
                  side="right"
                />
              </div>
              <div className="absolute" style={{ top: '35%', right: '80px' }}>
                <DesktopFeatureItem
                  icon="/images/icons/50pc.png"
                  title="До 50%"
                  text="Экономия на комиссиях"
                  side="right"
                />
              </div>
              <div className="absolute" style={{ top: '65%', right: '140px' }}>
                <DesktopFeatureItem
                  icon="/images/icons/100pc.png"
                  title="На 100%"
                  text="Улучшенная аналитика"
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

// Компактная версия для десктопа
const DesktopFeatureItem: React.FC<{
  icon?: string;
  title: string;
  text: string;
  side?: 'left' | 'right';
  style?: React.CSSProperties;
}> = ({ icon, title, text, side = 'left', style }) => {
  const isLeft = side === 'left';
  return (
    <div
      className={`w-[160px] flex flex-col transition-all duration-700 opacity-0 translate-y-6 ${
        !isLeft ? 'text-right' : ''
      }`}
      style={style}
      data-reveal
    >
      {icon && (
        <div className={`${isLeft ? 'self-start' : 'self-end'} mb-1`}>
          <div className="w-10 h-10 flex items-center justify-center">
            <ExportedImage
              src={icon}
              alt={title}
              width={40}
              height={40}
              className="w-10 h-10 object-contain block"
            />
          </div>
        </div>
      )}
      <div className="text-[16px] font-extrabold leading-tight text-[#2D3B6F]">{title}</div>
      <div className="text-[11px] font-normal text-gray-600 mt-0.5 leading-snug">{text}</div>
    </div>
  );
};