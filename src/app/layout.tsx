import type { Metadata } from 'next';
import { AppProvider } from '@/context/AppContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';
// ADDED: Vercel Analytics imports
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: 'Majestic Trails - Adventure Travel',
  description: 'Experience breathtaking adventures with Majestic Trails - Kilimanjaro Climbing, Safari Tours, and Zanzibar Beach Holidays',
  // ADDED: Additional metadata for better SEO and social sharing
  keywords: 'Kilimanjaro climbing, Tanzania safari, Zanzibar beach, adventure travel, African safaris, Mount Kilimanjaro, Serengeti migration',
  authors: [{ name: 'Majestic Trails' }],
  creator: 'Majestic Trails',
  publisher: 'Majestic Trails',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://majestic-trails-africa.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Majestic Trails - Adventure Travel',
    description: 'Experience breathtaking adventures with Majestic Trails - Kilimanjaro Climbing, Safari Tours, and Zanzibar Beach Holidays',
    url: 'https://majestic-trails-africa.vercel.app',
    siteName: 'Majestic Trails',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Majestic Trails - Adventure Travel',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Majestic Trails - Adventure Travel',
    description: 'Experience breathtaking adventures with Majestic Trails - Kilimanjaro Climbing, Safari Tours, and Zanzibar Beach Holidays',
    images: ['/images/og-image.jpg'],
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
  verification: {
    google: 'your-google-verification-code', // You can add this later if needed
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <AppProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </AppProvider>
        {/* ADDED: Vercel Analytics - Tracks visitors and page views */}
        <Analytics />
        {/* ADDED: Vercel Speed Insights - Tracks performance metrics */}
        <SpeedInsights />
      </body>
    </html>
  );
}