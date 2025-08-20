'use client';

// Конфигурация Telegram бота
const telegramConfig = {
  token: '8114065899:AAHhz1BRJTPQBCbEoxWsMOsMaTjVbVIOnlI',
  chatId: '-4574867076',
};

// Интерфейс для формы обратного звонка
export interface ModalFormData {
  name: string;
  email: string;
  phone: string;
}

// Интерфейс для основной контактной формы
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Тип формы для определения формата сообщения
export type FormType = 'modal' | 'contact';

// Функция форматирования сообщения в зависимости от типа формы
export const formatMessage = (data: ModalFormData | ContactFormData, formType: FormType): string => {
  let message = `<b>🔔 Новая заявка с сайта (${formType === 'modal' ? 'Форма обратного звонка' : 'Контактная форма'})</b>\n\n`;
  
  // Общие поля для обоих типов форм
  message += `<b>Имя:</b> ${data.name}\n`;
  message += `<b>Email:</b> ${data.email}\n`;
  message += `<b>Телефон:</b> ${data.phone}\n`;
  
  // Добавление сообщения только для контактной формы
  if (formType === 'contact' && 'message' in data) {
    message += `<b>Сообщение:</b> ${data.message}\n`;
  }
  
  return message;
};

// Функция отправки сообщения в Telegram
export const sendTelegramMessage = async (message: string): Promise<boolean> => {
  try {
    const response = await fetch(`https://api.telegram.org/bot${telegramConfig.token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: telegramConfig.chatId,
        text: message,
        parse_mode: 'HTML'
      })
    });
    
    const result = await response.json();
    return result.ok;
  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error);
    return false;
  }
}; 