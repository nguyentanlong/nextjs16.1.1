// src/app/[locale]/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import Script from 'next/script';
import Category from '@/components/Category';
import PopularCategory from '@/components/PopularCategory';
import ProductsHome from '@/components/ProductsHome';
import ProductGrid from '@/components/ProductGrid';
import ReBanner from '@/components/ReBanner';
import Footer from '@/components/Footer';

// Metadata chuẩn SEO—không dùng next-seo, dùng Metadata API của Next.js 16.1.1
export const metadata: Metadata = {
  title: {
    default: 'Camera giám sát - năng lượng mặt trời',
    template: '%s | Camera giám sát - năng lượng mặt trời',
  },
  icons: {
    icon: '/favicon.ico', // favicon chính 
    shortcut: '/favicon.png', // favicon phụ 
    apple: '/apple-touch-icon.png',
  },// cho iOS
  description: `Thi công điện dân dụng, công nghiệp, camera giám sát, năng lượng mặt trời, pccc, blhd, cơ điện tại HCM, Bình Dương, 
  Bình Phước, Đồng Nai, Tây Ninh, Vũng Tàu, DakNong, DakLak, toàn quốc. Nghiệm thu từng giai đoạn, chuyên
  nghiệp`,
  keywords: ['camera giám sat', 'năng lượng mặt trời', 'thi công điện nước', 'pccc'],
  metadataBase: new URL('https://cameramattroi.com'),
  openGraph: {
    title: 'Camera giám sát - năng lượng mặt trời',
    description: `Thi công điện dân dụng, công nghiệp, camera giám sát, năng lượng mặt trời, pccc, blhd, cơ điện tại HCM, Bình Dương, 
  Bình Phước, Đồng Nai, Tây Ninh, Vũng Tàu, DakNong, DakLak, toàn quốc. Nghiệm thu từng giai đoạn, chuyên
  nghiệp`,
    url: 'https://cameramattroi.com',
    siteName: 'Camera giám sát - năng lượng mặt trời',
    images: [{ url: '/og-cover.jpg', width: 1200, height: 630, alt: 'Camera giám sát - năng lượng mặt trời' }],
    // locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Camera giám sát - năng lượng mặt trời',
    description: `Thi công điện dân dụng, công nghiệp, camera giám sát, năng lượng mặt trời, pccc, blhd, cơ điện tại HCM, Bình Dương, 
  Bình Phước, Đồng Nai, Tây Ninh, Vũng Tàu, DakNong, DakLak, toàn quốc. Nghiệm thu từng giai đoạn, chuyên
  nghiệp`,
    images: ['/og-cover.jpg'],
  },
  /*alternates: {
    canonical: 'https://cameramattroi.com',
    languages: {
      vi: 'https://cameramattroi.com/vi',
      en: 'https://cameramattroi.com/en',
    },
  },*/
};

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang='vi'>
      <head>
        <></>
      </head>
      <body className="">
        <>
          {/* Header—lấy dữ liệu động theo locale */}
          <Header />
          <HeroBanner />
          <Category />
          <PopularCategory />
          <ProductsHome />
          {/* <ProductGrid /> */}
          <ReBanner />
          <Footer />
          {/* Nội dung trang */}
          {/* <main>{children}</main> */}
          {/* Footer sẽ thêm sau */}
          <Script src="/script.js" strategy="afterInteractive" />
        </>
      </body>
    </html>
  );
}
