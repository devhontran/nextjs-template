'use client';

import { useGSAP } from '@gsap/react';
import { useSignalEffect } from '@preact/signals-react';
import cn from 'classnames';
import gsap from 'gsap';
import { type PropsWithChildren, useRef } from 'react';

import { useCursorContext } from '@/animation/contexts/CursorContext';

import styles from './CsCursor.module.scss';

interface Props extends PropsWithChildren {
  className?: string;
}

export default function Cursor({ children, className }: Props): React.ReactElement {
  const { cursorPositionX, cursorPositionY } = useCursorContext();
  const refCursor = useRef<HTMLDivElement>(null);

  const refQx = useRef<(n: number) => null>(null);
  const refQy = useRef<(n: number) => null>(null);
  const refQz = useRef<(n: number) => null>(null);

  useGSAP(() => {
    refQx.current = gsap.quickSetter(refCursor.current, 'x', 'px') as (n: number) => null;
    refQy.current = gsap.quickSetter(refCursor.current, 'y', 'px') as (n: number) => null;
    refQz.current = gsap.quickSetter(refCursor.current, 'z', 'px') as (n: number) => null;
  });

  useSignalEffect(() => {
    if (refQx.current && refQy.current && refQz.current) {
      refQx.current(cursorPositionX.value);
      refQy.current(cursorPositionY.value);
      refQz.current(0);
    }
  });

  return (
    <div className={cn(styles.cursor, className)} ref={refCursor}>
      {children}
    </div>
  );
}
