import '@/constants/metadata';
import '@/styles/app.scss';
// import { GoogleAnalytics } from '@next/third-parties/google';
import '@/utils/gsap-custom-ease';

import type { Viewport } from 'next';
import React from 'react';

import { manrope } from '@/constants/font';
import MainLayout from '@/layouts/MainLayout';
import { ChakraProvider } from '@/providers/ChakraProvider';
import { isDevelopment } from '@/utils/utils';

export const viewport: Viewport = {
  themeColor: '#000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode | React.ReactElement;
}): React.ReactElement {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `history.scrollRestoration = 'manual'` }} />
        {isDevelopment() && (
          <script src="https://unpkg.com/react-scan/dist/auto.global.js"></script>
        )}
      </head>
      <body className={manrope.variable}>
        <ChakraProvider>
          <MainLayout>{children}</MainLayout>
        </ChakraProvider>
      </body>
      {/*<GoogleAnalytics gaId="G-GY2QYKME39" />*/}
    </html>
  );
}
