'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ExportedImage from 'next-image-export-optimizer';
import { useModal } from '../contexts/ModalContext';
import { usePathname } from 'next/navigation';
import { prefix } from '@/lib/prefix';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openModal } = useModal();
  const pathname = usePathname();
  
  // Определяем, находимся ли мы на главной странице
  const isHomePage = pathname === '/';
  
  // Функция для обработки якорных ссылок
  const handleAnchorClick = (anchor: string, e: React.MouseEvent) => {
    if (!isHomePage) {
      // Если не на главной, переходим на главную с якорем
      e.preventDefault();
      window.location.href = `/${anchor}`;
      return;
    }
    
    // Закрываем мобильное меню если открыто
    if (mobileMenuOpen) {
      closeMobileMenu();
    }
    
    // Плавная прокрутка к якорю
    e.preventDefault();
    const targetElement = document.querySelector(anchor);
    if (targetElement) {
      const headerOffset = 100;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Эффект для определения скролла
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    if (mobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  const openMobileMenu = () => {
    setButtonActive(true);
    setMobileMenuOpen(true);
    // Небольшой таймаут, чтобы React успел отрендерить элемент до начала анимации
    setTimeout(() => {
      setMobileMenuVisible(true);
    }, 10);
    
    // Блокируем скролл, не перемещая страницу
    document.body.classList.add('overflow-hidden');
  };

  const closeMobileMenu = () => {
    setButtonActive(false);
    setMobileMenuVisible(false);
    // Ждем завершения анимации перед полным закрытием меню
    setTimeout(() => {
      setMobileMenuOpen(false);
      // Разблокируем скролл
      document.body.classList.remove('overflow-hidden');
    }, 500);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openModal();
    
    // Если открыто мобильное меню, закрываем его
    if (mobileMenuOpen) {
      closeMobileMenu();
    }
  };

  return (
    <>
      {/* Хедер */}
      <header className={`py-4 sm:py-5 sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-md' : 'bg-white/90 backdrop-blur-md border-b border-gray-100'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="w-full max-w-[140px] xs:max-w-[160px]">
              <Link href="/">
                <ExportedImage 
                  src={`${prefix}/images/logos.svg`} 
                  alt="Наши лагеря - Система продаж для детских лагерей" 
                  width={160} 
                  height={50} 
                  className="w-full h-auto" 
                  priority 
                />
              </Link>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link 
                href={isHomePage ? '#features' : '/#features'} 
                className="nav-link text-gray-700 hover:text-primary-blue font-medium transition-colors text-sm lg:text-base"
                onClick={(e) => handleAnchorClick('#features', e)}
              >
                Возможности
              </Link>
              <Link 
                href={isHomePage ? '#services' : '/#services'} 
                className="nav-link text-gray-700 hover:text-primary-blue font-medium transition-colors text-sm lg:text-base"
                onClick={(e) => handleAnchorClick('#services', e)}
              >
                Услуги
              </Link>
              <Link 
                href={isHomePage ? '#pricing' : '/#pricing'} 
                className="nav-link text-gray-700 hover:text-primary-blue font-medium transition-colors text-sm lg:text-base"
                onClick={(e) => handleAnchorClick('#pricing', e)}
              >
                Стоимость
              </Link>
              <Link 
                href={isHomePage ? '#contact' : '/#contact'} 
                className="nav-link text-gray-700 hover:text-primary-blue font-medium transition-colors text-sm lg:text-base"
                onClick={(e) => handleAnchorClick('#contact', e)}
              >
                Контакты
              </Link>
            </nav>
            
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              <a href="tel:+78002505881" className="flex items-center text-primary-blue hover:text-primary-red transition-colors font-medium text-sm lg:text-base whitespace-nowrap">
                <i className="fa-solid fa-phone mr-2 text-xs lg:text-sm"></i>
                +7 (800) 250-58-81
              </a>
             
              <a 
                href={isHomePage ? '#contact' : '/#contact'} 
                className="gradient-bg text-white font-medium py-2 lg:py-2.5 px-4 lg:px-5 rounded-full shadow-button hover:shadow-button-hover transform hover:-translate-y-0.5 transition-all btn-animated text-sm lg:text-base whitespace-nowrap"
                onClick={handleContactClick}
              >
                Получить консультацию
              </a>
            </div>
            
            {/* Мобильное меню */}
            <button 
              className="md:hidden text-gray-700 focus:outline-none p-2 -mr-2" 
              onClick={toggleMobileMenu}
              aria-label="Открыть меню"
              aria-expanded={mobileMenuOpen}
            >
              <div className={`hamburger ${buttonActive ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Мобильное меню overlay */}
      <div className={`fixed inset-0 z-40 flex items-start transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'block' : 'hidden'} ${mobileMenuVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div 
          className={`absolute inset-0 bg-primary-black/30 backdrop-blur-sm transition-opacity duration-400 ${mobileMenuVisible ? 'opacity-100' : 'opacity-0'}`} 
          onClick={closeMobileMenu}
        ></div>
        <div 
          className={`absolute top-0 pt-20 xs:pt-24 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl transform transition-all duration-450 ease-out will-change-transform flex flex-col h-full ml-auto`}
          style={{
            transitionProperty: 'transform, box-shadow, opacity',
            transform: mobileMenuVisible ? 'translateX(0)' : 'translateX(100%)',
            opacity: mobileMenuVisible ? 1 : 0,
            transitionDuration: '450ms',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div className="flex-grow overflow-y-auto px-5 sm:px-6 pt-4 pb-10">
            <nav className="flex flex-col space-y-6">
              <Link 
                href={isHomePage ? '#features' : '/#features'} 
                className="mobile-nav-link flex items-start transform hover:translate-x-2 transition-transform group p-3 rounded-xl hover:bg-gray-50"
                onClick={(e) => handleAnchorClick('#features', e)}
              >
                <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-xl gradient-bg flex items-center justify-center text-white mr-3 xs:mr-4 shadow-lg flex-shrink-0">
                  <i className="fa-solid fa-star text-sm xs:text-lg"></i>
                </div>
                <div>
                  <span className="text-base xs:text-lg font-semibold block group-hover:text-primary-blue transition-colors">Возможности</span>
                  <span className="text-xs xs:text-sm text-gray-500 block mt-1">Автоматизация и не только</span>
                </div>
              </Link>
              <Link 
                href={isHomePage ? '#services' : '/#services'} 
                className="mobile-nav-link flex items-start transform hover:translate-x-2 transition-transform group p-3 rounded-xl hover:bg-gray-50"
                onClick={(e) => handleAnchorClick('#services', e)}
              >
                <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-xl gradient-bg flex items-center justify-center text-white mr-3 xs:mr-4 shadow-lg flex-shrink-0">
                  <i className="fa-solid fa-briefcase text-sm xs:text-lg"></i>
                </div>
                <div>
                  <span className="text-base xs:text-lg font-semibold block group-hover:text-primary-blue transition-colors">Услуги</span>
                  <span className="text-xs xs:text-sm text-gray-500 block mt-1">Комплексные решения</span>
                </div>
              </Link>
              <Link 
                href={isHomePage ? '#pricing' : '/#pricing'} 
                className="mobile-nav-link flex items-start transform hover:translate-x-2 transition-transform group p-3 rounded-xl hover:bg-gray-50"
                onClick={(e) => handleAnchorClick('#pricing', e)}
              >
                <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-xl gradient-bg flex items-center justify-center text-white mr-3 xs:mr-4 shadow-lg flex-shrink-0">
                  <i className="fa-solid fa-coins text-sm xs:text-lg"></i>
                </div>
                <div>
                  <span className="text-base xs:text-lg font-semibold block group-hover:text-primary-blue transition-colors">Стоимость</span>
                  <span className="text-xs xs:text-sm text-gray-500 block mt-1">Прозрачное ценообразование</span>
                </div>
              </Link>
              <Link 
                href={isHomePage ? '#contact' : '/#contact'} 
                className="mobile-nav-link flex items-start transform hover:translate-x-2 transition-transform group p-3 rounded-xl hover:bg-gray-50"
                onClick={(e) => handleAnchorClick('#contact', e)}
              >
                <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-xl gradient-bg flex items-center justify-center text-white mr-3 xs:mr-4 shadow-lg flex-shrink-0">
                  <i className="fa-solid fa-paper-plane text-sm xs:text-lg"></i>
                </div>
                <div>
                  <span className="text-base xs:text-lg font-semibold block group-hover:text-primary-blue transition-colors">Контакты</span>
                  <span className="text-xs xs:text-sm text-gray-500 block mt-1">Свяжитесь с нами для консультации</span>
                </div>
              </Link>
              
              <div className="w-1/3 h-0.5 bg-gray-100 my-2 rounded-full mx-auto"></div>
              
              <a href="tel:+78002505881" className="flex items-start transform hover:translate-x-2 transition-transform p-3 rounded-xl hover:bg-gray-50">
                <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-xl bg-primary-blue/10 flex items-center justify-center text-primary-blue mr-3 xs:mr-4 flex-shrink-0">
                  <i className="fa-solid fa-phone text-sm xs:text-lg"></i>
                </div>
                <div>
                  <span className="text-base xs:text-lg font-semibold text-primary-blue block">+7 (800) 250-58-81</span>
                  <p className="text-xs xs:text-sm text-gray-500 mt-1">Звонок бесплатный</p>
                </div>
              </a>
             
            </nav>
          </div>
          
          <div className="p-5 sm:p-6 border-t border-gray-100 bg-gradient-to-br from-primary-gray to-white w-full">
            <div className="mb-4 xs:mb-5">
              <h4 className="text-sm xs:text-base font-bold font-bounded mb-1">Нужна помощь с продажами путевок?</h4>
              <p className="text-xs xs:text-sm text-gray-500">Мы поможем настроить автоматизированную систему</p>
            </div>
            <a 
              href={isHomePage ? '#contact' : '/#contact'} 
              className="gradient-bg text-white font-medium py-3 px-5 rounded-xl shadow-button hover:shadow-button-hover transform hover:-translate-y-1 transition-all text-center w-full block text-sm xs:text-base"
              onClick={handleContactClick}
            >
              Обратный звонок
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;