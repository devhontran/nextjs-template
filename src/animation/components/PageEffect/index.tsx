'use client';

import { useGSAP } from '@gsap/react';
import cn from 'classnames';
import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';

import { useIsLoaded } from '@/animation/hooks/useLoader';
import { usePageLeave } from '@/animation/hooks/usePage';
import { isPageIdle, pageEnter, pagePlay } from '@/animation/signals/pageSignals';
import useRouterEffect from '@/hooks/useRouterEffect';

import s from './styles.module.scss';

export default function PageEffect(): React.ReactElement {
  const refContent = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP();
  const { routerPush } = useRouterEffect();

  const animationIn = contextSafe(() => {
    if (isPageIdle()) return;
    gsap.to(refContent.current, {
      opacity: 1,
      pointerEvents: 'auto',
      ease: 'power3.out',
      duration: 0.6,
      onComplete: routerPush,
    });
  });

  const animationOut = contextSafe(() => {
    if (isPageIdle()) return;
    pagePlay();
    gsap.to(refContent.current, {
      opacity: 0,
      ease: 'power3.inOut',
      pointerEvents: 'none',
      duration: 0.5,
      onComplete: pageEnter,
    });
  });

  useIsLoaded(animationOut);
  usePageLeave(animationIn);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.onpopstate = (window.history as any).onpushstate = function (): void {
      // dispatchUrl(window.location.pathname);
    };
  }, []);

  return (
    <div className={cn(s.transition)} ref={refContent}>
      THIS IS PAGE EFFECT...
    </div>
  );
}
