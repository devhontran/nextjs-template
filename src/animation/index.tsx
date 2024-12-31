import { PropsWithChildren } from 'react';

import PageEffect from './components/PageEffect';
import PageLoader from './components/PageLoader';
import PageReset from './components/PageReset';
import { AnimationProvider } from './contexts/AnimationContext';

interface Props extends PropsWithChildren {}

export default function Animation({ children }: Props): React.ReactElement {
  return (
    <AnimationProvider>
      <PageLoader />
      <PageEffect />
      {children}
      <PageReset />
    </AnimationProvider>
  );
}
