/** @type {import('next').NextConfig} */

const isProd = process.env.NEXT_PUBLIC_APP_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
     turbo: {
      resolveAlias: {
        underscore: 'lodash',
      },
      resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json'],
    },
  },
   images: {
    minimumCacheTTL: 3600,
    domains: ['admin.uncommonstudio.com.au', 'images.unsplash.com', 'picsum.photos'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
      },
    ],
  },

  sassOptions: {
    additionalData: `@use "@/styles/tool.scss" as *;`,
  },
  
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    }
    return config
  },
}
export default (phase) => {
  if (isProd) {
    const withPWA = require('@ducanh2912/next-pwa').default({
      dest: 'public',
      workboxOptions: {
        disableDevLogs: true,
      },
      pwa: {
        dest: 'public',
        mode: 'production',
      },
    });
    return withPWA(nextConfig);
  }
  return nextConfig;
};
