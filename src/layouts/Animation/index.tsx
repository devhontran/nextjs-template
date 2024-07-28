'use client';

import useAnimationHelper from '@Layouts/Animation/useAnimationHelper';
import PageEffect from '@Layouts/PageEffect';
import PageLoader from '@Layouts/PageLoader';
import { PropsWithChildren, ReactElement } from 'react';

interface IProp extends PropsWithChildren {}

export default function Animate({ children }: IProp): ReactElement {
  useAnimationHelper();
  return (
    <main>
      <PageLoader />
      <PageEffect />
      {children}
    </main>
  );
}
