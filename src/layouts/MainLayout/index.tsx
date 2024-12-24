import Animate from '@/animation';
import Header from '@Layouts/Header';
import React, { PropsWithChildren } from 'react';

export default function MainLayout({ children }: PropsWithChildren): React.ReactElement {
  return (
    <>
      <Animate>
        <Header />
        {/*<LenisScroller>{children}</LenisScroller>*/}
        {children}
      </Animate>
      {/*<MobileDisabledRotation />*/}
    </>
  );
}
