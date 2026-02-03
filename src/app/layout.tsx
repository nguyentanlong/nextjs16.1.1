// src/app/[locale]/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';
// import AddProductForm from '@/components/ProductEditor';

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
  children: React.ReactNode;

}) {/*
  async function getProducts() {
  const res = await fetch('https://api.tonkliplock1000.com', {
    cache: 'no-store', // luôn lấy dữ liệu mới, tốt cho SEO
  });

  if (!res.ok) {
    throw new Error('Không thể fetch dữ liệu sản phẩm');
  }

  const json = await res.json();
  return json.data; // API của đệ trả về { data: [...] }
}
  const products = await getProducts();*/
  return (
    <html lang='vi'>
      <head>
        <></>
      </head>
      <body>
        <>
          {/* Header—lấy dữ liệu động theo locale */}
          {/* Nội dung trang */}
          {/* <ProductsHome /> */}
          <main>{children}</main>
          {/* <ProductGrid products={products} /> */}

          {/* Footer sẽ thêm sau */}
          {/* <AddProductForm /> */}
          <Script src="/script.js" strategy="afterInteractive" />
          <Script src="./script-alt.js" strategy="afterInteractive" />
          <Script src="./product-script.js" strategy="afterInteractive" />
          <Script src="/script-login.js" strategy="afterInteractive" />
        </>
      </body>
    </html>
  );
}
