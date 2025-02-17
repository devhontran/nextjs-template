import Header from '@Layouts/Header';
import React, { PropsWithChildren } from 'react';

import Animation from '@/animation';
import DebugGrid from '@/components/DebugGrid';
import LenisScroller from '@/components/Lenis';

export default function MainLayout({ children }: PropsWithChildren): React.ReactElement {
  return (
    <>
      <Animation>
        <Header />
        <LenisScroller>{children}</LenisScroller>
        <DebugGrid />
      </Animation>
      {/*<MobileDisabledRotation />*/}
    </>
  );
}
