import { useGSAP } from '@gsap/react';
import { getDelay } from '@Utils/uiHelper';
import { gsap } from 'gsap';
import { MutableRefObject, useCallback, useRef } from 'react';
import SplitType from 'split-type';

import { IAnimationProps, IValueHookAnimation } from '@/types/animation';
import { IAnimationElement } from '@/types/common';

interface IUseHeadingChars extends IAnimationProps {
  refContent: MutableRefObject<IAnimationElement | null>;
  offset?: number;
}

export default function useHeadingChar({
  refContent,
  delayTrigger = 0,
  delayEnter = 0,
}: IUseHeadingChars): IValueHookAnimation {
  const refText = useRef<SplitType | null>(null);
  const c = [0.35, 0.125, 0.0, 0.2, 0.0, 0.4, 0.001];

  const { contextSafe } = useGSAP();
  const initAnimation = contextSafe(() => {
    if (!refContent.current?.parentElement) return;
    refContent.current.parentElement.style.userSelect = 'none';
    refText.current = new SplitType(refContent.current as HTMLElement, { types: 'words,chars' });

    refText.current?.chars?.length &&
      gsap.set(refText.current?.chars, {
        opacity: 0,
        scale: (index) => c[index],
      });
  });
  const delayCallback = useCallback((): number => {
    const delay = getDelay({ refContentCurrent: refContent.current, delayEnter, delayTrigger });
    return delay;
  }, [delayEnter, delayTrigger, refContent.current]);

  const playAnimation = contextSafe(() => {
    const dl = delayCallback();
    const d = [7, 6.5, 2, 4, 0, 7.2, 1];

    refText.current?.chars?.length &&
      gsap.to(refText.current?.chars, {
        duration: 2,
        delay: (index) => (1 - d[index]) / 100 || dl,
        scale: 1,
        opacity: 1,
        ease: 'power3.out',
      });

    gsap.set(refContent.current, { xPercent: 0 });
  });
  return { initAnimation, playAnimation };
}
