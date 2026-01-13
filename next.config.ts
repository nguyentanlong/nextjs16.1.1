import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // đa ngôn ngữ
  i18n: { locales: ['vi', 'en'], defaultLocale: 'vi', },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
