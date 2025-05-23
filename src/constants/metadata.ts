import type { Metadata } from 'next';

import { APP_DESCRIPTION, APP_NAME, APP_TITLE_TEMPLATE, DOMAIN_URL } from '@/constants/common';
import { isProduction } from '@/utils/utils';

export const metadata: Metadata = isProduction()
  ? {}
  : {
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
