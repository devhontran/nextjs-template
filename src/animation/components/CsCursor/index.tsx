'use client';

import type { PropsWithChildren } from 'react';

import { CursorProvider } from '@/animation/contexts/CursorContext';

import CursorGrow from './Grow';
import CursorPlay from './Play';

interface Props extends PropsWithChildren {
  isPlay?: boolean;
}

function CsCursor({ isPlay, children }: Props): React.ReactElement {
  return (
    <>
      {children}
      {isPlay && <CursorPlay />}
      <CursorGrow />
    </>
  );
}

export default function WrapCursor({ isPlay, children }: Props): React.ReactElement {
  return (
    <CursorProvider>
      <CsCursor isPlay={isPlay}>{children}</CsCursor>
    </CursorProvider>
  );
}
