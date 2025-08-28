'use client';

import React, { useMemo, useState, useRef, useEffect } from 'react';
import ExportedImage from 'next-image-export-optimizer';

/** Градиенты */
const GRAD_LINE = 'bg-gradient-to-r from-[#0D70DF] to-[#E63637]';
const GRAD_TEXT = 'text-transparent bg-clip-text bg-gradient-to-r from-[#0D70DF] to-[#E63637]';

/** Правый столбец */
type CatKey = 'desktop' | 'group' | 'integration' | 'custom';
type Category = {
  id: CatKey;
  label: string;
  shortLabel: string;
  mock2: string;
  paragraphs: string[];
};

const CATEGORIES: Category[] = [
  {
    id: 'desktop',
    label: 'Наши лагеря Desktop',
    shortLabel: 'Desktop',
    mock2: '/images/desktop-front.svg',
    paragraphs: [
      'Разработана специально для детских лагерей с учётом процессов.',
      'Онлайн-продажа путёвок, документооборот, аналитика.',
      'Гибкие отчёты и роли доступа.',
    ],
  },
  {
    id: 'group',
    label: 'Групповое бронирование',
    shortLabel: 'Группы',
    mock2: '/images/orbit/group-front.png',
    paragraphs: [
      'Массовое бронирование, квоты и быстрые заявки.',
      'Шаблоны групп, распределение по отрядам.',
      'Уведомления и статусы.',
    ],
  },
  {
    id: 'integration',
    label: 'Интеграция с 1С бухгалтерия',
    shortLabel: '1С Интеграция',
    mock2: '/images/orbit/1c-front.png',
    paragraphs: [
      'Экспорт проводок и платежей в 1С.',
      'Сверка и журналы операций.',
      'Автоматизация отчётности.',
    ],
  },
  {
    id: 'custom',
    label: 'Индивидуальный функционал',
    shortLabel: 'Кастом',
    mock2: '/images/orbit/custom-front.png',
    paragraphs: [
      'Кастомные модули под задачи лагеря.',
      'Гибкая настройка прав и интерфейсов.',
      'Интеграции с внешними системами.',
    ],
  },
];

// Раскрывающийся компонент для мобильных устройств
const MobileAccordionItem: React.FC<{
  category: Category;
  isExpanded: boolean;
  onToggle: () => void;
}> = ({ category, isExpanded, onToggle }) => {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden transition-all duration-300">
      {/* Заголовок аккордеона */}
      <button
        className={`w-full p-4 text-left flex items-center justify-between transition-colors ${
          isExpanded ? 'bg-blue-50 border-b border-gray-200' : 'hover:bg-gray-50'
        }`}
        onClick={onToggle}
      >
        <h3
          className={`text-lg font-extrabold ${
            isExpanded ? GRAD_TEXT : 'text-[#2D3B6F]'
          }`}
        >
          {category.shortLabel}
        </h3>
        <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
          <i className="fa-solid fa-chevron-down text-[#0D70DF]" />
        </div>
      </button>

      {/* Контент аккордеона */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 pt-2">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-2 h-6 rounded-full bg-gradient-to-b from-[#0D70DF] to-[#E63637]"></div>
            <h4 className="text-md font-bold text-[#2D3B6F]">
              {category.label}
            </h4>
          </div>
          
          <div className="space-y-3">
            {category.paragraphs.map((p, i) => (
              <p key={i} className="text-sm text-gray-600 leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className={`block w-12 h-[2px] ${GRAD_LINE}`} />
            <a
              href="#contact"
              className="text-sm font-semibold text-[#0D70DF] hover:text-[#E63637] transition-colors"
            >
              УЗНАТЬ БОЛЬШЕ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function FeaturesOrbitExact() {
  const [active, setActive] = useState<CatKey>('desktop');
  const [expandedItems, setExpandedItems] = useState<Set<CatKey>>(new Set(['desktop']));
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const orbitStartTimeRef = useRef<number>(0);

  // Определяем, что мы на клиенте
  useEffect(() => {
    setIsClient(true);
    orbitStartTimeRef.current = Date.now();
  }, []);

  // Анимация появления всего блока
  useEffect(() => {
    if (!isClient) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isClient]);

  const toggleItem = (id: CatKey) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const cat = CATEGORIES.find((c) => c.id === active)!;

  // Не рендерим орбиты на сервере
  if (!isClient) {
    return (
      <section ref={sectionRef} className="relative py-12 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Заголовочный блок для SSR */}
          <div className="text-center mb-10 lg:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
              <i className="fa-solid fa-star" /> Переходите на новый уровень
            </div>
            <h2 className="font-bounded text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold leading-tight text-[#4a4a4a] mb-4">
              Основной функционал
              <span className="block">платформы</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
              РАЗРАБОТАНА СПЕЦИАЛЬНО ДЛЯ ДЕТСКИХ ЛАГЕРЕЙ С УЧЁТОМ ВСЕХ ВАЖНЫХ АСПЕКТОВ УПРАВЛЕНИЯ И ПРОДАЖ ПУТЁВОК
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative py-12 lg:py-24 overflow-hidden">
      {/* keyframes локально к компоненту */}
      <style>{`
        @keyframes fadeUp { 
          from { opacity: 0; transform: translateY(40px) scale(0.95); } 
          to { opacity: 1; transform: translateY(0) scale(1); } 
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        /* Анимации только для десктопа */
        @media (min-width: 1024px) {
          @keyframes orbitCW { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @keyframes uprightCW { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        }

        .section-appear {
          opacity: 0;
          transform: translateY(40px) scale(0.95);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .section-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* заголовочный блок */}
        <div className={`text-center mb-10 lg:mb-14 section-appear ${isVisible ? 'section-visible' : ''}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4 animate-[slideInRight_0.8s_ease-out]">
            <i className="fa-solid fa-star" /> Переходите на новый уровень
          </div>
          <h2 className="font-bounded text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold leading-tight text-[#4a4a4a] mb-4 animate-[slideInLeft_0.8s_ease-out_0.1s]">
            Основной функционал
            <span className="block animate-[slideInLeft_0.8s_ease-out_0.2s]">платформы</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4 animate-[fadeUp_0.8s_ease-out_0.3s]">
            РАЗРАБОТАНА СПЕЦИАЛЬНО ДЛЯ ДЕТСКИХ ЛАГЕРЕЙ С УЧЁТОМ ВСЕХ ВАЖНЫХ АСПЕКТОВ УПРАВЛЕНИЯ И ПРОДАЖ ПУТЁВОК
          </p>
        </div>

        {/* Мобильная версия с аккордеоном */}
        <div className="lg:hidden">
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-[#2D3B6F]">
                Основные возможности системы
              </h3>
            </div>
            
            {CATEGORIES.map((category) => (
              <MobileAccordionItem
                key={category.id}
                category={category}
                isExpanded={expandedItems.has(category.id)}
                onToggle={() => toggleItem(category.id)}
              />
            ))}
          </div>
        </div>

        {/* Десктопная версия */}
        <div className={`hidden lg:grid lg:grid-cols-2 gap-16 items-start section-appear ${isVisible ? 'section-visible' : ''}`}>
          {/* Сцена с орбитами */}
          <div className="relative animate-[scaleIn_1s_ease-out_0.4s]">
            <DesktopOrbitScene activeCategory={cat} startTime={orbitStartTimeRef.current} />
          </div>

          {/* Правая колонка - смещена правее */}
          <div className="relative bg-[#f9f7f7] mt-6 lg:mt-0 animate-[slideInRight_1s_ease-out_0.5s]">
            <div className="relative pl-8 lg:pl-8">
              <span className={`absolute left-0 top-1 bottom-1 w-[3px] rounded-full ${GRAD_LINE}`} aria-hidden />
              <h3 className="text-2xl font-extrabold text-[#2D3B6F] mb-4">
                {cat.label}
              </h3>

              <div className="space-y-4 text-[15px] text-[#3F4B66]">
                {cat.paragraphs.map((p, i) => (
                  <p key={i} className="leading-relaxed animate-[fadeUp_0.6s_ease-out]"
                     style={{ animationDelay: `${0.6 + i * 0.1}s` }}>
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 animate-[fadeUp_0.6s_ease-out_0.8s]">
                <span className={`block w-24 h-[2px] ${GRAD_LINE}`} />
                <a
                  href="#contact"
                  className="text-sm font-semibold text-[#2D3B6F] hover:text-[#0D70DF] cursor-pointer transition-colors"
                >
                  УЗНАТЬ БОЛЬШЕ
                </a>
              </div>

              <div className="mt-20 space-y-4">
                {CATEGORIES.map((c, index) => (
                  <button
                    key={c.id}
                    onClick={() => setActive(c.id)}
                    className={`block text-left text-xl font-extrabold tracking-tight transition-colors animate-[fadeUp_0.6s_ease-out]
                      ${active === c.id ? GRAD_TEXT : 'text-[#2D3B6F] hover:text-[#0D70DF]'}
                    `}
                    style={{ animationDelay: `${0.9 + index * 0.1}s` }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Вынесем десктопную сцену в отдельный компонент
const DesktopOrbitScene: React.FC<{ activeCategory: Category; startTime: number }> = ({ activeCategory, startTime }) => {
  const STAGE_W = 660;
  const STAGE_H = 660;
  const CX = Math.round(STAGE_W / 2);
  const CY = Math.round(STAGE_H * 0.52);
  const RINGS = [320, 270, 220, 175, 135] as const;

  const GradientBadge: React.FC<{ title: string }> = ({ title }) => (
    <span className={`text-[12px] font-semibold px-3 py-[6px] rounded-[8px] whitespace-nowrap text-white ${GRAD_LINE}`}>
      {title}
    </span>
  );

  const OrbitTrain: React.FC<{
    r: number;
    startDeg: number;
    period: number;
    title: string;
    delay?: number;
    startTime: number;
  }> = ({ r, startDeg, period, title, delay = 0, startTime }) => {
    const CONNECTOR = 28;
    const GAP = 6;

    const [currentRotation, setCurrentRotation] = useState(startDeg);

    // Вычисляем текущий угол на основе времени с момента старта
    useEffect(() => {
      const getCurrentRotation = () => {
        const elapsedTime = (Date.now() - startTime) / 1000; // в секундах
        const progress = ((elapsedTime + delay) % period) / period;
        return (startDeg + progress * 360) % 360;
      };

      const updateRotation = () => {
        setCurrentRotation(getCurrentRotation());
        requestAnimationFrame(updateRotation);
      };

      const animationFrame = requestAnimationFrame(updateRotation);
      return () => cancelAnimationFrame(animationFrame);
    }, [period, startDeg, delay, startTime]);

    return (
      <div className="absolute pointer-events-none" style={{ left: CX, top: CY, transform: 'translate(-50%, -50%)' }} aria-hidden>
        <div style={{ 
          transformOrigin: '0 0', 
          transform: `rotate(${currentRotation}deg)`
        }}>
          <div style={{ transform: `translateX(${r}px)` }}>
            <div style={{ position: 'relative', width: 0, height: 0 }}>
              <div style={{ 
                position: 'absolute', 
                left: 0, 
                top: 0, 
                transform: `translateY(-50%) rotate(${-currentRotation}deg)`,
                transformOrigin: '0 50%', 
                display: 'flex', 
                alignItems: 'center', 
                whiteSpace: 'nowrap' 
              }}>
                <span style={{ width: GAP, height: 1 }} />
                <span
                  className={GRAD_LINE}
                  style={{
                    width: CONNECTOR,
                    height: 2,
                    boxShadow: '0 0 6px rgba(13,112,223,0.25)',
                    flex: '0 0 auto',
                  }}
                />
                <span style={{ marginLeft: 6, display: 'inline-block' }}>
                  <GradientBadge title={title} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const trains = useMemo(() => [
    { title: 'СИСТЕМА АНАЛИТИКИ', r: RINGS[0], start: 190, period: 30, delay: 0.0 },
    { title: 'ПОМОЩНИК ВОЖАТОГО', r: RINGS[1], start: 230, period: 26, delay: 0.2 },
    { title: 'СОВРЕМЕННЫЙ ДОКУМЕНТООБОРОТ', r: RINGS[2], start: 310, period: 22, delay: 0.35 },
    { title: 'СИСТЕМА ПРОДАЖ', r: RINGS[3], start: 60, period: 20, delay: 0.5 },
    { title: 'ЛИЧНЫЙ КАБИНЕТ', r: RINGS[4], start: 140, period: 18, delay: 0.65 },
  ], []);

  return (
    <div className="relative mx-auto" style={{ width: STAGE_W, height: STAGE_H }}>
      <svg viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="ringGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#0D70DF" />
            <stop offset="100%" stopColor="#E63637" />
          </linearGradient>
        </defs>
        {RINGS.map((r, i) => (
          <circle
            key={r}
            cx={CX}
            cy={CY}
            r={r}
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth={3 - i * 0.2}
            strokeDasharray={i < 2 ? '12 16' : i < 4 ? '10 14' : '8 12'}
            strokeOpacity={0.22 - i * 0.02}
          />
        ))}
      </svg>

      {trains.map((t, i) => (
        <OrbitTrain
          key={i}
          r={t.r}
          startDeg={t.start}
          period={t.period}
          title={t.title}
          delay={t.delay}
          startTime={startTime}
        />
      ))}

      <div className="absolute" style={{ left: CX, top: CY + 10, transform: 'translate(-50%, -50%)' }}>
        <ExportedImage
          src={activeCategory.mock2}
          alt="Front tablet"
          width={900}
          height={900}
          className="w-[500px] h-auto drop-shadow-2xl"
        />
      </div>
    </div>
  );
};