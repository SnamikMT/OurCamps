'use client';

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="py-20 md:py-28 bg-white relative overflow-hidden"
    >
      {/* Фоновые элементы */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -left-40 w-96 h-96 bg-primary-red/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Надзаголовок */}
        <div className="text-center mb-6">
          <span className="inline-block py-1.5 px-4 bg-primary-blue/10 text-primary-blue rounded-full text-sm font-medium">
            <i className="fa-solid fa-arrow-trend-up mr-1"></i>
            Снижайте заботы, повышайте эффективность
          </span>
        </div>

        {/* Заголовок */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-bounded text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
            Комплексное решение <br />
            для любого лагеря
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            Полный спектр услуг для детских лагерей
          </p>
        </div>

        {/* Основные карточки */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Сопровождение */}
          <div className="bg-primary-gray p-10 rounded-3xl shadow-sm hover:shadow-card transition-all duration-300 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-red/5 rounded-full blur-xl"></div>

            <div className="absolute top-10 right-4 z-20 hidden md:block">
              <span className="inline-block text-xs font-bounded bg-primary-blue/10 text-primary-blue py-1 px-3 rounded-full">
                В комплекте
              </span>
            </div>

            <div className="mb-6 relative z-10">
              <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center text-white mb-4">
                <i className="fa-solid fa-headset text-2xl"></i>
              </div>
              <span className="inline-block text-xs md:hidden bg-primary-blue/10 text-primary-blue py-1 px-3 rounded-full mb-2">
                В комплекте
              </span>
              <h3 className="font-bounded text-2xl font-bold mb-2">
                Сопровождение
              </h3>
              <p className="text-gray-600 text-base mb-6">
                Полное сопровождение вашего лагеря на всех этапах внедрения и
                использования системы.
              </p>
            </div>

            <ul className="space-y-3 relative z-10">
              {[
                {
                  title: 'Виджет для вашего сайта',
                  desc: 'Встраиваемый виджет продаж путевок для вашего текущего сайта',
                },
                {
                  title: 'Корпоративная почта',
                  desc: 'Настройка корпоративной почты для вашего лагеря',
                },
                {
                  title: 'Интеграция с платежным шлюзом',
                  desc: 'Подключение платежной системы и сопровождение',
                },
                {
                  title: 'Юридическое сопровождение',
                  desc: 'Подготовка всех необходимых договоров и документов',
                },
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <div className="w-6 h-6 gradient-bg rounded-full flex items-center justify-center text-white mr-3 mt-0.5">
                    <i className="fa-solid fa-check text-xs"></i>
                  </div>
                  <div className="w-[85%]">
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Доп. услуги */}
          <div className="bg-primary-gray p-10 rounded-3xl shadow-sm hover:shadow-card transition-all duration-300 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-blue/5 rounded-full blur-xl"></div>

            <div className="absolute top-10 right-4 z-20 hidden md:block">
              <span className="inline-block text-xs font-bounded bg-primary-red/10 text-primary-red py-1 px-3 rounded-full">
                По запросу
              </span>
            </div>

            <div className="mb-6 relative z-10">
              <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center text-white mb-4">
                <i className="fa-solid fa-plus text-2xl"></i>
              </div>
              <span className="inline-block text-xs md:hidden bg-primary-red/10 text-primary-red py-1 px-3 rounded-full mb-2">
                По запросу
              </span>
              <h3 className="font-bounded text-2xl font-bold mb-2">
                Дополнительные услуги
              </h3>
              <p className="text-gray-600 text-base mb-6">
                Реализуем индивидуальные пожелания каждого учреждения.
              </p>
            </div>

            <ul className="space-y-3 relative z-10">
              {[
                {
                  title: 'Разработка сайта под ключ',
                  desc: 'Создание современного сайта с интеграцией системы продаж',
                },
                {
                  title: 'Телефония для лагеря',
                  desc: 'Настройка IP-телефонии и виртуальной АТС',
                },
                {
                  title: 'Организация интернета',
                  desc: 'Помощь с организацией интернет-соединения на территории лагеря',
                },
                {
                  title: 'Индивидуальная разработка',
                  desc: 'Разработка дополнительных модулей под ваши требования',
                },
                {
                  title: 'Маркетинговое сопровождение',
                  desc: 'Помощь в продвижении лагеря и привлечении клиентов',
                },
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <div className="w-6 h-6 gradient-bg rounded-full flex items-center justify-center text-white mr-3 mt-0.5">
                    <i className="fa-solid fa-check text-xs"></i>
                  </div>
                  <div className="w-[85%]">
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Блок преимуществ */}
        <div className="mt-16 md:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: 'fa-rocket',
                title: 'Быстрый запуск',
                desc: 'Настройка системы занимает от 2 до 7 дней в зависимости от лагеря',
              },
              {
                icon: 'fa-shield-halved',
                title: 'Безопасность данных',
                desc: 'Все данные надежно защищены в соответствии с требованиями ФЗ-152',
              },
              {
                icon: 'fa-headset',
                title: 'Поддержка 24/7',
                desc: 'Наша команда поддержки всегда готова помочь вам решить любые вопросы',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-primary-white p-8 rounded-3xl shadow-sm hover:shadow-card border border-gray-100 text-center transition-all duration-300"
              >
                <div className="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center text-white mb-4 mx-auto">
                  <i className={`fa-solid ${item.icon} text-xl`}></i>
                </div>
                <h3 className="font-bounded text-xl font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Кнопка */}
        <div className="text-center mt-12">
          <a
            href="#contact"
            className="gradient-bg text-white font-semibold py-3.5 px-8 rounded-xl shadow-button hover:shadow-button-hover transform hover:-translate-y-1 transition-all inline-block"
          >
            Получить демо-доступ
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
