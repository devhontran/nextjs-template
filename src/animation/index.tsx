import { PropsWithChildren } from 'react';

import PageLoader from './components/PageLoader';
import { AssetsProvider } from './contexts/AssetsContext';
import { EffectProvider } from './contexts/EffectContext';
import { UiProvider } from './contexts/UiContext';

interface Props extends PropsWithChildren {}

export default function Animation({ children }: Props): React.ReactElement {
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
