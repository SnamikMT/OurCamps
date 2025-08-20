'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ContactFormData, formatMessage, sendTelegramMessage } from '../services/TelegramService';

const ContactSection = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Функция для применения маски к телефону
  const applyPhoneMask = (value: string) => {
    // Удаляем все нецифровые символы
    let digits = value.replace(/\D/g, '');
    
    // Если номер начинается с 7 или 8, сохраняем как есть, иначе добавляем 7 в начало
    if (digits.length > 0 && (digits[0] !== '7' && digits[0] !== '8')) {
      digits = '7' + digits;
    } else if (digits.length === 0) {
      digits = '7';
    }
    
    // Если номер начинается с 8, заменяем на 7 (стандарт РФ)
    if (digits[0] === '8') {
      digits = '7' + digits.substring(1);
    }
    
    // Обрезаем до 11 цифр, если больше
    if (digits.length > 11) {
      digits = digits.substring(0, 11);
    }
    
    // Форматируем по шаблону +7 (XXX) XXX-XX-XX
    let formatted = '';
    if (digits.length > 0) formatted += '+' + digits[0];
    if (digits.length > 1) formatted += ' (';
    if (digits.length > 1) formatted += digits.substring(1, Math.min(4, digits.length));
    if (digits.length > 4) formatted += ') ';
    if (digits.length > 4) formatted += digits.substring(4, Math.min(7, digits.length));
    if (digits.length > 7) formatted += '-';
    if (digits.length > 7) formatted += digits.substring(7, Math.min(9, digits.length));
    if (digits.length > 9) formatted += '-';
    if (digits.length > 9) formatted += digits.substring(9, 11);
    
    return formatted;
  };
  
  const handlePhoneInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    target.value = applyPhoneMask(target.value);
    setFormData(prev => ({ ...prev, phone: target.value }));
  };
  
  // Обработчик события change для автозаполнения
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    // Проверяем, был ли это ввод автозаполнения
    if (target.value && target.value !== formData.phone) {
      target.value = applyPhoneMask(target.value);
      setFormData(prev => ({ ...prev, phone: target.value }));
    }
  };
  
  // Проверка автозаполнения после рендера
  useEffect(() => {
    const phoneInput = phoneInputRef.current;
    if (phoneInput && phoneInput.value && phoneInput.value !== formData.phone) {
      const formattedValue = applyPhoneMask(phoneInput.value);
      phoneInput.value = formattedValue;
      setFormData(prev => ({ ...prev, phone: formattedValue }));
    }
    
    // Добавляем слушатель события автозаполнения (работает в некоторых браузерах)
    const handleAutoFill = () => {
      if (phoneInput && phoneInput.value) {
        const formattedValue = applyPhoneMask(phoneInput.value);
        phoneInput.value = formattedValue;
        setFormData(prev => ({ ...prev, phone: formattedValue }));
      }
    };
    
    // Проверяем периодически, не было ли автозаполнения
    const checkAutoFill = setTimeout(handleAutoFill, 500);
    
    return () => clearTimeout(checkAutoFill);
  }, [formData.phone]);
  
  // Обработчик фокуса на поле телефона
  const handlePhoneFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      e.target.value = '+7 (';
      setFormData(prev => ({ ...prev, phone: e.target.value }));
    }
  };
  
  // Обработчик потери фокуса на поле телефона
  const handlePhoneBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value === '+7 (' || e.target.value === '+7') {
      e.target.value = '';
      setFormData(prev => ({ ...prev, phone: '' }));
    }
  };
  
  // Обработчик клавиш для поля телефона
  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const cursorPosition = target.selectionStart || 0;
    
    // Запрещаем удаление "+7" с помощью backspace или delete
    if ((e.key === 'Backspace' && cursorPosition <= 3) || 
        (e.key === 'Delete' && cursorPosition < 2)) {
      e.preventDefault();
      return;
    }
    
    // Разрешаем только цифры, стрелки, backspace, delete и Tab
    if (
      !/\d/.test(e.key) && 
      e.key !== 'Backspace' && 
      e.key !== 'Delete' && 
      e.key !== 'ArrowLeft' && 
      e.key !== 'ArrowRight' && 
      e.key !== 'Tab'
    ) {
      e.preventDefault();
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверка полноты ввода телефона
    const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    if (!phonePattern.test(formData.phone)) {
      setPhoneError('Пожалуйста, введите номер телефона полностью');
      // Прокрутка к полю с ошибкой
      document.getElementById('phone')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    
    setIsSubmitting(true);
    
    // Форматируем и отправляем сообщение в Telegram
    const message = formatMessage(formData, 'contact');
    const success = await sendTelegramMessage(message);
    
    setIsSubmitting(false);
    
    if (success) {
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      // Сброс статуса через 5 секунд
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } else {
      // Уведомление об ошибке
      alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
    }
  };
  
  return (
    <section id="contact" className="py-20 md:py-28 bg-primary-gray relative overflow-hidden">
      {/* Фоновые элементы */}
      <div className="absolute -top-20 -right-40 w-96 h-96 bg-primary-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 -left-40 w-96 h-96 bg-primary-red/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 bg-primary-blue/10 text-primary-blue rounded-full text-sm font-medium mb-4">
            <i className="fa-solid fa-paper-plane mr-1"></i> Обратная связь
          </span>
          <h2 className="font-bounded text-3xl md:text-4xl font-bold mb-5">Свяжитесь с нами</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Готовы ответить на все ваши вопросы и помочь с внедрением системы
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Контактная информация */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-card h-full">
              <h3 className="font-bounded text-2xl font-bold mb-8">Наши контакты</h3>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 gradient-bg rounded-2xl flex items-center justify-center text-white mr-5 flex-shrink-0">
                    <i className="fa-solid fa-phone text-lg"></i>
                  </div>
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-1">Телефон</h4>
                    <a href="tel:+78002505881" className="text-xl font-semibold hover:text-primary-blue transition-colors">
                      +7 (800) 250-58-81
                    </a>
                    <p className="text-gray-500 text-sm mt-1">Звонок бесплатный</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 gradient-bg rounded-2xl flex items-center justify-center text-white mr-5 flex-shrink-0">
                    <i className="fa-solid fa-envelope text-lg"></i>
                  </div>
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-1">Email</h4>
                    <a href="mailto:info@ourcamps.ru" className="text-xl font-semibold hover:text-primary-blue transition-colors">
                      info@ourcamps.ru
                    </a>
                    <p className="text-gray-500 text-sm mt-1">Ответим в течение 24 часов</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 gradient-bg rounded-2xl flex items-center justify-center text-white mr-5 flex-shrink-0">
                    <i className="fa-brands fa-telegram text-lg"></i>
                  </div>
                  <div>
                    <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-1">Telegram</h4>
                    <a href="https://t.me/ourcamps" className="text-xl font-semibold hover:text-primary-blue transition-colors">
                      @ourcamps
                    </a>
                    <p className="text-gray-500 text-sm mt-1">Самый быстрый способ связи</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Форма контактов */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-card">
              {isSubmitted ? (
                <div className="text-center py-10">
                  <div className="relative mx-auto mb-8">
                    <div className="w-24 h-24 gradient-bg rounded-full flex items-center justify-center text-white mx-auto">
                      <i className="fa-solid fa-check text-4xl"></i>
                    </div>
                    <div className="absolute -bottom-1 -left-1 w-32 h-32 rounded-full bg-primary-blue/5 -z-10 blur-xl"></div>
                  </div>
                  
                  <h3 className="font-bounded text-2xl font-bold mb-3">Сообщение отправлено!</h3>
                  <p className="text-gray-500 text-lg mb-6">Мы получили вашe сообщение и свяжемся с вами в ближайшее время.</p>
                  
                  <div className="flex justify-center items-center gap-2 text-sm text-gray-400 mb-4">
                    <div className="w-2 h-2 rounded-full bg-primary-blue/20"></div>
                    <span>Специалист свяжется с вами в течение 24 часов</span>
                    <div className="w-2 h-2 rounded-full bg-primary-blue/20"></div>
                  </div>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block mb-2 font-medium text-gray-700">Имя</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-primary-gray border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all placeholder-gray-400"
                        placeholder="Иван Иванов"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 font-medium text-gray-700">Email</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 bg-primary-gray border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all placeholder-gray-400"
                        placeholder="example@mail.ru"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block mb-2 font-medium text-gray-700">Телефон</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onInput={handlePhoneInput}
                      onChange={handlePhoneChange}
                      onFocus={handlePhoneFocus}
                      onBlur={handlePhoneBlur}
                      onKeyDown={handlePhoneKeyDown}
                      ref={phoneInputRef}
                      required
                      className={`w-full px-5 py-4 bg-primary-gray border-0 rounded-xl 
                        focus:outline-none focus:ring-2 
                        ${phoneError ? 'focus:ring-primary-red ring-2 ring-primary-red' : 'focus:ring-primary-blue'} 
                        transition-all placeholder-gray-400`}
                      placeholder="+7 (___) ___-__-__"
                      autoComplete="tel"
                    />
                    {phoneError && (
                      <div className="mt-2 text-primary-red text-sm flex items-center">
                        <i className="fa-solid fa-circle-exclamation mr-1"></i>
                        <span>{phoneError}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block mb-2 font-medium text-gray-700">Сообщение</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={5} 
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 bg-primary-gray border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all resize-none placeholder-gray-400"
                      placeholder="Опишите ваш запрос..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="gradient-bg text-white font-semibold py-4 px-8 rounded-xl hover:shadow-button transform hover:-translate-y-1 transition-all w-full md:w-auto btn-animated text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <><i className="fa-solid fa-circle-notch fa-spin mr-2"></i>Отправка...</>
                    ) : 'Отправить сообщение'}
                  </button>
                  
                  <div className="text-sm text-gray-500 mt-1">
                    Нажимая на кнопку, вы подтверждаете, что ознакомлены и согласны с <Link href="/privacy" className="text-primary-blue hover:underline">политикой конфиденциальности</Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 