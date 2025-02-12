'use client';

import { useGSAP } from '@gsap/react';
import cn from 'classnames';
import { gsap } from 'gsap';
import React, { useRef } from 'react';

import { useEffectContext } from '@/animation/contexts/EffectContext';
import { usePageEffectIn, usePageEffectOut } from '@/animation/hooks/useEffectHooks';
import useRouterEffect from '@/animation/hooks/useRouterEffect';

import s from './styles.module.scss';

export default function PageEffect(): React.ReactElement {
  const refContent = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP();
  const { routerPush } = useRouterEffect();
  const { pageEnter, pagePlay } = useEffectContext();

  const animationIn = contextSafe(() => {
    gsap.to(refContent.current, {
      opacity: 1,
      pointerEvents: 'auto',
      ease: 'power3.out',
      duration: 0.6,
      onComplete: routerPush,
    });
  });

  const animationOut = contextSafe(() => {
    pagePlay();
    gsap.to(refContent.current, {
      opacity: 0,
      ease: 'power3.inOut',
      pointerEvents: 'none',
      duration: 0.5,
      onComplete: pageEnter,
    });
  });

  usePageEffectOut(animationOut);
  usePageEffectIn(animationIn);

  return (
    <div className={cn(s.transition)} ref={refContent}>
      THIS IS PAGE EFFECT...
    </div>
  );
}
