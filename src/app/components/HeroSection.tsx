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

  // Задний планшет уезжает вправо при скролле (только для десктопных устройств)
  useEffect(() => {
    const sec = sectionRef.current;
    const el = backTabletRef.current;
    if (!sec || !el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Отключаем анимацию на мобильных устройствах
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      el.style.transform = '';
      return;
    }

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
        const maxShift = vw >= 1280 ? 140 : vw >= 1024 ? 100 : vw >= 768 ? 70 : 0;

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
      className="relative overflow-hidden pt-8 sm:pt-12 md:pt-16 lg:pt-12 pb-12 sm:pb-20 md:pb-28 lg:pb-40"
    >
      {/* Локальные стили для reveal-анимации */}
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        [data-reveal] { opacity: 0; transform: translateY(14px); will-change: opacity, transform; }
        .revealed { animation: fadeUp .55s ease-out forwards; }
        [data-reveal].delay-1.revealed { animation-delay: .08s; }
        [data-reveal].delay-2.revealed { animation-delay: .16s; }
        [data-reveal].delay-3.revealed { animation-delay: .24s; }
        
        /* Адаптивные стили для мобильных устройств */
        @media (max-width: 1024px) {
          .mobile-hero-bg {
            display: block;
          }
          .desktop-hero-bg {
            display: none;
          }
          .mobile-gradient-bg {
            background: linear-gradient(135deg, rgba(13, 112, 223, 0.03) 0%, rgba(230, 54, 55, 0.03) 100%);
          }
        }
        
        @media (min-width: 1025px) {
          .mobile-hero-bg {
            display: none;
          }
          .desktop-hero-bg {
            display: block;
          }
        }
        
        /* Декоративные элементы для мобильной версии */
        .floating-circle {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(13, 112, 223, 0.1) 0%, rgba(230, 54, 55, 0.1) 100%);
          animation: float 6s ease-in-out infinite;
        }
        
        .floating-circle:nth-child(1) {
          width: 80px;
          height: 80px;
          top: 20%;
          right: 10%;
          animation-delay: 0s;
        }
        
        .floating-circle:nth-child(2) {
          width: 60px;
          height: 60px;
          top: 60%;
          right: 20%;
          animation-delay: 2s;
        }
        
        .floating-circle:nth-child(3) {
          width: 40px;
          height: 40px;
          top: 40%;
          right: 5%;
          animation-delay: 4s;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
      `}</style>

      {/* Фон для десктопов */}
      <div ref={bgRef} className="desktop-hero-bg absolute top-0 right-0 h-full -z-20 pointer-events-none">
        <ExportedImage
          src={`${prefix}/images/hero-bg.svg`}
          alt="Декоративный фон"
          width={1600}
          height={1200}
          className="w-full h-full object-cover"
          priority
          sizes="(max-width: 1024px) 0vw, 50vw"
        />
      </div>

      {/* Альтернативный фон для мобильных */}
      <div className="mobile-hero-bg absolute inset-0 -z-20 pointer-events-none mobile-gradient-bg">
        {/* Декоративные плавающие круги */}
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        <div className="floating-circle"></div>
        
        {/* Светлый градиентный overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-16">
        {/* Левый блок */}
        <div className="w-full lg:w-6/12 max-w-2xl text-center lg:text-left">
          <h1
            data-reveal
            className="font-bounded text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight"
          >
            <span className="gradient-text">Система продаж</span>
            <span className="block mt-1 sm:mt-2">и управления детским лагерем</span>
          </h1>

          <p
            data-reveal
            className="delay-1 text-gray-600 text-sm sm:text-base md:text-lg mb-5 sm:mb-7 md:mb-8 leading-relaxed max-w-[60ch] mx-auto lg:mx-0"
          >
            Наши лагеря — это эффективное программное обеспечение для управления детским лагерем и
            процессом продажи путёвок, которое объединяет все аспекты вашего учреждения в одной
            простой, но мощной системе.
          </p>

          <div data-reveal className="delay-2 flex flex-col xs:flex-row sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
            <a
              href="#contact"
              onClick={handleContactClick}
              className="gradient-bg text-white font-semibold py-2.5 xs:py-3 sm:py-3.5 px-5 sm:px-6 md:px-7 rounded-full shadow-button hover:shadow-button-hover transform hover:-translate-y-0.5 transition-all text-center btn-animated text-sm sm:text-base"
            >
              Связаться с нами
            </a>

            <Link
              href="#features"
              className="border border-gray-300 text-gray-700 hover:text-primary-blue font-semibold py-2.5 xs:py-3 sm:py-3.5 px-5 sm:px-6 md:px-7 rounded-full hover:border-primary-blue transition-all text-center flex items-center justify-center group bg-white/80 backdrop-blur-[2px] text-sm sm:text-base"
            >
              Узнать подробнее
              <i className="fa-solid fa-arrow-down ml-2 transform group-hover:translate-y-1 transition-transform text-xs sm:text-sm" />
            </Link>
          </div>
        </div>

        {/* Правая колонка */}
        <div data-reveal className="delay-3 w-full lg:w-6/12 flex justify-center lg:justify-end relative mt-6 lg:mt-0">
          <div className="relative w-full max-w-[320px] xs:max-w-[360px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[560px] xl:max-w-[640px]">
            {/* Задний планшет — уезжает вправо при скролле (только на десктопе) */}
            <div
              ref={backTabletRef}
              className="absolute top-4 sm:top-6 right-[-30px] xs:right-[-40px] sm:right-[-56px] w-[62%] md:w-[66%] lg:w-[68%] -z-10 rotate-[6deg] will-change-transform hidden sm:block"
            >
              <ExportedImage
                src={`${prefix}/images/hero-tablet-secondary.png`}
                alt="Дополнительный планшет"
                width={700}
                height={700}
                className="w-full h-auto object-contain drop-shadow-xl"
                priority
                sizes="(max-width: 768px) 30vw, (max-width: 1024px) 25vw, 20vw"
              />
            </div>

            {/* Плейсхолдер для FloatingMockup */}
            <div
              ref={mockRef}
              className="mx-auto rounded-2xl sm:rounded-3xl pointer-events-none"
              style={{
                width: '100%',
                height: 'auto',
                aspectRatio: '0.8',
                maxWidth: 480,
                visibility: 'hidden',
              }}
            />

            {/* noscript fallback */}
            <noscript>
              <div className="mt-4 sm:mt-6">
                <img
                  src={`${prefix}/images/hero-tablet.svg`}
                  alt="Интерфейс системы (статичный мокап)"
                  width={420}
                  height={720}
                  style={{ maxWidth: '100%', height: 'auto', borderRadius: '16px' }}
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