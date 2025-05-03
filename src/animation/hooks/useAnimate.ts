'use client';

import { useCallback, useLayoutEffect } from 'react';

import type { IAnimationProps } from '@/types/animation';
import { calcThreshold, getDelay, splitAnimate } from '@/utils/uiHelper';

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
        start: motion?.start ?? `top+=${topStart.toString()}% bottom`,
        once: true,
        markers: motion?.markers,
        onEnter: (): void => {
          refContent.current?.classList.remove('is-before-animate');
        },
      },
      delay,
    };
  }, [motion]);

  const initAnimation = useCallback(() => {
    if (!refContent.current) return;

    splitAnimate(refContent.current as HTMLElement, (): void => {
      const gsapWars = getGsapWars();
      animate(gsapWars);
    });
  }, [getGsapWars, animate]);

  useLayoutEffect(initAnimation, [initAnimation]);
}
