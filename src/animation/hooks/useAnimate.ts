'use client';

import { calcThreshold, getDelay, splitAnimate } from '@Utils/uiHelper';
import { useCallback } from 'react';

import { IAnimationProps } from '@/types/animation';

import { usePagePlay } from './useEffectHooks';

interface IMotionProps {
  refContent: React.RefObject<IAnimationElement>;
  motion?: IAnimationProps;
  animate: (gsapWars: gsap.TweenVars) => void;
}

export default function useAnimate({ refContent, motion, animate }: IMotionProps): void {
  const getGsapWars = useCallback((): gsap.TweenVars => {
    refContent.current?.classList.add('is-before-animate');
    const delay = getDelay({
      element: refContent.current as HTMLElement,
      delayEnter: motion?.delayEnter,
      delayTrigger: motion?.delayTrigger,
    });

    const topStart = calcThreshold({
      element: refContent.current as HTMLElement,
      threshold: motion?.threshold,
    });

    return {
      scrollTrigger: {
        trigger: refContent.current,
        start: motion?.start || `top+=${topStart}% bottom`,
        once: true,
        markers: motion?.markers,
        onEnter: (): void => {
          refContent.current?.classList.remove('is-before-animate');
        },
      },
      delay,
    };
  }, [refContent, motion]);

  const initAnimation = useCallback(() => {
    refContent.current &&
      splitAnimate(refContent.current as HTMLElement, () => {
        const gsapWars = getGsapWars();
        animate(gsapWars);
      });
  }, [getGsapWars, animate, refContent.current]);

  usePagePlay(() => requestAnimationFrame(initAnimation));
}
