'use client';

import { useGSAP } from '@gsap/react';
import { useIsInViewport } from '@Hooks/useIsInViewport';
import useMouse from '@Hooks/useMouse';
import { useSignalEffect } from '@preact/signals-react';
import { gsap } from 'gsap';
import React, { PropsWithChildren, ReactElement, useRef } from 'react';

import s from './styles.module.scss';

interface ParagraphLineMaskProps extends PropsWithChildren {
  velocity?: number;
  offset?: number;
  verticalOnly?: boolean;
}

export default function BoxParallaxMouseMove({
  children,
  velocity = -200,
  offset,
  verticalOnly = false,
}: ParagraphLineMaskProps): ReactElement {
  const refWrap = useRef<HTMLDivElement>(null);
  const refMask = useRef<HTMLDivElement>(null);
  const refContent = useRef<HTMLDivElement>(null);
  const refSetter = useRef<{ qX: null | gsap.QuickToFunc; qY: null | gsap.QuickToFunc }>({
    qX: null,
    qY: null,
  });
  const refOffset = useRef<undefined | number>(offset);
  const mouse = useMouse();
  const { visible } = useIsInViewport({ ref: refWrap });

  useSignalEffect(() => {
    const disX = mouse.value.x / window.innerWidth - 0.5;
    const disY = mouse.value.y / window.innerHeight - 0.5;
    if (refOffset.current && visible.peek()) {
      refSetter.current.qX && refSetter.current.qX(disX * velocity * refOffset.current);
      refSetter.current.qY &&
        !verticalOnly &&
        refSetter.current.qY(disY * velocity * refOffset.current);
    }
  });

  useGSAP(
    () => {
      refSetter.current.qX = gsap.quickTo(refWrap.current, 'x', {
        duration: 0.5,
        ease: 'power3',
      });
      refSetter.current.qY = gsap.quickTo(refWrap.current, 'y', {
        duration: 0.5,
        ease: 'power3',
      });
    },
    { scope: refWrap }
  );

  if (!React.isValidElement(children)) {
    return <div>Error: Invalid children element</div>;
  }
  return (
    <div className={s.moueMove} ref={refWrap}>
      <div className={`${s.moueMove_mask} w-full h-full`} ref={refMask}>
        {React.cloneElement(children, { ...{ ref: refContent } })}
      </div>
    </div>
  );
}
