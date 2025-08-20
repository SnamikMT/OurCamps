'use client';

import React, { useRef } from 'react';
import TopAnnouncementBar from './components/TopAnnouncementBar';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
// Если ты заменяешь старую FeaturesSection на новый — импортируй FeatureCircleSection:
import FeatureCircleSection from './components/FeatureCircleSection';
import FeaturesOrbitSection from './components/FeaturesOrbitSection';
import ServicesSection from './components/ServicesSection';
import TabsFeatureSection from './components/TabsFeatureSection';
import CtaPromo from './components/CtaPromo';
import PricingSection from './components/PricingSection';
import ContactSection from './components/ContactSection';

// FloatingMockup — клиентский компонент, который мы написали
import FloatingMockup from './components/FloatingMockup';

export default function Home() {
  // refs для "стартовой" и "конечной" позиций мокапа
  const heroMockRef = useRef<HTMLDivElement | null>(null);
  const featureMockRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
    <TopAnnouncementBar mode="autohide" />

      <Header />

      {/* Обёртка с relative — чтобы FloatingMockup позиционировался корректно внутри страницы */}
      <div>
        <main className="flex-grow" itemScope itemType="https://schema.org/SoftwareApplication">
          <meta itemProp="name" content="CRM система для детского лагеря" />
          <meta itemProp="applicationCategory" content="BusinessApplication" />
          <meta itemProp="operatingSystem" content="Web" />
          <meta itemProp="offers" content="Система продаж путевок, учет детей и родителей" />
          <meta itemProp="description" content="Автоматизированная CRM система для продаж путевок в детские лагеря и комплексного управления лагерем" />

          <div className="hidden">
            <h2>CRM система для детского лагеря</h2>
            <p>Наша CRM система специально разработана для автоматизации процессов в детских лагерях. ...</p>
            <p>Ключевые преимущества нашей CRM для детских лагерей: - Автоматизация оформления путевок и документов ...</p>
          </div>

          {/* Hero — передаём ref для старта анимации мокапа */}
          <HeroSection mockRef={heroMockRef} />

          {/* FloatingMockup — один экземпляр, который будет "плавать" */}
          <FloatingMockup
            src="/images/hero-tablet.png"
            alt="Интерфейс системы"
            startRef={heroMockRef}
            endRef={featureMockRef}
          />


          {/* Новая секция с концентрическими кругами — здесь мокап должен "остановиться" */}
          <FeatureCircleSection mockRef={featureMockRef} />

          {/* Остальные секции */}
          <FeaturesOrbitSection />
          <CtaPromo
            bgImage="/images/my-bg.png"
            mock="/images/desktop-front.png"
            protrudeTopPx={130}
          />
          <ServicesSection />
          <TabsFeatureSection />
          <PricingSection />
          <ContactSection />
        </main>
      </div>

      <Footer />
    </>
  );
}
