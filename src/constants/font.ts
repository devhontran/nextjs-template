import localFont from 'next/font/local';

export const f37Judge = localFont({
  src: [
    {
      path: '../../public/fonts/F37/F37JudgeTrial-BoldCondensed.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-f37-judge',
});

export const PPNeueMontreal = localFont({
  src: [
    {
      path: '../../public/fonts/PPNeueMontreal/PPNeueMontreal-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PPNeueMontreal/PPNeueMontreal-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PPNeueMontreal/PPNeueMontreal-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PPNeueMontreal/PPNeueMontreal-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PPNeueMontreal/PPNeueMontreal-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-PPNeueMontreal',
});
