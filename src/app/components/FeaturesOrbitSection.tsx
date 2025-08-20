'use client';

import React, { useMemo, useState } from 'react';
import ExportedImage from 'next-image-export-optimizer';

const STAGE_W = 660;
const STAGE_H = 660;
const CX = Math.round(STAGE_W / 2);
const CY = Math.round(STAGE_H * 0.52);

const RINGS: readonly number[] = [320, 270, 220, 175, 135];

const GRAD_LINE = 'bg-gradient-to-r from-[#0D70DF] to-[#E63637]';
const GRAD_TEXT = 'text-transparent bg-clip-text bg-gradient-to-r from-[#0D70DF] to-[#E63637]';

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
}> = ({ r, startDeg, period, title, delay = 0 }) => {
  const CONNECTOR = 28;
  const GAP = 6;

  return (
    <div
      className="absolute pointer-events-none"
      style={{ left: CX, top: CY, transform: 'translate(-50%, -50%)' }}
      aria-hidden
    >
      <div
        style={{
          transformOrigin: '0 0',
          transform: `rotate(${startDeg}deg)`,
          animation: `orbitCW ${period}s linear ${delay}s infinite`,
          willChange: 'transform',
        }}
      >
        <div style={{ transform: `translateX(${r}px)` }}>
          <div style={{ position: 'relative', width: 0, height: 0 }}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                transform: `translateY(-50%) rotate(${-startDeg}deg)`,
                animation: `uprightCW ${period}s linear ${delay}s infinite`,
                transformOrigin: '0 50%',
                display: 'flex',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                willChange: 'transform',
              }}
            >
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

type CatKey = 'desktop' | 'group' | 'integration' | 'custom';

const CATEGORIES = [
  {
    id: 'desktop' as CatKey,
    label: 'Наши лагеря Desktop',
    mock2: '/images/desktop-front.svg',
    paragraphs: [
      'Разработана специально для детских лагерей с учётом процессов.',
      'Онлайн-продажа путёвок, документооборот, аналитика.',
      'Гибкие отчёты и роли доступа.',
    ],
  },
  {
    id: 'group' as CatKey,
    label: 'Групповое бронирование',
    mock2: '/images/orbit/group-front.png',
    paragraphs: [
      'Массовое бронирование, квоты и быстрые заявки.',
      'Шаблоны групп, распределение по отрядам.',
      'Уведомления и статусы.',
    ],
  },
  {
    id: 'integration' as CatKey,
    label: 'Интеграция с 1С бухгалтерия',
    mock2: '/images/orbit/1c-front.png',
    paragraphs: [
      'Экспорт проводок и платежей в 1С.',
      'Сверка и журналы операций.',
      'Автоматизация отчётности.',
    ],
  },
  {
    id: 'custom' as CatKey,
    label: 'Индивидуальный функционал',
    mock2: '/images/orbit/custom-front.png',
    paragraphs: [
      'Кастомные модули под задачи лагеря.',
      'Гибкая настройка прав и интерфейсов.',
      'Интеграции с внешними системами.',
    ],
  },
];

export default function FeaturesOrbitExact(): JSX.Element {
  const [active, setActive] = useState<CatKey>('desktop');
  const cat = CATEGORIES.find(c => c.id === active)!;

  // оставляем твои стартовые углы/периоды — добавил только задержку для «стаггера»
  const trains = useMemo(
    () => [
      { title: 'СИСТЕМА АНАЛИТИКИ', r: RINGS[0], start: 190, period: 30, delay: 0.0 },
      { title: 'ПОМОЩНИК ВОЖАТОГО', r: RINGS[1], start: 230, period: 26, delay: 0.2 },
      { title: 'СОВРЕМЕННЫЙ ДОКУМЕНТООБОРОТОР', r: RINGS[2], start: 310, period: 22, delay: 0.35 },
      { title: 'СИСТЕМА ПРОДАЖ', r: RINGS[3], start: 60, period: 20, delay: 0.5 },
      { title: 'ЛИЧНЫЙ КАБИНЕТ', r: RINGS[4], start: 140, period: 18, delay: 0.65 },
    ],
    []
  );

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      <style>{`
        @keyframes orbitCW   { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes uprightCW { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
        @keyframes fadeUp    { from { opacity: 0; transform: translateY(20px);} to {opacity:1; transform: translateY(0);} }
      `}</style>

      <div className="container mx-auto px-4 lg:px-8">
        {/* заголовочный блок */}
        <div className="text-center mb-14 animate-[fadeUp_0.7s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
            <i className="fa-solid fa-star" /> Переходите на новый уровень
          </div>
          <h2 className="font-bounded text-[32px] sm:text-[38px] md:text-[44px] lg:text-[48px] font-extrabold leading-tight text-[#4a4a4a]">
            ОСНОВНОЙ ФУНКЦИОНАЛ
            <span className="block">ПЛАТФОРМЫ</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg tracking-wide text-gray-600">
            РАЗРАБОТАНА СПЕЦИАЛЬНО ДЛЯ ДЕТСКИХ ЛАГЕРЕЙ С УЧЁТОМ ВСЕХ ВАЖНЫХ АСПЕКТОВ
            <br className="hidden sm:block" />
            УПРАВЛЕНИЯ И ПРОДАЖ ПУТЁВОК
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* сцена (адаптация: скейлим контейнер на узких экранах) */}
          <div className="relative">
            <div
              className="
                relative mx-auto
                transform-gpu
                scale-[0.82] xs:scale-[0.9] sm:scale-[0.95] md:scale-100
                origin-center
              "
              style={{ width: STAGE_W, height: STAGE_H }}
            >
              {active === 'desktop' && (
                <>
                  <svg
                    viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                  >
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
                      startDeg={(t as any).start}
                      period={(t as any).period}
                      title={t.title}
                      delay={(t as any).delay}
                    />
                  ))}
                </>
              )}

              {/* один мокап */}
              <div
                className="absolute"
                style={{ left: CX, top: CY + 10, transform: 'translate(-50%, -50%)' }}
              >
                <ExportedImage
                  src={cat.mock2}
                  alt="Front tablet"
                  width={900}
                  height={900}
                  className="w-[480px] sm:w-[520px] lg:w-[560px] h-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>

          {/* правая колонка: с вертикальной градиент-полоской слева и адаптацией */}
          <div className="relative mt-6 lg:mt-0 animate-[fadeUp_0.8s_ease-out]">
            <div className="relative pl-6 sm:pl-8 lg:pl-12">
              {/* вертикальная полоса как на скрине */}
              <span
                className={`absolute left-0 top-1 bottom-1 w-[3px] rounded-full ${GRAD_LINE}`}
                aria-hidden
              />

              <h3 className="text-[22px] sm:text-[24px] md:text-[26px] font-extrabold text-[#2D3B6F] mb-2">
                {cat.label}
              </h3>

              <div className="space-y-3 text-[13px] sm:text-[14px] text-[#3F4B66] max-w-[520px]">
                {cat.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="leading-snug opacity-0 translate-y-2 animate-[fadeUp_0.5s_ease-out_forwards]"
                    style={{ animationDelay: `${0.1 * i + 0.15}s` as any }}
                  >
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3">
                <span className={`block w-24 h-[2px] ${GRAD_LINE}`} />
                <a
                  href="#contact"
                  className="text-[13px] font-semibold text-[#2D3B6F] hover:text-[#0D70DF] cursor-pointer"
                >
                  УЗНАТЬ БОЛЬШЕ
                </a>
              </div>

              <div className="mt-8 space-y-4">
                {CATEGORIES.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => setActive(c.id)}
                    className={`block text-left text-[20px] sm:text-[22px] font-extrabold tracking-tight transition-colors
                      ${active === c.id ? GRAD_TEXT : 'text-[#2D3B6F] hover:text-[#0D70DF]'}
                      opacity-0 translate-y-2 animate-[fadeUp_0.5s_ease-out_forwards]
                    `}
                    style={{ animationDelay: `${0.08 * i + 0.25}s` as any }}
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
