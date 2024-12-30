'use client';
import { calcThreshold, getDelay } from '@Utils/uiHelper';
import { MutableRefObject, useEffect, useMemo, useState } from 'react';
import SplitType from 'split-type';

import { IAnimationProps } from '@/types/animation';

interface IAnimationTypo {
  refContent: MutableRefObject<IAnimationElement | null>;
  types: ('lines' | 'words' | 'chars')[];
  motion?: IAnimationProps;
}

export default function useAnimationTypo({ types, refContent, motion }: IAnimationTypo): {
  gsapWars: gsap.TweenVars;
  textSplitTypes: SplitType | null;
  isContentReady: boolean;
} {
  const [isContentReady, setIsContentReady] = useState(false);

  useEffect(() => {
    if (refContent.current) {
      setIsContentReady(true);
    }
  }, [refContent.current]);

  const textSplitTypes = useMemo(() => {
    return refContent.current ? new SplitType(refContent.current, { types }) : null;
  }, [types, isContentReady, motion]);

  const gsapWars = useMemo((): gsap.TweenVars => {
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
  }, [isContentReady, motion, types]);

  return { gsapWars, textSplitTypes, isContentReady };
}
