'use client';

import { useSignalEffect } from '@preact/signals-react';
import gsap from 'gsap';
import React, { useRef } from 'react';

import { useCursorContext } from '@/animation/contexts/CursorContext';
import { useUiContext } from '@/animation/contexts/UiContext';
import { CursorType } from '@/enum/animation';

import Cursor from '../Cursor';
import styles from './Grow.module.scss';

export default function CursorGrow(): React.ReactElement {
  const { cursorType } = useCursorContext();
  const { width, height } = useUiContext();
  const mouseRef = useRef<HTMLDivElement>(null);

  useSignalEffect(() => {
    gsap.set(mouseRef.current, { '--size': `${Math.min(width.value, height.value)}px` });
  });

  useSignalEffect(() => {
    if (cursorType.value === CursorType.HIDE_GROW) {
      if (mouseRef.current) {
        gsap.to(mouseRef.current, {
          duration: 0.8,
          opacity: 0,
          ease: 'power3.inOut',
        });
      }
    } else {
      if (mouseRef.current) {
        gsap.to(mouseRef.current, {
          duration: 0.8,
          opacity: 1,
          ease: 'power3.inOut',
        });
      }
    }
  });
  return (
    <Cursor className={styles.cursor}>
      <div ref={mouseRef} className={styles.grow}>
        {/* <Image src={'/glow.png'} alt="grow" fill /> */}
      </div>
    </Cursor>
  );
}
