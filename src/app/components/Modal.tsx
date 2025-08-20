'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ModalFormData, formatMessage, sendTelegramMessage } from '../services/TelegramService';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  const [formData, setFormData] = useState<ModalFormData>({
    name: '',
    email: '',
    phone: ''
  });
  
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  
  // Обработчик изменения полей формы
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  
  // Обработчик маски телефона
  const handlePhoneInput = (e: React.FormEvent<HTMLInputElement>) => {
    setPhoneError(null); // Сбрасываем ошибку при вводе
    const target = e.target as HTMLInputElement;
    target.value = applyPhoneMask(target.value);
    setFormData(prev => ({ ...prev, phone: target.value }));
  };
  
  // Обработчик события change для автозаполнения
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneError(null); // Сбрасываем ошибку при изменении
    const target = e.target as HTMLInputElement;
    // Проверяем, был ли это ввод автозаполнения
    if (target.value && target.value !== formData.phone) {
      target.value = applyPhoneMask(target.value);
      setFormData(prev => ({ ...prev, phone: target.value }));
    }
  };
  
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
  
  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверка полноты ввода телефона
    const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    if (!phonePattern.test(formData.phone)) {
      setPhoneError('Пожалуйста, введите номер телефона полностью');
      return;
    }
    
    setIsFormSubmitting(true);
    
    // Форматирование и отправка сообщения в Telegram
    const message = formatMessage(formData, 'modal');
    const success = await sendTelegramMessage(message);
    
    setIsFormSubmitting(false);
    
    if (success) {
      // Анимированный переход между формой и сообщением об успехе
      setIsFormVisible(false);
      setTimeout(() => {
        setIsFormSubmitted(true);
        setIsSuccessVisible(true);
      }, 300);
      
      setFormData({ name: '', email: '', phone: '' });
    } else {
      // Уведомление об ошибке
      alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
    }
  };
  
  // Закрытие модального окна с анимацией
  const handleCloseModal = () => {
    setIsModalVisible(false);
    // Ждем завершения анимации перед выполнением onClose
    setTimeout(() => {
      onClose();
    }, 300);
  };
  
  // Закрытие модального окна по клику вне его области
  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleCloseModal();
    }
  };
  
  // Закрытие по клику на Escape
  const handleEscKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCloseModal();
    }
  };
  
  // Функция для компенсации исчезновения скролл-бара
  const lockBodyScroll = () => {
    // Измеряем ширину скролл-бара
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    // Сохраняем текущий padding-right
    const currentPadding = parseInt(window.getComputedStyle(document.body).paddingRight, 10) || 0;
    // Устанавливаем padding-right равный ширине скролл-бара + текущий padding
    document.body.style.paddingRight = `${scrollBarWidth + currentPadding}px`;
    document.body.style.overflow = 'hidden';
  };
  
  // Функция для возвращения исходного состояния
  const unlockBodyScroll = () => {
    document.body.style.paddingRight = '';
    document.body.style.overflow = '';
  };
  
  // Сброс состояния формы при закрытии модального окна
  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '' });
    setIsFormSubmitted(false);
    setIsFormVisible(true);
    setIsSuccessVisible(false);
    setPhoneError(null);
  };
  
  // Проверка и обработка автозаполнения при открытии модального окна
  useEffect(() => {
    if (isOpen) {
      // Даем браузеру время на автозаполнение
      const checkAutoFill = setTimeout(() => {
        const phoneInput = phoneInputRef.current;
        if (phoneInput && phoneInput.value && phoneInput.value !== formData.phone) {
          const formattedValue = applyPhoneMask(phoneInput.value);
          phoneInput.value = formattedValue;
          setFormData(prev => ({ ...prev, phone: formattedValue }));
        }
      }, 200);
      
      return () => clearTimeout(checkAutoFill);
    }
  }, [isOpen, formData.phone]);
  
  // Установка видимости модального окна при открытии/закрытии
  useEffect(() => {
    if (isOpen) {
      setIsModalVisible(true);
    }
  }, [isOpen]);
  
  // Эффекты для обработчиков событий
  useEffect(() => {
    if (isOpen) {
      lockBodyScroll(); // Блокировка прокрутки с компенсацией
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscKey);
    } else {
      unlockBodyScroll(); // Разблокировка прокрутки
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscKey);
      // Небольшая задержка для анимации закрытия
      setTimeout(resetForm, 300);
    }
    
    return () => {
      unlockBodyScroll();
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);
  
  // Если модальное окно закрыто и анимация завершена, не рендерим его содержимое
  if (!isOpen && !isModalVisible) return null;
  
  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-primary-black/60 
        ${isModalVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} 
        transition-opacity duration-300 px-3 md:px-4 overflow-y-auto`}
    >
      <div 
        ref={modalRef}
        className={`bg-white w-full max-w-md rounded-2xl shadow-xl 
          transform ${isModalVisible ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'} 
          transition-all duration-300 overflow-hidden
          ${isModalVisible ? 'animate-[fadeIn_0.5s_forwards]' : 'animate-[fadeOut_0.3s_forwards]'} my-4 sm:my-5`}
      >
        {/* Содержимое модального окна */}
        <div id="modalContainer">
          {/* Форма обратной связи */}
          <div 
            id="modalForm" 
            className={`transition-all duration-300 
              ${!isFormVisible ? 'opacity-0 transform -translate-y-4 pointer-events-none' : 'opacity-100'} 
              ${isFormSubmitted ? 'hidden' : ''}`}
          >
            {/* Заголовок модального окна */}
            <div className="relative px-5 sm:px-6 pt-5 sm:pt-6 pb-2 sm:pb-3">
              <button 
                onClick={handleCloseModal}
                className="absolute right-5 top-5 text-gray-400 hover:text-primary-black transition-colors"
              >
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
              <div className="text-center mb-4 sm:mb-5">
                <div className="w-14 h-14 sm:w-16 sm:h-16 gradient-bg rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                  <i className="fa-solid fa-rocket text-xl sm:text-2xl"></i>
                </div>
                <h3 className="font-bounded text-xl font-bold mb-2">Обратный звонок</h3>
                <p className="text-gray-500 text-sm sm:text-base max-w-sm mx-auto">Заполните форму, и мы свяжемся с вами в ближайшее время</p>
              </div>
            </div>
            
            {/* Тело модального окна */}
            <div className="px-5 sm:px-6 pb-5 sm:pb-6">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="modal-name" className="block mb-1.5 font-medium text-gray-700">Имя</label>
                  <input 
                    type="text" 
                    id="modal-name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-primary-gray border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all placeholder-gray-400 hover:shadow-sm"
                    placeholder="Иван Иванов"
                  />
                </div>
                
                <div>
                  <label htmlFor="modal-email" className="block mb-1.5 font-medium text-gray-700">Email</label>
                  <input 
                    type="email" 
                    id="modal-email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 bg-primary-gray border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-blue transition-all placeholder-gray-400 hover:shadow-sm"
                    placeholder="example@mail.ru"
                  />
                </div>
                
                <div>
                  <label htmlFor="modal-phone" className="block mb-1.5 font-medium text-gray-700">Телефон</label>
                  <input 
                    type="tel" 
                    id="modal-phone" 
                    name="phone" 
                    value={formData.phone}
                    onInput={handlePhoneInput}
                    onChange={handlePhoneChange}
                    onFocus={handlePhoneFocus}
                    onBlur={handlePhoneBlur}
                    onKeyDown={handlePhoneKeyDown}
                    ref={phoneInputRef}
                    required
                    className={`w-full px-4 py-2.5 bg-primary-gray border-0 rounded-xl 
                      focus:outline-none focus:ring-2 
                      ${phoneError ? 'focus:ring-primary-red ring-2 ring-primary-red' : 'focus:ring-primary-blue'} 
                      transition-all placeholder-gray-400 hover:shadow-sm`}
                    placeholder="+7 (___) ___-__-__"
                    autoComplete="tel"
                  />
                  {phoneError && (
                    <div className="mt-1.5 text-primary-red text-sm flex items-center">
                      <i className="fa-solid fa-circle-exclamation mr-1"></i>
                      <span>{phoneError}</span>
                    </div>
                  )}
                </div>
                
                <div className="pt-2 sm:pt-3">
                  <button 
                    type="submit" 
                    disabled={isFormSubmitting}
                    className="gradient-bg text-white font-semibold py-2.5 px-6 rounded-xl hover:shadow-button transform hover:-translate-y-1 transition-all w-full btn-animated text-base disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isFormSubmitting ? (
                      <><i className="fa-solid fa-circle-notch fa-spin mr-2"></i>Отправка...</>
                    ) : 'Отправить заявку'}
                  </button>
                </div>
                
                <div className="text-sm text-gray-500 text-center mt-3">
                  Нажимая на кнопку, вы подтверждаете, что ознакомлены и согласны с <Link href="/privacy" className="text-primary-blue hover:underline">политикой конфиденциальности</Link>
                </div>
              </form>
            </div>
          </div>
          
          {/* Сообщение об успешной отправке */}
          <div 
            id="modalSuccess" 
            className={`p-5 sm:p-6 text-center transition-all duration-500 
              ${isSuccessVisible ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95'} 
              ${!isFormSubmitted ? 'hidden' : ''}`}
          >
            <div className="relative mx-auto mb-5">
              <div className="w-18 h-18 gradient-bg rounded-full flex items-center justify-center text-white mx-auto animate-[fadeIn_0.6s_forwards]">
                <i className="fa-solid fa-check text-2xl sm:text-3xl"></i>
              </div>
              <div className="absolute -bottom-1 -left-1 w-22 h-22 rounded-full bg-primary-blue/5 -z-10 blur-xl"></div>
            </div>
            
            <h3 className="font-bounded text-xl font-bold mb-2.5 animate-[fadeIn_0.7s_forwards]">Заявка отправлена!</h3>
            <p className="text-gray-500 text-base mb-4 animate-[fadeIn_0.8s_forwards]">Мы получили вашу заявку и свяжемся с вами в ближайшее время.</p>
            
            <div className="flex justify-center items-center gap-2 text-xs sm:text-sm text-gray-400 mb-4 animate-[fadeIn_0.9s_forwards]">
              <div className="w-2 h-2 rounded-full bg-primary-blue/20"></div>
              <span>Специалист свяжется с вами в течение 24 часов</span>
              <div className="w-2 h-2 rounded-full bg-primary-blue/20"></div>
            </div>
            
            <button 
              type="button" 
              onClick={handleCloseModal}
              className="gradient-bg text-white font-medium py-2.5 px-6 rounded-xl hover:shadow-button transform hover:-translate-y-1 transition-all text-center w-full btn-animated mt-3 text-base animate-[fadeIn_1s_forwards]"
            >
              Отлично
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal; 