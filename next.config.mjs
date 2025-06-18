/** @type {import('next').NextConfig} */

const isProd = process.env.NEXT_PUBLIC_APP_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  turbopack: {
    resolveAlias: {
      underscore: 'lodash',
    },
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  images: {
    minimumCacheTTL: 3600,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'player.vimeo.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },

  sassOptions: {
    additionalData: `@use "@/styles/tool.scss" as *;`,
  },

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    };

    // config.cache = {
    //   type: 'filesystem',
    //   compression: 'gzip',
    //   allowCollectingMemory: true,
    // };
    return config;
  },
};
export default () => {
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
