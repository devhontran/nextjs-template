'use client';

import { calcThreshold, getDelay, splitAnimate } from '@Utils/uiHelper';
import type { MutableRefObject } from 'react';
import { useCallback, useLayoutEffect } from 'react';
import SplitType from 'split-type';

import type { IAnimationProps } from '@/types/animation';

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
    return new Promise<SplitType>((resolve) => {
      if (refContent.current) {
        requestAnimationFrame(() => {
          resolve(new SplitType(refContent.current as HTMLElement, { types }));
        });
      }
    });
  }, [types]);

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
        start: motion?.start ?? `top+=${topStart.toString()}% bottom`,
        once: true,
        markers: motion?.markers,
      },
      delay,
    };
  }, [motion, types]);

  const initAnimation = useCallback(() => {
    if (!refContent.current) return;

    splitAnimate(refContent.current as HTMLElement, (): void => {
      const gsapWars = getGsapWars();
      getSplitType()
        .then((splitType): void => {
          animate(gsapWars, splitType);
        })
        .catch((error: unknown): void => {
          // eslint-disable-next-line no-console
          console.error('Error in split type animation:', error);
        });
    });
  }, [getGsapWars, getSplitType, animate]);

  useLayoutEffect(() => {
    requestAnimationFrame(initAnimation);
  }, [initAnimation]);
}
