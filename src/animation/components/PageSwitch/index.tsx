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
  const _refContentHistory = useRef<HTMLDivElement>(null);
  const refContentOld = useRef<HTMLDivElement>(null);
  const refContentNew = useRef<HTMLDivElement>(null);
  const refContentRoot = useRef<HTMLDivElement>(null);
  const _refContentLabel = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP();
  const { routerPush } = useRouterEffect();
  const { pageEnter, pagePlay } = useEffectContext();

  const animationIn = contextSafe(async () => {
    Promise.all([
      new Promise((resolve) => {
        if (!refContentOld.current || !refContentNew.current) return;
        refContentOld.current.innerHTML = refContentNew.current.innerHTML;
        refContentOld.current.style.setProperty(
          '--header-height',
          `${document.querySelector('.js-header')?.getBoundingClientRect().height || 0}px`
        );

        gsap.set(refContentOld.current, {
          opacity: 1,
          scale: 1,
          x: '0vw',
        });
        refContentOld.current.scrollTo(0, pageScrollTop());
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

    // gsap.set(refContentNew.current, { scale: 0.5 });
    // const tl = gsap.timeline();

    // tl.to(refContentOld.current, {
    //   scale: 0.5,
    //   duration: 0.6,
    //   ease: 'power3.inOut',
    // });

    gsap.fromTo(
      refContentOld.current,
      { x: '0vw', scale: 1, opacity: 1 },
      {
        transformOrigin: 'top center',
        opacity: 0,
        x: '-100vw',
        pointerEvents: 'none',
        ease: 'power3.inOut',
        duration: 0.6,
        onComplete: () => {
          if (refContentOld.current) {
            refContentOld.current.innerHTML = '';
            refContentOld.current.scrollTo(0, 0);
          }
        },
      }
    );
    gsap.fromTo(
      refContentNew.current,
      { x: '100vw', transformOrigin: 'top center' },
      {
        x: '0vw',
        ease: 'power3.inOut',
        pointerEvents: 'auto',
        duration: 0.6,
        onStart: pagePlay,
        onComplete: () => {
          pageEnter();
        },
      }
    );
  });

  usePageEffectOut(animationSwitch);
  usePageEffectIn(animationIn);

  useLayoutEffect(() => {
    const pageTransition = (): void => {
      gsap.set(refContentNew.current, { x: '100vw', transformOrigin: 'top center' });
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
      {/* <div className={cn(s.transition, s.transition__history)} ref={refContentHistory} /> */}
      <div className={cn(s.transition, s.transition__old)} ref={refContentOld} />
      <div className={cn(s.transition, s.transition__new)} ref={refContentNew}>
        {children}
      </div>
      {/* <div className={cn(s.transition, s.transition__label)} ref={refContentLabel} /> */}
    </div>
  );
}
