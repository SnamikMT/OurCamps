'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import ExportedImage from 'next-image-export-optimizer';
import { useModal } from '../contexts/ModalContext';
import { prefix } from '@/lib/prefix';

type Props = {
  /** Плейсхолдер для внешнего FloatingMockup */
  mockRef: React.RefObject<HTMLDivElement | null>;
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const HeroSection: React.FC<Props> = ({ mockRef }) => {
  const { openModal } = useModal();

  const bgRef = useRef<HTMLDivElement | null>(null);
  const backTabletRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openModal();
  };

  // Анимация появления блоков
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!targets.length) return;

    if (prefersReduced) {
      targets.forEach((el) => el.classList.add('revealed'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('revealed');
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Задний планшет уезжает вправо при скролле
  useEffect(() => {
    const sec = sectionRef.current;
    const el = backTabletRef.current;
    if (!sec || !el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = sec.getBoundingClientRect();
        const h = Math.max(rect.height, 1);
        const viewport = window.innerHeight || 1;
        const span = viewport + h;
        const progress = clamp(1 - rect.bottom / span, 0, 1);

        const vw = window.innerWidth;
        const maxShift = vw >= 1280 ? 140 : vw >= 1024 ? 100 : vw >= 768 ? 70 : 30;

        const eased = 1 - Math.pow(1 - progress, 2);
        const shiftX = eased * maxShift;

        el.style.transform = `translateX(${shiftX}px) rotate(6deg)`;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pt-12 sm:pt-16 md:pt-20 lg:pt-12 pb-16 sm:pb-24 md:pb-32 lg:pb-40"
    >
      {/* Локальные стили для reveal-анимации */}
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        [data-reveal] { opacity: 0; transform: translateY(14px); will-change: opacity, transform; }
        .revealed { animation: fadeUp .55s ease-out forwards; }
        [data-reveal].delay-1.revealed { animation-delay: .08s; }
        [data-reveal].delay-2.revealed { animation-delay: .16s; }
        [data-reveal].delay-3.revealed { animation-delay: .24s; }
      `}</style>

      {/* Фон справа */}
      <div ref={bgRef} className="absolute top-0 right-0 h-full -z-20 pointer-events-none">
        <ExportedImage
          src={`${prefix}/images/hero-bg.svg`}
          alt="Декоративный фон"
          width={1600}
          height={1200}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-16">
        {/* Левый блок */}
        <div className="w-full lg:w-6/12 max-w-2xl">
          <h1
            data-reveal
            className="font-bounded text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight"
          >
            <span className="gradient-text">Система продаж</span>
            <span className="block">и управления детским лагерем</span>
          </h1>

          <p
            data-reveal
            className="delay-1 text-gray-600 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed max-w-[60ch]"
          >
            Наши лагеря — это эффективное программное обеспечение для управления детским лагерем и
            процессом продажи путёвок, которое объединяет все аспекты вашего учреждения в одной
            простой, но мощной системе.
          </p>

          <div data-reveal className="delay-2 flex flex-col xs:flex-row sm:flex-row gap-3 sm:gap-4">
            <a
              href="#contact"
              onClick={handleContactClick}
              className="gradient-bg text-white font-semibold py-3 sm:py-3.5 px-6 sm:px-7 rounded-full shadow-button hover:shadow-button-hover transform hover:-translate-y-0.5 transition-all text-center btn-animated"
            >
              Связаться с нами
            </a>

            <Link
              href="#features"
              className="border border-gray-300 text-gray-700 hover:text-primary-blue font-semibold py-3 sm:py-3.5 px-6 sm:px-7 rounded-full hover:border-primary-blue transition-all text-center flex items-center justify-center group bg-white/70 backdrop-blur-[1px]"
            >
              Узнать подробнее
              <i className="fa-solid fa-arrow-down ml-2 transform group-hover:translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Правая колонка */}
        <div data-reveal className="delay-3 w-full lg:w-6/12 flex justify-center lg:justify-end relative">
          <div className="relative w-full max-w-[560px] lg:max-w-[640px]">
            {/* Задний планшет — уезжает вправо при скролле */}
            <div
              ref={backTabletRef}
              className="absolute top-6 right-[-56px] w-[62%] md:w-[66%] lg:w-[68%] -z-10 rotate-[6deg] will-change-transform hidden sm:block"
            >
              <ExportedImage
                src={`${prefix}/images/hero-tablet-secondary.png`}
                alt="Дополнительный планшет"
                width={700}
                height={700}
                className="w-full h-auto object-contain drop-shadow-xl"
                priority
              />
            </div>

            {/* Плейсхолдер для FloatingMockup */}
            <div
              ref={mockRef}
              className="mx-auto rounded-3xl pointer-events-none"
              style={{
                width: 480,
                height: 600,
                maxWidth: '100%',
                visibility: 'hidden',
              }}
            />

            {/* noscript fallback */}
            <noscript>
              <div className="mt-6">
                <img
                  src={`${prefix}/images/hero-tablet.svg`}
                  alt="Интерфейс системы (статичный мокап)"
                  width={420}
                  height={720}
                  style={{ maxWidth: '100%', height: 'auto', borderRadius: 24 }}
                />
              </div>
            </noscript>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
