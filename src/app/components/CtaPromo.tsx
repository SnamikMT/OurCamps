'use client';

import React, { useEffect, useRef, useState } from 'react';
import ExportedImage from 'next-image-export-optimizer';

type CtaPromoProps = {
  bgImage?: string;
  mock?: string;
  ctaHref?: string;
  ctaText?: string;
  onSubmitEmail?: (email: string) => void;
  /** Насколько мокап приподнять над нижней гранью на md+ (верхушка вылезет наружу) */
  protrudeTopPx?: number;
};

const GRAD_BTN  = 'bg-gradient-to-r from-[#0D70DF] to-[#E63637] hover:from-[#0b63c6] hover:to-[#c02e2f]';
const GRAD_WORD = 'text-transparent bg-clip-text bg-gradient-to-r from-[#0D70DF] to-[#E63637]';

export default function CtaPromo({
  bgImage = '/images/banners/cta-bg.jpg',
  mock    = '/images/orbit/desktop-front.png',
  ctaHref = '#demo',
  ctaText = 'Получить демо-доступ',
  onSubmitEmail,
  protrudeTopPx = 28,
}: CtaPromoProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some(e => e.isIntersecting)) setVisible(true);
    }, { threshold: 0.18 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="py-6 sm:py-8">
      <style>{`
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .reveal { opacity: 0; transform: translateY(12px); will-change: opacity, transform; }
        .reveal.revealed { animation: fadeSlideUp .6s ease-out forwards; }
        .clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      <div className="container mx-auto px-4 lg:px-8">
        <div ref={wrapRef} className={`mx-auto max-w-[1200px] relative overflow-visible reveal ${visible ? 'revealed' : ''}`}>
          <div className="relative rounded-2xl shadow-[0_8px_26px_rgba(27,43,77,0.08)] overflow-visible">
            {/* Фон */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              <ExportedImage
                src={bgImage}
                alt=""
                width={1920}
                height={640}
                priority
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            {/* Контент */}
            <div
              className="
                relative grid items-center gap-4 sm:gap-6
                p-4 sm:p-6 lg:p-8
                grid-cols-1 md:grid-cols-[1fr_380px]
                min-h-[130px] sm:min-h-[150px] lg:min-h-[160px]
              "
            >
              {/* Левая часть */}
              <div className="pr-0 md:pr-6 lg:pr-8">
                <h3 className="text-[18px] sm:text-[24px] lg:text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-[#2D3B6F]">
                  Эффективно продавайте,
                  <br />
                  <span className={GRAD_WORD}>Комфортно управляйте</span>
                </h3>

                <p className="mt-2 sm:mt-3 text-[12px] sm:text-[13px] leading-snug text-[#3F4B66] uppercase max-w-[520px] clamp-2">
                  Готовы опробовать лучшее ПО для детских лагерей? Запланируйте демонстрацию уже сегодня.
                </p>

                <form
                  className="mt-3 sm:mt-4 flex w-full flex-col sm:flex-row gap-3 sm:gap-4 max-w-[520px]"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const email = new FormData(e.currentTarget).get('email') as string;
                    if (onSubmitEmail) onSubmitEmail(email);
                    else if (ctaHref) window.location.assign(ctaHref);
                  }}
                >
                  <label className="relative flex-1">
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="Ваш Email"
                      className="w-full h-[42px] sm:h-[44px] rounded-xl border border-[#E2E7F0] bg-white/95 pl-10 pr-3 text-[14px] text-[#2D3B6F] placeholder:text-[#98A1B3] shadow-[inset_0_1px_0_rgba(17,24,39,.04)] focus:outline-none focus:ring-4 focus:ring-[#2C6BEF]/15"
                    />
                    <svg className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#98A1B3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M4 8l8 5 8-5" />
                      <rect x="4" y="4" width="16" height="16" rx="3" />
                    </svg>
                  </label>

                  <button type="submit" className={`h-[42px] sm:h-[44px] inline-flex items-center justify-center rounded-xl px-5 sm:px-6 text-[14px] font-semibold text-white shadow-[0_8px_18px_rgba(13,112,223,0.25)] ${GRAD_BTN} transition`}>
                    {ctaText}
                  </button>
                </form>
              </div>

              {/* Правая часть */}
              <div className="relative overflow-visible">
                {/* Мобайл: крупный мокап по центру (без вылезания) */}
                <div className="md:hidden flex justify-center mt-3">
                  <ExportedImage
                    src={mock}
                    alt="Mockup"
                    width={900}
                    height={900}
                    className="w-[300px] sm:w-[360px] h-auto drop-shadow-[0_20px_30px_rgba(0,0,0,.18)]"
                  />
                </div>

                {/* md+: мокап прижат к правому краю и приподнят на protrudeTopPx */}
                <div
                  className="
                    hidden md:block absolute right-0 bottom-0
                  "
                  style={{
                    transform: `translateY(${protrudeTopPx}px)`,
                  }}
                >
                  <ExportedImage
                    src={mock}
                    alt="Mockup"
                    width={900}
                    height={900}
                    className="
                      w-[420px] lg:w-[480px] xl:w-[520px]
                      h-auto drop-shadow-[0_20px_30px_rgba(0,0,0,.18)]
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
