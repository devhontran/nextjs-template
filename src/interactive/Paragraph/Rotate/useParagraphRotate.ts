import { useGSAP } from '@gsap/react';
import { getDelay } from '@Utils/uiHelper';
import { gsap } from 'gsap';
import { MutableRefObject, useRef } from 'react';
import SplitType from 'split-type';

import { IAnimationProps, IValueHookAnimation } from '@/types/animation';

import s from './styles.module.scss';

interface IUseParagraphRotate extends IAnimationProps {
  refContent: MutableRefObject<HTMLDivElement | HTMLSpanElement | HTMLParagraphElement | null>;
}

export default function useParagraphRotate({
  refContent,
  delayTrigger = 0,
  delayEnter = 0,
  duration,
}: IUseParagraphRotate): IValueHookAnimation {
  const refText = useRef<SplitType | null>(null);
  const { contextSafe } = useGSAP({ scope: refContent });

  const initAnimation = contextSafe(() => {
    refContent.current?.classList.add(s.randomSlideDown);
    if (!refContent.current?.parentElement) return;
    refText.current = new SplitType(refContent.current as HTMLElement, { types: 'words,chars' });

    refText.current?.chars?.length &&
      gsap.set(refText.current?.chars, {
        scale: 0.7,
        opacity: 0,
        x: (index) => index * 1.42,
        y: (index) => Math.sin(index * 5) * 5,
        rotate: 5 + Math.random() * 10 - 10,
      });
  });

  const playAnimation = contextSafe(() => {
    const delay = getDelay({ refContentCurrent: refContent.current, delayEnter, delayTrigger });

    if (refText.current?.chars?.length) {
      gsap.to(refText.current?.chars, {
        stagger: 0.01,
        scale: 1,
        opacity: 1,
        rotate: 0,
        x: 0,
        y: 0,
        duration: duration || 1,
        ease: 'power3.out',
        delay: delay,
      });
    }
  });

  return {
    initAnimation: initAnimation,
    playAnimation: playAnimation,
  };
}
