'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCallback } from 'react';

import { PageState } from '@/enum/common';
import type { IAnimationProps } from '@/types/animation';
import { calcThreshold, getDelay } from '@/utils/uiHelper';

import { useEffectContext } from '../contexts/EffectContext';
import { usePagePlay } from './useEffectHooks';

interface IMotionProps {
  refContent: React.RefObject<IAnimationElement>;
  motion?: IAnimationProps;
  animate: (gsapWars: gsap.TweenVars) => Promise<void> | void;
  kill?: () => void;
  isOnShow?: boolean;
  isIgnoreTrigger?: boolean;
}

export default function useAnimate({
  refContent,
  motion,
  animate,
  kill,
  isOnShow,
  isIgnoreTrigger,
}: IMotionProps): void {
  const { pageStatus } = useEffectContext();
  const getGsapWars = useCallback((): gsap.TweenVars => {
    const delay = getDelay({
      element: refContent.current as HTMLElement,
      delayEnter: motion?.delayEnter,
      delayTrigger: motion?.delayTrigger,
    });

    return {
      onStart: (): void => {
        if (!isOnShow) {
          gsap.set(refContent.current, { visibility: 'visible' });
        }
      },
      delay,
    };
  }, [motion]);

  const { contextSafe } = useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      if (!refContent.current) return;
      if (pageStatus.value >= PageState.PLAY) {
        onScrollerTrigger();
      }

      if (!isOnShow) {
        gsap.set(refContent.current, { visibility: 'hidden' });
      }
    },
    { dependencies: [isOnShow] }
  );

  const onScrollerTrigger = contextSafe(() => {
    if (!refContent.current) return;
    if (isIgnoreTrigger) {
      gsap.set(refContent.current, { visibility: 'visible' });
      return;
    }

    const topStart = calcThreshold({
      element: refContent.current as HTMLElement,
      threshold: motion?.threshold,
    });

    if (refContent.current.getBoundingClientRect().top < window.innerHeight) {
      const gsapWars = getGsapWars();
      void animate(gsapWars);
    } else {
      ScrollTrigger.create({
        trigger: refContent.current,
        start: motion?.start ?? `top+=${topStart.toString()}% bottom`,
        once: true,
        markers: motion?.markers,
        onEnter: async () => {
          const gsapWars = getGsapWars();
          await animate(gsapWars);
        },
        onLeave: kill,
      });
    }
  });

  usePagePlay(onScrollerTrigger);
}
