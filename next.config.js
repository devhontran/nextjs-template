const path = require('path');
const isProd = process.env.NEXT_PUBLIC_APP_ENV === 'production';
const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');

/** @type {import("next").NextConfig} */

const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
    forceSwcTransforms: true,
  },
  images: {
    minimumCacheTTL: 3600,
    domains: ['admin.uncommonstudio.com.au', 'images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
      },
    ],
  },

  sassOptions: {
    additionalData: `
          @import "@Styles/_tool.scss";
      `,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: {
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
              'prefixIds',
            ],
          },
        },
      },
    });
    return config;
  },
};

module.exports = (phase) => {
  if (isProd && (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD)) {
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
