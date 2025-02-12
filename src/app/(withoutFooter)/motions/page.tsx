import React from 'react';

import { AssetsProvider } from '@/animation/contexts/AssetsContext';

export default function Page(): React.ReactElement {
  return <AssetsProvider>MotionsPage</AssetsProvider>;
}
