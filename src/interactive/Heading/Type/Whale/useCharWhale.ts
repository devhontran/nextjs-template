import { useGSAP } from '@gsap/react';
import { getDelay } from '@Utils/uiHelper';
import { gsap } from 'gsap';
import { MutableRefObject, useCallback, useRef } from 'react';
import SplitType from 'split-type';

import { IValueHookAnimation } from '@/types/animation';
import { IAnimationElement } from '@/types/common';

interface IUseHeadingChars {
  refContent: MutableRefObject<IAnimationElement | null>;
  delayTrigger?: number;
  delayEnter?: number;
  offset?: number;
  typeEff?: string;
}

export default function useHeadingCharsWhale({
  refContent,
  delayTrigger = 0,
  delayEnter = 0,
  offset = 0,
}: IUseHeadingChars): IValueHookAnimation {
  const refText = useRef<SplitType | null>(null);

  const { contextSafe } = useGSAP();
  const initAnimation = contextSafe(() => {
    if (!refContent.current?.parentElement) return;
    refContent.current.parentElement.style.userSelect = 'none';
    refText.current = new SplitType(refContent.current as HTMLElement, { types: 'words,chars' });

    refText.current?.chars?.length &&
      gsap.set(refText.current?.chars, {
        scale: 0.5,
        opacity: 0,
      });

    playAnimation();
  });
  const delayCallback = useCallback((): number => {
    const delay = getDelay({ refContentCurrent: refContent.current, delayEnter, delayTrigger });
    return delay;
  }, [delayEnter, delayTrigger, refContent.current]);

  const playAnimation = contextSafe(() => {
    const dl = delayCallback();

    refText.current?.chars?.length &&
      gsap.to(refText.current?.chars, {
        scrollTrigger: {
          scrub: true,
          trigger: refContent.current,
          start: 'top 72%',
          end: 'bottom 65%',
          toggleActions: 'play none none reverse',
        },
        stagger: 0.1,
        scale: 1,
        opacity: 1,
        duration: 1.6,
        ease: 'power3.out',
        delay: offset ? -offset : dl,
      });
  });
  return { initAnimation, playAnimation: (): void => {} };
}
