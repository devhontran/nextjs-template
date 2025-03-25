import gsap from 'gsap';
import type { RefObject } from 'react';
import { useLayoutEffect, useRef } from 'react';
import SplitType from 'split-type';

import s from './Lines.module.scss';

export const useLinesMask = ({
  refContent,
  isTriggerMotion = true,
}: {
  refContent: RefObject<HTMLDivElement | null>;
  isTriggerMotion?: boolean;
}): { motionIn: (to?: gsap.TweenVars) => void; motionOut: (to?: gsap.TweenVars) => void } => {
  const textSplitTypes = useRef<SplitType>(null);

  useLayoutEffect(() => {
    if (!refContent.current) return;
    refContent.current.classList.add(s.lineMask);

    textSplitTypes.current = new SplitType(refContent.current, {
      types: 'lines',
      tagName: 'span',
    });

    textSplitTypes.current.lines?.forEach((line) => {
      const div = document.createElement('div');
      const parent = line.parentElement;
      div.appendChild(line);
      div.classList.add(s.lineMask__overflow);
      parent?.appendChild(div);
    });

    if (isTriggerMotion)
      gsap.set(textSplitTypes.current.lines, {
        yPercent: 100,
      });
  }, [refContent, isTriggerMotion]);

  const motionIn = (to?: gsap.TweenVars): void => {
    if (!refContent.current || !textSplitTypes.current?.lines) return;

    gsap.killTweensOf(refContent.current);
    gsap.set(refContent.current, { opacity: 1, y: 0 });
    gsap.fromTo(
      textSplitTypes.current.lines,
      {
        yPercent: 100,
      },
      {
        yPercent: 0,
        ease: 'power3.out',
        stagger: 0.05,
        ...to,
        duration: 0.8,
      }
    );
  };

  const motionOut = (to?: gsap.TweenVars): void => {
    if (!refContent.current) return;

    gsap.killTweensOf(refContent.current);
    gsap.to(refContent.current, {
      mask: 'none',
      y: -50,
      opacity: 0,
      ease: 'power3.out',
      duration: 0.8,
      ...to,
    });
  };

  return {
    motionIn,
    motionOut,
  };
};
