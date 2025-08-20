'use client';

import React, { useRef } from 'react';
import TopAnnouncementBar from './components/TopAnnouncementBar';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import FeatureCircleSection from './components/FeatureCircleSection';
import FeaturesOrbitSection from './components/FeaturesOrbitSection';
import ServicesSection from './components/ServicesSection';
import TabsFeatureSection from './components/TabsFeatureSection';
import CtaPromo from './components/CtaPromo';
import PricingSection from './components/PricingSection';
import ContactSection from './components/ContactSection';
import FloatingMockup from './components/FloatingMockup';

export default function Home() {
  // старт/финиш для плавающего мокапа
  const heroMockRef    = useRef<HTMLDivElement | null>(null);
  const featureMockRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <TopAnnouncementBar mode="autohide" />
      <Header />

      {/* relative-обёртка не обязательна, если у FloatingMockup абсолют к window */}
      <main className="flex-grow" itemScope itemType="https://schema.org/SoftwareApplication">
        <meta itemProp="name" content="CRM система для детского лагеря" />
        <meta itemProp="applicationCategory" content="BusinessApplication" />
        <meta itemProp="operatingSystem" content="Web" />
        <meta itemProp="offers" content="Система продаж путевок, учет детей и родителей" />
        <meta
          itemProp="description"
          content="Автоматизированная CRM система для продаж путевок в детские лагеря и комплексного управления лагерем"
        />

        <div className="hidden">
          <h2>CRM система для детского лагеря</h2>
          <p>Наша CRM система специально разработана для автоматизации процессов в детских лагерях...</p>
          <p>Ключевые преимущества нашей CRM...</p>
        </div>

        {/* Hero — старт анимации мокапа */}
        <HeroSection mockRef={heroMockRef} />

        {/* Плавающий мокап */}
        <FloatingMockup
          src="/images/hero-tablet.png"
          alt="Интерфейс системы"
          startRef={heroMockRef}
          endRef={featureMockRef}
        />

        {/* Секция-цель для мокапа */}
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

      <Footer />
    </>
  );
}
