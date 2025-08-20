import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "./contexts/ModalContext";
import Script from "next/script";
import CookieConsent from "./components/CookieConsent";

// Инициализация шрифта Montserrat с поддержкой кириллицы
const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Наши лагеря | Автоматизированная система продаж",
  description: "Комплексная CRM система для управления детским лагерем: онлайн-продажи путевок, учет детей и родителей, автоматическая генерация документов, интеграция с платежными системами. Повысьте эффективность вашего лагеря!",
  keywords: "CRM для детского лагеря, система продаж путевок, автоматизация лагеря, управление детским лагерем, онлайн-продажи путевок, учет детей в лагере, программа для детского лагеря, детский отдых",
  authors: [{ name: "Наши лагеря" }],
  openGraph: {
    title: "CRM система для детского лагеря | Автоматизация продаж путевок",
    description: "Автоматизируйте процессы, управляйте данными и увеличивайте продажи путевок в детские лагеря с нашей комплексной CRM системой. Онлайн-продажи, управление сменами, учет детей и родителей.",
    url: "https://нашилагеря.рф/",
    siteName: "Наши лагеря",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "https://нашилагеря.рф/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CRM система для детского лагеря",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CRM система для детского лагеря | Автоматизация продаж путевок",
    description: "Автоматизируйте процессы, управляйте данными и увеличивайте продажи путевок в детские лагеря с нашей комплексной CRM системой.",
    images: ["https://нашилагеря.рф/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://нашилагеря.рф/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    yandex: "ce34c8fd47eb5c68",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        {/* Font Awesome */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://нашилагеря.рф/" />
      </head>
      <body
        className={`${montserrat.variable} font-mont bg-primary-white text-primary-black flex flex-col min-h-screen`}
      >
        <ModalProvider>
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
          <CookieConsent />
        </ModalProvider>
        
        {/* Структурированные данные Schema.org - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Наши лагеря",
              "url": "https://нашилагеря.рф",
              "logo": "https://нашилагеря.рф/logo.png",
              "description": "Автоматизированная CRM система продаж путевок и управления детскими лагерями",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "RU",
                "addressLocality": "Рязань",
                "postalCode": "390005",
                "streetAddress": "ул Типанова, д. 21, кв. 74"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+78006006652",
                "contactType": "customer service",
                "email": "info@ourcamps.ru",
                "availableLanguage": "Russian"
              },
              "sameAs": [
                "https://t.me/ourcamps"
              ]
            })
          }}
        />

        {/* Структурированные данные Schema.org - Product */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "CRM система для детского лагеря",
              "description": "Комплексная CRM система для управления детским лагерем: онлайн-продажи путевок, учет детей и родителей, автоматическая генерация документов.",
              "brand": {
                "@type": "Brand",
                "name": "Наши лагеря"
              },
              "offers": {
                "@type": "Offer",
                "url": "https://нашилагеря.рф/",
                "priceCurrency": "RUB",
                "availability": "https://schema.org/InStock"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "127"
              }
            })
          }}
        />

        {/* Структурированные данные Schema.org - SoftwareApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "CRM система для детского лагеря",
              "operatingSystem": "Web",
              "applicationCategory": "BusinessApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "RUB"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "127"
              }
            })
          }}
        />

        {/* Яндекс.Метрика */}
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            
            ym(100853371, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true
            });
          `}
        </Script>
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/100853371" style={{position: 'absolute', left: '-9999px'}} alt="" />
          </div>
        </noscript>
      </body>
    </html>
  );
}
