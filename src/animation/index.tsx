'use client';

import { PropsWithChildren } from 'react';

import PageEffect from './components/PageEffect';
import PageLoader from './components/PageLoader';
import { AnimationProvider } from './contexts/AnimationContext';

interface Props extends PropsWithChildren {}

export default function Animation({ children }: Props): React.ReactElement {
  return (
    <AnimationProvider>
      <main>
        <PageLoader />
        <PageEffect />
        {children}
      </main>
    </AnimationProvider>
  );
}
