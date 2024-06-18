import LenisScroller from '@Components/Lenis';
import Animate from '@Layouts/Animation';
import Header from '@Layouts/Header';
import MobileDisabledRotation from '@Layouts/MobileDisabledRotation';
import React, { PropsWithChildren } from 'react';

export default function MainLayout({ children }: PropsWithChildren): React.ReactElement {
  return (
    <>
      <Animate>
        {children}
        {/*<Header />*/}
        {/*<LenisScroller>{children}</LenisScroller>*/}
      </Animate>
      {/*<MobileDisabledRotation />*/}
    </>
  );
}
