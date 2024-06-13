import { useGSAP } from '@gsap/react';
import { getDelay } from '@Utils/uiHelper';
import { gsap } from 'gsap';
import { MutableRefObject, useCallback, useRef } from 'react';
import SplitType from 'split-type';

import { IAnimationProps, IValueHookAnimation } from '@/types/animation';
import { IAnimationElement } from '@/types/common';

interface IUseHeadingChars extends IAnimationProps {
  refContent: MutableRefObject<IAnimationElement | null>;
  isParallaxScroll?: boolean;
}

export default function useHeadingSnap({
  refContent,
  delayTrigger = 0,
  delayEnter = 0,
}: IUseHeadingChars): IValueHookAnimation {
  const refText = useRef<SplitType | null>(null);

  const { contextSafe } = useGSAP();
  const initAnimation = contextSafe(() => {
    if (!refContent.current?.parentElement) return;
    refText.current = new SplitType(refContent.current as HTMLElement, { types: 'words,chars' });

    refText.current?.chars?.length &&
      gsap.set(refText.current?.chars, {
        scale: 0.5,
        opacity: 0,
        y: (index) => Math.sin(index * 5) * 5,
        rotate: Math.random() * 15 - 15,
        //  filter: 'blur(25px)',
      });
  });
  const delayCallback = useCallback((): number => {
    const delay = getDelay({ refContentCurrent: refContent.current, delayEnter, delayTrigger });
    return delay;
  }, [delayEnter, delayTrigger, refContent.current]);

  const playAnimation = contextSafe(() => {
    const dl = delayCallback();

    refText.current?.chars?.length &&
      gsap.to(refText.current?.chars, {
        stagger: 0.01 + 1 / refText.current?.chars.length,
        scale: 1,
        opacity: 1,
        y: 0,
        rotate: 0,
        duration: 1.6,
        // filter: 'blur(0px)',
        ease: 'power3.out',
        delay: dl,
      });
  });
  return { initAnimation, playAnimation };
}
