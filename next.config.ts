// next.config.ts
import type { NextConfig } from 'next';

// Các header bảo mật cơ bản để chống một số tấn công phổ biến
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' }, // Ngăn trình duyệt đoán kiểu MIME
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' }, // Chống clickjacking
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }, // Kiểm soát referrer
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }, // Hạn chế quyền
];

// Content Security Policy—giới hạn nguồn tài nguyên được phép tải
const csp = `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tiny.cloud https://*.tinymce.com; style-src 'self' 'unsafe-inline' https://cdn.tiny.cloud https://*.tinymce.com; img-src 'self' blob: data: https: https://cdn.tiny.cloud https://*.tinymce.com; font-src 'self' https: https://cdn.tiny.cloud https://*.tinymce.com; connect-src 'self' https://api.tonkliplock1000.com https://cdn.tiny.cloud https://*.tinymce.com blob:; media-src 'self' blob: data: https:; frame-ancestors 'self';
`.replace(/\s{2,}/g, ' ').trim();
/*default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tiny.cloud https://*.tinymce.com;
              style-src 'self' 'unsafe-inline' https://cdn.tiny.cloud https://*.tinymce.com;
              img-src 'self' blob: data: https: https://cdn.tiny.cloud https://*.tinymce.com;
              font-src 'self' https: https://cdn.tiny.cloud https://*.tinymce.com;
              connect-src 'self' https://api.tonkliplock1000.com https://cdn.tiny.cloud https://*.tinymce.com 
              media-src 'self' blob: data: https:; frame-ancestors 'self';*/
/* default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' https:;
  connect-src 'self' https://api.tonkliplock1000.com;
  frame-ancestors 'self'*/
const nextConfig: NextConfig = {
  reactStrictMode: false,// true khi build
  poweredByHeader: false, // Ẩn header X-Powered-By để giảm fingerprinting
  // cacheComponents: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          ...securityHeaders,
          { key: 'Content-Security-Policy', value: csp }, // Áp dụng CSP cho toàn site
        ],
      },
    ];
  },
  // Cấu hình đa ngôn ngữ—routing theo locale
  i18n: {
    locales: ['vi', 'en'],
    defaultLocale: 'vi',
    localeDetection: false,
  },
  // Cho phép tải ảnh từ các domain cần thiết
  images: {
    domains: ['cameramattroi.com'], // 👈 thêm ảnh từ domain này
    remotePatterns: [
      { protocol: 'https', hostname: 'api.tonkliplock1000.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
      { protocol: 'https', hostname: 'cameramattroi.com' },
      // {
      //   protocol: "https",
      //   hostname: "api.tonkliplock1000.com",
      //   pathname: "/mediaasset/**",
      // },
    ],
  },
  async rewrites() {
    return [{
      source: "/api/:path*",
      destination: "https://api.tonkliplock1000.com/:path*",
    },
    {
      source: "/mediaasset/:path*",
      destination: "https://api.tonkliplock1000.com/api/mediaasset/:path*",
    },
    ];
  },

};

export default nextConfig;
