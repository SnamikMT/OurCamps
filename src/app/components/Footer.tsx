'use client';

import Link from 'next/link';
import ExportedImage from 'next-image-export-optimizer';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  
  // Определяем, находимся ли мы на главной странице
  const isHomePage = pathname === '/';
  
  // Функция для формирования ссылок с учетом текущей страницы
  const getHref = (anchor: string) => {
    return isHomePage ? anchor : `/${anchor}`;
  };
  
  return (
    <footer className="bg-primary-black text-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Логотип и описание */}
          <div className="md:col-span-2">
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="w-40 mb-6">
                  <ExportedImage 
                    src="/images/logo.svg" 
                    alt="Наши лагеря - Система продаж для детских лагерей" 
                    width={160} 
                    height={50} 
                    unoptimized={true}
                    className="w-full h-auto brightness-0 invert" 
                  />
                </div>
                <p className="text-white mb-6 max-w-md">
                  Система продаж и администрирования для детских лагерей
                </p>
              </div>
              <div className="mt-auto pt-6">
                <p className="text-gray-500">&copy; {currentYear} ООО «Наши лагеря». Все права защищены.</p>
              </div>
            </div>
          </div>
          
          {/* Контакты */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Контакты</h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+78002505881" className="text-gray-400 hover:text-white flex items-center">
                  <i className="fa-solid fa-phone mr-3 text-primary-blue"></i>
                  +7 (800) 250-58-81
                </a>
              </li>
              <li>
                <a href="mailto:info@ourcamps.ru" className="text-gray-400 hover:text-white flex items-center">
                  <i className="fa-solid fa-envelope mr-3 text-primary-blue"></i>
                  info@ourcamps.ru
                </a>
              </li>
              <li>
                <a href="https://t.me/ourcamps" className="text-gray-400 hover:text-white flex items-center">
                  <i className="fa-brands fa-telegram mr-3 text-primary-blue"></i>
                  @ourcamps
                </a>
              </li>
            </ul>
          </div>
          
          {/* Навигация */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Навигация</h3>
            <ul className="space-y-4">
              <li>
                <Link href={getHref('#features')} className="text-gray-400 hover:text-white">
                  Возможности
                </Link>
              </li>
              <li>
                <Link href={getHref('#services')} className="text-gray-400 hover:text-white">
                  Услуги
                </Link>
              </li>
              <li>
                <Link href={getHref('#pricing')} className="text-gray-400 hover:text-white">
                  Стоимость
                </Link>
              </li>
              <li>
                <Link href={getHref('#contact')} className="text-gray-400 hover:text-white">
                  Контакты
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white">
                  Политика конфиденциальности
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Логотип года детского отдыха */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <ExportedImage 
                src="/images/year_white_horizontal.svg" 
                alt="2025 - Год детского отдыха в системе образования России" 
                width={289} 
                height={64} 
                unoptimized={true}
                className="h-12 w-auto" 
              />
            </div>
            <p className="text-gray-500 text-sm text-center md:text-right">
              Распоряжением Министерства просвещения Российской Федерации <br />
              от 29 августа 2024 г. N Р-160 2025 год объявлен <br />
              Годом детского отдыха в системе образования.
            </p>
          </div>
        </div>
        
        {/* Реквизиты компании */}
        <div className="mt-12 pt-10 border-t border-gray-800">
          <h3 className="text-lg font-semibold mb-4 md:mb-0">Реквизиты организации</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-400 text-sm">
            <div>
              <p className="mb-2"><span className="text-gray-500">Полное наименование:</span> ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ «НАШИ ЛАГЕРЯ»</p>
              <p><span className="text-gray-500">Сокращенное наименование:</span> ООО «НАШИ ЛАГЕРЯ»</p>
            </div>
            <div>
              <p className="mb-2"><span className="text-gray-500">ОГРН:</span> 1256200001980</p>
              <p className="mb-2"><span className="text-gray-500">ИНН:</span> 6200012766</p>
              <p><span className="text-gray-500">КПП:</span> 620001001</p>
            </div>
            <div>
              <p className="mb-2"><span className="text-gray-500">Юридический адрес:</span> 390005, г Рязань, ул Типанова, д. 21, кв. 74</p>
              <p><span className="text-gray-500">Электронная почта:</span> <a href="mailto:info@ourcamps.ru" className="hover:text-white">info@ourcamps.ru</a></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 