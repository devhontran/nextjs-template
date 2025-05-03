import React from 'react';

import { AssetsProvider } from '@/animation/contexts/AssetsContext';

export default function Page(): React.ReactElement {
  return (
    <AssetsProvider>
      <h1>Motions</h1>
    </AssetsProvider>
  );
}
