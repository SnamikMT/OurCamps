'use client';

import ExportedImage from 'next-image-export-optimizer';
import { useModal } from '../contexts/ModalContext';

const PricingSection = () => {
  const { openModal } = useModal();
  
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openModal();
  };
  
  return (
    <section id="pricing" className="py-16 md:py-24 relative overflow-hidden">
      {/* Фоновые элементы */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-24 w-96 h-96 bg-primary-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-36 w-80 h-80 bg-primary-red/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Надзаголовок */}
        <div className="text-center mb-6">
          <span className="inline-block py-1.5 px-4 bg-primary-red/10 text-primary-red rounded-full text-sm font-medium">
            <i className="fa-solid fa-ruble-sign mr-1"></i> Справедливая цена
          </span>
        </div>

        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-bounded text-3xl sm:text-4xl font-bold mb-4">СТОИМОСТЬ УСЛУГ ПЛАТФОРМЫ</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Мы предлагаем простую и понятную модель ценообразования, которая помогает вашему бизнесу расти
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-6 lg:col-span-5">
            <div className="glass-card p-8 sm:p-10 rounded-3xl shadow-card hover:shadow-card-hover transition-all duration-300">
              <div className="flex justify-between items-center mb-6">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center shadow-lg">
                  <ExportedImage
                    src="/images/rubl.svg"  // своя иконка
                    alt="Иконка тарифа"
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div className="bg-primary-blue/10 text-primary-blue text-sm font-medium px-4 py-1.5 rounded-full">
                  Единый тариф
                </div>
              </div>
              
              <h3 className="font-bounded text-2xl md:text-3xl font-bold mb-2">1%</h3>
              <p className="text-gray-500 mb-4">
                с каждой проданной путевки (плата берется только если ребенок заехал в лагерь)
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full gradient-bg flex items-center justify-center text-white mr-3 mt-0.5 flex-shrink-0">
                    <i className="fa-solid fa-check text-xs"></i>
                  </div>
                  <p>Никаких скрытых комиссий и дополнительных платежей</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full gradient-bg flex items-center justify-center text-white mr-3 mt-0.5 flex-shrink-0">
                    <i className="fa-solid fa-check text-xs"></i>
                  </div>
                  <p>Вы платите только когда зарабатываете</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full gradient-bg flex items-center justify-center text-white mr-3 mt-0.5 flex-shrink-0">
                    <i className="fa-solid fa-check text-xs"></i>
                  </div>
                  <p>Полный доступ ко всем функциям системы</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full gradient-bg flex items-center justify-center text-white mr-3 mt-0.5 flex-shrink-0">
                    <i className="fa-solid fa-check text-xs"></i>
                  </div>
                  <p>Техническая поддержка в любое время</p>
                </div>
              </div>
              
              <a 
                href="#contact" 
                className="gradient-bg text-white font-semibold py-3.5 px-8 rounded-xl shadow-button hover:shadow-button-hover transform hover:-translate-y-1 transition-all text-center w-full block btn-animated"
                onClick={handleContactClick}
              >
                Начать использовать
              </a>
            </div>
          </div>
          
          {/* Правая часть */}
          <div className="md:col-span-6 lg:col-span-7">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-card hover:shadow-card-hover border border-gray-100 transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-xl bg-primary-blue/10 flex items-center justify-center text-primary-blue flex-shrink-0">
                    <i className="fa-solid fa-calculator"></i>
                  </div>
                  <div>
                    <h4 className="font-bounded text-lg font-semibold mb-2">Справедливая модель</h4>
                    <p className="text-gray-600">
                      Наша комиссия составляет всего 1% от стоимости каждой проданной путевки. Это означает, что мы заинтересованы в вашем успехе — чем больше продаж, тем больше зарабатываем мы все.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-card hover:shadow-card-hover border border-gray-100 transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-xl bg-primary-blue/10 flex items-center justify-center text-primary-blue flex-shrink-0">
                    <i className="fa-solid fa-chart-line"></i>
                  </div>
                  <div>
                    <h4 className="font-bounded text-lg font-semibold mb-2">Растите вместе с нами</h4>
                    <p className="text-gray-600">
                      Мы верим в долгосрочное сотрудничество. Наша модель ценообразования позволяет вам использовать все возможности системы без крупных первоначальных вложений.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-card hover:shadow-card-hover border border-gray-100 transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-xl bg-primary-blue/10 flex items-center justify-center text-primary-blue flex-shrink-0">
                    <i className="fa-solid fa-piggy-bank"></i>
                  </div>
                  <div>
                    <h4 className="font-bounded text-lg font-semibold mb-2">Экономьте ваши ресурсы</h4>
                    <p className="text-gray-600">
                      Никаких ежемесячных платежей или дорогостоящих лицензий. Вы платите только процент с реальных продаж, что делает нашу систему доступной для лагерей любого размера.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default PricingSection;
