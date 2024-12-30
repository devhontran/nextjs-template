import { useGSAP } from '@gsap/react';
import { calcThreshold, getDelay } from '@Utils/uiHelper';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MutableRefObject, useRef } from 'react';
import SplitType from 'split-type';

import { IMotionTypeFncs } from '@/animation/components/Typo/motionType';
import { usePagePlay } from '@/animation/hooks/usePage';
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
  motionRevert,
  motionPlay,
  motion,
}: IAnimationTypo): void {
  const refText = useRef<SplitType | null>(null);
  const { contextSafe } = useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    refContent.current?.classList.add('is-before-animate');

    return () => {
      refContent.current?.classList.remove('is-before-animate');
    };
  });

  const animationInit = contextSafe(() => {
    if (!refContent.current) return;
    refText.current = new SplitType(refContent.current, { types });
    motionInit({ splitText: refText.current });
    return motionRevert;
  });

  const animationIn = contextSafe(() => {
    const delay = getDelay({
      element: refContent.current as HTMLElement,
      delayEnter: motion?.delayEnter,
      delayTrigger: motion?.delayTrigger,
    });
    const topStart = calcThreshold({
      element: refContent.current as HTMLElement,
      threshold: motion?.threshold,
    });

    ScrollTrigger.create({
      trigger: refContent.current,
      start: motion?.start || `top+=${topStart}% bottom`,
      once: true,
      markers: motion?.markers,
      onEnter: () => {
        animationInit();
        console.log('____animationIn');
        refText.current &&
          motionPlay({
            splitText: refText.current,
            tweenVars: {
              onStart: () => {
                refContent.current?.classList.remove('is-before-animate');
              },
              delay,
            },
          });
      },
    });
  });

  usePagePlay(animationIn);
}
