import type { PropsWithChildren, ReactElement } from 'react';

import PageEffect from './components/PageEffect';
import PageLoader from './components/PageLoader';
import { AssetsProvider } from './contexts/AssetsContext';
import { CursorProvider } from './contexts/CursorContext';
import { EffectProvider } from './contexts/EffectContext';
import { UiProvider } from './contexts/UiContext';

export default function Animation({ children }: PropsWithChildren): ReactElement {
  return (
    <UiProvider>
      <EffectProvider>
        <AssetsProvider>
          <PageLoader />
          <CursorProvider>{children}</CursorProvider>
          <PageEffect />
        </AssetsProvider>
      </EffectProvider>
    </UiProvider>
  );
}
