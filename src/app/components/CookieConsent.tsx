'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    // Проверяем, принял ли пользователь куки ранее
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Если нет, сначала рендерим компонент скрытым
      setIsRendered(true);
      // Затем с небольшой задержкой делаем его видимым для анимации
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    // Сначала запускаем анимацию скрытия
    setIsVisible(false);
    // Затем после завершения анимации удаляем компонент из DOM
    setTimeout(() => {
      setIsRendered(false);
      localStorage.setItem('cookieConsent', 'accepted');
    }, 300);
  };

  // Если компонент не должен рендериться, возвращаем null
  if (!isRendered) return null;

  return (
    <div 
      className={`fixed z-50 transition-all duration-300 ease-in-out
                  bottom-0 left-0 right-0 sm:bottom-4 sm:right-4 sm:left-auto
                  ${isVisible ? 'opacity-100 sm:scale-100 translate-y-0' : 'opacity-0 sm:scale-90 translate-y-4'}`}
    >
      <div className="w-full sm:max-w-xs">
        <div className="relative bg-white shadow-lg sm:border-0 border-t border-gray-100 sm:rounded-lg overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-0.5 sm:h-1 gradient-bg"></div>
          
          {/* Кнопка закрытия (крестик) */}
          <button 
            onClick={acceptCookies}
            className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Закрыть уведомление о куки"
          >
            <i className="fa-solid fa-xmark text-gray-400 text-xs"></i>
          </button>
          
          <div className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full gradient-bg flex items-center justify-center text-white flex-shrink-0">
                <i className="fa-solid fa-cookie-bite text-xs"></i>
              </div>
              <h3 className="text-sm font-semibold">Мы используем куки</h3>
            </div>
            
            <p className="text-xs text-gray-500">
              Файлы cookie используются для улучшения вашего опыта и работы Яндекс.Метрики. Продолжая, вы соглашаетесь с{' '}
              <Link href="/privacy" className="text-primary-blue hover:underline">
                политикой конфиденциальности
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent; 