// src/app/[locale]/layout.tsx
import type { Metadata, Viewport } from 'next';
import './globals.css';
import Script from 'next/script';
import { AuthProvider } from '@/context/AuthContext';
// import Footer from '@/components/Footer';
// import Header from '@/components/Header';

// import AddProductForm from '@/components/ProductEditor';
//làm cho hiển thị hình ảnh mô tả khi share
/*const imageUrl = `/favicon.ico`;
// ✅ Strip HTML trước khi dùng trong metadata
function stripHtml(html: string) {
    return html?.replace(/<[^>]*>/g, "").trim() ?? "";
}*///làm cho hiển thị hình ảnh mô tả khi share
// Metadata chuẩn SEO—không dùng next-seo, dùng Metadata API của Next.js 16.1.1
export const metadata: Metadata = {

  title: {
    default: 'Camera giám sát - năng lượng mặt trời',
    template: '%s | Camera giám sát - năng lượng mặt trời',
  },
  icons: {
    icon: '/logo-manh-phat-van-ban.png', // favicon chính 
    shortcut: '/favicon.png', // favicon phụ 
    apple: '/favicon.ico',
  },// cho iOS
  description: `Thi công điện dân dụng, công nghiệp, camera giám sát, năng lượng mặt trời, pccc, blhd, cơ điện tại HCM, Bình Dương, 
  Bình Phước, Đồng Nai, Tây Ninh, Vũng Tàu, DakNong, DakLak, toàn quốc. Nghiệm thu từng giai đoạn, chuyên
  nghiệp`,
  keywords: ['camera giám sát', 'năng lượng mặt trời', 'thi công điện nước', 'pccc',
    'camera giam sat', 'nang luong mat troi', 'thi cong dien nuoc', 'thiết bị pccc',
    'thiet bi pccc', 'bình chữa cháy', 'binh chua chay', 'bảo hộ lao động',
    'bao ho lao dong'
  ],
  metadataBase: new URL('https://tanong.work.gd'),
  openGraph: {
    title: 'Camera giám sát - năng lượng mặt trời',
    description: `Thi công điện dân dụng, công nghiệp, camera giám sát, năng lượng mặt trời, pccc, blhd, cơ điện tại HCM, Bình Dương, 
  Bình Phước, Đồng Nai, Tây Ninh, Vũng Tàu, DakNong, DakLak, toàn quốc. Nghiệm thu từng giai đoạn, chuyên
  nghiệp`,
    url: 'https://tanlong.work.gd',
    siteName: 'Camera giám sát - năng lượng mặt trời',
    images: [{
      url: '/logo-manh-phat-van-ban.png', width: 1200, height: 630,
      alt: 'Camera giám sát - năng lượng mặt trời'
    }],
    locale: 'vi_VN',
    phoneNumbers: "0328732676",
    emails: "hitlong.dinho.89@gmail.com",
    type: 'website',
    countryName: "Việt Nam",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Camera giám sát - năng lượng mặt trời',
    description: `Thi công điện dân dụng, công nghiệp, camera giám sát, năng lượng mặt trời, pccc, blhd, cơ điện tại HCM, Bình Dương, 
  Bình Phước, Đồng Nai, Tây Ninh, Vũng Tàu, DakNong, DakLak, toàn quốc. Nghiệm thu từng giai đoạn, chuyên
  nghiệp`,
    images: [{
      url: '/logo-manh-phat-van-ban.png', width: 800, height: 630,
      alt: 'Camera giám sát - năng lượng mặt trời'
    }],
  },
  alternates: {
    canonical: 'https://tanlong.work.gd',
    /*languages: {
      vi: 'https://cameramattroi.com/vi',
      en: 'https://cameramattroi.com/en',
    },*/
  },
  // metadataBase: new URL('https://tanlong.cameramattroi.com'),
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}
export default function RootLayout({ children }: {
  children: React.ReactNode;

}) {
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
          <AuthProvider>
            {/* <Header /> */}
            {children}
            {/* <Footer /> */}
          </AuthProvider>
          {/* <ProductGrid products={products} /> */}

          {/* Footer sẽ thêm sau */}
          {/* <AddProductForm /> */}
          {/* <Script src="/script.js" strategy="lazyOnload" /> 
          <Script src="./script-alt.js" strategy="lazyOnload" />
          <Script src="./product-script.js" strategy="lazyOnload" />
          <Script src="/script-login.js" strategy="lazyOnload" />*/}
          {/* <script src="/tinymce/tinymce.min.js"></script> */}
        </>
      </body>
    </html>
  );
}
