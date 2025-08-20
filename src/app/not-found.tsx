'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

export default function NotFound() {
  const [count, setCount] = useState(10);
  
  // Отсчет для автоматического перехода на главную
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          window.location.href = '/';
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-primary-white flex-grow">
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* Фоновые элементы */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-20 -right-40 w-[30rem] h-[30rem] bg-primary-blue/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-40 w-[35rem] h-[35rem] bg-primary-red/5 rounded-full blur-3xl"></div>
        </div>
        
        {/* Хедер */}
        <Header />
        
        {/* Основной контент */}
        <main className="flex-grow flex items-center justify-center py-12 px-4 md:py-20 relative z-10">
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="relative mb-8">
                <div className="text-[8rem] md:text-[12rem] font-bounded font-bold gradient-text leading-none">
                  404
                </div>
                <div className="absolute -top-8 -right-8 w-48 h-48 bg-primary-blue/5 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-primary-red/5 rounded-full blur-3xl -z-10"></div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bounded font-bold mb-4">
                Страница не найдена
              </h1>
              
              <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-2xl">
                Похоже, вы попали на страницу, которой не существует или она была перемещена.
              </p>
              
              <div className="flex mb-12">
                <Link
                  href="/"
                  className="gradient-bg text-white font-semibold py-3.5 px-8 rounded-xl shadow-button hover:shadow-button-hover transform hover:-translate-y-1 transition-all text-lg btn-animated"
                >
                  <i className="fa-solid fa-home mr-2"></i> Вернуться на главную
                </Link>
              </div>
              
              <div className="text-gray-500 text-sm">
                Автоматический переход на главную через <span className="font-semibold text-primary-blue">{count}</span> сек.
              </div>
              
            </div>
          </div>
        </main>
        
        {/* Футер */}
        <Footer />
      </div>
    </div>
  );
} 