// next.config.ts
import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

// ✅ Mỗi directive là 1 phần tử array riêng — không bao giờ bị duplicate
const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.tiny.cloud https://*.tinymce.com",
  "style-src 'self' 'unsafe-inline' https://cdn.tiny.cloud https://*.tinymce.com",
  "img-src 'self' blob: data: https:",
  "font-src 'self' https: https://cdn.tiny.cloud https://*.tinymce.com",
  "connect-src 'self' https://api.tonkliplock1000.com https://cdn.tiny.cloud https://*.tinymce.com blob:",
  "media-src 'self' blob: data: https:",
  // ✅ Gộp TẤT CẢ domain vào 1 frame-src duy nhất
  "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com",
  "frame-ancestors 'self'",
];

// Join bằng '; ' — mỗi directive cách nhau bằng dấu chấm phẩy
const csp = cspDirectives.join('; ');

const nextConfig: NextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          ...securityHeaders,
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ];
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.tonkliplock1000.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.jsdelivr.net' },
      { protocol: 'https', hostname: 'cameramattroi.com', pathname: '/**' },
    ],
  },

  async rewrites() {
    return [
      { source: '/api/:path*', destination: 'https://api.tonkliplock1000.com/:path*' },
      { source: '/mediaasset/:path*', destination: 'https://api.tonkliplock1000.com/api/mediaasset/:path*' },
      { source: '/uploads/:path*', destination: 'https://api.tonkliplock1000.com/api/uploads/:path*' },
    ];
  },
};

export default nextConfig;