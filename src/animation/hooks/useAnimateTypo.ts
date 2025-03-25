'use client';

import { calcThreshold, getDelay, splitAnimate } from '@Utils/uiHelper';
import type { RefObject } from 'react';
import { useCallback, useLayoutEffect } from 'react';
import SplitType from 'split-type';

import type { MotionCharsTarget } from '@/enum/motion';
import type { IAnimationProps } from '@/types/animation';

interface IAnimationTypo {
  refContent: RefObject<IAnimationElement | null>;
  types: ('lines' | 'words' | 'chars')[];
  motion?: IAnimationProps;
  target?: MotionCharsTarget;
  animate: (gsapWars: gsap.TweenVars, splitType: SplitType | null) => void;
}

export default function useAnimateTypo({
  types,
  refContent,
  motion,
  animate,
  target,
}: IAnimationTypo): void {
  const getSplitType = useCallback(() => {
    return new Promise<SplitType>((resolve) => {
      requestAnimationFrame(() => {
        if (refContent.current) {
          let findP: IAnimationElement = refContent.current;
          if (target) {
            const targetElement = refContent.current.querySelector(target) as IAnimationElement;
            if (targetElement) {
              findP = targetElement as IAnimationElement;
            }
          } else {
            const children = refContent.current.children[0];
            if (children instanceof HTMLElement) {
              findP = children as IAnimationElement;
            }
          }
          resolve(new SplitType(findP as HTMLElement, { types }));
        }
      });
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

  useLayoutEffect(initAnimation, [initAnimation]);
}
