import LenisScroller from '@Components/Lenis';
import Animate from '@Layouts/Animation';
import Header from '@Layouts/Header';
import React, { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';
import MobileDisabledRotation from '@Layouts/MobileDisabledRotation';

export default function MainLayout({ children }: PropsWithChildren): React.ReactElement {
  return (
    <>
      <Animate>
        <Header />
        <LenisScroller>{children}</LenisScroller>
      </Animate>
      <MobileDisabledRotation />
      <Toaster richColors position="top-left" />
    </>
  );
}
