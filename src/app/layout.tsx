import '../styles/app.scss';

import { APP_DESCRIPTION, APP_NAME, APP_TITLE_TEMPLATE, DOMAIN_URL } from '@Constants/common';
import { barlow } from '@Constants/font';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import React from 'react';

import MainLayout from '../layouts/MainLayout/index';

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: APP_TITLE_TEMPLATE,
  },
  metadataBase: new URL(DOMAIN_URL),
  description: APP_DESCRIPTION,
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  keywords: ['amazon', 'agency', 'marketing', 'fba', 'brand', 'seller', 'management'],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    emails: ['contact@deepseecommerce.com'],
    url: DOMAIN_URL,
    title: {
      default: APP_NAME,
      template: APP_TITLE_TEMPLATE,
    },
    images: [
      {
        url: '/thumbnail.jpg',
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_NAME,
      template: APP_TITLE_TEMPLATE,
    },
    images: [
      {
        url: '/thumbnail.jpg',
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
    description: APP_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode | React.ReactElement;
}): React.ReactElement {
  return (
    <html lang="en">
      <body className={barlow.className}>
        <MainLayout>{children}</MainLayout>
      </body>
      <GoogleAnalytics gaId="G-GY2QYKME39" />
    </html>
  );
}

export const viewport: Viewport = {
  themeColor: '#000',
};
