'use client';

import React, { useState, useRef, useEffect } from 'react';
import ExportedImage from 'next-image-export-optimizer';

type TabKey = 'camp' | 'parent' | 'child' | 'gov';

const TABS: {
  key: TabKey;
  label: string;
  bullets: string[];
  image: string;
  alt: string;
}[] = [
  {
    key: 'camp',
    label: 'Для лагеря',
    bullets: [
      'Онлайн-продажа путёвок без ручной обработки',
      'Автоматический документооборот и платежи',
      'Единая CRM и база участников',
      'Гибкая аналитика и отчёты по сменам',
    ],
    image: '/images/for-camp.png',
    alt: 'Интерфейс системы для лагеря',
  },
  {
    key: 'parent',
    label: 'Для родителя',
    bullets: [
      'Удобный личный кабинет с историей покупок',
      'Онлайн-оплата и оформление документов за 5 минут',
      'Уведомления о статусе заявки и смене',
      'Поддержка нескольких детей в одном аккаунте',
    ],
    image: '/images/tabs/for-parent.png',
    alt: 'Интерфейс личного кабинета для родителя',
  },
  {
    key: 'child',
    label: 'Для ребёнка',
    bullets: [
      'Программа смен и развивающие активности',
      'Фото- и отчётные материалы после смены',
      'Безопасность: медицинские карточки и список аллергенов',
      'Интерактивная карта отрядов и расписание',
    ],
    image: '/images/tabs/for-child.png',
    alt: 'Интерфейс информации для ребёнка',
  },
  {
    key: 'gov',
    label: 'Для контролирующих органов',
    bullets: [
      'Готовые отчёты и экспорты для проверок',
      'Прозрачный документооборот и журнал событий',
      'Контроль безопасности и мед. документации',
      'Настраиваемые права доступа и аудит',
    ],
    image: '/images/tabs/for-gov.png',
    alt: 'Интерфейс для контролирующих органов',
  },
];

export default function TabsFeatureSection(): JSX.Element {
  const [active, setActive] = useState<TabKey>('camp');
  const tabListRef = useRef<HTMLDivElement | null>(null);
  const tabButtonsRef = useRef<Record<TabKey, HTMLButtonElement | null>>({
    camp: null,
    parent: null,
    child: null,
    gov: null,
  });

  // keyboard navigation: ArrowLeft / ArrowRight navigate tabs
  useEffect(() => {
    const el = tabListRef.current;
    if (!el) return;
    function onKey(e: KeyboardEvent) {
      const keys: TabKey[] = TABS.map((t) => t.key);
      const idx = keys.indexOf(active);
      if (e.key === 'ArrowRight') {
        const next = keys[(idx + 1) % keys.length];
        setActive(next);
        tabButtonsRef.current[next]?.focus();
        e.preventDefault();
      } else if (e.key === 'ArrowLeft') {
        const prev = keys[(idx - 1 + keys.length) % keys.length];
        setActive(prev);
        tabButtonsRef.current[prev]?.focus();
        e.preventDefault();
      }
    }
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [active]);

  const activeTab = TABS.find((t) => t.key === active)!;

  return (
    <section className="relative py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Top heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
            <i className="fa-solid fa-thumbs-up" aria-hidden />
            <span>Эффективность и комфорт для каждого</span>
          </div>

          <h2 className="font-bounded text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Инновационная платформа
            <span className="block">с передовыми решениями для всех участников</span>
          </h2>
        </div>

        {/* Tabs + content layout */}
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Left: tabs and bullets */}
          <div className="w-full lg:w-7/12">
            {/* Tabs */}
            <div
              ref={tabListRef}
              role="tablist"
              aria-label="Sections"
              className="flex items-center gap-4 mb-6 flex-wrap"
            >
              {TABS.map((t) => {
                const isActive = t.key === active;
                return (
                  <button
                    key={t.key}
                    ref={(el) => {
                      // callback must return void — do not return assignment result
                      tabButtonsRef.current[t.key] = el;
                    }}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${t.key}`}
                    id={`tab-${t.key}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(t.key)}
                    className={
                      'transition-all rounded-full text-sm font-semibold py-2 px-4 focus:outline-none ' +
                      (isActive
                        ? 'bg-gradient-to-r from-[#0D70DF] to-[#E63637] text-white'
                        : 'bg-white border border-gray-200 text-gray-700 hover:text-gray-900')
                    }
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            {/* Panel (bullets) */}
            <div
              id={`panel-${activeTab.key}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeTab.key}`}
              className="pt-4"
            >
              <h3 className="text-2xl font-semibold mb-4">Все процессы под контролем — от заявки до отчётности</h3>

              <ul className="space-y-4">
                {activeTab.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-gradient-to-br from-[#0D70DF] to-[#E63637] text-white">
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L4.2 8.2L11 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className="text-base text-gray-700">{b}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: image that changes with tab */}
          <div className="w-full lg:w-5/12 flex justify-center lg:justify-end items-start">
            <div className="relative w-[320px] sm:w-[420px] md:w-[520px] lg:w-[540px] transition-all">
              <div className="hidden lg:block absolute -right-8 -top-8 w-40 h-40 rounded-xl bg-gradient-to-br from-[#0D70DF]/10 to-[#E63637]/10 -z-10" />

              <div className="rounded-3xl overflow-hidden">
                <ExportedImage
                  src={activeTab.image}
                  alt={activeTab.alt}
                  width={900}
                  height={900}
                  className="w-full h-auto object-contain block"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
