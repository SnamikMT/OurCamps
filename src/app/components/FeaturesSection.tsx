'use client';

import { useModal } from '../contexts/ModalContext';

const FeaturesSection = () => {
  const { openModal } = useModal();
  
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openModal();
  };
  
  return (
    <section id="features" className="py-20 md:py-28 bg-primary-gray relative overflow-hidden">
      {/* Фоновые элементы */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -left-40 w-96 h-96 bg-primary-red/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 bg-primary-blue/10 text-primary-blue rounded-full text-sm font-medium mb-4">
            <i className="fa-solid fa-star mr-1"></i> Ключевые функции
          </span>
          <h2 className="font-bounded text-3xl md:text-4xl font-bold mb-5" itemProp="serviceOutput">Что включает наша система</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Разработана специально для детских лагерей с учетом всех важных аспектов управления и продаж путевок
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8" itemProp="hasOfferCatalog" itemScope itemType="https://schema.org/OfferCatalog">
          {/* Карточка 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-card hover:shadow-card-hover transition-all transform hover:-translate-y-1 group relative" itemProp="itemListElement" itemScope itemType="https://schema.org/Offer">
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <i className="fa-solid fa-arrow-up-right text-primary-blue"></i>
            </div>
            
            <div className="mb-6">
              <div className="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center text-white mb-1">
                <i className="fa-solid fa-users text-xl"></i>
              </div>
              <h3 className="font-bounded text-xl font-bold mt-4 mb-2 group-hover:text-primary-blue transition-colors">Учет и управление</h3>
              <div className="w-10 h-0.5 bg-primary-blue mb-4"></div>
            </div>
            
            <ul className="space-y-3">
              <li className="flex items-center">
                <i className="fa-solid fa-check text-primary-blue mr-3 text-sm"></i>
                <span className="text-gray-700">Учет детей и родителей</span>
              </li>
              <li className="flex items-center">
                <i className="fa-solid fa-check text-primary-blue mr-3 text-sm"></i>
                <span className="text-gray-700">Учет заказов и путевок</span>
              </li>
              <li className="flex items-center">
                <i className="fa-solid fa-check text-primary-blue mr-3 text-sm"></i>
                <span className="text-gray-700">Статистика на дашборде</span>
              </li>
            </ul>
          </div>
          
          {/* Карточка 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-card hover:shadow-card-hover transition-all transform hover:-translate-y-1 group relative" itemProp="itemListElement" itemScope itemType="https://schema.org/Offer">
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <i className="fa-solid fa-arrow-up-right text-primary-blue"></i>
            </div>
            
            <div className="mb-6">
              <div className="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center text-white mb-1">
                <i className="fa-solid fa-file-contract text-xl"></i>
              </div>
              <h3 className="font-bounded text-xl font-bold mt-4 mb-2 group-hover:text-primary-blue transition-colors">Управление документами</h3>
              <div className="w-10 h-0.5 bg-primary-blue mb-4"></div>
            </div>
            
            <ul className="space-y-3">
              <li className="flex items-center">
                <i className="fa-solid fa-check text-primary-blue mr-3 text-sm"></i>
                <span className="text-gray-700">Генерация договоров</span>
              </li>
              <li className="flex items-center">
                <i className="fa-solid fa-check text-primary-blue mr-3 text-sm"></i>
                <span className="text-gray-700">Генерация путевок</span>
              </li>
              <li className="flex items-center">
                <i className="fa-solid fa-check text-primary-blue mr-3 text-sm"></i>
                <span className="text-gray-700">Выгрузка данных по фильтрам</span>
              </li>
            </ul>
          </div>
          
          {/* Карточка 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-card hover:shadow-card-hover transition-all transform hover:-translate-y-1 group relative" itemProp="itemListElement" itemScope itemType="https://schema.org/Offer">
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <i className="fa-solid fa-arrow-up-right text-primary-blue"></i>
            </div>
            
            <div className="mb-6">
              <div className="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center text-white mb-1">
                <i className="fa-solid fa-campground text-xl"></i>
              </div>
              <h3 className="font-bounded text-xl font-bold mt-4 mb-2 group-hover:text-primary-blue transition-colors">Организация смены</h3>
              <div className="w-10 h-0.5 bg-primary-blue mb-4"></div>
            </div>
            
            <ul className="space-y-3">
              <li className="flex items-center">
                <i className="fa-solid fa-check text-primary-blue mr-3 text-sm"></i>
                <span className="text-gray-700">Списки дней рождений</span>
              </li>
              <li className="flex items-center">
                <i className="fa-solid fa-check text-primary-blue mr-3 text-sm"></i>
                <span className="text-gray-700">Генерация отрядов</span>
              </li>
              <li className="flex items-center">
                <i className="fa-solid fa-check text-primary-blue mr-3 text-sm"></i>
                <span className="text-gray-700">Учет заехавших детей</span>
              </li>
            </ul>
          </div>
          
          {/* Карточка 4 */}
          <div className="bg-white p-8 rounded-3xl shadow-card hover:shadow-card-hover transition-all transform hover:-translate-y-1 group relative" itemProp="itemListElement" itemScope itemType="https://schema.org/Offer">
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <i className="fa-solid fa-arrow-up-right text-primary-blue"></i>
            </div>
            
            <div className="mb-6">
              <div className="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center text-white mb-1">
                <i className="fa-solid fa-cart-shopping text-xl"></i>
              </div>
              <h3 className="font-bounded text-xl font-bold mt-4 mb-2 group-hover:text-primary-blue transition-colors">Продажи онлайн</h3>
              <div className="w-10 h-0.5 bg-primary-blue mb-4"></div>
            </div>
            
            <ul className="space-y-3">
              <li className="flex items-center">
                <i className="fa-solid fa-check text-primary-blue mr-3 text-sm"></i>
                <span className="text-gray-700">Онлайн-подписание договора и прием оплаты</span>
              </li>
              <li className="flex items-center">
                <i className="fa-solid fa-check text-primary-blue mr-3 text-sm"></i>
                <span className="text-gray-700">Брендированный личный кабинет для родителей</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* CTA секция */}
        <div className="mt-16 text-center">
          <div className="inline-block rounded-full border border-gray-200 overflow-hidden px-1 py-1 mb-6">
            <div className="flex items-center">
              <div className="bg-primary-blue/10 py-1 px-4 rounded-full mr-2">
                <i className="fa-solid fa-bolt text-primary-blue mr-1"></i>
                <span className="text-primary-blue text-sm font-medium">Быстрый запуск</span>
              </div>
              <span className="text-gray-500 pr-4 text-sm">Настройка за 7 дней</span>
            </div>
          </div>
          <h3 className="text-2xl font-bounded font-bold mb-6">Готовы начать автоматизацию вашего лагеря?</h3>
          <a 
            href="#contact" 
            className="inline-block gradient-bg text-white font-semibold py-3.5 px-8 rounded-full shadow-button hover:shadow-button-hover transform hover:-translate-y-1 transition-all btn-animated text-lg"
            onClick={handleContactClick}
          >
            Получить демо-доступ
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 