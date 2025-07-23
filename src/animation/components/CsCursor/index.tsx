'use client';

import type { PropsWithChildren } from 'react';

import { CursorProvider } from '@/animation/contexts/CursorContext';

import CursorGrow from './Grow';
import CursorPlay from './Play';
import CursorScroll from './Scroll';

interface Props extends PropsWithChildren {
  isPlay?: boolean;
  isScroll?: boolean;
}

function CsCursor({ isPlay, isScroll, children }: Props): React.ReactElement {
  return (
    <>
      {children}
      {isPlay && <CursorPlay />}
      {isScroll && <CursorScroll />}
      <CursorGrow />
    </>
  );
}

export default function WrapCursor({ children, ...props }: Props): React.ReactElement {
  return (
    <CursorProvider>
      <CsCursor {...props}>{children}</CsCursor>
    </CursorProvider>
  );
}
