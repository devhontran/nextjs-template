import Header from '@Layouts/Header';
import React, { PropsWithChildren } from 'react';

import Animate from '@/animation';
import DebugGrid from '@/components/DebugGrid';
import LenisScroller from '@/components/Lenis';

export default function MainLayout({ children }: PropsWithChildren): React.ReactElement {
  return (
    <>
      <Animate>
        <Header />
        <LenisScroller>{children}</LenisScroller>
      </Animate>
      <DebugGrid />
      {/*<MobileDisabledRotation />*/}
    </>
  );
}
