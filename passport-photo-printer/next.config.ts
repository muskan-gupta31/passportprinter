import withPWA from 'next-pwa';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ✅ Tell Next.js to use Webpack instead of Turbopack (for now)
  experimental: {}, // Remove deprecated appDir
  webpack: (config) => config,

  // ✅ Add empty Turbopack config to silence warnings
  turbopack: {},
};

export default withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})(nextConfig);
