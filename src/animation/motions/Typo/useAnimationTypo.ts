import { useGSAP } from '@gsap/react';
import { IMotionTypeFncs } from '@Motions/Typo/motionType';
import { motionEnabled, useMotionEnabled } from '@Motions/useMotionStore';
import { calcThreshold, getDelay } from '@Utils/uiHelper';
import { MutableRefObject, useRef } from 'react';
import SplitType from 'split-type';

import { usePlayPage } from '@/animation/usePageStatus';
import { IAnimationProps } from '@/types/animation';

interface IAnimationTypo extends IMotionTypeFncs {
  refContent: MutableRefObject<IAnimationElement | null>;
  types: ('lines' | 'words' | 'chars')[];
  motion?: IAnimationProps;
}

export default function useAnimationTypo({
  types,
  refContent,
  motionInit,
  motionPlay,
  motionRevert,
  motion,
}: IAnimationTypo): void {
  const refText = useRef<SplitType | null>(null);

  const refOptions = useRef<{
    dbTiming: NodeJS.Timeout | null;
    obResize: ResizeObserver | null;
    isCallPlay: boolean;
  }>({ obResize: null, dbTiming: null, isCallPlay: false });

  const { contextSafe } = useGSAP();

  const animationInit = contextSafe(() => {
    if (!refContent.current) return;

    refText.current = new SplitType(refContent.current, { types });
    refOptions.current.obResize = new ResizeObserver(() => {
      refOptions.current.dbTiming && clearTimeout(refOptions.current.dbTiming);
      refOptions.current.dbTiming = setTimeout(() => {
        motionRevert();
        refText.current?.split({});
        refText.current && motionInit({ splitText: refText.current });
        refOptions.current.isCallPlay && animationIn();
      }, 150);
    });

    refOptions.current.obResize?.observe(refContent.current);
    return () => {
      motionRevert();
      refText.current?.revert();
      refContent.current && refOptions.current.obResize?.unobserve(refContent.current);
      refOptions.current.obResize?.disconnect();
    };
  });

  const animationIn = contextSafe(() => {
    refOptions.current.isCallPlay = true;
    const delay = getDelay({
      element: refContent.current as HTMLElement,
      delayEnter: motion?.delayEnter,
      delayTrigger: motion?.delayTrigger,
    });
    const topStart = calcThreshold({
      element: refContent.current as HTMLElement,
      threshold: motion?.threshold,
    });

    refText.current &&
      motionPlay({
        splitText: refText.current,
        tweenVars: {
          scrollTrigger: {
            trigger: refContent.current,
            start: motion?.start || `top+=${topStart}% bottom`,
            onToggle: (self) => {
              !self.isActive && animationRevert();
            },
            once: true,
            markers: motion?.markers,
          },
          delay,
          onStart: clearResize,
        },
      });
  });

  const clearResize = (): void => {
    refContent.current && refOptions.current.obResize?.unobserve(refContent.current);
    refOptions.current.obResize?.disconnect();
  };

  const animationRevert = (): void => {
    refContent.current?.classList.add('animated');
    motionRevert();
    refText.current?.revert();
    clearResize();
  };

  usePlayPage(() => {
    motionEnabled.peek() && animationIn();
    return motionRevert;
  });

  useMotionEnabled(animationInit);
}
