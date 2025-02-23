'use client';

import { useGSAP } from '@gsap/react';
import { signal } from '@preact/signals-react';
import cn from 'classnames';
import { gsap } from 'gsap';
import React, { useLayoutEffect, useRef } from 'react';

import { useEffectContext } from '@/animation/contexts/EffectContext';
import { usePageEffectIn, usePageEffectOut } from '@/animation/hooks/useEffectHooks';
import useRouterEffect from '@/animation/hooks/useRouterEffect';
import { pageScrollTop } from '@/utils/uiHelper';

import s from './styles.module.scss';

export const preRenderOldContent = signal<boolean>(false);
export const historyScrollTop = signal<number>(0);

export default function PageSwitch({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const refContentHistory = useRef<HTMLDivElement>(null);
  const refContentOld = useRef<HTMLDivElement>(null);
  const refContentNew = useRef<HTMLDivElement>(null);
  const refContentRoot = useRef<HTMLDivElement>(null);
  const refContentLabel = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP();
  const { routerPush } = useRouterEffect();
  const { pageEnter, pagePlay } = useEffectContext();

  const animationIn = contextSafe(async () => {
    Promise.all([
      new Promise((resolve) => {
        if (!refContentOld.current || !refContentNew.current || !refContentHistory.current) return;

        refContentHistory.current.innerHTML = refContentOld.current.innerHTML;
        refContentOld.current.innerHTML = refContentNew.current.innerHTML;

        gsap.set(refContentOld.current, {
          opacity: 1,
          scale: 1,
          x: '0vw',
        });

        const oldScrollPosition = refContentOld.current.getAttribute('data-scroll-position');
        refContentHistory.current.scrollTo(0, Number(oldScrollPosition));

        refContentOld.current.scrollTo(0, pageScrollTop());
        refContentOld.current.setAttribute('data-scroll-position', pageScrollTop().toString());

        resolve(true);
      }),
      new Promise((resolve) => {
        setTimeout(() => {
          routerPush();
          resolve(true);
        }, 100);
      }),
    ]);
  });

  const animationSwitch = contextSafe(() => {
    if (!refContentOld.current || !refContentNew.current) return;

    const tl = gsap.timeline();

    gsap.set(refContentHistory.current, { x: '-51vw', overflow: 'hidden', height: '100vh' });
    gsap.set(refContentLabel.current, { x: '101vw', overflow: 'hidden', height: '100vh' });
    gsap.set(refContentNew.current, {
      x: '51vw',
      scale: 0.5,
      zIndex: 1,
      overflow: 'hidden',
      height: '100vh',
    });
    gsap.set(refContentOld.current, { zIndex: 2, overflow: 'hidden', height: '100vh' });

    const time = 0.8;

    tl.to(refContentOld.current, {
      scale: 0.5,
      duration: time,
      ease: 'power3.inOut',
      onComplete: () => {
        gsap.fromTo(
          refContentOld.current,
          { zIndex: 1 },
          {
            x: '-51vw',

            duration: time,
            ease: 'power3.inOut',
          }
        );
        gsap.fromTo(
          refContentNew.current,
          { x: '51vw', zIndex: 2 },
          {
            x: '0vw',
            duration: time,
            ease: 'power3.inOut',
          }
        );
        gsap.fromTo(
          refContentHistory.current,
          { x: '-51vw' },
          {
            x: '-101vw',
            duration: time,
            ease: 'power3.inOut',
          }
        );
        gsap.fromTo(
          refContentLabel.current,
          { x: '101vw' },
          {
            x: '51vw',
            duration: time,
            ease: 'power3.inOut',
          }
        );
      },
    });

    tl.to(refContentNew.current, {
      x: '0vw',
      delay: time,
      scale: 1,
      duration: time,
      ease: 'power3.inOut',
      onComplete: () => {
        pagePlay();
        gsap.set(refContentNew.current, { overflow: 'auto', height: 'fit-content' });
        pageEnter();
      },
    });
  });

  usePageEffectOut(animationSwitch);
  usePageEffectIn(animationIn);

  useLayoutEffect(() => {
    const pageTransition = (): void => {
      gsap.set(refContentNew.current, { x: '25vw', scale: 0.5 });
    };

    if (window?.navigation && window.navigation.addEventListener) {
      window?.navigation.addEventListener('navigate', pageTransition);
    }

    return () => {
      if (window.navigation && window.navigation.removeEventListener) {
        window.navigation.removeEventListener('navigate', pageTransition);
      }
    };
  }, []);

  return (
    <div className={s.pageSwitch} ref={refContentRoot}>
      <div className={cn(s.transition, s.transition__history)} ref={refContentHistory} />
      <div className={cn(s.transition, s.transition__old)} ref={refContentOld} />
      <div className={cn(s.transition, s.transition__new)} ref={refContentNew}>
        {children}
      </div>
      <div className={cn(s.transition, s.transition__label)} ref={refContentLabel} />
    </div>
  );
}
