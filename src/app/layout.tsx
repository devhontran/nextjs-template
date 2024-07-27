import '../styles/app.scss';
import '@/constants/metadata';

// import { GoogleAnalytics } from '@next/third-parties/google';
import type { Viewport } from 'next';

import MainLayout from '../layouts/MainLayout/index';

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
      </head>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
      {/*<GoogleAnalytics gaId="G-GY2QYKME39" />*/}
    </html>
  );
}
