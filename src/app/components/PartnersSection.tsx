'use client';

import ExportedImage from 'next-image-export-optimizer';

const PartnersSection = () => {
  return (
    <section className="py-10 border-y border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-6">
          <p className="text-gray-500 uppercase tracking-wide text-sm font-semibold">Наши клиенты и партнеры</p>
        </div>
        <div className="overflow-x-auto hide-scrollbar md:overflow-visible">
          <div className="flex whitespace-nowrap gap-8 md:gap-16 items-center min-w-full px-4 md:whitespace-normal md:justify-center">
            <div className="grayscale hover:grayscale-0 transition-all shrink-0 md:shrink">
              <ExportedImage 
                src="/images/icons/orbita.png" 
                alt="Детский лагерь Орбита - клиент нашей системы" 
                width={195} 
                height={32} 
                unoptimized={true}
                className="h-8 w-auto" 
              />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all shrink-0 md:shrink">
              <ExportedImage 
                src="/images/icons/yookassa.svg" 
                alt="Интеграция с платежной системой ЮKassa для оплаты путевок" 
                width={160} 
                height={32} 
                unoptimized={true}
                className="h-8 w-auto" 
              />
            </div>
            <div className="grayscale hover:grayscale-0 transition-all shrink-0 md:shrink">
              <ExportedImage 
                src="/podpislon.svg" 
                alt="Сервис Подпислон - партнер нашей системы" 
                width={608} 
                height={170} 
                unoptimized={true}
                className="h-10 w-auto" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection; 