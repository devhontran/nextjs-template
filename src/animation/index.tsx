import type { PropsWithChildren, ReactElement } from 'react';

import PageLoader from './components/PageLoader';
import { AssetsProvider } from './contexts/AssetsContext';
import { EffectProvider } from './contexts/EffectContext';
import { UiProvider } from './contexts/UiContext';

export default function Animation({ children }: PropsWithChildren): ReactElement {
  return (
    <UiProvider>
      <EffectProvider>
        <AssetsProvider>
          <PageLoader />
          {children}
        </AssetsProvider>
      </EffectProvider>
    </UiProvider>
  );
}
