import localFont from '@next/font/local';
import { Barlow } from 'next/font/google';

export const edingu = localFont({
  src: [
    {
      path: '../../public/fonts/EdinguDemo.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--edingu',
});

export const barlow = Barlow({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
});
