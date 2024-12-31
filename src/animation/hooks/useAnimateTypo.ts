'use client';

import { calcThreshold, getDelay } from '@Utils/uiHelper';
import { MutableRefObject, useCallback } from 'react';
import SplitType from 'split-type';

import { usePagePlay } from '@/animation/hooks/usePage';
import { IAnimationProps } from '@/types/animation';

interface IAnimationTypo {
  refContent: MutableRefObject<IAnimationElement | null>;
  types: ('lines' | 'words' | 'chars')[];
  motion?: IAnimationProps;
  animate: (gsapWars: gsap.TweenVars, splitType: SplitType | null) => void;
}

export default function useAnimateTypo({
  types,
  refContent,
  motion,
  animate,
}: IAnimationTypo): void {
  const getSplitType = useCallback(() => {
    if (refContent.current) {
      return new SplitType(refContent.current, { types });
    }
    return null;
  }, [types, refContent.current]);

  const getGsapWars = useCallback((): gsap.TweenVars => {
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
      },
      onStart: (): void => {
        console.log('___animation__onStart');
      },
      delay,
    };
  }, [motion, types, refContent.current]);

  const initAnimation = useCallback(() => {
    const gsapWars = getGsapWars();
    const splitType = getSplitType();
    animate(gsapWars, splitType);
  }, [getGsapWars, getSplitType, animate]);

  usePagePlay(initAnimation);
}