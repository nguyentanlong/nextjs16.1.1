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
const csp = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' https:;
  connect-src 'self' https://api.tonkliplock1000.com;
  frame-ancestors 'self';
`.replace(/\s{2,}/g, ' ').trim();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // Ẩn header X-Powered-By để giảm fingerprinting
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
    remotePatterns: [
      { protocol: 'https', hostname: 'api.tonkliplock1000.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
    ],
  },
};

export default nextConfig;
