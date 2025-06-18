'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCallback } from 'react';

import type { IAnimationProps } from '@/types/animation';
import { calcThreshold, getDelay } from '@/utils/uiHelper';

interface IMotionProps {
  refContent: React.RefObject<IAnimationElement>;
  motion?: IAnimationProps;
  animate: (gsapWars: gsap.TweenVars) => Promise<void> | void;
  kill?: () => void;
  isOnShow?: boolean;
}

export default function useAnimate({
  refContent,
  motion,
  animate,
  kill,
  isOnShow,
}: IMotionProps): void {
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

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!refContent.current) return;

    const topStart = calcThreshold({
      element: refContent.current as HTMLElement,
      threshold: motion?.threshold,
    });

    if (!isOnShow) {
      gsap.set(refContent.current, { visibility: 'hidden' });
    }
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
  }, [getGsapWars, animate]);
}
